(function() {
    function ha() {
        return function() {}
    }

    function ka(ba) {
        return function(ca) {
            this[ba] = ca
        }
    }

    function Da(ba) {
        return function() {
            return this[ba]
        }
    }

    function Ga(ba) {
        return function() {
            return ba
        }
    }
    (function() {
        var ba = function() {
                var a;
                (function() {
                    var c = !1,
                        d = /var xyz/.test(ha()) ? /\b_super\b/ : /.*/;
                    a = ha();
                    a.extend = function(b) {
                        function f() {
                            !c && this.init && this.init.apply(this, arguments)
                        }
                        var a = this.prototype;
                        c = !0;
                        var g = new this;
                        c = !1;
                        for (var k in b) g[k] = "function" == typeof b[k] && "function" == typeof a[k] && d.test(b[k]) ? function(b, f) {
                            return function() {
                                var c = this.h;
                                this.h = a[b];
                                var d = f.apply(this, arguments);
                                this.h = c;
                                return d
                            }
                        }(k, b[k]) : b[k];
                        f.prototype = g;
                        f.extend = arguments.callee;
                        return f
                    }
                })();
                return a
            }(),
            ca = function() {
                function a(a, d, b, f) {
                    this.F = a;
                    this.K = d;
                    this.J = b;
                    this.B = f
                }
                a.prototype.fi = function() {
                    return "rgba(" + (255 * this.F >> 0) + "," + (255 * this.K >> 0) + "," + (255 * this.J >> 0) + "," + this.B.toFixed(2) + ")"
                };
                a.prototype.rj = function(a) {
                    return this.F === a.F && this.K === a.K && this.J === a.J && this.B === a.B
                };
                a.prototype.copy = function() {
                    return new a(this.F, this.K, this.J, this.B)
                };
                a.prototype.qa = function(a) {
                    this.F = a.F;
                    this.K = a.K;
                    this.J = a.J;
                    this.B = a.B
                };
                a.prototype.add = function(a) {
                    this.F += a.F;
                    this.K += a.K;
                    this.J += a.J;
                    this.B += a.B
                };
                a.prototype.multiply = function(a) {
                    this.F *= a;
                    this.K *= a;
                    this.J *= a;
                    this.B *= a
                };
                a.Fb = new a(0, 0, 0, 0);
                a.lb = new a(1, 1, 1, 1);
                a.red = new a(1, 0, 0, 1);
                a.blue = new a(0, 0, 1, 1);
                a.green = new a(0, 1, 0, 1);
                a.ND = new a(0, 0, 0, 1);
                a.dv = a.lb;
                a.Ck = {
                    Zi: "rgba(255,255,255,1)",
                    CD: "rgba(0,0,0,0)"
                };
                return a
            }(),
            S = function() {
                return {
                    e: 0,
                    mb: 1,
                    Tb: 2,
                    Mf: 4,
                    Jb: 8,
                    Nf: 16,
                    Df: 32,
                    S: 18,
                    parse: function(a) {
                        var c = this.e;
                        0 < a.indexOf("LEFT") ? c = this.mb : 0 < a.indexOf("HCENTER") || "CENTER" === a ? c = this.Tb : 0 < a.indexOf("RIGHT") && (c = this.Mf);
                        0 < a.indexOf("TOP") ? c |= this.Jb :
                            0 < a.indexOf("VCENTER") || "CENTER" === a ? c |= this.Nf : 0 < a.indexOf("BOTTOM") && (c |= this.Df);
                        return c
                    }
                }
            }(),
            K = function() {
                function a(a, d) {
                    this.x = a;
                    this.y = d
                }
                a.prototype.add = function(a) {
                    this.x += a.x;
                    this.y += a.y
                };
                a.prototype.$a = function(a) {
                    this.x -= a.x;
                    this.y -= a.y
                };
                a.prototype.multiply = function(a) {
                    this.x *= a;
                    this.y *= a
                };
                a.prototype.jn = function(a) {
                    this.x /= a;
                    this.y /= a
                };
                a.prototype.Ma = function(a) {
                    var d = this.x - a.x;
                    a = this.y - a.y;
                    return Math.sqrt(d * d + a * a)
                };
                a.prototype.hd = function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                };
                a.prototype.Wn = function() {
                    return 0 === this.x && 0 === this.y
                };
                a.prototype.rj = function(a) {
                    return this.x === a.x && this.y === a.y
                };
                a.prototype.normalize = function() {
                    this.multiply(1 / this.hd())
                };
                a.prototype.a = function() {
                    return Math.atan(this.y / this.x)
                };
                a.prototype.og = function() {
                    return Math.atan2(this.y, this.x)
                };
                a.prototype.copy = function() {
                    return new a(this.x, this.y)
                };
                a.prototype.qa = function(a) {
                    this.x = a.x;
                    this.y = a.y
                };
                a.prototype.round = function() {
                    this.x = Math.round(this.x);
                    this.y = Math.round(this.y)
                };
                a.prototype.rotate =
                    function(a) {
                        var d = Math.cos(a);
                        a = Math.sin(a);
                        var b = this.x * a + this.y * d;
                        this.x = this.x * d - this.y * a;
                        this.y = b
                };
                a.prototype.pa = function(a, d, b) {
                    this.x -= d;
                    this.y -= b;
                    this.rotate(a);
                    this.x += d;
                    this.y += b
                };
                a.prototype.toString = function() {
                    return "[" + this.x + ", " + this.y + "]"
                };
                a.Qa = function() {
                    return new a(0, 0)
                };
                a.tF = new a(0, 0);
                a.Ph = function() {
                    return new a(2147483647, 2147483647)
                };
                a.TB = a.Ph();
                a.add = function(c, d) {
                    return new a(c.x + d.x, c.y + d.y)
                };
                a.$a = function(c, d) {
                    return new a(c.x - d.x, c.y - d.y)
                };
                a.multiply = function(c, d) {
                    return new a(c.x *
                        d, c.y * d)
                };
                a.jn = function(c, d) {
                    return new a(c.x / d, c.y / d)
                };
                a.Ma = function(a, d, b, f) {
                    a -= b;
                    d -= f;
                    return Math.sqrt(a * a + d * d)
                };
                a.Bt = function(c) {
                    return new a(-c.y, c.x)
                };
                a.tA = function(c) {
                    return new a(c.y, -c.x)
                };
                a.normalize = function(a) {
                    return this.multiply(a, 1 / a.hd())
                };
                a.IE = function(c) {
                    return new a(-c.x, -c.y)
                };
                a.Nw = Array(64);
                a.Ow = Array(64);
                a.lx = function(c, d) {
                    var b = new a(0, 0);
                    a.cu(c, d, b);
                    return b
                };
                a.cu = function(c, d, b) {
                    var f = c.length;
                    if (1 >= f) b.x = b.y = 0;
                    else {
                        for (var e = a.Nw, g = a.Ow, k = 1 - d, l = 0; l < f; l++) {
                            var n = c[l];
                            e[l] =
                                n.x;
                            g[l] = n.y
                        }
                        for (c = f - 1; 0 < c; f--, c--)
                            for (l = 0, n = 1; l < c; l++, n++) e[l] = e[l] * k + e[n] * d, g[l] = g[l] * k + g[n] * d;
                        b.x = e[0];
                        b.y = g[0]
                    }
                };
                a.Zx = function(c) {
                    return new a(Math.cos(c), Math.sin(c))
                };
                return a
            }(),
            N = {
                Xc: 5,
                Uk: 0.15,
                e: -1,
                Ef: 1E-6,
                $i: 1,
                kw: 80,
                kC: 0.15,
                fD: 10,
                lv: -2,
                Jf: 2147483647
            },
            P = function(a) {
                return {
                    eb: function(a) {
                        this.hi(document.getElementById(a))
                    },
                    hi: function(c) {
                        this.element = this.id = c;
                        this.context = this.element.getContext("2d");
                        this.rB(a.dv)
                    },
                    rB: function(a) {
                        a = a.fi();
                        this.context.fillStyle = a;
                        this.context.strokeStyle =
                            a
                    },
                    iF: function(a) {
                        this.context.fillStyle = a;
                        this.context.strokeStyle = a
                    },
                    Yx: function(a, d) {
                        var b = this.context,
                            f = a[0];
                        b.fillStyle = d;
                        b.beginPath();
                        b.moveTo(f.x, f.y);
                        for (var e = 1, g = a.length; e < g; e += 2) f = a[e], b.lineTo(f.x, f.y);
                        for (e = a.length - 2; 0 <= e; e -= 2) f = a[e], b.lineTo(f.x, f.y);
                        b.fill()
                    }
                }
            }(ca),
            ua = {
                Si: "ACTION_SET_VISIBLE",
                Tl: "ACTION_SET_TOUCHABLE",
                Ul: "ACTION_SET_UPDATEABLE",
                Ri: "ACTION_SET_DRAWQUAD",
                Il: "ACTION_PLAY_TIMELINE",
                Fq: "ACTION_PAUSE_TIMELINE",
                yw: "ACTION_STOP_TIMELINE",
                Wv: "ACTION_JUMP_TO_TIMELINE_FRAME"
            },
            Ha = function() {
                function a(a, b, f) {
                    this.Pr = a;
                    this.Qr = b;
                    this.$g = f
                }

                function c(a, b) {
                    this.Qw = a;
                    this.data = b
                }
                c.create = function(d, b, f, e) {
                    return new c(d, new a(b, f, e))
                };
                return c
            }(),
            Ia = {
                Yd: 0,
                Oe: 1,
                Ne: 2,
                Fe: 3,
                zd: 4,
                uC: 5
            },
            oa = function(a, c, d, b) {
                function f() {
                    this.b = a.Qa();
                    this.scale = a.Qa();
                    this.Sa = 0;
                    this.color = c.lb.copy();
                    this.Pe = []
                }

                function e(b, a, f, e) {
                    this.Pc = b;
                    this.oi = a;
                    this.Cg = f;
                    this.value = e
                }
                f.prototype.copy = function() {
                    var b = new f;
                    b.b = this.b.copy();
                    b.scale = this.scale.copy();
                    b.Sa = this.Sa;
                    b.color = this.color.copy();
                    b.Pe =
                        this.Pe.slice(0);
                    return b
                };
                e.prototype.copy = function() {
                    return new e(this.Pc, this.oi, this.Cg, this.value.copy())
                };
                e.A = {
                    LINEAR: 0,
                    cD: 1,
                    Ad: 2,
                    Hb: 3
                };
                e.io = function() {
                    return new e(0, b.Yd, e.A.LINEAR, new f)
                };
                e.Oa = function(a, c, d, n) {
                    var r = new f;
                    r.b.x = a;
                    r.b.y = c;
                    return new e(n, b.Yd, d, r)
                };
                e.Kj = function(a, c, d, n) {
                    var r = new f;
                    r.scale.x = a;
                    r.scale.y = c;
                    return new e(n, b.Oe, d, r)
                };
                e.re = function(a, c, d) {
                    var n = new f;
                    n.Sa = a;
                    return new e(d, b.Ne, c, n)
                };
                e.za = function(a, c, d) {
                    var n = new f;
                    n.color = a;
                    return new e(d, b.Fe, c, n)
                };
                e.Nh = function(a,
                    c) {
                    var d = new f;
                    d.Pe = a;
                    return new e(c, b.zd, e.A.LINEAR, d)
                };
                e.nz = function(a, c) {
                    var l = new f,
                        n = d.create(a, c, 0, 0);
                    l.Pe = [n];
                    return new e(0.04, b.zd, e.A.LINEAR, l)
                };
                return e
            }(K, ca, Ha, Ia),
            qb = function(a, c, d, b) {
                return a.extend({
                    init: function(a, e) {
                        this.type = e;
                        this.state = 0;
                        this.fk = !1;
                        this.ie = this.startTime = 0;
                        this.ka = [];
                        this.ub = a;
                        this.ba = b.e;
                        this.ce = c.io();
                        this.jh = c.io();
                        this.qh = c.io();
                        this.kb = this.Da = 0;
                        e === d.zd && (this.Pw = [])
                    },
                    fd: function() {
                        this.state = 0
                    },
                    w: function(b) {
                        this.qk(b, this.ka.length)
                    },
                    qk: function(b, a) {
                        this.ka[a] =
                            b;
                        this.type === d.zd && this.Pw.push(b.value.Pe)
                    },
                    xn: function(b) {
                        for (var a = 0, c = 0; c <= b; c++) a += this.ka[c].Pc;
                        return a
                    },
                    bC: function() {
                        this.startTime = this.xn(0);
                        this.ie = this.xn(this.ka.length - 1)
                    },
                    Uu: function(a) {
                        0 === this.state ? this.ub.vd ? this.ub.time + a < this.startTime || this.ub.time > this.ie || (1 < this.ka.length ? (this.state = 1, this.ba = this.ka.length - 1, this.kb = this.ie - this.ub.time, this.ba--, this.fg(this.ka[this.ba + 1], this.ka[this.ba].Pc)) : this.fg(this.ka[0], 0)) : this.ub.time - a > this.ie || this.ub.time < this.startTime ||
                            (1 < this.ka.length ? (this.state = 1, this.ba = 0, this.kb = this.ub.time - this.startTime, this.ba++, this.fg(this.ka[this.ba - 1], this.ka[this.ba].Pc)) : this.fg(this.ka[0], 0)) : (this.Da -= a, this.Da <= b.Ef && (this.ub.Qh && this.ub.Qh(this.ub, this.ka[this.ba], this.ba), this.kb = -this.Da, this.ba === this.ka.length - 1 ? (this.vg(this.ka[this.ba]), this.state = 0) : 0 === this.ba ? (this.vg(this.ka[this.ba]), this.state = 0) : this.ub.vd ? (this.ba--, a = this.ka[this.ba + 1], this.fg(a, a.Pc)) : (this.ba++, this.fg(this.ka[this.ba - 1], this.ka[this.ba].Pc))))
                    },
                    Yu: function(a) {
                        var e = this.ub,
                            g;
                        if (0 === this.state) e.time >= this.startTime && e.time <= this.ie && (this.state = 1, e.vd ? (this.ba = this.ka.length - 1, this.kb = this.ie - e.time, this.ba--, g = this.ka[this.ba + 1], this.zj(g, this.ka[this.ba], g.Pc)) : (this.ba = 0, this.kb = e.time - this.startTime, this.ba++, g = this.ka[this.ba], this.zj(this.ka[this.ba - 1], g, g.Pc)));
                        else {
                            this.Da -= a;
                            g = this.ka[this.ba];
                            if (g.Cg === c.A.Ad || g.Cg === c.A.Hb) switch (this.type) {
                                    case d.Yd:
                                        var k = this.jh.value.b;
                                        g = k.x * a;
                                        var k = k.y * a,
                                            l = this.ce.value.b,
                                            n = l.x,
                                            r = l.y;
                                        l.x +=
                                            g;
                                        l.y += k;
                                        e.element.x += (n + g / 2) * a;
                                        e.element.y += (r + k / 2) * a;
                                        break;
                                    case d.Oe:
                                        k = this.jh.value.scale;
                                        g = k.x * a;
                                        k = k.y * a;
                                        l = this.ce.value.scale;
                                        n = l.x;
                                        r = l.y;
                                        l.x += g;
                                        l.y += k;
                                        e.element.X += (n + g / 2) * a;
                                        e.element.da += (r + k / 2) * a;
                                        break;
                                    case d.Ne:
                                        g = this.jh.value.Sa * a;
                                        k = this.ce.value.Sa;
                                        this.ce.value.Sa += g;
                                        e.element.rotation += (k + g / 2) * a;
                                        break;
                                    case d.Fe:
                                        var m = this.ce.value.color;
                                        g = m.F;
                                        var k = m.K,
                                            l = m.J,
                                            n = m.B,
                                            p = this.jh.value.color,
                                            r = p.F * a,
                                            u = p.K * a,
                                            q = p.J * a,
                                            p = p.B * a;
                                        m.F += 2 * r;
                                        m.K += 2 * u;
                                        m.J += 2 * q;
                                        m.B += 2 * p;
                                        m = e.element.color;
                                        m.F += (g + r / 2) *
                                            a;
                                        m.K += (k + u / 2) * a;
                                        m.J += (l + q / 2) * a;
                                        m.B += (n + p / 2) * a
                                } else if (g.Cg === c.A.LINEAR) switch (g = e.element, k = this.ce.value, this.type) {
                                    case d.Yd:
                                        g.x += k.b.x * a;
                                        g.y += k.b.y * a;
                                        break;
                                    case d.Oe:
                                        g.X += k.scale.x * a;
                                        g.da += k.scale.y * a;
                                        break;
                                    case d.Ne:
                                        g.Sa += k.Sa * a;
                                        break;
                                    case d.Fe:
                                        g.color.F += k.color.F * a, g.color.K += k.color.K * a, g.color.J += k.color.J * a, g.color.B += k.color.B * a
                                }
                                this.Da <= b.Ef && (e.Qh && e.Qh(e, this.ka[this.ba], this.ba), this.kb = -this.Da, this.ba === this.ka.length - 1 ? (this.vg(this.ka[this.ba]), this.state = 0) : 0 === this.ba ? (this.vg(this.ka[this.ba]),
                                this.state = 0) : e.vd ? (this.ba--, g = this.ka[this.ba + 1], this.zj(g, this.ka[this.ba], g.Pc)) : (this.ba++, g = this.ka[this.ba], this.zj(this.ka[this.ba - 1], g, g.Pc)))
                        }
                    },
                    fg: function(a, b) {
                        this.Da = b;
                        this.vg(a);
                        0 < this.kb && (this.Uu(this.kb), this.kb = 0)
                    },
                    vg: function(a) {
                        switch (this.type) {
                            case d.Yd:
                                var b = this.ub.element;
                                a = a.value.b;
                                if (this.fk) {
                                    var c = this.qh.value.b;
                                    b.x = c.x + a.x;
                                    b.y = c.y + a.y
                                } else b.x = a.x, b.y = a.y;
                                break;
                            case d.Oe:
                                a = a.value.scale;
                                b = this.ub.element;
                                this.fk ? (c = this.qh.value.scale, b.X = c.x + a.x, b.da = c.y + a.y) : (b.X =
                                    a.x, b.da = a.y);
                                break;
                            case d.Ne:
                                this.ub.element.rotation = this.fk ? this.qh.value.Sa + a.value.Sa : a.value.Sa;
                                break;
                            case d.Fe:
                                b = this.ub.element.color;
                                a = a.value.color;
                                this.fk ? (c = this.qh.value.color, b.F = c.F + a.F, b.K = c.K + a.K, b.J = c.J + a.J, b.B = c.B + a.B) : b.qa(a);
                                break;
                            case d.zd:
                                for (b = a.value.Pe, a = 0, c = b.length; a < c; a++) {
                                    var k = b[a];
                                    k.Qw.Ns(k.data)
                                }
                        }
                    },
                    cB: function(a) {
                        a = a.value;
                        var b = this.ub.element;
                        switch (this.type) {
                            case d.Yd:
                                a.b.x = b.x;
                                a.b.y = b.y;
                                break;
                            case d.Oe:
                                a.scale.x = b.X;
                                a.scale.y = b.da;
                                break;
                            case d.Ne:
                                a.Sa = b.rotation;
                                break;
                            case d.Fe:
                                a.color.qa(b.color)
                        }
                    },
                    zj: function(a, b, g) {
                        this.Da = g;
                        this.cB(this.qh);
                        this.vg(a);
                        g = this.ce.value;
                        var k = this.jh.value;
                        switch (this.type) {
                            case d.Yd:
                                var l = g.b,
                                    n = b.value.b;
                                a = a.value.b;
                                l.x = (n.x - a.x) / this.Da;
                                l.y = (n.y - a.y) / this.Da;
                                break;
                            case d.Oe:
                                l = g.scale;
                                n = b.value.scale;
                                a = a.value.scale;
                                l.x = (n.x - a.x) / this.Da;
                                l.y = (n.y - a.y) / this.Da;
                                break;
                            case d.Ne:
                                g.Sa = (b.value.Sa - a.value.Sa) / this.Da;
                                break;
                            case d.Fe:
                                l = g.color, n = b.value.color, a = a.value.color, l.F = (n.F - a.F) / this.Da, l.K = (n.K - a.K) / this.Da, l.J = (n.J -
                                    a.J) / this.Da, l.B = (n.B - a.B) / this.Da
                        }
                        a = b.Cg === c.A.Ad;
                        b = b.Cg == c.A.Hb;
                        if (a || b) switch (this.type) {
                            case d.Yd:
                                l = g.b;
                                b = k.b;
                                l.multiply(2);
                                b.x = l.x / this.Da;
                                b.y = l.y / this.Da;
                                a ? (l.x = 0, l.y = 0) : b.multiply(-1);
                                break;
                            case d.Oe:
                                l = g.scale;
                                b = k.scale;
                                l.multiply(2);
                                b.x = l.x / this.Da;
                                b.y = l.y / this.Da;
                                a ? (l.x = 0, l.y = 0) : b.multiply(-1);
                                break;
                            case d.Ne:
                                g.Sa *= 2;
                                k.Sa = g.Sa / this.Da;
                                a ? g.Sa = 0 : k.Sa *= -1;
                                break;
                            case d.Fe:
                                l = g.color, b = k.color, l.multiply(2), b.F = l.F / this.Da, b.K = l.K / this.Da, b.J = l.J / this.Da, b.B = l.B / this.Da, a ? l.multiply(0) : b.multiply(-1)
                        }
                        0 <
                            this.kb && (this.Yu(this.kb), this.kb = 0)
                    }
                })
            }(ba, oa, Ia, N),
            fa = function(a, c, d, b) {
                var f = a.extend({
                    init: function() {
                        this.length = this.time = 0;
                        this.jf = b.e;
                        this.state = f.Z.Xg;
                        this.Jj = f.ha.Wa;
                        this.Qc = [];
                        this.Qh = this.cb = null;
                        this.vd = !1;
                        this.element = null
                    },
                    w: function(a) {
                        var b = this.Qc[a.oi];
                        this.qk(a, null == b ? 0 : b.ka.length)
                    },
                    qk: function(a, b) {
                        var f = this.Qc[a.oi];
                        f || (this.Qc[a.oi] = f = new c(this, a.oi));
                        f.qk(a, b)
                    },
                    Ks: function(a) {
                        return this.Qc[a]
                    },
                    play: function() {
                        if (this.state !== f.Z.Tg) {
                            this.time = 0;
                            this.vd = !1;
                            for (var a = this.length =
                                0, b = this.Qc.length; a < b; a++) {
                                var c = this.Qc[a];
                                c && (c.bC(), c.ie > this.length && (this.length = c.ie))
                            }
                        }
                        this.state = f.Z.Hq;
                        this.update(0)
                    },
                    pause: function() {
                        this.state = f.Z.Tg
                    },
                    Vs: function(a, b) {
                        this.state === f.Z.Xg && (this.state = f.Z.Tg);
                        this.update(this.Qc[a].xn(b) - this.time)
                    },
                    stop: function() {
                        this.state = f.Z.Xg;
                        this.zx()
                    },
                    zx: function() {
                        for (var a = 0, b = this.Qc.length; a < b; a++) {
                            var f = this.Qc[a];
                            f && f.fd()
                        }
                    },
                    update: function(a) {
                        if (this.state === f.Z.Hq) {
                            this.time = this.vd ? this.time - a : this.time + a;
                            for (var c = 0, k = this.Qc.length; c <
                                k; c++) {
                                var l = this.Qc[c];
                                null != l && (l.type === d.zd ? l.Uu(a) : l.Yu(a))
                            }
                            switch (this.Jj) {
                                case f.ha.Gq:
                                    !1 === this.vd && this.time >= this.length - b.Ef ? (this.time = Math.max(0, this.length - (this.time - this.length)), this.vd = !0) : this.vd && this.time <= b.Ef && (0 < this.jf && (this.jf--, 0 === this.jf && (this.stop(), this.cb && this.cb(this))), this.time = Math.min(-this.time, this.length), this.vd = !1);
                                    break;
                                case f.ha.vb:
                                    this.time >= this.length - b.Ef && (0 < this.jf && (this.jf--, 0 === this.jf && (this.stop(), this.cb && this.cb(this))), this.time = Math.min(this.time -
                                        this.length, this.length));
                                    break;
                                case f.ha.Wa:
                                    this.time >= this.length - b.Ef && (this.stop(), this.cb && this.cb(this))
                            }
                        }
                    }
                });
                f.ha = {
                    Wa: 0,
                    vb: 1,
                    Gq: 2
                };
                f.Z = {
                    Xg: 0,
                    Hq: 1,
                    Tg: 2
                };
                return f
            }(ba, qb, Ia, N),
            ea = function() {
                return {
                    ZD: 6.283185307179586,
                    dc: function(a) {
                        return 0.017453292519943295 * a
                    },
                    Bg: function(a) {
                        return 57.29577951308232 * a
                    }
                }
            }(),
            ia = function(a, c, d, b, f, e, g, k) {
                return a.extend({
                    init: function() {
                        this.parent = null;
                        this.qi = this.Yb = this.visible = !0;
                        this.name = null;
                        this.ug = this.Rd = this.rotation = this.height = this.width = this.fa =
                            this.ea = this.y = this.x = 0;
                        this.da = this.X = 1;
                        this.color = c.lb.copy();
                        this.Ru = this.Qu = 0;
                        this.anchor = d.Jb | d.mb;
                        this.oa = d.e;
                        this.Wh = this.te = !0;
                        this.Vj = !1;
                        this.children = [];
                        this.Be = [];
                        this.Vf = b.e;
                        this.yb = null
                    },
                    dh: function() {
                        var a = this.oa,
                            b = this.parent,
                            f = this.anchor;
                        a !== d.e ? (a & d.mb ? this.ea = b.ea + this.x : a & d.Tb ? this.ea = b.ea + this.x + b.width / 2 : a & d.Mf && (this.ea = b.ea + this.x + b.width), a & d.Jb ? this.fa = b.fa + this.y : a & d.Nf ? this.fa = b.fa + this.y + b.height / 2 : a & d.Df && (this.fa = b.fa + this.y + b.height)) : (this.ea = this.x, this.fa = this.y);
                        f & d.Jb || (f & d.Nf ? this.fa -= this.height / 2 : f & d.Df && (this.fa -= this.height));
                        f & d.mb || (f & d.Tb ? this.ea -= this.width / 2 : f & d.Mf && (this.ea -= this.width))
                    },
                    vc: function() {
                        this.dh();
                        var a = 0 !== this.X && 0 !== this.da && (1 !== this.X || 1 !== this.da),
                            b = 0 !== this.rotation,
                            c = 0 !== this.Qu || 0 !== this.Ru,
                            d = f.context;
                        d.save();
                        if (a || b) {
                            var e = this.ea + this.width / 2 + this.Rd,
                                g = this.fa + this.height / 2 + this.ug,
                                q = 0 !== e || 0 !== g;
                            q && d.translate(e, g);
                            b && d.rotate(k.dc(this.rotation));
                            a && d.scale(this.X, this.da);
                            q && d.translate(-e, -g)
                        }
                        c && d.translate(this.Qu,
                            this.Ru);
                        this.ak = d.globalAlpha;
                        1 !== this.color.B && this.color.B !== this.ak && (d.globalAlpha = this.color.B)
                    },
                    v: function() {
                        this.vc();
                        this.uc()
                    },
                    Yf: function() {
                        var a = f.context;
                        a.strokeStyle = "red";
                        a.strokeRect(this.ea, this.fa, this.width, this.height)
                    },
                    uc: function() {
                        var a = f.context,
                            b = 1 !== this.color.B && this.color.B !== this.ak;
                        if (this.dE) {
                            var c = this.ea + (this.width >> 1) + this.Rd,
                                d = this.fa + (this.height >> 1) + this.ug;
                            a.save();
                            a.lineWidth = 5;
                            a.strokeStyle = "#ff0000";
                            a.beginPath();
                            a.moveTo(c, d);
                            a.lineTo(c, d - 100);
                            a.closePath();
                            a.stroke();
                            a.restore()
                        }
                        this.te ? !this.Wh && b && (f.context.globalAlpha = this.ak) : (this.Ss && this.Yf(), a.restore(), this.Wh && b && (f.context.globalAlpha = this.color.B));
                        for (var c = this.children, d = c.length, e = 0; e < d; e++) {
                            var g = c[e];
                            g.visible && g.v()
                        }
                        this.te ? (this.Ss && this.Yf(), a.restore()) : this.Wh && b && (f.context.globalAlpha = this.ak)
                    },
                    update: function(a) {
                        for (var b = this.children, f = b.length, c = 0; c < f; c++) {
                            var d = b[c];
                            d.qi && d.update(a)
                        }
                        this.yb && this.yb.update(a)
                    },
                    hy: function(a) {
                        for (var b = this.children, f = b.length, c = 0; c < f; c++) {
                            var d =
                                b[c];
                            if (d.name === a) return d;
                            d = d.hy(a);
                            if (null !== d) return d
                        }
                        return null
                    },
                    hF: function() {
                        this.dh();
                        for (var a = this.ea, b = this.fa, f = this.ea + this.width, c = this.fa + this.height, d = this.children, e = d.length, g = 0; g < e; g++) {
                            var k = d[g];
                            k.dh();
                            k.ea < a && (a = k.ea);
                            k.fa < b && (b = k.fa);
                            var s = k.ea + k.width,
                                k = k.fa + k.height;
                            s > f && (f = s);
                            k > c && (c = k)
                        }
                        this.width = f - a;
                        this.height = c - b
                    },
                    Ns: function(a) {
                        switch (a.Pr) {
                            case e.Si:
                                this.visible = 0 !== a.$g;
                                break;
                            case e.Ul:
                                this.qi = 0 !== a.$g;
                                break;
                            case e.Tl:
                                this.Yb = 0 !== a.$g;
                                break;
                            case e.Il:
                                this.R(a.$g);
                                break;
                            case e.Fq:
                                this.eA();
                                break;
                            case e.yw:
                                this.Bu();
                                break;
                            case e.Wv:
                                this.yb.Vs(a.Qr, a.$g);
                                break;
                            default:
                                return !1
                        }
                        return !0
                    },
                    T: function(a) {
                        this.children.push(a);
                        a.parent = this;
                        return this.children.length - 1
                    },
                    ae: function(a, b) {
                        this.children[b] = a;
                        a.parent = this
                    },
                    Ot: function(a) {
                        this.children.splice(a, 1).parent = null
                    },
                    Nt: function() {
                        this.children = []
                    },
                    removeChild: function(a) {
                        for (var b = this.children, f = b.length, c = 0; c < f; c++)
                            if (a === b[c]) {
                                this.Ot(c);
                                break
                            }
                    },
                    fb: function(a) {
                        return this.children[a]
                    },
                    UD: function() {
                        return this.children.length
                    },
                    getChildren: Da("children"),
                    Ur: function(a) {
                        var b = this.Be.length;
                        this.Kb(a, b);
                        return b
                    },
                    Kb: function(a, b) {
                        a.element = this;
                        this.Be[b] = a
                    },
                    BA: function(a) {
                        this.Vf === a && this.Bu();
                        a < this.Be.length && this.Be.splice(a, 1)
                    },
                    R: function(a) {
                        this.yb && this.yb.state !== g.Z.Xg && this.yb.stop();
                        this.Vf = a;
                        this.yb = this.Be[a];
                        this.yb.play()
                    },
                    eA: function() {
                        this.yb.pause()
                    },
                    Bu: function() {
                        this.yb.stop();
                        this.yb = null;
                        this.Vf = b.e
                    },
                    pc: function(a) {
                        return this.Be[a]
                    },
                    Sj: function(a, b) {
                        for (var f = !1, c = this.children.length - 1; 0 <= c; c--) {
                            var d =
                                this.children[c];
                            if (d && d.Yb && d.Sj(a, b) && !1 === f && (f = !0, !this.Vj)) break
                        }
                        return f
                    },
                    Tj: function(a, b) {
                        for (var f = !1, c = this.children.length - 1; 0 <= c; c--) {
                            var d = this.children[c];
                            if (d && d.Yb && d.Tj(a, b) && !1 === f && (f = !0, !this.Vj)) break
                        }
                        return f
                    },
                    ro: function(a, b) {
                        for (var f = !1, c = this.children.length - 1; 0 <= c; c--) {
                            var d = this.children[c];
                            if (d && d.Yb && d.ro(a, b) && !1 === f && (f = !0, !this.Vj)) break
                        }
                        return f
                    },
                    st: function(a, b) {
                        for (var f = !1, c = this.children.length - 1; 0 <= c; c--) {
                            var d = this.children[c];
                            if (d && d.Yb && d.st(a, b) && !1 === f &&
                                (f = !0, !this.Vj)) break
                        }
                        return f
                    },
                    setEnabled: function(a) {
                        this.qi = this.Yb = this.visible = a
                    },
                    isEnabled: function() {
                        return this.visible && this.Yb && this.qi
                    },
                    show: function() {
                        for (var a = this.children, b = a.length, f = 0; f < b; f++) {
                            var c = a[f];
                            c.visible && c.show()
                        }
                    },
                    hide: function() {
                        for (var a = this.children, b = a.length, f = 0; f < b; f++) {
                            var c = a[f];
                            c.visible && c.hide()
                        }
                    }
                })
            }(ba, ca, S, N, P, ua, fa, ea),
            U = function(a) {
                function c(a, b, f, c) {
                    this.x = a;
                    this.y = b;
                    this.M = f;
                    this.U = c
                }

                function d(a, c, d, r, m) {
                    return (m.x < a ? b : 0) + (m.x > d ? f : 0) + (m.y < c ? e : 0) + (m.y >
                        r ? g : 0)
                }
                c.copy = function(a) {
                    return new c(a.x, a.y, a.M, a.U)
                };
                c.Sd = function(a, b) {
                    return new c(a.x * b, a.y * b, a.M * b, a.U * b)
                };
                c.ai = function(a, b, f, c, d, e, g, q) {
                    return !(a > g || f < d || b > q || c < e)
                };
                c.Mt = function(a, b, f, d, e, g, u, q) {
                    a = new c(e - a, g - b, u, q);
                    0 > a.x && (a.M += a.x, a.x = 0);
                    a.x + a.M > f && (a.M = f - a.x);
                    0 > a.y && (a.U += a.y, a.y = 0);
                    a.y + a.U > d && (a.U = d - a.y);
                    return a
                };
                c.Db = function(a, b, f, c, d, e) {
                    return a >= f && a < f + d && b >= c && b < c + e
                };
                var b = 1,
                    f = 2,
                    e = 4,
                    g = 8;
                c.hf = function(c, l, n, r, m, p, u, q) {
                    var A, s, z = new a(c, l),
                        h = new a(n, r),
                        C;
                    u = m + u;
                    var D = p + q;
                    q = d(m, p,
                        u, D, z);
                    for (A = d(m, p, u, D, h); q || A;) {
                        if (q & A) return !1;
                        q ? (s = q, C = z) : (s = A, C = h);
                        s & b ? (C.y += (l - r) * (m - C.x) / (c - n), C.x = m) : s & f && (C.y += (l - r) * (u - C.x) / (c - n), C.x = u);
                        s & e ? (C.x += (c - n) * (p - C.y) / (l - r), C.y = p) : s & g && (C.x += (c - n) * (D - C.y) / (l - r), C.y = D);
                        s == q ? q = d(m, p, u, D, z) : A = d(m, p, u, D, h)
                    }
                    return !0
                };
                return c
            }(K),
            Ja = function(a, c, d, b) {
                return a.extend({
                    init: function(a) {
                        this.h();
                        this.L = a;
                        this.Pj = d.e;
                        this.vf = [];
                        this.Ce = [];
                        this.Qf = []
                    },
                    Ua: function(a, b, c, d) {
                        this.vf[a] = b;
                        this.Ce[a] = c;
                        this.Qf[a] = null != d ? d : 1
                    },
                    AA: function(a) {
                        this.vf.splice(a,
                            1);
                        this.Ce.splice(a, 1);
                        this.Qf.splice(a, 1)
                    },
                    Lj: function(a, c, d, k) {
                        this.vf[k] = b.copy(this.L.f[a]);
                        var l = this.L.p[a];
                        a = this.L.f[a];
                        this.Ce[k] = new b(c + l.x, d + l.y, a.M, a.U);
                        this.Qf[k] = 1
                    },
                    ws: function(a) {
                        a > this.vf.length && (a = this.vf.length);
                        for (var b = c.context, d = 0; d < a; d++) {
                            var k = this.vf[d],
                                l = this.Ce[d],
                                n = this.Qf[d],
                                r = b.globalAlpha,
                                m = Math.ceil(k.M),
                                p = Math.ceil(k.U);
                            if (0 !== m && 0 !== p) {
                                if (null == n) n = 1;
                                else if (0 >= n) continue;
                                else 1 > n && (b.globalAlpha = n);
                                var u = this.tg && this.tg.length > d;
                                if (u) {
                                    var q = this.tg[d],
                                        A = this.mk[d],
                                        s = 0 !== A.x || 0 !== A.y;
                                    0 !== q && (s && b.translate(A.x, A.y), b.rotate(q), s && b.translate(-A.x, -A.y))
                                }
                                var z, h, C;
                                this.Ha ? (z = Math.round(l.x / this.Ha) * this.Ha, h = Math.round(l.y / this.Ha) * this.Ha, C = Math.round(l.M / this.Ha) * this.Ha, l = Math.round(l.U / this.Ha) * this.Ha) : (z = Math.round(l.x), h = Math.round(l.y), C = Math.ceil(l.M), l = Math.ceil(l.U));
                                b.drawImage(this.L.qc, k.x, k.y, m, p, z, h, C, l);
                                u && 0 !== q && (s && b.translate(A.x, A.y), b.rotate(-q), s && b.translate(-A.x, -A.y));
                                1 !== n && (b.globalAlpha = r)
                            }
                        }
                    },
                    v: function() {
                        this.vc();
                        if (0 !== this.color.B) {
                            var a =
                                c.context,
                                b = 0 !== this.ea || 0 !== this.fa;
                            b && a.translate(this.ea, this.fa);
                            this.ws(this.Pj === d.e ? this.vf.length : this.Pj);
                            b && a.translate(-this.ea, -this.fa)
                        }
                        this.uc()
                    }
                })
            }(ia, P, N, U),
            w = {
                IC: 0,
                LC: 1,
                GC: 2,
                PC: 3,
                Ff: 4,
                Kg: 5,
                UC: 6,
                ia: 7,
                AD: 8,
                Yl: 9,
                Xl: 10,
                Wl: 11,
                Zl: 12,
                cm: 13,
                em: 14,
                fm: 15,
                gm: 16,
                fr: 17,
                jm: 18,
                gr: 19,
                hr: 20,
                ir: 21,
                km: 22,
                qm: 23,
                jr: 24,
                kr: 25,
                Cd: 26,
                hm: 27,
                dr: 28,
                er: 29,
                im: 30,
                nm: 31,
                om: 32,
                pm: 33,
                rm: 34,
                sm: 35,
                Ui: 36,
                Vi: 37,
                $l: 38,
                Vl: 39,
                MC: 40,
                NC: 41,
                YC: 42,
                OC: 43,
                VC: 44,
                TC: 45,
                WC: 46,
                RC: 47,
                SC: 48,
                QC: 49,
                JC: 50,
                Bc: 51,
                Rg: 52,
                HC: 53,
                XC: 54,
                ZC: 55,
                Xk: 56,
                KC: 57,
                $C: 58,
                ul: 59,
                Pg: 60,
                kl: 61,
                Ji: 62,
                tl: 63,
                Hi: 64,
                ll: 65,
                ml: 66,
                Wc: 67,
                Gi: 68,
                sl: 69,
                rl: 70,
                ql: 71,
                Hf: 73,
                Ii: 74,
                Je: 75,
                Li: 76,
                vl: 77,
                If: 78,
                il: 79,
                jl: 80,
                jc: 81,
                lm: 82,
                mm: 83,
                Ti: 84,
                Vg: 85,
                bm: 105,
                am: 106,
                sw: 107,
                hl: 108,
                Mi: 111,
                nl: 112,
                ol: 113,
                pl: 114,
                Qg: 115,
                Og: 116,
                Ki: 117,
                Wi: 118,
                Xi: 119,
                Fi: 120,
                cl: 121,
                Xp: 122,
                dl: 123,
                Yp: 124,
                Zp: 125,
                $p: 126,
                el: 127,
                aq: 128,
                bq: 129,
                cq: 130,
                fl: 131,
                dq: 132,
                fq: 133,
                gq: 134,
                gl: 135,
                iq: 136,
                jq: 137,
                kq: 138,
                lq: 139,
                nq: 140,
                oq: 141,
                pq: 142,
                qq: 143,
                rq: 144,
                sq: 145,
                tq: 146,
                uq: 147,
                vq: 148,
                wq: 149,
                vv: 150,
                wv: 151,
                xv: 152,
                yv: 153,
                Bv: 154,
                Cv: 155,
                Dv: 156,
                Ev: 157,
                Fv: 158,
                Gv: 159,
                Hv: 160,
                Iv: 161,
                Jv: 162,
                Kv: 163,
                Lv: 164,
                Mv: 165,
                Nv: 166,
                Ov: 167,
                Pv: 168,
                Qv: 169,
                Sv: 170,
                Tv: 171,
                Uv: 172,
                Vv: 173,
                Zq: 174,
                $q: 175,
                br: 176,
                ar: 177,
                cr: 178,
                lr: 179,
                Rv: 180,
                ic: 72,
                Ie: 181,
                Ng: 182,
                dm: 183,
                mD: 183
            },
            rb = [{
                id: w.Ff,
                dd: -1,
                sc: -42,
                fc: 20,
                Se: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a9\u00c0\u00e0\u00c2\u00e2\u00c6\u00e6\u00c7\u00e7\u00c8\u00e8\u00c9\u00e9\u00ca\u00ea\u00cb\u00eb\u00ce\u00ee\u00cf\u00ef\u00d4\u00f4\u0152\u0153\u00d9\u00f9\u00db\u00fb\u00dc\u00fc\u00ab\u00bb\u20ac\u00c4\u00e4\u00c9\u00e9\u00d6\u00f6\u00dc\u00fc\u00df\u201e\u201c\u201d\u00b0\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
                ef: {},
                f: [4, 4, 33, 156, 41, 4, 38, 156, 83, 4, 61, 156, 148, 4, 41, 156, 193, 4, 73, 156, 270, 4, 38, 156, 312, 4, 19, 156, 335, 4, 44, 156, 383, 4, 41, 156, 428, 4, 54, 156, 486, 4, 43, 156, 533, 4, 22, 156, 559, 4, 46, 156, 609, 4, 23, 156, 636, 4, 51, 156, 691, 4, 54, 156, 749, 4, 23, 156, 776, 4, 53, 156, 833, 4, 44, 156, 881, 4, 48, 156, 933, 4, 51, 156, 4, 164, 49, 156, 57, 164, 52, 156, 113, 164, 55, 156, 172, 164, 41, 156, 217, 164, 24, 156, 245, 164, 24, 156, 273, 164, 59, 156, 336, 164, 36, 156, 376, 164, 51, 156, 431, 164, 44, 156, 479, 164, 62, 156, 545, 164, 51, 156, 600, 164, 51, 156, 655, 164, 58, 156, 717, 164, 48, 156, 769,
                    164, 46, 156, 819, 164, 45, 156, 868, 164, 50, 156, 922, 164, 49, 156, 975, 164, 24, 156, 4, 324, 45, 156, 53, 324, 45, 156, 102, 324, 54, 156, 160, 324, 73, 156, 237, 324, 43, 156, 284, 324, 63, 156, 351, 324, 59, 156, 414, 324, 54, 156, 472, 324, 51, 156, 527, 324, 57, 156, 588, 324, 56, 156, 648, 324, 59, 156, 711, 324, 52, 156, 767, 324, 74, 156, 845, 324, 63, 156, 912, 324, 47, 156, 4, 484, 67, 156, 75, 484, 65, 156, 144, 484, 54, 156, 202, 484, 56, 156, 262, 484, 40, 156, 306, 484, 74, 156, 384, 484, 24, 156, 412, 484, 45, 156, 461, 484, 51, 156, 516, 484, 49, 156, 569, 484, 48, 156, 621, 484, 43, 156, 668, 484, 47, 156, 719,
                    484, 42, 156, 765, 484, 43, 156, 812, 484, 25, 156, 841, 484, 39, 156, 884, 484, 50, 156, 938, 484, 22, 156, 4, 644, 69, 156, 77, 644, 40, 156, 121, 644, 37, 156, 162, 644, 45, 156, 211, 644, 63, 156, 278, 644, 43, 156, 325, 644, 44, 156, 373, 644, 52, 156, 429, 644, 46, 156, 479, 644, 54, 156, 537, 644, 73, 156, 614, 644, 59, 156, 677, 644, 54, 156, 735, 644, 58, 156, 797, 644, 57, 156, 858, 644, 25, 156, 887, 644, 42, 156, 933, 644, 49, 156, 4, 804, 75, 156, 83, 804, 51, 156, 138, 804, 44, 156, 186, 804, 51, 156, 241, 804, 47, 156, 292, 804, 83, 156, 379, 804, 62, 156, 445, 804, 54, 156, 503, 804, 43, 156, 550, 804, 45, 156, 599,
                    804, 45, 156, 648, 804, 45, 156, 697, 804, 45, 156, 746, 804, 45, 156, 795, 804, 45, 156, 844, 804, 45, 156, 893, 804, 45, 156, 942, 804, 41, 156, 4, 964, 41, 156, 49, 964, 33, 156, 86, 964, 34, 156, 124, 964, 63, 156, 191, 964, 48, 156, 243, 964, 82, 156, 329, 964, 61, 156, 394, 964, 53, 156, 451, 964, 44, 156, 499, 964, 53, 156, 556, 964, 43, 156, 603, 964, 53, 156, 660, 964, 43, 156, 707, 964, 53, 156, 764, 964, 59, 156, 827, 964, 65, 156, 896, 964, 51, 156, 951, 964, 44, 156, 4, 1124, 45, 156, 53, 1124, 45, 156, 102, 1124, 63, 156, 169, 1124, 48, 156, 221, 1124, 53, 156, 278, 1124, 43, 156, 325, 1124, 53, 156, 382, 1124, 43,
                    156, 429, 1124, 43, 156, 476, 1124, 43, 156, 523, 1124, 40, 156, 567, 1124, 65, 156, 636, 1124, 47, 156, 687, 1124, 50, 156, 741, 1124, 49, 156, 794, 1124, 64, 156, 862, 1124, 46, 156, 912, 1124, 46, 156, 4, 1284, 73, 156, 81, 1284, 46, 156, 131, 1284, 54, 156, 189, 1284, 54, 156, 247, 1284, 62, 156, 313, 1284, 62, 156, 379, 1284, 64, 156, 447, 1284, 52, 156, 503, 1284, 59, 156, 566, 1284, 53, 156, 623, 1284, 48, 156, 675, 1284, 49, 156, 728, 1284, 59, 156, 791, 1284, 55, 156, 850, 1284, 59, 156, 913, 1284, 55, 156, 4, 1444, 58, 156, 66, 1444, 49, 156, 119, 1444, 72, 156, 195, 1444, 83, 156, 282, 1444, 62, 156, 348, 1444,
                    58, 156, 410, 1444, 50, 156, 464, 1444, 48, 156, 516, 1444, 67, 156, 587, 1444, 51, 156, 642, 1444, 44, 156, 690, 1444, 41, 156, 735, 1444, 39, 156, 778, 1444, 37, 156, 819, 1444, 41, 156, 864, 1444, 40, 156, 908, 1444, 40, 156, 952, 1444, 61, 156, 4, 1604, 38, 156, 46, 1604, 43, 156, 93, 1604, 43, 156, 140, 1604, 44, 156, 188, 1604, 45, 156, 237, 1604, 62, 156, 303, 1604, 42, 156, 349, 1604, 40, 156, 393, 1604, 49, 156, 446, 1604, 46, 156, 496, 1604, 38, 156, 538, 1604, 69, 156, 611, 1604, 42, 156, 657, 1604, 61, 156, 722, 1604, 43, 156, 769, 1604, 45, 156, 818, 1604, 40, 156, 862, 1604, 63, 156, 929, 1604, 65, 156, 4,
                    1764, 51, 156, 59, 1764, 51, 156, 114, 1764, 40, 156, 158, 1764, 39, 156, 201, 1764, 60, 156, 265, 1764, 40, 156, 309, 1764, 112, 156
                ]
            }, {
                id: w.Kg,
                dd: 2,
                sc: -90,
                fc: 15,
                Se: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a9\u00c0\u00e0\u00c2\u00e2\u00c6\u00e6\u00c7\u00e7\u00c8\u00e8\u00c9\u00e9\u00ca\u00ea\u00cb\u00eb\u00ce\u00ee\u00cf\u00ef\u00d4\u00f4\u0152\u0153\u00d9\u00f9\u00db\u00fb\u00dc\u00fc\u00ab\u00bb\u20ac\u00c4\u00e4\u00c9\u00e9\u00d6\u00f6\u00dc\u00fc\u00df\u201e\u201c\u201d\u00b0\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
                ef: {},
                f: [4, 4, 16, 156, 24, 4, 19, 156, 47, 4, 35, 156, 86, 4, 21, 156, 111, 4, 43, 156, 158, 4, 19, 156, 181, 4, 7, 156, 192, 4, 24, 156, 220, 4, 23, 156, 247, 4, 30, 156, 281, 4, 24, 156, 309, 4, 9, 156, 322, 4, 25, 156, 351, 4, 10, 156, 365, 4, 28, 156, 397, 4, 31, 156, 432, 4, 10, 156, 446, 4, 29, 156, 479, 4, 24, 156, 507, 4, 26, 156, 537, 4, 29, 156, 570, 4, 28, 156, 602, 4, 29, 156, 635, 4, 31, 156, 670, 4, 21, 156, 695, 4, 10, 156, 709, 4, 10, 156, 723, 4, 33, 156, 760, 4, 19, 156, 783, 4, 28, 156, 815, 4, 24, 156, 843, 4, 36, 156, 883, 4, 28, 156, 915, 4, 28, 156, 947, 4, 32, 156, 983, 4, 27, 156, 4, 164, 25, 156, 33, 164, 24, 156, 61, 164,
                    28, 156, 93, 164, 28, 156, 125, 164, 10, 156, 139, 164, 25, 156, 168, 164, 24, 156, 196, 164, 31, 156, 231, 164, 43, 156, 278, 164, 24, 156, 306, 164, 37, 156, 347, 164, 34, 156, 385, 164, 30, 156, 419, 164, 29, 156, 452, 164, 32, 156, 488, 164, 31, 156, 523, 164, 34, 156, 561, 164, 29, 156, 594, 164, 43, 156, 641, 164, 36, 156, 681, 164, 26, 156, 711, 164, 39, 156, 754, 164, 38, 156, 796, 164, 30, 156, 830, 164, 32, 156, 866, 164, 22, 156, 892, 164, 44, 156, 940, 164, 11, 156, 955, 164, 25, 156, 984, 164, 29, 156, 4, 324, 27, 156, 35, 324, 26, 156, 65, 324, 24, 156, 93, 324, 26, 156, 123, 324, 23, 156, 150, 324, 24, 156, 178, 324,
                    11, 156, 193, 324, 20, 156, 217, 324, 28, 156, 249, 324, 9, 156, 262, 324, 41, 156, 307, 324, 21, 156, 332, 324, 20, 156, 356, 324, 25, 156, 385, 324, 36, 156, 425, 324, 22, 156, 451, 324, 24, 156, 479, 324, 29, 156, 512, 324, 26, 156, 542, 324, 31, 156, 577, 324, 43, 156, 624, 324, 34, 156, 662, 324, 30, 156, 696, 324, 33, 156, 733, 324, 32, 156, 769, 324, 12, 156, 785, 324, 22, 156, 811, 324, 27, 156, 842, 324, 45, 156, 891, 324, 29, 156, 924, 324, 24, 156, 952, 324, 29, 156, 985, 324, 26, 156, 4, 484, 49, 156, 57, 484, 36, 156, 97, 484, 30, 156, 131, 484, 23, 156, 158, 484, 24, 156, 186, 484, 24, 156, 214, 484, 24, 156, 242,
                    484, 24, 156, 270, 484, 24, 156, 298, 484, 24, 156, 326, 484, 24, 156, 354, 484, 24, 156, 382, 484, 22, 156, 408, 484, 22, 156, 434, 484, 17, 156, 455, 484, 17, 156, 476, 484, 36, 156, 516, 484, 27, 156, 547, 484, 50, 156, 601, 484, 35, 156, 640, 484, 29, 156, 673, 484, 24, 156, 701, 484, 29, 156, 734, 484, 23, 156, 761, 484, 29, 156, 794, 484, 23, 156, 821, 484, 30, 156, 855, 484, 34, 156, 893, 484, 37, 156, 934, 484, 29, 156, 967, 484, 24, 156, 995, 484, 24, 156, 4, 644, 24, 156, 32, 644, 36, 156, 72, 644, 27, 156, 103, 644, 29, 156, 136, 644, 23, 156, 163, 644, 30, 156, 197, 644, 23, 156, 224, 644, 23, 156, 251, 644, 23, 156,
                    278, 644, 22, 156, 304, 644, 38, 156, 346, 644, 26, 156, 376, 644, 28, 156, 408, 644, 28, 156, 440, 644, 38, 156, 482, 644, 25, 156, 511, 644, 25, 156, 540, 644, 44, 156, 588, 644, 26, 156, 618, 644, 30, 156, 652, 644, 30, 156, 686, 644, 37, 156, 727, 644, 36, 156, 767, 644, 37, 156, 808, 644, 29, 156, 841, 644, 34, 156, 879, 644, 30, 156, 913, 644, 28, 156, 945, 644, 27, 156, 976, 644, 34, 156, 4, 804, 31, 156, 39, 804, 34, 156, 77, 804, 31, 156, 112, 804, 33, 156, 149, 804, 28, 156, 181, 804, 43, 156, 228, 804, 51, 156, 283, 804, 36, 156, 323, 804, 33, 156, 360, 804, 28, 156, 392, 804, 27, 156, 423, 804, 40, 156, 467, 804, 29,
                    156, 500, 804, 24, 156, 528, 804, 22, 156, 554, 804, 20, 156, 578, 804, 19, 156, 601, 804, 22, 156, 627, 804, 21, 156, 652, 804, 21, 156, 677, 804, 36, 156, 717, 804, 20, 156, 741, 804, 24, 156, 769, 804, 24, 156, 797, 804, 24, 156, 825, 804, 25, 156, 854, 804, 35, 156, 893, 804, 24, 156, 921, 804, 22, 156, 947, 804, 28, 156, 979, 804, 26, 156, 4, 964, 20, 156, 28, 964, 41, 156, 73, 964, 23, 156, 100, 964, 36, 156, 140, 964, 24, 156, 168, 964, 25, 156, 197, 964, 22, 156, 223, 964, 37, 156, 264, 964, 38, 156, 306, 964, 30, 156, 340, 964, 29, 156, 373, 964, 22, 156, 399, 964, 21, 156, 424, 964, 35, 156, 463, 964, 22, 156, 489, 964,
                    112, 156
                ]
            }, {
                id: w.Bc,
                D: 393,
                C: 418,
                f: [2, 2, 218, 226, 224, 2, 151, 151, 2, 232, 157, 158, 224, 157, 98, 62, 326, 157, 48, 45, 379, 2, 49, 59, 432, 2, 55, 57, 379, 65, 53, 63, 163, 232, 146, 147, 2, 394, 153, 163, 2, 561, 153, 166, 2, 731, 156, 169, 2, 904, 163, 175, 169, 904, 159, 175, 159, 394, 159, 159, 313, 232, 150, 150, 322, 394, 144, 150, 159, 561, 138, 146, 2, 1083, 302, 303, 301, 561, 107, 158, 412, 561, 96, 157, 2, 1390, 252, 268, 2, 1662, 278, 305, 2, 1971, 371, 397, 2, 2372, 385, 396, 2, 2772, 377, 386],
                p: [103, 130, 122, 133, 119, 131, 145, 176, 168, 182, 171, 177, 168, 182, 160, 176, 119, 128, 115, 115, 115, 112,
                    115, 112, 115, 112, 119, 115, 122, 134, 131, 143, 137, 143, 140, 147, 47, 56, 143, 133, 155, 133, 69, 83, 50, 37, 6, -2, 0, -5, 8, 2
                ]
            }, {
                id: 52,
                D: 552,
                C: 552,
                f: [0, 0, 88, 85, 0, 85, 46, 152, 46, 85, 106, 149, 0, 237, 78, 162, 78, 237, 93, 155, 0, 399, 88, 158, 152, 85, 46, 152, 88, 399, 144, 145, 0, 557, 138, 141, 0, 698, 145, 145, 0, 843, 146, 141, 0, 984, 161, 140, 0, 1124, 130, 155],
                p: [235, 190, 256, 121, 226, 124, 240, 111, 233, 118, 235, 115, 256, 121, 213, 220, 219, 232, 212, 220, 211, 232, 203, 178, 211, 273]
            }, {
                id: 56,
                dd: 2,
                sc: 2,
                fc: 10,
                Se: "0123456789",
                ef: {},
                f: [5, 5, 49, 156, 59, 5, 16, 156, 80, 5, 48, 156, 133,
                    5, 38, 156, 176, 5, 41, 156, 222, 5, 45, 156, 272, 5, 43, 156, 320, 5, 47, 156, 372, 5, 49, 156, 426, 5, 35, 156
                ]
            }, {
                id: 59,
                D: 552,
                C: 552,
                f: [0, 0, 246, 268, 0, 268, 334, 370, 246, 0, 205, 231, 0, 638, 308, 353, 0, 991, 387, 461, 0, 1452, 324, 399, 0, 1851, 335, 328, 0, 2179, 296, 266, 0, 2445, 240, 230, 296, 2179, 207, 217, 308, 638, 204, 205, 240, 2445, 200, 194, 308, 843, 195, 133],
                p: [145, 116, 76, 38, 166, 132, 113, 56, 75, -2, 113, 34, 87, 82, 102, 114, 128, 124, 148, 130, 149, 134, 151, 138, 153, 141]
            }, {
                id: 60,
                D: 250,
                C: 250,
                f: [0, 0, 139, 170, 139, 0, 142, 169, 281, 0, 148, 163, 429, 0, 155, 155, 584, 0, 163, 148, 747,
                    0, 169, 142, 584, 148, 171, 139, 584, 287, 169, 141, 755, 148, 165, 145, 755, 293, 159, 151, 429, 155, 153, 159, 281, 163, 147, 164, 139, 169, 141, 169, 0, 170, 139, 170
                ],
                p: [55, 40, 54, 41, 51, 44, 47, 48, 43, 51, 40, 54, 39, 56, 40, 55, 42, 53, 46, 50, 48, 46, 51, 44, 54, 41, 55, 40]
            }, {
                id: 61,
                D: 449,
                C: 446,
                f: [0, 0, 308, 285, 0, 285, 302, 282, 0, 567, 297, 281, 0, 848, 296, 277, 0, 1125, 293, 274, 0, 1399, 293, 273, 0, 1672, 295, 271, 0, 1943, 297, 269, 0, 2212, 239, 226, 239, 2212, 241, 223, 0, 2438, 244, 221, 244, 2438, 249, 219],
                p: [83, 82, 87, 84, 90, 86, 91, 90, 93, 94, 92, 99, 90, 104, 88, 111, 101, 119, 97, 128, 92, 138,
                    86, 148
                ]
            }, {
                id: 62,
                D: 275,
                C: 275,
                f: [0, 0, 140, 144, 0, 144, 42, 37],
                p: [69, 62, 117, 119]
            }, {
                id: 63,
                D: 833,
                C: 250,
                f: [0, 0, 566, 93],
                p: [133, 76]
            }, {
                id: 64,
                D: 250,
                C: 250,
                f: [0, 0, 155, 154, 0, 154, 181, 210, 0, 364, 185, 180, 0, 544, 183, 178],
                p: [47, 50, 32, 36, 35, 40, 35, 40]
            }, {
                id: 65,
                D: 275,
                C: 275,
                f: [0, 0, 125, 126, 0, 126, 37, 35],
                p: [78, 76, 122, 121]
            }, {
                id: 66,
                D: 275,
                C: 275,
                f: [0, 0, 125, 126, 0, 126, 37, 35],
                p: [75, 76, 119, 121]
            }, {
                id: 67,
                D: 552,
                C: 552,
                f: [2, 2, 234, 221, 240, 2, 77, 76, 240, 82, 70, 76, 321, 2, 64, 76, 321, 82, 58, 76, 389, 2, 51, 76, 389, 82, 46, 76, 444, 2, 40, 77, 444, 83, 34, 77, 488, 2, 28,
                    78, 488, 84, 28, 78, 520, 2, 35, 77, 559, 2, 42, 77, 605, 2, 48, 77, 657, 2, 56, 77, 717, 2, 63, 77, 784, 2, 69, 77, 857, 2, 76, 77, 857, 83, 83, 78, 2, 227, 175, 175, 181, 227, 175, 175, 360, 227, 175, 175, 539, 227, 175, 175, 718, 227, 175, 175, 2, 406, 175, 175, 181, 406, 175, 175, 360, 406, 175, 175, 539, 406, 175, 175, 718, 406, 175, 175, 2, 585, 175, 175, 181, 585, 175, 175, 360, 585, 175, 175, 539, 585, 175, 175, 718, 585, 175, 175, 2, 764, 175, 175, 181, 764, 175, 175, 360, 764, 175, 175, 539, 764, 175, 175, 718, 764, 175, 175, 2, 943, 175, 175, 181, 943, 175, 175, 360, 943, 175, 175, 539, 943, 175, 175, 718, 943, 175, 175,
                    2, 1122, 175, 175, 2, 1301, 175, 175, 2, 1480, 175, 175, 2, 1659, 175, 175, 2, 1838, 175, 175, 181, 1122, 175, 175, 360, 1122, 175, 175, 539, 1122, 175, 175, 718, 1122, 175, 175, 181, 1301, 175, 175, 181, 1480, 175, 175, 181, 1659, 175, 175, 360, 1301, 229, 231, 593, 1301, 229, 231, 360, 1536, 490, 492
                ],
                p: [156, 156, 233, 231, 236, 231, 239, 231, 242, 231, 246, 231, 248, 231, 251, 231, 254, 231, 257, 231, 257, 231, 253, 231, 250, 231, 247, 231, 243, 231, 240, 231, 237, 231, 234, 231, 230, 230, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184,
                    184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 155, 159, 155, 159, 27, 21
                ]
            }, {
                id: w.Gi,
                D: 100,
                C: 100,
                f: [0, 0, 84, 85, 84, 0, 58, 85, 142, 0, 32, 85, 174, 0, 12, 85, 186, 0, 28, 85, 214, 0, 44, 85, 258, 0, 60, 85, 318, 0, 70, 85, 388, 0, 78, 85, 466, 0, 84, 85, 550, 0, 84, 85],
                p: [6, 5, 19, 5, 32, 5, 42, 5, 34, 5, 26, 5, 18, 5, 13, 5, 9, 5, 6, 5, 6, 5]
            }, {
                id: 69,
                D: 833,
                C: 250,
                f: [0, 0, 453, 93],
                p: [191, 76]
            }, {
                id: 70,
                D: 833,
                C: 250,
                f: [0, 0,
                    333, 93
                ],
                p: [251, 79]
            }, {
                id: 71,
                D: 833,
                C: 250,
                f: [0, 0, 212, 93],
                p: [310, 79]
            }, {
                id: 72,
                D: 640,
                C: 640,
                f: [0, 0, 291, 302, 291, 0, 363, 409, 654, 0, 383, 309, 1037, 0, 314, 335, 1351, 0, 326, 334, 1677, 0, 374, 330, 291, 409, 405, 492, 2051, 0, 350, 334, 0, 302, 201, 207, 0, 509, 201, 206, 0, 715, 201, 207, 0, 922, 201, 207, 0, 1129, 201, 206, 0, 1335, 201, 210, 0, 1545, 201, 213, 0, 1758, 201, 215, 0, 1973, 201, 219, 0, 2192, 201, 222, 0, 2414, 201, 223, 0, 2637, 201, 222, 0, 2859, 201, 224, 0, 3083, 201, 224, 0, 3307, 201, 224, 0, 3531, 201, 221, 0, 3752, 201, 218, 2401, 0, 201, 214, 2602, 0, 201, 211, 2803, 0, 222, 196, 2803,
                    196, 210, 201, 3025, 0, 203, 209, 3228, 0, 197, 214, 3425, 0, 193, 217, 3618, 0, 194, 219, 3812, 0, 197, 210, 291, 901, 200, 202, 3812, 210, 204, 197, 291, 1103, 208, 199, 291, 1302, 212, 202, 291, 1504, 214, 205, 291, 1709, 216, 206, 291, 1915, 204, 226, 291, 2141, 203, 213, 495, 1915, 201, 210, 494, 2141, 201, 208, 291, 2354, 201, 203, 3025, 209, 201, 200, 491, 901, 201, 200, 492, 2354, 201, 200, 291, 2557, 201, 200, 291, 2757, 201, 207, 291, 2964, 201, 216, 492, 2557, 204, 194, 291, 3180, 221, 171, 291, 3351, 249, 197, 291, 3548, 225, 201, 291, 3749, 205, 205, 492, 2964, 202, 213, 696, 409, 201, 222, 897, 409, 201,
                    222, 1098, 409, 205, 221, 1303, 409, 229, 213, 1532, 409, 243, 205, 0, 3970, 153, 86, 654, 309, 140, 89, 1775, 409, 212, 196, 1987, 409, 208, 209, 496, 3749, 197, 233, 696, 631, 186, 247, 882, 631, 181, 245, 1063, 631, 186, 243, 1249, 631, 194, 234, 1443, 631, 199, 230, 2195, 409, 199, 221, 1642, 631, 199, 223, 1841, 631, 199, 226, 2040, 631, 199, 228, 2239, 631, 199, 230, 2438, 631, 199, 230, 2637, 631, 199, 230, 2836, 631, 195, 234, 3031, 631, 190, 238, 3221, 631, 194, 231, 2394, 409, 201, 217, 2595, 409, 207, 209, 2802, 409, 218, 202, 3020, 409, 211, 206, 3231, 409, 206, 210, 3437, 409, 210, 213, 3647, 409, 215,
                    218, 3415, 631, 220, 223, 3862, 409, 224, 216, 3635, 631, 219, 212, 492, 2757, 195, 205, 3854, 631, 195, 207, 696, 878, 195, 210, 891, 878, 217, 214, 891, 1092, 225, 215, 891, 1307, 219, 215, 696, 1088, 195, 215, 696, 1303, 195, 215, 696, 1518, 195, 215, 891, 1522, 217, 215, 891, 1737, 225, 215, 891, 1952, 223, 218, 891, 2170, 219, 222, 891, 2392, 215, 224, 891, 2616, 216, 216, 1108, 878, 210, 206, 1318, 878, 218, 202, 1536, 878, 205, 190, 1741, 878, 203, 194, 1944, 878, 202, 206, 2146, 878, 203, 214, 891, 2832, 204, 217, 891, 3049, 204, 216, 2349, 878, 204, 213, 2553, 878, 205, 204, 2758, 878, 205, 192, 2401, 214,
                    201, 195, 2963, 878, 201, 206, 3164, 878, 204, 212, 3368, 878, 205, 214, 891, 3265, 207, 215, 891, 3480, 208, 216, 3573, 878, 205, 205, 3778, 878, 226, 202, 891, 3696, 212, 204, 696, 1733, 195, 210, 696, 1943, 189, 213, 696, 2156, 190, 218, 696, 2374, 193, 222, 1116, 1092, 198, 213, 1314, 1092, 203, 210, 1517, 1092, 207, 202, 1724, 1092, 211, 204, 1935, 1092, 214, 207, 2149, 1092, 216, 211, 2365, 1092, 216, 212, 2581, 1092, 216, 212, 2797, 1092, 216, 212, 3013, 1092, 216, 212, 3229, 1092, 216, 212, 3445, 1092, 216, 212, 3661, 1092, 216, 212, 3877, 1092, 216, 212, 1116, 1305, 216, 212, 1116, 1517, 212, 216, 1116,
                    1733, 206, 222, 1116, 1955, 202, 225, 1116, 2180, 205, 222, 1116, 2402, 210, 213, 1116, 2615, 212, 208, 1116, 2823, 198, 223, 1116, 3046, 196, 232, 696, 2596, 195, 236, 1116, 3278, 198, 236, 1116, 3514, 206, 238, 1116, 3752, 211, 226, 1332, 1305, 217, 207, 891, 3900, 213, 195, 1549, 1305, 212, 179, 1761, 1305, 221, 178, 1982, 1305, 221, 181, 2203, 1305, 215, 180, 2418, 1305, 212, 179, 2630, 1305, 221, 177, 2851, 1305, 221, 180, 3072, 1305, 215, 180, 3287, 1305, 212, 179, 3499, 1305, 221, 177, 3720, 1305, 221, 180, 1332, 1512, 215, 180, 1332, 1692, 212, 179, 1547, 1512, 216, 176, 1332, 1871, 213, 175, 696,
                    2832, 194, 205, 696, 3037, 188, 236, 696, 3273, 194, 233, 1332, 2046, 210, 202, 1332, 2248, 204, 194, 1332, 2442, 202, 204
                ],
                p: [173, 274, 137, 156, 133, 207, 152, 237, 154, 244, 134, 240, 107, 104, 148, 242, 220, 227, 220, 227, 220, 227, 220, 227, 220, 227, 220, 224, 220, 221, 220, 218, 220, 215, 220, 212, 220, 211, 220, 211, 220, 210, 220, 210, 220, 210, 220, 213, 220, 216, 220, 220, 220, 223, 211, 238, 216, 233, 220, 225, 223, 220, 225, 217, 224, 215, 223, 224, 221, 232, 219, 237, 217, 235, 215, 232, 214, 229, 213, 228, 217, 208, 218, 221, 219, 224, 219, 226, 219, 231, 219, 234, 219, 234, 219, 234, 219, 234, 219,
                    226, 219, 218, 218, 240, 210, 263, 192, 237, 204, 233, 217, 229, 220, 221, 220, 212, 220, 212, 217, 212, 202, 221, 195, 229, 240, 264, 249, 265, 215, 238, 217, 225, 223, 201, 228, 187, 231, 189, 228, 191, 223, 200, 220, 204, 220, 213, 220, 211, 220, 208, 220, 206, 220, 204, 220, 204, 220, 204, 222, 200, 225, 196, 223, 203, 220, 217, 216, 225, 211, 232, 216, 228, 218, 224, 212, 221, 208, 216, 205, 211, 202, 218, 208, 222, 232, 229, 232, 227, 232, 224, 210, 220, 202, 219, 208, 219, 232, 219, 232, 219, 232, 219, 210, 219, 202, 219, 202, 216, 205, 212, 207, 210, 208, 218, 217, 228, 211, 232, 216, 244, 218, 240, 219, 227, 220,
                    219, 220, 216, 220, 217, 220, 221, 218, 230, 216, 242, 220, 239, 220, 228, 217, 222, 216, 220, 214, 219, 213, 218, 216, 229, 207, 232, 214, 230, 224, 224, 227, 221, 226, 216, 225, 212, 222, 220, 219, 224, 218, 231, 216, 229, 214, 226, 213, 222, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 215, 217, 218, 211, 220, 208, 218, 212, 216, 221, 215, 226, 222, 210, 223, 201, 223, 197, 222, 197, 219, 195, 216, 206, 211, 225, 213, 238, 213, 254, 207, 255, 207, 252, 210, 253, 213, 254, 207, 256, 207, 253, 210, 253, 213, 254, 207, 256, 207, 253, 210, 253, 213, 254, 211, 257, 214, 258, 227,
                    227, 230, 195, 226, 199, 215, 232, 218, 239, 220, 230
                ]
            }, {
                id: 73,
                D: 275,
                C: 275,
                f: [0, 0, 137, 139, 137, 0, 105, 100, 0, 139, 235, 235, 0, 374, 240, 246],
                p: [65, 70, 84, 86, 18, 19, 13, 14]
            }, {
                id: 74,
                D: 833,
                C: 250,
                f: [0, 0, 507, 85, 0, 85, 507, 100, 0, 185, 507, 100, 0, 285, 507, 97, 0, 382, 507, 92],
                p: [163, 82, 163, 73, 163, 71, 163, 70, 163, 75]
            }, {
                id: 75,
                D: 276,
                C: 276,
                f: [0, 0, 84, 128, 84, 0, 68, 109, 152, 0, 50, 109, 0, 128, 140, 121, 0, 249, 148, 147]
            }, {
                id: 76,
                D: 761,
                C: 761,
                f: [0, 0, 220, 239, 0, 239, 206, 290, 0, 529, 205, 290, 0, 819, 220, 246, 0, 1065, 237, 219, 0, 1284, 226, 231, 220, 0, 18, 17, 238, 0, 11, 11, 206,
                    239, 38, 39
                ],
                p: [271, 262, 286, 232, 287, 232, 271, 249, 262, 272, 268, 266, 382, 376, 385, 379, 372, 365]
            }, {
                id: 77,
                D: 998,
                C: 1058,
                f: [3, 3, 148, 12, 3, 21, 39, 187, 48, 21, 182, 150, 236, 21, 144, 130, 3, 214, 244, 233, 253, 214, 159, 143, 157, 3, 49, 9, 386, 21, 89, 84, 3, 453, 102, 148, 3, 607, 260, 315],
                p: [585, 767, 160, 241, 412, 548, 307, 397, 184, 663, 530, 224, 676, 540, 540, 425, 351, 211, 684, 200]
            }, {
                id: 78,
                D: 431,
                C: 431,
                f: [0, 0, 294, 335, 294, 0, 297, 336, 0, 335, 291, 252, 591, 0, 307, 293, 0, 587, 276, 224],
                p: [53, 6, 51, 3, 55, 78, 47, 57, 63, 98]
            }, {
                id: 79,
                D: 833,
                C: 250,
                f: [0, 0, 194, 127, 0, 127, 201, 103,
                    0, 230, 204, 96, 0, 326, 193, 142, 0, 468, 194, 111
                ],
                p: [319, 69, 316, 81, 314, 87, 319, 55, 319, 77]
            }, {
                id: 80,
                D: 833,
                C: 250,
                f: [0, 0, 302, 123, 302, 0, 319, 99, 621, 0, 322, 95, 302, 99, 292, 136, 0, 123, 302, 111],
                p: [268, 70, 260, 85, 258, 87, 273, 58, 268, 77]
            }, {
                id: 108,
                f: [0, 0, 198, 194, 0, 194, 198, 194, 0, 388, 198, 194]
            }, {
                id: 111,
                f: [0, 0, 202, 81],
                p: [316, 87],
                D: 833,
                C: 250
            }, {
                id: 112,
                f: [0, 0, 319, 83],
                p: [260, 87],
                D: 833,
                C: 250
            }, {
                id: 113,
                f: [0, 0, 444, 86],
                p: [195, 81],
                D: 833,
                C: 250
            }, {
                id: 114,
                f: [0, 0, 559, 89],
                p: [137, 77],
                D: 833,
                C: 250
            }, {
                id: 115,
                f: [0, 0, 101, 102, 0, 102, 101, 102, 0, 204, 101, 102,
                    0, 306, 101, 102
                ],
                p: [219, 29, 218, 29, 219, 29, 219, 29],
                D: 534,
                C: 160
            }, {
                id: 116,
                D: 275,
                C: 275,
                f: [0, 0, 4, 4, 2, 2, 89, 116, 95, 2, 177, 37, 276, 2, 187, 77, 95, 43, 87, 61],
                p: [143, 196, 93, 75, 50, 84, 45, 39, 95, 35]
            }, {
                id: 117,
                D: 25,
                C: 25,
                f: [0, 0, 25, 25]
            }, {
                id: w.Fi,
                f: [0, 0, 291, 302, 0, 302, 363, 409, 363, 302, 383, 309, 0, 711, 405, 492, 405, 711, 374, 330, 0, 1203, 350, 334, 0, 1537, 314, 335, 350, 1203, 326, 334, 291, 0, 339, 288, 630, 0, 275, 162, 350, 1537, 372, 317],
                p: [173, 274, 137, 156, 133, 207, 107, 104, 134, 240, 148, 242, 152, 237, 154, 244, 145, 259, 181, 392, 123, 236],
                D: 640,
                C: 640
            }, {
                id: w.jc,
                f: [1, 1, 1064, 1064, 1067, 1, 532, 495, 1601, 1, 145, 286, 1601, 289, 38, 38, 1748, 1, 204, 174, 1748, 177, 183, 154],
                p: [55, 154, 55, 686, 442, 543, 568, 667, 484, 1083, 493, 1093],
                D: 1174,
                C: 1498
            }, {
                id: w.ic,
                wa: 1,
                f: [1, 1, 201, 207, 1, 210, 201, 205, 1, 417, 201, 206, 1, 625, 201, 207, 1, 834, 201, 207, 1, 1043, 201, 211, 1, 1256, 201, 214, 1, 1472, 201, 218, 1, 1692, 201, 220, 204, 1, 201, 222, 204, 225, 201, 224, 204, 451, 201, 224, 204, 677, 201, 225, 204, 904, 201, 226, 204, 1132, 201, 226, 407, 1, 201, 221, 610, 1, 201, 217, 813, 1, 201, 213, 1016, 1, 201, 210, 407, 225, 204, 225, 1219, 1, 203, 213, 1424, 1, 201,
                    210, 1627, 1, 201, 207, 1830, 1, 201, 203, 204, 1360, 201, 200, 204, 1562, 201, 200, 204, 1764, 201, 200, 613, 225, 201, 200, 816, 225, 201, 208, 1019, 225, 201, 216, 1222, 225, 204, 193, 1428, 225, 221, 171, 1651, 225, 249, 196, 407, 452, 225, 197, 407, 651, 205, 204, 407, 857, 201, 216, 407, 1075, 202, 222, 407, 1299, 202, 225, 407, 1526, 205, 224, 407, 1752, 223, 213, 634, 452, 242, 203, 1, 1914, 153, 86, 1902, 225, 140, 89, 878, 452, 218, 201, 634, 657, 211, 205, 634, 864, 205, 210, 634, 1076, 211, 214, 847, 657, 214, 217, 847, 876, 220, 223, 1063, 657, 224, 216, 1289, 657, 219, 212, 634, 1292, 195, 206, 634, 1500,
                    195, 207, 634, 1709, 195, 211, 1510, 657, 217, 214, 1729, 657, 225, 215, 847, 1101, 219, 215, 847, 1318, 195, 215, 847, 1535, 195, 215, 847, 1752, 195, 215, 1069, 876, 217, 215, 1288, 876, 225, 215, 1069, 1093, 224, 219, 1069, 1314, 219, 222, 1069, 1538, 215, 225, 1069, 1765, 215, 217, 1515, 876, 210, 205, 1098, 452, 218, 201, 1318, 452, 206, 193, 1526, 452, 201, 195, 1727, 876, 201, 206, 1295, 1093, 204, 212, 1295, 1307, 206, 214, 1503, 1307, 208, 215, 1503, 1524, 208, 216, 1501, 1093, 206, 205, 1729, 452, 206, 191, 1709, 1093, 204, 194, 1295, 1523, 202, 206, 1295, 1731, 202, 214, 1503, 1742, 203, 217, 1713,
                    1524, 204, 216, 1713, 1307, 204, 212, 1713, 1742, 204, 204
                ],
                p: [220, 227, 220, 228, 220, 228, 220, 227, 220, 227, 220, 223, 220, 220, 220, 216, 220, 214, 220, 212, 220, 210, 220, 210, 220, 209, 220, 208, 220, 208, 220, 213, 220, 217, 220, 221, 220, 224, 217, 209, 218, 221, 219, 224, 219, 227, 219, 231, 219, 234, 219, 234, 219, 234, 219, 234, 219, 226, 219, 218, 218, 241, 210, 263, 191, 238, 203, 237, 216, 230, 220, 218, 219, 212, 219, 209, 216, 210, 204, 221, 195, 231, 240, 264, 249, 265, 210, 232, 216, 228, 218, 223, 211, 220, 208, 216, 204, 211, 201, 218, 207, 222, 231, 228, 231, 227, 231, 223, 209, 220, 201, 219,
                    207, 219, 231, 219, 231, 219, 231, 219, 209, 219, 201, 219, 201, 215, 204, 212, 207, 209, 208, 217, 216, 228, 210, 232, 215, 240, 220, 238, 220, 227, 217, 221, 215, 219, 213, 218, 213, 217, 215, 228, 215, 242, 217, 239, 219, 226, 220, 218, 220, 215, 220, 216, 219, 220, 218, 229
                ],
                D: 640,
                C: 640
            }, {
                id: w.Ie,
                wa: 1,
                f: [1, 1, 213, 196, 1, 199, 207, 209, 1, 410, 197, 232, 1, 644, 186, 246, 1, 892, 181, 246, 1, 1140, 186, 244, 1, 1386, 195, 232, 1, 1620, 200, 229, 210, 199, 200, 219, 210, 420, 200, 221, 210, 643, 200, 224, 210, 869, 200, 227, 210, 1098, 200, 229, 210, 1329, 200, 229, 210, 1560, 200, 229, 210, 1791, 195, 234, 412,
                    199, 190, 238, 604, 199, 194, 230, 800, 199, 202, 215, 1004, 199, 207, 207, 1213, 199, 225, 202, 1440, 199, 213, 205, 1655, 199, 195, 209, 1852, 199, 189, 213, 412, 439, 190, 217, 604, 439, 193, 221, 799, 439, 198, 213, 999, 439, 203, 208, 1204, 439, 207, 202, 1413, 439, 211, 204, 1626, 439, 215, 207, 604, 662, 216, 210, 604, 874, 216, 211, 604, 1087, 216, 211, 604, 1300, 216, 211, 604, 1513, 216, 211, 604, 1726, 216, 211, 822, 662, 216, 211, 1040, 662, 216, 211, 1258, 662, 216, 211, 1476, 662, 216, 211, 822, 875, 212, 215, 822, 1092, 205, 222, 822, 1316, 202, 225, 822, 1543, 205, 220, 1694, 662, 210, 211, 1036, 875,
                    213, 207, 1843, 439, 201, 207, 822, 1765, 198, 222, 1036, 1084, 195, 232, 1036, 1318, 195, 235, 1233, 1084, 199, 236, 1233, 1322, 206, 238, 1434, 1084, 211, 226, 1251, 875, 217, 207, 216, 1, 213, 195, 431, 1, 212, 179, 645, 1, 221, 178, 868, 1, 221, 180, 1091, 1, 215, 180, 1308, 1, 212, 179, 1522, 1, 221, 177, 1745, 1, 221, 180, 1470, 875, 215, 180, 1687, 875, 212, 179, 1647, 1084, 221, 177, 1441, 1322, 221, 180, 1664, 1322, 215, 180, 1441, 1504, 212, 179, 1655, 1504, 216, 176, 1655, 1682, 213, 174, 1036, 1555, 193, 204, 412, 658, 188, 237, 1036, 1761, 194, 233, 1441, 1685, 210, 202, 1, 1851, 205, 194, 1233, 1562,
                    202, 204
                ],
                p: [214, 238, 217, 225, 222, 202, 228, 188, 230, 188, 227, 190, 222, 202, 219, 205, 219, 215, 219, 213, 219, 210, 219, 207, 219, 205, 219, 205, 219, 205, 222, 200, 225, 196, 223, 204, 219, 219, 216, 227, 207, 232, 213, 229, 223, 224, 226, 221, 226, 216, 224, 212, 221, 220, 219, 225, 217, 231, 215, 229, 213, 226, 213, 223, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 215, 218, 218, 211, 219, 208, 218, 213, 215, 222, 214, 226, 219, 227, 221, 211, 223, 201, 222, 198, 220, 197, 218, 195, 215, 206, 210, 225, 212, 238, 212, 254, 206, 255, 206, 253, 209, 253, 212, 254, 206,
                    256, 206, 253, 209, 253, 212, 254, 206, 256, 206, 253, 209, 253, 212, 254, 210, 257, 213, 259, 226, 228, 229, 195, 225, 199, 214, 232, 217, 240, 219, 230
                ],
                D: 640,
                C: 640
            }, {
                id: w.Ng,
                wa: 1,
                f: [1, 1, 222, 196, 1, 199, 209, 201, 1, 402, 203, 209, 1, 613, 197, 215, 1, 830, 193, 218, 1, 1050, 194, 219, 200, 613, 197, 210, 206, 402, 201, 202, 212, 199, 204, 198, 196, 830, 208, 200, 197, 1050, 212, 204, 1, 1271, 215, 207, 1, 1480, 216, 208],
                p: [211, 238, 216, 233, 219, 225, 222, 219, 224, 216, 224, 215, 222, 224, 220, 232, 219, 236, 217, 235, 215, 231, 213, 228, 213, 227],
                D: 640,
                C: 640
            }, {
                id: w.cl,
                wa: 1.25,
                Ea: !0,
                f: [0, 0,
                    2048, 1152
                ],
                p: [0, 0],
                D: 2048,
                C: 2305
            }, {
                id: w.Xp,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 708],
                p: [0, 896],
                D: 2048,
                C: 2305
            }, {
                id: w.dl,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.Yp,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 874],
                p: [0, 835],
                D: 2048,
                C: 2304
            }, {
                id: w.Zp,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.$p,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1052],
                p: [0, 756],
                D: 2048,
                C: 2304
            }, {
                id: w.el,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.aq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1072],
                p: [0, 768],
                D: 2048,
                C: 2304
            }, {
                id: w.bq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.cq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1124],
                p: [0, 624],
                D: 2048,
                C: 2304
            }, {
                id: w.fl,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.dq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 948],
                p: [0, 760],
                D: 2048,
                C: 1866
            }, {
                id: w.fq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.gq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 886],
                p: [0, 881],
                D: 2048,
                C: 2304
            }, {
                id: w.gl,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152, 0, 0, 4, 3],
                p: [0, 0, 1028.5, 581],
                D: 2048,
                C: 2304
            }, {
                id: w.iq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 642, 0, 0, 4, 3],
                p: [0, 889, 1028.5, 581],
                D: 2048,
                C: 2304
            }, {
                id: w.jq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.kq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 858],
                p: [0, 780],
                D: 2048,
                C: 1638
            }, {
                id: w.lq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 2304
            }, {
                id: w.nq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 887],
                p: [0, 792],
                D: 2048,
                C: 2304
            }, {
                id: w.oq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1153],
                p: [0, -1],
                D: 2048,
                C: 2304
            }, {
                id: w.pq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 980],
                p: [0, 802],
                D: 2048,
                C: 2304
            }, {
                id: w.qq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.rq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.sq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.tq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.uq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.vq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }, {
                id: w.wq,
                wa: 1.25,
                Ea: !0,
                f: [0, 0, 2048, 1152],
                p: [0, 0],
                D: 2048,
                C: 1866
            }],
            db = {
                l: 0,
                V: 1,
                Bi: 2,
                zD: 3
            },
            Ka = function(a, c, d) {
                var b = [];
                b[d.Ff] = new a("big_font.png", c.Bi);
                b[d.Kg] = new a("small_font.png", c.Bi);
                b[d.Xk] = new a("font_numbers_big.png",
                    c.Bi);
//                b[d.ia] = new a("tap", c.V);
//                b[d.Yl] = new a("button", c.V);
//                b[d.Xl] = new a("bubble_break", c.V);
//                b[d.Wl] = new a("bubble", c.V);
//                b[d.Zl] = new a("candy_break", c.V);
//                b[d.cm] = new a("monster_chewing", c.V);
//                b[d.dm] = new a("monster_chewing", c.V);
//                b[d.em] = new a("monster_close", c.V);
//                b[d.fm] = new a("monster_open", c.V);
//                b[d.gm] = new a("monster_sad", c.V);
//                b[d.fr] = new a("ring", c.V);
//                b[d.jm] = new a("rope_bleak_1", c.V);
//                b[d.gr] = new a("rope_bleak_2", c.V);
//                b[d.hr] = new a("rope_bleak_3", c.V);
//                b[d.ir] = new a("rope_bleak_4", c.V);
//                b[d.km] = new a("rope_get",
//                    c.V);
//                b[d.qm] = new a("star_1", c.V);
//                b[d.jr] = new a("star_2", c.V);
//                b[d.kr] = new a("star_3", c.V);
//                b[d.Cd] = new a("electric", c.V);
//                b[d.hm] = new a("pump_1", c.V);
//                b[d.dr] = new a("pump_2", c.V);
//                b[d.er] = new a("pump_3", c.V);
//                b[d.im] = new a("pump_4", c.V);
//                b[d.nm] = new a("spider_activate", c.V);
//                b[d.om] = new a("spider_fall", c.V);
//                b[d.pm] = new a("spider_win", c.V);
//                b[d.rm] = new a("wheel", c.V);
//                b[d.sm] = new a("win", c.V);
//                b[d.Ui] = new a("gravity_off", c.V);
//                b[d.Vi] = new a("gravity_on", c.V);
//                b[d.$l] = new a("candy_link", c.V);
//                b[d.Vl] = new a("bouncer",
//                    c.V);
                b[d.Bc] = new a("obj_candy_01.png", c.l);
                b[d.Rg] = new a("obj_spider.png", c.l);
                b[d.ul] = new a("obj_star_disappear.png", c.l);
                b[d.Pg] = new a("obj_bubble_flight.png", c.l);
                b[d.kl] = new a("obj_bubble_pop.png", c.l);
                b[d.Ji] = new a("obj_hook_auto.png", c.l);
                b[d.tl] = new a("obj_spikes_04.png", c.l);
                b[d.Hi] = new a("obj_bubble_attached.png", c.l);
                b[d.ll] = new a("obj_hook_01.png", c.l);
                b[d.ml] = new a("obj_hook_02.png", c.l);
                b[d.Wc] = new a("obj_star_idle.png", c.l);
                b[d.Gi] = new a("hud_star.png", c.l);
                b[d.sl] = new a("obj_spikes_03.png",
                    c.l);
                b[d.rl] = new a("obj_spikes_02.png", c.l);
                b[d.ql] = new a("obj_spikes_01.png", c.l);
                b[d.ic] = new a("char_animations.png", c.l);
                b[d.Ie] = new a("char_animations2.png", c.l);
                b[d.Ng] = new a("char_animations3.png", c.l);
                b[d.Hf] = new a("obj_hook_regulated.png", c.l);
                b[d.Ii] = new a("obj_electrodes.png", c.l);
                b[d.Je] = new a("obj_hook_movable.png", c.l);
                b[d.Li] = new a("obj_pump.png", c.l);
                b[d.vl] = new a("tutorial_signs.png", c.l);
                b[d.If] = new a("obj_hat.png", c.l);
                b[d.il] = new a("obj_bouncer_01.png", c.l);
                b[d.jl] = new a("obj_bouncer_02.png",
                    c.l);
//                b[d.bm] = new a("menu_music", c.V);
//                b[d.am] = new a("game_music", c.V);
//                b[d.sw] = new a("game_music2", c.V);
                b[d.hl] = new a("obj_drawing_hidden.png", c.l);
                b[d.Mi] = new a("obj_rotatable_spikes_01.png", c.l);
                b[d.nl] = new a("obj_rotatable_spikes_02.png", c.l);
                b[d.ol] = new a("obj_rotatable_spikes_03.png", c.l);
                b[d.pl] = new a("obj_rotatable_spikes_04.png", c.l);
                b[d.Qg] = new a("obj_rotatable_spikes_button.png", c.l);
                b[d.Og] = new a("obj_bee_hd.png", c.l);
                b[d.Ki] = new a("obj_pollen_hd.png", c.l);
                b[d.Wi] = new a("spike_rotate_in",
                    c.V);
//                b[d.Xi] = new a("spike_rotate_out", c.V);
                b[d.Fi] = new a("char_supports.png", c.l);
                b[d.jc] = new a("obj_vinil.png", c.l);
//                b[d.lm] = new a("scratch_in", c.V);
//                b[d.mm] = new a("scratch_out", c.V);
//                b[d.Ti] = new a("buzz", c.V);
//                b[d.Vg] = new a("teleport", c.V);
                b[d.cl] = new a("bgr_01_p1.jpg", c.l);
                b[d.Xp] = new a("bgr_01_p2.jpg", c.l);
                b[d.dl] = new a("bgr_02_p1.jpg", c.l);
                b[d.Yp] = new a("bgr_02_p2.jpg", c.l);
                b[d.Zp] = new a("bgr_03_p1.jpg", c.l);
                b[d.$p] = new a("bgr_03_p2.jpg", c.l);
                b[d.el] = new a("bgr_04_p1.jpg", c.l);
                b[d.aq] = new a("bgr_04_p2.jpg",
                    c.l);
                b[d.bq] = new a("bgr_05_p1.jpg", c.l);
                b[d.cq] = new a("bgr_05_p2.jpg", c.l);
                b[d.fl] = new a("bgr_06_p1.jpg", c.l);
                b[d.dq] = new a("bgr_06_p2.jpg", c.l);
                b[d.fq] = new a("bgr_07_p1.jpg", c.l);
                b[d.gq] = new a("bgr_07_p2.jpg", c.l);
                b[d.gl] = new a("bgr_08_p1.png", c.l);
                b[d.iq] = new a("bgr_08_p2.png", c.l);
                b[d.jq] = new a("bgr_09_p1.jpg", c.l);
                b[d.kq] = new a("bgr_09_p2.jpg", c.l);
                b[d.lq] = new a("bgr_10_p1.jpg", c.l);
                b[d.nq] = new a("bgr_10_p2.jpg", c.l);
                b[d.oq] = new a("bgr_11_p1.jpg", c.l);
                b[d.pq] = new a("bgr_11_p2.jpg", c.l);
                b[d.qq] =
                    new a("bgr_ie.jpg", c.l);
                b[d.rq] = new a("bgr_time1.jpg", c.l);
                b[d.sq] = new a("bgr_time2.jpg", c.l);
                b[d.tq] = new a("bgr_time3.jpg", c.l);
                b[d.uq] = new a("bgr_time4.jpg", c.l);
                b[d.vq] = new a("bgr_time5.jpg", c.l);
                b[d.wq] = new a("bgr_time6.jpg", c.l);
                b[d.vv] = new a("Caesar_animations_1_hd.png", c.l);
                b[d.wv] = new a("Caesar_animations_2_hd.png", c.l);
                b[d.xv] = new a("Caesar_animations_3_hd.png", c.l);
                b[d.yv] = new a("Caesar_animations_4_hd.png", c.l);
                b[d.Bv] = new a("Painter_animations_1_hd.png", c.l);
                b[d.Cv] = new a("Painter_animations_2_hd.png",
                    c.l);
                b[d.Dv] = new a("Painter_animations_3_hd.png", c.l);
                b[d.Ev] = new a("Painter_animations_4_hd.png", c.l);
                b[d.Fv] = new a("Pharaoh_animations_1_hd.png", c.l);
                b[d.Gv] = new a("Pharaoh_animations_2_hd.png", c.l);
                b[d.Hv] = new a("Pharaoh_animations_3_hd.png", c.l);
                b[d.Iv] = new a("Pharaoh_animations_4_hd.png", c.l);
                b[d.Jv] = new a("Pirate_animations_1_hd.png", c.l);
                b[d.Kv] = new a("Pirate_animations_2_hd.png", c.l);
                b[d.Lv] = new a("Pirate_animations_3_hd.png", c.l);
                b[d.Mv] = new a("Pirate_animations_4_hd.png", c.l);
                b[d.Nv] = new a("Prehistoric_animations_1_hd.png",
                    c.l);
                b[d.Ov] = new a("Prehistoric_animations_2_hd.png", c.l);
                b[d.Pv] = new a("Prehistoric_animations_3_hd.png", c.l);
                b[d.Qv] = new a("Prehistoric_animations_4_hd.png", c.l);
                b[d.Sv] = new a("Viking_animations_1_hd.png", c.l);
                b[d.Tv] = new a("Viking_animations_2_hd.png", c.l);
                b[d.Uv] = new a("Viking_animations_3_hd.png", c.l);
                b[d.Vv] = new a("Viking_animations_4_hd.png", c.l);
//                b[d.Zq] = new a("candy_hit", c.V);
//                b[d.$q] = new a("prehistoric_monster_chewing", c.V);
//                b[d.ar] = new a("prehistoric_monster_close", c.V);
//                b[d.br] = new a("prehistoric_monster_open",
//                    c.V);
//                b[d.cr] = new a("prehistoric_monster_sad", c.V);
//                b[d.lr] = new a("time_menu", c.V);
                b[d.Rv] = new a("time-stands.png", c.l);
                return b
            }(function() {
                return function(a, c) {
                    this.path = a;
                    this.type = c
                }
            }(), db, w),
            sb = function(a, c) {
                function d(a, c) {
                    return Math.round(1E4 * a * c) / 1E4
                }
                return {
                    SA: function(a, c) {
                        var e, g, k;
                        g = 0;
                        for (k = a.length; g < k; g++) e = a[g], e = e.wa || 1, this.RA(a[g], d(c, e))
                    },
                    RA: function(a, c) {
                        a.dd && (a.dd = d(a.dd, c));
                        a.sc && (a.sc = d(a.sc, c));
                        a.fc && (a.fc = d(a.fc, c));
                        a.D && (a.D = Math.ceil(d(a.D, c)));
                        a.C && (a.C = Math.ceil(d(a.C,
                            c)));
                        a.f && (a.wt = this.aA(a.f), a.f = this.QA(a.wt, c));
                        a.be = 0;
                        a.be = 0;
                        a.p && (a.vt = this.$z(a.p), this.PA(a, c))
                    },
                    aA: function(a) {
                        for (var f = 0, d = a.length, g = []; f < d;) {
                            var k = new c(a[f++], a[f++], a[f++], a[f++]);
                            g.push(k)
                        }
                        return g
                    },
                    QA: function(a, f) {
                        var e = [],
                            g = 0,
                            k = 0,
                            l = 0,
                            n = a.length,
                            r = Math.ceil(Math.sqrt(n)),
                            m = 0,
                            p, u;
                        for (u = 0; u < n; u++) p = a[u], m = (m + 1) % r, 1 === m && (g += l + 2, k = 2, l = 0), p = new c(g, k, d(p.M, f), d(p.U, f)), e.push(p), k += Math.ceil(p.U) + 2, l = Math.max(l, Math.ceil(p.M));
                        return e
                    },
                    $z: function(b) {
                        for (var c = 0, d = b.length, g = []; c < d;) {
                            var k =
                                new a(b[c++], b[c++]);
                            g.push(k)
                        }
                        return g
                    },
                    PA: function(b, c) {
                        var e = [],
                            g = b.vt,
                            k = [],
                            l, n, r, m;
                        r = 0;
                        for (m = g.length; r < m; r++) l = g[r].copy(), l.x = d(l.x, c), l.y = d(l.y, c), n = new a(0, 0), e.push(n), k.push(l);
                        b.p = k;
                        b.zz = e;
                        delete b.vt
                    }
                }
            }(K, U),
            va = function(a) {
                var c = {};
                c.Fw = [a.bm, a.Yl, a.ia];
                c.GD = [a.lr, a.Yl, a.ia];
                c.Cw = [a.ic, a.Ie, a.Ng, a.ll, a.ml, a.Ji, a.Bc, a.il, a.jl, a.Hi, a.Pg, a.kl, a.Li, a.Rg, a.ql, a.rl, a.sl, a.tl, a.Wc, a.ul, a.Gi, a.vl, a.hl, a.Fi];
                c.sD = [a.Og, a.Ki];
                c.tD = [a.Ti, a.Ui, a.Vi];
                c.ED = [a.If, a.Je, a.Mi, a.nl, a.ol, a.pl, a.Qg];
                c.FD = [a.dm, a.Wi, a.Xi, a.Vg, a.Zq, a.$q, a.br, a.ar, a.cr];
                c.BC = [a.Je, a.Hf, a.Ii, a.If, a.Mi, a.nl, a.ol, a.pl, a.Qg, a.Og, a.Ki, a.jc];
                c.ov = [a.If, a.Je, a.Ii];
                c.pv = [a.Vg, a.Cd];
                c.Bw = [a.Kg, a.Ff, a.Xk];
                c.Dw = [a.am, a.Vl, a.Wl, a.Xl, a.Zl, a.$l, a.cm, a.em, a.fm, a.gm, a.hm, a.dr, a.er, a.im, a.jm, a.gr, a.hr, a.ir, a.km, a.nm, a.om, a.pm, a.qm, a.jr, a.kr, a.sm];
                c.CC = [a.Cd, a.Ui, a.Vi, a.fr, a.rm, a.Wi, a.Xi, a.lm, a.mm, a.Ti, a.Vg];
                c.Ew = "bBtn_bgd.png box_lock.png box_nav_menu.png box_omnom.png boxcutter.png boxmore_bgd.png buttonsprite.png fb.png fBtn_bgd.png flags.png fun-omnom.png gamecomplete.jpg lBtn_bgd.png level_bgd.png level_bgd_small.png leveltape.png leveltape_left.png leveltape_right.png mBtn_bgd.png menu_result_en.png menu_result_fr.png menu_result_gr.png menu_result_ru.png menubg.jpg options_stars_bgd.png options_stars_bgd_small.png perfect_mark.png ph_logo.png result_line.png sBtn_bgd.png shadow.png star_result.png star_result_small.png startbg.jpg taperoll.png".split(" ");
                c.wC = ["drawing-bg.png"];
                c.iD = "android.png box.png comic.png facebook.png footer_dot.png footer_finger.png full_version_bg.png full_version_text.png game_bg.png ipad.png iphone.png more_close.png more_text.png more_wallpaper.png more_window_bg.png more.png papercraft.png privacy.png shop.png terms.png twitter.png video_bg.png youtube.png zepto.png zeptologo.png".split(" ");
                return c
            }(w),
            pa = {
                Le: "NORMAL",
                uv: "IEPINNED",
                Cl: "MORECOMING",
                Jq: "PURCHASE",
                Fm: "TIME"
            },
            la = function() {
                var a = {
                    Jg: 0,
                    Lg: 1,
                    Ig: 2,
                    Ug: 3,
                    yl: 4,
                    Lm: 5,
                    xl: 6,
                    Wk: 7,
                    wl: 8,
                    El: 9,
                    lp: 10,
                    Gs: function(c) {
                        switch (c) {
                            case "de":
                                return a.Ig;
                            case "fr":
                                return a.Lg;
                            case "ru":
                                return a.Ug;
                            case "en":
                            case "en_GB":
                            case "en_US":
                                return a.Jg;
                            case "ko":
                                return a.yl;
                            case "zh":
                                return a.Lm;
                            case "ja":
                                return a.xl;
                            case "es":
                                return a.Wk;
                            case "it":
                                return a.wl;
                            case "nl":
                                return a.El;
                            case "br":
                                return a.lp
                        }
                        if (3 <= c.length) switch (c.substr(0, 3)) {
                            case "de-":
                                return a.Ig;
                            case "fr-":
                                return a.Lg;
                            case "ru-":
                                return a.Ug;
                            case "en-":
                                return a.Jg;
                            case "ko-":
                                return a.yl;
                            case "zh-":
                                return a.Lm;
                            case "ja-":
                                return a.xl;
                            case "es-":
                                return a.Wk;
                            case "it-":
                                return a.wl;
                            case "nl-":
                                return a.El;
                            case "br-":
                                return a.lp
                        }
                        return null
                    },
                    MB: function(c) {
                        switch (c) {
                            case a.Ig:
                                return "de";
                            case a.Lg:
                                return "fr";
                            case a.Ug:
                                return "ru";
                            case a.yl:
                                return "ko";
                            case a.Lm:
                                return "zh";
                            case a.xl:
                                return "ja";
                            case a.Wk:
                                return "es";
                            case a.wl:
                                return "it";
                            case a.El:
                                return "nl";
                            default:
                                return "en"
                        }
                    }
                };
                return a
            }(),
            R = function(a) {
                a.Dy = !0;
                return a
            }({
                xk: "http://www.cuttherope.net",
                Cx: !0,
                Vm: [{
                    s: "Cardboard Box",
                    j: "Carton",
                    i: "Pappkiste",
                    k: "\u041a\u0430\u0440\u0442\u043e\u043d\u043d\u0430\u044f"
                }, {
                    s: "Fabric Box",
                    j: "Tissu",
                    i: "Stoffkiste",
                    k: "\u0422\u043a\u0430\u043d\u0435\u0432\u0430\u044f"
                }, {
                    s: "Toy Box",
                    j: "Jouets",
                    i: "Spielzeugkiste",
                    k: "\u0418\u0433\u0440\u0443\u0448\u0435\u0447\u043d\u0430\u044f"
                }, {
                    s: "Magic Box",
                    j: "Magique",
                    i: "Magiekiste",
                    k: "\u0412\u043e\u043b\u0448\u0435\u0431\u043d\u0430\u044f"
                }, {
                    s: "New levels\ncoming soon!",
                    j: "De nouveaux niveaux bient\u00f4t disponibles!",
                    i: "Neue Level\nkommen bald!",
                    k: "\u041d\u043e\u0432\u044b\u0435 \u0443\u0440\u043e\u0432\u043d\u0438\n\u043d\u0430 \u043f\u043e\u0434\u0445\u043e\u0434\u0435!"
                }],
                Xn: [la.Jg, la.Lg, la.Ig, la.Ug],
                cs: ["box1_bgd.png", "box2_bgd.png", "box6_bgd.png", "box4_bgd.png", "boxmore_bgd.png"],
                as: [],
                Um: ["levelbg1.jpg", "levelbg2.jpg", "levelbg6.jpg", "levelbg4.jpg"],
                jx: [pa.Le, pa.Le, pa.Le, pa.Le, pa.Cl],
                VB: [0, 20, 40, 60, null],
                supports: [0, 1, 5, 3, null],
                vB: [!1, !1, !1, !1, !1],
                gt: va.Fw,
                Hs: va.Dw.concat(va.pv),
                oz: va.Ew,
                mz: ["loader-bg.jpg", "loader-logo.png"],
                dy: va.Cw.concat(va.ov),
                Tf: [{
                    mg: [{
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 156,
                            y: 139
                        }, {
                            name: 100,
                            x: 159,
                            y: 51,
                            length: 90,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 2,
                            x: 161,
                            y: 427
                        }, {
                            name: 3,
                            x: 162,
                            y: 230,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 161,
                            y: 295,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 161,
                            y: 361,
                            timeout: -1
                        }, {
                            name: 4,
                            x: 177,
                            y: 31,
                            locale: "en",
                            text: "Slide across to cut the rope",
                            width: 130
                        }, {
                            name: 4,
                            x: 182,
                            y: 335,
                            locale: "en",
                            text: "Deliver candy to Om Nom",
                            width: 130
                        }, {
                            name: 5,
                            x: 57,
                            y: 119,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 8,
                            x: 231,
                            y: 416,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 109,
                            y: 119,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 161,
                            y: 119,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 213,
                            y: 119,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 265,
                            y: 119,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 14,
                            x: 73,
                            y: 145,
                            locale: "en",
                            g: 100,
                            o: 100,
                            O: 2
                        }],
                        k: [{
                            name: 14,
                            x: 73,
                            y: 153,
                            locale: "ru",
                            g: 100,
                            o: 100,
                            O: 2
                        }, {
                            name: 5,
                            x: 109,
                            y: 130,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 57,
                            y: 130,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 161,
                            y: 130,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 213,
                            y: 130,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 265,
                            y: 130,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 177,
                            y: 0,
                            locale: "ru",
                            text: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0438\u043b\u0438 \u043f\u0440\u043e\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u0443\u0440\u0441\u043e\u0440\u043e\u043c, \u0447\u0442\u043e\u0431\u044b \u043f\u0435\u0440\u0435\u0440\u0435\u0437\u0430\u0442\u044c \u0432\u0435\u0440\u0435\u0432\u043a\u0443",
                            width: 130
                        }, {
                            name: 8,
                            x: 231,
                            y: 415,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 196,
                            y: 312,
                            locale: "ru",
                            text: "\u0414\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043b\u0435\u0434\u0435\u043d\u0435\u0446 \u0410\u043c \u041d\u044f\u043c\u0443",
                            width: 100
                        }],
                        j: [{
                            name: 14,
                            x: 73,
                            y: 150,
                            locale: "fr",
                            g: 100,
                            o: 100,
                            O: 2
                        }, {
                            name: 5,
                            x: 109,
                            y: 124,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 57,
                            y: 124,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 161,
                            y: 124,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 213,
                            y: 124,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 265,
                            y: 124,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 177,
                            y: 31,
                            locale: "fr",
                            text: "Clique ou fais glisser pour couper la corde",
                            width: 130
                        }, {
                            name: 8,
                            x: 231,
                            y: 415,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 196,
                            y: 311,
                            locale: "fr",
                            text: "Donne un bonbon \u00e0 Om Nom",
                            width: 100
                        }],
                        i: [{
                            name: 14,
                            x: 73,
                            y: 155,
                            locale: "de",
                            g: 100,
                            o: 100,
                            O: 2
                        }, {
                            name: 5,
                            x: 109,
                            y: 129,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 57,
                            y: 129,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 161,
                            y: 129,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 213,
                            y: 129,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 5,
                            x: 265,
                            y: 129,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 175,
                            y: 15,
                            locale: "de",
                            text: "Klicke oder ziehe, um das Seil zu zerschneiden",
                            width: 120
                        }, {
                            name: 8,
                            x: 231,
                            y: 416,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 200,
                            y: 312,
                            locale: "de",
                            text: "Versorg Om Nom mit Bonbons",
                            width: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 69,
                            y: 203
                        }, {
                            name: 100,
                            x: 52,
                            y: 70,
                            length: 90,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 162,
                            y: 69,
                            length: 170,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 2,
                            x: 264,
                            y: 419
                        }, {
                            name: 3,
                            x: 54,
                            y: 250,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 53,
                            y: 369,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 280,
                            y: 250,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 275,
                            y: 69,
                            length: 320,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 4,
                            x: 133,
                            y: 285,
                            locale: "en",
                            text: "Collect as many stars as you can",
                            width: 150
                        }, {
                            name: 13,
                            x: 113,
                            y: 321,
                            locale: "en",
                            g: 100,
                            o: 100
                        }],
                        k: [{
                            name: 13,
                            x: 94,
                            y: 315,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 103,
                            y: 278,
                            locale: "ru",
                            text: "\u0421\u0442\u0430\u0440\u0430\u0439\u0442\u0435\u0441\u044c \u0441\u043e\u0431\u0440\u0430\u0442\u044c \u043a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0431\u043e\u043b\u044c\u0448\u0435 \u0437\u0432\u0435\u0437\u0434",
                            width: 210
                        }],
                        j: [{
                            name: 4,
                            x: 137,
                            y: 285,
                            locale: "fr",
                            text: "Collecte autant d'\u00e9toiles que tu le peux",
                            width: 200
                        }, {
                            name: 13,
                            x: 113,
                            y: 321,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 4,
                            x: 126,
                            y: 285,
                            locale: "de",
                            text: "Sammle m\u00f6glichst viele Sternchen",
                            width: 170
                        }, {
                            name: 13,
                            x: 106,
                            y: 321,
                            locale: "de",
                            g: 100,
                            o: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            O: 1,
                            $: 1
                        }],
                        na: [{
                            name: 52,
                            x: 158,
                            y: 187
                        }, {
                            name: 2,
                            x: 262,
                            y: 362
                        }, {
                            name: 100,
                            x: 161,
                            y: 315,
                            length: 93,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 100,
                            x: 289,
                            y: 186,
                            length: 105,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 100,
                            x: 162,
                            y: 57,
                            length: 93,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 100,
                            x: 33,
                            y: 186,
                            length: 105,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 3,
                            x: 159,
                            y: 226,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 32,
                            y: 312,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 161,
                            y: 434,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 101,
                            y: 238
                        }, {
                            name: 2,
                            x: 219,
                            y: 431
                        }, {
                            name: 3,
                            x: 102,
                            y: 326,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 217,
                            y: 209,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 217,
                            y: 74,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 96,
                            y: 139,
                            length: 90,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 54,
                            x: 99,
                            y: 391
                        }, {
                            name: 100,
                            x: 219,
                            y: 252,
                            length: 140,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 4,
                            x: 50,
                            y: 44,
                            locale: "en",
                            text: "Click to pop the bubble",
                            width: 120,
                            O: 1
                        }, {
                            name: 4,
                            x: 157,
                            y: 293,
                            locale: "en",
                            text: "The bubble will lift the candy up",
                            width: 120
                        }, {
                            name: 8,
                            x: 167,
                            y: 391,
                            locale: "en",
                            a: 15,
                            g: 100,
                            o: 100
                        }, {
                            name: 9,
                            x: 218,
                            y: 78,
                            locale: "en",
                            g: 100,
                            o: 10,
                            O: 1
                        }, {
                            name: 102,
                            x: 269,
                            y: 426,
                            a: 10,
                            ln: 1
                        }],
                        k: [{
                            name: 8,
                            x: 167,
                            y: 391,
                            locale: "ru",
                            a: 20,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 138,
                            y: 315,
                            locale: "ru",
                            text: "\u041f\u0443\u0437\u044b\u0440\u044c \u043f\u043e\u0434\u044b\u043c\u0435\u0442 \u043b\u0435\u0434\u0435\u043d\u0435\u0446 \u0432\u0432\u0435\u0440\u0445",
                            width: 160
                        }, {
                            name: 4,
                            x: 21,
                            y: 44,
                            locale: "ru",
                            text: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043b\u043e\u043f\u043d\u0443\u0442\u044c \u043f\u0443\u0437\u044b\u0440\u044c",
                            width: 160,
                            O: 1
                        }, {
                            name: 9,
                            x: 218,
                            y: 78,
                            locale: "ru",
                            g: 100,
                            o: 100,
                            O: 1
                        }],
                        j: [{
                            name: 4,
                            x: 121,
                            y: 311,
                            locale: "fr",
                            text: "La bulle fera monter le bonbon",
                            width: 150
                        }, {
                            name: 8,
                            x: 167,
                            y: 386,
                            locale: "fr",
                            a: 15,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 10,
                            y: 45,
                            locale: "fr",
                            text: "\u00c9clate la bulle avec ton doigt",
                            width: 160,
                            O: 1
                        }, {
                            name: 9,
                            x: 217,
                            y: 78,
                            locale: "fr",
                            g: 100,
                            o: 100,
                            O: 1
                        }],
                        i: [{
                            name: 4,
                            x: 25,
                            y: 15,
                            locale: "de",
                            text: "Klicke, um die Seifenblase platzen zu lassen",
                            width: 140,
                            O: 1
                        }, {
                            name: 9,
                            x: 217,
                            y: 77,
                            locale: "de",
                            g: 100,
                            o: 10,
                            O: 1
                        }, {
                            name: 4,
                            x: 138,
                            y: 308,
                            locale: "de",
                            text: "Die Seifenblase l\u00e4sst den Bonbon schweben",
                            width: 170
                        }, {
                            name: 8,
                            x: 166,
                            y: 390,
                            locale: "de",
                            a: 15,
                            g: 100,
                            o: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 266,
                            y: 161
                        }, {
                            name: 100,
                            x: 155,
                            y: 250,
                            length: 95,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 153,
                            y: 110,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 2,
                            x: 155,
                            y: 430
                        }, {
                            name: 3,
                            x: 37,
                            y: 264,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 152,
                            y: 70,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 276,
                            y: 264,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 252,
                            y: 367
                        }, {
                            name: 4,
                            x: 17,
                            y: 301,
                            locale: "en",
                            text: "You can restart the level by pressing the",
                            width: 200
                        }, {
                            name: 12,
                            x: 88,
                            y: 377,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 85,
                            y: 348,
                            locale: "en",
                            text: "button",
                            width: 100
                        }],
                        k: [{
                            name: 4,
                            x: 17,
                            y: 304,
                            locale: "ru",
                            text: "\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c, \u043d\u0430\u0436\u0430\u0432 \u043a\u043d\u043e\u043f\u043a\u0443",
                            width: 200
                        }, {
                            name: 12,
                            x: 188,
                            y: 376,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }],
                        j: [{
                            name: 4,
                            x: 27,
                            y: 285,
                            locale: "fr",
                            text: "Tu peux recommencer le niveau en touchant le bouton",
                            width: 180
                        }, {
                            name: 12,
                            x: 175,
                            y: 361,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 12,
                            x: 212,
                            y: 333,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 31,
                            y: 282,
                            locale: "de",
                            text: "Lass den Bonbon nicht aus der Schachtel",
                            width: 175
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            O: 1,
                            $: 1
                        }],
                        na: [{
                            name: 52,
                            x: 161,
                            y: 350
                        }, {
                            name: 2,
                            x: 163,
                            y: 67
                        }, {
                            name: 100,
                            x: 243,
                            y: 290,
                            length: 120,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 100,
                            x: 83,
                            y: 401,
                            length: 90,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 54,
                            x: 165,
                            y: 421
                        }, {
                            name: 100,
                            x: 165,
                            y: 123,
                            length: 200,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 3,
                            x: 97,
                            y: 294,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 166,
                            y: 422,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 97,
                            y: 228,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 64,
                            y: 139
                        }, {
                            name: 2,
                            x: 163,
                            y: 427
                        }, {
                            name: 100,
                            x: 162,
                            y: 68,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 66,
                            y: 68,
                            length: 50,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 163,
                            y: 163,
                            length: 90,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 162,
                            y: 259,
                            length: 130,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 58,
                            x: 161,
                            y: 329,
                            a: 0,
                            size: 2
                        }, {
                            name: 58,
                            x: 159,
                            y: 229,
                            a: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 250,
                            y: 165,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 64,
                            y: 276,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 248,
                            y: 275,
                            timeout: -1
                        }, {
                            name: 10,
                            x: 249,
                            y: 347,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 190,
                            y: 359,
                            locale: "en",
                            text: "Keep the candy away from spikes",
                            width: 120
                        }],
                        k: [{
                            name: 10,
                            x: 82,
                            y: 370,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 92,
                            y: 332,
                            locale: "ru",
                            text: "\u041d\u0435 \u0434\u0430\u0439\u0442\u0435 \u043b\u0435\u0434\u0435\u043d\u0446\u0443 \u0440\u0430\u0437\u0431\u0438\u0442\u044c\u0441\u044f \u043e \u0448\u0438\u043f\u044b",
                            width: 200
                        }],
                        j: [{
                            name: 4,
                            x: 210,
                            y: 360,
                            locale: "fr",
                            text: "Garde le bonbon loin des pointes",
                            width: 120
                        }, {
                            name: 10,
                            x: 266,
                            y: 346,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 10,
                            x: 77,
                            y: 370,
                            locale: "de",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 99,
                            y: 327,
                            locale: "de",
                            text: "Pass auf, dass der Bonbon nicht in die N\u00e4he der Spikes kommt",
                            width: 250
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 514,
                            y: 418
                        }, {
                            name: 100,
                            x: 224,
                            y: 177,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 45,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 448,
                            y: 337,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 45,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 335,
                            y: 256,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 45,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 52,
                            x: 178,
                            y: 103
                        }, {
                            name: 3,
                            x: 222,
                            y: 269,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 448,
                            y: 430,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 328,
                            y: 345,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 180,
                            y: 31,
                            length: 50,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 4,
                            x: 273,
                            y: 39,
                            locale: "en",
                            text: "Automatic ropes appear when candy gets into their area",
                            width: 140
                        }, {
                            name: 8,
                            x: 316,
                            y: 164,
                            locale: "en",
                            g: 100,
                            o: 100
                        }],
                        k: [{
                            name: 8,
                            x: 325,
                            y: 173,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 234,
                            y: 68,
                            locale: "ru",
                            text: "\u0410\u0432\u0442\u043e-\u0432\u0435\u0440\u0435\u0432\u043a\u0438 \u043f\u043e\u044f\u0432\u043b\u044f\u044e\u0442\u0441\u044f, \u043a\u043e\u0433\u0434\u0430 \u043b\u0435\u0434\u0435\u043d\u0435\u0446 \u043f\u043e\u043f\u0430\u0434\u0430\u0435\u0442 \u0432 \u0438\u0445 \u0440\u0430\u0434\u0438\u0443\u0441",
                            width: 220
                        }],
                        j: [{
                            name: 4,
                            x: 213,
                            y: 41,
                            locale: "fr",
                            text: "Les cordes automatiques apparaissent lorsqu'un bonbon arrive dans leur zone",
                            width: 260
                        }, {
                            name: 8,
                            x: 298,
                            y: 144,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 4,
                            x: 250,
                            y: 47,
                            locale: "de",
                            text: "Sobald der Bonbon in ihrer N\u00e4he ist, erscheinen automatisch Seile",
                            width: 200
                        }, {
                            name: 8,
                            x: 329,
                            y: 152,
                            locale: "de",
                            g: 100,
                            o: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 160,
                            y: 316
                        }, {
                            name: 2,
                            x: 162,
                            y: 439
                        }, {
                            name: 54,
                            x: 160,
                            y: 317
                        }, {
                            name: 100,
                            x: 36,
                            y: 413,
                            length: 130,
                            m: !1,
                            G: !1,
                            kg: !1,
                            Hh: !1,
                            n: -1,
                            pe: !1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 291,
                            y: 413,
                            length: 130,
                            m: !1,
                            G: !1,
                            kg: !1,
                            Hh: !1,
                            n: -1,
                            pe: !1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 162,
                            y: 381,
                            g: 100,
                            o: 0,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 93,
                            y: 231,
                            length: 100,
                            m: !1,
                            G: !1,
                            kg: !1,
                            Hh: !1,
                            n: 70,
                            pe: !1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 231,
                            y: 231,
                            length: 100,
                            m: !1,
                            G: !1,
                            kg: !1,
                            Hh: !1,
                            n: 70,
                            pe: !1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 59,
                            x: 232,
                            y: 232,
                            a: 0,
                            size: 3,
                            path: "0,0",
                            g: 40,
                            o: 40,
                            yf: !1
                        }, {
                            name: 59,
                            x: 90,
                            y: 232,
                            a: 0,
                            size: 3,
                            path: "0,0",
                            g: -40,
                            o: -40,
                            yf: !1
                        }, {
                            name: 3,
                            x: 161,
                            y: 32,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 161,
                            y: 73,
                            timeout: -1
                        }]
                    }]
                }, {
                    mg: [{
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 161,
                            y: 220
                        }, {
                            name: 2,
                            x: 254,
                            y: 416
                        }, {
                            name: 3,
                            x: 299,
                            y: 89,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 20,
                            y: 89,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 161,
                            y: 171,
                            timeout: -1
                        }, {
                            name: 55,
                            x: 42,
                            y: 237,
                            a: 0
                        }, {
                            name: 55,
                            x: 277,
                            y: 233,
                            a: 180
                        }, {
                            name: 100,
                            x: 162,
                            y: 88,
                            length: 110,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 55,
                            x: 161,
                            y: 334,
                            a: -90
                        }, {
                            name: 4,
                            x: 22,
                            y: 357,
                            locale: "en",
                            text: "Tap the Air Cushion to blow objects",
                            width: 180
                        }, {
                            name: 8,
                            x: 101,
                            y: 347,
                            locale: "en",
                            a: 180,
                            g: 100,
                            o: 100
                        }],
                        k: [{
                            name: 8,
                            x: 104,
                            y: 350,
                            locale: "ru",
                            a: 180,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 22,
                            y: 357,
                            locale: "ru",
                            text: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043f\u043e\u0434\u0443\u0448\u043a\u0443, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u0434\u0443\u0442\u044c \u043d\u0430 \u043b\u0435\u0434\u0435\u043d\u0435\u0446",
                            width: 180
                        }],
                        j: [{
                            name: 8,
                            x: 101,
                            y: 347,
                            locale: "fr",
                            a: 180,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 10,
                            y: 357,
                            locale: "fr",
                            text: "Touche le coussin d'air pour qu'il souffle sur les objets",
                            width: 180
                        }],
                        i: [{
                            name: 8,
                            x: 102,
                            y: 354,
                            locale: "de",
                            a: 180,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: -15,
                            y: 360,
                            locale: "de",
                            text: "Ber\u00fchre den Luftballon, um Objekte wegzupusten",
                            width: 210
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            O: 1,
                            $: 1
                        }],
                        na: [{
                            name: 52,
                            x: 215,
                            y: 210
                        }, {
                            name: 2,
                            x: 190,
                            y: 322
                        }, {
                            name: 55,
                            x: 284,
                            y: 208,
                            a: -180
                        }, {
                            name: 100,
                            x: 222,
                            y: 82,
                            length: 90,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 100,
                            x: 101,
                            y: 209,
                            length: 95,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 3,
                            x: 99,
                            y: 253,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 98,
                            y: 345,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 98,
                            y: 82,
                            timeout: -1
                        }, {
                            name: 55,
                            x: 37,
                            y: 343,
                            a: 0
                        }, {
                            name: 57,
                            x: 37,
                            y: 257,
                            a: 0,
                            size: 1
                        }, {
                            name: 54,
                            x: 97,
                            y: 144
                        }, {
                            name: 60,
                            x: 220,
                            y: 256,
                            a: 0,
                            size: 4
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 321,
                            y: 213
                        }, {
                            name: 2,
                            x: 431,
                            y: 386
                        }, {
                            name: 100,
                            x: 323,
                            y: 47,
                            length: 130,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 55,
                            x: 183,
                            y: 224,
                            a: 0
                        }, {
                            name: 100,
                            x: 323,
                            y: 167,
                            length: 200,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 323,
                            y: 105,
                            length: 170,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 320,
                            y: 399,
                            timeout: -1
                        }, {
                            name: 57,
                            x: 323,
                            y: 347,
                            a: 0,
                            size: 1
                        }, {
                            name: 3,
                            x: 422,
                            y: 161,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 322,
                            y: 302,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 401,
                            y: 423
                        }, {
                            name: 3,
                            x: 226,
                            y: 158,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 402,
                            y: 160,
                            timeout: -1
                        }, {
                            name: 55,
                            x: 151,
                            y: 130,
                            a: 0
                        }, {
                            name: 3,
                            x: 529,
                            y: 158,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 400,
                            y: 351
                        }, {
                            name: 54,
                            x: 314,
                            y: 351
                        }, {
                            name: 52,
                            x: 528,
                            y: 225
                        }, {
                            name: 100,
                            x: 529,
                            y: 87,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 306,
                            y: 87,
                            length: 250,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 529,
                            y: 352,
                            length: 90,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            O: 1,
                            $: 1
                        }],
                        na: [{
                            name: 2,
                            x: 219,
                            y: 433
                        }, {
                            name: 54,
                            x: 100,
                            y: 176
                        }, {
                            name: 54,
                            x: 159,
                            y: 178
                        }, {
                            name: 54,
                            x: 218,
                            y: 178
                        }, {
                            name: 54,
                            x: 100,
                            y: 242
                        }, {
                            name: 54,
                            x: 159,
                            y: 244
                        }, {
                            name: 54,
                            x: 218,
                            y: 244
                        }, {
                            name: 54,
                            x: 100,
                            y: 308
                        }, {
                            name: 54,
                            x: 159,
                            y: 310
                        }, {
                            name: 54,
                            x: 218,
                            y: 310
                        }, {
                            name: 54,
                            x: 102,
                            y: 373
                        }, {
                            name: 54,
                            x: 161,
                            y: 375
                        }, {
                            name: 54,
                            x: 220,
                            y: 375
                        }, {
                            name: 54,
                            x: 98,
                            y: 109
                        }, {
                            name: 54,
                            x: 220,
                            y: 110
                        }, {
                            name: 3,
                            x: 99,
                            y: 110,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 218,
                            y: 244,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 103,
                            y: 372,
                            timeout: -1
                        }, {
                            name: 52,
                            x: 157,
                            y: 97
                        }, {
                            name: 55,
                            x: 36,
                            y: 376,
                            a: -20
                        }, {
                            name: 55,
                            x: 35,
                            y: 247,
                            a: -20
                        }, {
                            name: 55,
                            x: 284,
                            y: 245,
                            a: 200
                        }, {
                            name: 55,
                            x: 284,
                            y: 374,
                            a: 200
                        }, {
                            name: 54,
                            x: 40,
                            y: 312
                        }, {
                            name: 54,
                            x: 277,
                            y: 310
                        }, {
                            name: 54,
                            x: 280,
                            y: 178
                        }, {
                            name: 54,
                            x: 37,
                            y: 180
                        }, {
                            name: 100,
                            x: 163,
                            y: 33,
                            length: 50,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1
                        }, {
                            name: 54,
                            x: 280,
                            y: 111
                        }, {
                            name: 54,
                            x: 37,
                            y: 108
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 390,
                            y: 125
                        }, {
                            name: 2,
                            x: 318,
                            y: 431
                        }, {
                            name: 100,
                            x: 391,
                            y: 46,
                            length: 40,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 323,
                            y: 225,
                            length: 70,
                            m: !1,
                            G: !1,
                            n: 80,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 57,
                            x: 375,
                            y: 406,
                            a: 90,
                            size: 1
                        }, {
                            name: 57,
                            x: 256,
                            y: 407,
                            a: 90,
                            size: 1
                        }, {
                            name: 4,
                            x: 211,
                            y: 300,
                            locale: "en",
                            text: "Cut the rope before the spider reaches the candy",
                            width: 240
                        }, {
                            name: 13,
                            x: 194,
                            y: 335,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 3,
                            x: 372,
                            y: 223,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 230,
                            y: 287,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 317,
                            y: 377,
                            timeout: -1
                        }],
                        k: [{
                            name: 4,
                            x: 48,
                            y: 271,
                            locale: "ru",
                            text: "\u041f\u0435\u0440\u0435\u0440\u0435\u0436\u044c\u0442\u0435 \u0432\u0435\u0440\u0435\u0432\u043a\u0443 \u043f\u0440\u0435\u0436\u0434\u0435, \u0447\u0435\u043c \u043f\u0430\u0443\u0447\u043e\u043a \u0434\u043e\u0431\u0435\u0440\u0435\u0442\u0441\u044f \u0434\u043e \u043b\u0435\u0434\u0435\u043d\u0446\u0430",
                            width: 200
                        }, {
                            name: 13,
                            x: 35,
                            y: 317,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }],
                        j: [{
                            name: 4,
                            x: 56,
                            y: 299,
                            locale: "fr",
                            text: "Coupe la corde avant que l'araign\u00e9e n'atteigne le bonbon",
                            width: 240
                        }, {
                            name: 13,
                            x: 39,
                            y: 334,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 4,
                            x: 79,
                            y: 287,
                            locale: "de",
                            text: "Schneide das Seil durch, bevor die Spinne am Bonbon ist",
                            width: 170
                        }, {
                            name: 13,
                            x: 150,
                            y: 276,
                            locale: "de",
                            g: 100,
                            o: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 442,
                            y: 421
                        }, {
                            name: 52,
                            x: 181,
                            y: 172
                        }, {
                            name: 100,
                            x: 345,
                            y: 136,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 65,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 185,
                            y: 79,
                            length: 60,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 259,
                            y: 245,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 65,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 3,
                            x: 256,
                            y: 127,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 434,
                            y: 336,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 257,
                            y: 335,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 345,
                            y: 307
                        }, {
                            name: 100,
                            x: 436,
                            y: 243,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 65,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 101,
                            x: 108,
                            y: 273,
                            a: 20,
                            ln: 2
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 54,
                            x: 109,
                            y: 257
                        }, {
                            name: 55,
                            x: 66,
                            y: 72,
                            a: 50
                        }, {
                            name: 3,
                            x: 208,
                            y: 191,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 385,
                            y: 195,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 546,
                            y: 192,
                            timeout: -1
                        }, {
                            name: 2,
                            x: 458,
                            y: 416
                        }, {
                            name: 52,
                            x: 111,
                            y: 174
                        }, {
                            name: 100,
                            x: 113,
                            y: 83,
                            length: 50,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 55,
                            x: 161,
                            y: 72,
                            a: 50
                        }, {
                            name: 55,
                            x: 258,
                            y: 73,
                            a: 50
                        }, {
                            name: 55,
                            x: 349,
                            y: 73,
                            a: 50
                        }, {
                            name: 100,
                            x: 47,
                            y: 154,
                            length: 460,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 55,
                            x: 437,
                            y: 73,
                            a: 50
                        }, {
                            name: 60,
                            x: 582,
                            y: 203,
                            a: 90,
                            size: 4
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 321,
                            y: 414
                        }, {
                            name: 52,
                            x: 323,
                            y: 191
                        }, {
                            name: 100,
                            x: 408,
                            y: 302,
                            length: 140,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 100,
                            x: 224,
                            y: 304,
                            length: 140,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 100,
                            x: 383,
                            y: 125,
                            length: 80,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 100,
                            x: 256,
                            y: 126,
                            length: 80,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !0,
                            H: "L"
                        }, {
                            name: 3,
                            x: 321,
                            y: 275,
                            g: 100,
                            o: 100,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 660,
                            y: 133,
                            path: "-39,-17,-91,-21,-154,-11,-201,10,-240,49,-284,99,-331,159,",
                            g: 45,
                            o: 0,
                            timeout: -1
                        }, {
                            name: 3,
                            x: -20,
                            y: 142,
                            path: "46,-14,93,-26,142,-18,195,3,239,40,282,97,327,151,",
                            g: 45,
                            o: 0,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 319,
                            y: 340
                        }],
                        "layer 2": [{
                            name: 60,
                            x: 232,
                            y: 172,
                            a: 55,
                            size: 4
                        }, {
                            name: 60,
                            x: 406,
                            y: 172,
                            a: -55,
                            size: 4
                        }]
                    }]
                }, {
                    mg: [{
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 314,
                            y: 372
                        }, {
                            name: 82,
                            x: 176,
                            y: 397,
                            a: 25,
                            size: 2
                        }, {
                            name: 82,
                            x: 454,
                            y: 396,
                            a: -25,
                            size: 2
                        }, {
                            name: 100,
                            x: 320,
                            y: 14,
                            length: 160,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 52,
                            x: 159,
                            y: 123
                        }, {
                            name: 82,
                            x: 86,
                            y: 352,
                            a: 25,
                            size: 2
                        }, {
                            name: 82,
                            x: 548,
                            y: 351,
                            a: -25,
                            size: 2
                        }, {
                            name: 3,
                            x: 165,
                            y: 350,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 471,
                            y: 350,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 320,
                            y: 319,
                            g: 35,
                            timeout: -1
                        }, {
                            name: 82,
                            x: -6,
                            y: 306,
                            a: 25,
                            size: 2
                        }, {
                            name: 82,
                            x: 643,
                            y: 304,
                            a: -25,
                            size: 2
                        }, {
                            name: 82,
                            x: 360,
                            y: 440,
                            a: -25,
                            size: 2
                        }, {
                            name: 82,
                            x: 267,
                            y: 440,
                            a: 25,
                            size: 2
                        }],
                        s: [{
                            name: 4,
                            x: 228,
                            y: 234,
                            locale: "en",
                            text: "Candy will bounce away from this platform",
                            width: 200
                        }, {
                            name: 13,
                            x: 207,
                            y: 270,
                            locale: "en",
                            g: 100,
                            o: 100
                        }],
                        k: [{
                            name: 4,
                            x: 229,
                            y: 232,
                            locale: "ru",
                            text: "\u041b\u0435\u0434\u0435\u043d\u0435\u0446 \u043e\u0442\u0441\u043a\u0430\u043a\u0438\u0432\u0430\u0435\u0442 \u043e\u0442 \u0442\u0430\u043a\u0438\u0445 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c",
                            width: 200
                        }, {
                            name: 13,
                            x: 206,
                            y: 270,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 4,
                            x: 229,
                            y: 233,
                            locale: "de",
                            text: "Die S\u00fc\u00dfigkeit wird von der Plattform h\u00fcpfen",
                            width: 200
                        }, {
                            name: 13,
                            x: 210,
                            y: 269,
                            locale: "de",
                            g: 100,
                            o: 100
                        }],
                        j: [{
                            name: 4,
                            x: 228,
                            y: 234,
                            locale: "fr",
                            text: "Le bonbon rebondira hors de cette plate-forme",
                            width: 200
                        }, {
                            name: 13,
                            x: 209,
                            y: 268,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 82,
                            x: 254,
                            y: 139,
                            a: -135,
                            size: 2
                        }, {
                            name: 82,
                            x: 62,
                            y: 136,
                            a: 135,
                            size: 2
                        }, {
                            name: 82,
                            x: 253,
                            y: 335,
                            a: -45,
                            size: 2
                        }, {
                            name: 82,
                            x: 66,
                            y: 332,
                            a: 45,
                            size: 2
                        }, {
                            name: 2,
                            x: 48,
                            y: 222
                        }, {
                            name: 52,
                            x: 159,
                            y: 235
                        }, {
                            name: 82,
                            x: 159,
                            y: 373,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 157,
                            y: 101,
                            a: 180,
                            size: 2
                        }, {
                            name: 3,
                            x: 161,
                            y: 327,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 160,
                            y: 141,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 224,
                            y: 234,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 85,
                            y: 429,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 241,
                            y: 429,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 91,
                            y: 56,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 231,
                            y: 57,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 55,
                            x: 284,
                            y: 235,
                            a: 135
                        }, {
                            name: 103,
                            x: 290,
                            y: 45,
                            a: 10,
                            ln: 3
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 231,
                            y: 196
                        }, {
                            name: 55,
                            x: 129,
                            y: 193,
                            a: 0
                        }, {
                            name: 55,
                            x: 651,
                            y: 187,
                            a: 180
                        }, {
                            name: 82,
                            x: 336,
                            y: 260,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 445,
                            y: 260,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 548,
                            y: 260,
                            a: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 575,
                            y: 71,
                            path: "0,150",
                            g: 30,
                            timeout: 10
                        }, {
                            name: 3,
                            x: 385,
                            y: 69,
                            path: "0,150",
                            g: 20,
                            timeout: 15
                        }, {
                            name: 3,
                            x: 481,
                            y: 71,
                            path: "0,150",
                            g: 10,
                            timeout: 20
                        }, {
                            name: 2,
                            x: 55,
                            y: 422
                        }, {
                            name: 82,
                            x: 225,
                            y: 260,
                            a: 0,
                            size: 2
                        }, {
                            name: 100,
                            x: 57,
                            y: 308,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 70,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 388,
                            y: 133
                        }, {
                            name: 2,
                            x: 273,
                            y: 41
                        }, {
                            name: 81,
                            x: 398,
                            y: 189,
                            a: -30,
                            size: 1
                        }, {
                            name: 81,
                            x: 191,
                            y: 229,
                            a: 40,
                            size: 1
                        }, {
                            name: 81,
                            x: 404,
                            y: 310,
                            a: -30,
                            size: 1
                        }, {
                            name: 81,
                            x: 203,
                            y: 372,
                            a: 30,
                            size: 1
                        }, {
                            name: 81,
                            x: 397,
                            y: 448,
                            a: -30,
                            size: 1
                        }, {
                            name: 3,
                            x: 403,
                            y: 307,
                            path: "RW40",
                            g: 75,
                            o: 0,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 388,
                            y: 27,
                            length: 70,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L",
                            wh: !1
                        }, {
                            name: 54,
                            x: 308,
                            y: 398
                        }, {
                            name: 3,
                            x: 204,
                            y: 367,
                            path: "RC40",
                            g: 75,
                            o: 0,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 220,
                            y: 196,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 140,
                            y: 217
                        }, {
                            name: 82,
                            x: 131,
                            y: 261,
                            a: 0,
                            size: 2
                        }, {
                            name: 55,
                            x: 57,
                            y: 197,
                            a: 0
                        }, {
                            name: 2,
                            x: 150,
                            y: 431
                        }, {
                            name: 3,
                            x: 230,
                            y: 230,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 281,
                            y: 199,
                            a: -90,
                            size: 2
                        }, {
                            name: 54,
                            x: 222,
                            y: 311
                        }, {
                            name: 55,
                            x: 57,
                            y: 317,
                            a: 0
                        }, {
                            name: 3,
                            x: 165,
                            y: 360,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 165,
                            y: 70,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 281,
                            y: 315,
                            a: -90,
                            size: 2
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 81,
                            x: 211,
                            y: 447,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 278,
                            y: 447,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 343,
                            y: 448,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 407,
                            y: 448,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 472,
                            y: 448,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 538,
                            y: 448,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 601,
                            y: 448,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 280,
                            y: 42,
                            a: 180,
                            size: 1
                        }, {
                            name: 81,
                            x: 344,
                            y: 49,
                            a: 190,
                            size: 1
                        }, {
                            name: 81,
                            x: 405,
                            y: 66,
                            a: 200,
                            size: 1
                        }, {
                            name: 81,
                            x: 462,
                            y: 92,
                            a: 210,
                            size: 1
                        }, {
                            name: 81,
                            x: 514,
                            y: 129,
                            a: 220,
                            size: 1
                        }, {
                            name: 81,
                            x: 558,
                            y: 174,
                            a: 230,
                            size: 1
                        }, {
                            name: 81,
                            x: 595,
                            y: 226,
                            a: 240,
                            size: 1
                        }, {
                            name: 81,
                            x: 617,
                            y: 283,
                            a: 260,
                            size: 1
                        }, {
                            name: 81,
                            x: 624,
                            y: 345,
                            a: 270,
                            size: 1
                        }, {
                            name: 2,
                            x: 52,
                            y: 352
                        }, {
                            name: 100,
                            x: 219,
                            y: 72,
                            length: 220,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 52,
                            x: 221,
                            y: 313
                        }, {
                            name: 81,
                            x: 624,
                            y: 407,
                            a: -90,
                            size: 1
                        }, {
                            name: 81,
                            x: 216,
                            y: 42,
                            a: 180,
                            size: 1
                        }, {
                            name: 3,
                            x: 558,
                            y: 258,
                            path: "-39,-66,-96,-120,-160,-155,",
                            g: 70,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 587,
                            y: 343,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 277,
                            y: 409,
                            timeout: -1
                        }, {
                            name: 55,
                            x: 127,
                            y: 345,
                            a: 0
                        }, {
                            name: 81,
                            x: 87,
                            y: 447,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 149,
                            y: 447,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 25,
                            y: 447,
                            a: 0,
                            size: 1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 100,
                            x: 160,
                            y: 270,
                            length: 140,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 82,
                            x: 160,
                            y: 147,
                            a: 0,
                            size: 2
                        }, {
                            name: 52,
                            x: 114,
                            y: 107
                        }, {
                            name: 2,
                            x: 37,
                            y: 387
                        }, {
                            name: 100,
                            x: 160,
                            y: 270,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 120,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 82,
                            x: 196,
                            y: 386,
                            a: 90,
                            size: 2
                        }, {
                            name: 54,
                            x: 273,
                            y: 389
                        }, {
                            name: 3,
                            x: 277,
                            y: 389,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 267,
                            y: 145,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 57,
                            y: 143,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 82,
                            x: 106,
                            y: 407,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 278,
                            y: 354,
                            a: -80,
                            size: 2
                        }, {
                            name: 82,
                            x: 41,
                            y: 353,
                            a: 80,
                            size: 2
                        }, {
                            name: 82,
                            x: 23,
                            y: 250,
                            a: 80,
                            size: 2
                        }, {
                            name: 82,
                            x: 298,
                            y: 252,
                            a: -80,
                            size: 2
                        }, {
                            name: 55,
                            x: 91,
                            y: 348,
                            a: 0
                        }, {
                            name: 52,
                            x: 213,
                            y: 339
                        }, {
                            name: 2,
                            x: 43,
                            y: 95
                        }, {
                            name: 3,
                            x: 106,
                            y: 240,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 70,
                            y: 197,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 127,
                            y: 191,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 212,
                            y: 407,
                            a: 0,
                            size: 2
                        }, {
                            name: 54,
                            x: 100,
                            y: 207
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 800,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 608,
                            y: 346
                        }, {
                            name: 52,
                            x: 397,
                            y: 255
                        }, {
                            name: 82,
                            x: 292,
                            y: 313,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 394,
                            y: 313,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 499,
                            y: 313,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 628,
                            y: 185,
                            a: -90,
                            size: 2
                        }, {
                            name: 82,
                            x: 496,
                            y: 53,
                            a: 180,
                            size: 2
                        }, {
                            name: 82,
                            x: 290,
                            y: 184,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 391,
                            y: 185,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 252,
                            y: 247,
                            a: 90,
                            size: 2
                        }, {
                            name: 82,
                            x: 392,
                            y: 53,
                            a: 180,
                            size: 2
                        }, {
                            name: 82,
                            x: 286,
                            y: 53,
                            a: 180,
                            size: 2
                        }, {
                            name: 82,
                            x: 57,
                            y: 188,
                            a: 90,
                            size: 2
                        }, {
                            name: 82,
                            x: 58,
                            y: 289,
                            a: 90,
                            size: 2
                        }, {
                            name: 82,
                            x: 190,
                            y: 424,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 298,
                            y: 425,
                            a: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 406,
                            y: 425,
                            a: 0,
                            size: 2
                        }, {
                            name: 55,
                            x: 302,
                            y: 254,
                            a: 0
                        }, {
                            name: 82,
                            x: 591,
                            y: 277,
                            a: -45,
                            size: 2
                        }, {
                            name: 82,
                            x: 590,
                            y: 92,
                            a: -135,
                            size: 2
                        }, {
                            name: 82,
                            x: 97,
                            y: 385,
                            a: 45,
                            size: 2
                        }, {
                            name: 82,
                            x: 90,
                            y: 94,
                            a: 135,
                            size: 2
                        }, {
                            name: 55,
                            x: 502,
                            y: 372,
                            a: 180
                        }, {
                            name: 82,
                            x: 510,
                            y: 425,
                            a: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 571,
                            y: 191,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 219,
                            y: 237,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 372,
                            y: 369,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 698,
                            y: 380,
                            a: -45,
                            size: 2
                        }, {
                            name: 82,
                            x: 685,
                            y: 283,
                            a: -135,
                            size: 2
                        }, {
                            name: 82,
                            x: 180,
                            y: 53,
                            a: 180,
                            size: 2
                        }, {
                            name: 82,
                            x: 613,
                            y: 425,
                            a: 0,
                            size: 2
                        }]
                    }]
                }, {
                    mg: [{
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 290,
                            y: 384
                        }, {
                            name: 56,
                            x: 15,
                            y: 367,
                            group: 0,
                            a: -90
                        }, {
                            name: 56,
                            x: 290,
                            y: 114,
                            group: 0,
                            a: 90
                        }, {
                            name: 52,
                            x: 15,
                            y: 150
                        }, {
                            name: 100,
                            x: 15,
                            y: 69,
                            length: 90,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: 0,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 4,
                            x: 76,
                            y: 209,
                            locale: "en",
                            text: "Drop the candy into the magic hat and it will fall out from the other one",
                            width: 160
                        }, {
                            name: 8,
                            x: 100,
                            y: 360,
                            locale: "en",
                            a: 0,
                            g: 100,
                            o: 100
                        }, {
                            name: 3,
                            x: 15,
                            y: 328,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 290,
                            y: 177,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 290,
                            y: 319,
                            timeout: -1
                        }],
                        j: [{
                            name: 8,
                            x: 118,
                            y: 347,
                            locale: "fr",
                            a: 0,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 76,
                            y: 201,
                            locale: "fr",
                            text: "D\u00e9pose le bonbon dans le chapeau magique et il tombera de l'autre chapeau",
                            width: 160
                        }],
                        i: [{
                            name: 8,
                            x: 118,
                            y: 348,
                            locale: "de",
                            a: 0,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 72,
                            y: 197,
                            locale: "de",
                            text: "Wirf den Bonbon in den magischen Hut und er kommt aus einem anderen wieder raus",
                            width: 160
                        }],
                        k: [{
                            name: 8,
                            x: 122,
                            y: 354,
                            locale: "ru",
                            a: 0,
                            g: 100,
                            o: 100
                        }, {
                            name: 4,
                            x: 80,
                            y: 230,
                            locale: "ru",
                            text: "\u041a\u0438\u043d\u044c\u0442\u0435 \u043a\u043e\u043d\u0444\u0435\u0442\u0443 \u0432 \u043e\u0434\u043d\u0443 \u0438\u0437 \u0432\u043e\u043b\u0448\u0435\u0431\u043d\u044b\u0445 \u0448\u043b\u044f\u043f, \u0438 \u043e\u043d\u0430 \u0432\u044b\u043b\u0435\u0442\u0438\u0442 \u0438\u0437 \u0434\u0440\u0443\u0433\u043e\u0439",
                            width: 160
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 4,
                            x: 78,
                            y: 32,
                            locale: "en",
                            text: "Candy maintains its speed when teleporting",
                            width: 200
                        }, {
                            name: 13,
                            x: 59,
                            y: 70,
                            locale: "en",
                            g: 100,
                            o: 100
                        }, {
                            name: 2,
                            x: 253,
                            y: 177
                        }, {
                            name: 56,
                            x: 241,
                            y: 373,
                            group: 0,
                            a: -180
                        }, {
                            name: 56,
                            x: 70,
                            y: 235,
                            group: 0,
                            a: -60
                        }, {
                            name: 52,
                            x: 191,
                            y: 379
                        }, {
                            name: 100,
                            x: 112,
                            y: 378,
                            length: 50,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: 80,
                            u: !1,
                            t: 80,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 266,
                            y: 321,
                            length: 55,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 267,
                            y: 432,
                            length: 55,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 113,
                            y: 169,
                            path: "RW30",
                            g: 70,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 148,
                            y: 154,
                            path: "RC30",
                            g: 80,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 130,
                            y: 158,
                            path: "RC20",
                            g: 80,
                            timeout: -1
                        }],
                        j: [{
                            name: 4,
                            x: 78,
                            y: 23,
                            locale: "fr",
                            text: "La vitesse du bonbon reste identique lorsqu'il est t\u00e9l\u00e9port\u00e9",
                            width: 200
                        }, {
                            name: 13,
                            x: 50,
                            y: 73,
                            locale: "fr",
                            g: 100,
                            o: 100
                        }],
                        i: [{
                            name: 4,
                            x: 69,
                            y: 28,
                            locale: "de",
                            text: "Beim Teleportieren beh\u00e4lt der Bonbon seine Geschwindigkeit bei",
                            width: 200
                        }, {
                            name: 13,
                            x: 54,
                            y: 72,
                            locale: "de",
                            g: 100,
                            o: 100
                        }],
                        k: [{
                            name: 4,
                            x: 62,
                            y: 31,
                            locale: "ru",
                            text: "\u041a\u043e\u043d\u0444\u0435\u0442\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442 \u0441\u0432\u043e\u044e \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u043f\u0440\u0438 \u0442\u0435\u043b\u0435\u043f\u043e\u0440\u0442\u0430\u0446\u0438\u0438",
                            width: 240
                        }, {
                            name: 13,
                            x: 43,
                            y: 69,
                            locale: "ru",
                            g: 100,
                            o: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 320,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 55,
                            y: 333
                        }, {
                            name: 52,
                            x: 220,
                            y: 340
                        }, {
                            name: 81,
                            x: 130,
                            y: 405,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 210,
                            y: 405,
                            a: 0,
                            size: 1
                        }, {
                            name: 100,
                            x: 167,
                            y: 310,
                            length: 50,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 56,
                            x: 260,
                            y: 353,
                            group: 0,
                            a: -180
                        }, {
                            name: 56,
                            x: 65,
                            y: 165,
                            group: 0,
                            a: 0
                        }, {
                            name: 81,
                            x: 280,
                            y: 225,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 200,
                            y: 225,
                            a: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 120,
                            y: 225,
                            a: 0,
                            size: 1
                        }, {
                            name: 100,
                            x: 198,
                            y: 113,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 65,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 269,
                            y: 183,
                            path: "1,-110,",
                            g: 50,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 130,
                            y: 84,
                            path: "1,110,",
                            g: 50,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 198,
                            y: 187,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 548,
                            y: 117
                        }, {
                            name: 52,
                            x: 100,
                            y: 315
                        }, {
                            name: 54,
                            x: 100,
                            y: 316
                        }, {
                            name: 100,
                            x: 99,
                            y: 442,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 82,
                            x: 47,
                            y: 213,
                            a: 90,
                            size: 2
                        }, {
                            name: 55,
                            x: 159,
                            y: 209,
                            a: 180
                        }, {
                            name: 56,
                            x: 146,
                            y: 51,
                            group: 0,
                            a: 90
                        }, {
                            name: 82,
                            x: 272,
                            y: 209,
                            a: 90,
                            size: 2
                        }, {
                            name: 56,
                            x: 322,
                            y: 399,
                            group: 0,
                            a: 270
                        }, {
                            name: 55,
                            x: 385,
                            y: 206,
                            a: 180
                        }, {
                            name: 56,
                            x: 544,
                            y: 398,
                            group: 1,
                            a: 270
                        }, {
                            name: 56,
                            x: 371,
                            y: 54,
                            group: 1,
                            a: 90
                        }, {
                            name: 3,
                            x: 546,
                            y: 210,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 96,
                            y: 210,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 323,
                            y: 207,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 433,
                            y: 284
                        }, {
                            name: 100,
                            x: 338,
                            y: 50,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L",
                            wh: !1
                        }, {
                            name: 100,
                            x: 338,
                            y: 358,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L",
                            wh: !1
                        }, {
                            name: 100,
                            x: 459,
                            y: 202,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: 100,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L",
                            wh: !1
                        }, {
                            name: 100,
                            x: 223,
                            y: 202,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: 100,
                            u: !1,
                            t: 100,
                            c: !1,
                            H: "L",
                            wh: !1
                        }, {
                            name: 52,
                            x: 335,
                            y: 200
                        }, {
                            name: 3,
                            x: 208,
                            y: 72,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 432,
                            y: 369,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 209,
                            y: 369,
                            timeout: -1
                        }, {
                            name: 56,
                            x: 446,
                            y: 137,
                            group: 0,
                            a: 180
                        }, {
                            name: 56,
                            x: 212,
                            y: 427,
                            group: 0,
                            a: 270
                        }, {
                            name: 56,
                            x: 433,
                            y: 429,
                            group: 1,
                            a: 270
                        }, {
                            name: 56,
                            x: 227,
                            y: 150,
                            group: 1,
                            a: 0
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 167,
                            y: 358
                        }, {
                            name: 2,
                            x: 480,
                            y: 76
                        }, {
                            name: 54,
                            x: 168,
                            y: 358
                        }, {
                            name: 56,
                            x: 83,
                            y: 281,
                            group: 1,
                            a: 0
                        }, {
                            name: 56,
                            x: 84,
                            y: 186,
                            group: 0,
                            a: 0
                        }, {
                            name: 56,
                            x: 83,
                            y: 90,
                            group: 1,
                            a: 0
                        }, {
                            name: 56,
                            x: 483,
                            y: 374,
                            group: 0,
                            a: 270
                        }, {
                            name: 55,
                            x: 243,
                            y: 277,
                            a: 180
                        }, {
                            name: 55,
                            x: 242,
                            y: 182,
                            a: 180
                        }, {
                            name: 55,
                            x: 243,
                            y: 88,
                            a: 180
                        }, {
                            name: 3,
                            x: 112,
                            y: 90,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 116,
                            y: 280,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 111,
                            y: 186,
                            timeout: -1
                        }, {
                            name: 80,
                            x: 478,
                            y: 144,
                            Bj: -2,
                            Qj: 2,
                            Rj: 2,
                            a: 0,
                            size: 5
                        }, {
                            name: 55,
                            x: 479,
                            y: 187,
                            a: 90
                        }, {
                            name: 100,
                            x: 169,
                            y: 447,
                            length: 60,
                            m: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 490,
                            y: 57
                        }, {
                            name: 56,
                            x: 490,
                            y: 402,
                            group: 0,
                            a: 270
                        }, {
                            name: 56,
                            x: 130,
                            y: 105,
                            group: 0,
                            a: 90
                        }, {
                            name: 55,
                            x: 130,
                            y: 270,
                            a: 270
                        }, {
                            name: 52,
                            x: 490,
                            y: 355
                        }, {
                            name: 100,
                            x: 490,
                            y: 267,
                            length: 50,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 310,
                            y: 43,
                            timeout: -1
                        }, {
                            name: 56,
                            x: 130,
                            y: 404,
                            group: 1,
                            a: 270
                        }, {
                            name: 56,
                            x: 310,
                            y: 401,
                            group: 1,
                            a: 270
                        }, {
                            name: 3,
                            x: 310,
                            y: 162,
                            path: "0,200",
                            g: 80,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 490,
                            y: 187,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 52,
                            x: 113,
                            y: 189
                        }, {
                            name: 100,
                            x: 61,
                            y: 187,
                            length: 50,
                            m: !1,
                            n: -1,
                            u: !0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 100,
                            x: 164,
                            y: 188,
                            length: 50,
                            m: !1,
                            n: -1,
                            u: !0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 545,
                            y: 195,
                            timeout: -1
                        }, {
                            name: 56,
                            x: 111,
                            y: 401,
                            group: 0,
                            a: 270
                        }, {
                            name: 2,
                            x: 477,
                            y: 290
                        }, {
                            name: 54,
                            x: 269,
                            y: 257
                        }, {
                            name: 56,
                            x: 268,
                            y: 98,
                            group: 0,
                            a: 90
                        }, {
                            name: 3,
                            x: 407,
                            y: 191,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 475,
                            y: 113,
                            timeout: -1
                        }, {
                            name: 56,
                            x: 273,
                            y: 403,
                            group: 1,
                            a: 270
                        }, {
                            name: 56,
                            x: 419,
                            y: 402,
                            group: 1,
                            a: 270
                        }, {
                            name: 100,
                            x: 477,
                            y: 195,
                            length: 100,
                            m: !1,
                            n: 50,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 58,
                            x: 114,
                            y: 74,
                            a: 0,
                            size: 2
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            ma: 32,
                            width: 640,
                            height: 480
                        }, {
                            name: 1,
                            $: 1,
                            O: 1,
                            I: !1
                        }],
                        na: [{
                            name: 2,
                            x: 416,
                            y: 314
                        }, {
                            name: 52,
                            x: 303,
                            y: 136
                        }, {
                            name: 100,
                            x: 306,
                            y: 75,
                            length: 40,
                            m: !1,
                            G: !1,
                            n: -1,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 56,
                            x: 226,
                            y: 400,
                            group: 1,
                            a: -90
                        }, {
                            name: 56,
                            x: 304,
                            y: 139,
                            group: 1,
                            a: -180,
                            path: "RW90",
                            g: 150,
                            o: -96
                        }, {
                            name: 56,
                            x: 420,
                            y: 395,
                            group: 0,
                            a: -90
                        }, {
                            name: 56,
                            x: 304,
                            y: 139,
                            group: 0,
                            a: -180,
                            path: "RC90",
                            g: 100,
                            o: 64
                        }, {
                            name: 100,
                            x: 224,
                            y: 301,
                            length: 100,
                            m: !1,
                            G: !1,
                            n: 30,
                            q: -1,
                            u: !1,
                            t: 0,
                            c: !1,
                            H: "L"
                        }, {
                            name: 3,
                            x: 212,
                            y: 357,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 237,
                            y: 356,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 307,
                            y: 198,
                            timeout: -1
                        }]
                    }]
                }],
                Ys: [w.cl, w.dl, w.fl, w.el],
                Zs: [],
                Ox: []
            }),
            V = function() {
                var a = {},
                    c = [];
                a.subscribe = function(a, b) {
                    c.push({
                        name: a,
                        eh: b
                    });
                    return [a, b]
                };
                a.unsubscribe = function(a, b) {
                    var f, e;
                    for (f = c.length; 0 <= f; f--) e = c[f], e.name === a && e.eh === b && c.splice(f, 1)
                };
                a.ra = function(a) {
                    var b = [],
                        f = Array.prototype.slice.call(arguments, 1),
                        e, g;
                    if (0 < c.length) {
                        e = 0;
                        for (g = c.length; e < g; e++) c[e].name === a && b.push(c[e].eh);
                        e = 0;
                        for (g = b.length; e < g; e++) b[e].apply(this, f)
                    }
                };
                a.r = {
                    zl: 0,
                    cw: 1,
                    Eq: 2,
                    Jp: 3,
                    Gw: 4,
                    yp: 5,
                    zp: 6,
                    qv: 7,
                    Ap: 8,
                    Bp: 9,
                    Cp: 10,
                    Dp: 11,
                    Ib: 12,
                    tr: 13,
                    Aq: 14,
                    zw: 15,
                    Aw: 16,
                    Np: 17,
                    Ip: 18,
                    Yg: 19,
                    iv: 20,
                    hv: 21,
                    ip: 22,
                    Rl: 23,
                    Kq: 24,
                    lC: 25,
                    Lw: 26,
                    Bm: 27,
                    Cm: 28,
                    Mr: 29,
                    Km: 30,
                    sr: 31,
                    Nr: 32,
                    pw: 33,
                    Sl: 34,
                    Mk: 35
                };
                return a
            }(),
            za = function(a, c) {
                function d() {
                    e = !0;
                    for (var a = 0, b = g.length; a < b; a++) g[a]()
                }
                var b = a.jF || "",
                    f = b;
                c.subscribe(c.r.Nr, function(a) {
                    f = a ? a + "-" + b : b
                });
                var e = !1,
                    g = [],
                    k = !1,
                    l = null;
                try {
                    k = !!window.localStorage, l = {
                        getItem: function(a) {
                            return localStorage.getItem(a)
                        },
                        setItem: function(a, b) {
                            return localStorage.setItem(a, b)
                        },
                        removeItem: function(a) {
                            return localStorage.removeItem(a)
                        }
                    }
                } catch (n) {}
                if (!k && void 0 !== typeof chrome && chrome.storage && chrome.storage.local) {
                    var k = !0,
                        r = {};
                    chrome.storage.local.get(null, function(a) {
                        r = a;
                        d()
                    });
                    l = {
                        getItem: function(a) {
                            return r[a]
                        },
                        setItem: function(a, b) {
                            r[a] = b;
                            var c = {};
                            c[a] = b;
                            chrome.storage.local.set(c)
                        },
                        removeItem: function(a) {
                            r[a] = null;
                            chrome.storage.local.remove(a)
                        }
                    }
                } else d();
                return {
                    Ym: k,
                    Rh: function(a) {
                        e ? a() : g.push(a)
                    },
                    get: function(a) {
                        e ||
                            console.log("setting not ready: " + a);
                        return k ? l.getItem(f + a) : null
                    },
                    set: function(a, b) {
                        k && (null == b ? l.removeItem(f + a) : l.setItem(f + a, b.toString()))
                    },
                    remove: function(a) {
                        k && l.removeItem(f + a)
                    },
                    uj: function(a, b) {
                        var c = this.get(a);
                        return null == c ? b : "true" === c
                    },
                    th: function(a, b) {
                        var c = this.get(a);
                        return null == c ? b : parseInt(c, 10)
                    }
                }
            }(R, V),
            ra = function(a) {
                return new function() {
                    function c(a) {
                        return 0 <= window.location.href.toLowerCase().indexOf(a.toLowerCase())
                    }
                    var d = function() {
                        var a = {},
                            c = (location.search.substring(1) ||
                                "").split("&"),
                            d, g, k;
                        d = 0;
                        for (g = c.length; d < g; d++) k = c[d].split("="), 1 < k.length && (a[decodeURIComponent(k[0].replace(/\+/g, " "))] = decodeURIComponent(k[1].replace(/\+/g, " ")));
                        return a
                    }();
                    a && a.Zw && Date.now() < a.Zw && (this.Dg = c("unlockAllBoxes=true"));
                    this.lang = d.lang;
                    this.ou = c("boxBackgrounds=true");
                    this.wB = c("showFrameRate=true");
                    this.$x = c("html5audio=true");
                    this.Qo = c("showVersion=true")
                }
            }(R),
            qa = function(a, c, d, b) {
                return {
                    Ym: a.Ym,
                    qu: !0,
                    Dx: !0,
                    Fs: c.wB,
                    Qo: c.Qo,
                    vk: !0,
                    yn: function() {
                        return a.uj("music", !0)
                    },
                    rk: function(b) {
                        a.set("music",
                            b)
                    },
                    zn: function() {
                        return a.uj("sound", !0)
                    },
                    tk: function(b) {
                        a.set("sound", b)
                    },
                    wn: function() {
                        return a.uj("clickToCut", !1)
                    },
                    VA: function(b) {
                        a.set("clickToCut", b)
                    },
                    uh: function() {
                        if (c.lang) return d.Gs(c.lang);
                        var f = a.th("language", null);
                        null == f && (f = b.iy(), null == f && (f = d.Jg));
                        return f
                    },
                    dB: function(b) {
                        a.set("language", b)
                    },
                    my: function() {
                        return a.uj("isHD", null)
                    },
                    bB: function(b) {
                        a.set("isHD", b)
                    },
                    clear: function() {
                        a.remove("isHD")
                    }
                }
            }(za, ra, la, function(a) {
                return {
                    iy: function() {
                        return a.Jg
                    }
                }
            }(la), V),
            tb = {
                pb: 2560,
                ab: 1440,
                Gb: 1,
                P: 3,
                ib: 0,
                La: 105,
                Ep: 10,
                Fp: 6,
                Sk: 60,
                Oi: 3,
                zm: 42,
                Dl: 200,
                Fl: 400,
                Gl: -400,
                ym: new U(22, 20, 30, 30),
                xm: new U(70, 64, 82, 82),
                Em: new U(264, 350, 108, 2),
                Dm: new U(192, 278, 108, 2),
                vr: new U(238, 288, 114, 2),
                Hm: 275,
                Im: 550,
                Lk: 85,
                Kk: 60,
                si: 60,
                ti: 150,
                Jk: new U(48, 48, 152, 152),
                op: -35,
                np: 14,
                Am: 15,
                Ik: 40,
                Qi: 624,
                Nl: new U(300, 300, 175, 175),
                Ql: 2500,
                Pl: 30,
                Ol: 100,
                Qk: 300,
                Pk: 1400,
                Ok: new U(142, 157, 112, 104),
                yi: new U(155, 176, 88, 76),
                Tp: 1,
                Vc: 110,
                Ei: 5.625,
                $k: 1400,
                Zk: 1650,
                Yk: 142,
                Di: 74,
                He: 65,
                wm: 117,
                tm: 270,
                Yi: 140,
                um: 15,
                Wg: 40,
                vm: -16,
                Kl: 44,
                Jl: 4,
                Zd: 90,
                bl: 100,
                Ll: 800,
                Ml: 400,
                Al: 1E3,
                Bl: 300,
                Nk: 5500,
                xi: 14,
                Tk: 12,
                Hl: 1.4
            },
            H = function(a, c, d, b) {
                var f = window.ZeptoLab,
                    f = null == f ? null : f.isHD;
                null != f ? $(function() {
                    $("#optionHd").hide();
                    $("#optionSd").hide()
                }) : a.Dy || (f = c.my());
                null == f && (f = Modernizr.mq("screen and (min-width:1024px)"));
                f || (b.Kr = 0.75, b.bb = 0.75, b.$d = 768, b.Kw = 432);
                d(b);
                b.Ky = f;
                return b
            }(R, qa, function(a, c) {
                function d(b, c) {
                    var d = c.Gb;
                    c.La = b.La * d;
                    c.Oi = b.Oi * d;
                    c.zm = b.zm * d;
                    c.Dl = b.Dl * d;
                    c.Gl = b.Gl * d;
                    c.Fl = b.Fl * d;
                    c.Sk = b.Sk * d;
                    c.Em = a.Sd(b.Em, d);
                    c.Dm = a.Sd(b.Dm,
                        d);
                    c.vr = a.Sd(b.vr, d);
                    c.Hm = b.Hm * d;
                    c.Im = b.Im * d;
                    c.Lk = b.Lk * d;
                    c.si = b.si * d;
                    c.ti = b.ti * d;
                    c.Jk = a.Sd(b.Jk, d);
                    c.Kk = b.Kk * d;
                    c.Am = b.Am * d;
                    c.xm = a.Sd(b.xm, d);
                    c.ym = a.Sd(b.ym, d);
                    c.Ik = b.Ik * d;
                    c.Qi = c.Qi || b.Qi * d;
                    c.Nl = a.Sd(b.Nl, d);
                    c.Ql = b.Ql * d;
                    c.Pl = b.Pl * d;
                    c.Ol = b.Ol * d;
                    c.Ok = a.Sd(b.Ok, d);
                    c.yi = a.Sd(b.yi, d);
                    c.Qk = b.Qk * d;
                    c.Pk = b.Pk * d;
                    c.bl = b.bl * d;
                    c.Ll = b.Ll * d;
                    c.Ml = b.Ml * d;
                    c.Al = b.Al * d;
                    c.Bl = b.Bl * d;
                    c.Nk = b.Nk * d;
                    c.xi = b.xi * d;
                    c.Ei = b.Ei * d;
                    c.$k = b.$k * d;
                    c.Vc = b.Vc * d;
                    c.Zk = b.Zk * d;
                    c.Yk = b.Yk * d;
                    c.Di = b.Di * d;
                    c.He = b.He * d;
                    c.wm = b.wm * d;
                    c.Kl = b.Kl * d;
                    c.Jl = b.Jl *
                        d;
                    c.Zd = b.Zd * d;
                    c.tm = b.tm * d;
                    c.Yi = b.Yi * d;
                    c.um = b.um * d;
                    c.Wg = b.Wg * d;
                    c.vm = b.vm * d;
                    c.Tk = b.Tk * d;
                    c.d = function(a) {
                        return Math.round(a * c.Kr)
                    }
                }
                return function(a) {
                    d(c, a)
                }
            }(U, tb), {
                Or: 1024,
                pb: 1024,
                ab: 576,
                Gb: 0.4,
                Kr: 1,
                bb: 1,
                $d: 1024,
                Kw: 576,
                vi: 3,
                Ep: 3.5,
                Fp: 2,
                P: 1.2,
                ib: 0,
                Tp: 0.8,
                op: -17,
                np: 20,
                jv: 336,
                Hl: 0.925
            }),
            ja = function() {
                return {
                    debug: ha(),
                    alert: ha()
                }
            }(),
            aa = function(a, c, d, b, f, e, g, k) {
                var l = a.extend({
                    init: function() {
                        this.h()
                    },
                    ne: function(a) {
                        this.L = a;
                        this.jk = !1;
                        0 < this.L.f.length ? this.Ua(0) : this.YA()
                    },
                    Jd: function(a) {
                        var b = d[a].L;
                        b || k.debug("Image not loaded: " + d[a].path);
                        return b
                    },
                    sa: function(a) {
                        this.Ut = a;
                        this.ne(this.Jd(a))
                    },
                    Ua: function(a) {
                        this.rf = a;
                        this.jk || (a = this.L.f[a], this.width = a.M, this.height = a.U)
                    },
                    YA: function() {
                        this.rf = f.e;
                        this.width = this.L.zh;
                        this.height = this.L.yh
                    },
                    ya: function() {
                        this.L.od.x !== e.TB.x && (this.jk = !0, this.width = this.L.od.x, this.height = this.L.od.y)
                    },
                    v: function() {
                        this.vc();
                        if (0 !== this.color.B && this.L)
                            if (this.rf === f.e) {
                                var a = Math.round(this.ea),
                                    c = Math.round(this.fa);
                                b.context.drawImage(this.L.qc, a, c)
                            } else this.Kx(this.rf);
                        this.uc()
                    },
                    Kx: function(a) {
                        var c = this.L.f[a],
                            d = c.M,
                            f = c.U,
                            e = this.ea,
                            g = this.fa;
                        this.jk && (a = this.L.p[a]) && (e += a.x, g += a.y, d += this.L.be, f += this.L.Pf);
                        this.jj ? (d = Math.round(d / this.jj) * this.jj, f = Math.round(f / this.jj) * this.jj) : (d = Math.ceil(d), f = Math.ceil(f));
                        this.Ha ? (e = Math.round(e / this.Ha) * this.Ha, g = Math.round(g / this.Ha) * this.Ha) : (e = Math.round(e), g = Math.round(g));
                        0 === c.x || 0 === c.y ? b.context.drawImage(this.L.qc, c.x, c.y, d, f, e, g, d, f) : (d += 2, f += 2, b.context.drawImage(this.L.qc, c.x - 1, c.y - 1, d, f, e - 1, g - 1, d, f))
                    },
                    Mx: function(a,
                        c, d, e, g) {
                        var l = b.context,
                            k = 0,
                            s = 0,
                            z, h, C, D, J;
                        a === f.e ? (a = this.L.zh, z = this.L.yh) : (z = this.L.f[a], k = z.x, s = z.y, a = z.M, z = z.U);
                        var x = Math.floor(a),
                            E = Math.floor(z);
                        for (h = 0; h < g;) {
                            for (C = 0; C < e;) D = e - C, D > a && (D = a), D = Math.ceil(D), J = g - h, J > z && (J = z), J = Math.ceil(J), l.drawImage(this.L.qc, k, s, D, J, c + C, d + h, D, J), C += x;
                            h += E
                        }
                    },
                    Xj: function(a, b) {
                        if (this.rf === f.e) return c.Db(a, b, this.ea, this.fa, this.L.width, this.L.height);
                        var d = this.L.f[this.rf],
                            e = this.ea,
                            g = this.fa;
                        if (this.jk) var l = this.L.p[this.rf],
                            e = e + l.x,
                            g = g + l.y;
                        return c.Db(a,
                            b, e, g, d.M, d.U)
                    },
                    Ns: function(a) {
                        if (this.h(a)) return !0;
                        if (a.Pr === g.Ri) this.Ua(a.Qr);
                        else return !1;
                        return !0
                    },
                    $A: function(a, b) {
                        var c = this.Jd(a).p[b];
                        this.x = c.x;
                        this.y = c.y
                    },
                    bF: function(a, b) {
                        var c = this.Jd(a),
                            d = c.f[b],
                            c = c.p[b];
                        this.x = c.x + d.M / 2;
                        this.y = c.y + d.U / 2
                    }
                });
                l.create = function(a, b) {
                    var c = new l;
                    c.sa(a);
                    null != b && c.Ua(b);
                    return c
                };
                return l
            }(ia, U, Ka, P, N, K, ua, ja),
            ub = function(a, c, d, b) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.Se = "";
                        this.fc = this.sc = this.dd = 0;
                        this.ef = null
                    },
                    Iy: function(a, b, c) {
                        this.Se = a;
                        this.ne(b);
                        this.ef = c
                    },
                    jB: function(a, b, c) {
                        this.dd = a;
                        this.sc = b;
                        this.fc = c
                    },
                    vj: function(a) {
                        var c = this.Se.indexOf(a);
                        if (0 <= c) return c;
                        b.alert("Char not found in font:" + a);
                        return this.Se.indexOf(".")
                    },
                    cE: function(a, b, d) {
                        a = this.L.f[a];
                        var k = Math.ceil(a.M),
                            l = Math.ceil(a.U);
                        c.context.drawImage(this.L.qc, a.x, a.y, k, l, b, d, k, l)
                    },
                    Du: function(a) {
                        for (var b = 0, c = a.length, d = 0, l = 0; l < c; l++)
                            if (d = this.cg(a, l), " " === a[l]) b += this.fc + d;
                            else var n = this.vj(a[l]),
                                b = b + (this.L.f[n].M + d);
                        return Math.ceil(b - d)
                    },
                    sn: function() {
                        return this.L.f[0].U
                    },
                    cg: function(a, b) {
                        if (b === a.length - 1) return 0;
                        if (!this.ef) return this.dd;
                        var c = this.ef[a[b] + a[b + 1]];
                        return null != c ? c : this.dd
                    }
                })
            }(aa, P, N, ja),
            Ra = function() {
                return function(a, c, d, b) {
                    d = a + d;
                    b = c + b;
                    this.Iu = a;
                    this.Ju = c;
                    this.Nu = d;
                    this.Ou = c;
                    this.Wr = a;
                    this.Xr = b;
                    this.es = d;
                    this.fs = b
                }
            }(),
            Sa = function(a) {
                function c(c) {
                    this.qc = c;
                    this.f = [];
                    this.p = [];
                    this.od = a.Ph();
                    var b = $(c);
                    this.zh = c.width || b.width();
                    this.yh = c.height || b.height();
                    this.Pf = this.be = 0
                }
                c.prototype.Ww = function(c) {
                    this.f.push(c);
                    this.p.push(new a(0, 0))
                };
                c.prototype.iB =
                    function(a, b, c) {
                        a = this.p[a];
                        a.x = b;
                        a.y = c
                };
                return c
            }(K, Ra),
            La = function(a, c, d, b, f, e, g, k, l, n) {
                return {
                    init: function() {
                        d.SA(a, f.Gb);
                        for (var b = 0, e = a.length; b < e; b++) {
                            var g = a[b];
                            delete g.wt;
                            delete g.zz;
                            c[g.id].info = g
                        }
                    },
                    Oz: function(a, d) {
                        var f = c[a];
                        switch (f.type) {
                            case b.l:
                                f.L = new g(d);
                                this.ju(f);
                                break;
                            case b.Bi:
                                f.L = new g(d);
                                this.ju(f);
                                var l = new e,
                                    n = f.info;
                                l.Iy(n.Se, f.L, n.ef);
                                l.jB(n.dd, n.sc, n.fc);
                                f.font = l
                        }
                    },
                    ju: function(a) {
                        var b = a.L,
                            c = b.zh,
                            d = b.yh;
                        a = a.info;
                        var f = a.f,
                            e = a.p;
                        b.od = k.Ph();
                        if (f) {
                            b.be = a.be ? a.be : 0;
                            b.Pf =
                                a.Pf ? a.Pf : 0;
                            for (var g = 0, n = f.length; g < n; g++) {
                                var h = f[g],
                                    h = new l(h.x, h.y, h.M, h.U);
                                h.M + b.be > c && (h.M = c - b.be);
                                h.U + b.Pf > d && (h.U = d - b.Pf);
                                b.Ww(h)
                            }
                            if (e)
                                for (c = e.length, g = 0; g < c; g++) d = e[g], b.iB(g, d.x, d.y);
                            a.D && a.C && (b.od.x = a.D, b.od.y = a.C)
                        }
                    },
                    Jd: function(a) {
                        a = c[a];
                        if (a.L) return a.L;
                        n.debug("Image not yet loaded:" + a.path);
                        return null
                    },
                    Is: function(a) {
                        a = c[a];
                        if (a.font) return a.font;
                        n.debug("Font not yet loaded:" + a.path);
                        return null
                    }
                }
            }(rb, Ka, sb, db, H, ub, Sa, K, U, ja),
            Z = function(a) {
                return {
                    Zf: function(a, d, b) {
                        return Math.max(Math.min(a,
                            b), d)
                    },
                    nk: function(a, d) {
                        return 0 > a === 0 > d
                    },
                    gb: function(a, d) {
                        return Math.floor(Math.random() * (d - a + 1) + a)
                    },
                    uA: function() {
                        return 0.5 < Math.random()
                    },
                    tb: function() {
                        return 2 * Math.random() - 1
                    },
                    et: function(c, d, b, f) {
                        return c >= d && c >= b && c >= f ? c : d >= c && d >= b && d >= f ? d : b >= d && b >= c && b >= f ? b : f >= d && f >= b && f >= c ? f : a.e
                    },
                    ht: function(c, d, b, f) {
                        return c <= d && c <= b && c <= f ? c : d <= c && d <= b && d <= f ? d : b <= d && b <= c && b <= f ? b : f <= d && f <= b && f <= c ? f : a.e
                    },
                    Sy: function(a, d, b, f, e, g, k, l) {
                        var n, r;
                        n = e - a + k - b;
                        r = g - d + l - f;
                        a = b - a;
                        d = f - d;
                        e = k - e;
                        l -= g;
                        g = e * r - l * n;
                        n = a * r - d * n;
                        r = Math.abs(d * e - l * a);
                        return Math.abs(g) <= r && Math.abs(n) <= r
                    },
                    ZE: function(a, d) {
                        var b = Math.pow(10, d);
                        return Math.round(a * b) / b
                    },
                    au: function(a) {
                        return Math.round(100 * a) / 100
                    }
                }
            }(N),
            da = function(a, c, d, b, f, e, g, k, l) {
                function n(a, b) {
                    this.Ag = a;
                    this.width = b
                }
                var r = a.extend({
                    init: function(a) {
                        this.h();
                        this.font = a;
                        this.je = [];
                        this.height = this.width = c.e;
                        this.align = d.mb;
                        this.kh = new b(a.L);
                        this.iC = !1;
                        this.maxHeight = c.e
                    },
                    lu: function(a, b) {
                        this.Ag = a;
                        this.Hg = null == b || b === c.e ? Math.ceil(this.font.Du(a)) : Math.ceil(b);
                        this.Ag &&
                            (this.by(), this.ZB())
                    },
                    ZB: function() {
                        for (var a = 0, b = 0, f = this.font.sn(), g = 0, e = this.font.cg("..", 0), l = this.maxHeight === c.e ? this.je.length : Math.min(this.je.length, this.maxHeight / f + this.font.sc), n = l !== this.je.length, h = 0; h < l; h++) {
                            for (var a = this.je[h], k = a.Ag, r = k.length, a = this.align !== d.mb ? this.align === d.Tb || this.align === d.S ? (this.Hg - a.width) / 2 : this.Hg - a.width : 0, J = 0; J < r; J++) {
                                if (" " === k[J]) a += this.font.fc + this.font.cg(k, J);
                                else {
                                    var x = this.font.vj(k[J]),
                                        E = this.font.L.f[x].M;
                                    this.kh.Lj(x, Math.round(a), Math.round(b),
                                        g++);
                                    a += E + this.font.cg(k, J)
                                } if (n && h === l - 1 && (x = this.font.vj("."), E = this.font.L.f[x].M, J === r - 1 || J === r - 2 && a + 3 * (E + e) + this.font.fc > this.Hg)) {
                                    this.kh.Lj(x, Math.round(a), Math.round(b), g++);
                                    a += E + e;
                                    this.kh.Lj(x, Math.round(a), Math.round(b), g++);
                                    a += E + e;
                                    this.kh.Lj(x, Math.round(a), Math.round(b), g++);
                                    a += E + e;
                                    break
                                }
                            }
                            b += f + this.font.sc
                        }
                        1 >= this.je.length ? (this.height = this.font.sn(), this.width = a) : (this.height = (this.font.sn() + this.font.sc) * this.je.length - this.font.sc, this.width = this.Hg);
                        this.maxHeight !== c.e && (this.height =
                            Math.min(this.height, this.maxHeight))
                    },
                    v: function() {
                        this.vc();
                        if (0 !== this.color.B) {
                            var a = this.Ag.length,
                                b = f.context;
                            0 < a && (b.translate(this.ea, this.fa), this.kh.ws(a), b.translate(-this.ea, -this.fa))
                        }
                        this.uc()
                    },
                    by: function() {
                        for (var a = [], b = this.Ag, c = b.length, d = 0, f = 0, g = 0, e = 0, h = 0, k = 0, r = 0; r < c;) {
                            var J = b[r++];
                            if (" " == J || "\n" == J) k += g, h = r - 1, g = 0, f = r, " " == J && (f--, g = this.font.fc + this.font.cg(b, r - 1));
                            else var x = this.font.vj(J),
                                g = g + (this.font.L.f[x].M + this.font.cg(b, r - 1));
                            x = l.au(k + g) > this.Hg;
                            this.iC && x && h == e && (k +=
                                g, h = r, g = 0, f = r);
                            if (l.au(k + g) > this.Hg && h != e || "\n" == J) {
                                a[d++] = e;
                                for (a[d++] = h; f < c && " " == b[f];) f++, g -= this.font.fc;
                                h = e = f;
                                k = 0
                            }
                        }
                        0 != g && (a[d++] = e, a[d++] = r);
                        b = d >> 1;
                        this.je = [];
                        for (c = 0; c < b; c++) d = this.Ag.substring(a[c << 1], a[(c << 1) + 1]), f = this.font.Du(d), this.je.push(new n(d, f))
                    },
                    VD: function(a) {
                        var b = Xml.dx(a, "font"),
                            b = g.Is(b),
                            b = new r(b);
                        a.hasAttribute("align") && (b.align = d.parse(Xml.attr(a, "align")));
                        if (a.hasAttribute("string")) {
                            var f = Xml.dx("string"),
                                f = g.oE(f),
                                e = a.hasAttribute("width") ? Xml.cx(a, "width") : c.e;
                            b.lu(f,
                                e)
                        }
                        a.hasAttribute("height") && (b.maxHeight = Xml.cx(a, "height"));
                        return b
                    }
                });
                r.hj = function(a) {
                    var b = a.img;
                    !b && a.Ah && (b = document.getElementById(a.Ah));
                    !b && a.Kc && (b = $(a.Kc)[0]);
                    if (!b && a.Ab) {
                        var b = $("#" + a.Ab),
                            c = b.find("img");
                        0 === c.length && (c = $("<img>").prependTo(b));
                        b = c[0]
                    }
                    b || (b = new Image);
                    var e = a.tj,
                        l = a.width,
                        n = a.Dc,
                        z = null != a.alpha ? a.alpha : 1,
                        c = a.ua ? k.bb : a.scale || 1,
                        h = a.text.toString(),
                        C = f.element;
                    f.hi(document.createElement("canvas"));
                    e = g.Is(e);
                    e = new r(e);
                    e.x = Math.ceil(24 * k.Gb / 2);
                    e.y = 0;
                    e.align = n || d.mb;
                    e.lu(h, l);
                    var n = f.element,
                        h = f.context,
                        D = (l || Math.ceil(e.width)) + Math.ceil(2 * e.x),
                        l = Math.ceil(e.height);
                    n.width = D;
                    n.height = l;
                    var J = h.globalAlpha;
                    z !== J && (h.globalAlpha = z);
                    e.v();
                    b.src = n.toDataURL("image/png");
                    z !== J && (h.globalAlpha = J);
                    C && f.hi(C);
                    z = D * c;
                    c *= l;
                    a = a.ao;
                    var x;
                    a && z > a && (a /= z, x = Math.round((1 - a) * c / 2), z *= a, c *= a);
                    c = $(b).width(z).height(c);
                    x && c.css("padding-top", x);
                    return b
                };
                r.nc = function(a) {
                    a.tj = e.Kg;
                    return r.hj(a)
                };
                r.ja = function(a) {
                    a.tj = e.Ff;
                    return r.hj(a)
                };
                r.us = function(a) {
                    a.tj = e.Xk;
                    r.hj(a)
                };
                return r
            }(ia,
                N, S, Ja, P, w, La, H, Z),
            F = {
                lw: 0,
                Xd: 1,
                zC: 2,
                BD: 3,
                AC: 4,
                ow: 5,
                FC: 6,
                jC: 7,
                xp: 8,
                gw: 9,
                fw: 10,
                vw: 11,
                uw: 12,
                Oq: 13,
                Yv: 14,
                Zv: 15,
                $v: 16,
                aw: 17,
                Xv: 18,
                Fm: 19,
                xw: 20,
                sv: 21,
                mC: 22,
                uD: 23,
                Mw: 24,
                iw: 25,
                vb: 26,
                NEXT: 27,
                qb: 28,
                LOADING: 29,
                Jw: 30,
                jw: 31,
                ID: 32,
                sp: 33,
                tp: 34,
                up: 35,
                Rp: 36,
                DC: 37,
                ev: 38,
                nv: 39,
                rw: 40,
                bw: 41,
                dw: 42,
                yq: 43,
                Dq: 44,
                Qq: 45,
                Rq: 46,
                Sq: 47,
                Op: 48,
                Gp: 49,
                vp: 50,
                Tq: 51,
                Pp: 52,
                Vq: 53,
                Wq: 54,
                Uq: 55,
                xq: 56,
                Nq: 57,
                Mq: 58,
                Lq: 59,
                Mp: 60,
                Yq: 61,
                Xq: 62,
                wp: 63,
                ew: 64,
                tw: 65,
                Ke: 66,
                Ee: 67,
                fv: 68,
                Jm: 69,
                hw: 70,
                hp: 71,
                wi: 72,
                qw: 200,
                mw: 201
            },
            ga = function(a, c, d, b, f) {
                function e(a) {
                    switch (c.uh()) {
                        case d.Lg:
                            return a.j ||
                                a.s;
                        case d.Ig:
                            return a.i || a.s;
                        case d.Ug:
                            return a.k || a.s;
                        default:
                            return a.s
                    }
                }
                return {
                    Vm: function(b, c) {
                        var d = e(a.Vm[b]);
                        d && c && (d = b + 1 + ". " + d);
                        return d
                    },
                    W: function(a) {
                        var c, d, n = b.length;
                        for (d = 0; d < n; d++)
                            if (c = b[d], c.id === a) return e(c);
                        f.debug("Missing menu string for id: " + a);
                        return ""
                    },
                    qy: e,
                    nE: function() {
                        return c.uh()
                    }
                }
            }(R, qa, la, [{
                id: 0,
                s: "Play",
                j: "Jouer",
                i: "Spielen",
                k: "\u0418\u0433\u0440\u0430\u0442\u044c"
            }, {
                id: 1,
                s: "Options",
                j: "Options",
                i: "Optionen",
                k: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"
            }, {
                id: 2,
                s: "Extras",
                j: "",
                i: "Extras",
                k: "\u0415\u0449\u0435 \u043a\u043e\u0435 \u0447\u0442\u043e"
            }, {
                id: 3,
                s: "Bonus mode",
                j: "",
                i: "Bonusmodus",
                k: "\u0411\u043e\u043d\u0443\u0441 \u0440\u0435\u0436\u0438\u043c"
            }, {
                id: 4,
                s: "Full version",
                j: "Version compl\u00e8te",
                i: "Vollversion",
                k: "\u041f\u043e\u043b\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f"
            }, {
                id: 5,
                s: "Reset game",
                j: "R\u00e9initialiser",
                i: "Neu starten",
                k: "\u0421\u0431\u0440\u043e\u0441 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430"
            }, {
                id: 6,
                s: "Help",
                j: "",
                i: "Hilfe",
                k: "\u041f\u043e\u043c\u043e\u0449\u044c"
            }, {
                id: 7,
                s: "About",
                j: "\u00c0 propos",
                i: "\u00dcber",
                k: "\u041e\u0431 \u0438\u0433\u0440\u0435"
            }, {
                id: 8,
                s: "Credits",
                j: "Cr\u00e9dits",
                i: "Mitwirkende",
                k: "\u0410\u0432\u0442\u043e\u0440\u044b"
            }, {
                id: 9,
                s: "Music on",
                j: "Musique oui",
                i: "Musik an",
                k: "\u041c\u0443\u0437\u044b\u043a\u0430 \u0432\u043a\u043b."
            }, {
                id: 10,
                s: "Music off",
                j: "Musique non",
                i: "Musik aus ",
                k: "\u041c\u0443\u0437\u044b\u043a\u0430 \u0432\u044b\u043a\u043b."
            }, {
                id: 11,
                s: "Sounds on",
                j: "Sons oui",
                i: "Ger\u00e4usche an",
                k: "\u0417\u0432\u0443\u043a\u0438 \u0432\u043a\u043b."
            }, {
                id: 12,
                s: "Sounds off",
                j: "Sons non",
                i: "Ger\u00e4usche aus",
                k: "\u0417\u0432\u0443\u043a\u0438 \u0432\u044b\u043a\u043b."
            }, {
                id: F.Oq,
                s: "Are you sure you want to reset your progress?",
                j: "Voulez-vous vraiment r\u00e9initialiser votre progression?",
                i: "M\u00f6chtest du deinen Fortschritt wirklich zur\u00fccksetzen?",
                k: "\u0423\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0441\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0438\u0433\u0440\u043e\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441?"
            }, {
                id: 14,
                s: "Passable!",
                j: "Passable!",
                i: "Passabel!",
                k: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043f\u0440\u043e\u0439\u0434\u0435\u043d!"
            }, {
                id: 15,
                s: "Good!",
                j: "Bien!",
                i: "Gut!",
                k: "\u0425\u043e\u0440\u043e\u0448\u043e!"
            }, {
                id: 16,
                s: "Great!",
                j: "Super!",
                i: "Prima!",
                k: "\u041e\u0442\u043b\u0438\u0447\u043d\u043e!"
            }, {
                id: 17,
                s: "Excellent!",
                j: "Formidable!",
                i: "Hervorragend!",
                k: "\u0421\u0443\u043f\u0435\u0440!"
            }, {
                id: 18,
                s: "Level",
                j: "Niveau",
                i: "Level",
                k: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c"
            }, {
                id: 19,
                s: "Time",
                j: "Temps",
                i: "Zeit",
                k: "\u0412\u0440\u0435\u043c\u044f"
            }, {
                id: 20,
                s: "Star Bonus",
                j: "Bonus \u00e9toile",
                i: "Sternenbonus",
                k: "\u0411\u043e\u043d\u0443\u0441 \u0437\u0430 \u0437\u0432\u0435\u0437\u0434\u044b"
            }, {
                id: 21,
                s: "Your Final Score",
                j: "Votre score final",
                i: "Dein Endpunktestand",
                k: "\u0418\u0442\u043e\u0433\u043e\u0432\u044b\u0435 \u043e\u0447\u043a\u0438"
            }, {
                id: 22,
                s: "Best Score",
                j: "Meilleur score",
                i: "Beste punktzahl",
                k: "\u041b\u0443\u0447\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442"
            }, {
                id: 23,
                s: "Score",
                j: "Score",
                i: "Punktzahl",
                k: "\u041e\u0447\u043a\u0438"
            }, {
                id: 24,
                s: "Yes",
                j: "Oui",
                i: "Ja",
                k: "\u0414\u0430"
            }, {
                id: 25,
                s: "No",
                j: "Non",
                i: "Nein",
                k: "\u041d\u0435\u0442"
            }, {
                id: 26,
                s: "Replay",
                j: "Rejouer",
                i: "Wieder",
                k: "\u0415\u0449\u0435 \u0440\u0430\u0437"
            }, {
                id: 27,
                s: "Next",
                j: "Suivant",
                i: "Weiter",
                k: "\u0412\u043f\u0435\u0440\u0435\u0434"
            }, {
                id: 28,
                s: "Menu",
                j: "Menu",
                i: "Men\u00fc",
                k: "\u041c\u0435\u043d\u044e"
            }, {
                id: 29,
                s: "Loading...",
                j: "Chargement...",
                i: "Laden...",
                k: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."
            }, {
                id: 30,
                s: "Total: %d",
                j: "Total: %d",
                i: "Gesamt: %d",
                k: "\u0412\u0441\u0435\u0433\u043e: %d"
            }, {
                id: 31,
                s: "Ok",
                j: "OK",
                i: "Ok",
                k: "Ok"
            }, {
                id: 32,
                s: "Collect %d stars to unlock this level pack",
                j: "Recueillez %d \u00e9toiles pour d\u00e9verrouiller ce pack de niveaux",
                i: "Sammle %d Sterne, um dieses Levelpaket freizuschalten",
                k: "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 %d \u0437\u0432\u0435\u0437\u0434 \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u0440\u043e\u0431\u043a\u0443"
            }, {
                id: F.sp,
                s: "You are missing",
                j: "Il vous en manque",
                i: "Dir fehlen",
                k: "\u0412\u0430\u043c \u043d\u0435\u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u0432\u0441\u0435\u0433\u043e"
            }, {
                id: F.tp,
                s: "to unlock this box",
                j: "pour d\u00e9verrouiller bo\u00eete",
                i: "um dieses Box freizuschalten",
                k: "\u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u0440\u043e\u0431\u043a\u0443"
            }, {
                id: F.up,
                s: "Get more stars from the earlier levels",
                j: "Recueillez plus d'\u00e9toiles dans les niveaux pr\u00e9c\u00e9dents",
                i: "Gewinne mehr Sterne in den niedrigeren Leveln",
                k: "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0437\u0432\u0435\u0437\u0434 \u0432 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0445 \u0443\u0440\u043e\u0432\u043d\u044f\u0445"
            }, {
                id: 37,
                s: "Check back for the new levels coming with the updates",
                j: "Revenez pour d\u00e9couvrir de nouveaux niveaux avec les mises \u00e0 jour",
                i: "Komm bald wieder, neue Level kommen mit den Updates",
                k: "\u041d\u043e\u0432\u044b\u0435 \u0443\u0440\u043e\u0432\u043d\u0438 \u0431\u0443\u0434\u0443\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c\u0441\u044f \u0441 \u0430\u043f\u0434\u0435\u0439\u0442\u0430\u043c\u0438"
            }, {
                id: F.ev,
                s: "achievement gained!",
                j: "r\u00e9alisation d\u00e9verrouill\u00e9e!",
                i: "Erfolg geschafft!",
                k: "\u043e\u0442\u043a\u0440\u044b\u0442\u043e!"
            }, {
                id: 39,
                s: "Continue",
                j: "Continuer",
                i: "Weiter",
                k: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"
            }, {
                id: 40,
                s: "Skip level",
                j: "Passer",
                i: "\u00dcberspringen",
                k: "\u041f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c"
            }, {
                id: 41,
                s: "Level select",
                j: "Choisir niveau",
                i: "Levelauswahl",
                k: "\u0412\u044b\u0431\u043e\u0440 \u0443\u0440\u043e\u0432\u043d\u044f"
            }, {
                id: 42,
                s: "Main menu",
                j: "Menu principal",
                i: "Hauptmen\u00fc",
                k: "\u0413\u043b\u0430\u0432\u043d\u043e\u0435 \u043c\u0435\u043d\u044e"
            }, {
                id: F.xq,
                s: "Language",
                k: "\u042f\u0437\u044b\u043a",
                j: "Langue",
                i: "Sprache"
            }, {
                id: F.Gp,
                s: "Drag to Cut",
                j: "Glisser",
                i: "Ziehe: Schneide",
                k: "\u041f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u043d\u0438\u0435\u043c"
            }, {
                id: F.vp,
                s: "Click to Cut",
                j: "Cliquer",
                i: "Klicke: Schneide",
                k: "\u0429\u0435\u043b\u0447\u043a\u043e\u043c"
            }, {
                id: F.yq,
                s: "Let's Play",
                j: "C'est parti",
                i: "Lass uns spielen",
                k: "\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043f\u043e\u0438\u0433\u0440\u0430\u0435\u043c"
            }, {
                id: F.Dq,
                s: "More Cut the Rope fun!",
                j: "Toujours plus de Cut the Rope !",
                i: "Mehr Cut the Rope Spa\u00df!",
                k: "\u0415\u0449\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0432\u0435\u0441\u0435\u043b\u044c\u044f \u0432 \u0438\u0433\u0440\u0435 Cut the Rope!"
            }, {
                id: F.Sq,
                s: "Share...",
                j: "Partager...",
                i: "Teilen...",
                k: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f..."
            }, {
                id: F.Qq,
                s: "Share",
                j: "Partager",
                i: "Teilen",
                k: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f"
            }, {
                id: F.wp,
                s: "Congratulations!",
                j: "F\u00e9licitations!",
                i: "Gratulation!",
                k: "\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c!"
            }, {
                id: F.Rp,
                s: "You completed the game with %d stars!",
                j: "Tu as termin\u00e9 le jeu avec %d \u00e9toiles !",
                i: "Du hast das Spiel mit %d Sternen beendet!",
                k: "\u0412\u044b \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043b\u0438 \u0438\u0433\u0440\u0443 \u0441\u043e \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u043c \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e\u043c \u0437\u0432\u0435\u0437\u0434: %d!"
            }, {
                id: F.Rq,
                s: "I just found one of Om Nom's secret drawings!",
                j: "Je viens juste de trouver un des dessins secrets de Om Nom !",
                i: "Ich habe gerade eine geheime Om-Nom-Zeichnung entdeckt!",
                k: "\u041c\u043d\u043e\u044e \u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u043e \u0431\u044b\u043b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d \u043e\u0434\u0438\u043d \u0438\u0437 \u0442\u0430\u0439\u043d\u044b\u0445 \u0440\u0438\u0441\u0443\u043d\u043a\u043e\u0432 \u0410\u043c \u041d\u044f\u043c\u0430!"
            }, {
                id: F.Op,
                s: "You found a drawing!",
                j: "Tu as trouv\u00e9 un dessin !",
                i: "Du hast die Zeichnung gefunden!",
                k: "\u0412\u044b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0438\u043b\u0438 \u0440\u0438\u0441\u0443\u043d\u043e\u043a!"
            }, {
                id: F.Tq,
                s: "Show Me",
                j: "Montre-moi",
                i: "Zeig es mir",
                k: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u043d\u0435"
            }, {
                id: F.Pp,
                s: "Free Download",
                j: "T\u00e9l\u00e9chargement gratuit",
                i: "Kostenloser Download",
                k: "\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430"
            }, {
                id: F.Vq,
                s: "Cut the Rope is a fun game where you feed candy to the curiously cute green monster Om-nom.",
                j: "Cut the Rope est un jeu amusant dans lequel tu dois nourrir Om Nom, un curieux petit monstre.",
                i: "Cut the Rope ist ein lustiges Spiel, wobei du dem kuriosem, niedlichem Monster Om-nom S\u00fc\u00dfigkeiten f\u00fctterst.",
                k: "Cut the Rope   \u044d\u0442\u043e \u0432\u0435\u0441\u0435\u043b\u0430\u044f \u0438\u0433\u0440\u0430, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u0432\u044b \u043a\u043e\u0440\u043c\u0438\u0442\u0435 \u0441\u043b\u0430\u0434\u043e\u0441\u0442\u044f\u043c\u0438 \u043b\u044e\u0431\u043e\u043f\u044b\u0442\u043d\u043e\u0433\u043e \u0438 \u043c\u0438\u043b\u043e\u0433\u043e \u043c\u043e\u043d\u0441\u0442\u0440\u0430 \u043f\u043e \u0438\u043c\u0435\u043d\u0438 \u0410\u043c \u041d\u044f\u043c."
            }, {
                id: F.Wq,
                s: "Om Nom is Om Line - Cut the Rope for the Web",
                j: "Om Nom est om ligne - Cut the Rope version web",
                i: "Om Nom ist Om Line - Cut the Rope f\u00fcr das Internet",
                k: "\u0410\u043c \u041d\u044f\u043c \u0432 \u0410\u043c \u041b\u0430\u0439\u043d\u0435 \u2013 \u0432\u0435\u0431-\u0432\u0435\u0440\u0441\u0438\u044f \u0438\u0433\u0440\u044b Cut the Rope"
            }, {
                id: F.Uq,
                s: 'Play the HTML5 version of "Cut the Rope"!',
                j: "Joue \u00e0 Cut the Rope dans sa version HTML5 !",
                i: 'Spiele die HTML5 Version von "Cut the Rope"!',
                k: "\u0418\u0433\u0440\u0430\u0439\u0442\u0435 \u0432 HTML5-\u0432\u0435\u0440\u0441\u0438\u044e \u0438\u0433\u0440\u044b Cut the Rope!"
            }, {
                id: F.Nq,
                s: 'Hold the "yes" button for 3 seconds to reset.',
                j: 'Maintenir le doigt sur "Oui" pendant 3 secondes pour r\u00e9initialiser.',
                i: 'Halte zum Neustarten 3 Sekunden lang "Ja" gedr\u00fcckt.',
                k: '\u0423\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 "\u0414\u0430" \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 3 \u0441\u0435\u043a\u0443\u043d\u0434 \u0434\u043b\u044f \u0441\u0431\u0440\u043e\u0441\u0430 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430.'
            }, {
                id: F.Mp,
                s: "everything off",
                j: "tout couper",
                i: "alles aus",
                k: "\u0432\u0441\u0435 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e"
            }, {
                id: F.Mq,
                s: "reload the game in SD",
                j: "recharger le jeu en SD",
                i: "Spiel in SD neu laden",
                k: "\u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0433\u0440\u0443 \u0432 SD"
            }, {
                id: F.Lq,
                s: "reload the game in HD",
                j: "recharger le jeu en HD",
                i: "Spiel in HD neu laden",
                k: "\u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0433\u0440\u0443 \u0432 HD"
            }, {
                id: F.Yq,
                s: "A Little Too Slow...",
                j: "Un peu trop lent",
                i: "Etwas zu langsam...",
                k: "\u041a\u0430\u043a-\u0442\u043e \u043d\u0435 \u043e\u0447\u0435\u043d\u044c \u0431\u044b\u0441\u0442\u0440\u043e..."
            }, {
                id: F.Xq,
                s: "Om Nom is sad because your computer is running slow. We'll do our best, but there may be some slow-downs.",
                j: "Om Nom est triste. Votre ordinateur est tr\u00e8s lent. Nous ferons notre mieux, mais il est possible que le jeu ralentisse.",
                i: "Om Nom ist traurig, weil dein Computer so langsam ist. Wir geben unser Bestes, aber es kann trotzdem zu Verz\u00f6gerungen kommen.",
                k: '\u0410\u043c \u041d\u044f\u043c \u043e\u043f\u0435\u0447\u0430\u043b\u0435\u043d: \u0443 \u0432\u0430\u0441 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u0435\u0434\u043b\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440. \u041c\u044b, \u043a\u043e\u043d\u0435\u0447\u043d\u043e, \u043f\u043e\u0441\u0442\u0430\u0440\u0430\u0435\u043c\u0441\u044f, \u043d\u043e \u0438\u0433\u0440\u0430 \u0443 \u0432\u0430\u0441 \u043c\u043e\u0436\u0435\u0442 "\u043f\u0440\u0438\u0442\u043e\u0440\u043c\u0430\u0436\u0438\u0432\u0430\u0442\u044c".'
            }, {
                id: F.ew,
                s: "Music",
                j: "Musique",
                i: "Musik",
                k: "\u041c\u0443\u0437\u044b\u043a\u0430"
            }, {
                id: F.tw,
                s: "Sounds",
                j: "Sons oui",
                i: "Ger\u00e4usche",
                k: "\u0417\u0432\u0443\u043a\u0438"
            }, {
                id: F.Ke,
                s: "Leaderboards",
                j: "Classements",
                i: "Bestenlisten",
                k: "\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0435\u043a\u043e\u0440\u0434\u043e\u0432"
            }, {
                id: F.Ee,
                s: "Achievements",
                j: "Succ\u00e8s",
                i: "Erfolge",
                k: "\u0414\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u044f"
            }, {
                id: F.fv,
                s: "Achievement unlocked!",
                j: "Succ\u00e8s d\u00e9bloqu\u00e9 !",
                i: "Erfolg freigeschaltet!",
                k: "\u041d\u043e\u0432\u043e\u0435 \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u0435!"
            }, {
                id: F.Jm,
                s: "Get MANY MORE\n levels in the full version",
                j: "De NOMBREUX autres niveaux\n sont disponibles dans la version compl\u00e8te!",
                i: "In der Vollversion gibt\n es noch VIEL MEHR Level!",
                k: "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u041d\u0410\u041c\u041d\u041e\u0413\u041e \u0411\u041e\u041b\u042c\u0428\u0415\n \u0443\u0440\u043e\u0432\u043d\u0435\u0439 \u0432 \u043f\u043e\u043b\u043d\u043e\u0439 \u0432\u0435\u0440\u0441\u0438\u0438!"
            }, {
                id: F.hw,
                s: "Name",
                j: "Nom",
                i: "Name",
                k: "\u0418\u043c\u044f"
            }, {
                id: F.hp,
                s: "{0} & {1}",
                j: "{0} et {1}",
                i: "{0} und {1}",
                k: "{0} \u0438 {1}"
            }, {
                id: F.wi,
                s: "Buy Full Game",
                j: "Acheter le jeu complet",
                i: "Vollversion kaufen",
                k: "\u041a\u0443\u043f\u0438\u0442\u044c \u043f\u043e\u043b\u043d\u0443\u044e \u0432\u0435\u0440\u0441\u0438\u044e"
            }, {
                id: F.qw,
                s: "Settings",
                j: "Param\u00e8tres",
                i: "Einstellungen",
                k: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"
            }, {
                id: F.mw,
                s: "Privacy",
                j: "Vie priv\u00e9e",
                i: "Datenschutz",
                k: "\u041a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c"
            }], ja),
            T = function(a, c, d, b, f, e) {
                var g = {
                        s: "I just finished playing Cut the Rope on the web with %d (out of %d possible) stars!",
                        j: "",
                        i: "",
                        k: ""
                    },
                    k = {
                        xC: !0,
                        yC: !1,
                        KD: !1,
                        Nn: "images/",
                        hk: "images/" + c.$d + "/",
                        Rc: "images/" + c.$d + "/ui/",
                        bs: "images/" + c.$d + "/" + (e.OD || "ui/"),
                        ex: "audio/",
                        fy: function() {
                            return soundManager.useHTML5Audio ? Modernizr.audio.m4a ? ".m4a" : Modernizr.audio.ogg ? ".ogg" : null : ".m4a"
                        },
                        bv: "video/",
                        Ms: function() {
                            return Modernizr.video.h264 ? ".mp4" : Modernizr.video.webm ? ".webm" : null
                        },
                        jy: function() {
                            var a = window.location;
                            return a.protocol + "//" + a.host + "/images/" + c.$d + "/ui/"
                        },
                        py: function() {
                            var a = window.location;
                            return a.protocol + "//" + a.host + "/images/scores/"
                        },
                        pB: function(a, b) {
                            a.click(b)
                        },
                        hB: function(a, b) {
                            a.click(b)
                        },
                        cC: function(a, b) {
                            a.toggleClass("disabled", !b)
                        },
                        aC: function(a, b) {
                            a.toggleClass("disabled", !b)
                        },
                        NB: function(a) {
                            $("#langBtn").toggle(a)
                        },
                        eB: function(a) {
                            $("#langBtn").click(function() {
                                a(null)
                            })
                        },
                        $B: function() {
                            k.hu($("#langBtn"), d.W(b.xq) + ":");
                            $("#flag").offset()
                        },
                        WA: function(a) {
                            $("#cutBtn").click(a)
                        },
                        YB: function(e) {
                            var g = 400 * c.Gb,
                                k = 0.8 * c.bb,
                                m = f.Tb;
                            a.nc({
                                text: d.W(b.Gp),
                                width: g,
                                Ah: "dragText",
                                scale: k,
                                Dc: m
                            });
                            a.nc({
                                text: d.W(b.vp),
                                width: g,
                                Ah: "cutText",
                                scale: k,
                                Dc: m
                            });
                            $("#cutBtn").toggleClass("disabled", !e)
                        },
                        oB: function(a, b) {
                            k.hu(a, b)
                        },
                        hu: function(b, c) {
                            a.ja({
                                text: c,
                                img: b.find("img")[0],
                                ua: !0
                            })
                        },
                        ky: function(a, b) {
                            return d.qy(g).replace("%d", a).replace("%d", b)
                        },
                        ft: function() {
                            var a = Modernizr.canvas &&
                                Modernizr.audio && Modernizr.video && Modernizr.rgba && Modernizr.opacity && Modernizr.fontface && Modernizr.csstransforms && Modernizr.hq;
                            a || (Modernizr.load({
                                load: "css!css/nosupport.css?321"
                            }), $(function() {
                                $("#yt-video").remove()
                            }), _gaq.push(["_trackEvent", "Upgrade", "View"]));
                            return a
                        }
                    };
                return k
            }(da, H, ga, F, S, R),
            Ta = {
                wz: !0
            },
            eb = function(a, c) {
                function d(a, d) {
                    var f = b.getSoundById("s" + a);
                    if (f) try {
                        d.call(this, f)
                    } catch (e) {
                        c.debug("Sound exception:" + e)
                    } else c.debug("No sound loaded:" + a)
                }
                var b = window.soundManager,
                    f = !1,
                    e = [];
                b.audioFormats.mp3.required = !1;
                b.setup({
                    useHTML5Audio: !0,
                    preferFlash: !1,
                    url: "/sm2/",
                    flashVersion: 9,
                    useHighPerformance: !0,
                    debugMode: !1,
                    flashLoadTimeout: 500,
                    ontimeout: function() {
                        b.useHTML5Audio = !0;
                        b.preferFlash = !1;
                        b.reboot()
                    },
                    onready: function() {
                        f = !0;
                        for (var a = 0, b = e.length; a < b; a++) e[a]()
                    }
                });
                return {
                    Rh: function(a) {
                        f ? a() : e.push(a)
                    },
                    play: function(a, b) {
                        d(a, function(a) {
                            var c = null;
                            b && (c = {}, c.onfinish = b);
                            a.play(c)
                        })
                    },
                    Fj: function(a) {
                        var b = !1;
                        d(a, function(a) {
                            b = 1 === a.playState && !a.paused
                        });
                        return b
                    },
                    Oy: function(a) {
                        var b = !0;
                        d(a, function(a) {
                            b = a.paused
                        });
                        return b
                    },
                    pause: function(a) {
                        d(a, function(a) {
                            a.pause()
                        })
                    },
                    stop: function(a) {
                        d(a, function(a) {
                            a.stop()
                        })
                    },
                    uB: function(a, b) {
                        d(a, function(a) {
                            a.volume = b
                        })
                    }
                }
            }(T, ja),
            vb = function(a, c, d, b) {
                function f() {
                    if (g && k) {
                        var b = new PxLoader({
                                pt: 3E4
                            }),
                            f = a.ex,
                            r = a.fy(),
                            m, p, u, q;
//                        m = 0;
//                        for (p = c.gt.length; m < p; m++) u = c.gt[m], q = f + d[u].path + r, b.addSound("s" + u, q, "MENU");
//                        m = 0;
//                        for (p = c.Hs.length; m < p; m++) u = c.Hs[m], q = f + d[u].path + r, b.addSound("s" + u, q);
                        b.addCompletionListener(function() {
                            for (var a =
                                0, b = e.length; a < b; a++) e[a]()
                        });
                        b.start()
                    }
                }
                var e = [],
                    g = !1,
                    k = !1;
                b.Rh(function() {
                    k = !0;
                    f()
                });
                return {
                    start: function() {
                        g = !0;
                        f()
                    },
                    Mz: function(a) {
                        e.push(a)
                    }
                }
            }(T, R, Ka, eb),
            sa = function() {
                return new function() {
                    this.jo = function(a, c, d) {
                        return c * a / d + 0
                    };
                    this.Qx = function() {
                        return 0.05 * Math.sin(t / 100 * (Math.PI / 2)) + 0
                    };
                    this.ys = function(a, c, d, b) {
                        return d * ((a = a / b - 1) * a * a + 1) + c
                    };
                    this.nh = function(a, c, d, b) {
                        return 1 > (a /= b / 2) ? d / 2 * a * a * a + c : d / 2 * ((a -= 2) * a * a + 2) + c
                    };
                    this.Xe = function(a, c, d, b) {
                        return a == b ? c + d : d * (-Math.pow(2, -10 * a / b) + 1) +
                            c
                    };
                    this.lj = function(a, c, d) {
                        return 0 == a ? 0 : a == d ? 0 + c : 1 > (a /= d / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + 0 : c / 2 * (-Math.pow(2, -10 * --a) + 2) + 0
                    };
                    this.mn = function(a, c, d, b) {
                        var f = 1.5;
                        void 0 == f && (f = 1.70158);
                        return d * ((a = a / b - 1) * a * ((f + 1) * a + f) + 1) + c
                    };
                    this.kj = function(a, c, d, b) {
                        void 0 == b && (b = 1.70158);
                        return 1 > (a /= d / 2) ? c / 2 * a * a * (((b *= 1.525) + 1) * a - b) + 0 : c / 2 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2) + 0
                    };
                    this.xs = function(a, c, d, b) {
                        return 1 > (a /= b / 2) ? d / 2 * a * a + c : -d / 2 * (--a * (a - 2) - 1) + c
                    }
                }
            }(),
            wb = function(a, c, d, b, f, e, g, k, l) {
                function n() {
                    function e(b, c, d) {
                        if (b)
                            for (c =
                                c || a.Rc, d = d || "MENU", h = 0, C = b.length; h < C; h++) b[h] && (D = c + b[h], p.addImage(D, d))
                    }

                    function n(a, b) {
                        var h, c, d;
                        h = 0;
                        for (c = a.length; h < c; h++) {
                            d = a[h];
                            var e = new PxLoaderImage(u + f[d].path, b);
                            e.Ut = d;
                            p.add(e)
                        }
                    }
                    var p = new PxLoader({
                            pt: 3E4
                        }),
                        u = a.Nn + b.pb + "/game/",
                        h, C, D, J = ["PASSWORD", "EDITION", "FONT", "MENU"].concat(["GAME"]);
                    n(l.Bw, "FONT");
                    n(c.dy, "GAME");
                    n(c.Ys, "GAME");
                    n(c.Zs, "GAME");
                    p.addProgressListener(function(a) {
                        k.Oz(a.resource.Ut, a.resource.img)
                    }, ["FONT", "GAME"]);
                    e(d.NE, a.Nn + (d.ME || ""), "PASSWORD");
                    e(d.PE, a.hk + (d.OE ||
                        ""), "PASSWORD");
                    e(d.KE, a.Nn + "page/");
                    e(d.LE, a.hk + "page/");
                    e(c.oz);
                    e(c.cs, a.bs);
                    e(c.as);
                    e(c.Um);
                    e(c.Ox);
                    e(c.fE, a.hk + (c.eE || ""), "EDITION");
                    p.addProgressListener(function(a) {
                        var b = 100 * (a.completedCount / a.totalCount);
                        g && g.xz(b);
                        a.completedCount === a.totalCount && (m = !0, r())
                    }, J);
                    p.start(J)
                }

                function r() {
                    m && p && (g && (g.yz(), g.hide()), u && setTimeout(u, 0), r = ha())
                }
                var m = !1,
                    p = !1,
                    u = null;
                return {
                    init: function() {
                        function a() {
                            n();
                            e.Mz(function() {
                                p = !0;
                                r()
                            });
                            e.start()
                        }
                        k.init();
                        g ? g.init(a) : a()
                    },
                    eb: function() {
                        g && (g.eb(), g.show())
                    },
                    Jo: function(a) {
                        u = a;
                        r()
                    }
                }
            }(T, R, Ta, H, Ka, vb, function(a, c, d, b) {
                return new function() {
                    function f() {
                        function b() {
                            var e = Date.now() - f;
                            if (null == l) k = n, l = 0;
                            else if (n > m) {
                                var g = 100 / (100 - k) * (n - m);
                                0 > g && (g = 0);
                                l += g
                            }
                            l < m && (l += 0.3);
                            m = n;
                            99 < l && (l = 99);
                            h.save();
                            h.setTransform(1, 0, 0, 1, 0, 0);
                            h.clearRect(0, 0, u.width, u.height);
                            h.restore();
                            for (g = 0; g < p.length; g++) {
                                var q = p[g];
                                q.ig ? (q.y.offset = 250, q.x.offset = d / 2 - (q.img.width + q.x.wd) / 2) : e < q.delay ? (q.y.offset = -1E4, q.y.$c = e) : (e - q.y.$c >= q.y.duration && (q.y.$c = e, q.ve = 0.5 + 0.5 * Math.random(),
                                    q.x.offset = Math.random() * (d - q.x.wd * (1 / q.ve))), q.y.offset = c + 2 * q.img.height - a.jo(e - q.y.$c, 1, q.y.duration) * (c + 2 * q.img.height) - q.img.height);
                                e - q.x.$c >= q.x.duration && (q.x.$c = e, q.x.Wf && (q.x.$f = !q.x.$f));
                                q.x.val = a.xs(e - q.x.$c, q.x.ke, q.x.wd - q.x.ke, q.x.duration);
                                q.x.abs = q.x.offset + (q.x.$f ? q.x.wd - q.x.val : q.x.val);
                                q.x.abs > d - q.img.width * q.ve && (q.x.abs = d - q.img.width * q.ve);
                                q.ig ? (e - q.y.$c >= q.y.duration && (q.y.$c = e, q.y.Wf && (q.y.$f = !q.y.$f)), q.y.val = a.xs(e - q.y.$c, q.y.ke, q.y.wd - q.y.ke, q.y.duration)) : q.y.val = 0;
                                q.y.abs =
                                    q.y.offset + (q.y.$f ? q.y.wd - q.y.val : q.y.val);
                                if (q.ig) {
                                    var C = Math.floor(Math.round(l) / 10) % 10,
                                        A = Math.round(l) % 10;
                                    h.drawImage(s, 100 * C, 0, 100, 100, q.x.abs + 65, q.y.abs + 75, 100, 100);
                                    h.drawImage(s, 100 * A, 0, 100, 100, q.x.abs + 105, q.y.abs + 75, 100, 100);
                                    h.drawImage(s, 1E3, 0, 100, 100, q.x.abs + 145, q.y.abs + 75, 100, 100)
                                }
                                h.save();
                                q.ig ? h.drawImage(q.img, q.x.abs, q.y.abs) : (h.scale(q.ve, q.ve), h.drawImage(q.img, q.x.abs * (1 / q.ve), q.y.abs * (1 / q.ve)));
                                h.restore()
                            }
                            r && window.requestAnimationFrame(b)
                        }
                        r = !0;
                        g();
                        var h = u.getContext("2d"),
                            c = u.height,
                            d = u.width,
                            f = Date.now(),
                            l = null,
                            k = null,
                            m = -1,
                            p = [new e(!0), new e(!1, 0, 3E3, 5E3, 300), new e(!1, 300, 5E3, 6E3, 400), new e(!1, 2E3, 2E3, 4E3, 200), new e(!1, 3200, 3E3, 5E3, 300)];
                        window.requestAnimationFrame(b)
                    }

                    function e(a, b, h, c, d) {
                        function f() {
                            this.duration = this.wd = this.ke = this.$c = this.val = this.abs = 0;
                            this.$f = this.Wf = !1;
                            this.offset = 0
                        }
                        this.y = new f;
                        this.x = new f;
                        this.ig = a;
                        this.delay = b;
                        this.img = this.ig ? q : A;
                        this.ve = 0.5 + 0.5 * Math.random();
                        this.ig ? (this.x.ke = 0, this.x.wd = 150, this.x.duration = 2800, this.x.Wf = !0, this.y.ke = 0, this.y.wd =
                            60, this.y.duration = 1300, this.y.Wf = !0) : (this.x.ke = 0, this.x.wd = d, this.x.duration = h, this.x.Wf = !0, this.y.ke = 0, this.y.wd = 1, this.y.duration = c, this.y.Wf = !1)
                    }

                    function g() {
                        !l && p && u && (u.width = p.offsetWidth, u.height = p.offsetHeight)
                    }

                    function k() {
                        z && h && C && ($(window).on("resize", g), m = setTimeout(function() {
                            l || ($("#loaderWindow").fadeIn(), $("#loaderLogo").fadeIn(200), f());
                            m = null
                        }, 1E3))
                    }
                    var l = !1,
                        n = 0,
                        r = !1,
                        m = null,
                        p, u, q, A, s, z = !1,
                        h = !1,
                        C = !1;
                    this.init = function(a) {
                        var h = new PxLoader({
                            pt: 3E4
                        });
                        d.wz || h.addImage("images/page/tilebg.jpg");
                        var f, e, g;
                        if (f = c.mz)
                            for (e = 0, g = f.length; e < g; e++) h.addImage("images/page/" + f[e]);
                        if (f = d.FE)
                            for (e = 0, g = f.length; e < g; e++) h.addImage(b.hk + f[e]);
                        q = h.addImage("images/page/loader-bubble.png");
                        A = h.addImage("images/page/loader-smallbubble.png");
                        s = h.addImage("images/page/loader-numbers.png");
                        h.addCompletionListener(function() {
                            z = !0;
                            k();
                            a && a()
                        });
                        h.start()
                    };
                    this.eb = function() {
                        p = document.getElementById("loaderCanvasHost");
                        u = document.getElementById("loaderCanvas");
                        h = !0;
                        k()
                    };
                    this.yz = function() {
                        r = !1;
                        l = !0;
                        n = 100
                    };
                    this.xz =
                        function(a) {
                            n = a
                    };
                    this.show = function() {
                        C = !0;
                        k()
                    };
                    this.hide = function() {
                        function a() {
                            $("#loaderWindow").hide()
                        }
                        m && (clearTimeout(m), m = null);
                        if (r) {
                            r = !1;
                            if (h) {
                                var b = u.getContext("2d");
                                b.save();
                                b.setTransform(1, 0, 0, 1, 0, 0);
                                b.clearRect(0, 0, u.width, u.height);
                                b.restore()
                            }
                            $("#loaderWindow").fadeOut(500, a)
                        } else a();
                        $(window).off("resize", g)
                    }
                }
            }(sa, R, Ta, T), La, va),
            xb = function(a, c) {
                function d(a) {
                    g && (a += "-" + g);
                    return a
                }

                function b(a) {
                    if (!k) return null;
                    var b = [];
                    a = (k.get(d(a)) || "").split(",");
                    var c = a.length,
                        f, e;
                    for (f =
                        0; f < c; f++) f < a.length ? (e = parseInt(a[f], 16), isNaN(e) && (e = null)) : e = null, b.push(e);
                    return b
                }

                function f(a, c) {
                    if (!k) return null;
                    var d = b(a);
                    return d.length > c ? d[c] : null
                }

                function e(a, c, f) {
                    if (k) {
                        var e = b(a);
                        if (e[c] !== f && (e[c] = f, k))
                            if (a = d(a), e) {
                                c = [];
                                f = e.length;
                                var g, u;
                                for (g = 0; g < f; g++) u = e[g], null == u ? c.push("") : c.push(u.toString(16));
                                k.set(a, c.join(","))
                            } else k.remove(a)
                    }
                }
                var g = "";
                c.subscribe(c.r.Nr, function(a) {
                    g = a
                });
                var k = null;
                c.subscribe(c.r.pw, function(a) {
                    k = a ? {
                        set: a.set,
                        get: a.get,
                        remove: a.remove
                    } : null;
                    c.ra(c.r.Sl)
                });
                return {
                    wj: function(a, b) {
                        return f("scores-" + a, b)
                    },
                    No: function(a, b, c) {
                        e("scores-" + a, b, c)
                    },
                    $e: function(a, b) {
                        return f("stars-" + a, b)
                    },
                    we: function(a, b, c) {
                        e("stars-" + a, b, c)
                    },
                    lE: function(a) {
                        return f("achievements", a)
                    },
                    $E: function(a, b) {
                        e("achievements", a, b)
                    }
                }
            }(R, V),
            ta = function(a, c, d, b, f, e, g, k, l, n) {
                function r(a, b, h, c) {
                    this.Lc = a;
                    this.ei = b;
                    this.sf = h || [];
                    this.Eb = c || []
                }

                function m(a, h) {
                    var c = n.$e(a, h),
                        d = b.th(z + (1E3 * h + a ^ C), null),
                        d = null == d ? null : (d ^ C) - h - 1E3 * a;
                    return -1 === d || null === d ? c : null == c ? d : Math.max(c, d)
                }

                function p(a,
                    h, c) {
                    b.set(z + (1E3 * h + a ^ C), (null == c ? -1 : c) + 1E3 * a + h ^ C);
                    n.we(a, h, c)
                }

                function u(a, h) {
                    var c = n.wj(a, h) || 0,
                        d = b.th(A(a, h), null);
                    return Math.max(c, null == d ? 0 : (d ^ C) - a - 1E3 * h)
                }

                function q(a, h, c) {
                    b.set(A(a, h), c + 1E3 * h + a ^ C);
                    n.No(a, h, c)
                }

                function A(a, b) {
                    var c = s + (1E3 * a + b ^ C);
                    return c === h ? c + "_" : c
                }
                var s = String.fromCharCode(98, 112),
                    z = String.fromCharCode(98, 115),
                    h = s + String.fromCharCode(50, 51, 57, 48),
                    C = null;
                b.Rh(function() {
                    C = b.th(h, null);
                    null == C && (C = d.gb(1E3, 1E4), b.set(h, C))
                });
                var D = new function() {
                    var b = [];
                    this.load = function() {
                        b = [];
                        var c, d;
                        c = 0;
                        for (len = f.Tf.length; c < len; c++) {
                            d = b;
                            for (var e = c, g = c, l = null !== m(g, 0), k = f.Tf[g].mg.length, n = f.VB[g], C = [], A = [], s = void 0, s = 0; s < k; s++) {
                                if (!l) {
                                    var z = g,
                                        w = s;
                                    p(z, w, 0 === w ? 0 : null);
                                    q(z, w, 0)
                                }
                                C.push(u(g, s));
                                A.push(m(g, s))
                            }
                            d[e] = new r(k, n, C, A);
                            if (a.WD === c + 1)
                                for (d = f.Tf[c].mg.length, len = d - 1, d = 0; d < len; d++) D.we(c, d, 3, !0)
                        }
                        h && D.pi()
                    };
                    c.subscribe(c.r.Bm, this.load);
                    c.subscribe(c.r.Cm, this.load);
                    c.subscribe(c.r.Sl, this.load);
                    var h = !1;
                    c.subscribe(c.r.ip, function() {
                        h = !0
                    });
                    this.ry = function() {
                        return C
                    };
                    this.Lc =
                        function(a) {
                            a = b[a];
                            return null != a ? a.Lc : null
                    };
                    this.ei = function(a) {
                        a = b[a];
                        return null != a ? a.ei : 0
                    };
                    this.Mm = function(a) {
                        a = b[a];
                        if (null != a) {
                            for (var h = 0, c = 0; c < a.Lc; c++) var d = a.Eb[c],
                                h = h + (null == d ? 0 : d);
                            return h
                        }
                        return 0
                    };
                    this.zf = function() {
                        for (var a = 0, h = 0; h < b.length; h++) a += D.Mm(h);
                        return a
                    };
                    this.Et = function(a) {
                        a = b[a];
                        return null != a ? 3 * a.Lc : 0
                    };
                    this.gg = function(h) {
                        return 0 == h || a.Dg || null != b[h] && D.zf() >= D.ei(h) ? !1 : !0
                    };
                    this.Ny = function(h, c) {
                        var d = b[h];
                        return a.Dg ? !0 : null != d ? null != d.Eb[c] : !1
                    };
                    this.No = function(a,
                        h, d, f) {
                        var e = b[a];
                        if (null != e) {
                            f ? e.sf[h] = d : (f = u(a, h), e.sf[h] = Math.max(d, f));
                            q(a, h, e.sf[h]);
                            h = e.sf.length;
                            for (f = d = 0; f < h; f++) d += e.sf[f];
                            c.ra(c.r.Lw, a, d)
                        }
                    };
                    this.wj = function(a, h) {
                        var c = b[a];
                        return null != c ? c.sf[h] : null
                    };
                    this.we = function(a, h, d, f) {
                        var e = this.zf(),
                            g = b[a];
                        if (null != g) {
                            var l = m(a, h);
                            g.Eb[h] = null == l || f ? d : Math.max(d, l);
                            p(a, h, g.Eb[h])
                        }
                        a = this.zf();
                        a !== e && c.ra(c.r.Gw, a)
                    };
                    this.$e = function(a, h) {
                        var c = b[a];
                        return null != c ? c.Eb[h] : null
                    };
                    this.CA = function() {
                        var a = b.length,
                            h, c, d, f;
                        for (h = 0; h < a; h++)
                            for (c = b[h],
                                f = c.Lc, d = 0; d < f; d++) {
                                var e = h,
                                    g = d;
                                p(e, g, 0 === g ? 0 : null);
                                q(e, g, 0);
                                c.Eb[d] = m(h, d);
                                c.sf[d] = u(h, d)
                            }
                        this.pi()
                    };
                    this.pi = function() {
                        var a = g.W(l.Jw).replace("%d", D.zf());
                        e.ja({
                            text: a,
                            Kc: "#boxScore img",
                            ua: !0
                        })
                    };
                    c.subscribe(c.r.Ib, this.pi)
                };
                return D
            }(ra, V, Z, za, R, da, ga, la, F, xb),
            Ea = function(a, c, d, b, f, e, g, k, l, n, r) {
                var m;
                $(function() {
                    m = $("#boxUpgradePlate").hide()
                });
                g.subscribe(g.r.Yg, function(a) {
                    a && m && m.fadeOut(200)
                });
                g.subscribe(g.r.Ib, function() {
                    d.ja({
                        text: k.W(r.wi),
                        Ab: "boxUpgradePlate",
                        scale: 0.6 * b.bb
                    })
                });
                var p =
                    f.bs || f.Rc;
                return a.extend({
                    init: function(a, c, e, n, m) {
                        this.index = a;
                        this.df = n;
                        this.qf = this.visible = !0;
                        this.dj = 0;
                        this.opacity = 1;
                        this.type = m;
                        c && (this.bh = new Image, this.bh.src = p + c);
                        var h = this.Gu = new Image,
                            r = this.kx = b.d(350),
                            D = this.ds = b.d(20),
                            J = this;
                        this.Hu = !1;
                        this.St = function() {
                            d.ja({
                                text: k.Vm(a, J.Pn),
                                img: h,
                                width: (r - 2 * D) / b.bb,
                                Dc: l.Tb,
                                ua: !0
                            });
                            J.Hu = !0
                        };
                        g.subscribe(g.r.Ib, this.St);
                        this.qd = d.ja({
                            text: e,
                            ua: !0
                        });
                        this.qt = new Image;
                        this.qt.src = f.Rc + "box_omnom.png";
                        this.ct = new Image;
                        this.ct.src = f.Rc + "box_lock.png";
                        this.uf = new Image;
                        this.uf.src = f.Rc + "star_result_small.png";
                        this.At = new Image;
                        this.At.src = f.Rc + "perfect_mark.png";
                        this.Pn = !0
                    },
                    Gh: Ga(!0),
                    Rn: Ga(!0),
                    Eh: Ga(!0),
                    v: function(a, b) {
                        var c = a.globalAlpha;
                        this.opacity !== c && (a.globalAlpha = this.opacity);
                        this.Rt(a, b);
                        this.opacity !== c && (a.globalAlpha = c)
                    },
                    Rt: function(a, c) {
                        var d = this.Rn();
                        d && (a.fillStyle = "rgb(45,45,53)", a.fillRect(b.d(130), b.d(200), b.d(140), b.d(100)), null != c && a.drawImage(this.qt, c + b.d(4), b.d(215)));
                        this.bh && a.drawImage(this.bh, b.d(25), b.d(0));
                        if (d) {
                            if (this.df) {
                                var d =
                                    $(this.qd).width() || this.qd.width,
                                    f = $(this.qd).height() || this.qd.height,
                                    e = this.uf.width || $(this.uf).width(),
                                    h = b.d(-6),
                                    e = d + h + e,
                                    e = (b.d(125) - e) / 2,
                                    e = b.d(140) + e;
                                a.scale(1.015, 1);
                                a.drawImage(this.ct, b.d(23), b.d(155));
                                a.scale(1 / 1.015, 1);
                                this.qf && (a.drawImage(this.qd, e, b.d(220), d, f), a.drawImage(this.uf, e + d + h, b.d(225)))
                            }
                            n.Mm(this.index) === n.Et(this.index) && a.drawImage(this.At, b.d(260), b.d(250))
                        }
                        this.Hu || this.St();
                        f = $(this.Gu);
                        d = f.width();
                        f = f.height();
                        h = Math.floor(b.d(25) + this.ds + (this.kx - 2 * this.ds - d) / 2);
                        e =
                            b.d(70);
                        a.drawImage(this.Gu, h, e, d, f)
                    },
                    $r: function(a) {
                        if (a) {
                            this.dj = Date.now();
                            var d = b.d(1024),
                                f = b.d(576),
                                e = this,
                                g = function() {
                                    t = Date.now() - e.dj;
                                    var h, l;
                                    100 > t ? (h = c.Qx(), l = 1 - h, h = 1 + h) : 300 > t ? (h = c.nh(t - 100, 0, 0.11, 200), l = 0.95 + h, h = 1.05 - h) : 600 > t && (h = c.ys(t - 300, 0, 0.05, 300), l = 1.06 - h, h = 0.94 + h);
                                    l = (d - d * l) / 2;
                                    h = (f - f * h) / 2;
                                    var k = (d - 2 * l) / d,
                                        n = (f - 2 * h) / f;
                                    isNaN(k) || isNaN(n) || (a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(b.d(312), b.d(100), b.d(400), b.d(460)), a.restore(), a.save(), a.scale(k, n), a.translate(l, h), a.translate(b.d(312),
                                        b.d(130)), e.v(a, b.d(140)), a.restore());
                                    600 < t ? e.dj = 0 : window.requestAnimationFrame(g)
                                };
                            g()
                        }
                    },
                    hs: function() {
                        this.dj = 0
                    },
                    Sh: function() {
                        this.qf || m.toggleClass("purchaseBox", this.Py || !1).fadeIn()
                    },
                    Uh: function() {
                        m && m.fadeOut(200)
                    }
                })
            }(ba, sa, da, H, T, pa, V, ga, S, ta, F, R),
            Na = {},
            yb = function(a, c, d, b, f, e, g, k, l, n, r) {
                return a.extend({
                    init: function(a, c, e, k, n) {
                        this.h(a, c, e, k, n);
                        this.of = -1;
                        this.pf = null;
                        var r = this;
                        $(document).ready(function() {
                            $("#showMeBtn").click(function() {
                                l.Qz && l.Qz();
                                r.xB()
                            });
                            var a = $("#installieBtn"),
                                h = getIE9DownloadUrl();
                            h ? (a.on("click", function() {
                                l.Hz && l.Hz();
                                window.location.href = h
                            }), f.subscribe(f.r.Ib, function() {
                                g.ja({
                                    text: d.W(b.Pp),
                                    img: a.find("img")[0],
                                    ua: !0
                                })
                            })) : a.hide()
                        })
                    },
                    Gh: function() {
                        return 0 !== this.of
                    },
                    Gy: function() {
                        var a = function() {
                                var a = -1,
                                    b = ("Microsoft Internet Explorer" == navigator.appName || "MSAppHost/1.0" == navigator.appName ? /MSIE ([0-9]?[0-9]{1,}[.0-9]{0,})/ : /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/).exec(navigator.userAgent);
                                null != b && 1 < b.length && (a = parseInt(b[1], 10));
                                return a
                            }(),
                            e =
                            function() {
                                try {
                                    var a = navigator.userAgent,
                                        b = -1 != a.indexOf("Windows NT"),
                                        c = b ? parseInt(a[a.indexOf("Windows NT") + 11]) : -1;
                                    if (b && 6 <= c) return !0
                                } catch (d) {}
                                return !1
                            }();
                        if (9 <= a || c.ay) {
                            a = k.rv || "true" == r.get("msIsSiteModeActivated");
                            e = !0 === k.rv;
                            if (!e) try {
                                window.external.msIsSiteMode() && (e = !0)
                            } catch (n) {}
                            a || e || c.ay ? (this.opacity = this.of = 1, this.pf = null, a || (r.set("msIsSiteModeActivated", "true"), l.Rz && l.Rz())) : (this.of = 3, this.opacity = 0.35, this.pf = "pinPrompt", f.subscribe(f.r.Ib, function() {
                                g.ja({
                                    text: d.W(b.Tq),
                                    Kc: "#showMeBtn img",
                                    ua: !0
                                })
                            }))
                        } else e ? (this.of = 2, this.opacity = 0.35, this.pf = "iePrompt") : (this.of = 0, this.opacity = 0.35, this.pf = null);
                        return 0 == this.of || -1 == this.of ? !1 : !0
                    },
                    Sh: function() {
                        null != this.pf && ($("#pinningContent").stop(!0, !0).delay(100).fadeIn(800), $("#" + this.pf).show())
                    },
                    Uh: function() {
                        null != this.pf && $("#pinningContent").stop(!0, !0).fadeOut(300)
                    },
                    xB: function() {
                        var a = $("#pinCursor"),
                            b = $("#pinOmNom"),
                            c = $("#pinChairShadow"),
                            d = $("#showMeBtn"),
                            f = $("#pinTaskBar");
                        d.fadeOut().delay(5500).fadeIn(1E3);
                        c.delay(500).fadeOut().delay(6E3).fadeIn(300);
                        a.delay(500).fadeIn().delay(2250).animate({
                            left: n.d(200)
                        }, 500, "easeInOutCirc").fadeOut().animate({
                            top: n.d(65),
                            left: n.d(45),
                            scale: "1.0"
                        }, 0);
                        b.delay(500).fadeIn().delay(1E3).animate({
                            top: n.d(305),
                            left: n.d(165)
                        }, 1E3, "easeInOutBack").delay(1500).animate({
                            scale: "0.65"
                        }, 200).delay(1500).fadeOut(1E3).animate({
                            top: n.d(115),
                            left: n.d(-49),
                            scale: "1.0"
                        }, 50).fadeIn(500);
                        f.delay(500).fadeIn().delay(5E3).fadeOut(1E3)
                    }
                })
            }(Ea, ra, ga, F, V, R, da, T, Na, H, za),
            zb = function(a, c, d, b, f, e, g) {
                var k, l;
                $(function() {
                    k = $("#boxUpgradePrompt").hide();
                    l = $("#boxUpgradeButton").hide().click(function() {
                        c.ra(c.r.Rl)
                    })
                });
                c.subscribe(c.r.Ib, function() {
                    b.ja({
                        text: d.W(f.Jm),
                        Ab: "boxUpgradePrompt",
                        width: e.d(650),
                        Dc: g.S,
                        ua: !0
                    });
                    b.ja({
                        text: d.W(f.wi),
                        Ab: "boxUpgradeButton",
                        scale: 0.6 * e.bb
                    })
                });
                var n = !1;
                c.subscribe(c.r.Yg, function(a) {
                    n = a
                });
                return a.extend({
                    init: function(a, b, c, d, f) {
                        this.h(a, b, c, d, f);
                        this.Pn = this.qf = !1;
                        this.Py = !0;
                        this.visible = !n
                    },
                    Gh: Ga(!1),
                    Rn: Ga(!1),
                    Sh: function() {
                        k.fadeIn();
                        l.fadeIn()
                    },
                    Uh: function() {
                        k.fadeOut();
                        l.fadeOut(200)
                    }
                })
            }(Ea, V, ga, da, F, H,
                S),
            Ab = function(a) {
                return a.extend({
                    init: function(a, d, b, f, e) {
                        this.h(a, d, b, f, e);
                        this.Pn = !1
                    },
                    Gh: Ga(!1),
                    Rn: Ga(!1),
                    Eh: Ga(!1)
                })
            }(Ea),
            fb = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u, q) {
                function A(a) {
                    return h && Date.now() >= s[a] ? !1 : q.th(C + (z[a] ^ D), 0) !== (z[a] - 1E3 ^ D) && !m.Dg
                }
                var s = p.QD,
                    z = p.PD,
                    h = !1,
                    C = String.fromCharCode(98, 107),
                    D = n.ry(),
                    J = null;
                $(document).ready(function() {
                    J = $("#boxEnterCodeButton").hide()
                });
                var x = null,
                    E = null,
                    I = null,
                    wa = null,
                    X = "January February March April May June July August September October November December".split(" ");
                a = c.extend({
                    init: function(a, b, h, c, d) {
                        this.h(a, b, h, c, d);
                        this.dt = new Image;
                        this.dt.src = this.bh.src.replace(".png", "_locked.png");
                        this.Cj = A(a) && p.gE;
                        this.Gj = !0 !== m.Dg && Date.now() < s[a];
                        this.Ve = null
                    },
                    Eh: function() {
                        return !this.Gj && !this.Cj
                    },
                    Sh: function() {
                        !this.Gj && this.Cj && J.fadeIn()
                    },
                    Uh: function() {
                        J.hide()
                    },
                    Rt: function(a) {
                        a.drawImage(this.df || this.Gj || this.Cj ? this.dt : this.bh, b.d(25), b.d(0));
                        if (this.Gj) {
                            x || (x = new Image, d.ja({
                                text: "Available starting from",
                                img: x,
                                Dc: l.Tb,
                                width: b.d(250)
                            }));
                            x.complete && a.drawImage(x,
                                b.d(100), b.d(120), 0.8 * x.width * b.bb, 0.8 * x.height * b.bb);
                            if (!this.Ve) {
                                this.Ve = new Image;
                                var h = new Date(s[this.index]);
                                d.ja({
                                    text: X[h.getMonth()] + " " + h.getDate(),
                                    img: this.Ve,
                                    width: b.d(200),
                                    Dc: l.Tb
                                })
                            }
                            this.Ve.complete && a.drawImage(this.Ve, b.d(77), b.d(195), 1.2 * this.Ve.width * b.bb, 1.2 * this.Ve.height * b.bb)
                        } else if (this.Cj) wa || (wa = new Image, d.ja({
                            text: "Visit Burger King to get an\n unlock code!",
                            img: wa,
                            Dc: l.Tb,
                            width: b.d(280)
                        }), d.ja({
                            text: "Enter Code",
                            Ab: "boxEnterCodeButton",
                            ua: !0
                        })), wa.complete && a.drawImage(wa,
                            b.d(50), b.d(90));
                        else if (this.df) {
                            E || (E = new Image, d.ja({
                                text: "Collect",
                                img: E,
                                ua: !0
                            }));
                            E.complete && a.drawImage(E, b.d(143), b.d(108));
                            var h = 1.2 * ($(this.qd).width() || this.qd.width),
                                c = 1.2 * ($(this.qd).height() || this.qd.height),
                                f = this.uf.width || $(this.uf).width(),
                                e = b.d(-4),
                                e = h + e + f,
                                e = (b.d(125) - e) / 2,
                                e = b.d(140) + e;
                            a.drawImage(this.uf, e, b.d(160));
                            a.drawImage(this.qd, e + f, b.d(150), h, c);
                            I || (I = new Image, d.ja({
                                text: "to unlock",
                                img: I,
                                ua: !0
                            }));
                            I.complete && a.drawImage(I, b.d(130), b.d(204))
                        }
                    }
                });
                a.UB = function() {
                    var a = Date.now(),
                        b = s.length,
                        c, d, f;
                    h = !0;
                    for (c = 0; c < b; c++) d = s[c], a >= d && (d = C + (z[c] ^ D), f = z[c] - 1E3 ^ D, q.set(d, f))
                };
                a.Ts = A;
                return a
            }(ba, Ea, da, H, T, pa, V, ga, S, ta, F, ra, R, Z, za),
            xa = {
                qb: 0,
                Sc: 1,
                Bd: 2,
                Gf: 3,
                Ci: 4,
                zq: 5,
                Mg: 6,
                Xd: 7,
                xp: 8,
                Ke: 9,
                Ee: 10,
                Me: 11
            },
            Fa = function() {
                return function(a, c, d, b) {
                    this.id = a;
                    this.pg = c;
                    this.Sf = d;
                    this.zB = b
                }
            }(),
            Ua = function() {
                function a(a) {
                    this.nn = a.element;
                    this.vh = a.vh;
                    var d = this;
                    this.xu = function(b) {
                        b = b.originalEvent;
                        d.Bo(b);
                        return a.qo ? d.Fk(b, a.qo) : !1
                    };
                    this.nt = function(b) {
                        b = b.originalEvent;
                        d.Bo(b);
                        return a.no ? d.Fk(b,
                            a.no) : !1
                    };
                    this.zs = function(b) {
                        b = b.originalEvent;
                        d.Bo(b);
                        return a.ko ? d.Fk(b, a.ko) : !1
                    };
                    this.yt = function(b) {
                        b = b.originalEvent;
                        return a.oo ? d.Fk(b, a.oo) : !1
                    }
                }
                a.prototype.Fk = function(a, d) {
                    var b = 0,
                        f = 0;
                    a || (a = window.event);
                    if (a.changedTouches && 0 < a.changedTouches.length) b = a.changedTouches[0].pageX, f = a.changedTouches[0].pageY;
                    else if (a.targetTouches && 0 < a.targetTouches.length) b = a.targetTouches[0].pageX, f = a.targetTouches[0].pageY;
                    else if (a.pageX || a.pageY) b = a.pageX, f = a.pageY;
                    else if (a.clientX || a.clientY) b = a.clientX +
                        document.body.scrollLeft + document.documentElement.scrollLeft, f = a.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    var e = $(this.nn).offset(),
                        g = this.vh ? this.vh() : 1,
                        b = Math.round((b - e.left) / g),
                        f = Math.round((f - e.top) / g);
                    return d(b, f)
                };
                a.prototype.Bo = function(a) {
                    a.preventManipulation ? a.preventManipulation() : a.preventDefault()
                };
                a.prototype.Zc = function() {
                    $(this.nn).on(a.Uo, this.xu).on(a.mt, this.nt).on(a.pn, this.zs).on(a.xt, this.yt)
                };
                a.prototype.fd = function() {
                    $(this.nn).off(a.Uo, this.xu).off(a.mt,
                        this.nt).off(a.pn, this.zs).off(a.xt, this.yt)
                };
                a.Hk = window.navigator.pointerEnabled;
                a.Gk = window.navigator.msPointerEnabled;
                a.sF = "undefined" !== typeof Modernizr && Modernizr.touch;
                a.Uo = a.Hk ? "pointerdown" : a.Gk ? "MSPointerDown" : "touchstart mousedown";
                a.mt = a.Hk ? "pointermove" : a.Gk ? "MSPointerMove" : "touchmove mousemove";
                a.pn = a.Hk ? "pointerup" : a.Gk ? "MSPointerUp" : "touchend mouseup";
                a.xt = a.Hk ? "pointerout" : a.Gk ? "MSPointerOut" : "mouseout";
                return a
            }(),
            Va = function(a, c) {
                a.eb = function() {
                    var a = c.$d / c.pb;
                    1 !== a && (this.ZA(),
                        this.zoom = a, this.Wu());
                    c.Rk && (this.px = c.$d / c.Rk)
                };
                a.Ls = Ga(1);
                return a
            }(function() {
                return new function() {
                    this.fp = null;
                    this.zoom = 1;
                    this.transformOrigin = "top left";
                    this.ZA = function() {
                        this.fp = $("#c")
                    };
                    this.Wu = function(a) {
                        a = a || {};
                        var c = "scale(" + this.zoom + ")",
                            d = ["ms", "o", "webkit", "moz"],
                            b = this.transformOrigin,
                            f, e, g;
                        1 === this.zoom && (c = b = "");
                        f = 0;
                        for (e = d.length; f < e; f++) g = "-" + d[f] + "-transform", a[g] = c, a[g + "-origin"] = b;
                        this.fp.css(a)
                    };
                    this.gy = function() {
                        return this.px || this.zoom || 1
                    };
                    this.Ls = function() {
                        return this.zoom ||
                            1
                    };
                    this.tz = this.uz = 0;
                    this.resize = function(a) {
                        var c = $(window),
                            d = c.width(),
                            c = c.height(),
                            b = this.uz,
                            f = this.tz;
                        a || (this.zoom = Math.min(d / b, c / f));
                        a = Math.round((d - b * this.zoom) / 2);
                        d = Math.round((c - f * this.zoom) / 2);
                        this.Wu({
                            "margin-top": d,
                            "margin-left": a
                        })
                    }
                }
            }(), H),
            ma = function(a, c, d, b, f) {
                var e = {
                    cj: !1,
                    xe: !0,
                    mf: !0,
                    Nd: null,
                    N: function(a) {
                        this.xe && !f.Fj(a) && f.play(a)
                    },
                    fA: function(a) {
                        this.xe && f.Fj(a) && f.pause(a)
                    },
                    GA: function(a) {
                        this.xe && f.Oy(a) && f.play(a)
                    },
                    Ct: function(a) {
                        var b = this;
                        this.xe && !f.Fj(a) && f.play(a, function() {
                            !b.cj &&
                                b.xe && b.Ct(a)
                        })
                    },
                    Vo: function(a) {
                        f.stop(a)
                    },
                    Yh: function(a) {
                        this.Nd && this.Nd !== a && this.IB(a);
                        var b = this;
                        this.mf && !f.Fj(a) && (this.Nd = a, f.uB(a, 70), f.play(a, function() {
                            !b.cj && b.mf && b.Yh(a)
                        }))
                    },
                    dA: function() {
                        this.cj = !0;
                        this.Xh();
                        this.fA(b.Cd)
                    },
                    Xh: function() {
                        this.Nd && f.pause(this.Nd)
                    },
                    FA: function() {
                        this.cj = !1;
                        this.Ho();
                        this.GA(b.Cd)
                    },
                    Ho: function() {
                        this.Nd && this.Yh(this.Nd)
                    },
                    IB: function() {
                        this.Nd && f.stop(this.Nd)
                    },
                    rk: function(b) {
                        this.mf = b;
                        a.rk(b);
                        this.mf ? this.Ho() : this.Xh()
                    },
                    tk: function(b) {
                        this.xe = b;
                        a.tk(b)
                    }
                };
                c.Rh(function() {
                    e.xe = a.zn();
                    e.mf = a.yn()
                });
                return e
            }(qa, za, ja, w, eb),
            Wa = function(a, c, d) {
                var b = a.extend({
                    init: function(a) {
                        this.Ue = b.Z.Sg;
                        this.xd = [];
                        this.children = [];
                        this.wo = this.Cc = this.nb = c.e;
                        this.parent = a;
                        this.Lh = c.e;
                        this.rh = this.tn = this.Zg = this.frames = this.hn = 0;
                        this.Ec = 1 / 60;
                        this.Wj = [this.Ec, this.Ec, this.Ec, this.Ec, this.Ec]
                    },
                    Zc: function() {
                        this.Ue = b.Z.gp;
                        d.ra(d.r.yp, this)
                    },
                    fd: function() {
                        d.ra(d.r.zp, this)
                    },
                    ps: function() {
                        this.Ue = b.Z.Sg;
                        this.nb !== c.e && this.Gn();
                        d.ra(d.r.vC, this);
                        this.parent.rt(this.parent.Cc)
                    },
                    pause: function() {
                        this.Ue = b.Z.Tg;
                        d.ra(d.r.Ap, this);
                        this.nb != c.e && (this.wo = this.nb, this.Gn())
                    },
                    Tu: function() {
                        this.Ue = b.Z.gp;
                        this.Cc !== c.e && (this.Cc = c.e);
                        d.ra(d.r.Bp, this);
                        this.wo !== c.e && this.su(this.wo)
                    },
                    update: function() {
                        if (this.nb !== c.e)
                            for (var a = this.Nm(), b = Math.min(3, Math.floor(this.rh)), d = 0; d < b; d++) a.update(0.016), this.rh -= 1
                    },
                    DA: function() {
                        this.Lh = c.e
                    },
                    gs: function(a) {
                        this.hn = this.Lh !== c.e ? (a - this.Lh) / 1E3 : 0;
                        this.Lh = a;
                        this.rh += this.ls(this.hn) / 0.016
                    },
                    ls: function(a) {
                        return 0.016 > a ? 0.016 : 0.05 < a ? 0.05 :
                            a
                    },
                    mx: function() {
                        this.frames++;
                        this.Zg += this.hn;
                        if (1 < this.Zg) {
                            this.tn = this.frames / this.Zg;
                            this.Zg = this.frames = 0;
                            this.Wj.shift();
                            this.Wj.push(this.ls(1 / this.tn));
                            for (var a = this.Ec = 0, b = this.Wj.length; a < b; a++) this.Ec += this.Wj[a];
                            this.Ec /= b
                        }
                    },
                    Yw: function(a, b) {
                        this.xd[b] = a
                    },
                    Bx: function(a) {
                        this.xd[a] = null
                    },
                    Gn: function() {
                        var a = this.xd[this.nb];
                        a && (d.ra(d.r.Cp, a), a.hide(), this.nb = c.e)
                    },
                    su: function(a) {
                        this.nb != c.e && this.Gn();
                        this.nb = a;
                        a = this.xd[a];
                        d.ra(d.r.Dp, a);
                        a.show()
                    },
                    Nm: function() {
                        return this.xd[this.nb]
                    },
                    af: function(a) {
                        return this.xd[a]
                    },
                    ae: function(a, b) {
                        this.children[b] = a
                    },
                    Ax: function(a) {
                        this.children[a] = null;
                        this.Cc === a && (this.Cc = c.e)
                    },
                    os: function() {
                        if (this.Cc !== c.e) {
                            var a = this.children[this.Cc];
                            a && a.fd();
                            this.Cc = c.e
                        }
                    },
                    Rw: function(a) {
                        this.Cc !== c.e && this.os();
                        this.pause();
                        this.Cc = a;
                        this.children[a].Zc()
                    },
                    rt: function() {
                        this.Tu()
                    },
                    LD: function() {
                        return this.children[this.Cc]
                    },
                    fb: function(a) {
                        return this.children[a]
                    },
                    Oj: function(a, b) {
                        return this.nb === c.e ? !1 : this.xd[this.nb].Sj(a, b)
                    },
                    ng: function(a, b) {
                        return this.nb ===
                            c.e ? !1 : this.xd[this.nb].Tj(a, b)
                    },
                    it: function(a, b) {
                        return this.nb === c.e ? !1 : this.xd[this.nb].ro(a, b)
                    },
                    jt: Ga(!1),
                    lh: function(a, b) {
                        return this.nb === c.e ? !1 : this.xd[this.nb].st(a, b)
                    }
                });
                b.Z = {
                    Sg: 0,
                    gp: 1,
                    Tg: 2
                };
                return b
            }(ba, N, V),
            Bb = function(a, c, d, b, f, e, g, k, l) {
                return a.extend({
                    init: function(a) {
                        this.h(a);
                        this.Dk = !1;
                        this.la = null;
                        this.Pu = this.cv = b.e;
                        this.bk = null;
                        this.transitionDelay = 0.3;
                        this.Xf = this.gn = !1;
                        g.subscribe(g.r.yp, $.proxy(this.Az, this));
                        g.subscribe(g.r.zp, $.proxy(this.Cz, this));
                        g.subscribe(g.r.qv, $.proxy(this.Bz,
                            this));
                        g.subscribe(g.r.Ap, $.proxy(this.Dz, this));
                        g.subscribe(g.r.Bp, $.proxy(this.Ez, this));
                        g.subscribe(g.r.Cp, $.proxy(this.Fz, this));
                        g.subscribe(g.r.Dp, $.proxy(this.Gz, this))
                    },
                    Wz: function(a) {
                        if (!this.Dk && null !== this.la && (this.la.gs(a), this.Pu === b.e && this.la.update(), this.gn && (this.gn = !1, this.la.ps()), this.la.nb !== b.e)) {
                            (a = this.la.Nm()) && a.v();
                            this.la.mx();
                            if (f.Fs) {
                                var c = this.la.tn.toFixed(0);
                                0 < c && (a = k.context, a.font = "20px Arial", a.fillStyle = l.Ck.Zi, a.fillText(c + " fps", 10, e.ab - 10))
                            }
                            f.Qo && (a = k.context,
                                a.font = "20px Arial", a.fillStyle = l.Ck.Zi, a.fillText("1-16-2014", e.pb - a.measureText("1-16-2014").width - 10, e.ab - 10))
                        }
                    },
                    Sw: function() {
                        var a = e.kE || 1;
                        this.nd || (this.nd = new c({
                            element: k.element,
                            qo: $.proxy(this.Oj, this),
                            no: $.proxy(this.pz, this),
                            ko: $.proxy(this.ng, this),
                            oo: $.proxy(this.qz, this),
                            vh: function() {
                                return d.gy() * a
                            }
                        }));
                        this.nd.Zc()
                    },
                    yx: function() {
                        this.nd && this.nd.fd()
                    },
                    Zc: function() {
                        function a() {
                            b.Wz(Date.now());
                            b.Au || c(a)
                        }
                        this.h();
                        this.Sw();
                        var b = this,
                            c = window.requestAnimationFrame;
                        this.Au = !1;
                        a()
                    },
                    fd: function() {
                        this.h();
                        this.Au = !0;
                        this.yx()
                    },
                    du: function(a) {
                        this.la = a;
                        this.la.vE = 1 / 60
                    },
                    mE: Da("la"),
                    Az: function(a) {
                        this.du(a)
                    },
                    Bz: function() {
                        this.la = null
                    },
                    Dz: function() {
                        this.la = null
                    },
                    Ez: function(a) {
                        this.du(a)
                    },
                    Cz: function() {
                        this.gn = !0
                    },
                    Gz: function() {
                        if (this.cv !== b.e && null != this.bk) {
                            this.la.gs();
                            this.Pu = this.la.Lh + this.transitionDelay;
                            var a = this.la.Nm();
                            a && a.v()
                        }
                    },
                    Fz: function(a) {
                        this.bk = a;
                        this.cv !== b.e && null != this.bk && this.bk.v()
                    },
                    BE: Da("Dk"),
                    qF: function() {
                        this.Dk = !0
                    },
                    XE: function() {
                        this.la && this.la.DA();
                        this.Dk = !1
                    },
                    Oj: function(a, b) {
                        return this.la && this.la != this ? (this.Xf = !0, this.la.Oj(a, b)) : !1
                    },
                    pz: function(a, b) {
                        return this.la && this.la != this ? (this.Xf && this.la.it(a, b), this.la.jt(a, b)) : !1
                    },
                    ng: function(a, b) {
                        if (this.la && this.la != this) {
                            var c = this.la.ng(a, b);
                            this.Xf = !1;
                            return c
                        }
                        return !1
                    },
                    qz: function(a, b) {
                        if (this.la && this.la != this && this.Xf) {
                            var c = this.la.ng(a, b);
                            this.Xf = !1;
                            return c
                        }
                        return !1
                    },
                    lh: function(a, b) {
                        return this.la && this.la != this ? (this.la.ng(a, b), this.Xf = !1, this.la.lh(a, b)) : !1
                    }
                })
            }(Wa, Ua, Va, N, qa, H,
                V, P, ca),
            ya = function(a, c, d, b, f, e, g, k) {
                return a.extend({
                    init: function() {
                        this.h()
                    },
                    lc: function(a, b, c, d) {
                        var f = this.Be.length;
                        this.jb(f, a, b, c, d);
                        return f
                    },
                    Tw: function(a, b, c, d) {
                        this.Qe(this.Be.length, a, b, c, d)
                    },
                    Qe: function(a, b, c, d, f) {
                        this.bj(a, b, c, d, f[0], k.e, f)
                    },
                    jb: function(a, b, c, d, f, e) {
                        this.bj(a, b, c, f - d + 1, d, f, e)
                    },
                    bj: function(a, c, d, k, p, u, q) {
                        u = new b;
                        var A = [f.create(this, e.Ri, p, 0)];
                        u.w(g.Nh(A, 0));
                        for (var s = 1; s < k; s++) q ? p = q[s] : p++, A = [f.create(this, e.Ri, p, 0)], u.w(g.Nh(A, c)), s == k - 1 && d === b.Z.vb && u.w(g.Nh(A, c));
                        d && (u.Jj = d);
                        this.Kb(u, a)
                    },
                    XA: function(a, b, c) {
                        this.pc(c).Ks(d.zd).ka[b].Pc = a
                    },
                    sk: function(a, b) {
                        this.bu(e.Fq, this, 0, 0, a, b)
                    },
                    bu: function(a, b, c, e, g, k) {
                        g = this.pc(k).Ks(d.zd).ka[g];
                        a = f.create(b, a, c, e);
                        g.value.Pe.push(a)
                    },
                    Td: function(a, b, c) {
                        b = this.pc(b);
                        a = [f.create(this, e.Il, 0, a)];
                        c = g.Nh(a, c);
                        b.w(c)
                    },
                    Qy: function(a) {
                        this.yb.Vs(d.zd, a)
                    }
                })
            }(aa, Ra, Ia, fa, Ha, ua, oa, N),
            na = function(a, c, d) {
                a = a.extend({
                    init: function(a, c, e) {
                        this.cA = a;
                        this.o = e || 0;
                        this.path = [];
                        if (0 < a)
                            for (this.g = Array(a), e = 0; e < a; e++) this.g[e] = c || 0;
                        this.b =
                            new d(0, 0);
                        this.a = 0;
                        this.reverse = this.paused = !1;
                        this.kb = 0
                    },
                    gB: function(a) {
                        for (var c = 0, d = this.cA; c < d; c++) this.g[c] = a
                    },
                    iu: function(a, c) {
                        if ("R" === a[0]) {
                            var e = parseInt(a.substr(2), 10),
                                g = e / 2,
                                k = 2 * Math.PI / g,
                                l = 0;
                            "C" !== a[1] && (k = -k);
                            for (var n = 0; n < g; ++n) this.Of(new d(c.x + e * Math.cos(l), c.y + e * Math.sin(l))), l += k
                        } else
                            for (this.Of(c.copy()), "," === a[a.length - 1] && (a = a.substr(0, a.length - 1)), e = a.split(","), g = e.length, n = 0; n < g; n += 2) k = new d(c.x + parseFloat(e[n]), c.y + parseFloat(e[n + 1])), this.Of(k)
                    },
                    Of: function(a) {
                        this.path.push(a)
                    },
                    start: function() {
                        0 < this.path.length && (this.b.qa(this.path[0]), this.Oc = 1, this.Xm())
                    },
                    pause: function() {
                        this.paused = !0
                    },
                    Tu: function() {
                        this.paused = !1
                    },
                    gF: ka("o"),
                    CE: function(a) {
                        this.Oc = a;
                        this.b.qa(this.path[a]);
                        this.Xm()
                    },
                    Xm: function() {
                        this.offset = d.$a(this.path[this.Oc], this.b);
                        this.offset.normalize();
                        this.offset.multiply(this.g[this.Oc])
                    },
                    eF: function(a, c) {
                        this.g[c] = a
                    },
                    dF: ka("reverse"),
                    update: function(a) {
                        if (!this.paused) {
                            if (0 < this.path.length) {
                                var f = this.path[this.Oc],
                                    e = !1;
                                if (this.b.rj(f)) e = !0;
                                else {
                                    var g =
                                        a;
                                    0 !== this.kb && (g += this.kb, this.kb = 0);
                                    this.b.add(d.multiply(this.offset, g));
                                    c.nk(this.offset.x, f.x - this.b.x) && c.nk(this.offset.y, f.y - this.b.y) || (this.kb = d.$a(this.b, f).hd(), this.kb /= this.offset.hd(), this.b.qa(f), e = !0)
                                }
                                e && (this.reverse ? (this.Oc--, 0 > this.Oc && (this.Oc = this.path.length - 1)) : (this.Oc++, this.Oc >= this.path.length && (this.Oc = 0)), this.Xm())
                            }
                            0 !== this.o && (this.a += this.o * a)
                        }
                    }
                });
                a.kf = function(a, c, d, g) {
                    c !== a && (c > a ? (a += d * g, a > c && (a = c)) : (a -= d * g, a < c && (a = c)));
                    return a
                };
                a.md = function(a, c, d, g) {
                    var k = !1;
                    c !== a && (c > a ? (a += d * g, a > c && (a = c)) : (a -= d * g, a < c && (a = c)), c === a && (k = !0));
                    return {
                        value: a,
                        pd: k
                    }
                };
                a.Cq = 100;
                return a
            }(ba, Z, K),
            Aa = function(a, c, d, b, f, e, g, k) {
                a = a.extend({
                    init: function() {
                        this.h();
                        this.Ss = !1
                    },
                    ne: function(a) {
                        this.h(a);
                        this.aa = new d(0, 0, this.width, this.height);
                        this.Co = new b(this.aa.x, this.aa.y, this.aa.width, this.aa.height);
                        this.anchor = f.S;
                        this.Ku = this.lk = !1
                    },
                    aF: function() {
                        var a = this.L.p[0],
                            c = this.L.f[0];
                        this.aa = new d(Math.round(a.x), Math.round(a.y), c.width, c.height);
                        this.Co = new b(this.aa.x, this.aa.y,
                            this.aa.width, this.aa.height)
                    },
                    nf: function(a) {
                        this.rotation = a.a || 0;
                        var b = a.path;
                        if (b) {
                            var d = c.Cq;
                            "R" === b[0] && (d = Math.round(parseInt(b.substr(2), 10) / 2 + 1));
                            a = new c(d, a.g, a.o);
                            a.a = this.rotation;
                            a.iu(b, new e(this.x, this.y));
                            this.Lo(a);
                            a.start()
                        }
                    },
                    Lo: function(a) {
                        this.Pa = a;
                        this.Ha = 1E-4
                    },
                    update: function(a) {
                        this.h(a);
                        this.Ku || (this.dh(), this.Ku = !0);
                        this.Pa && (this.Pa.update(a), this.x = this.Pa.b.x, this.y = this.Pa.b.y, this.lk ? this.LA(this.Pa.a) : this.rotation = this.Pa.a)
                    },
                    LA: function(a) {
                        this.lk || (this.lk = !0);
                        this.rotation =
                            a;
                        var b = this.aa,
                            c = new e(b.x, b.y),
                            d = new e(b.x + b.M, b.y),
                            f = new e(d.x, b.y + b.U),
                            b = new e(b.x, f.y);
                        a = g.dc(a);
                        var k = this.width / 2 + this.Rd,
                            q = this.height / 2 + this.ug;
                        c.pa(a, k, q);
                        d.pa(a, k, q);
                        f.pa(a, k, q);
                        c.pa(a, k, q);
                        a = this.Co;
                        a.Iu = c.x;
                        a.Ju = c.y;
                        a.Nu = d.x;
                        a.Ou = d.y;
                        a.es = f.x;
                        a.fs = f.y;
                        a.Wr = b.x;
                        a.Xr = b.y
                    },
                    Yf: function() {
                        var a = k.context,
                            b = this.ea,
                            c = this.fa,
                            d = this.aa,
                            e = this.Co;
                        a.strokeStyle = "red";
                        a.lineWidth = 2;
                        this.lk ? (a.beginPath(), a.moveTo(b + e.Iu, c + e.Ju), a.lineTo(b + e.Nu, c + e.Ou), a.lineTo(b + e.es, c + e.fs), a.lineTo(b + e.Wr, c +
                            e.Xr), a.stroke(), a.closePath()) : a.strokeRect(b + d.x, c + d.y, d.M, d.U)
                    },
                    xo: function(a, b) {
                        var c = this.aa;
                        return d.Db(a, b, this.ea + c.x, this.fa + c.y, c.M, c.U)
                    },
                    vA: function(a, b, c, e) {
                        var f = this.ea + this.aa.x,
                            g = this.fa + this.aa.y;
                        return d.ai(a, b, c, e, f, g, f + this.aa.M, g + this.aa.U)
                    }
                });
                a.Ch = function(a, b) {
                    var c = a.ea + a.aa.x,
                        e = a.fa + a.aa.y,
                        f = b.ea + b.aa.x,
                        g = b.fa + b.aa.y;
                    return d.ai(c, e, c + a.aa.M, e + a.aa.U, f, g, f + b.aa.M, g + b.aa.U)
                };
                return a
            }(ya, na, U, Ra, S, K, ea, P, ca),
            Cb = function(a, c, d) {
                return c.extend({
                    init: function(a, c, d) {
                        this.h(a,
                            c, d)
                    },
                    kB: function(b, c, e) {
                        var g, k, l, n;
                        k = a.Oi;
                        if ("R" === b[0]) {
                            g = "C" === b[1];
                            b = parseInt(b.substr(2), 10);
                            n = Math.round(3 * b / 2);
                            var r = 2 * Math.PI / n,
                                m = 0;
                            b *= k;
                            g || (r = -r);
                            for (g = 0; g < n; g++) k = c + b * Math.cos(m), l = e + b * Math.sin(m), this.Of(new d(k, l)), m += r
                        } else
                            for (this.Of(new d(c, e)), "," === b[b.length - 1] && (b = b.substr(0, b.length - 1)), r = b.split(","), m = r.length, g = 0; g < m; g += 2) b = r[g], n = r[g + 1], this.Of(new d(c + b * k, e + n * k))
                    }
                })
            }(H, na, K),
            Ba = function(a, c, d, b) {
                return a.extend({
                    init: function() {
                        this.h()
                    },
                    nf: function(a) {
                        this.rotation = a.a ||
                            0;
                        var e = a.path,
                            g = d.Oi;
                        if (e) {
                            var k = b.Cq;
                            "R" === e[0] && (k = Math.round(3 * parseInt(e.substr(2), 10) / 2 + 1));
                            a = new c(k, a.g * g, a.o);
                            a.a = this.rotation;
                            a.kB(e, this.x, this.y);
                            this.Lo(a);
                            a.start()
                        }
                    }
                })
            }(Aa, Cb, H, na),
            Db = function(a, c, d, b, f, e, g, k) {
                return a.extend({
                    init: function(a, f, r, m) {
                        this.h();
                        this.vu = this.a = 0;
                        this.Fa = c.Qa();
                        this.Ka = c.Qa();
                        this.Aa = c.Qa();
                        this.Ba = c.Qa();
                        var p = e.e;
                        1 === r ? p = g.il : 2 === r && (p = g.jl);
                        this.sa(p);
                        this.rotation = m;
                        this.x = a;
                        this.y = f;
                        this.Sb();
                        a = this.lc(0.04, k.ha.Wa, 0, 4);
                        this.pc(a).w(d.nz(this, b.Ri))
                    },
                    Sb: function() {
                        this.Fa.x = this.x - this.width / 2;
                        this.Ka.x = this.x + this.width / 2;
                        this.Fa.y = this.Ka.y = this.y - 5;
                        this.Aa.x = this.Fa.x;
                        this.Ba.x = this.Ka.x;
                        this.Aa.y = this.Ba.y = this.y + 5;
                        this.a = f.dc(this.rotation);
                        this.Fa.pa(this.a, this.x, this.y);
                        this.Ka.pa(this.a, this.x, this.y);
                        this.Aa.pa(this.a, this.x, this.y);
                        this.Ba.pa(this.a, this.x, this.y)
                    },
                    update: function(a) {
                        this.h(a);
                        this.Pa && this.Sb()
                    }
                })
            }(Ba, K, oa, ua, ea, N, w, fa),
            Eb = function(a) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.ep = this.zo = !1
                    },
                    v: function() {
                        this.ep ?
                            (this.vc(), this.uc()) : this.h()
                    }
                })
            }(Aa),
            gb = function(a, c, d, b, f) {
                return a.extend({
                    init: function(a, c) {
                        this.h(a);
                        this.On = c;
                        this.Ta = new b(c);
                        this.width = f.pb;
                        this.height = f.ab
                    },
                    Bh: function(a) {
                        var b = this.On,
                            b = b.f[d.gb(0, b.f.length - 1)],
                            f = new c(0, 0, 0, 0);
                        this.Ta.Ua(this.Vb.length, b, f, 1);
                        this.h(a);
                        a.width = b.M * a.size;
                        a.height = b.U * a.size
                    },
                    $o: function(a, b) {
                        this.Ta.Ce[b] = new c(a.b.x - a.width / 2, a.b.y - a.height / 2, a.width, a.height);
                        this.Ta.Qf[b] = a.color.B;
                        this.ns[b] = a.color
                    },
                    Go: function(a) {
                        this.Ta.AA(a);
                        this.h(a)
                    },
                    v: function() {
                        this.vc();
                        this.Ta.v();
                        this.uc()
                    }
                })
            }(function(a, c, d, b, f, e, g) {
                function k(a, b, c) {
                    this.x = a;
                    this.y = b;
                    this.size = c
                }

                function l() {
                    this.ze = new a(0, 0);
                    this.b = new a(0, 0);
                    this.dir = new a(0, 0);
                    this.ji = this.Zh = 0;
                    this.color = new c(0, 0, 0, 0);
                    this.ee = new c(0, 0, 0, 0);
                    this.height = this.width = this.a = this.qs = this.rc = this.size = 0
                }
                return d.extend({
                    init: function(b) {
                        this.h();
                        this.width = e.pb;
                        this.height = e.ab;
                        this.Xo = b;
                        this.Vb = [];
                        this.active = !1;
                        this.oh = this.duration = 0;
                        this.Kd = new a(0, 0);
                        this.$j = new a(0, 0);
                        this.$s = this.rc = this.uu = this.size =
                            this.Kt = this.Zh = this.Eu = this.ji = this.wu = this.speed = this.Om = this.a = 0;
                        this.wc = new c(0, 0, 0, 0);
                        this.ye = new c(0, 0, 0, 0);
                        this.oc = new c(0, 0, 0, 0);
                        this.he = new c(0, 0, 0, 0);
                        this.Ye = this.nj = 0;
                        this.L = null;
                        this.Ce = [];
                        this.ns = [];
                        this.Pd = 0;
                        this.cb = null
                    },
                    Tr: function() {
                        if (this.Vb.length == this.Xo) return !1;
                        var a = new l;
                        this.Bh(a);
                        this.Vb.push(a);
                        return !0
                    },
                    Bh: function(d) {
                        d.b.x = this.x + this.$j.x * b.tb();
                        d.b.y = this.y + this.$j.y * b.tb();
                        d.ze.qa(d.b);
                        var e = g.dc(this.a + this.Om * b.tb()),
                            e = new a(Math.cos(e), Math.sin(e));
                        e.multiply(this.speed +
                            this.wu * b.tb());
                        d.dir = e;
                        d.Zh = this.Zh + this.Kt * b.tb();
                        d.ji = this.ji + this.Eu * b.tb();
                        d.rc = this.rc + this.$s * b.tb();
                        var e = new c(this.wc.F + this.ye.F * b.tb(), this.wc.K + this.ye.K * b.tb(), this.wc.J + this.ye.J * b.tb(), this.wc.B + this.ye.B * b.tb()),
                            f = new c(this.oc.F + this.he.F * b.tb(), this.oc.K + this.he.K * b.tb(), this.oc.J + this.he.J * b.tb(), this.oc.B + this.he.B * b.tb());
                        d.color = e;
                        d.ee.F = (f.F - e.F) / d.rc;
                        d.ee.K = (f.K - e.K) / d.rc;
                        d.ee.J = (f.J - e.J) / d.rc;
                        d.ee.B = (f.B - e.B) / d.rc;
                        d.size = this.size + this.uu * b.tb()
                    },
                    update: function(a) {
                        this.h(a);
                        if (this.cb && 0 === this.Vb.length && !this.active) this.cb(this);
                        else {
                            if (this.active && this.nj) {
                                var b = 1 / this.nj;
                                for (this.Ye += a; this.Vb.length < this.Xo && this.Ye > b;) this.Tr(), this.Ye -= b;
                                this.oh += a; - 1 !== this.duration && this.duration < this.oh && this.JB()
                            }
                            for (this.Pd = 0; this.Pd < this.Vb.length;) b = this.Vb[this.Pd], 0 < b.rc ? (this.Zu(b, a), b.color.F += b.ee.F * a, b.color.K += b.ee.K * a, b.color.J += b.ee.J * a, b.color.B += b.ee.B * a, b.rc -= a, this.$o(b, this.Pd, a), this.Pd++) : this.Go(this.Pd)
                        }
                    },
                    Zu: function(b, c) {
                        var d, e;
                        b.b.x || b.b.y ? (d = b.b.copy(),
                            d.normalize()) : d = new a(0, 0);
                        e = d.copy();
                        d.multiply(b.Zh);
                        var f = e.x;
                        e.x = -e.y;
                        e.y = f;
                        e.multiply(b.ji);
                        d = a.add(d, e);
                        d.add(this.Kd);
                        d.multiply(c);
                        b.dir.add(d);
                        d.qa(b.dir);
                        d.multiply(c);
                        b.b.add(d)
                    },
                    $o: function(a) {
                        this.Ce[this.Pd] = new k(a.b.x, a.b.y, a.size);
                        this.ns[this.Pd] = a.color
                    },
                    Go: function(a) {
                        this.Vb.splice(a, 1)
                    },
                    zu: function(a) {
                        this.Vb = [];
                        for (var b = 0; b < a; b++) this.Tr();
                        this.active = !0
                    },
                    JB: function() {
                        this.active = !1;
                        this.oh = this.duration;
                        this.Ye = 0
                    },
                    VE: function() {
                        this.Ye = this.oh = 0
                    },
                    v: function() {
                        this.vc();
                        if (0 !== this.color.B)
                            for (var a = f.context, b = this.L.qc, c = 0, d = this.Pd; c < d; c++) {
                                var e = this.Vb[c];
                                a.drawImage(b, Math.round(e.x), Math.round(e.y))
                            }
                        this.uc()
                    },
                    yE: function() {
                        return this.Vb.length === this.Xo
                    }
                })
            }(K, ca, ia, Z, P, H, ea), U, Z, Ja, H),
            Fb = function(a, c, d, b) {
                return a.extend({
                    init: function(a, b) {
                        this.h(a, b);
                        this.duration = 2;
                        this.Kd.x = 0;
                        this.Kd.y = 500;
                        this.a = -90;
                        this.Om = 50;
                        this.speed = 150;
                        this.wu = 70;
                        this.Zh = 0;
                        this.Kt = 1;
                        this.ji = 0;
                        this.Eu = 1;
                        this.$j.x = 0;
                        this.$j.y = 0;
                        this.rc = 2;
                        this.$s = 0;
                        this.size = 1;
                        this.uu = 0;
                        this.nj =
                            100;
                        this.wc.F = 1;
                        this.wc.K = 1;
                        this.wc.J = 1;
                        this.wc.B = 1;
                        this.ye.F = 0;
                        this.ye.K = 0;
                        this.ye.J = 0;
                        this.ye.B = 0;
                        this.oc.F = 1;
                        this.oc.K = 1;
                        this.oc.J = 1;
                        this.oc.B = 1;
                        this.he.F = 0;
                        this.he.K = 0;
                        this.he.J = 0;
                        this.o = this.he.B = 0;
                        this.JA = 600
                    },
                    Bh: function(a) {
                        this.h(a);
                        var c = this.On.f[d.gb(3, 7)],
                            g = new b(0, 0, 0, 0);
                        this.Ta.Ua(this.Vb.length, c, g);
                        a.width = c.M * this.size;
                        a.height = c.U * this.size
                    }
                })
            }(function(a, c, d, b) {
                return a.extend({
                    init: function(a, b) {
                        this.h(a, b);
                        this.Ta.tg = [];
                        this.Ta.mk = []
                    },
                    Bh: function(a) {
                        this.h(a);
                        a.a = 0;
                        a.qs = c.dc(this.o +
                            this.JA * d.tb());
                        a = this.Vb.length;
                        this.Ta.tg[a] = 0;
                        this.Ta.mk[a] = new b(0, 0)
                    },
                    YE: function(a, b, c, d, l) {
                        a.x -= d;
                        a.y -= l;
                        var n = a.x * c + a.y * b;
                        a.x = a.x * b - a.y * c + d;
                        a.y = n + l
                    },
                    $o: function(a, b, c) {
                        this.h(a, b, c);
                        a.a += a.qs * c;
                        this.Ta.tg[b] = a.a;
                        this.Ta.mk[b].qa(a.b)
                    },
                    Go: function(a) {
                        this.Ta.tg.splice(a, 1);
                        this.Ta.mk.splice(a, 1);
                        this.h(a)
                    }
                })
            }(gb, ea, Z, K), H, Z, U),
            Gb = function(a, c, d) {
                return a.extend({
                    init: function(a, d) {
                        this.h();
                        this.sa(c.hl);
                        this.Ua(a);
                        this.Px = d;
                        this.te = !1
                    },
                    Po: function() {
                        d.ra(d.r.Jp, this.Px)
                    }
                })
            }(Aa, w, V),
            Hb = function() {
                return function(a,
                    c, d, b, f) {
                    this.start = a;
                    this.end = c;
                    this.color = f
                }
            }(),
            Ib = function(a, c, d) {
                return a.extend({
                    init: function() {
                        this.Eo = 1;
                        this.Ca = []
                    },
                    Sr: function(a, c) {
                        this.Ca.splice(c, 0, a)
                    },
                    Rr: function(a) {
                        this.Ca.push(a)
                    },
                    log: function() {
                        d.debug("Constraint System Log:");
                        for (var a = 0, c = this.Ca.length; a < c; a++) {
                            var e = this.Ca[a];
                            d.debug("-- Point: " + e.Dt());
                            for (var g = 0, k = e.Ub.length; g < k; g++) {
                                var l = e.Ub[g];
                                d.debug("---- Constraint: " + l.Gc.Dt() + " len: " + l.rd)
                            }
                        }
                    },
                    zA: function(a) {
                        this.Ca.splice(a, 1)
                    },
                    update: function(a) {
                        for (var c = this.Ca,
                            d = c.length, g = this.Eo, k = 0; k < d; k++) c[k].update(a);
                        for (k = 0; k < g; k++)
                            for (a = 0; a < d; a++) c[a].ok()
                    }
                })
            }(ba, K, ja),
            Xa = {
                Ai: 0,
                Pi: 1,
                hD: 2
            },
            Ya = function(a, c) {
                var d = 9.8 * c.kw,
                    b = {
                        Kp: d,
                        ed: new a(0, d),
                        toggle: function() {
                            b.ed.y = -b.ed.y
                        },
                        Wn: function() {
                            return 0 === b.ed.y && 0 === b.ed.x
                        },
                        Us: function() {
                            return b.ed.y === b.Kp && 0 === b.ed.x
                        },
                        reset: function() {
                            b.ed.x = 0;
                            b.ed.y = d
                        }
                    };
                return b
            }(K, N),
            Jb = function(a, c, d, b) {
                return a.extend({
                    init: function() {
                        this.ts = !1;
                        this.sd(1);
                        this.Wt()
                    },
                    sd: function(a) {
                        this.fC = a;
                        this.Dh = 1 / a;
                        this.Kd = new d(0, c.Kp *
                            a)
                    },
                    Wt: function() {
                        var a = d.Qa;
                        this.yc = a();
                        this.B = a();
                        this.b = a();
                        this.tc = a();
                        this.Ud = a()
                    },
                    rF: function(a, b) {
                        var c = (a / b >> 0) + 1;
                        0 != c && (a /= c);
                        for (var d = 0; d < c; d++) this.update(a)
                    },
                    update: function(a) {
                        this.Ud = d.Qa();
                        this.ts || (b.Wn() ? this.Ud.add(this.Kd) : this.Ud.add(d.multiply(b.ed, this.fC)));
                        a /= c.$i;
                        this.Ud.multiply(this.Dh);
                        this.B = d.multiply(this.Ud, a);
                        this.yc.add(this.B);
                        this.tc = d.multiply(this.yc, a);
                        this.b.add(this.tc)
                    },
                    Rm: function(a, b) {
                        if (!a.Wn()) {
                            var g = d.multiply(a, b / c.$i);
                            this.b.add(g)
                        }
                    }
                })
            }(ba, N, K, Ya),
            hb = function(a, c, d, b, f) {
                function e(a, b, c) {
                    this.Gc = a;
                    this.rd = b;
                    this.type = c
                }
                return c.extend({
                    init: function() {
                        this.va = new d(b.Jf, b.Jf);
                        this.Mc = new d(b.e, b.e);
                        this.Ub = [];
                        this.Ud = d.Qa();
                        this.h()
                    },
                    Wt: function() {
                        this.h();
                        this.va.x = b.Jf;
                        this.va.y = b.Jf;
                        this.Pt()
                    },
                    Pt: function() {
                        this.Ub = []
                    },
                    Re: function(a, b, c) {
                        this.Ub.push(new e(a, b, c))
                    },
                    UE: function(a) {
                        for (var b = this.Ub, c = b.length, d = 0; d < c; d++)
                            if (b[d].Gc === a) {
                                b.splice(d, 1);
                                break
                            }
                    },
                    wA: function(a) {
                        this.Ub.splice(a, 1)
                    },
                    TD: function(a, b) {
                        for (var c = this.Ub, d = c.length,
                            e = 0; e < d; e++) {
                            var f = c[e];
                            if (f.Gc === a) {
                                f.Gc = b;
                                break
                            }
                        }
                    },
                    xy: function(a) {
                        for (var b = this.Ub, c = b.length, d = 0; d < c; d++)
                            if (b[d].Gc === a) return !0;
                        return !1
                    },
                    ej: function(a, b) {
                        for (var c = this.Ub, d = c.length, e = 0; e < d; e++) {
                            var f = c[e];
                            if (f.Gc === a) {
                                f.rd = b;
                                break
                            }
                        }
                    },
                    js: function(a, b, c) {
                        for (var d = this.Ub, e = d.length, f = 0; f < e; f++) {
                            var p = d[f];
                            if (p.Gc === a) {
                                p.Gc = b;
                                p.rd = c;
                                break
                            }
                        }
                    },
                    rd: function(a) {
                        for (var c = this.Ub, d = c.length, e = 0; e < d; e++) {
                            var f = c[e];
                            if (f.Gc === a) return f.rd
                        }
                        return b.e
                    },
                    update: function(a) {
                        var c = this.Ud,
                            d = f.ed;
                        this.ts ?
                            (c.x = 0, c.y = 0) : 0 !== d.y || 0 !== d.x ? (c.x = d.x, c.y = d.y) : (c.x = this.Kd.x * this.Dh, c.y = this.Kd.y * this.Dh);
                        c = a / b.$i * a / b.$i;
                        this.B.x = this.Ud.x * c;
                        this.B.y = this.Ud.y * c;
                        this.va.x === b.Jf && (this.va.x = this.b.x, this.va.y = this.b.y);
                        this.tc.x = this.b.x - this.va.x + this.B.x;
                        this.tc.y = this.b.y - this.va.y + this.B.y;
                        0 < a && (a = 1 / a, this.yc.x = this.tc.x * a, this.yc.y = this.tc.y * a);
                        this.va.x = this.b.x;
                        this.va.y = this.b.y;
                        this.b.x += this.tc.x;
                        this.b.y += this.tc.y
                    },
                    ok: function() {
                        var a = this.Mc,
                            b = this.b,
                            c = this.Dh,
                            d, e, f, p;
                        if (-1 !== a.x) b.x = a.x, b.y =
                            a.y;
                        else
                            for (var a = this.Ub, u = a.length, q = 0; q < u; q++) {
                                var A = a[q],
                                    s = A.Gc,
                                    z = s.b;
                                d = z.x - b.x;
                                e = z.y - b.y;
                                0 === d && 0 === e && (e = d = 1);
                                var h = Math.sqrt(d * d + e * e),
                                    C = A.rd,
                                    A = A.type;
                                if (1 === A) {
                                    if (h <= C) continue
                                } else if (2 === A && h >= C) continue;
                                A = -1 === s.Mc.x;
                                s = s.Dh;
                                h = (h - C) / ((1 < h ? h : 1) * (c + s));
                                A && (f = d, p = e);
                                C = c * h;
                                d *= C;
                                e *= C;
                                b.x += d;
                                b.y += e;
                                A && (d = s * h, z.x -= f * d, z.y -= p * d)
                            }
                    },
                    TE: function(a) {
                        this.update(a)
                    },
                    Dt: function() {
                        return this.b.x.toFixed(2) + ", " + this.b.y.toFixed(2)
                    }
                })
            }(Xa, Jb, K, N, Ya),
            ib = function(a, c, d, b, f, e, g, k, l) {
                var n = new k(0, 0, 0, 1),
                    r = new k(0, 0, 0, 1),
                    m = new k(0, 0, 0, 1),
                    p = new k(0, 0, 0, 1),
                    u = new k(0, 0, 0, 1);
                a = a.extend({
                    init: function(a, g, k, l, h, m, p) {
                        this.h();
                        this.Fo = 0;
                        this.Eo = 30;
                        this.lineWidth = d.Ep;
                        this.width = d.Fp;
                        this.zb = b.e;
                        this.de = 0;
                        this.highlighted = !1;
                        this.La = d.La;
                        this.Ya = null != a ? a : new c;
                        null != l ? this.hb = l : (this.hb = new c, this.hb.sd(1));
                        this.Ya.sd(0.02);
                        this.Ya.b.x = g;
                        this.Ya.b.y = k;
                        this.hb.b.x = h;
                        this.hb.b.y = m;
                        this.Rr(this.Ya);
                        this.Rr(this.hb);
                        this.hb.Re(this.Ya, this.La, f.Ai);
                        a = e.$a(this.hb.b, this.Ya.b);
                        g = Math.round(p / this.La + 2);
                        a.jn(g);
                        this.$t(p, a);
                        this.ag = !1;
                        this.oe = b.e;
                        this.Gx = this.Ps = this.hh = !1;
                        this.ij = [];
                        this.vi = d.vi
                    },
                    hd: function() {
                        var a = 0,
                            b = this.Ca,
                            c = b.length;
                        if (0 < c)
                            for (var d = b[0].b, h = 1; h < c; h++) var e = b[h],
                                a = a + d.Ma(e.b),
                                d = e.b;
                        return a
                    },
                    $t: function(a, b) {
                        null == b && (b = e.Qa());
                        for (var d = this.Ca, g = d[d.length - 2], h = this.hb, k = h.rd(g), l = null; 0 < a;) a >= this.La ? (g = d[d.length - 2], l = new c, l.sd(0.02), l.b = e.add(g.b, b), this.Sr(l, this.Ca.length - 1), h.js(g, l, k), l.Re(g, this.La, f.Ai), a -= this.La) : (l = a + k, l > this.La ? (a = this.La, k = l - this.La) : (g = d[d.length -
                            2], h.ej(g, l), a = 0))
                    },
                    HA: function(a) {
                        for (var b = this.Ca, c = b.length, d = this.hb, h = d.rd(b[c - 2]), e; 0 < a;)
                            if (a >= this.La) {
                                var g = c - 2,
                                    k = b[c - 3];
                                e = b[g];
                                d.js(e, k, h);
                                this.zA(g);
                                c--;
                                a -= this.La
                            } else g = h - a, 1 > g ? (a = this.La, h = this.La + g + 1) : (e = b[c - 2], d.ej(e, g), a = 0);
                        b = (c - 1) * (this.La + 3);
                        d = d.Ub;
                        c = d.length;
                        for (h = 0; h < c; h++) e = d[h], e.type === f.Pi && (e.rd = b);
                        return a
                    },
                    mF: function() {
                        for (var a = this.Ca, c = a.length, d = 0; d < c; d++) {
                            var e = a[d];
                            this.Ya.Mc.x != b.e && (e != this.hb && e.sd(0.5), 0 < d && e.Re(this.Ya, d * (this.La + 3), f.Pi))
                        }
                    },
                    update: function(a) {
                        0 <
                            this.de && (this.de = l.kf(this.de, 0, 1, a), 1.95 > this.de && this.ag && this.Qt(this.zb));
                        var b = this.Ca,
                            c = b.length,
                            d = this.Eo,
                            h = this.hb,
                            e, f;
                        for (e = 0; e < c; e++) f = b[e], f !== h && f.update(a);
                        for (e = 0; e < d; e++)
                            for (a = 0; a < c; a++) b[a].ok()
                    },
                    Qt: function(a) {
                        this.ag = !1;
                        var b = this.Ca,
                            d = b[a],
                            e = b[a + 1];
                        if (e)
                            for (var h = e.Ub, g = h.length, k = 0; k < g; k++) {
                                if (h[k].Gc === d) {
                                    e.wA(k);
                                    h = new c;
                                    h.sd(1E-5);
                                    h.b.qa(e.b);
                                    h.va.qa(e.va);
                                    this.Sr(h, a + 1);
                                    h.Re(d, this.La, f.Ai);
                                    break
                                }
                            } else d.Pt();
                        a = 0;
                        for (d = b.length; a < d; a++) e = b[a], e != this.hb && e.sd(1E-5)
                    },
                    Ko: function(a) {
                        this.zb =
                            a;
                        this.de = 2;
                        this.ag = !0;
                        this.highlighted = !1
                    },
                    v: function() {
                        var a = this.Ca,
                            c = a.length,
                            d = g.context,
                            e, h, f;
                        d.lineJoin = "round";
                        d.lineWidth = this.lineWidth;
                        if (this.zb === b.e) {
                            h = Array(c);
                            for (e = 0; e < c; e++) h[e] = a[e].b;
                            this.kn(h)
                        } else {
                            var k = [],
                                l = [],
                                m = !1;
                            for (e = 0; e < c; e++) {
                                h = a[e];
                                var p = !0;
                                0 < e && (f = a[e - 1], h.xy(f) || (p = !1));
                                h.Mc.x !== b.e || p || (m = !0);
                                m ? l.push(h.b) : k[e] = h.b
                            }
                            0 < k.length && this.kn(k);
                            0 < l.length && !this.Ps && this.kn(l)
                        }
                        d.lineWidth = 1
                    },
                    kn: function(a) {
                        var c = a.length,
                            d = this.vi,
                            f = this.ij;
                        if (!(2 > c)) {
                            var h = this.zb === b.e ||
                                this.ag ? 1 : this.de / 1.95;
                            if (!(0 >= h)) {
                                var l = a[0],
                                    D = a[1],
                                    J = l.x - D.x,
                                    D = l.y - D.y,
                                    J = Math.sqrt(J * J + D * D);
                                this.Fo = J <= this.La + 0.3 ? 0 : J <= this.La + 1 ? 1 : J < this.La + 4 ? 2 : 3;
                                if (!(3 > c)) {
                                    n.F = 0;
                                    n.K = 0;
                                    n.J = 0;
                                    n.B = h;
                                    r.F = 0.475;
                                    r.K = 0.305;
                                    r.J = 0.185;
                                    r.B = h;
                                    m.F = 0.19;
                                    m.K = 0.122;
                                    m.J = 0.074;
                                    m.B = h;
                                    p.F = 152 / 225;
                                    p.K = 0.44;
                                    p.J = 62 / 225;
                                    p.B = h;
                                    u.F = 0.304;
                                    u.K = 0.198;
                                    u.J = 0.124;
                                    u.B = h;
                                    this.highlighted && (r.F *= 3, r.K *= 3, r.J *= 3, p.F *= 3, p.K *= 3, p.J *= 3, m.F *= 3, m.K *= 3, m.J *= 3, u.F *= 3, u.K *= 3, u.J *= 3);
                                    J > this.La + 7 && !this.Gx && (J = 2 * (J / this.La), m.F *= J, u.F *= J);
                                    var J = !1,
                                        c = (c -
                                            1) * d,
                                        x = c - 1,
                                        d = (r.F - m.F) / x,
                                        D = (r.K - m.K) / x,
                                        E = (r.J - m.J) / x,
                                        I = (p.F - u.F) / x,
                                        wa = (p.K - u.K) / x,
                                        x = (p.J - u.J) / x,
                                        X = this.vi - 1,
                                        G = X - 1,
                                        L = g.context,
                                        B = L.globalAlpha;
                                    B !== h && (L.globalAlpha = h);
                                    var v = f[0];
                                    v ? (v.x = l.x, v.y = l.y) : f[0] = l.copy();
                                    for (var w, l = 1; l <= c; l++)
                                        if (v = l / c, (w = f[l]) || (w = f[l] = new e(0, 0)), e.cu(a, v, w), v = (l - 1) % X, v === G || l === c) {
                                            L.beginPath();
                                            w = this.ag ? k.Ck.Zi : J ? m.fi() : u.fi();
                                            L.strokeStyle = w;
                                            w = l - v - 1;
                                            var Y = f[w++];
                                            for (L.moveTo(Y.x, Y.y); w <= l; w++) Y = f[w], L.lineTo(Y.x, Y.y);
                                            L.stroke();
                                            J = !J;
                                            v += 1;
                                            m.F += d * v;
                                            m.K += D * v;
                                            m.J += E * v;
                                            u.F +=
                                                I * v;
                                            u.K += wa * v;
                                            u.J += x * v
                                        }
                                    B !== h && (L.globalAlpha = B)
                                }
                            }
                        }
                    }
                });
                a.kv = 30;
                return a
            }(Ib, hb, H, N, Xa, K, P, ca, na, ja),
            Oa = function(a) {
                return {
                    bt: null,
                    Od: 0,
                    gf: 0,
                    pF: !1,
                    bz: function(c, d) {
                        this.Od = c - 1;
                        this.gf = d - 1;
                        this.bt = a.Tf[this.Od].mg[this.gf]
                    }
                }
            }(R),
            jb = function(a, c, d) {
                return a.extend({
                    init: function() {
                        this.h()
                    },
                    ne: function(a) {
                        this.h(a);
                        this.ud = [];
                        this.p = [];
                        this.align = d.S
                    },
                    sB: function(a, c, d) {
                        this.ud[0] = a;
                        this.ud[1] = c;
                        this.ud[2] = d;
                        a = this.L.f[a].U;
                        c = this.L.f[c].U;
                        d = this.L.f[d].U;
                        this.height = a >= c && a >= d ? a : c >= a && c >= d ? c : d;
                        this.p[0] =
                            Math.floor((this.height - a) / 2);
                        this.p[1] = Math.floor((this.height - c) / 2);
                        this.p[2] = Math.floor((this.height - d) / 2)
                    },
                    v: function() {
                        this.vc();
                        var a = this.L.f[this.ud[0]],
                            d = this.L.f[this.ud[1]],
                            e = this.L.f[this.ud[2]],
                            g = this.width - (Math.floor(a.M) + Math.floor(e.M)),
                            k = c.context,
                            l = Math.round(this.ea),
                            n = Math.round(this.fa),
                            r = Math.ceil(a.M),
                            m = Math.ceil(a.U),
                            p = Math.ceil(e.M),
                            u = Math.ceil(e.U);
                        0 <= g ? (k.drawImage(this.L.qc, a.x, a.y, r, m, l, n + this.p[0], r, m), this.Mx(this.ud[1], l + r, n + this.p[1], g, d.U), k.drawImage(this.L.qc,
                            e.x, e.y, p, u, l + r + g, n + this.p[2], p, u)) : (a = a.copy(), d = e.copy(), a.M = Math.min(a.M, this.width / 2), d.M = Math.min(d.M, this.width - a.M), d.x += e.M - d.M, k.drawImage(this.L.qc, a.x, a.y, a.M, a.U, l, n + this.p[0], a.M, a.U), k.drawImage(this.L.qc, d.x, d.y, d.M, d.U, l + a.M, n + this.p[2], d.M, d.U));
                        this.uc()
                    },
                    ly: function() {
                        var a = c.element;
                        c.hi(document.createElement("canvas"));
                        var d = c.element,
                            e = Math.ceil(this.width),
                            g = Math.ceil(this.height);
                        d.width = e;
                        d.height = g;
                        this.v();
                        var d = d.toDataURL("image/png"),
                            k = new Image;
                        k.src = d;
                        $(k).width(e).height(g);
                        a && c.hi(a);
                        return k
                    }
                })
            }(aa, P, S),
            Kb = function(a, c, d, b, f) {
                return a.extend({
                    init: function(a) {
                        this.h();
                        var g = new c;
                        g.sa(b.Je);
                        g.sB(0, 2, 1);
                        g.width = a + d.Yk;
                        a = g.ly();
                        this.ne(new f(a))
                    }
                })
            }(aa, jb, H, w, Sa),
            Lb = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u, q, A, s, z, h) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.ta = null;
                        this.m = this.Hh = this.pe = this.uy = this.G = !1;
                        this.Gg = k.e;
                        this.Hj = e.Qa();
                        this.q = 0;
                        this.u = !1;
                        this.t = 0;
                        this.le = this.bf = this.Bb = null;
                        this.Mj = this.Nj = this.lf = 0;
                        this.xg = this.Ic = !1;
                        this.c = null;
                        this.tf = 0;
                        this.Xs = this.bp =
                            this.uk = !1;
                        this.ff = 0;
                        this.xh = this.Ij = !1;
                        this.n = this.$h = 0
                    },
                    oy: function(a, b, h) {
                        a = e.$a(a, h);
                        b = e.$a(b, h).og() - a.og();
                        return c.Bg(b)
                    },
                    wy: function(a, b) {
                        this.Hj.x = a;
                        this.Hj.y = b
                    },
                    vy: function(a) {
                        b.N(f.rm);
                        var c = new e(this.x, this.y),
                            c = this.oy(this.Hj, a, c);
                        180 < c ? c -= 360 : -180 > c && (c += 360);
                        this.hc.rotation += c;
                        this.Fg.rotation += c;
                        this.Eg.rotation += c;
                        c = 0 < c ? Math.min(Math.max(1, c), l.Ei) : Math.max(Math.min(-1, c), -l.Ei);
                        this.ta && (0 < c ? this.ta.hd() < l.Zk && this.ta.$t(c) : 0 !== c && 3 < this.ta.Ca.length && this.ta.HA(-c), this.bp = !0);
                        this.Hj.qa(a)
                    },
                    update: function(a) {
                        this.h(a);
                        if (this.Xs && this.ta) {
                            var b = this.ta.Ya;
                            b.b.x = this.x;
                            b.b.y = this.y;
                            b.Mc.qa(b.b);
                            this.Ij ? (b = g.md(this.ff, 200, 30, a), this.ff = b.value, b.pd && (this.Ij = !1)) : (b = g.md(this.ff, 130, 30, a), this.ff = b.value, b.pd && (this.Ij = !0));
                            this.Pa.gB(this.ff)
                        }
                        this.xh && (this.$h -= 1.5 * a, 0 >= this.$h && (this.n = k.e, this.xh = !1));
                        if (this.wb) {
                            var b = e.$a(this.Pa.path[this.Pa.Oc], this.Pa.b),
                                c = 0;
                            15 < Math.abs(b.x) && (c = 0 < b.x ? 10 : -10);
                            this.wb.rotation = g.kf(this.wb.rotation, c, 60, a)
                        }
                        this.m && this.bp && this.ta &&
                            (a = 0.7 * this.ta.hd(), this.hc.X = 0 === a ? this.hc.da = 0 : this.hc.da = Math.max(0, Math.min(1.2, 1 - a / l.$k)))
                    },
                    dC: function(a) {
                        this.Ic && this.uk && (this.uk = !1, this.xg = !0, b.N(f.nm), this.c.R(0));
                        if (this.Ic && this.xg) {
                            0 !== this.c.Vf && (this.tf += a * l.wm);
                            var h = 0;
                            a = !1;
                            if (this.ta)
                                for (var d = this.ta.ij, g = l.La, m = 0, p = d.length; m < p; m++) {
                                    var q = d[m],
                                        n = d[m + 1],
                                        r = Math.max(2 * g / 3, q.Ma(n));
                                    if (this.tf >= h && (this.tf < h + r || m > p - 3)) {
                                        h = this.tf - h;
                                        n = e.$a(n, q);
                                        n.multiply(h / r);
                                        this.c.x = q.x + n.x;
                                        this.c.y = q.y + n.y;
                                        m > p - 3 && (a = !0);
                                        0 !== this.c.Vf && (this.c.rotation =
                                            c.Bg(n.og()) + 270);
                                        break
                                    } else h += r
                                }
                            a && (this.tf = k.e)
                        }
                    },
                    Hx: function() {
                        if (!this.pe && !this.G) {
                            if (this.kg && this.Hh && this.ta) {
                                var a = this.ta.Ya.b;
                                this.x = a.x;
                                this.y = a.y
                            }
                            this.vc();
                            0 < this.q ? this.Bb.v() : this.back.v();
                            if (this.n !== k.e || this.xh) a = new q(0.2, 0.5, 0.9, this.$h), this.vs(this.x, this.y, this.n !== k.e ? this.n : this.Gt, a)
                        }
                    },
                    vs: function(a, b, c, h) {
                        if (!(0 > c)) {
                            var d = u.context,
                                e = 2 * Math.PI,
                                f = Math.max(16, Math.round(c / (2 * l.Gb)));
                            0 !== f % 2 && f++;
                            d.lineWidth = 2;
                            d.strokeStyle = h.fi();
                            h = e / f;
                            for (var g = 0; g < f; g++)
                                if (0 === g % 2) {
                                    var k =
                                        g / f * e;
                                    d.beginPath();
                                    d.arc(a, b, c, k, k + h, !1);
                                    d.stroke();
                                    d.closePath()
                                }
                        }
                    },
                    Yf: function() {
                        this.m && this.vs(this.x, this.y, l.Vc, q.red)
                    },
                    v: function() {
                        if (!this.pe) {
                            var a = this.ta;
                            this.m && (this.Eg.visible = this.Gg !== k.e, this.Fg.visible = this.Gg === k.e, this.ri.v());
                            this.G && (this.rE.v(), this.uy || this.qE.v());
                            a && a.v();
                            0 >= this.q ? this.gd.v() : this.lf != k.e ? this.bf.v() : this.le.v();
                            this.m && this.hc.v();
                            this.uc()
                        }
                    },
                    Lx: function() {
                        this.c.v()
                    },
                    bE: function() {
                        this.sE.v()
                    },
                    ku: function(a) {
                        this.ta = a;
                        this.Gt = this.n;
                        this.n = k.e;
                        this.Ic &&
                            (this.uk = !0)
                    },
                    cF: function() {
                        this.Ij = this.Xs = !0;
                        this.ff = 130;
                        var a = new g(100, this.ff, 0);
                        a.iu("RC30", new e(this.x, this.y));
                        this.Lo(a);
                        a.start()
                    },
                    lB: function(a) {
                        this.Gt = this.n;
                        this.n = a;
                        a === k.e || a === k.lv ? (a = s.gb(f.ll, f.ml), this.back = p.create(a, 0), this.back.ya(), this.back.anchor = this.back.oa = m.S, this.gd = p.create(a, 1), this.gd.anchor = this.gd.oa = m.S, this.T(this.back), this.T(this.gd), this.back.visible = !1, this.gd.visible = !1) : (this.back = p.create(f.Ji, 0), this.back.ya(), this.back.anchor = this.back.oa = m.S, this.gd =
                            p.create(f.Ji, 1), this.gd.anchor = this.gd.oa = m.S, this.T(this.back), this.T(this.gd), this.back.visible = !1, this.gd.visible = !1, this.$h = l.Tp, this.xh = !1);
                        this.m && (this.ri = p.create(f.Hf, 0), this.ri.anchor = this.ri.oa = m.S, this.T(this.ri), this.ri.visible = !1, this.hc = p.create(f.Hf, 1), this.hc.te = !1, this.Eg = p.create(f.Hf, 2), this.Eg.anchor = this.Eg.oa = m.S, this.hc.T(this.Eg), this.Fg = p.create(f.Hf, 3), this.Fg.anchor = this.Fg.oa = this.hc.anchor = this.hc.oa = m.S, this.hc.T(this.Fg), this.T(this.hc), this.bp = this.hc.visible = !1)
                    },
                    fB: function(a, b, c) {
                        this.q = a;
                        this.u = b;
                        this.t = c;
                        0 < this.q && (this.Bb = new h(a), this.Bb.Rd = -Math.round(this.Bb.width / 2) + l.Di, this.Bb.x = -l.Di, this.bf = p.create(f.Je, 3), this.bf.visible = !1, this.bf.anchor = this.bf.oa = m.S, this.T(this.bf), this.le = p.create(f.Je, 4), this.le.visible = !1, this.le.anchor = this.le.oa = m.S, this.T(this.le), this.le.T(this.Bb), this.u ? (this.Bb.rotation = 90, this.Bb.y = -this.t, this.Nj = this.y - this.t, this.Mj = this.y + (this.q - this.t), this.le.rotation = 90, this.bf.rotation = 90) : (this.Nj = this.x - this.t, this.Mj =
                            this.x + (this.q - this.t), this.Bb.x += -this.t), this.Bb.anchor = m.Nf | m.mb, this.Bb.x += this.x, this.Bb.y += this.y, this.Bb.visible = !1);
                        this.lf = k.e
                    },
                    TA: function() {
                        this.wb = p.create(f.Og, 1);
                        this.wb.ya();
                        this.wb.oa = m.S;
                        var a = new r;
                        a.sa(f.Og);
                        a.oa = a.anchor = m.Jb | m.mb;
                        a.ya();
                        a.lc(0.03, A.ha.Gq, 2, 4);
                        a.R(0);
                        a.Qy(s.gb(0, 2));
                        this.wb.T(a);
                        a = this.wb.L.p[0];
                        this.wb.x = -a.x;
                        this.wb.y = -a.y;
                        this.wb.Rd = a.x - this.wb.width / 2;
                        this.wb.ug = a.y - this.wb.width / 2;
                        this.wb.X = this.wb.da = 1 / 1.3;
                        this.T(this.wb)
                    },
                    qB: function(a) {
                        this.Ic = a;
                        this.xg =
                            this.uk = !1;
                        this.c = new r;
                        this.c.sa(f.Rg);
                        this.c.ya();
                        this.c.anchor = m.S;
                        this.c.x = this.x;
                        this.c.y = this.y;
                        this.c.visible = !1;
                        this.c.jb(0, 0.05, A.ha.Wa, 0, 6);
                        this.c.XA(0.4, 5, 0);
                        this.c.jb(1, 0.1, A.ha.vb, 7, 10);
                        this.c.Td(1, 0, 0.05);
                        this.T(this.c)
                    },
                    rs: function() {
                        this.ta = null
                    }
                })
            }(Ba, ea, ib, ma, w, K, na, N, H, Oa, ya, S, aa, P, ca, fa, Z, jb, Kb),
            Mb = function(a, c, d) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.a = 0;
                        this.Fa = c.Qa();
                        this.Ka = c.Qa();
                        this.touch = this.ni = 0
                    },
                    Sb: function() {
                        var a = this.aa.M / 2;
                        this.Fa.x = this.x - a;
                        this.Ka.x = this.x +
                            a;
                        this.Fa.y = this.Ka.y = this.y;
                        this.a = d.dc(this.rotation);
                        this.Fa.pa(this.a, this.x, this.y);
                        this.Ka.pa(this.a, this.x, this.y)
                    }
                })
            }(Aa, K, ea),
            Nb = function(a, c, d, b, f) {
                return a.extend({
                    init: function(a, b, d) {
                        this.h(a, b);
                        this.a = d;
                        this.Om = 10;
                        this.speed = c.Ql;
                        this.rc = 0.6;
                        this.size = c.Pl;
                        this.nj = 100;
                        this.wc.F = 1;
                        this.wc.K = 1;
                        this.wc.J = 1;
                        this.wc.B = 0.6;
                        this.oc.F = 1;
                        this.oc.K = 1;
                        this.oc.J = 1;
                        this.oc.B = 0
                    },
                    Bh: function(a) {
                        this.h(a);
                        var c = this.On.f[f.gb(6, 8)],
                            d = new b(0, 0, 0, 0);
                        this.Ta.Ua(this.Vb.length, c, d, 1);
                        c = this.size;
                        a.width =
                            c;
                        a.height = c
                    },
                    Zu: function(a, b) {
                        a.dir.multiply(0.9);
                        var c = d.multiply(a.dir, b);
                        c.add(this.Kd);
                        a.b.add(c)
                    }
                })
            }(gb, H, K, U, Z),
            Ob = function(a, c, d, b, f, e, g, k, l) {
                var n = a.extend({
                    init: function() {
                        this.h();
                        this.a = this.group = 0;
                        this.Fa = new g(0, 0);
                        this.Ka = new g(0, 0);
                        this.Aa = new g(0, 0);
                        this.Ba = new g(0, 0);
                        this.yj = 0
                    },
                    ih: function() {
                        this.Ob = new c;
                        this.Ob.sa(d.If);
                        this.Ob.anchor = b.Df | b.Tb;
                        this.Ob.oa = b.Jb | b.Tb;
                        this.Ob.y = e.tm;
                        this.Ob.x = 0;
                        this.Ob.Qe(0, 0.05, f.ha.Wa, 4, [n.Lf.Ni, n.Lf.Ni + 1, n.Lf.Ni + 2, n.Lf.Ni + 2]);
                        this.Ob.ya();
                        this.Ob.visible = !1;
                        this.T(this.Ob)
                    },
                    Sb: function() {
                        this.Fa.x = this.x - e.Yi / 2;
                        this.Ka.x = this.x + e.Yi / 2;
                        this.Fa.y = this.Ka.y = this.y;
                        this.Aa.x = this.Fa.x;
                        this.Ba.x = this.Ka.x;
                        this.Aa.y = this.Ba.y = this.y + e.um;
                        this.a = l.dc(this.rotation);
                        this.Fa.pa(this.a, this.x, this.y);
                        this.Ka.pa(this.a, this.x, this.y);
                        this.Aa.pa(this.a, this.x, this.y);
                        this.Ba.pa(this.a, this.x, this.y)
                    },
                    v: function() {
                        var a = this.Ob.yb;
                        a && a.state === f.Z.Xg && (this.Ob.visible = !1);
                        this.h()
                    },
                    Yf: ha(),
                    update: function(a) {
                        this.h(a);
                        this.Pa && this.Sb()
                    }
                });
                n.Lf = {
                    zv: 0,
                    Av: 1,
                    Ni: 2,
                    bD: 3,
                    aD: 4
                };
                n.Z = {
                    nw: 0,
                    Iw: 1,
                    IDLE: 2
                };
                n.tv = 0.8;
                return n
            }(Ba, ya, w, S, fa, H, K, na, ea, P),
            kb = function(a, c, d, b, f) {
                var e = a.extend({
                    init: function(a) {
                        this.h();
                        this.Wm = a;
                        this.state = e.Z.Dd;
                        this.Lu = this.Zo = this.Mu = this.Yo = 0;
                        this.Cb = null;
                        this.bg = new d(b.e, b.e, b.e, b.e)
                    },
                    Aj: function(a, b) {
                        a.oa = b.oa = f.Jb | f.mb;
                        this.ae(a, e.Z.Dd);
                        this.ae(b, e.Z.Ge);
                        this.gi(e.Z.Dd)
                    },
                    xE: function(a, b) {
                        var d = new c;
                        d.ne(a);
                        var e = new c;
                        e.ne(b);
                        this.Aj(d, e)
                    },
                    iE: ka("bg"),
                    ii: function(a, b, c, d) {
                        this.Yo = a;
                        this.Mu = b;
                        this.Zo = c;
                        this.Lu = d
                    },
                    gi: function(a) {
                        this.state =
                            a;
                        var b = this.fb(e.Z.Ge);
                        this.fb(e.Z.Dd).setEnabled(a === e.Z.Dd);
                        b.setEnabled(a === e.Z.Ge)
                    },
                    cf: function(a, c, e) {
                        e = e ? 0 : 15;
                        return this.bg.M !== b.e ? d.Db(a, c, this.ea + this.bg.x - e, this.fa + this.bg.y - e, this.bg.M + 2 * e, this.bg.U + 2 * e) : d.Db(a, c, this.ea - this.Yo - e, this.fa - this.Zo - e, this.width + (this.Yo + this.Mu) + 2 * e, this.height + (this.Zo + this.Lu) + 2 * e)
                    },
                    Sj: function(a, b) {
                        this.h(a, b);
                        return this.state === e.Z.Dd && this.cf(a, b, !0) ? (this.gi(e.Z.Ge), !0) : !1
                    },
                    Tj: function(a, b) {
                        this.h(a, b);
                        return this.state === e.Z.Ge && (this.gi(e.Z.Dd),
                            this.cf(a, b, !1)) ? (this.Cb && this.Cb(this.Wm), !0) : !1
                    },
                    ro: function(a, b) {
                        this.h(a, b);
                        if (this.state === e.Z.Ge) {
                            if (this.cf(a, b, !1)) return !0;
                            this.gi(e.Z.Dd)
                        }
                        return !1
                    },
                    ae: function(a, b) {
                        this.h(a, b);
                        a.oa = f.Jb | f.mb;
                        b === e.Z.Ge && (this.width = a.width, this.height = a.height, this.gi(e.Z.Dd))
                    }
                });
                e.Z = {
                    Dd: 0,
                    Ge: 1
                };
                return e
            }(ia, aa, U, N, S),
            Pb = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u) {
                return a.extend({
                    init: function(a, c, g, k, h) {
                        this.h();
                        var m;
                        if (h !== e.e) m = d.Mi + g - 1;
                        else switch (g) {
                            case 1:
                                m = d.ql;
                                break;
                            case 2:
                                m = d.rl;
                                break;
                            case 3:
                                m = d.sl;
                                break;
                            case 4:
                                m = d.tl;
                                break;
                            case 5:
                                m = d.Ii
                        }
                        this.sa(m);
                        if (0 < h) {
                            this.ya();
                            m = 0 + 2 * (h - 1);
                            var p = 1 + 2 * (h - 1),
                                u = l.create(d.Qg, m),
                                p = l.create(d.Qg, p);
                            u.ya();
                            p.ya();
                            this.Wb = new n(0);
                            this.Wb.Aj(u, p);
                            this.Wb.Cb = $.proxy(this.Cb, this);
                            this.Wb.anchor = this.Wb.oa = r.S;
                            this.T(this.Wb);
                            p = u.L;
                            u = p.p[m];
                            m = p.f[m];
                            m = new b(m.M, m.U);
                            p = new b(p.od.x, p.od.y);
                            p.$a(m);
                            p.$a(u);
                            this.Wb.ii(-u.x + m.x / 2, -p.x + m.x / 2, -u.y + m.y / 2, -p.y + m.y / 2)
                        }
                        this.zk = this.Wh = !1;
                        this.Yz = this.rotation = k;
                        this.Fa = b.Qa();
                        this.Ka = b.Qa();
                        this.Aa = b.Qa();
                        this.Ba = b.Qa();
                        this.ph = !1;
                        this.Qj = this.Rj = this.Bj = 0;
                        this.mj = !1;
                        this.Hc = 0;
                        this.x = a;
                        this.y = c;
                        this.tB(h);
                        this.Sb();
                        5 === g && (this.jb(0, 0.05, f.ha.vb, 0, 0), this.jb(1, 0.05, f.ha.vb, 1, 4), this.ya());
                        this.Ek = e.e
                    },
                    Sb: function() {
                        var a = this.ph ? this.width - 400 * u.Gb : this.L.f[this.rf].M,
                            a = a / 2;
                        this.Fa.x = this.x - a;
                        this.Ka.x = this.x + a;
                        this.Fa.y = this.Ka.y = this.y - 5;
                        this.Aa.x = this.Fa.x;
                        this.Ba.x = this.Ka.x;
                        this.Aa.y = this.Ba.y = this.y + 5;
                        this.a = g.dc(this.rotation);
                        this.Fa.pa(this.a, this.x, this.y);
                        this.Ka.pa(this.a, this.x, this.y);
                        this.Aa.pa(this.a, this.x,
                            this.y);
                        this.Ba.pa(this.a, this.x, this.y)
                    },
                    SB: function() {
                        this.mj = !0;
                        this.R(1);
                        this.Hc = this.Rj;
                        c.Ct(d.Cd)
                    },
                    Su: function() {
                        this.mj = !1;
                        this.R(0);
                        this.Hc = this.Qj;
                        c.Vo(d.Cd)
                    },
                    update: function(a) {
                        this.h(a);
                        (this.Pa || this.nu) && this.Sb();
                        this.ph && (this.mj ? (this.Hc = k.kf(this.Hc, 0, 1, a), 0 === this.Hc && this.Su()) : (this.Hc = k.kf(this.Hc, 0, 1, a), 0 === this.Hc && this.SB()))
                    },
                    tB: ka("yf"),
                    pE: Da("yf"),
                    KA: function() {
                        this.zk = !this.zk;
                        this.BA(2);
                        var a = this.Yz + (this.zk ? 90 : 0),
                            b = new f;
                        b.w(m.re(this.rotation, m.A.LINEAR, 0));
                        b.w(m.re(a,
                            m.A.Hb, 0.3 * (Math.abs(a - this.rotation) / 90)));
                        b.cb = $.proxy(this.Wo, this);
                        this.Kb(b, 2);
                        this.R(2);
                        this.nu = !0;
                        this.Wb.X = -this.Wb.X
                    },
                    Wo: function() {
                        this.Sb();
                        this.nu = !1
                    },
                    Cb: function(a) {
                        0 === a && (this.tt && this.tt(this.yf), this.zk ? c.N(d.Wi) : c.N(d.Xi))
                    },
                    Yf: function() {
                        var a = p.context;
                        a.beginPath();
                        a.strokeStyle = "red";
                        a.moveTo(this.Fa.x, this.Fa.y);
                        a.lineTo(this.Ka.x, this.Ka.y);
                        a.lineTo(this.Ba.x, this.Ba.y);
                        a.lineTo(this.Aa.x, this.Aa.y);
                        a.lineTo(this.Fa.x, this.Fa.y);
                        a.closePath();
                        a.stroke()
                    }
                })
            }(Ba, ma, w, K, fa, N, ea,
                na, aa, kb, S, oa, P, H),
            Qb = function(a, c, d, b, f, e, g, k, l, n, r) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.timeout = this.time = 0;
                        this.xc = null;
                        this.Ha = 1E-4
                    },
                    ih: function() {
                        var a;
                        0 < this.timeout && (this.xc = new c, this.xc.sa(d.Wc), this.xc.anchor = this.xc.oa = b.S, this.xc.jb(0, this.timeout / 37, f.ha.Wa, 19, 55), this.xc.R(0), this.time = this.timeout, this.xc.visible = !1, this.T(this.xc), a = new f, a.w(e.za(g.lb.copy(), e.A.LINEAR, 0)), a.w(e.za(g.Fb.copy(), e.A.LINEAR, 0.5)), this.xc.Kb(a, 1), a = new f, a.w(e.Kj(1, 1, e.A.LINEAR, 0)), a.w(e.Kj(0,
                            0, e.A.LINEAR, 0.25)), a.w(e.za(g.lb.copy(), e.A.LINEAR, 0)), a.w(e.za(g.Fb.copy(), e.A.LINEAR, 0.25)), this.Kb(a, 1));
                        this.aa = k.copy(r.ym);
                        a = new f;
                        a.w(e.Oa(this.x, this.y, e.A.Ad, 0));
                        a.w(e.Oa(this.x, this.y - 3, e.A.Hb, 0.5));
                        a.w(e.Oa(this.x, this.y, e.A.Ad, 0.5));
                        a.w(e.Oa(this.x, this.y + 3, e.A.Hb, 0.5));
                        a.w(e.Oa(this.x, this.y, e.A.Ad, 0.5));
                        a.Jj = f.ha.vb;
                        this.Kb(a, 0);
                        this.R(0);
                        a.update(l.gb(0, 20) / 10);
                        a = new c;
                        a.sa(d.Wc);
                        a.ya();
                        a.lc(0.05, f.ha.vb, 1, 18);
                        a.R(0);
                        a.pc(0).update(l.gb(0, 20) / 10);
                        a.anchor = a.oa = b.S;
                        a.Ha = 1E-4;
                        this.T(a)
                    },
                    update: function(a) {
                        0 < this.timeout && 0 < this.time && (this.time = n.kf(this.time, 0, 1, a));
                        this.h(a)
                    },
                    v: function() {
                        this.xc && this.xc.v();
                        this.h()
                    }
                })
            }(Ba, ya, w, S, fa, oa, ca, U, Z, na, H),
            lb = function(a, c, d) {
                return a.extend({
                    init: function() {
                        this.h()
                    },
                    Oo: function(a, f, e, g) {
                        a = c.hj({
                            tj: a,
                            text: f,
                            width: e,
                            Dc: g
                        });
                        this.ne(new d(a))
                    }
                })
            }(aa, da, Sa),
            Rb = function(a) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.O = 0
                    }
                })
            }(lb),
            Sb = function(a, c, d, b) {
                var f = a.extend({
                    init: function(a, b) {
                        this.speed = a;
                        this.type = b;
                        this.b = c.Qa();
                        this.target = c.Qa();
                        this.offset = c.Qa()
                    },
                    moveTo: function(a, b, d) {
                        this.target.x = a;
                        this.target.y = b;
                        d ? this.b.qa(this.target) : this.type === f.Yc.zi ? (this.offset = c.$a(this.target, this.b), this.offset.multiply(this.speed)) : this.type === f.Yc.Kf && (this.offset = c.$a(this.target, this.b), this.offset.normalize(), this.offset.multiply(this.speed))
                    },
                    update: function(a) {
                        this.b.rj(this.target) || (this.b.add(c.multiply(this.offset, a)), this.b.round(), b.nk(this.offset.x, this.target.x - this.b.x) && b.nk(this.offset.y, this.target.y - this.b.y) || this.b.qa(this.target))
                    },
                    bx: function() {
                        0 === this.b.x && 0 === this.b.y || d.context.translate(-this.b.x, -this.b.y)
                    },
                    ox: function() {
                        0 === this.b.x && 0 === this.b.y || d.context.translate(this.b.x, this.b.y)
                    }
                });
                f.Yc = {
                    Kf: 0,
                    zi: 1
                };
                return f
            }(ba, K, P, Z),
            Tb = function() {
                function a(a, d, b, f) {
                    this.object = a;
                    this.eh = d;
                    this.param = b;
                    this.delay = f
                }
                a.prototype.Ex = function() {
                    this.eh.apply(this.object, this.param)
                };
                return {
                    fe: [],
                    Fd: function(c, d, b, f) {
                        this.fe.push(new a(c, d, b, f))
                    },
                    Zm: function() {
                        this.fe = []
                    },
                    RD: function(a, d, b) {
                        for (var f = 0, e = this.fe.length; f < e; f--) {
                            var g =
                                this.fe[f];
                            if (g.object === a && g.eh === d && g.param === b) {
                                this.fe.splice(f, 1);
                                break
                            }
                        }
                    },
                    update: function(a) {
                        for (var d = this.fe.slice(0), b = 0, f = d.length; b < f; b++) {
                            var e = d[b],
                                g = this.fe.indexOf(e);
                            0 > g || (e.delay -= a, 0 >= e.delay && (this.fe.splice(g, 1), e.Ex()))
                        }
                    }
                }
            }(),
            Ub = function() {
                var a = {
                    Bq: 0,
                    Qp: 1,
                    ur: 2,
                    rr: 3,
                    Jr: 4,
                    Gm: 5,
                    wr: 6,
                    xr: 7,
                    yr: 8,
                    zr: 9,
                    Ar: 10,
                    Br: 11,
                    Cr: 12,
                    Dr: 13,
                    Er: 14,
                    Fr: 15,
                    Gr: 16,
                    Hr: 17,
                    Ir: 18,
                    qp: 50,
                    rp: 51,
                    pp: 52,
                    Up: 53,
                    mp: 54,
                    Iq: 55,
                    mr: 56,
                    nr: 57,
                    or: 58,
                    pr: 59,
                    qr: 60,
                    ww: 61,
                    Vk: 80,
                    jp: 81,
                    kp: 82,
                    Sp: 100,
                    al: 101,
                    Vp: 102,
                    Wp: 103,
                    Pq: 120,
                    Hw: 121,
                    mv: 122,
                    jE: function(c) {
                        switch (c) {
                            case "map":
                                return a.Bq;
                            case "gameDesign":
                                return a.Qp;
                            case "target":
                                return a.ur;
                            case "target2":
                                return a.Hw;
                            case "star":
                                return a.rr;
                            case "tutorialText":
                                return a.Jr;
                            case "tutorial01":
                                return a.Gm;
                            case "tutorial02":
                                return a.wr;
                            case "tutorial03":
                                return a.xr;
                            case "tutorial04":
                                return a.yr;
                            case "tutorial05":
                                return a.zr;
                            case "tutorial06":
                                return a.Ar;
                            case "tutorial07":
                                return a.Br;
                            case "tutorial08":
                                return a.Cr;
                            case "tutorial09":
                                return a.Dr;
                            case "tutorial10":
                                return a.Er;
                            case "tutorial11":
                                return a.Fr;
                            case "tutorial12":
                                return a.Gr;
                            case "tutorial13":
                                return a.Hr;
                            case "tutorial14":
                                return a.Ir;
                            case "candyL":
                                return a.qp;
                            case "candyR":
                                return a.rp;
                            case "candy":
                                return a.pp;
                            case "candy2":
                                return a.mv;
                            case "gravitySwitch":
                                return a.Up;
                            case "bubble":
                                return a.mp;
                            case "pump":
                                return a.Iq;
                            case "sock":
                                return a.mr;
                            case "spike1":
                                return a.nr;
                            case "spike2":
                                return a.or;
                            case "spike3":
                                return a.pr;
                            case "spike4":
                                return a.qr;
                            case "spikesSwitch":
                                return a.ww;
                            case "electro":
                                return a.Vk;
                            case "bouncer1":
                                return a.jp;
                            case "bouncer2":
                                return a.kp;
                            case "grab":
                                return a.Sp;
                            case "hidden01":
                                return a.al;
                            case "hidden02":
                                return a.Vp;
                            case "hidden03":
                                return a.Wp;
                            case "rotatedCircle":
                                return a.Pq;
                            default:
                                return alert("Unknown map item:" + c), null
                        }
                    }
                };
                return a
            }(),
            Vb = function(a) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.bi = []
                    },
                    update: function(a) {
                        for (var d = 0, b = this.bi.length; d < b; d++) this.removeChild(this.bi[d]);
                        this.bi = [];
                        this.h(a)
                    },
                    Wo: function(a) {
                        this.bi.push(a.element)
                    },
                    Ae: function() {
                        var a = this;
                        return function(d) {
                            a.Wo(d)
                        }
                    },
                    bA: function(a) {
                        this.bi.push(a)
                    },
                    zt: function() {
                        var a = this;
                        return function(d) {
                            a.bA(d)
                        }
                    }
                })
            }(ia),
            mb = function(a, c, d, b, f, e, g) {
                function k(a, b) {
                    this.Nx = a;
                    this.It = b
                }
                var l = a.extend({
                    init: function(a, c) {
                        this.h();
                        this.rows = a;
                        this.Te = c;
                        this.gh = b.pb;
                        this.fh = b.ab;
                        this.uo = 1;
                        this.Hd = [];
                        this.ud = [];
                        this.Yn = [];
                        for (var d = 0; d < c; d++)
                            for (var g = this.Yn[d] = [], k = 0; k < a; k++) g[k] = f.e;
                        this.ci = this.di = l.kc.NONE;
                        this.eC = this.yy = !1;
                        this.Lt = e.gb(1E3, 2E3)
                    },
                    Xw: function(a, b) {
                        if (b === f.e) this.xf = a.zh, this.wf = a.yh;
                        else {
                            var d = a.f[b];
                            this.xf = d.M;
                            this.wf = d.U
                        }
                        this.ap();
                        for (var d =
                            f.e, e = 0, g = this.Hd.length; e < g; e++)
                            if (this.Hd[e].L === a) {
                                d = e;
                                break
                            }
                        d === f.e && (e = new c(a), d = this.Hd.length, this.Hd.push(e));
                        this.ud.push(new k(d, b))
                    },
                    ap: function() {
                        this.Zn = 2 + Math.floor(this.gh / (this.xf + 1));
                        this.$n = 2 + Math.floor(this.fh / (this.wf + 1));
                        this.di === l.kc.NONE && (this.$n = Math.min(this.$n, this.rows));
                        this.ci === l.kc.NONE && (this.Zn = Math.min(this.Zn, this.Te));
                        this.width = this.li = this.Te * this.xf;
                        this.height = this.ki = this.rows * this.wf
                    },
                    fill: function(a, b, c, d, e) {
                        var f = b;
                        for (b += d; f < b; f++) {
                            d = a;
                            for (var g = a + c; d <
                                g; d++) this.Yn[f][d] = e
                        }
                    },
                    fF: ka("uo"),
                    mB: function(a) {
                        this.ci = a;
                        this.ap()
                    },
                    nB: function(a) {
                        this.di = a;
                        this.ap()
                    },
                    $u: function(a) {
                        var b = Math.round(a.x / this.uo),
                            c = Math.round(a.y / this.uo),
                            e = this.x,
                            k = this.y,
                            q, A, s;
                        this.di !== l.kc.NONE && (k -= c, q = Math.floor(k) % this.ki, k = 0 > k ? q + c : q - this.ki + c);
                        this.ci !== l.kc.NONE && (e -= b, q = Math.floor(e) % this.li, e = 0 > e ? q + b : q - this.li + b);
                        if (d.ai(b, c, b + this.gh, c + this.fh, e, k, e + this.li, k + this.ki)) {
                            q = d.Mt(e, k, this.li, this.ki, b, c, this.gh, this.fh);
                            q = new g(Math.max(0, q.x), Math.max(0, q.y));
                            q = new g(Math.floor(Math.floor(q.x) /
                                this.xf), Math.floor(Math.floor(q.y) / this.wf));
                            var k = k + q.y * this.wf,
                                z = new g(e + q.x * this.xf, k),
                                e = 0;
                            for (A = this.Hd.length; e < A; e++) this.Hd[e].Pj = 0;
                            A = q.x + this.Zn - 1;
                            var h = q.y + this.$n - 1;
                            this.di === l.kc.NONE && (h = Math.min(this.rows - 1, h));
                            this.ci === l.kc.NONE && (A = Math.min(this.Te - 1, A));
                            for (e = q.x; e <= A; e++) {
                                z.y = k;
                                for (var C = q.y; C <= h && !(z.y >= c + this.fh); C++) {
                                    var D = d.Mt(b, c, this.gh, this.fh, z.x, z.y, this.xf, this.wf),
                                        J = new d(b - z.x + D.x, c - z.y + D.y, D.M, D.U),
                                        x = Math.round(e),
                                        E = Math.round(C);
                                    this.di === l.kc.Lp && (z.y < y ? E = 0 : z.y >=
                                        this.y + this.ki && (E = this.rows - 1));
                                    this.ci === l.kc.Lp && (z.x < this.x ? x = 0 : z.x >= this.x + this.li && (x = this.Te - 1));
                                    this.yy && (s = Math.sin(z.x) * this.Lt, x = Math.abs(Math.floor(s) % this.Te));
                                    this.eC && (s = Math.sin(z.y) * this.Lt, E = Math.abs(Math.floor(s) % this.rows));
                                    x >= this.Te && (x %= this.Te);
                                    E >= this.rows && (E %= this.rows);
                                    s = this.Yn[x][E];
                                    0 <= s && (x = this.ud[s], s = this.Hd[x.Nx], E = s.L, x.It !== f.e && (x = E.f[x.It], J.x += x.x, J.y += x.y), D = new d(a.x + D.x, a.y + D.y, D.M, D.U), s.Ua(s.Pj++, J, D));
                                    z.y += this.wf
                                }
                                z.x += this.xf;
                                if (z.x >= b + this.gh) break
                            }
                        }
                    },
                    v: function() {
                        this.vc();
                        for (var a = 0, b = this.Hd.length; a < b; a++) this.Hd[a].v();
                        this.uc()
                    }
                });
                l.kc = {
                    NONE: 0,
                    gv: 1,
                    Lp: 2
                };
                return l
            }(ia, Ja, U, H, N, Z, K),
            Wb = function(a, c) {
                return a.extend({
                    init: function(a, b) {
                        this.h(a, b);
                        this.Ws = c.Ph()
                    },
                    $u: function(a) {
                        this.Ws.rj(a) || (this.h(a), this.Ws.qa(a))
                    },
                    v: function() {
                        this.h()
                    }
                })
            }(mb, K),
            Xb = function(a, c, d) {
                return a.extend({
                    init: function(a, f, e, g, k) {
                        this.h();
                        this.Wm = k;
                        this.Aa = new c(0);
                        this.Aa.Aj(a, f);
                        this.Ba = new c(1);
                        this.Ba.Aj(e, g);
                        this.Aa.oa = this.Ba.oa = d.Jb | d.mb;
                        this.width = this.Aa.width;
                        this.height = this.Aa.height;
                        this.ae(this.Aa, 0);
                        this.ae(this.Ba, 1);
                        this.Ba.setEnabled(!1);
                        this.Aa.Cb = $.proxy(this.Cb, this);
                        this.Ba.Cb = $.proxy(this.Cb, this)
                    },
                    Cb: function(a) {
                        switch (a) {
                            case 0:
                            case 1:
                                this.toggle()
                        }
                        this.Cb && this.Cb(this.Wm)
                    },
                    ii: function(a, c, d, g) {
                        this.Aa.ii(a, c, d, g);
                        this.Ba.ii(a, c, d, g)
                    },
                    toggle: function() {
                        this.Aa.setEnabled(!this.Aa.isEnabled());
                        this.Ba.setEnabled(!this.Ba.isEnabled())
                    },
                    Vn: function() {
                        return this.Ba.isEnabled()
                    }
                })
            }(ia, kb, S),
            Yb = function(a, c, d) {
                var b = c.extend({
                    init: function() {
                        var c =
                            a.create(d.Wc, 56),
                            e = a.create(d.Wc, 56),
                            g = a.create(d.Wc, 57),
                            k = a.create(d.Wc, 57);
                        this.h(c, e, g, k, b.Hp);
                        this.ii(10, 10, 10, 10)
                    }
                });
                b.Hp = 0;
                return b
            }(aa, Xb, w),
            Zb = function(a, c, d, b, f) {
                var e = a.extend({
                    init: function(a, k) {
                        this.h();
                        this.sa(f.Wc);
                        this.Ua(58);
                        this.anchor = b.S;
                        var l = new c;
                        l.w(d.re(0, d.A.LINEAR, 0));
                        l.w(d.re(180, d.A.Hb, 0.3));
                        this.Kb(l, e.aj.Lr);
                        l = new c;
                        l.w(d.re(180, d.A.LINEAR, 0));
                        l.w(d.re(0, d.A.Hb, 0.3));
                        this.Kb(l, e.aj.Le);
                        this.$A(f.gl, 1);
                        this.x += a;
                        this.y += k
                    }
                });
                e.aj = {
                    Le: 0,
                    Lr: 1
                };
                return e
            }(aa, fa, oa, S, w),
            $b =
            function(a, c, d, b, f, e, g, k, l, n) {
                function r() {
                    this.y = this.x = this.Zz = 0;
                    this.oj = this.To = this.alpha = this.qj = this.Bk = this.da = this.pj = this.Ak = this.X = 1
                }
                return a.extend({
                    init: function() {
                        this.h();
                        var a = e.Jd(d.Ki);
                        this.Jt = a.zh;
                        this.Ht = a.yh;
                        this.Ta = new f(a);
                        this.Ta.Ha = 0.1;
                        this.Yj = []
                    },
                    Vw: function(a, b) {
                        var c, d, e = [0.3, 0.3, 0.5, 0.5, 0.6],
                            e = c = e[k.gb(0, e.length - 1)];
                        k.uA() ? c *= 1 + k.gb(0, 1) / 10 : e *= 1 + k.gb(0, 1) / 10;
                        c *= 1;
                        d = 1 * e;
                        var f = this.Jt * c,
                            g = this.Ht * d,
                            h = Math.min(1 - c, 1 - d),
                            l = Math.random(),
                            e = new r;
                        e.Zz = b;
                        e.x = a.x;
                        e.y = a.y;
                        e.Ak =
                            h + c;
                        e.Bk = h + d;
                        e.X = e.Ak * l;
                        e.da = e.Bk * l;
                        e.pj = c;
                        e.qj = d;
                        e.oj = 0.3;
                        e.To = 1;
                        e.alpha = 0.7 * l + 0.3;
                        c = this.Ta.L.f[0];
                        f = new n(a.x - f / 2, a.y - g / 2, f, g);
                        this.Ta.Ua(this.Yj.length, c, f, e.alpha);
                        this.Yj.push(e)
                    },
                    Ds: function(a, b, d) {
                        var e = l.Kl,
                            f = d.Pa.path[a];
                        b = c.$a(d.Pa.path[b], f);
                        d = Math.floor(b.hd() / e);
                        var g = l.Jl,
                            n, h;
                        b.normalize();
                        for (n = 0; n <= d; n++) h = c.add(f, c.multiply(b, n * e)), h.x += k.gb(-g, g), h.y += k.gb(-g, g), this.Vw(h, a)
                    },
                    update: function(a) {
                        this.h(a);
                        this.Ta.update(a);
                        var b = this.Yj.length,
                            c, d, e, f;
                        for (c = 0; c < b; c++) d = this.Yj[c],
                            e = g.md(d.X, d.pj, 1, a), d.X = e.value, e.pd && (e = d.Ak, d.Ak = d.pj, d.pj = e), e = g.md(d.da, d.qj, 1, a), d.da = e.value, e.pd && (e = d.Bk, d.Bk = d.qj, d.qj = e), e = this.Jt * d.X, f = this.Ht * d.da, this.Ta.Ce[c] = new n(d.x - e / 2, d.y - f / 2, e, f), e = g.md(d.alpha, d.oj, 1, a), d.alpha = e.value, e.pd && (e = d.To, d.To = d.oj, d.oj = e), this.Ta.Qf[c] = d.alpha
                    },
                    v: function() {
                        this.vc();
                        this.Ta.v();
                        this.uc()
                    }
                })
            }(ia, K, w, aa, Ja, La, na, Z, H, U),
            ac = function(a, c, d, b, f, e, g, k, l) {
                var n = 7 * e.P,
                    r = 3 * e.P,
                    m = 22.5 * e.P,
                    p = 0.03 * e.P,
                    u = d.extend({
                        init: function() {
                            this.h();
                            this.sa(b.jc);
                            this.Ua(z)
                        }
                    }),
                    q = a.extend({
                        init: function() {
                            this.h();
                            this.Fc = [];
                            this.Gd = [];
                            this.Ro = c.e;
                            this.Mh = g.Ph();
                            this.Wd = new u;
                            this.Wd.anchor = f.Mf | f.Nf;
                            this.Wd.X = 1;
                            this.Wd.oa = f.S;
                            this.Wd.Rd = this.Wd.width / 2 + 0.5;
                            this.Wd.Ha = 0.0010;
                            this.yd = new u;
                            this.yd.X = -1;
                            this.yd.anchor = f.Mf | f.Nf;
                            this.yd.oa = f.S;
                            this.yd.Rd = this.yd.width / 2 - 0.5;
                            this.yd.Ha = 0.0010;
                            this.yd.x = -1;
                            this.Cf = d.create(b.jc, h);
                            this.Cf.anchor = f.S;
                            this.Zb = d.create(b.jc, s);
                            this.Zb.anchor = f.Jb | f.Mf;
                            this.De = d.create(b.jc, s);
                            this.De.X = -1;
                            this.De.anchor = f.Jb | f.mb;
                            this.ob = d.create(b.jc,
                                D);
                            this.ob.anchor = f.S;
                            this.ob.rotation = 90;
                            this.gc = d.create(b.jc, D);
                            this.gc.anchor = f.S;
                            this.gc.rotation = -90;
                            this.zc = d.create(b.jc, C);
                            this.zc.anchor = this.ob.anchor;
                            this.zc.rotation = this.ob.rotation;
                            this.zc.visible = !1;
                            this.Ac = d.create(b.jc, C);
                            this.Ac.anchor = this.gc.anchor;
                            this.Ac.rotation = this.gc.rotation;
                            this.Ac.visible = !1;
                            this.Bf = d.create(b.jc, A);
                            this.Bf.anchor = f.S;
                            this.Wh = !1;
                            this.T(this.Wd);
                            this.T(this.yd);
                            this.T(this.zc);
                            this.T(this.Ac);
                            this.T(this.ob);
                            this.T(this.gc)
                        },
                        setSize: function(a) {
                            this.size =
                                a;
                            var b = this.size / 167;
                            this.Zb.X = this.Zb.da = this.De.da = b;
                            this.De.X = -b;
                            this.Bf.X = this.Bf.da = b;
                            a = 0.4 <= b ? b : 0.4;
                            this.Wd.X = this.Wd.da = this.yd.da = a;
                            this.yd.X = -a;
                            b = 0.75 <= b ? b : 0.75;
                            this.ob.X = this.ob.da = this.gc.X = this.gc.da = b;
                            this.zc.X = this.zc.da = this.Ac.X = this.Ac.da = b;
                            this.Cf.X = 1 - 0.5 * (1 - a);
                            this.Cf.da = this.Cf.X;
                            this.Rb = this.Zb.width * this.Zb.X;
                            this.XB()
                        },
                        Os: function() {
                            return !this.ob.visible
                        },
                        eu: function(a) {
                            this.ob.visible = !a
                        },
                        zE: function() {
                            return this.zc.visible
                        },
                        fu: function(a) {
                            this.zc.visible = a
                        },
                        AE: function() {
                            return this.Ac.visible
                        },
                        gu: function(a) {
                            this.Ac.visible = a
                        },
                        vx: function() {
                            var a = this.Gd.length,
                                b, c;
                            for (b = 0; b < a; b++)
                                if (c = this.Gd[b], c != this && this.wx(c)) return !0;
                            return !1
                        },
                        v: function() {
                            var a = l.context;
                            if (this.Ac.visible || this.zc.visible) {
                                var b = (r + e.P) * this.ob.X,
                                    c = this.Rb + Math.floor(b / 2);
                                a.beginPath();
                                a.lineWidth = b;
                                a.arc(this.x, this.y, c, 0, 2 * Math.PI, !1);
                                a.stroke()
                            }
                            this.Zb.color = this.color;
                            this.De.color = this.color;
                            this.ob.color = this.color;
                            this.gc.color = this.color;
                            this.Bf.color = this.color;
                            this.Bf.v();
                            var b = this.Gd.length,
                                h, d = this.Gd.indexOf(this),
                                f = a.globalAlpha;
                            0.2 !== f && (a.globalAlpha = 0.2);
                            for (c = 0; c < b; c++) h = this.Gd[c], h != this && h.vx() && this.Gd.indexOf(h) < d && this.Ix(this.x, this.y, this.Rb, h.x, h.y, h.Rb, 0.5 * n * h.Zb.X);
                            0.2 !== f && (a.globalAlpha = f);
                            this.Zb.v();
                            this.De.v();
                            this.h();
                            this.Cf.v()
                        },
                        Ix: function(a, b, c, h, d, e, f) {
                            var k = g.Ma(a, b, h, d);
                            k >= c + e || c >= k + e || (c = Math.acos((k - (c * c - e * e + k * k) / (2 * k)) / e), k = (new g(a - h, b - d)).a(), b = k - c, c = k + c, h > a && (b += Math.PI, c += Math.PI), a = l.context, a.beginPath(), a.lineWidth = f, a.arc(h, d, e, b, c, !1), a.stroke())
                        },
                        XB: function() {
                            this.Bf.x =
                                this.Cf.x = this.x;
                            this.Bf.y = this.Cf.y = this.y;
                            var a = this.Zb.width / 2 * (1 - this.Zb.X),
                                b = this.Zb.height / 2 * (1 - this.Zb.da),
                                c = this.Rb - (m - p * this.size) + (1 - this.ob.X) * (this.ob.width / 2);
                            this.Zb.x = this.x + a;
                            this.De.x = this.x - a;
                            this.Zb.y = this.De.y = this.y - b;
                            this.ob.x = this.x - c;
                            this.gc.x = this.x + c;
                            this.ob.y = this.gc.y = this.y;
                            this.zc.x = this.ob.x;
                            this.zc.y = this.ob.y;
                            this.Ac.x = this.gc.x;
                            this.Ac.y = this.gc.y
                        },
                        wx: function(a) {
                            if (this.x === a.x && this.y === a.y && this.size === a.size) return !1;
                            var b = this.Fc.length,
                                c;
                            for (c = 0; c < b; c++)
                                if (0 <=
                                    a.Fc.indexOf(this.Fc[c])) return !0;
                            return !1
                        },
                        copy: function(a) {
                            var b = new q;
                            b.uF = a;
                            b.x = this.x;
                            b.y = this.y;
                            b.rotation = this.rotation;
                            b.Gd = this.Gd;
                            b.Fc = this.Fc;
                            b.Vh = c.e;
                            a = this.size * e.P;
                            var h = k.dc(b.rotation);
                            b.eg = new g(b.x - a, b.y);
                            b.jd = new g(b.x + a, b.y);
                            b.eg.pa(h, b.x, b.y);
                            b.jd.pa(h, b.x, b.y);
                            b.setSize(this.size);
                            b.eu(this.Os());
                            b.ob.visible = !1;
                            b.gc.visible = !1;
                            return b
                        }
                    }),
                    A = 0,
                    s = 1,
                    z = 2,
                    h = 3,
                    C = 4,
                    D = 5;
                return q
            }(ia, N, aa, w, S, H, K, ea, P),
            bc = function() {
                return {
                    wE: ha()
                }
            }(),
            cc = function(a, c, d, b) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.aa = d.copy(b.Em);
                        this.ks = c.cm;
                        this.Vt = [c.ic, c.Ie, c.Ng];
                        this.Cn = c.Ie;
                        this.ty = 47;
                        this.sy = 76;
                        this.Md = c.ic;
                        this.Cy = 0;
                        this.By = 18;
                        this.Jn = c.ic;
                        this.Ay = 43;
                        this.zy = 67;
                        this.Ln = c.ic;
                        this.xj = 68;
                        this.Qs = 83;
                        this.rn = c.Ie;
                        this.Ux = 0;
                        this.Tx = 19;
                        this.dk = c.Ie;
                        this.sA = 20;
                        this.rA = 46;
                        this.Bs = c.Ng;
                        this.Xx = 0;
                        this.Wx = 12;
                        this.dp = c.ic;
                        this.hC = 28;
                        this.gC = 31;
                        this.ho = c.ic;
                        this.lt = 19;
                        this.kt = 27;
                        this.co = c.ic;
                        this.sz = 28;
                        this.rz = 31;
                        this.bn = c.ic;
                        this.rx = 32;
                        this.qx = 40;
                        this.gx = c.ic;
                        this.Zr = 41;
                        this.Yr = 42
                    },
                    v: function() {
                        this.h()
                    }
                })
            }(function(a,
                c, d, b, f, e, g, k, l, n, r, m, p, u, q, A) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.anchor = g.S;
                        this.Bn = 10;
                        this.Ld = 0;
                        this.In = 1;
                        this.Kn = 2;
                        this.qn = 3;
                        this.ck = 4;
                        this.As = 5;
                        this.cp = 6;
                        this.fo = 7;
                        this.bo = 8;
                        this.an = 9;
                        this.aa = k.copy(n.Dm);
                        this.Jc = !1;
                        this.ks = A.dm
                    },
                    iA: function() {
                        this.Jc || this.R(this.Cn, this.Bn)
                    },
                    jA: function() {
                        this.Jc || this.R(this.Jn, this.In)
                    },
                    kA: function() {
                        this.Jc || this.R(this.Ln, this.Kn)
                    },
                    nA: function() {
                        this.Jc || this.R(this.ho, this.fo)
                    },
                    mA: function() {
                        this.Jc || this.R(this.co, this.bo)
                    },
                    hA: function() {
                        this.Jc ||
                            this.R(this.Bs, this.As)
                    },
                    pA: function() {
                        this.Jc || (this.R(this.dp, this.cp), this.Jc = !0)
                    },
                    QE: function() {
                        this.Jc || this.R(this.bn, this.an)
                    },
                    gA: function() {
                        this.Jc || this.R(this.rn, this.qn)
                    },
                    RE: function() {
                        this.Jc || this.R(this.dk, this.ck)
                    },
                    Ly: function() {
                        var a = this.Lb[this.Md];
                        return a.isEnabled() && a.Vf === this.Ld
                    },
                    ih: function(a, d, h, f) {
                        var k, l, p;
                        l = 0;
                        for (p = this.Vt.length; l < p; l++) k = this.Uw(this.Vt[l]), k.Ha = 1E-4;
                        this.jb(this.Cn, this.Bn, 0.05, e.ha.Wa, this.ty, this.sy);
                        this.jb(this.Md, this.Ld, 0.05, e.ha.vb, this.Cy, this.By);
                        this.jb(this.Jn, this.In, 0.05, e.ha.vb, this.Ay, this.zy);
                        k = [];
                        var E = this.Qs - this.xj + 1;
                        l = this.xj;
                        for (p = l + E; l < p; l++) k.push(l);
                        l = this.xj;
                        for (p = l + E; l < p; l++) k.push(l);
                        this.Qe(this.Ln, this.Kn, 0.05, e.ha.Wa, 2 * (this.Qs - this.xj + 1), k);
                        this.jb(this.rn, this.qn, 0.05, e.ha.Wa, this.Ux, this.Tx);
                        this.jb(this.dk, this.ck, 0.05, e.ha.Wa, this.sA, this.rA);
                        this.jb(this.Bs, this.As, 0.05, e.ha.Wa, this.Xx, this.Wx);
                        this.jb(this.dp, this.cp, 0.05, e.ha.Wa, this.hC, this.gC);
                        this.jb(this.ho, this.fo, 0.05, e.ha.Wa, this.lt, this.kt);
                        this.jb(this.co,
                            this.bo, 0.05, e.ha.Wa, this.sz, this.rz);
                        this.jb(this.bn, this.an, 0.05, e.ha.vb, this.rx, this.qx);
                        this.Td(this.bn, this.an, this.dp, this.cp, 0.05);
                        this.Td(this.dk, this.ck, this.co, this.bo, 0.05);
                        this.Td(this.Md, this.Ld, this.Cn, this.Bn, 0.05);
                        this.Td(this.Md, this.Ld, this.Jn, this.In, 0.05);
                        this.Td(this.Md, this.Ld, this.Ln, this.Kn, 0.05);
                        this.Td(this.Md, this.Ld, this.rn, this.qn, 0.05);
                        this.Td(this.Md, this.Ld, this.dk, this.ck, 0.05);
                        this.Mn = u.gb(5, 20);
                        this.Lb[this.Md].pc(this.Ld).Qh = $.proxy(this.Kz, this);
                        this.R(this.Md,
                            this.Ld);
                        this.sk(this.ho, this.kt - this.lt, this.fo);
                        this.blink = new c;
                        this.blink.sa(this.gx);
                        this.blink.oa = g.Jb | g.mb;
                        this.blink.visible = !1;
                        this.blink.Qe(0, 0.05, e.ha.Wa, 4, [this.Zr, this.Yr, this.Zr, this.Yr]);
                        this.blink.bu(b.Si, this.blink, 0, 0, 2, 0);
                        this.blink.ya();
                        this.T(this.blink);
                        this.Tm = 3;
                        l = r.supports[m.Od];
                        this.support = q.create(r.oF || A.Fi);
                        this.support.Ua(l);
                        this.support.ya();
                        this.support.anchor = g.S;
                        l = a.y;
                        this.x = a.x * d + h;
                        this.y = l * d + f;
                        this.support.x = this.x + Math.round((r.nF || 0) * n.Gb);
                        this.support.y = this.y +
                            Math.round((this.KB || 0) * n.Gb)
                    },
                    KB: 0,
                    Kz: function(a, b, c) {
                        1 === c && (this.WB(), this.Mn--, 0 === this.Mn && (1 === u.gb(0, 1) ? this.jA() : this.kA(), this.Mn = u.gb(5, 20)))
                    },
                    WB: function() {
                        this.Tm--;
                        0 === this.Tm && (this.blink.visible = !0, this.blink.R(0), this.Tm = 3)
                    },
                    v: function() {
                        this.support.v();
                        this.h()
                    }
                })
            }(function(a, c, d, b, f, e) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.Lb = {}
                    },
                    Uw: function(a) {
                        var b = new c;
                        b.sa(a);
                        b.oa = b.anchor = e.Jb | e.mb;
                        b.ya();
                        this.width = b.L.od.x;
                        this.height = b.L.od.y;
                        this.Lb[a] = b;
                        this.T(b);
                        b.setEnabled(!1);
                        return b
                    },
                    sk: function(a, b, c) {
                        this.Lb[a].sk(b, c)
                    },
                    lc: function(a, b, c, d, e) {
                        return this.Lb[a].lc(b, c, d, e)
                    },
                    Qe: function(a, b, c, d, e, f) {
                        this.Lb[a].Qe(b, c, d, e, f)
                    },
                    jb: function(a, b, c, d, e, f, p) {
                        this.Lb[a].jb(b, c, d, e, f, p)
                    },
                    bj: function(a, b, c, d, e, f) {
                        this.Lb[a].bj(b, c, d, e, f)
                    },
                    Td: function(a, c, e, n, r) {
                        e = this.Lb[e];
                        a = this.Lb[a];
                        n = e.pc(n);
                        c = [d.create(a, b.Il, 0, c)];
                        e !== a && (c.push(d.create(a, b.Ul, 1, 1)), c.push(d.create(a, b.Si, 1, 1)), c.push(d.create(a, b.Tl, 1, 1)), c.push(d.create(e, b.Ul, 0, 0)), c.push(d.create(e, b.Si, 0, 0)), c.push(d.create(e,
                            b.Tl, 0, 0)));
                        r = f.Nh(c, r);
                        n.w(r)
                    },
                    R: function(a, b) {
                        for (var c in this.Lb) c !== a && this.Lb[c].setEnabled(!1);
                        c = this.Lb[a];
                        c.setEnabled(!0);
                        c.R(b)
                    },
                    Xj: function(a, b) {
                        var c, d;
                        for (d in this.Lb)
                            if ((c = this.Lb[d]) && c.isEnabled()) return c.Xj(a, b);
                        return !1
                    }
                })
            }(Aa, ya, Ha, ua, oa, S, ca, ja), ya, Ha, ua, oa, fa, S, U, ca, H, R, Oa, ja, Z, aa, w), w, U, H),
            fc = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u, q, A, s, z, h, C, D, J, x, E, I, w, X, G, L, B, v, F, Y, Ma, W, H, K, O, R, U, V, N, Q, M, S, T, qc, nb, Pa, P, ba, Z, ca, aa, Ca, dc, rc, sc, ec) {
                return h.extend({
                    init: function() {
                        this.h();
                        this.cc = A;
                        this.Qd = this.Rs = I.e;
                        this.Xa = new z;
                        this.Xa.visible = !1;
                        this.T(this.Xa);
                        this.zg = new z;
                        this.zg.visible = !1;
                        this.T(this.zg);
                        this.Y = new q(v.xi, q.Yc.zi);
                        this.yg = 0;
                        this.Hn = [];
                        for (var a = 0; 3 > a; a++) {
                            var b = this.Hn[a] = new w;
                            b.sa(E.Gi);
                            b.ya();
                            b.lc(0.05, X.ha.Wa, 0, 10);
                            b.sk(10, 0);
                            b.x = b.width * a;
                            b.y = 0;
                            this.T(b)
                        }
                        this.yk = G.Qa();
                        this.sj = [];
                        for (a = 0; a < I.Xc; a++) this.sj[a] = [];
                        this.cn = J.wn();
                        this.P = v.P;
                        this.ib = v.ib;
                        this.rb = 0;
                        this.Id = [];
                        this.jg = this.Rf = this.Kh = this.Jh = this.Ih = 0;
                        this.mh = Array(I.Xc);
                        this.ze = Array(I.Xc);
                        this.Ao = Array(I.Xc);
                        for (a = 0; a < I.Xc; a++) this.mh[a] = !1, this.ze[a] = G.Qa(), this.Ao[a] = G.Qa()
                    },
                    yo: function(a) {
                        var b = v.Gl;
                        return a.b.y > this.kd + v.Fl || a.b.y < b
                    },
                    WE: function() {
                        this.hide();
                        this.show()
                    },
                    vk: function() {
                        this.target.iA()
                    },
                    mu: function(a) {
                        var b = J.uh();
                        return ba.Gs(a.locale) !== b ? !0 : !1
                    },
                    show: function() {
                        this.Xa.Nt();
                        this.zg.Nt();
                        this.cc.Zm();
                        this.jg = this.Rf = 0;
                        var a = Ma.Zs[Y.Od];
                        this.Vr = D.Jd(Ma.Ys[Y.Od]);
                        this.to = a ? D.Jd(a) : this.Vr;
                        this.back = new C(1, 1);
                        this.back.mB(H.kc.NONE);
                        this.back.nB(H.kc.gv);
                        this.back.Xw(this.Vr,
                            0);
                        this.back.fill(0, 0, 1, 1, 0);
                        this.Na = null;
                        this.An = I.e;
                        this.I = 2;
                        this.se = 0;
                        this.td = null;
                        x.Vo(E.Cd);
                        this.Ga = [];
                        this.ek = [];
                        this.Xb = [];
                        this.Eb = [];
                        this.bubbles = [];
                        this.ec = [];
                        this.Zt = [];
                        this.wg = [];
                        this.Vd = [];
                        this.Af = [];
                        this.ge = [];
                        this.ah = [];
                        this.Ra = [];
                        this.ue = null;
                        this.Q = new K;
                        this.Q.sd(1);
                        this.ga = new K;
                        this.ga.sd(1);
                        this.xa = new K;
                        this.xa.sd(1);
                        this.ca = new O;
                        this.ca.sa(E.Bc);
                        this.ca.Ua(0);
                        this.ca.ya();
                        this.ca.anchor = W.S;
                        this.ca.aa = Q.copy(v.Ok);
                        this.ca.te = !1;
                        this.ca.X = this.ca.da = 0.71;
                        this.ca.Ha = 1E-4;
                        this.Mb =
                            new O;
                        this.Mb.sa(E.Bc);
                        this.Mb.Ua(1);
                        this.Mb.ya();
                        this.Mb.anchor = this.Mb.oa = W.S;
                        this.ca.T(this.Mb);
                        this.Mb.X = this.Mb.da = 0.71;
                        this.Mb.Ha = 1E-4;
                        this.cd = new O;
                        this.cd.sa(E.Bc);
                        this.cd.Ua(2);
                        this.cd.ya();
                        this.cd.anchor = this.cd.oa = W.S;
                        this.ca.T(this.cd);
                        this.cd.X = this.cd.da = 0.71;
                        this.cd.Ha = 1E-4;
                        this.xb = new w;
                        this.xb.sa(E.Bc);
                        this.xb.ya();
                        this.xb.jb(0, 0.07, X.ha.Wa, 8, 17);
                        this.xb.Qe(1, 0.3, X.ha.Wa, 2, [18, 18]);
                        a = this.xb.pc(1);
                        a.w(B.za(L.lb.copy(), B.A.LINEAR, 0));
                        a.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.2));
                        this.xb.visible = !1;
                        this.xb.anchor = this.xb.oa = W.S;
                        this.xb.X = this.xb.da = 0.71;
                        this.ca.T(this.xb);
                        this.xb.Ha = 1E-4;
                        this.ac = new w;
                        this.ac.sa(E.Pg);
                        this.ac.x = this.ca.x;
                        this.ac.y = this.ca.y;
                        this.ac.oa = this.ac.anchor = W.S;
                        this.ac.lc(0.05, X.ha.vb, 0, 12);
                        this.ac.R(0);
                        this.ca.T(this.ac);
                        this.ac.visible = !1;
                        this.ac.Ha = 1E-4;
                        for (a = 0; 3 > a; a++) {
                            var b = this.Hn[a];
                            b.yb && b.yb.stop();
                            b.Ua(0)
                        }
                        this.cz(Y.bt);
                        2 !== this.I && (this.ad = new w, this.ad.sa(E.Pg), this.ad.oa = this.ad.anchor = W.S, this.ad.lc(0.05, X.ha.vb, 0, 12), this.ad.R(0), this.Ia.T(this.ad),
                            this.ad.visible = !1, this.ad.Ha = 1E-4, this.bd = new w, this.bd.sa(E.Pg), this.bd.oa = this.bd.anchor = W.S, this.bd.lc(0.05, X.ha.vb, 0, 12), this.bd.R(0), this.Ja.T(this.bd), this.bd.visible = !1, this.bd.Ha = 1E-4);
                        for (var b = this.Ra.length, c, a = 0; a < b; a++) c = this.Ra[a], c.Vh = I.e, c.Gd = this.Ra;
                        this.HB();
                        this.yg = 0;
                        this.mc = this.bc = this.$b = null;
                        this.eo = !1;
                        this.sb = 2 !== this.I;
                        this.Qb = this.Pb = !1;
                        this.pk = this.time = 0;
                        this.dg = !0;
                        Pa.reset();
                        this.kk = this.Io = this.We = 0;
                        this.cc.Fd(this, this.Fx, null, 1);
                        a = new U;
                        a.Oo(E.Ff, Y.Od + 1 + " - " + (Y.gf +
                            1));
                        a.anchor = W.Df | W.mb;
                        a.x = 37 * v.Gb;
                        a.y = v.ab + 25 * v.Gb;
                        b = new U;
                        b.Oo(E.Ff, Z.W(ca.Xv));
                        b.anchor = W.Df | W.mb;
                        b.oa = W.Jb | W.mb;
                        b.y = 80 * v.Gb;
                        b.Rd -= b.width / 2;
                        b.X = b.da = 0.7;
                        a.T(b);
                        b = new X;
                        b.w(B.za(L.Fb.copy(), B.A.LINEAR, 0));
                        b.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.5));
                        b.w(B.za(L.lb.copy(), B.A.LINEAR, 0.5));
                        b.w(B.za(L.lb.copy(), B.A.LINEAR, 1));
                        b.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.5));
                        a.Kb(b, 0);
                        a.R(0);
                        b.cb = this.zg.Ae();
                        this.zg.T(a);
                        this.cn && this.Xt()
                    },
                    HB: function() {
                        var a = v.pb,
                            b = v.ab;
                        if (this.ld > a || this.kd > b) {
                            this.me = !0;
                            this.Cs = !1;
                            this.Y.type = q.Yc.Kf;
                            this.Y.speed = 10;
                            var c, h, d = 2 !== this.I ? this.ga : this.Q;
                            this.ld > a ? (c = d.b.x > this.ld / 2 ? 0 : this.ld - a, h = 0) : d.b.y > this.kd / 2 ? h = c = 0 : (c = 0, h = this.kd - b);
                            var e = d.b.y - b / 2,
                                a = p.Zf(d.b.x - a / 2, 0, this.ld - a),
                                b = p.Zf(e, 0, this.kd - b);
                            this.Y.moveTo(c, h, !0);
                            this.Rs = this.Y.b.Ma(new G(a, b))
                        } else this.me = !1, this.Y.moveTo(0, 0, !0)
                    },
                    Fx: function() {
                        this.xb.R(0)
                    },
                    cz: function(a) {
                        function b(a, c) {
                            for (var d = 0, e = a.length; d < e; d++)
                                for (var f = a[d], g = f.length, Za = 0; Za < g; Za++) c.call(h, f[Za])
                        }
                        var c = [],
                            h = this,
                            d;
                        for (d in a) a.hasOwnProperty(d) &&
                            c.push(a[d]);
                        b(c, function(a) {
                            switch (a.name) {
                                case s.Bq:
                                    this.dz(a);
                                    break;
                                case s.Qp:
                                    this.Yy(a);
                                    break;
                                case s.qp:
                                    this.Wy(a);
                                    break;
                                case s.rp:
                                    this.Xy(a);
                                    break;
                                case s.pp:
                                    this.Vy(a)
                            }
                        });
                        b(c, function(a) {
                            switch (a.name) {
                                case s.Up:
                                    this.$y(a);
                                    break;
                                case s.rr:
                                    this.jz(a);
                                    break;
                                case s.Jr:
                                    this.lz(a);
                                    break;
                                case s.Gm:
                                case s.wr:
                                case s.xr:
                                case s.yr:
                                case s.zr:
                                case s.Ar:
                                case s.Br:
                                case s.Cr:
                                case s.Dr:
                                case s.Er:
                                case s.Fr:
                                case s.Gr:
                                case s.Hr:
                                case s.Ir:
                                    this.kz(a);
                                    break;
                                case s.mp:
                                    this.Uy(a);
                                    break;
                                case s.Iq:
                                    this.fz(a);
                                    break;
                                case s.mr:
                                    this.hz(a);
                                    break;
                                case s.nr:
                                case s.or:
                                case s.pr:
                                case s.qr:
                                case s.Vk:
                                    this.iz(a);
                                    break;
                                case s.Pq:
                                    this.gz(a);
                                    break;
                                case s.jp:
                                case s.kp:
                                    this.Ty(a);
                                    break;
                                case s.Sp:
                                    this.Zy(a);
                                    break;
                                case s.ur:
                                    this.target = new ec;
                                    this.target.ih(a, this.P, this.rb, this.ib);
                                    this.$m = !1;
                                    J.vk && (this.cc.Fd(this, this.vk, null, 2), J.vk = !1);
                                    break;
                                case s.al:
                                case s.Vp:
                                case s.Wp:
                                    this.az(a)
                            }
                        })
                    },
                    dz: function(a) {
                        this.ld = a.width;
                        this.kd = a.height;
                        this.rb = (v.pb - this.ld * this.P) / 2;
                        this.ld *= this.P;
                        this.kd *= this.P;
                        Ma.vB[Y.Od] && (this.ld > v.pb && this.Id.push(new P(v.pb,
                            0)), this.kd > v.ab && this.Id.push(new P(0, v.ab)), this.Id.push(new P(0, 0)))
                    },
                    Yy: function(a) {
                        this.O = a.O || 0;
                        this.$ = a.$;
                        this.vz = a.vz;
                        this.I = a.I ? 0 : 2;
                        this.$ *= v.Hl
                    },
                    Zy: function(a) {
                        var b = a.x * this.P + this.rb,
                            c = a.y * this.P + this.ib,
                            h = a.length * this.P,
                            d = a.n,
                            f = a.m,
                            g = a.kg,
                            k = a.pe,
                            l = a.q * this.P || -1,
                            p = a.u,
                            m = a.t * this.P || 0,
                            n = a.c,
                            q = "L" === a.H,
                            r = a.wh,
                            D = a.G,
                            x = new e;
                        x.x = b;
                        x.y = c;
                        x.m = f;
                        x.G = D;
                        x.kg = g;
                        x.pe = k;
                        x.qB(n);
                        x.nf(a);
                        if (x.Pa && (x.TA(), !r)) {
                            a = "R" === a.path[0];
                            this.ue || (this.ue = new aa);
                            f = 0;
                            for (g = x.Pa.path.length - 1; f < g; f++) a && 0 !==
                                f % 3 || this.ue.Ds(f, f + 1, x);
                            2 < x.Pa.path.length && this.ue.Ds(0, x.Pa.path.length - 1, x)
                        }
                        d !== I.e && (d *= this.P);
                        d !== I.e || D || (D = this.Q, 2 !== this.I && (D = q ? this.ga : this.xa), b = new V(null, b, c, D, D.b.x, D.b.y, h), b.Ya.Mc.qa(b.Ya.b), x.ku(b), this.Sm());
                        x.lB(d);
                        x.fB(l, p, m);
                        this.Ga.push(x)
                    },
                    Wy: function(a) {
                        this.ga.b.x = a.x * this.P + this.rb;
                        this.ga.b.y = a.y * this.P + this.ib;
                        this.Ia = new O;
                        this.Ia.sa(E.Bc);
                        this.Ia.Ua(19);
                        this.Ia.X = this.Ia.da = 0.71;
                        this.Ia.te = !1;
                        this.Ia.ya();
                        this.Ia.anchor = W.S;
                        this.Ia.x = this.ga.b.x;
                        this.Ia.y = this.ga.b.y;
                        this.Ia.aa = Q.copy(v.yi)
                    },
                    Xy: function(a) {
                        this.xa.b.x = a.x * this.P + this.rb;
                        this.xa.b.y = a.y * this.P + this.ib;
                        this.Ja = new O;
                        this.Ja.sa(E.Bc);
                        this.Ja.Ua(20);
                        this.Ja.X = this.Ja.da = 0.71;
                        this.Ja.te = !1;
                        this.Ja.ya();
                        this.Ja.anchor = W.S;
                        this.Ja.x = this.xa.b.x;
                        this.Ja.y = this.xa.b.y;
                        this.Ja.aa = Q.copy(v.yi)
                    },
                    Vy: function(a) {
                        this.Q.b.x = a.x * this.P + this.rb;
                        this.Q.b.y = a.y * this.P + this.ib
                    },
                    $y: function(a) {
                        this.Na = new nb;
                        this.Na.Cb = $.proxy(this.Cb, this);
                        this.Na.visible = !1;
                        this.Na.Yb = !1;
                        this.T(this.Na);
                        this.Na.x = a.x * this.P + this.rb;
                        this.Na.y = a.y * this.P + this.ib;
                        this.Na.anchor = W.S
                    },
                    jz: function(a) {
                        var b = new r;
                        b.sa(E.Wc);
                        b.x = a.x * this.P + this.rb;
                        b.y = a.y * this.P + this.ib;
                        b.timeout = a.timeout;
                        b.ih();
                        b.aa = Q.copy(v.xm);
                        b.nf(a);
                        b.update(0);
                        this.Eb.push(b)
                    },
                    lz: function(a) {
                        if (!this.mu(a))
                            if (null == a.text || "" === a.text) Ca.debug("Missing tutorial text");
                            else {
                                var b = new m;
                                b.x = a.x * this.P + this.rb;
                                b.y = a.y * this.P + this.ib;
                                b.O = a.O || 0;
                                b.align = W.Tb;
                                b.Oo(E.Kg, a.text, Math.ceil(a.width * this.P), W.Tb);
                                b.color = L.Fb.copy();
                                a = new X;
                                var c = 0 === Y.Od && 0 === Y.gf;
                                a.w(B.za(L.Fb.copy(),
                                    B.A.LINEAR, 0));
                                a.w(B.za(L.lb.copy(), B.A.LINEAR, 1));
                                a.w(B.za(L.lb.copy(), B.A.LINEAR, c ? 10 : 5));
                                a.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.5));
                                b.Kb(a, 0);
                                0 === b.O && b.R(0);
                                this.Af.push(b)
                            }
                    },
                    kz: function(a) {
                        if (!this.mu(a)) {
                            var b = a.name - s.Gm,
                                c = new R;
                            c.sa(E.vl);
                            c.Ua(b);
                            c.color = L.Fb.copy();
                            c.x = a.x * this.P + this.rb;
                            c.y = a.y * this.P + this.ib;
                            c.rotation = a.a || 0;
                            c.O = a.O || 0;
                            c.nf(a);
                            a = new X;
                            a.w(B.za(L.Fb.copy(), B.A.LINEAR, 0));
                            a.w(B.za(L.lb.copy(), B.A.LINEAR, 1));
                            0 === Y.Od && 0 === Y.gf ? a.w(B.za(L.lb.copy(), B.A.LINEAR, 10)) : a.w(B.za(L.lb.copy(),
                                B.A.LINEAR, 5.2));
                            a.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.5));
                            c.Kb(a, 0);
                            0 === c.O ? c.R(0) : 2 === c.O && (a = new X, a.w(B.za(L.Fb.copy(), B.A.LINEAR, 0)), a.w(B.za(L.lb.copy(), B.A.LINEAR, 0.5)), a.w(B.za(L.lb.copy(), B.A.LINEAR, 1)), a.w(B.za(L.lb.copy(), B.A.LINEAR, 1.1)), a.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.5)), a.w(B.Oa(c.x, c.y, B.A.LINEAR, 0)), a.w(B.Oa(c.x, c.y, B.A.LINEAR, 0.5)), a.w(B.Oa(c.x, c.y, B.A.LINEAR, 1)), a.w(B.Oa(c.x + v.Hm, c.y, B.A.LINEAR, 0.5)), a.w(B.Oa(c.x + v.Im, c.y, B.A.LINEAR, 0.5)), a.jf = 2, a.Jj = X.ha.vb, c.Kb(a, 1), c.R(1));
                            this.Vd.push(c)
                        }
                    },
                    az: function(a) {
                        var c = a.name - s.al,
                            h = a.ln - 1;
                        Ma.Cx || (c = new b(c, h), c.x = a.x * this.P + this.rb, c.y = a.y * this.P + this.ib, c.rotation = a.a || 0, this.ge.push(c))
                    },
                    Uy: function(a) {
                        var b = p.gb(1, 3),
                            h = new c;
                        h.sa(E.Hi);
                        h.Ua(b);
                        h.ya();
                        h.aa = Q.copy(v.Jk);
                        h.x = a.x * this.P + this.rb;
                        h.y = a.y * this.P + this.ib;
                        h.anchor = W.S;
                        h.zo = !1;
                        a = new S;
                        a.sa(E.Hi);
                        a.Ua(0);
                        a.ya();
                        a.oa = a.anchor = W.S;
                        h.T(a);
                        this.bubbles.push(h)
                    },
                    fz: function(a) {
                        var b = new g;
                        b.sa(E.Li);
                        b.ya();
                        b.Tw(0.05, X.ha.Wa, 4, [1, 2, 3, 0]);
                        b.aa = Q.copy(v.Nl);
                        b.x = a.x * this.P + this.rb;
                        b.y = a.y *
                            this.P + this.ib;
                        b.rotation = a.a + 90;
                        b.Sb();
                        b.anchor = W.S;
                        this.ec.push(b)
                    },
                    hz: function(a) {
                        var b = new l;
                        b.sa(E.If);
                        b.X = b.da = 0.7;
                        b.ih();
                        b.ya();
                        b.x = a.x * this.P + this.rb;
                        b.y = a.y * this.P + this.ib;
                        b.group = a.group;
                        b.anchor = W.Jb | W.Tb;
                        b.ug -= b.height / 2 - 25;
                        b.Ua(0 === b.group ? l.Lf.zv : l.Lf.Av);
                        b.state = l.Z.IDLE;
                        b.nf(a);
                        b.rotation += 90;
                        b.Pa && (b.Pa.a += 90);
                        b.Sb();
                        this.wg.push(b)
                    },
                    iz: function(a) {
                        var b = !1 === a.yf ? I.e : a.yf || I.e,
                            c = new n(a.x * this.P + this.rb, a.y * this.P + this.ib, a.size, parseFloat(a.a) || 0, b);
                        c.nf(a);
                        b && (c.tt = $.proxy(this.IA,
                            this));
                        a.name === s.Vk ? (c.ph = !0, c.Bj = a.Bj, c.Rj = a.Rj, c.Qj = a.Qj, c.Hc = 0, c.Su(), c.Hc += c.Bj, c.Sb()) : c.ph = !1;
                        this.Xb.push(c)
                    },
                    gz: function(a) {
                        var b = a.x * this.P + this.rb,
                            c = a.y * this.P + this.ib,
                            h = a.size,
                            d = parseFloat(a.tE) || 0,
                            e = N.dc(d);
                        a = a.JE;
                        var f = new dc;
                        f.anchor = W.S;
                        f.x = b;
                        f.y = c;
                        f.rotation = d;
                        f.eg = new G(f.x - h * this.P, f.y);
                        f.jd = new G(f.x + h * this.P, f.y);
                        f.eg.pa(e, f.x, f.y);
                        f.jd.pa(e, f.x, f.y);
                        f.setSize(h);
                        f.eu(a);
                        this.Ra.push(f)
                    },
                    Ty: function(b) {
                        var c = new a(b.x * this.P + this.rb, b.y * this.P + this.ib, b.size, b.a);
                        c.nf(b);
                        this.ah.push(c)
                    },
                    Pz: function(a) {
                        a.element.yA = !0
                    },
                    update: function(a) {
                        function b(c) {
                            c.Rm(new G(-c.yc.x / Y, -c.yc.y / Y + F), a)
                        }

                        function c(a, b) {
                            return Q.hf(a.Fa.x, a.Fa.y, a.Ka.x, a.Ka.y, b.b.x - z, b.b.y - z, J, J) || Q.hf(a.Aa.x, a.Aa.y, a.Ba.x, a.Ba.y, b.b.x - z, b.b.y - z, J, J)
                        }
                        var h, e;
                        h = 0;
                        for (e = this.ge.length; h < e; h++) this.ge[h].update(a);
                        this.h(a);
                        this.cc.update(a);
                        this.ue && this.ue.update(a);
                        for (h = 0; h < I.Xc; h++)
                            for (var f = this.sj[h], g = f.length, k = 0; k < g;) {
                                var m = f[k];
                                e = u.md(m.color.B, 0, 10, a);
                                m.color.B = e.value;
                                e.pd ? (f.splice(k, 1), g--) : k++
                            }
                        h = 0;
                        for (e =
                            this.Id.length; h < e; h++) this.Id[h].update(a);
                        this.kk = u.kf(this.kk, 0, 1, a);
                        0 === this.Rf && (this.jg += a, 30 < this.jg && (this.jg = 0));
                        h = v.pb;
                        f = v.ab;
                        g = 2 != this.I ? this.ga : this.Q;
                        e = g.b.y - f / 2;
                        h = p.Zf(g.b.x - h / 2, 0, this.ld - h);
                        f = p.Zf(e, 0, this.kd - f);
                        this.Y.moveTo(h, f, !1);
                        this.cy && this.Y.type === q.Yc.zi || this.Y.update(a);
                        if (this.Y.type === q.Yc.Kf) {
                            e = v.bl;
                            var g = v.Ll,
                                k = v.Ml,
                                m = v.Al,
                                n = v.Bl,
                                r = this.Y.b.Ma(new G(h, f));
                            r < e && (this.me = !1);
                            this.Cs ? this.Y.speed < v.Nk && (this.Y.speed *= 1.5) : r > this.Rs / 2 ? (this.Y.speed += a * g, this.Y.speed = Math.min(m,
                                this.Y.speed)) : (this.Y.speed -= a * k, this.Y.speed = Math.max(n, this.Y.speed));
                            1 > Math.abs(this.Y.b.x - h) && 1 > Math.abs(this.Y.b.y - f) && (this.Y.type = q.Yc.zi, this.Y.speed = v.xi)
                        } else this.time += a;
                        f = this.Ga.length;
                        if (0 < f) {
                            m = k = e = !1;
                            for (h = 0; h < f; h++) {
                                var s = this.Ga[h];
                                s.update(a);
                                g = s.ta;
                                s.Pa && g && (g.Ya.b.x = s.x, g.Ya.b.y = s.y, g.Ya.Mc.qa(g.Ya.b));
                                if (g) {
                                    if (g.zb !== I.e && 0 === g.de) {
                                        s.rs();
                                        continue
                                    }
                                    g.update(a * this.$);
                                    if (s.Ic && (this.Y.type == q.Yc.Kf && this.me || s.dC(a), s.tf === I.e)) {
                                        this.FB(s);
                                        break
                                    }
                                }
                                if (s.n !== I.e && !s.ta) {
                                    var B = v.zm,
                                        n = $.proxy(function(a) {
                                            (new G(s.x, s.y)).Ma(a.b) <= s.n + B && (a = new V(null, s.x, s.y, a, a.b.x, a.b.y, s.n + B), a.Ya.Mc.qa(a.Ya.b), s.xh = !0, s.ku(a), this.Sm(), x.N(E.km), s.Pa && x.N(E.Ti))
                                        }, this);
                                    2 !== this.I ? (this.Pb || n(this.ga), this.Qb || null != s.ta || n(this.xa)) : n(this.Q)
                                }
                                if (g) {
                                    var r = g.Ya,
                                        n = g.Ca[g.Ca.length - 1],
                                        r = G.$a(r.b, n.b),
                                        C = !1;
                                    e || (2 !== this.I ? n !== this.ga || this.Pb || k ? n !== this.xa || this.Qb || m || (C = !0) : C = !0 : this.sb || e || (C = !0));
                                    0 !== g.Fo && g.zb === I.e && C ? (r = N.Bg(r.og()), 2 !== this.I ? (C = n === this.ga ? this.Ia : this.Ja, g.hh || (g.oe =
                                        C.rotation - r), n === this.ga ? (this.Jh = r + g.oe - C.rotation, k = !0) : (this.Kh = r + g.oe - C.rotation, m = !0), C.rotation = r + g.oe) : (g.hh || (g.oe = this.Mb.rotation - r), this.Ih = r + g.oe - this.Mb.rotation, this.Mb.rotation = r + g.oe, e = !0), g.hh = !0) : g.hh = !1
                                }
                            }
                            2 !== this.I ? (k || this.Pb || (this.Ia.rotation += Math.min(5, this.Jh), this.Jh *= 0.98), m || this.Qb || (this.Ja.rotation += Math.min(5, this.Kh), this.Kh *= 0.98)) : e || this.sb || (this.Mb.rotation += Math.min(5, this.Ih), this.Ih *= 0.98)
                        }
                        this.sb || (this.ca.update(a), this.Q.update(a * this.$));
                        if (2 !== this.I) {
                            h =
                                a * this.$;
                            this.Ia.update(a);
                            this.ga.update(h);
                            this.Ja.update(a);
                            this.xa.update(h);
                            if (1 === this.I)
                                for (h = 0; h < V.kv; h++) this.ga.ok(), this.xa.ok();
                            if (0 < this.se)
                                if (e = u.md(this.se, 0, 200, a), this.se = e.value, e.pd) {
                                    x.N(E.$l);
                                    this.I = 2;
                                    this.sb = !1;
                                    this.Qb = this.Pb = !0;
                                    if (this.bc || this.mc) this.$b = this.bc ? this.bc : this.mc, this.ac.visible = !0;
                                    this.Kh = this.Jh = this.Ih = 0;
                                    this.Q.b.x = this.ga.b.x;
                                    this.Q.b.y = this.ga.b.y;
                                    this.ca.x = this.Q.b.x;
                                    this.ca.y = this.Q.b.y;
                                    this.ca.dh();
                                    h = G.$a(this.ga.b, this.ga.va);
                                    e = G.$a(this.xa.b, this.xa.va);
                                    h = new G((h.x + e.x) / 2, (h.y + e.y) / 2);
                                    this.Q.va.qa(this.Q.b);
                                    this.Q.va.$a(h);
                                    h = 0;
                                    for (e = this.Ga.length; h < e; h++) s = this.Ga[h], !(g = s.ta) || g.zb === g.Ca.length - 3 || g.hb !== this.ga && g.hb !== this.xa || (r = g.Ca[g.Ca.length - 2], k = g.hb.rd(r), this.Q.Re(r, k, T.Ai), g.hb = this.Q, g.Ca[g.Ca.length - 1] = this.Q, g.oe = 0, g.hh = !1);
                                    h = new w;
                                    h.sa(E.Bc);
                                    h.ya();
                                    h.x = this.ca.x;
                                    h.y = this.ca.y;
                                    h.anchor = W.S;
                                    r = h.lc(0.05, X.ha.Wa, 21, 25);
                                    h.pc(r).cb = this.Xa.Ae();
                                    h.R(0);
                                    this.Xa.T(h)
                                } else this.ga.ej(this.xa, this.se), this.xa.ej(this.ga, this.se);
                            this.Pb ||
                                this.Qb || 0 !== this.I || !O.Ch(this.Ia, this.Ja) || (this.I = 1, this.se = this.ga.b.Ma(this.xa.b), this.ga.Re(this.xa, this.se, T.Pi), this.xa.Re(this.ga, this.se, T.Pi))
                        }
                        this.target.update(a);
                        if (this.Y.type !== q.Yc.Kf || !this.me)
                            for (h = 0, e = this.Eb.length; h < e; h++)
                                if (k = this.Eb[h], k.update(a), 0 < k.timeout && 0 === k.time) {
                                    k.pc(1).cb = this.Xa.Ae();
                                    this.Xa.T(k);
                                    this.Eb.splice(h, 1);
                                    k.xc.R(1);
                                    k.R(1);
                                    break
                                } else if (g = !1, g = 2 !== this.I ? O.Ch(this.Ia, k) && !this.Pb || O.Ch(this.Ja, k) && !this.Qb : O.Ch(this.ca, k) && !this.sb) {
                            this.xb.R(1);
                            this.yg++;
                            this.Hn[this.yg - 1].R(0);
                            e = new w;
                            e.sa(E.ul);
                            e.ya();
                            e.x = k.x;
                            e.y = k.y;
                            e.anchor = W.S;
                            g = e.lc(0.05, X.ha.Wa, 0, 12);
                            e.pc(g).cb = this.Xa.Ae();
                            e.R(0);
                            this.Xa.T(e);
                            this.Eb.splice(h, 1);
                            x.N(E.qm + this.yg - 1);
                            this.target.Ly() && this.target.gA();
                            break
                        }
                        h = 0;
                        for (e = this.bubbles.length; h < e; h++) {
                            g = this.bubbles[h];
                            g.update(a);
                            if (!g.zo)
                                if (2 != this.I) {
                                    if (!this.Pb && this.Qn(g, this.Ia, this.bc, this.ad)) {
                                        this.bc = g;
                                        break
                                    }
                                    if (!this.Qb && this.Qn(g, this.Ja, this.mc, this.bd)) {
                                        this.mc = g;
                                        break
                                    }
                                } else if (!this.sb && this.Qn(g, this.ca, this.$b, this.ac)) {
                                this.$b =
                                    g;
                                break
                            }
                            if (!g.ep)
                                for (n = this.Ra.length, m = 0; m < n; m++) k = this.Ra[m], G.Ma(g.x, g.y, k.x, k.y) < k.Rb && (g.ep = !0)
                        }
                        h = 0;
                        for (e = this.Af.length; h < e; h++) g = this.Af[h], g.update(a);
                        h = 0;
                        for (e = this.Vd.length; h < e; h++) g = this.Vd[h], g.update(a);
                        n = -1;
                        h = 0;
                        for (e = this.Ra.length; h < e; h++) {
                            k = this.Ra[h];
                            for (m = 0; m < f; m++) s = this.Ga[m], g = k.Fc.indexOf(s), r = G.Ma(s.x, s.y, k.x, k.y), r <= k.Rb + 5 * this.P ? 0 > g && k.Fc.push(s) : 0 <= g && k.Fc.splice(s, 1);
                            C = this.bubbles.length;
                            for (m = 0; m < C; m++) {
                                var g = this.bubbles[m],
                                    r = G.Ma(g.x, g.y, k.x, k.y),
                                    A = k.Fc.indexOf(g);
                                r <= k.Rb + 10 * this.P ? 0 > A && k.Fc.push(g) : 0 <= A && k.Fc.splice(g, 1)
                            }
                            k.yA && (n = h);
                            k.update(a)
                        }
                        0 <= n && this.Ra.splice(n, 1);
                        h = 0;
                        for (e = this.Zt.length; h < e; h++) f = this.Zt[h], f.update(a);
                        h = 0;
                        for (e = this.wg.length; h < e; h++)
                            if (k = this.wg[h], k.update(a), f = u.md(k.yj, 0, 1, a), k.yj = f.value, f.pd && (k.state = l.Z.IDLE), g = k.rotation, k.rotation = 0, k.Sb(), f = this.Q.tc.copy(), f.rotate(N.dc(-g)), k.rotation = g, k.Sb(), g = this.Q.b.x - v.Wg, m = this.Q.b.y - v.Wg, r = n = 2 * v.Wg, 0 <= f.y && (Q.hf(k.Fa.x, k.Fa.y, k.Ka.x, k.Ka.y, g, m, n, r) || Q.hf(k.Aa.x, k.Aa.y, k.Ba.x,
                                k.Ba.y, g, m, n, r))) {
                                if (k.state === l.Z.IDLE) {
                                    for (m = 0; m < e; m++)
                                        if (h = this.wg[m], h !== k && h.group === k.group) {
                                            k.state = l.Z.nw;
                                            h.state = l.Z.Iw;
                                            this.gk(!1);
                                            this.OA = 0.9 * this.Q.yc.hd() * v.Hl;
                                            this.td = h;
                                            k.Ob.R(0);
                                            k.Ob.visible = !0;
                                            x.N(E.Vg);
                                            this.cc.Fd(this, this.LB, null, 0.1);
                                            break
                                        }
                                    break
                                }
                            } else k.state !== l.Z.IDLE && 0 === k.yj && (k.yj = l.tv);
                        h = 0;
                        for (e = this.ec.length; h < e; h++) g = this.ec[h], g.update(a), f = u.md(g.ni, 0, 1, a), g.ni = f.value, f.pd && this.Xz(g, a);
                        h = 0;
                        for (e = this.ek.length; h < e; h++) f = this.ek[h], f.update(a), this.zb(f, null, null, !1);
                        var z = v.Am,
                            J = 2 * z;
                        h = 0;
                        for (e = this.Xb.length; h < e; h++)
                            if (k = this.Xb[h], k.update(a), !k.ph || k.mj)
                                if (f = g = !1, 2 !== this.I ? (g = !this.Pb && c(k, this.ga)) ? f = !0 : g = !this.Qb && c(k, this.xa) : g = !this.sb && c(k, this.Q), g) {
                                    2 !== this.I ? f ? this.bc && this.rg(!0) : this.mc && this.rg(!1) : this.$b && this.rg(!1);
                                    h = D.Jd(E.Bc);
                                    g = new d(5, h);
                                    this.Na && !this.dg && (g.Kd.y = -500, g.a = 90);
                                    g.cb = this.Xa.zt();
                                    2 != this.I ? f ? (g.x = this.Ia.x, g.y = this.Ia.y, this.Pb = !0) : (g.x = this.Ja.x, g.y = this.Ja.y, this.Qb = !0) : (g.x = this.ca.x, g.y = this.ca.y, this.sb = !0);
                                    g.zu(5);
                                    this.Xa.T(g);
                                    x.N(E.Zl);
                                    this.gk(f);
                                    0 !== this.Qd && this.cc.Fd(this, this.vn, null, 0.3);
                                    return
                                }
                        var L = v.Ik,
                            Ca = 2 * L,
                            c = function(a, b) {
                                return Q.hf(a.Fa.x, a.Fa.y, a.Ka.x, a.Ka.y, b.b.x - L, b.b.y - L, Ca, Ca) || Q.hf(a.Aa.x, a.Aa.y, a.Ba.x, a.Ba.y, b.b.x - L, b.b.y - L, Ca, Ca)
                            };
                        h = 0;
                        for (e = this.ah.length; h < e; h++) k = this.ah[h], k.update(a), f = g = !1, 2 !== this.I ? (g = !this.Pb && c(k, this.ga)) ? f = !0 : g = !this.Qb && c(k, this.xa) : g = !this.sb && c(k, this.Q), g ? 2 !== this.I ? f ? this.Dn(k, this.ga, a) : this.Dn(k, this.xa, a) : this.Dn(k, this.Q, a) : k.vu = !1;
                        var F = v.op * (this.Na && !this.dg ?
                                -1 : 1),
                            Y = v.np;
                        0 === this.I && (this.bc && b(this.ga), this.mc && b(this.xa));
                        if (1 === this.I) {
                            if (this.bc || this.mc) b(this.ga), b(this.xa)
                        } else this.$b && b(this.Q); if (!this.sb && (f = v.Dl, this.eo ? 0 < this.Oh && (this.Oh = u.kf(this.Oh, 0, 1, a), 0 >= this.Oh && (h = new G(this.target.x, this.target.y), this.Q.b.Ma(h) > f ? (this.eo = !1, this.target.mA(), x.N(E.em)) : this.Oh = 1)) : (h = new G(this.target.x, this.target.y), this.Q.b.Ma(h) < f && (this.eo = !0, this.target.nA(), x.N(E.fm), this.Oh = 1)), 0 !== this.Qd && !this.$m && this.Rx(this.ca, this.Mb, this.cd, this.$b,
                            this.target, this.Q))) {
                            this.sb = this.$m = !0;
                            this.ey();
                            return
                        }
                        h = 2 === this.I && this.yo(this.Q) && !this.sb;
                        f = 2 !== this.I && this.yo(this.ga) && !this.Pb;
                        e = 2 !== this.I && this.yo(this.xa) && !this.Qb;
                        if (h || f || e)
                            if (h && (this.sb = !0), f && (this.Pb = !0), e && (this.Qb = !0), 0 !== this.Qd) {
                                if (2 != this.I && this.Pb && this.Qb) return;
                                this.vn();
                                return
                            }
                        if (0 !== this.O && 1 === this.O && !this.sb && null != this.$b && this.ca.y < v.Qk && this.ca.x > v.Pk) {
                            h = this.O = 0;
                            for (e = this.Af.length; h < e; h++) g = this.Af[h], 1 === g.O && g.R(0);
                            h = 0;
                            for (e = this.Vd.length; h < e; h++) g = this.Vd[h],
                                1 === g.O && g.R(0)
                        }
                        if (this.cn && !this.me && (this.Xt(), h = new G(0, 0), f = G.add(this.yk, this.Y.b), g = (h = this.Js(h, f.x, f.y)) ? h.ta : null)) {
                            m = !1;
                            this.Na && this.Na.fb(this.Na.Vn() ? 1 : 0).cf(f.x, f.y, !0) && (m = !0);
                            if (this.$b || 2 != this.I && (this.bc || this.mc))
                                for (h = 0, e = this.bubbles.length; h < e; h++) {
                                    k = this.bubbles[h];
                                    k = v.Kk;
                                    n = 2 * k;
                                    if (this.$b && Q.Db(f.x, f.y, this.Q.b.x - k, this.Q.b.y - k, n, n)) {
                                        m = !0;
                                        break
                                    }
                                    if (this.bc && Q.Db(f.x, f.y, this.ga.b.x - k, this.ga.b.y - k, n, n)) {
                                        m = !0;
                                        break
                                    }
                                    if (this.mc && Q.Db(f.x, f.y, this.xa.b.x - k, this.xa.b.y - k, n, n)) {
                                        m = !0;
                                        break
                                    }
                                }
                            h = 0;
                            for (e = this.Xb.length; h < e; h++) k = this.Xb[h], k.Wb && k.Wb.cf(f.x, f.y, !0) && (m = !0);
                            h = 0;
                            for (e = this.ec.length; h < e; h++)
                                if (this.ec[h].xo(f.x, f.y)) {
                                    m = !0;
                                    break
                                }
                            h = 0;
                            for (e = this.Ra.length; h < e; h++) {
                                k = this.Ra[h];
                                if (k.zc.visible || k.Ac.visible) {
                                    m = !0;
                                    break
                                }
                                if (G.Ma(f.x, f.y, k.jd.x, k.jd.y) <= v.Zd || G.Ma(f.x, f.y, k.jd.x, k.jd.y) <= v.Zd) {
                                    m = !0;
                                    break
                                }
                            }
                            h = 0;
                            for (e = this.Ga.length; h < e; h++) {
                                s = this.Ga[h];
                                if (s.m && Q.Db(f.x, f.y, s.x - v.Vc, s.y - v.Vc, 2 * v.Vc, 2 * v.Vc)) {
                                    m = !0;
                                    break
                                }
                                if (0 < s.q && (Q.Db(f.x, f.y, s.x - v.He, s.y - v.He, 2 * v.He, 2 * v.He) ||
                                    s.lf !== I.e)) {
                                    m = !0;
                                    break
                                }
                            }
                            m || (g.highlighted = !0)
                        }
                        e = u.md(this.We, 0, 1, a);
                        this.We = e.value;
                        e.pd && (0 === this.Qd ? (this.Qd = 1, this.hide(), this.show(), this.We = I.Uk) : this.Qd = I.e)
                    },
                    Qn: function(a, b, c, h) {
                        var d = v.Lk,
                            e = 2 * d;
                        return Q.Db(b.x, b.y, a.x - d, a.y - d, e, e) ? (c && this.Zj(a.x, a.y), h.visible = !0, x.N(E.Wl), a.zo = !0, a.Ot(0), this.Sm(), !0) : !1
                    },
                    Rx: function(a, b, c, h, d, e) {
                        return O.Ch(a, d) ? (d.pA(), x.N(d.ks), h && (a === this.SD ? this.SE() : this.rg(!1)), this.gk(e), a.te = !0, b.X = b.da = 1, c.X = c.da = 1, b = new X, b.w(B.Oa(a.x, a.y, B.A.LINEAR, 0)), b.w(B.Oa(d.x,
                            d.y + 10, B.A.LINEAR, 0.1)), b.w(B.Kj(0.71, 0.71, B.A.LINEAR, 0)), b.w(B.Kj(0, 0, B.A.LINEAR, 0.1)), b.w(B.za(L.lb.copy(), B.A.LINEAR, 0)), b.w(B.za(L.Fb.copy(), B.A.LINEAR, 0.1)), a.Kb(b, 0), a.R(0), b.cb = this.Xa.Ae(), this.Xa.T(a), !0) : !1
                    },
                    LB: function() {
                        if (this.td) {
                            this.td.Ob.R(0);
                            this.td.Ob.visible = !0;
                            var a = new G(0, v.vm);
                            a.rotate(N.dc(this.td.rotation));
                            this.Q.b.x = this.td.x;
                            this.Q.b.y = this.td.y;
                            this.Q.b.add(a);
                            this.Q.va.qa(this.Q.b);
                            this.Q.yc.x = 0;
                            this.Q.yc.y = -1;
                            this.Q.yc.rotate(N.dc(this.td.rotation));
                            this.Q.yc.multiply(this.OA);
                            this.Q.tc.qa(this.Q.yc);
                            this.Q.tc.jn(60);
                            this.Q.va.qa(this.Q.b);
                            this.Q.va.$a(this.Q.tc);
                            this.td = null
                        }
                    },
                    $w: function() {
                        this.Qd = 0;
                        this.We = I.Uk
                    },
                    Jy: function() {
                        return 0 === this.Qd
                    },
                    gk: function(a) {
                        for (var b = 0, c = this.Ga.length; b < c; b++) {
                            var h = this.Ga[b],
                                d = h.ta;
                            d && (d.hb === this.Q || d.hb === this.ga && a || d.hb === this.xa && !a) && (d.zb === I.e ? (d.Ko(d.Ca.length - 2), this.gj()) : d.Ps = !0, h.Ic && h.xg && this.So(h))
                        }
                    },
                    Sm: function() {
                        this.Rf += 1
                    },
                    gj: function() {
                        this.Rf -= 1;
                        this.jg = 0
                    },
                    nx: function() {
                        this.mi = 100 * Math.max(0, 30 - this.time);
                        this.mi /= 10;
                        this.mi *= 10;
                        this.GB = 1E3 * this.yg;
                        this.pk = Math.ceil(this.mi + this.GB)
                    },
                    ey: function() {
                        this.cc.Zm();
                        this.$b && this.rg(!1);
                        this.nx();
                        this.gk(!1);
                        var a = this;
                        J.qu && this.cc.Fd(this, function() {
                            F.ra(F.r.zl, {
                                Eb: a.yg,
                                time: a.time,
                                pk: a.pk,
                                Es: 1 / a.sh.Ec
                            })
                        }, null, 1);
                        this.cc.Fd(this, function() {
                            x.Vo(E.Cd)
                        }, null, 1.5);
                        this.cc.Fd(this, function() {
                            this.sh.mo.call(this.sh)
                        }, null, 1.8)
                    },
                    vn: function() {
                        this.cc.Zm();
                        this.target.hA();
                        x.N(E.gm);
                        this.cc.Fd(this, function() {
                                this.sh.Lz.call(this.sh);
                                F.ra(F.r.cw, {
                                    time: this.time
                                })
                            },
                            null, 1)
                    },
                    v: function() {
                        var a = M.context;
                        a.setTransform(1, 0, 0, 1, 0, 0);
                        a.clearRect(0, 0, v.pb, v.ab);
                        this.vc();
                        this.Y.bx();
                        this.back.$u(this.Y.b);
                        this.back.v();
                        var b, c;
                        this.kd > v.ab && (c = this.to.p[0].y, b = this.to.f[0], a.drawImage(this.to.qc, b.x, b.y + 2, b.M, b.U - 4, 0, c + 2, b.M, b.U - 4));
                        a = 0;
                        for (b = this.ge.length; a < b; a++) this.ge[a].v();
                        a = 0;
                        for (b = this.Id.length; a < b; a++) this.Id[a].v();
                        this.ue && this.ue.v();
                        this.Na && this.Na.v();
                        this.target.v();
                        a = 0;
                        for (b = this.Af.length; a < b; a++) this.Af[a].v();
                        a = 0;
                        for (b = this.Vd.length; a < b; a++) c =
                            this.Vd[a], 2 !== c.O && c.v();
                        a = 0;
                        for (b = this.ek.length; a < b; a++) this.ek[a].v();
                        a = 0;
                        for (b = this.Ra.length; a < b; a++) this.Ra[a].v();
                        a = 0;
                        for (b = this.bubbles.length; a < b; a++) this.bubbles[a].v();
                        a = 0;
                        for (b = this.ec.length; a < b; a++) this.ec[a].v();
                        a = 0;
                        for (b = this.Xb.length; a < b; a++) this.Xb[a].v();
                        a = 0;
                        for (b = this.ah.length; a < b; a++) this.ah[a].v();
                        a = 0;
                        for (b = this.wg.length; a < b; a++) c = this.wg[a], c.y -= 25, c.v(), c.y += 25;
                        c = this.Ga;
                        a = 0;
                        for (b = c.length; a < b; a++) c[a].Hx();
                        for (a = 0; a < b; a++) c[a].v();
                        a = 0;
                        for (b = this.Eb.length; a < b; a++) this.Eb[a].v();
                        this.sb || this.td || (this.ca.x = this.Q.b.x, this.ca.y = this.Q.b.y, this.ca.v(), null != this.xb.yb && this.xb.v());
                        2 !== this.I && (this.Pb || (this.Ia.x = this.ga.b.x, this.Ia.y = this.ga.b.y, this.Ia.v()), this.Qb || (this.Ja.x = this.xa.b.x, this.Ja.y = this.xa.b.y, this.Ja.v()));
                        a = 0;
                        for (b = c.length; a < b; a++) {
                            var h = c[a];
                            h.Ic && h.Lx()
                        }
                        this.Xa.v();
                        this.Jx();
                        this.Y.ox();
                        this.zg.v();
                        a = 0;
                        for (b = this.Vd.length; a < b; a++) c = this.Vd[a], 2 === c.O && c.v();
                        this.uc()
                    },
                    Jx: function() {
                        for (var a = v.Tk, b = 0; b < I.Xc; b++) {
                            var c = this.sj[b],
                                h = c.length;
                            if (0 < h) {
                                for (var d =
                                    1, e = null, f = [], g = 0, k = 0; k < h; k++) e = c[k], 0 === k && (f[g++] = e.start), f[g++] = e.end;
                                k = null;
                                h *= 2;
                                c = [];
                                e = 1 / h;
                                for (g = 0;;) {
                                    1 < g && (g = 1);
                                    k = G.lx(f, g);
                                    c.push(k);
                                    if (1 === g) break;
                                    g += e
                                }
                                f = a / h;
                                e = [];
                                k = 0;
                                for (g = h - 1; k < g; k++) {
                                    var l = d,
                                        m = k === h - 1 ? 1 : d + f,
                                        p = c[k],
                                        n = c[k + 1],
                                        r = G.$a(n, p);
                                    r.normalize();
                                    var q = G.tA(r),
                                        r = G.Bt(r),
                                        s = G.add(p, G.multiply(q, l)),
                                        l = G.add(p, G.multiply(r, l));
                                    e.push(l);
                                    e.push(s);
                                    q = G.add(n, G.multiply(q, m));
                                    m = G.add(n, G.multiply(r, m));
                                    e.push(m);
                                    e.push(q);
                                    d += f
                                }
                                M.Yx(e, L.Ck.Zi)
                            }
                        }
                    },
                    Fn: function(a, b, c, h) {
                        var d = v.Qi;
                        if (c.vA(a.x -
                            d, a.y - d, a.x + d, a.y + d)) {
                            var e = new G(0, 0),
                                f = new G(0, 0),
                                g = new G(c.x, c.y);
                            e.x = a.x - a.aa.M / 2;
                            f.x = a.x + a.aa.M / 2;
                            e.y = f.y = a.y;
                            0 != a.a && g.pa(-a.a, a.x, a.y);
                            g.y < e.y && Q.ai(g.x - c.aa.M / 2, g.y - c.aa.U / 2, g.x + c.aa.M / 2, g.y + c.aa.U / 2, e.x, e.y - d, f.x, f.y) && (c = new G(0, -(2 * d * (d - (e.y - g.y)) / d)), c.rotate(a.a), b.Rm(c, h))
                        }
                    },
                    Dn: function(a, b, c) {
                        if (!a.vu) {
                            var h = G.$a(b.va, b.b),
                                d = b.va.copy();
                            d.pa(-a.a, a.x, a.y);
                            d = d.y < a.y ? -1 : 1;
                            h = Math.max(40 * h.hd(), v.jv) * d;
                            d = G.Bt(G.Zx(a.a));
                            d.multiply(h);
                            b.b.pa(-a.a, a.x, a.y);
                            b.va.pa(-a.a, a.x, a.y);
                            b.va.y = b.b.y;
                            b.b.pa(a.a, a.x, a.y);
                            b.va.pa(a.a, a.x, a.y);
                            b.Rm(d, c);
                            a.R(0);
                            x.N(E.Vl)
                        }
                    },
                    Xz: function(a, b) {
                        a.R(0);
                        x.N(p.gb(E.hm, E.im));
                        var c = D.Jd(E.Li),
                            c = new k(5, c, N.Bg(a.a) - 90);
                        c.cb = this.Xa.zt();
                        var h = new G(a.x + v.Ol, a.y);
                        h.pa(a.a - Math.PI / 2, a.x, a.y);
                        c.x = h.x;
                        c.y = h.y;
                        c.zu(5);
                        this.Xa.T(c);
                        this.sb || this.Fn(a, this.Q, this.ca, b);
                        2 !== this.I && (this.Pb || this.Fn(a, this.ga, this.Ia, b), this.Qb || this.Fn(a, this.xa, this.Ja, b))
                    },
                    zb: function(a, b, c, h) {
                        for (var d = 0, e = 0, f = this.Ga.length; e < f; e++) {
                            var g = this.Ga[e],
                                k = g.ta;
                            if (k && k.zb === I.e)
                                for (var l =
                                    v.Vc, m = 2 * l, n = 0, r = k.Ca.length - 1; n < r; n++) {
                                    var q = k.Ca[n],
                                        s = k.Ca[n + 1],
                                        D = !1;
                                    a ? q.va.x !== I.Jf && (D = Q.ai(p.ht(q.b.x, q.va.x, s.b.x, s.va.x), p.ht(q.b.y, q.va.y, s.b.y, s.va.y), p.et(q.b.x, q.va.x, s.b.x, s.va.x), p.et(q.b.y, q.va.y, s.b.y, s.va.y), a.ea, a.fa, a.ea + a.width, a.fa + a.height)) : D = g.m && Q.hf(b.x, b.y, c.x, c.y, g.x - l, g.y - l, m, m) ? !1 : p.Sy(b.x, b.y, c.x, c.y, q.b.x, q.b.y, s.b.x, s.b.y);
                                    if (D) return d++, g.Ic && g.xg && this.So(g), x.N(E.jm + k.Fo), k.Ko(n), this.gj(), h && (k.de = 0, k.Qt(n)), d
                                }
                        }
                        return d
                    },
                    So: function(a) {
                        x.N(E.om);
                        a.Ic = !1;
                        var b =
                            S.create(E.Rg, 11);
                        b.ya();
                        var c = new X;
                        this.Na && !this.dg ? (c.w(B.Oa(a.c.x, a.c.y, B.A.Hb, 0)), c.w(B.Oa(a.c.x, a.c.y + 50, B.A.Hb, 0.3)), c.w(B.Oa(a.c.x, a.c.y - v.ab, B.A.Ad, 1))) : (c.w(B.Oa(a.c.x, a.c.y, B.A.Hb, 0)), c.w(B.Oa(a.c.x, a.c.y - 50, B.A.Hb, 0.3)), c.w(B.Oa(a.c.x, a.c.y + v.ab, B.A.Ad, 1)));
                        c.w(B.re(0, 0, 0));
                        c.w(B.re(p.gb(-120, 120), 0, 1));
                        b.Kb(c, 0);
                        b.R(0);
                        b.x = a.c.x;
                        b.y = a.c.y;
                        b.anchor = W.S;
                        c.cb = this.Xa.Ae();
                        this.Xa.T(b)
                    },
                    FB: function(a) {
                        x.N(E.pm);
                        for (var b = 0, c = this.Ga.length; b < c; b++) {
                            var h = this.Ga[b],
                                d = h.ta;
                            d && d.hb === this.Q &&
                                (d.zb !== I.e ? h.rs() : (d.Ko(d.Ca.length - 2), this.gj(), d.ag = !1), h.Ic && h.xg && a !== h && this.So(h))
                        }
                        a.Ic = !1;
                        this.sb = !0;
                        b = S.create(E.Rg, 12);
                        b.ya();
                        this.ca.anchor = this.ca.oa = W.S;
                        this.ca.x = 0;
                        this.ca.y = -5;
                        b.T(this.ca);
                        c = new X;
                        this.Na && !this.dg ? (c.w(B.Oa(a.c.x, a.c.y - 10, B.A.Hb, 0)), c.w(B.Oa(a.c.x, a.c.y + 70, B.A.Hb, 0.3)), c.w(B.Oa(a.c.x, a.c.y - v.ab, B.A.Ad, 1))) : (c.w(B.Oa(a.c.x, a.c.y - 10, B.A.Hb, 0)), c.w(B.Oa(a.c.x, a.c.y - 70, B.A.Hb, 0.3)), c.w(B.Oa(a.c.x, a.c.y + v.ab, B.A.Ad, 1)));
                        b.Kb(c, 0);
                        b.R(0);
                        b.x = a.c.x;
                        b.y = a.c.y - 10;
                        b.anchor =
                            W.S;
                        c.cb = this.Xa.Ae();
                        this.Xa.T(b);
                        0 !== this.Qd && this.cc.Fd(this, this.vn, null, 2)
                    },
                    rg: function(a) {
                        2 !== this.I ? a ? (this.bc = null, this.ad.visible = !1, this.Zj(this.Ia.x, this.Ia.y)) : (this.mc = null, this.bd.visible = !1, this.Zj(this.Ja.x, this.Ja.y)) : (this.$b = null, this.ac.visible = !1, this.Zj(this.ca.x, this.ca.y))
                    },
                    Zj: function(a, b) {
                        this.gj();
                        x.N(E.Xl);
                        var c = new w;
                        c.sa(E.kl);
                        c.ya();
                        c.x = a;
                        c.y = b;
                        c.anchor = W.S;
                        var h = c.lc(0.05, X.ha.Wa, 0, 11);
                        c.pc(h).cb = this.Xa.Ae();
                        c.R(0);
                        this.Xa.T(c)
                    },
                    En: function(a, b, c) {
                        return Q.Db(b + this.Y.b.x,
                            c + this.Y.b.y, a.b.x - v.si, a.b.y - v.si, v.ti, v.ti) ? (this.rg(a === this.ga), !0) : !1
                    },
                    Xt: function() {
                        for (var a = 0, b = this.Ga.length; a < b; a++) {
                            var c = this.Ga[a].ta;
                            c && c.zb === I.e && (c.highlighted = !1)
                        }
                    },
                    Js: function(a, b, c) {
                        var h = v.Sk,
                            d = null,
                            e = h;
                        b = new G(b, c);
                        c = 0;
                        for (var f = this.Ga.length; c < f; c++) {
                            var g = this.Ga[c],
                                k = g.ta;
                            if (k)
                                for (var l = 0, m = k.ij.length; l < m; l++) {
                                    var p = k.ij[l],
                                        n = p.Ma(b);
                                    n < h && n < e && (e = n, d = g, a.qa(p))
                                }
                        }
                        return d
                    },
                    ny: function(a, b) {
                        var c = null,
                            h = Number.MAX_VALUE,
                            d = a.copy(),
                            e = b.ta;
                        if (!e || e.zb !== I.e) return null;
                        for (var f =
                            v.Vc, g = 2 * f, k = 0, l = e.Ca.length - 1; k < l; k++) {
                            var m = e.Ca[k],
                                p = m.b.Ma(d);
                            p < h && (!b.m || Q.Db(m.b.x, m.b.y, b.x - f, b.y - f, g, g)) && (h = p, c = e, a.qa(m.b))
                        }
                        return c
                    },
                    OB: function(a, b, c) {
                        if (this.me) return this.Y.type === q.Yc.Kf && (this.Cs = !0), !0;
                        if (c >= I.Xc) return !0;
                        this.Uj = !1;
                        if (this.Na && this.Na.fb(this.Na.Vn() ? 1 : 0).cf(a + this.Y.b.x, b + this.Y.b.y, !0)) return this.An = c, !0;
                        if (this.$b && this.En(this.Q, a, b) || 2 !== this.I && (this.bc && this.En(this.ga, a, b) || this.mc && this.En(this.xa, a, b))) return !0;
                        var h = new G(a, b);
                        this.mh[c] || (this.mh[c] = !0, this.ze[c].qa(h), this.Ao[c].qa(h));
                        var d, e, f = this.Y.b,
                            h = a + f.x,
                            f = b + f.y;
                        d = 0;
                        for (e = this.Xb.length; d < e; d++) {
                            var g = this.Xb[d];
                            if (g.Wb && g.Ek === I.e && g.Wb.Sj(h, f)) return g.Ek = c, !0
                        }
                        d = 0;
                        for (e = this.ec.length; d < e; d++)
                            if (g = this.ec[d], g.xo(h, f)) return g.ni = 0.05, g.touch = c, !0;
                        var g = null,
                            k = !1,
                            l = !1;
                        d = 0;
                        for (e = this.Ra.length; d < e; d++) {
                            var m = this.Ra[d],
                                p = G.Ma(h, f, m.eg.x, m.eg.y),
                                n = G.Ma(h, f, m.jd.x, m.jd.y);
                            if (p < v.Zd && !m.Os() || n < v.Zd) {
                                for (d += 1; d < e; d++) {
                                    var g = this.Ra[d],
                                        r = G.Ma(g.x, g.y, m.x, m.y);
                                    r + g.Rb <= m.Rb && (k = !0);
                                    r <= m.Rb +
                                        g.Rb && (l = !0)
                                }
                                m.Mh.x = h;
                                m.Mh.y = f;
                                m.Vh = c;
                                p < v.Zd && m.fu(!0);
                                n < v.Zd && m.gu(!0);
                                g = m;
                                break
                            }
                        }
                        e = this.Ra.indexOf(g);
                        e != this.Ra.length - 1 && l && !k && (d = new X, d.w(B.za(L.Fb.copy(), B.A.LINEAR, 0)), d.w(B.za(L.lb.copy(), B.A.LINEAR, 0.2)), k = new X, k.w(B.za(L.lb.copy(), B.A.LINEAR, 0.2)), k.cb = $.proxy(this.Pz, this), l = g.copy(), l.Ur(k), l.R(0), g.Ur(d), g.R(0), this.Ra[e] = l, this.Ra.push(g));
                        k = v.Vc;
                        l = 2 * k;
                        m = v.He;
                        p = 2 * m;
                        d = 0;
                        for (e = this.Ga.length; d < e; d++)
                            if (g = this.Ga[d], g.m && Q.Db(h, f, g.x - k, g.y - k, l, l) && (g.wy(h, f), g.Gg = c), 0 < g.q && Q.Db(h, f,
                                g.x - m, g.y - m, p, p)) return g.lf = c, !0;
                        this.cn && (c = G.Qa(), (h = (g = this.Js(c, h, f)) ? g.ta : null) && h.highlighted && this.ny(c, g) && this.zb(null, c, c, !1));
                        !this.$m && this.target.Xj(a, b) && (this.Uj = !0);
                        return !0
                    },
                    lh: Ga(!0),
                    RB: function(a, b, c) {
                        if (this.me) return !0;
                        this.mh[c] = !1;
                        if (this.Uj && this.target.Xj(a, b)) return this.Uj = !1, F.ra(F.r.Eq), !0;
                        this.Uj = !1;
                        var h, d;
                        h = this.Y.b;
                        var e = a + h.x,
                            f = b + h.y;
                        h = 0;
                        for (d = this.ge.length; h < d; h++) {
                            var g = this.ge[h];
                            if (g.xo(e, f)) {
                                g.Po();
                                this.ge.splice(h, 1);
                                break
                            }
                        }
                        this.Na && this.An === c && (this.Na.fb(this.Na.Vn() ?
                            1 : 0).cf(a + this.Y.b.x, b + this.Y.b.y, !0) && (this.Na.toggle(), this.Cb(nb.Hp)), this.An = I.e);
                        h = 0;
                        for (d = this.Xb.length; h < d; h++)
                            if (e = this.Xb[h], e.Wb && e.Ek === c && (e.Ek = I.e, e.Wb.Tj(a + this.Y.b.x, b + this.Y.b.y))) return !0;
                        h = 0;
                        for (d = this.Ra.length; h < d; h++) a = this.Ra[h], a.Vh === c && (a.Vh = I.e, a.Ro = I.e, a.fu(!1), a.gu(!1));
                        h = 0;
                        for (d = this.Ga.length; h < d; h++) a = this.Ga[h], a.m && a.Gg === c && (a.Gg = I.e), 0 < a.q && a.lf === c && (a.lf = I.e);
                        return !0
                    },
                    QB: function(a, b, c) {
                        if (this.me || c >= I.Xc) return !0;
                        var h = new G(a, b),
                            d, e;
                        if (10 < this.ze[c].Ma(h))
                            for (d =
                                0, e = this.ec.length; d < e; d++) {
                                var g = this.ec[d];
                                g.touch === c && 0 !== g.ni && (g.ni = 0)
                            }
                        this.yk.qa(h);
                        a = new G(a + this.Y.b.x, b + this.Y.b.y);
                        d = 0;
                        for (e = this.Ra.length; d < e; d++)
                            if (b = this.Ra[d], b.Vh === c) {
                                c = new G(b.x, b.y);
                                c.Ma(a) < b.Rb / 10 && b.Mh.qa(a);
                                d = G.$a(b.Mh, c);
                                h = G.$a(a, c).og() - d.og();
                                h > Math.PI ? h -= 2 * Math.PI : h < -Math.PI && (h += 2 * Math.PI);
                                b.eg.pa(h, b.x, b.y);
                                b.jd.pa(h, b.x, b.y);
                                b.rotation += N.Bg(h);
                                d = 0 < h ? E.lm : E.mm;
                                0.07 > Math.abs(h) && (d = I.e);
                                b.Ro != d && d != I.e && (x.N(d), b.Ro = d);
                                d = 0;
                                for (e = this.Ga.length; d < e; d++) {
                                    var g = this.Ga[d],
                                        k = new G(g.x, g.y);
                                    k.Ma(c) <= b.Rb + 5 * this.P && (k.pa(h, b.x, b.y), g.x = k.x, g.y = k.y, g.ta && (g.ta.Ya.b.qa(k), g.ta.Ya.Mc.qa(k)))
                                }
                                d = 0;
                                for (e = this.ec.length; d < e; d++) g = this.ec[d], k = new G(g.x, g.y), k.Ma(c) <= b.Rb + 5 * this.P && (k.pa(h, b.x, b.y), g.x = k.x, g.y = k.y, g.rotation += N.Bg(h), g.Sb());
                                d = 0;
                                for (e = this.bubbles.length; d < e; d++) g = this.bubbles[d], k = new G(g.x, g.y), k.Ma(c) <= b.Rb + 10 * this.P && g !== this.$b && g !== this.mc && g !== this.bc && (k.pa(h, b.x, b.y), g.x = k.x, g.y = k.y);
                                Q.Db(this.target.x, this.target.y, b.x - b.size, b.y - b.size, 2 * b.size, 2 *
                                    b.size) && (k = new G(this.target.x, this.target.y), k.pa(h, b.x, b.y), this.target.x = k.x, this.target.y = k.y);
                                b.Mh.qa(a);
                                return !0
                            }
                        d = 0;
                        for (e = this.Ga.length; d < e; d++)
                            if (b = this.Ga[d]) {
                                if (b.m && b.Gg === c) return b.vy(a), !0;
                                if (0 < b.q && b.lf === c) return b.u ? b.y = p.Zf(a.y, b.Nj, b.Mj) : b.x = p.Zf(a.x, b.Nj, b.Mj), b.ta && (d = b.ta.Ya, d.b.x = d.Mc.x = b.x, d.b.y = d.Mc.y = b.y), !0
                            }
                        if (this.mh[c]) {
                            d = new f(G.add(this.ze[c], this.Y.b), G.add(h, this.Y.b), 5, 5, L.dv.copy());
                            a = this.sj[c];
                            b = 0;
                            a.push(d);
                            d = 0;
                            for (e = a.length; d < e; d++) g = a[d], b += this.zb(null, g.start,
                                g.end, !1);
                            0 < b && (this.cy = !1, this.Io = 0 < this.Io && 0 < this.kk ? this.Io + b : b, this.kk = 0.1);
                            this.Ao[c].qa(this.ze[c]);
                            this.ze[c].qa(h)
                        }
                        return !0
                    },
                    PB: function(a, b, c) {
                        if (c > I.Xc) return !1;
                        this.yk.x = a;
                        this.yk.y = b;
                        return !0
                    },
                    Cb: function() {
                        Pa.toggle();
                        this.dg = Pa.Us();
                        x.N(this.dg ? E.Ui : E.Vi);
                        for (var a = 0, b = this.Id.length; a < b; a++) {
                            var c = this.Id[a];
                            Pa.Us() ? c.R(P.aj.Le) : c.R(P.aj.Lr)
                        }
                    },
                    IA: function(a) {
                        for (var b = 0, c = this.Xb.length; b < c; b++) this.Xb[b].yf === a && this.Xb[b].KA()
                    }
                })
            }(Db, Eb, Fb, Gb, Hb, Lb, Mb, Nb, Ob, Pb, Qb, Rb, Z, na, Sb, Tb, Ub,
                Vb, ia, Wb, La, qa, ma, w, N, ya, fa, K, ca, oa, H, V, Oa, R, S, mb, hb, Aa, Ba, lb, ib, ea, U, P, aa, Xa, ua, Yb, Ya, Zb, la, ga, F, $b, ja, ac, {
                    nC: 0,
                    vD: 1,
                    EC: 2,
                    qD: 3,
                    rD: 4,
                    HD: 5,
                    pC: 6,
                    oC: 7,
                    wD: 8,
                    yD: 9,
                    xD: 10,
                    JD: 11,
                    qC: 12,
                    lD: 13,
                    eD: 14,
                    DD: 15,
                    rC: 16,
                    pD: 17,
                    dD: 18
                }, bc, cc),
            gc = function(a, c, d, b, f) {
                var e = a.extend({
                    init: function() {
                        this.h()
                    },
                    v: function() {
                        for (var a = this.children, k = a.length, l = 0; l < k; l++) {
                            var n = a[l];
                            n.visible && n.v()
                        }
                        k = this.fb(e.Tc.Uc);
                        0 < k.We && (a = k.We / f.Uk, k.Jy() && (a = 1 - a), k = b.context, a = new d(1, 1, 1, a), k.fillStyle = a.fi(), k.fillRect(0, 0, c.pb, c.ab))
                    },
                    show: function() {
                        this.h();
                        var a = this.fb(e.Tc.Uc);
                        a.ax && a.$w()
                    }
                });
                e.Tc = {
                    Uc: 0,
                    jD: 1,
                    nD: 2,
                    gD: 3,
                    kD: 4,
                    oD: 5
                };
                return e
            }(function(a, c) {
                return a.extend({
                    init: function() {
                        this.h();
                        this.width = c.pb;
                        this.height = c.ab
                    }
                })
            }(ia, H), H, ca, P, N),
            hc = function(a, c, d, b, f) {
                return a.extend({
                    init: function(a) {
                        this.h(a);
                        this.Pm = !1
                    },
                    Zc: function() {
                        this.h();
                        b.Yh(f.am);
                        this.xx();
                        this.Fy();
                        this.su(0)
                    },
                    xx: function() {
                        var a = new d,
                            b = new c;
                        b.sh = this;
                        b.ax = this.Pm;
                        this.Pm = !1;
                        a.ae(b, d.Tc.Uc);
                        this.Yw(a, 0)
                    },
                    Fy: function() {
                        this.Mo(!1);
                        this.Ry()
                    },
                    Ry: function() {
                        this.Tn = !1
                    },
                    EE: function() {
                        this.Tn = !1
                    },
                    mo: function() {
                        b.N(f.sm);
                        this.fd()
                    },
                    Lz: function() {
                        this.ik()
                    },
                    Mo: function(a) {
                        this.Tn = a;
                        var c = this.af(0);
                        c && (c = c.fb(d.Tc.Uc)) && (c.Yb = !a, c.qi = !a, a ? b.dA() : b.FA())
                    },
                    qg: function() {
                        var a = this.af(0);
                        a && (a = a.fb(d.Tc.Uc)) && (a.We = 0, this.Mo(!0))
                    },
                    sg: function() {
                        this.Mo(!1)
                    },
                    ik: function() {
                        this.Bx(0);
                        this.Pm = !0;
                        this.Zc()
                    },
                    Oj: function(a, b) {
                        if (this.h(a, b)) return !0;
                        var c = this.af(0);
                        return c && (c = c.fb(d.Tc.Uc)) && c.Yb ? (c.OB(a, b, 0), !0) : !1
                    },
                    it: function(a, b) {
                        if (this.h(a, b)) return !0;
                        var c = this.af(0);
                        return c && (c = c.fb(d.Tc.Uc)) && c.Yb ? (c.PB(a, b, 0), !0) : !1
                    },
                    jt: function(a, b) {
                        if (this.h(a, b)) return !0;
                        var c = this.af(0);
                        return c && (c = c.fb(d.Tc.Uc)) && c.Yb ? (c.QB(a, b, 0), !0) : !1
                    },
                    ng: function(a, b) {
                        if (this.h(a, b)) return !0;
                        var c = this.af(0);
                        return c && (c = c.fb(d.Tc.Uc)) && c.Yb ? (c.RB(a, b, 0), !0) : !1
                    },
                    lh: function(a, b) {
                        if (this.h(a, b)) return !0;
                        var c = this.af(0);
                        return c && (c = c.fb(d.Tc.Uc)) && c.Yb ? (c.lh(a, b, 0), !0) : !1
                    }
                })
            }(Wa, fc, gc, ma, w, N),
            $a = function(a, c, d, b, f) {
                return new(c.extend({
                    init: function(a) {
                        this.h(a)
                    },
                    yu: function(b,
                        c) {
                        f.bz(b, c);
                        this.Ue === a.Z.Sg && this.Zc();
                        var k = this.fb(3);
                        k && k.ps();
                        k = new d(this);
                        this.ae(k, 3);
                        this.Rw(3)
                    },
                    qg: function() {
                        var a = this.fb(3);
                        a && a.qg()
                    },
                    sg: function() {
                        var a = this.fb(3);
                        a && a.sg()
                    },
                    ik: function() {
                        var a = this.fb(3);
                        a && a.ik()
                    },
                    Cu: function() {
                        this.os()
                    },
                    My: function() {
                        if (this.Ue === a.Z.Sg) return !1;
                        var b = this.fb(3);
                        return !b || b.Ue === a.Z.Sg || b.Tn ? !1 : !0
                    },
                    rt: function(a) {
                        this.h(a);
                        3 == a && this.Ax(3)
                    }
                }))
            }(Wa, Bb, hc, R, Oa),
            ab = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u, q) {
                function A() {
                    k.ra(k.r.Rl);
                    s.Uf()
                }
                var s = {
                    wk: function(b) {
                        a.qg();
                        $(".popupOuterFrame").hide();
                        $(".popupInnerFrame").hide();
                        $("#popupWindow").fadeIn(500, function() {
                            $("#" + b).show();
                            $(".popupOuterFrame").fadeIn(500)
                        })
                    },
                    Uf: function() {
                        l.N(n.ia);
                        $("#popupWindow").fadeOut(500, function() {
                            a.sg()
                        })
                    },
                    ru: function() {
                        l.N(n.ia);
                        s.wk("payDialog")
                    },
                    AB: function() {
                        var a = $("#slowComputer");
                        a.children("img").remove();
                        var c = $(m.ja({
                                text: r.W(p.Yq),
                                Dc: q.S,
                                width: 1200 * b.Gb,
                                scale: 1.25 * b.bb
                            })),
                            d = $(m.ja({
                                text: r.W(p.Xq),
                                width: 1200 * b.Gb,
                                scale: 0.8 * b.bb
                            }));
                        d.css("margin-left", b.d(30));
                        a.append(c).append(d);
                        m.ja({
                            text: r.W(p.yq),
                            Kc: "#slowComputerBtn img",
                            scale: 0.8 * b.bb
                        });
                        s.wk("slowComputer")
                    }
                };
                k.subscribe(k.r.Ib, function() {
                    m.ja({
                        text: r.W(p.Jm),
                        Ab: "payMessage",
                        width: b.d(650),
                        Dc: q.S,
                        scale: 0.8 * b.bb
                    });
                    m.ja({
                        text: r.W(p.wi),
                        Ab: "payBtn",
                        scale: 0.6 * b.bb
                    })
                });
                $(function() {
                    $("#payImg").click(A);
                    $("#payBtn").click(A);
                    $("#payClose").click(s.Uf);
                    $("#slowComputerBtn").click(s.Uf);
                    $("#missingOkBtn").click(s.Uf);
                    $("#resetNoBtn").click(s.Uf)
                });
                return s
            }($a, xa, Fa, H, T, ta, Qa, V, ma, w, ga, da, F, R, S),
            ob = function(a, c, d, b, f, e, g, k,
                l, n, r, m, p, u, q) {
                function A(a) {
                    if (a === w) {
                        a = I[a];
                        var b = a.index;
                        a.Eh() && (n.N(r.ia), !1 === a.qf ? l.ra(l.r.Rl) : k.gg(b) ? (p.ja({
                            text: m.W(u.sp),
                            Ab: "missingLine1",
                            ua: !0
                        }), p.ja({
                            text: k.ei(b) - k.zf(),
                            Ab: "missingCount",
                            ua: !0
                        }), p.ja({
                            text: m.W(u.tp),
                            Ab: "missingLine2",
                            ua: !0
                        }), p.nc({
                            text: m.W(u.up),
                            Ab: "missingLine3",
                            ua: !0
                        }), p.ja({
                            text: m.W(u.jw),
                            Ab: "missingOkBtn",
                            ua: !0
                        }), n.N(r.ia), q.wk("missingStars")) : F.Vz(b))
                    }
                }

                function s(a) {
                    X = a;
                    H.setTransform(1, 0, 0, 1, 0, 0);
                    H.clearRect(0, 0, Y.width, Y.height);
                    var b = B + a,
                        c = f.d(130);
                    H.translate(b,
                        c);
                    for (var h = 0, d = 0; d < I.length; d++) {
                        var e = null,
                            g = a + h,
                            k = I[d];
                        k.visible && (g > f.d(-100) && g < f.d(100) && (e = -1 * (B + a) - h + f.d(452)), H.translate(h, 0), k.v(H, e), H.translate(-h, 0), h += L)
                    }
                    H.translate(-b, -c)
                }

                function z(a) {
                    function b() {
                        if (O) {
                            var a = Date.now() - U;
                            X = d.Xe(a, R, V - R, c);
                            s(X);
                            5 > Math.abs(X - V) && (G = !0);
                            a >= c ? (v != I[w] && (v = I[w], v.$r(H)), v && v.Sh && v.Sh(), O = !1) : window.requestAnimationFrame(b)
                        }
                    }
                    0 > a && (a = 0);
                    a > I.length - 1 && (a = I.length - 1);
                    var c = a == w ? 0 : 550;
                    v && v != I[a] && v.Uh && v.Uh();
                    w = a;
                    l.ra(l.r.sr, I[w].index);
                    R = X;
                    V = -1 * L * a;
                    U = Date.now();
                    O = !0;
                    b();
                    W.find("div").toggleClass("boxNavDisabled", 0 >= a);
                    N.find("div").toggleClass("boxNavDisabled", a >= I.length - 1)
                }

                function h() {
                    O = !1;
                    null != v && v.hs()
                }

                function C(a, b) {
                    return G && null != v && v.Eh() && a > f.d(340) && a < f.d(680) && b > f.d(140) && b < f.d(460) ? !0 : !1
                }

                function D(a) {
                    h();
                    T = a;
                    M = X;
                    S = !0
                }

                function J(a, b) {
                    S ? (h(), P = a - T, 5 < Math.abs(P) && (G = !1, s(M + P))) : $(Y).toggleClass("ctrPointer", C(a, b))
                }

                function x(a, b) {
                    if (S)
                        if (h(), P = a - T, Math.abs(P) > L / 2) {
                            Q = X;
                            var c = Math.round(-1 * Q / L);
                            z(c)
                        } else 5 < Math.abs(P) ? (c = f.d(30), z(P > c ? w - 1 : P <
                            -1 * c ? w + 1 : w)) : (c = I[w], c.Eh() && (c.df || z(w), C(a, b) && A(w)));
                    S = !1
                }

                function E(a, b) {
                    x(a, b)
                }
                var I = [],
                    w = 0,
                    X = 0,
                    G = !0,
                    L = f.d(600),
                    B = f.d(312),
                    v = null,
                    F = null,
                    Y, H, W, N, K = new c(a.Sc, "boxPanel", "menuBackground", !0);
                $(function() {
                    Y = document.getElementById("boxCanvas");
                    H = Y.getContext("2d");
                    Y.width = f.d(1024);
                    Y.height = f.d(576);
                    W = $("#boxNavBack").click($.proxy(function() {
                        0 < w && (z(w - 1), n.N(r.ia))
                    }, this));
                    N = $("#boxNavForward").click($.proxy(function() {
                        w < I.length - 1 && (z(w + 1), n.N(r.ia))
                    }, this));
                    $("#boxUpgradePlate").click(function() {
                        A(w)
                    })
                });
                l.subscribe(l.r.Km, function(a) {
                    I = a;
                    K.Do()
                });
                K.init = function(a) {
                    F = a
                };
                K.Th = function() {
                    this.Zc()
                };
                K.lo = function() {
                    this.fd()
                };
                K.EB = function() {
                    z(w + 1)
                };
                K.DB = function() {
                    z(0)
                };
                K.hx = function() {
                    null != v && null != H && (v.hs(), v.$r(H))
                };
                var O = !1,
                    R, V, U, S = !1,
                    Q = 0,
                    M = 0,
                    P = 0,
                    T = null;
                K.nd = null;
                K.Zc = function() {
                    this.nd || (this.nd = new b({
                        element: Y,
                        qo: $.proxy(D, this),
                        no: $.proxy(J, this),
                        ko: $.proxy(x, this),
                        oo: $.proxy(E, this),
                        vh: function() {
                            return e.Ls()
                        }
                    }));
                    this.nd.Zc()
                };
                K.fd = function() {
                    this.nd && this.nd.fd()
                };
                K.Do = function() {
                    z(w)
                };
                return K
            }(xa, Fa, sa, Ua, H, Va, T, ta, V, ma, w, ga, da, F, ab),
            Qa = function(a, c, d, b, f, e, g, k, l, n, r) {
                var m = new function() {
                    function p() {
                        if (s) {
                            q.Za = 0;
                            q.Nb = 1;
                            var h = e.cs,
                                f = e.jx,
                                g, m, p, r, z;
                            A = [];
                            g = 0;
                            for (m = f.length; g < m; g++) {
                                p = f[g];
                                r = b.ei(g);
                                z = b.gg(g);
                                switch (p) {
                                    case d.uv:
                                        p = new c(g, h[g], r, z, p);
                                        p.Gy() || (p = null);
                                        break;
                                    case d.Jq:
                                        p = new k(g, h[g], r, z, p);
                                        break;
                                    case d.Cl:
                                        p = new l(g, h[g], r, z, p);
                                        break;
                                    case d.Fm:
                                        p = new n(g, h[g], r, z, p);
                                        break;
                                    default:
                                        p = new a(g, h[g], r, z, p)
                                }
                                p && A.push(p)
                            }
                            u()
                        }
                    }

                    function u() {
                        var a = [],
                            b, c, d;
                        b = 0;
                        for (d = A.length; b <
                            d; b++) c = A[b], c.index = b, c.visible && a.push(c);
                        f.ra(f.r.Km, a)
                    }
                    var q = this,
                        A = [];
                    f.subscribe(f.r.sr, function(a) {
                        m.Za = a;
                        m.Nb = 1
                    });
                    var s = !1;
                    this.Ed = function() {
                        s = !0;
                        p()
                    };
                    q.Za = 0;
                    q.Nb = 1;
                    var z = !1;
                    f.subscribe(f.r.Yg, function(a) {
                        z = a
                    });
                    this.Ej = function() {
                        return b.gg(this.Za) || b.Lc(this.Za) <= this.Nb ? !1 : z || !e.lg ? !0 : !e.lg(this.Za, this.Nb)
                    };
                    f.subscribe(f.r.Bm, p);
                    f.subscribe(f.r.Cm, p);
                    f.subscribe(f.r.Sl, p);
                    f.subscribe(f.r.Mk, p);
                    this.Tt = function() {
                        for (var a = 0, b = 0, c = A.length; b < c; b++) A[b].Gh() && a++;
                        return a
                    };
                    this.qA = function() {
                        for (var a =
                            0, c = A.length, d = 0; d < c; d++) A[d].Gh() && (a += b.Et(d));
                        return a
                    };
                    this.EA = function() {
                        r.DB();
                        p();
                        r.Do()
                    };
                    this.Vu = function() {
                        var a = A.length,
                            c = !1,
                            d, e;
                        for (d = 1; d < a; d++) e = A[d], !b.gg(d) && e.qf && e.df && (e.df = !1, c = !0, b.we(d, 0, 0));
                        c && r.Do()
                    };
                    f.subscribe(f.r.Yg, function(a) {
                        a = a || !0 === g.Dg;
                        var c = e.lg || Ga(!1),
                            f, k, l;
                        f = 1;
                        for (k = A.length; f < k; f++) switch (l = A[f], l.type) {
                            case d.Jq:
                                l.visible = !a;
                                break;
                            case d.Cl:
                                l.visible = a;
                                break;
                            default:
                                l.qf = a || !c(f, 0), l.df = !l.qf || b.gg(f)
                        }
                        u()
                    })
                };
                return m
            }(Ea, yb, pa, ta, V, R, ra, zb, Ab, fb, ob),
            bb = function(a,
                c, d, b, f) {
                var e = [],
                    g = new Image,
                    k = new Image,
                    l = {};
                $(function() {
                    l.canvas = document.getElementById("levelCanvas");
                    l.canvas.width = a.d(1024);
                    l.canvas.height = a.d(576)
                });
                l.Vx = !1;
                l.Ed = function() {
                    for (var a = 0, b = c.Um.length; a < b; a++) {
                        var f = new Image;
                        f.src = d.Rc + c.Um[a];
                        e[a] = f
                    }
                    g.src = d.Rc + "leveltape_left.png";
                    k.src = d.Rc + "leveltape_right.png"
                };
                l.Nc = function(c, d) {
                    var f = l.canvas,
                        p = f.getContext("2d"),
                        u = e[b.Za],
                        q = f.width / 2,
                        A = q - q * (1 - (d || 0));
                    p.save();
                    p.setTransform(1, 0, 0, 1, 0, 0);
                    p.clearRect(0, 0, f.width, f.height);
                    p.restore();
                    p.drawImage(u, -1 * A, 0);
                    c && p.drawImage(g, q - a.d(26) - A, a.d(10));
                    p.save();
                    p.translate(f.width, 0);
                    p.scale(-1, 1);
                    p.drawImage(u, -1 * A, 0);
                    p.restore();
                    c && p.drawImage(k, q + A, a.d(10))
                };
                l.so = function(a, b, c) {
                    function d() {
                        var c = s(Date.now() - g, 0, 1, k);
                        1 > c ? (l.Nc(a, e ? 1 - c : c), window.requestAnimationFrame(d)) : (l.Nc(a, e ? 0 : 1), e ? $("#levelPanel").show() : $("#levelPanel").hide(), null != b && b())
                    }
                    var e = null != c ? c : !1,
                        g = Date.now(),
                        k = 750;
                    l.canvas.getContext("2d");
                    var s = c ? f.ys : f.nh;
                    window.requestAnimationFrame(d)
                };
                l.tx = function(a) {
                    l.so(!1,
                        a, !0)
                };
                l.sx = function(b) {
                    var c = $("#tapeRoll"),
                        d = $("#levelTape");
                    $("#levelResults").fadeOut(400);
                    c.css("top", a.d(-14));
                    c.delay(400).fadeIn(200, function() {
                        function e() {
                            var a = Date.now() - k,
                                C = f.nh(a, s, g - s, z);
                            c.css("top", f.nh(a, A, g - A, z));
                            d.css("height", C);
                            a < z ? window.requestAnimationFrame(e) : (d.hide(), l.Nc(!0), c.fadeOut(400, function() {
                                setTimeout(b, 200)
                            }))
                        }
                        var g = a.d(470);
                        a.d(553);
                        var k = Date.now(),
                            A = parseInt(c.css("top"), 10),
                            s = a.d(63),
                            z = 1E3;
                        d.css("height", s);
                        d.show();
                        window.requestAnimationFrame(e)
                    })
                };
                l.Tz =
                    function(b) {
                        l.Nc(!0, 0);
                        var c = $("#boxCutter");
                        c.css("top", a.d(281));
                        c.delay(200).fadeIn(200, function() {
                            function d() {
                                var a = Date.now() - g;
                                c.css("top", f.nh(a, k, e - k, l));
                                a < l ? window.requestAnimationFrame(d) : c.fadeOut(300, b)
                            }
                            var e = a.d(-255),
                                g = Date.now(),
                                k = parseInt(c.css("top"), 10),
                                l = 1E3;
                            window.requestAnimationFrame(d)
                        })
                };
                l.lF = ha();
                l.uE = ha();
                return l
            }(H, R, T, Qa, sa, V),
            ic = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u, q, A) {
                function s() {
                    var a = parseInt($(this).data("level"), 10);
                    
                    
                    if (f.Ny(e.Za, a)) 
                    {	
                    	h.Uz(a + 1, A.Vx);
                    
                    }
                    else if (C ? 0 :
                        p.lg && p.lg(e.Za, a)) q.ru();
                    else return;
                    k.N(l.ia)
                }

                function z() {
                    var a = e.Za,
                        b = f.Lc(a),
                        c, h, d, g, k;
                    for (d = 0; d < b; d++)
                        if (c = $("#option" + (d + 1))) d < b ? (c.show(), g = C ? !1 : p.lg ? p.lg(e.Za, d) : !1, h = f.$e(a, d), null === h && !g && 0 < d && (k = f.wj(a, d - 1), 0 < k && (f.we(a, d, 0), h = 0)), null != h ? (h = $("<div class='txt'/>").append($(r.ja({
                            text: d + 1,
                            ua: !0
                        }))).append($("<div>").addClass("stars" + h)), c.removeClass("locked purchase").addClass("open ctrPointer").empty().append(h)) : c.removeClass("open").addClass("locked").toggleClass("purchase ctrPointer",
                            g).empty()) : c.hide();
                    a = f.Mm(e.Za) + "/" + 3 * f.Lc(e.Za);
                    r.ja({
                        text: a,
                        Kc: "#levelScore img",
                        ua: !0
                    });
                    e.Vu();
                    f.pi()
                }
                a = new c(a.Bd, "levelPanel", p.DE || "levelBackground", !0);
                var h = null;
                a.init = function(a) {
                    function b(a, c, h) {
                        $("<div/>").attr("id", "option" + (a + 1)).data("level", a).addClass("option locked ctrPointer " + p).css({
                            left: u + (h || 0),
                            top: r
                        }).click(s).appendTo(g);
                        u += c;

                        u > l && (u = k, r += c)
                        
                    }
                    h = a;
                    var c = f.Lc(e.Za),
                        g = $("#levelOptions"),
                        k = 0;
                    a = 0;
                    var l = d.d(420),
                        m = d.d(153),
                        p = "",
                        n = 3,
                        q = c % 3;
                    9 < c && 12 >= c ? (k = -80, a = 10, n = 4, l = d.d(500),
                        m = d.d(153)) : 12 < c && (k = -30, a = -40, m = d.d(101), p = "option-small", n = 5, q = c % 5);
                    var r = a,
                        u = k;
                    a = 0;
                    for (var z = c - q; a < z; a++) b(a, m);
                    0 < q && function(a) {
                        for (var h = (n - q) * m / 2; a < c; a++) b(a, m, h)
                    }(a)
                };
                a.Th = function() {
                    z();
                    $("#levelScore").delay(200).fadeIn(700);
                    $("#levelBack").delay(200).fadeIn(700);
                    $("#levelOptions").delay(200).fadeIn(700);
                    $("#levelResults").delay(200).fadeOut(700)
                };
                var C = !1;
                g.subscribe(g.r.Yg, function(a) {
                    C = a;
                    z()
                });
                g.subscribe(g.r.Km, function() {
                    z()
                });
                return a
            }(xa, Fa, H, T, ta, Qa, V, ma, w, ga, da, F, R, S, ab, bb),
            jc = function(a,
                c, d, b, f, e, g, k, l, n, r) {
                var m = new c(a.Me, "codePanel", "levelBackground", !1),
                    p = null,
                    u = null,
                    q = null,
                    A = null;
                m.Sn = function() {
                    return l.hE ? g.Ts(0) && !n.Dg : !1
                };
                $(function() {
                    function a(b) {
                        p.html(b);
                        p.width(f + 1);
                        p.width(f)
                    }

                    function c() {
                        e ? (k = !k, a(k ? "Validating code . . ." : ""), setTimeout(c, k ? 600 : 250)) : k = !1
                    }

                    function h(c) {
                        e = !1;
                        u.attr("disabled", !1);
                        if (c) {
                            a("Code Accepted!");
                            c = !0;
                            var h, d;
                            h = 0;
                            for (d = l.Tf.length; h < d; h++)
                                if (!g.Ts(h)) {
                                    c = !1;
                                    break
                                }
                            g.UB();
                            A.delay(3E3).show(0);
                            b.ra(b.r.Mk, c)
                        } else a("Sorry, that code is not valid or <br/> has already been redeemed.")
                    }

                    function d() {
                        if (!e) {
                            var b = l.Tf.length,
                                f = u.val() || "",
                                g = 0 < f.length ? parseInt(f[0], 10) || 0 : 0,
                                k = parseInt(f, 10),
                                f = k.toString().length === f.length;
                            isNaN(k) || !f || 0 > k || 1 > g || g > b ? a("Oops, that is not a valid code!") : (u.attr("disabled", !0), e = !0, c(), $.ajax({
                                type: "POST",
                                url: "http://ctrbk.cloudapp.net/api/CTRBKCodes",
                                contentType: "application/json",
                                data: '{"ctrbkcode":"' + k + '"}',
                                dataType: "json",
                                error: function() {
                                    h(!1)
                                },
                                success: function() {
                                    h(!0)
                                }
                            }))
                        }
                    }
                    p = $("#codeMessage");
                    u = $("#codeText");
                    q = $("#codeOkButton");
                    A = $("#codeBack").toggle(!m.Sn());
                    var e = !1,
                        f = r.d(540),
                        k = !1;
                    u.keyup(function(b) {
                        13 == b.which ? d() : a("")
                    });
                    q.click(function() {
                        d()
                    })
                });
                m.init = ha();
                m.Th = function() {
                    p.text("");
                    u.val("").focus();
                    k.Nc(!1, 0)
                };
                m.lo = ha();
                return m
            }(xa, Fa, sa, V, ma, da, fb, bb, R, ra, H),
            pb = function(a, c, d, b, f, e, g, k, l, n) {
                var r = new function() {
                    function l() {
                        function a() {
                            if (w) {
                                var d = Date.now();
                                x += 0.1 * (d - h) / 25 * G;
                                h = d;
                                b.setTransform(1, 0, 0, 1, 0, 0);
                                b.clearRect(0, 0, E.width, E.height);
                                1 > F && (F += 0.025, F = Math.min(F, 1), b.globalAlpha = F);
                                b.save();
                                b.translate(0.5 * I.width, 0.5 * I.height);
                                b.translate(e.d(-300),
                                    e.d(-510));
                                b.rotate(x * Math.PI / 180);
                                b.translate(0.5 * -I.width, 0.5 * -I.height);
                                b.drawImage(I, 0, 0);
                                b.restore();
                                c(a)
                            }
                        }
                        var b = E.getContext("2d"),
                            c = window.requestAnimationFrame,
                            h = Date.now();
                        w = !0;
                        a()
                    }

                    function p() {
                        if (!H) {
                            if (null != E) {
                                var a = E.getContext("2d");
                                a.save();
                                a.setTransform(1, 0, 0, 1, 0, 0);
                                a.clearRect(0, 0, E.width, E.height);
                                a.restore()
                            }
                            F = 0;
                            H = !0;
                            $("#shadowPanel").show();
                            w || l()
                        }
                    }
                    var r = this,
                        q = [];
                    this.po = null;
                    this.eb = function() {
                        C = $("#fadeToBlack");
                        E = document.getElementById("shadowCanvas");
                        E.width = e.d(1024);
                        E.height =
                            e.d(576)
                    };
                    this.Ed = function(a) {
                        I = new Image;
                        I.src = g.Rc + "shadow.png";
                        if (a)
                            for (var b = 0, c = q.length; b < c; b++) a(q[b].id)
                    };
                    var A = this.Ze = function(a) {
                        for (var b = 0; b < q.length; b++)
                            if (q[b].id == a) return q[b];
                        return null
                    };
                    q.push(new c(a.qb, "menuPanel", "startBackground", !0));
                    q.push(d);
                    q.push(b);
                    q.push(new c(a.Gf, null, "levelBackground", !1));
                    q.push(new c(a.Ci, null, null, !1));
                    q.push(new c(a.zq, null, null, !1));
                    q.push(new c(a.Mg, "gameCompletePanel", "menuBackground", !0));
                    q.push(new c(a.Xd, "optionsPanel", "menuBackground", !0));
                    q.push(new c(a.xp, null, null, !1));
                    q.push(new c(a.Ke, "leaderboardPanel", "menuBackground", !0));
                    q.push(new c(a.Ee, "achievementsPanel", "menuBackground", !0));
                    q.push(f);
                    this.fj = a.qb;
                    this.Va = function(a, b) {
                        r.fj = a;
                        var c = A(a),
                            h = null == b ? !1 : b;
                        c.zB ? p() : (w = H = !1, $("#shadowPanel").hide());
                        setTimeout(function() {
                                c.Sf && $("#" + c.Sf).show();
                                c.pg && $("#" + c.pg).show();
                                for (var b = 0; b < q.length; b++) {
                                    var d = q[b];
                                    null != d.pg && d.pg != c.pg && $("#" + d.pg).hide();
                                    null != d.Sf && d.Sf != c.Sf && $("#" + d.Sf).hide()
                                }
                                null != r.po && r.po(a);
                                h || r.NA()
                            },
                            h ? 0 : s + z);
                        h || r.MA()
                    };
                    var s = 100,
                        z = 50,
                        h = 1,
                        C, D = !1;
                    this.MA = function() {
                        function a() {
                            var c = Date.now() - b;
                            C.css("opacity", k.jo(c, h, s));
                            c < s ? window.requestAnimationFrame(a) : C.css("opacity", h)
                        }
                        D = !0;
                        var b = Date.now();
                        C.css("opacity", 0);
                        C.css("display", "block");
                        window.requestAnimationFrame(a)
                    };
                    this.NA = function() {
                        function a() {
                            var c = Date.now() - b;
                            C.css("opacity", h - k.jo(c, h, s));
                            c < s ? window.requestAnimationFrame(a) : (C.css("opacity", 0), C.css("display", "none"), D = !1)
                        }
                        if (D) {
                            var b = Date.now();
                            window.requestAnimationFrame(a)
                        }
                    };
                    var w = !1,
                        x = 15,
                        E = null,
                        I = null,
                        F = 1,
                        H = !1,
                        G = n.kF || 1
                };
                l.subscribe(l.r.Mk, function(b) {
                    var c = b ? a.qb : a.Sc;
                    setTimeout(function() {
                        r.Va(c)
                    }, 1E3)
                });
                return r
            }(xa, Fa, ob, ic, jc, H, T, sa, V, R),
            cb = function(a, c, d, b, f, e) {
                return new function() {
                    this.xk = c.xk;
                    this.Qm = "278847552173744";
                    var g = window.location.host || "";
                    0 <= g.indexOf("thinkpixellab") ? this.Qm = "239041062884795" : 0 <= g.indexOf(".dev") && (this.Qm = "261043477350153");
                    var k = this;
                    f.subscribe(f.r.Ib, function() {
                        k.tu = d.W(b.Vq);
                        k.CB = d.W(b.Wq);
                        k.BB = [{
                            name: d.W(b.Uq),
                            link: c.xk
                        }]
                    });
                    this.Ey = function() {
                        var a = {};
                        a.appId = k.Qm;
                        a.status = !0;
                        a.cookie = !0;
                        a.xfbml = !0;
                        FB.init(a);
                        FB.Event.subscribe("edge.create", function() {
                            e.Iz && e.Iz()
                        })
                    };
                    this.Ft = function(b, c, d, e) {
                        if (a.YD) f.ra(f.r.zw, b, c, d);
                        else {
                            var g = {
                                method: "feed"
                            };
                            g.name = k.CB;
                            g.caption = b;
                            g.description = c;
                            g.link = k.xk;
                            g.picture = d;
                            g.actions = k.BB;
                            FB.ui(g, e)
                        }
                    };
                    this.Hy = function(a) {
                        a.events.bind("tweet", function() {
                            e.Sz && e.Sz()
                        })
                    }
                }
            }(T, R, ga, F, V, Na),
            kc = function(a, c, d, b, f, e, g, k, l, n) {
                return new function() {
                    function f(a, b, c, d, e, g, k) {
                        a.save();
                        a.setTransform(1,
                            0, 0, 1, 0, 0);
                        a.clearRect(0, 0, a.canvas.width, a.canvas.height);
                        a.restore();
                        a.save();
                        a.translate(d, e);
                        a.scale(b, c);
                        a.save();
                        a.beginPath();
                        a.moveTo(116.1, 38.3);
                        a.bezierCurveTo(117.2, 37.9, 118.2, 37.4, 119, 36.8);
                        a.lineTo(119.5, 35.6);
                        a.lineTo(123.3, 21.1);
                        a.bezierCurveTo(124.5, 18.2, 126.8, 14.6, 130.1, 10.3);
                        a.bezierCurveTo(129.9, 15.3, 133.6, 18.2, 141.3, 19);
                        a.bezierCurveTo(138.9, 19.1, 136.7, 19.9, 134.8, 21.5);
                        a.bezierCurveTo(132.4, 23.5, 130.7, 25.2, 129.7, 26.8);
                        a.bezierCurveTo(128.9, 28.3, 127.9, 30.7, 126.7, 33.8);
                        a.lineTo(126.4,
                            36.8);
                        a.lineTo(126.7, 37.7);
                        a.lineTo(128.6, 38.7);
                        a.bezierCurveTo(124.4, 37.5, 120.2, 37.4, 116.1, 38.3);
                        a.closePath();
                        a.moveTo(241.8, 203.6);
                        a.bezierCurveTo(241.6, 202.9, 241.1, 202.2, 240.5, 201.5);
                        a.lineTo(214.2, 185.6);
                        a.bezierCurveTo(212.8, 190, 210.9, 194.2, 208.4, 198.1);
                        a.lineTo(208.3, 198);
                        a.lineTo(209.4, 192.8);
                        a.lineTo(211, 183.6);
                        a.lineTo(211.2, 182.6);
                        a.lineTo(212.8, 173.3);
                        a.bezierCurveTo(212.3, 176, 211.3, 179, 210, 182.1);
                        a.bezierCurveTo(209.9, 182.4, 209.8, 182.6, 209.7, 182.8);
                        a.bezierCurveTo(208.6, 185.2, 207.3, 187.8,
                            205.8, 190.5);
                        a.bezierCurveTo(203.4, 194.6, 200.9, 197.9, 198.1, 200.4);
                        a.bezierCurveTo(198.7, 201.8, 199, 203.2, 199.2, 204.7);
                        a.bezierCurveTo(199.2, 204.8, 199.2, 204.9, 199.2, 205);
                        a.bezierCurveTo(199.5, 207.9, 199.6, 209.6, 199.7, 210.2);
                        a.bezierCurveTo(200, 211.2, 200.1, 212, 200.2, 212.5);
                        a.lineTo(199.6, 207.8);
                        a.bezierCurveTo(201.8, 213.8, 203.3, 218.7, 204, 222.5);
                        a.bezierCurveTo(205.3, 222.4, 206.5, 222.4, 207.7, 222.3);
                        a.bezierCurveTo(213.4, 222, 218.9, 221.9, 224.3, 222.1);
                        a.bezierCurveTo(227.5, 222.5, 230.1, 222.1, 232.3, 221.1);
                        a.bezierCurveTo(232.8,
                            220.7, 233.4, 220.2, 233.9, 219.6);
                        a.bezierCurveTo(235.2, 218.1, 236.5, 216.5, 237.8, 215);
                        a.bezierCurveTo(239.1, 213.3, 240.1, 211.5, 240.9, 209.6);
                        a.bezierCurveTo(241.8, 207.4, 242.1, 205.4, 241.8, 203.6);
                        a.closePath();
                        a.moveTo(148.8, 222.8);
                        a.bezierCurveTo(139.8, 224.7, 129.5, 225.7, 117.8, 225.9);
                        a.bezierCurveTo(109.6, 226, 101.7, 225.5, 94.3, 224.3);
                        a.bezierCurveTo(94.3, 224.9, 94.4, 225.6, 94.4, 226.2);
                        a.bezierCurveTo(94.4, 228.1, 94.3, 230, 94, 232);
                        a.lineTo(93.8, 233);
                        a.bezierCurveTo(103.6, 234.6, 113.4, 235.1, 123.2, 234.4);
                        a.bezierCurveTo(132.2,
                            234.4, 141, 233.2, 149.5, 231);
                        a.bezierCurveTo(149.4, 230.6, 149.4, 230.3, 149.4, 230);
                        a.bezierCurveTo(149, 227.6, 148.9, 225.2, 148.8, 222.8);
                        a.closePath();
                        a.moveTo(196.6, 153.6);
                        a.lineTo(194.5, 152.6);
                        a.bezierCurveTo(194.1, 152.8, 193.8, 153, 193.4, 153.2);
                        a.bezierCurveTo(192.6, 153.8, 191.7, 154.5, 191, 155.2);
                        a.lineTo(190.2, 155.8);
                        a.bezierCurveTo(186.6, 158.8, 183.8, 160.7, 182, 161.5);
                        a.bezierCurveTo(182, 162.2, 181.4, 164, 180.2, 166.7);
                        a.bezierCurveTo(183.2, 164.8, 186.2, 162.7, 189.3, 160.6);
                        a.bezierCurveTo(192.6, 158.2, 195.6, 155.9,
                            198.4, 153.8);
                        a.bezierCurveTo(197.6, 153.8, 197, 153.7, 196.6, 153.6);
                        a.closePath();
                        a.moveTo(121.1, 189);
                        a.bezierCurveTo(128, 188.9, 134.8, 188, 141.7, 186);
                        a.bezierCurveTo(141.3, 185.9, 141, 185.7, 140.7, 185.6);
                        a.bezierCurveTo(136.2, 183.2, 133, 181.8, 131.3, 181.4);
                        a.bezierCurveTo(128.8, 181.8, 125.7, 181.8, 121.9, 181.4);
                        a.bezierCurveTo(118.1, 181, 114, 180.5, 109.4, 179.7);
                        a.lineTo(109.3, 179.7);
                        a.bezierCurveTo(108.3, 180.9, 106.5, 182.5, 103.8, 184.6);
                        a.bezierCurveTo(103.6, 184.7, 103.4, 184.9, 103.2, 185);
                        a.lineTo(102.1, 185.9);
                        a.lineTo(102.9,
                            186.1);
                        a.bezierCurveTo(110.1, 188.1, 116.2, 189, 121.1, 189);
                        a.closePath();
                        a.moveTo(63.1, 164.7);
                        a.lineTo(50.7, 157.9);
                        a.lineTo(45.8, 159.6);
                        a.lineTo(46.2, 159.9);
                        a.bezierCurveTo(46.3, 160, 46.4, 160.1, 46.5, 160.2);
                        a.bezierCurveTo(52, 164, 57.9, 167.5, 64.4, 170.9);
                        a.lineTo(65.5, 171.5);
                        a.lineTo(65.2, 170.7);
                        a.bezierCurveTo(64, 168, 63.4, 166, 63.1, 164.7);
                        a.closePath();
                        a.moveTo(36.5, 191.7);
                        a.bezierCurveTo(35.2, 189.5, 34, 187.3, 33, 185);
                        a.lineTo(33.1, 185.9);
                        a.lineTo(34, 192.4);
                        a.lineTo(31.3, 189.4);
                        a.bezierCurveTo(30.8, 188, 27.8,
                            189.3, 22.4, 193.3);
                        a.bezierCurveTo(16.9, 197.2, 13.7, 199.6, 12.7, 200.6);
                        a.bezierCurveTo(11.6, 201.6, 10.2, 202.9, 8.4, 204.6);
                        a.bezierCurveTo(6.7, 206.1, 5.4, 207.3, 4.5, 208.2);
                        a.bezierCurveTo(3.6, 209, 3.2, 210.1, 3.3, 211.5);
                        a.bezierCurveTo(3.5, 212.9, 4, 214.8, 4.8, 217.3);
                        a.bezierCurveTo(5.6, 219.7, 6.5, 221.8, 7.4, 223.5);
                        a.bezierCurveTo(8.3, 225.2, 9.8, 226.4, 11.9, 227.1);
                        a.bezierCurveTo(13.9, 227.7, 15.9, 227.9, 17.8, 227.7);
                        a.bezierCurveTo(19.7, 227.5, 21.3, 227.4, 22.6, 227.4);
                        a.bezierCurveTo(24.5, 227.3, 26.4, 227.2, 28.4, 227.2);
                        a.bezierCurveTo(30.2,
                            227.2, 32, 227.2, 33.8, 227.2);
                        a.bezierCurveTo(35.8, 227.2, 37.7, 227.2, 39.7, 227.2);
                        a.bezierCurveTo(41.2, 227.3, 42.9, 227.4, 44.5, 227.6);
                        a.bezierCurveTo(44.5, 225.9, 44.5, 223.5, 44.6, 220.3);
                        a.lineTo(44.6, 213.4);
                        a.lineTo(44.7, 207.6);
                        a.lineTo(45.1, 204.8);
                        a.lineTo(45.4, 203);
                        a.bezierCurveTo(45.4, 202.9, 45.4, 202.8, 45.5, 202.6);
                        a.bezierCurveTo(43.8, 201.2, 42.3, 199.7, 40.9, 198.1);
                        a.bezierCurveTo(39.3, 196, 37.9, 193.8, 36.5, 191.7);
                        a.closePath();
                        a.fillStyle = "rgb(100, 150, 40)";
                        a.fill();
                        a.beginPath();
                        a.moveTo(212.6, 151.5);
                        a.bezierCurveTo(213.3,
                            158.8, 213.4, 166.1, 212.8, 173.3);
                        a.bezierCurveTo(212.3, 176, 211.3, 179, 210, 182.2);
                        a.bezierCurveTo(209.9, 182.4, 209.8, 182.6, 209.7, 182.8);
                        a.bezierCurveTo(208.6, 185.3, 207.3, 187.8, 205.8, 190.5);
                        a.bezierCurveTo(203.4, 194.7, 200.9, 198, 198.1, 200.5);
                        a.bezierCurveTo(198.7, 201.8, 199, 203.3, 199.2, 204.7);
                        a.bezierCurveTo(199.2, 204.8, 199.2, 204.9, 199.2, 205.1);
                        a.bezierCurveTo(199.5, 207.9, 199.6, 209.7, 199.7, 210.2);
                        a.bezierCurveTo(199.9, 214.2, 200, 218.2, 199.9, 222.4);
                        a.bezierCurveTo(199.9, 222.5, 199.9, 222.7, 199.9, 222.9);
                        a.bezierCurveTo(199.9,
                            225, 199.7, 227, 199.4, 228.8);
                        a.bezierCurveTo(199.1, 230.5, 198.7, 232, 198.3, 233.5);
                        a.lineTo(196.7, 235.2);
                        a.bezierCurveTo(196.6, 235.3, 196.5, 235.4, 196.3, 235.5);
                        a.bezierCurveTo(195.2, 236.4, 193.3, 237.6, 190.7, 239.2);
                        a.bezierCurveTo(188.1, 240.8, 184.5, 241.7, 179.9, 242.1);
                        a.bezierCurveTo(175.3, 242.4, 172, 242.5, 169.8, 242.3);
                        a.bezierCurveTo(167.8, 242.2, 165.5, 241.7, 162.9, 240.8);
                        a.bezierCurveTo(160.4, 240, 158, 238, 155.6, 234.8);
                        a.bezierCurveTo(155.4, 234.6, 155.3, 234.4, 155.1, 234.2);
                        a.bezierCurveTo(154.3, 233, 153.5, 231.6,
                            152.8, 230.1);
                        a.bezierCurveTo(151.9, 227.9, 151.2, 225.3, 150.7, 222.4);
                        a.bezierCurveTo(150.7, 222.2, 150.6, 222.1, 150.6, 221.9);
                        a.bezierCurveTo(149.7, 216.4, 149.3, 213.1, 149.2, 212);
                        a.bezierCurveTo(148.8, 215.6, 148.6, 219.2, 148.8, 222.8);
                        a.bezierCurveTo(139.8, 224.7, 129.5, 225.7, 117.8, 225.9);
                        a.bezierCurveTo(109.6, 226, 101.7, 225.5, 94.3, 224.3);
                        a.bezierCurveTo(94.2, 220.8, 94, 217.1, 93.8, 213.5);
                        a.bezierCurveTo(93.8, 214.9, 93.7, 216, 93.6, 216.6);
                        a.bezierCurveTo(93.5, 217.2, 93.5, 217.7, 93.4, 218.1);
                        a.bezierCurveTo(93.4, 218.5, 93.2,
                            219.4, 92.8, 220.9);
                        a.bezierCurveTo(92.6, 222, 92.3, 223, 92, 224);
                        a.bezierCurveTo(91.9, 224.3, 91.8, 224.6, 91.7, 224.8);
                        a.bezierCurveTo(91.3, 226, 90.8, 227.2, 90.2, 228.3);
                        a.bezierCurveTo(89.9, 229, 89.5, 229.7, 89.2, 230.4);
                        a.bezierCurveTo(88.8, 230.9, 88.4, 231.4, 88, 231.9);
                        a.bezierCurveTo(87.5, 232.6, 86.9, 233.2, 86.2, 233.7);
                        a.bezierCurveTo(85.8, 234.1, 85.4, 234.5, 84.9, 234.9);
                        a.bezierCurveTo(83.9, 235.6, 82.8, 236.2, 81.6, 236.7);
                        a.bezierCurveTo(80.2, 237.3, 78.7, 237.8, 77.1, 238.2);
                        a.bezierCurveTo(74.1, 238.8, 71, 239.1, 67.8, 239.1);
                        a.bezierCurveTo(60.2, 239.2, 53.4, 237.3, 47.4, 233.3);
                        a.bezierCurveTo(45.9, 232.5, 45, 231.7, 44.9, 230.9);
                        a.lineTo(44.6, 229.2);
                        a.bezierCurveTo(44.6, 228.8, 44.5, 228.3, 44.5, 227.6);
                        a.bezierCurveTo(44.5, 226, 44.5, 223.5, 44.6, 220.3);
                        a.lineTo(44.6, 213.4);
                        a.lineTo(44.7, 207.6);
                        a.lineTo(45.1, 204.9);
                        a.lineTo(45.4, 203);
                        a.bezierCurveTo(45.4, 202.9, 45.4, 202.8, 45.5, 202.7);
                        a.bezierCurveTo(43.8, 201.2, 42.3, 199.7, 40.9, 198.2);
                        a.bezierCurveTo(39.3, 196, 37.9, 193.9, 36.5, 191.7);
                        a.bezierCurveTo(35.2, 189.6, 34, 187.4, 33, 185.1);
                        a.lineTo(32.7,
                            183.5);
                        a.bezierCurveTo(31.8, 176.3, 31, 168.9, 30.3, 161.3);
                        a.bezierCurveTo(30.3, 161, 30.3, 160.7, 30.2, 160.4);
                        a.bezierCurveTo(34.5, 162, 39, 162.1, 43.8, 160.4);
                        a.bezierCurveTo(44.4, 160.2, 45.1, 159.9, 45.8, 159.6);
                        a.lineTo(46.2, 159.9);
                        a.bezierCurveTo(46.3, 160, 46.4, 160.1, 46.5, 160.2);
                        a.bezierCurveTo(52, 164, 57.9, 167.6, 64.4, 170.9);
                        a.lineTo(65.5, 171.5);
                        a.bezierCurveTo(66.9, 174.7, 68.3, 177.8, 69.8, 180.9);
                        a.bezierCurveTo(71.4, 184.1, 73.4, 187, 76, 189.7);
                        a.bezierCurveTo(78.5, 192.3, 81.7, 193.4, 85.5, 193.1);
                        a.bezierCurveTo(89.2,
                            192.6, 92.8, 191.5, 96.3, 189.7);
                        a.bezierCurveTo(98.5, 188.7, 100.4, 187.4, 102.1, 185.9);
                        a.lineTo(102.9, 186.2);
                        a.bezierCurveTo(110.1, 188.1, 116.2, 189.1, 121.1, 189.1);
                        a.bezierCurveTo(128, 189, 134.8, 188, 141.7, 186.1);
                        a.bezierCurveTo(142.1, 186.3, 142.6, 186.5, 143, 186.7);
                        a.bezierCurveTo(143.5, 186.9, 144, 187.1, 144.5, 187.3);
                        a.bezierCurveTo(147.1, 188.4, 149.8, 189.4, 152.5, 190.3);
                        a.bezierCurveTo(155.3, 191.3, 158.2, 191.8, 161.2, 191.8);
                        a.bezierCurveTo(164.2, 191.8, 166.7, 190.7, 168.6, 188.6);
                        a.bezierCurveTo(170, 187.2, 171.1, 185.7,
                            172, 184.1);
                        a.bezierCurveTo(173.4, 181.7, 174.7, 179.2, 175.9, 176.6);
                        a.bezierCurveTo(177.1, 174, 178.3, 171.4, 179.4, 168.8);
                        a.bezierCurveTo(179.7, 168, 180, 167.4, 180.2, 166.8);
                        a.bezierCurveTo(183.2, 164.8, 186.2, 162.8, 189.3, 160.6);
                        a.bezierCurveTo(192.6, 158.2, 195.6, 156, 198.4, 153.8);
                        a.bezierCurveTo(199.3, 153.8, 200.6, 153.8, 202.1, 153.6);
                        a.bezierCurveTo(204.6, 153.5, 207, 153.1, 209.4, 152.5);
                        a.bezierCurveTo(210.5, 152.2, 211.6, 151.8, 212.6, 151.4);
                        a.bezierCurveTo(212.6, 151.4, 212.6, 151.4, 212.6, 151.5);
                        a.closePath();
                        a.moveTo(124.3,
                            61);
                        a.bezierCurveTo(124.5, 61.3, 124.8, 61.6, 125, 61.9);
                        a.bezierCurveTo(133.4, 55.3, 142.8, 50.4, 153.1, 47.4);
                        a.bezierCurveTo(149.8, 46, 146.3, 44.6, 142.9, 43.3);
                        a.bezierCurveTo(139.9, 42.5, 137.6, 41.7, 135.8, 41.1);
                        a.bezierCurveTo(134.1, 40.4, 132.7, 40, 131.6, 39.8);
                        a.bezierCurveTo(130.5, 39.6, 129.5, 39.2, 128.6, 38.8);
                        a.bezierCurveTo(124.4, 37.6, 120.2, 37.4, 116.1, 38.4);
                        a.bezierCurveTo(115.7, 38.5, 115.2, 38.6, 114.8, 38.7);
                        a.bezierCurveTo(114.6, 38.8, 114.2, 38.9, 113.7, 39);
                        a.lineTo(106, 40.5);
                        a.bezierCurveTo(102.5, 41.1, 99.2, 41.9,
                            95.9, 42.8);
                        a.bezierCurveTo(106.9, 45.7, 116.3, 51.7, 124.3, 61);
                        a.closePath();
                        a.moveTo(141.3, 19);
                        a.lineTo(143.4, 19);
                        a.lineTo(144.6, 19.1);
                        a.bezierCurveTo(147.1, 19.4, 148.8, 19.2, 149.7, 18.6);
                        a.bezierCurveTo(151.7, 17.6, 152.9, 16, 153.3, 13.7);
                        a.bezierCurveTo(153.7, 12.1, 153.7, 10.4, 153.5, 8.6);
                        a.bezierCurveTo(152.9, 5.3, 150.9, 3.4, 147.6, 3.1);
                        a.bezierCurveTo(141, 2.4, 135.2, 4.8, 130.1, 10.3);
                        a.bezierCurveTo(129.9, 15.3, 133.6, 18.2, 141.3, 19);
                        a.closePath();
                        a.moveTo(221, 104);
                        a.bezierCurveTo(220.8, 103.3, 220.5, 102.6, 220.2, 101.9);
                        a.bezierCurveTo(219.3, 99.7, 218.2, 97.5, 216.9, 95.4);
                        a.bezierCurveTo(213.3, 89.7, 209.2, 84.5, 204.4, 79.7);
                        a.bezierCurveTo(205.4, 83, 205.9, 86.5, 205.9, 90.2);
                        a.bezierCurveTo(205.8, 91.2, 205.8, 92.2, 205.7, 93.2);
                        a.bezierCurveTo(205.5, 95.7, 205.1, 98.2, 204.6, 100.6);
                        a.bezierCurveTo(204.9, 102.3, 205.3, 104.3, 205.7, 106.6);
                        a.lineTo(205.7, 106.6);
                        a.bezierCurveTo(205.2, 104.4, 204.9, 102.5, 204.6, 101);
                        a.bezierCurveTo(204.2, 103, 203.6, 104.9, 203, 106.9);
                        a.lineTo(202.9, 106.9);
                        a.bezierCurveTo(200.6, 113.5, 197.1, 119.7, 192.3, 125.5);
                        a.bezierCurveTo(188.4,
                            130, 183.6, 133.5, 177.8, 135.9);
                        a.bezierCurveTo(169.7, 139.6, 161.7, 140.9, 153.7, 139.7);
                        a.bezierCurveTo(147.7, 138.6, 142.2, 136.2, 137.2, 132.7);
                        a.bezierCurveTo(131.7, 128.8, 126.4, 125, 121.3, 121.5);
                        a.lineTo(120.9, 121.3);
                        a.lineTo(120.6, 121.5);
                        a.bezierCurveTo(113.9, 128, 106.4, 133.2, 98, 137.3);
                        a.bezierCurveTo(83.7, 144, 70, 142.9, 56.8, 134);
                        a.bezierCurveTo(50.6, 130, 45.8, 125.2, 42.5, 119.7);
                        a.bezierCurveTo(38.6, 113.5, 36.7, 106.4, 36.6, 98.3);
                        a.bezierCurveTo(36.6, 93.4, 37.1, 88.7, 38.2, 84.1);
                        a.bezierCurveTo(37.7, 84.8, 37.1, 85.5,
                            36.6, 86.2);
                        a.bezierCurveTo(29.8, 95.7, 24.4, 105.8, 20.3, 116.5);
                        a.bezierCurveTo(20.4, 116.4, 20.4, 117, 20.3, 118.2);
                        a.bezierCurveTo(20.2, 119.7, 20.7, 121.1, 21.6, 122.5);
                        a.bezierCurveTo(22.2, 123.4, 23.3, 125, 25, 127.3);
                        a.lineTo(26.2, 129.3);
                        a.bezierCurveTo(26.3, 129.4, 26.4, 129.6, 26.5, 129.7);
                        a.bezierCurveTo(27.9, 131.7, 29.4, 133.7, 31.1, 135.6);
                        a.bezierCurveTo(34, 138.9, 37.4, 142, 41.1, 144.9);
                        a.bezierCurveTo(44.1, 147.2, 47.2, 149.4, 50.5, 151.6);
                        a.bezierCurveTo(52.5, 152.9, 54.7, 154.4, 57, 155.8);
                        a.bezierCurveTo(60.8, 158.3, 65.2,
                            160.8, 70.1, 163.1);
                        a.bezierCurveTo(71, 163.6, 72, 164, 72.9, 164.4);
                        a.bezierCurveTo(79.8, 167.5, 86.9, 170.1, 94.1, 172.2);
                        a.bezierCurveTo(101.5, 174.4, 109, 175.9, 116.7, 176.5);
                        a.bezierCurveTo(122.5, 177.2, 128.4, 177.1, 134.5, 176.3);
                        a.bezierCurveTo(141.6, 175.3, 147.4, 174, 152, 172.4);
                        a.bezierCurveTo(156.6, 170.7, 159.7, 169.4, 161.4, 168.4);
                        a.lineTo(181.4, 156.2);
                        a.bezierCurveTo(187.7, 152, 192.6, 148.2, 195.9, 144.6);
                        a.lineTo(202.9, 136.6);
                        a.lineTo(209.8, 126.7);
                        a.lineTo(211.7, 124);
                        a.lineTo(214.9, 119.9);
                        a.lineTo(216.7, 117.5);
                        a.bezierCurveTo(217.8,
                            116.3, 218.7, 115.1, 219.4, 114);
                        a.bezierCurveTo(219.8, 113.5, 220.1, 113, 220.3, 112.5);
                        a.bezierCurveTo(220.8, 111.5, 221.1, 110.5, 221.3, 109.4);
                        a.bezierCurveTo(221.5, 108.5, 221.6, 107.6, 221.6, 106.7);
                        a.bezierCurveTo(221.6, 105.8, 221.4, 104.9, 221, 104);
                        a.closePath();
                        a.fillStyle = "rgb(153, 205, 0)";
                        a.fill();
                        a.beginPath();
                        a.moveTo(245.5, 203.6);
                        a.bezierCurveTo(245.4, 202.9, 245.3, 202.4, 245.2, 202);
                        a.bezierCurveTo(244.7, 200.9, 244.1, 200.1, 243.5, 199.7);
                        a.bezierCurveTo(242.9, 199.2, 241.2, 198.1, 238.5, 196.2);
                        a.bezierCurveTo(238,
                            195.9, 237.5, 195.5, 237, 195.2);
                        a.bezierCurveTo(234.3, 193.5, 230.8, 191.6, 226.3, 189.3);
                        a.bezierCurveTo(223, 187.4, 219.4, 185.7, 215.7, 184.2);
                        a.lineTo(214.7, 183.8);
                        a.bezierCurveTo(216, 179.3, 216.8, 174.4, 217, 169.3);
                        a.bezierCurveTo(217.3, 162.5, 217.5, 155.7, 217.3, 148.8);
                        a.bezierCurveTo(217.5, 148.7, 217.7, 148.6, 217.9, 148.5);
                        a.bezierCurveTo(220.1, 147, 221.6, 145.1, 222.5, 142.8);
                        a.bezierCurveTo(223.5, 140.2, 224.2, 137.4, 224.6, 134.6);
                        a.bezierCurveTo(224.9, 132.2, 225, 129.8, 225.1, 127.3);
                        a.bezierCurveTo(225.1, 124.8, 225.1, 122.4,
                            224.8, 119.9);
                        a.bezierCurveTo(224.8, 119.4, 224.7, 119, 224.6, 118.6);
                        a.lineTo(224.5, 115.9);
                        a.bezierCurveTo(225.1, 114.1, 225.4, 111.8, 225.6, 108.9);
                        a.bezierCurveTo(225.7, 107.4, 225.5, 105.8, 224.9, 104.3);
                        a.bezierCurveTo(220.3, 91.4, 212.2, 80.3, 200.6, 71);
                        a.bezierCurveTo(195.8, 62.6, 189, 55.8, 180.1, 50.6);
                        a.bezierCurveTo(172.6, 46.4, 165.2, 45, 157.9, 46.2);
                        a.bezierCurveTo(155.1, 45, 152.3, 43.9, 149.4, 42.8);
                        a.bezierCurveTo(148.1, 42.3, 146.8, 41.9, 145.5, 41.4);
                        a.bezierCurveTo(143.2, 40.6, 140.8, 39.9, 138.4, 39.2);
                        a.bezierCurveTo(136.1,
                            38.4, 133.8, 37.6, 131.6, 36.7);
                        a.bezierCurveTo(131.1, 36.6, 130.8, 36.3, 130.4, 36);
                        a.bezierCurveTo(130.1, 35.6, 129.9, 35.3, 129.8, 35);
                        a.bezierCurveTo(129.8, 34.3, 129.9, 33.8, 130.1, 33.5);
                        a.bezierCurveTo(130.9, 31.6, 132.7, 30, 135.7, 29);
                        a.bezierCurveTo(137.8, 27.6, 140.6, 26.5, 144, 25.5);
                        a.bezierCurveTo(152.1, 23, 156.6, 19.2, 157.4, 13.9);
                        a.bezierCurveTo(158.5, 7.2, 155.6, 2.8, 148.7, 0.7);
                        a.bezierCurveTo(141.1, -1.7, 133.2, 2, 125, 11.9);
                        a.bezierCurveTo(121.9, 15.6, 120.1, 19, 119.4, 22.1);
                        a.lineTo(118.6, 25.4);
                        a.bezierCurveTo(118.2, 30,
                            117.2, 33, 115.7, 34.5);
                        a.bezierCurveTo(114.8, 35.3, 113.3, 36, 111.2, 36.6);
                        a.bezierCurveTo(104.1, 37.5, 97.2, 39.2, 90.6, 41.6);
                        a.bezierCurveTo(89.4, 41.4, 88.3, 41.3, 87.1, 41.1);
                        a.bezierCurveTo(71.9, 41.6, 59.7, 47.8, 50.4, 59.6);
                        a.bezierCurveTo(46, 64.9, 42.7, 70.6, 40.4, 76.7);
                        a.bezierCurveTo(39.8, 77.4, 39.2, 78.1, 38.5, 78.8);
                        a.bezierCurveTo(29.4, 89.5, 22.3, 101, 17.2, 113.3);
                        a.bezierCurveTo(16.8, 114.3, 16.4, 115.3, 16.1, 116.3);
                        a.bezierCurveTo(15.8, 117, 15.6, 117.6, 15.5, 118.3);
                        a.bezierCurveTo(15.4, 118.7, 15.3, 119.1, 15.3, 119.5);
                        a.bezierCurveTo(15.2,
                            120.4, 15.1, 121.2, 15.2, 122.1);
                        a.bezierCurveTo(15.5, 124.5, 16.4, 127.1, 18, 129.6);
                        a.bezierCurveTo(18.5, 132, 18.6, 134.2, 18.3, 136);
                        a.bezierCurveTo(17.4, 144.5, 19.9, 151.6, 25.9, 157.5);
                        a.bezierCurveTo(25.9, 159.4, 26, 161.4, 26.1, 163.4);
                        a.bezierCurveTo(26.4, 169.1, 27.2, 175.1, 28.4, 181.4);
                        a.bezierCurveTo(28.7, 182.6, 28.9, 183.7, 29.2, 184.9);
                        a.bezierCurveTo(29.1, 184.9, 29, 185, 28.9, 185);
                        a.bezierCurveTo(25.6, 186.9, 22.7, 188.6, 20.2, 190.1);
                        a.bezierCurveTo(17.8, 191.7, 15.6, 193.1, 13.8, 194.4);
                        a.bezierCurveTo(12.5, 195.5, 11.1, 196.7,
                            9.6, 197.9);
                        a.bezierCurveTo(7.9, 199, 6.3, 200.4, 4.9, 201.9);
                        a.bezierCurveTo(3.7, 203, 2.7, 204.1, 1.7, 205);
                        a.bezierCurveTo(0.7, 206, 0.2, 207.4, 0, 209.2);
                        a.bezierCurveTo(-0.1, 211, 0, 212.5, 0.2, 213.8);
                        a.bezierCurveTo(0.4, 215, 0.9, 217, 1.5, 219.7);
                        a.bezierCurveTo(2.1, 222.4, 3, 224.6, 4, 226.5);
                        a.bezierCurveTo(5.1, 228.3, 6.7, 229.7, 9, 230.6);
                        a.bezierCurveTo(9.6, 230.8, 10.3, 231, 11.1, 231.2);
                        a.bezierCurveTo(14.9, 231.1, 18.6, 231.1, 22.4, 231.2);
                        a.bezierCurveTo(24.2, 231.3, 26, 231.5, 27.8, 231.7);
                        a.bezierCurveTo(29.4, 231.8, 31, 232, 32.7,
                            232.2);
                        a.bezierCurveTo(34.1, 232.3, 35.6, 232.5, 37.1, 232.6);
                        a.bezierCurveTo(38.4, 232.7, 39.8, 232.8, 41.2, 232.9);
                        a.bezierCurveTo(41.5, 232.9, 41.8, 233, 42.1, 233);
                        a.lineTo(42.2, 233.2);
                        a.bezierCurveTo(42.4, 233.8, 42.8, 234.4, 43.1, 234.8);
                        a.bezierCurveTo(48.8, 238.6, 55, 240.9, 61.6, 241.5);
                        a.bezierCurveTo(68.7, 242.6, 75.6, 242.3, 82.4, 240.5);
                        a.bezierCurveTo(82.5, 240.5, 82.5, 240.5, 82.6, 240.5);
                        a.bezierCurveTo(84, 240.2, 85.4, 239.9, 86.7, 239.6);
                        a.bezierCurveTo(88.1, 239.3, 89.3, 238.9, 90.4, 238.4);
                        a.bezierCurveTo(90.9, 238.1, 91.4,
                            237.8, 91.8, 237.3);
                        a.bezierCurveTo(104.5, 241.2, 118.7, 242, 134.5, 239.7);
                        a.bezierCurveTo(139.8, 238.9, 145.2, 237.5, 150.9, 235.6);
                        a.bezierCurveTo(151.5, 237, 152.2, 238.2, 153.1, 239.5);
                        a.bezierCurveTo(153.8, 240.1, 154.6, 240.7, 155.6, 241.3);
                        a.bezierCurveTo(156.9, 242.2, 158.4, 242.9, 160.2, 243.5);
                        a.bezierCurveTo(161.9, 243.8, 163.7, 244.1, 165.5, 244.5);
                        a.bezierCurveTo(171.9, 244.8, 178, 244.7, 183.5, 244.1);
                        a.bezierCurveTo(188, 243.7, 192.3, 242.6, 196.2, 240.7);
                        a.bezierCurveTo(197, 240.3, 197.6, 239.9, 198.3, 239.5);
                        a.bezierCurveTo(200,
                            238.4, 201.4, 237.4, 202.3, 236.5);
                        a.bezierCurveTo(203.2, 235.6, 203.9, 233.1, 204.5, 229.2);
                        a.bezierCurveTo(204.5, 229, 204.6, 228.7, 204.6, 228.3);
                        a.lineTo(223.4, 226.8);
                        a.bezierCurveTo(225.5, 226.6, 227.6, 226.4, 229.8, 226.3);
                        a.bezierCurveTo(232, 226.2, 233.8, 225.5, 235.2, 224.1);
                        a.bezierCurveTo(237, 222.5, 238.5, 220.8, 239.4, 219.1);
                        a.bezierCurveTo(240.4, 217.5, 241.3, 215.9, 242.2, 214.4);
                        a.bezierCurveTo(243, 212.9, 243.6, 211.6, 244.1, 210.5);
                        a.bezierCurveTo(244.6, 209.4, 244.9, 208.1, 245.2, 206.7);
                        a.bezierCurveTo(245.4, 205.2, 245.5,
                            204.2, 245.5, 203.6);
                        a.closePath();
                        a.moveTo(219.9, 140.2);
                        a.bezierCurveTo(219.5, 141.6, 218.8, 143, 218, 144.5);
                        a.bezierCurveTo(217.8, 144.9, 217.6, 145.2, 217.3, 145.6);
                        a.bezierCurveTo(216.7, 146.3, 215.9, 146.9, 214.9, 147.4);
                        a.bezierCurveTo(214.1, 147.8, 213.2, 148.2, 212.3, 148.4);
                        a.bezierCurveTo(210.2, 149.1, 208, 149.5, 205.6, 149.5);
                        a.bezierCurveTo(204.5, 149.5, 203.4, 149.4, 202.3, 149.3);
                        a.bezierCurveTo(200.6, 148.9, 199.7, 148, 199.8, 146.7);
                        a.lineTo(200.7, 145.2);
                        a.bezierCurveTo(201.3, 144.3, 201.8, 143.4, 202.4, 142.5);
                        a.bezierCurveTo(202.7,
                            141.9, 203, 141.3, 203.4, 140.8);
                        a.bezierCurveTo(203.8, 140, 204.2, 139.2, 204.7, 138.5);
                        a.bezierCurveTo(205.3, 137.7, 205.9, 136.8, 206.5, 136);
                        a.bezierCurveTo(206.9, 135.5, 207.3, 135, 207.6, 134.5);
                        a.bezierCurveTo(208.3, 133.7, 209, 132.8, 209.7, 132);
                        a.bezierCurveTo(209.9, 131.7, 210.2, 131.4, 210.5, 131);
                        a.bezierCurveTo(211, 130.4, 211.5, 129.9, 212.1, 129.3);
                        a.bezierCurveTo(212.6, 128.8, 213.1, 128.3, 213.6, 127.8);
                        a.bezierCurveTo(214.1, 127.4, 214.6, 127, 215.1, 126.6);
                        a.bezierCurveTo(215.3, 126.4, 215.5, 126.3, 215.6, 126.2);
                        a.bezierCurveTo(216.8,
                            125.4, 217.9, 124.8, 219, 124.5);
                        a.lineTo(219.3, 125.4);
                        a.bezierCurveTo(220, 127.9, 220.5, 130.6, 220.8, 133.3);
                        a.bezierCurveTo(221, 135.7, 220.8, 138, 219.9, 140.2);
                        a.closePath();
                        a.moveTo(106, 40.4);
                        a.lineTo(113.7, 38.9);
                        a.bezierCurveTo(114.2, 38.8, 114.6, 38.7, 114.8, 38.6);
                        a.bezierCurveTo(115.2, 38.6, 115.7, 38.4, 116.1, 38.3);
                        a.bezierCurveTo(117.2, 37.9, 118.2, 37.4, 119, 36.8);
                        a.lineTo(119.5, 35.6);
                        a.lineTo(123.3, 21.1);
                        a.bezierCurveTo(124.5, 18.2, 126.8, 14.6, 130.1, 10.3);
                        a.bezierCurveTo(135.2, 4.8, 141, 2.4, 147.6, 3.1);
                        a.bezierCurveTo(150.9,
                            3.4, 152.9, 5.2, 153.5, 8.5);
                        a.bezierCurveTo(153.7, 10.3, 153.7, 12, 153.3, 13.7);
                        a.bezierCurveTo(152.9, 15.9, 151.7, 17.6, 149.7, 18.6);
                        a.bezierCurveTo(148.8, 19.2, 147.1, 19.4, 144.6, 19.1);
                        a.lineTo(143.4, 19);
                        a.lineTo(141.3, 19);
                        a.bezierCurveTo(138.9, 19.1, 136.7, 19.9, 134.8, 21.5);
                        a.bezierCurveTo(132.4, 23.5, 130.7, 25.2, 129.7, 26.8);
                        a.bezierCurveTo(128.9, 28.3, 127.9, 30.7, 126.7, 33.8);
                        a.lineTo(126.4, 36.8);
                        a.lineTo(126.7, 37.7);
                        a.lineTo(128.6, 38.7);
                        a.bezierCurveTo(129.5, 39.2, 130.5, 39.5, 131.6, 39.8);
                        a.bezierCurveTo(132.7, 40, 134.1,
                            40.4, 135.8, 41);
                        a.bezierCurveTo(137.6, 41.7, 139.9, 42.4, 142.9, 43.3);
                        a.bezierCurveTo(146.3, 44.6, 149.8, 46, 153.1, 47.4);
                        a.bezierCurveTo(142.8, 50.4, 133.4, 55.2, 125, 61.8);
                        a.bezierCurveTo(124.8, 61.6, 124.5, 61.3, 124.3, 61);
                        a.bezierCurveTo(116.3, 51.7, 106.9, 45.6, 95.9, 42.7);
                        a.bezierCurveTo(99.2, 41.9, 102.5, 41.1, 106, 40.4);
                        a.closePath();
                        a.moveTo(41.7, 90.1);
                        a.bezierCurveTo(42.4, 84.8, 43.6, 79.9, 45.5, 75.3);
                        a.bezierCurveTo(46.5, 72.7, 47.7, 70.1, 49.2, 67.7);
                        a.bezierCurveTo(52.7, 61.9, 57.3, 56.8, 63, 52.3);
                        a.bezierCurveTo(70.4, 46.7,
                            77.8, 43.8, 85.3, 43.7);
                        a.bezierCurveTo(87.3, 43.6, 89.3, 43.8, 91.3, 44.1);
                        a.bezierCurveTo(95.6, 44.9, 100, 46.5, 104.4, 49.1);
                        a.bezierCurveTo(111.9, 53.4, 117.3, 59.5, 120.8, 67.4);
                        a.lineTo(124.2, 73.8);
                        a.lineTo(124.6, 73.8);
                        a.bezierCurveTo(124.7, 73.5, 124.9, 73.2, 125, 72.9);
                        a.bezierCurveTo(126.3, 71.1, 127.5, 69.4, 128.6, 67.7);
                        a.bezierCurveTo(136, 57.6, 146.1, 51.7, 158.7, 50.1);
                        a.bezierCurveTo(158.9, 50.1, 159.1, 50.1, 159.2, 50.1);
                        a.bezierCurveTo(162.5, 50.1, 165.7, 50.5, 168.8, 51.2);
                        a.bezierCurveTo(176.5, 53, 183.4, 56.7, 189.4, 62.4);
                        a.bezierCurveTo(190, 63, 190.6, 63.5, 191.1, 64.1);
                        a.bezierCurveTo(193.9, 67, 196.1, 70.1, 197.8, 73.5);
                        a.bezierCurveTo(201.1, 79.7, 202.5, 86.8, 202.2, 94.7);
                        a.bezierCurveTo(202, 99, 201.3, 103.2, 199.9, 107.1);
                        a.bezierCurveTo(197.5, 114.2, 193.1, 120.7, 186.7, 126.4);
                        a.bezierCurveTo(177.6, 134.4, 168.3, 137.9, 158.5, 137);
                        a.bezierCurveTo(153.1, 136.4, 149.4, 135.6, 147.3, 134.6);
                        a.bezierCurveTo(137.6, 129.8, 130.4, 122.6, 125.6, 113);
                        a.bezierCurveTo(124.9, 111.7, 124.3, 110.4, 123.8, 109);
                        a.bezierCurveTo(123.3, 107.9, 122.9, 106.7, 122.6, 105.5);
                        a.bezierCurveTo(121.9, 106.9, 121.2, 108.3, 120.5, 109.6);
                        a.bezierCurveTo(119.7, 111, 118.8, 112.4, 118, 113.7);
                        a.bezierCurveTo(110.3, 125.2, 100.6, 132.5, 88.9, 135.6);
                        a.bezierCurveTo(75.9, 139.1, 64.3, 136.3, 54.2, 127.3);
                        a.bezierCurveTo(51.5, 124.9, 49.2, 122.2, 47.4, 119.3);
                        a.bezierCurveTo(42.2, 111.4, 40.4, 101.7, 41.7, 90.1);
                        a.closePath();
                        a.moveTo(20.3, 118.2);
                        a.bezierCurveTo(20.4, 117, 20.4, 116.4, 20.3, 116.5);
                        a.bezierCurveTo(24.4, 105.8, 29.8, 95.7, 36.6, 86.2);
                        a.bezierCurveTo(37.1, 85.5, 37.7, 84.8, 38.2, 84.1);
                        a.bezierCurveTo(37.1,
                            88.6, 36.6, 93.4, 36.6, 98.3);
                        a.bezierCurveTo(36.7, 106.3, 38.6, 113.5, 42.5, 119.7);
                        a.bezierCurveTo(45.8, 125.2, 50.6, 129.9, 56.8, 134);
                        a.bezierCurveTo(70, 142.9, 83.7, 143.9, 98, 137.2);
                        a.bezierCurveTo(106.4, 133.2, 113.9, 127.9, 120.6, 121.5);
                        a.lineTo(120.9, 121.3);
                        a.lineTo(121.3, 121.5);
                        a.bezierCurveTo(126.4, 125, 131.7, 128.7, 137.2, 132.7);
                        a.bezierCurveTo(142.2, 136.2, 147.7, 138.6, 153.7, 139.7);
                        a.bezierCurveTo(161.7, 140.8, 169.7, 139.6, 177.8, 135.9);
                        a.bezierCurveTo(183.6, 133.5, 188.4, 130, 192.3, 125.5);
                        a.bezierCurveTo(197.1, 119.7,
                            200.6, 113.5, 202.9, 106.8);
                        a.bezierCurveTo(203.6, 104.8, 204.2, 102.7, 204.6, 100.6);
                        a.bezierCurveTo(205.1, 98.2, 205.5, 95.7, 205.7, 93.2);
                        a.bezierCurveTo(205.8, 92.2, 205.8, 91.1, 205.9, 90.2);
                        a.bezierCurveTo(205.9, 86.5, 205.4, 83, 204.4, 79.6);
                        a.bezierCurveTo(209.2, 84.5, 213.3, 89.7, 216.9, 95.4);
                        a.bezierCurveTo(218.2, 97.5, 219.3, 99.6, 220.2, 101.8);
                        a.bezierCurveTo(220.5, 102.5, 220.8, 103.3, 221, 104);
                        a.bezierCurveTo(221.4, 104.9, 221.6, 105.7, 221.6, 106.6);
                        a.bezierCurveTo(221.6, 107.6, 221.5, 108.5, 221.3, 109.4);
                        a.bezierCurveTo(221.1,
                            110.4, 220.8, 111.5, 220.3, 112.5);
                        a.bezierCurveTo(220.1, 113, 219.8, 113.5, 219.4, 114);
                        a.bezierCurveTo(218.7, 115.1, 217.8, 116.3, 216.7, 117.4);
                        a.lineTo(214.9, 119.9);
                        a.lineTo(211.7, 124);
                        a.lineTo(209.8, 126.7);
                        a.lineTo(202.9, 136.6);
                        a.lineTo(195.9, 144.6);
                        a.bezierCurveTo(192.6, 148.2, 187.7, 152, 181.4, 156.2);
                        a.lineTo(161.4, 168.4);
                        a.bezierCurveTo(159.7, 169.4, 156.6, 170.7, 152, 172.3);
                        a.bezierCurveTo(147.4, 173.9, 141.6, 175.3, 134.5, 176.2);
                        a.bezierCurveTo(128.4, 177.1, 122.5, 177.2, 116.7, 176.5);
                        a.bezierCurveTo(109, 175.8, 101.5,
                            174.4, 94.1, 172.2);
                        a.bezierCurveTo(86.9, 170, 79.8, 167.4, 72.9, 164.4);
                        a.bezierCurveTo(72, 164, 71, 163.5, 70.1, 163.1);
                        a.bezierCurveTo(65.2, 160.7, 60.8, 158.3, 57, 155.8);
                        a.bezierCurveTo(54.7, 154.3, 52.5, 152.9, 50.5, 151.5);
                        a.bezierCurveTo(47.2, 149.4, 44.1, 147.1, 41.1, 144.8);
                        a.bezierCurveTo(37.4, 142, 34, 138.9, 31.1, 135.5);
                        a.bezierCurveTo(29.4, 133.7, 27.9, 131.7, 26.5, 129.7);
                        a.bezierCurveTo(26.4, 129.5, 26.3, 129.4, 26.2, 129.3);
                        a.lineTo(25, 127.3);
                        a.bezierCurveTo(23.3, 125, 22.2, 123.4, 21.6, 122.5);
                        a.bezierCurveTo(20.7, 121.1, 20.2,
                            119.7, 20.3, 118.2);
                        a.closePath();
                        a.moveTo(177.9, 163.2);
                        a.lineTo(174.9, 169.8);
                        a.lineTo(174.7, 170.3);
                        a.lineTo(174.4, 170.9);
                        a.bezierCurveTo(174, 172.1, 173.5, 173.3, 173.1, 174.5);
                        a.bezierCurveTo(172.2, 177.2, 171.1, 179.7, 169.6, 182.2);
                        a.bezierCurveTo(168.3, 184.5, 166.3, 186.1, 163.6, 187.2);
                        a.bezierCurveTo(160.6, 188.4, 157.5, 188.5, 154.4, 187.3);
                        a.bezierCurveTo(151.9, 186.4, 149.5, 185.5, 147.2, 184.7);
                        a.lineTo(146.7, 184.5);
                        a.lineTo(146.3, 184.3);
                        a.lineTo(140.9, 182.4);
                        a.bezierCurveTo(142.8, 182.1, 145, 181.4, 147.5, 180.4);
                        a.bezierCurveTo(148.2,
                            180, 148.9, 179.7, 149.6, 179.4);
                        a.bezierCurveTo(152.5, 178, 155.3, 176.5, 158.1, 174.8);
                        a.bezierCurveTo(161.2, 172.9, 164.4, 171.1, 167.5, 169.3);
                        a.bezierCurveTo(170.7, 167.7, 173.7, 165.9, 176.8, 163.9);
                        a.bezierCurveTo(177.2, 163.7, 177.6, 163.5, 177.9, 163.2);
                        a.closePath();
                        a.moveTo(101.1, 181.4);
                        a.lineTo(97.1, 184.2);
                        a.lineTo(96.8, 184.3);
                        a.lineTo(96.3, 184.7);
                        a.bezierCurveTo(93.2, 186.5, 90.2, 187.9, 87.1, 188.9);
                        a.bezierCurveTo(83.9, 189.9, 81.1, 189.2, 78.6, 186.6);
                        a.bezierCurveTo(76, 184.1, 74, 181.3, 72.5, 178.3);
                        a.bezierCurveTo(71.3,
                            175.7, 70.1, 172.9, 69, 170.1);
                        a.lineTo(68, 167.8);
                        a.bezierCurveTo(67.8, 167.3, 67.7, 166.8, 67.5, 166.3);
                        a.bezierCurveTo(69.1, 167.1, 70.7, 167.9, 72.4, 168.8);
                        a.bezierCurveTo(74.1, 169.6, 75.9, 170.5, 77.9, 171.4);
                        a.bezierCurveTo(79.9, 172.3, 83.2, 173.8, 87.9, 175.9);
                        a.bezierCurveTo(92.5, 177.9, 95.7, 179.3, 97.5, 180);
                        a.bezierCurveTo(99.2, 180.7, 100.4, 181.2, 101.1, 181.4);
                        a.closePath();
                        a.moveTo(25.8, 151.1);
                        a.bezierCurveTo(23.2, 147.7, 22, 143.6, 22.3, 139);
                        a.bezierCurveTo(22.3, 139, 22.3, 139, 22.3, 139);
                        a.lineTo(22.4, 135.1);
                        a.bezierCurveTo(22.5,
                            134.4, 22.9, 134.4, 23.6, 134.9);
                        a.bezierCurveTo(24.4, 135.4, 25.2, 136, 26, 136.6);
                        a.bezierCurveTo(27.6, 137.8, 29.1, 139, 30.7, 140.2);
                        a.bezierCurveTo(34.1, 142.9, 37.3, 145.8, 40.4, 148.8);
                        a.bezierCurveTo(42.4, 150.6, 44.1, 152.6, 45.6, 154.7);
                        a.bezierCurveTo(45.8, 155.3, 45.9, 155.7, 45.7, 156);
                        a.lineTo(45.5, 156.1);
                        a.bezierCurveTo(40.5, 158.4, 35.6, 158.3, 30.9, 155.9);
                        a.bezierCurveTo(30.6, 155.7, 30.3, 155.6, 30, 155.4);
                        a.bezierCurveTo(30, 155.3, 29.9, 155.3, 29.9, 155.3);
                        a.bezierCurveTo(28.3, 154, 26.9, 152.6, 25.8, 151.1);
                        a.closePath();
                        a.moveTo(240.9,
                            209.6);
                        a.bezierCurveTo(240.1, 211.5, 239.1, 213.3, 237.8, 215);
                        a.bezierCurveTo(236.5, 216.5, 235.2, 218.1, 233.9, 219.6);
                        a.bezierCurveTo(233.4, 220.2, 232.8, 220.7, 232.3, 221.1);
                        a.bezierCurveTo(230.1, 222.1, 227.5, 222.5, 224.3, 222.1);
                        a.bezierCurveTo(218.9, 221.9, 213.4, 222, 207.7, 222.3);
                        a.bezierCurveTo(206.5, 222.4, 205.3, 222.4, 204, 222.5);
                        a.bezierCurveTo(203.3, 218.7, 201.8, 213.8, 199.6, 207.8);
                        a.lineTo(200.2, 212.5);
                        a.bezierCurveTo(200.1, 212, 200, 211.2, 199.7, 210.2);
                        a.bezierCurveTo(199.9, 214.1, 200, 218.2, 199.9, 222.3);
                        a.bezierCurveTo(199.9,
                            222.5, 199.9, 222.7, 199.9, 222.9);
                        a.bezierCurveTo(199.9, 225, 199.7, 226.9, 199.4, 228.8);
                        a.bezierCurveTo(199.1, 230.4, 198.7, 232, 198.3, 233.5);
                        a.lineTo(196.7, 235.1);
                        a.bezierCurveTo(196.6, 235.2, 196.5, 235.4, 196.3, 235.5);
                        a.bezierCurveTo(195.2, 236.4, 193.3, 237.6, 190.7, 239.1);
                        a.bezierCurveTo(188.1, 240.7, 184.5, 241.7, 179.9, 242.1);
                        a.bezierCurveTo(175.3, 242.4, 172, 242.5, 169.8, 242.3);
                        a.bezierCurveTo(167.8, 242.1, 165.5, 241.6, 162.9, 240.8);
                        a.bezierCurveTo(160.4, 239.9, 158, 237.9, 155.6, 234.8);
                        a.bezierCurveTo(155.4, 234.6, 155.3,
                            234.4, 155.1, 234.2);
                        a.bezierCurveTo(154.3, 233, 153.5, 231.6, 152.8, 230);
                        a.bezierCurveTo(151.9, 227.8, 151.2, 225.3, 150.7, 222.4);
                        a.bezierCurveTo(150.7, 222.2, 150.6, 222.1, 150.6, 221.9);
                        a.bezierCurveTo(149.7, 216.4, 149.3, 213.1, 149.2, 212);
                        a.bezierCurveTo(148.8, 215.6, 148.6, 219.2, 148.8, 222.8);
                        a.bezierCurveTo(148.9, 225.2, 149, 227.6, 149.4, 230);
                        a.bezierCurveTo(149.4, 230.3, 149.4, 230.6, 149.5, 231);
                        a.bezierCurveTo(141, 233.2, 132.2, 234.4, 123.2, 234.4);
                        a.bezierCurveTo(113.4, 235.1, 103.6, 234.6, 93.8, 233);
                        a.lineTo(94, 232);
                        a.bezierCurveTo(94.3,
                            230, 94.4, 228.1, 94.4, 226.2);
                        a.bezierCurveTo(94.4, 225.6, 94.3, 224.9, 94.3, 224.3);
                        a.bezierCurveTo(94.2, 220.7, 94, 217.1, 93.8, 213.5);
                        a.bezierCurveTo(93.8, 214.9, 93.7, 215.9, 93.6, 216.6);
                        a.bezierCurveTo(93.5, 217.2, 93.5, 217.7, 93.4, 218.1);
                        a.bezierCurveTo(93.4, 218.5, 93.2, 219.4, 92.8, 220.9);
                        a.bezierCurveTo(92.6, 222, 92.3, 223, 92, 223.9);
                        a.bezierCurveTo(91.9, 224.2, 91.8, 224.5, 91.7, 224.8);
                        a.bezierCurveTo(91.3, 226, 90.8, 227.1, 90.2, 228.3);
                        a.bezierCurveTo(89.9, 229, 89.5, 229.7, 89.2, 230.4);
                        a.bezierCurveTo(88.8, 230.9, 88.4, 231.4,
                            88, 231.9);
                        a.bezierCurveTo(87.5, 232.5, 86.9, 233.1, 86.2, 233.7);
                        a.bezierCurveTo(85.8, 234.1, 85.4, 234.5, 84.9, 234.8);
                        a.bezierCurveTo(83.9, 235.6, 82.8, 236.2, 81.6, 236.7);
                        a.bezierCurveTo(80.2, 237.3, 78.7, 237.7, 77.1, 238.1);
                        a.bezierCurveTo(74.1, 238.7, 71, 239, 67.8, 239);
                        a.bezierCurveTo(60.3, 239.1, 53.6, 237.3, 47.7, 233.5);
                        a.bezierCurveTo(47.6, 233.4, 47.5, 233.4, 47.4, 233.3);
                        a.bezierCurveTo(45.9, 232.5, 45, 231.7, 44.9, 230.9);
                        a.lineTo(44.6, 229.2);
                        a.bezierCurveTo(44.6, 228.8, 44.5, 228.2, 44.5, 227.6);
                        a.bezierCurveTo(44.5, 225.9, 44.5,
                            223.5, 44.6, 220.3);
                        a.lineTo(44.6, 213.4);
                        a.lineTo(44.7, 207.6);
                        a.lineTo(43.7, 213);
                        a.lineTo(42.4, 220.3);
                        a.bezierCurveTo(41.9, 223.1, 41.7, 225.4, 41.6, 227.4);
                        a.bezierCurveTo(41, 227.3, 40.3, 227.3, 39.7, 227.2);
                        a.bezierCurveTo(37.7, 227.2, 35.8, 227.2, 33.8, 227.2);
                        a.bezierCurveTo(32, 227.2, 30.2, 227.2, 28.4, 227.2);
                        a.bezierCurveTo(26.4, 227.2, 24.5, 227.3, 22.6, 227.4);
                        a.bezierCurveTo(21.3, 227.4, 19.7, 227.5, 17.8, 227.7);
                        a.bezierCurveTo(15.9, 227.9, 13.9, 227.7, 11.9, 227.1);
                        a.bezierCurveTo(9.8, 226.4, 8.3, 225.2, 7.4, 223.5);
                        a.bezierCurveTo(6.5,
                            221.8, 5.6, 219.7, 4.8, 217.3);
                        a.bezierCurveTo(4, 214.8, 3.5, 212.9, 3.3, 211.5);
                        a.bezierCurveTo(3.2, 210.1, 3.6, 209, 4.5, 208.2);
                        a.bezierCurveTo(5.4, 207.3, 6.7, 206.1, 8.4, 204.6);
                        a.bezierCurveTo(10.2, 202.9, 11.6, 201.6, 12.7, 200.6);
                        a.bezierCurveTo(13.7, 199.6, 16.9, 197.2, 22.4, 193.3);
                        a.bezierCurveTo(26.1, 190.5, 28.7, 189.1, 30.1, 188.9);
                        a.bezierCurveTo(31.2, 193, 32.3, 197, 33.7, 201);
                        a.bezierCurveTo(34.2, 202.8, 35, 204.4, 36, 205.9);
                        a.lineTo(33.3, 187.7);
                        a.lineTo(33.1, 185.9);
                        a.lineTo(32.9, 184.7);
                        a.lineTo(32.7, 183.4);
                        a.bezierCurveTo(31.8,
                            176.3, 31, 168.9, 30.3, 161.3);
                        a.bezierCurveTo(30.3, 161, 30.3, 160.7, 30.2, 160.3);
                        a.bezierCurveTo(34.5, 162, 39, 162, 43.8, 160.4);
                        a.bezierCurveTo(44.4, 160.1, 45.1, 159.9, 45.8, 159.6);
                        a.lineTo(50.7, 157.9);
                        a.lineTo(63.1, 164.7);
                        a.bezierCurveTo(63.4, 166, 64, 168, 65.2, 170.7);
                        a.lineTo(65.5, 171.5);
                        a.bezierCurveTo(66.9, 174.7, 68.3, 177.8, 69.8, 180.9);
                        a.bezierCurveTo(71.4, 184.1, 73.4, 187, 76, 189.6);
                        a.bezierCurveTo(78.5, 192.2, 81.7, 193.4, 85.5, 193.1);
                        a.bezierCurveTo(89.2, 192.6, 92.8, 191.5, 96.3, 189.7);
                        a.bezierCurveTo(98.5, 188.6, 100.4,
                            187.4, 102.1, 185.9);
                        a.lineTo(103.2, 185);
                        a.bezierCurveTo(103.4, 184.9, 103.6, 184.7, 103.8, 184.6);
                        a.bezierCurveTo(106.5, 182.5, 108.3, 180.9, 109.3, 179.7);
                        a.lineTo(109.4, 179.7);
                        a.bezierCurveTo(114, 180.5, 118.1, 181, 121.9, 181.4);
                        a.bezierCurveTo(125.7, 181.8, 128.8, 181.8, 131.3, 181.4);
                        a.bezierCurveTo(133, 181.8, 136.2, 183.2, 140.7, 185.6);
                        a.bezierCurveTo(141, 185.7, 141.3, 185.9, 141.7, 186);
                        a.bezierCurveTo(142.1, 186.3, 142.6, 186.5, 143, 186.7);
                        a.bezierCurveTo(143.5, 186.9, 144, 187.1, 144.5, 187.3);
                        a.bezierCurveTo(147.1, 188.4, 149.8,
                            189.4, 152.5, 190.3);
                        a.bezierCurveTo(155.3, 191.3, 158.2, 191.7, 161.2, 191.7);
                        a.bezierCurveTo(164.2, 191.7, 166.7, 190.7, 168.6, 188.6);
                        a.bezierCurveTo(170, 187.2, 171.1, 185.6, 172, 184.1);
                        a.bezierCurveTo(173.4, 181.6, 174.7, 179.1, 175.9, 176.6);
                        a.bezierCurveTo(177.1, 174, 178.3, 171.4, 179.4, 168.7);
                        a.bezierCurveTo(179.7, 168, 180, 167.3, 180.2, 166.7);
                        a.bezierCurveTo(181.4, 164, 182, 162.2, 182, 161.5);
                        a.bezierCurveTo(183.8, 160.7, 186.6, 158.8, 190.2, 155.8);
                        a.lineTo(191, 155.2);
                        a.bezierCurveTo(191.7, 154.5, 192.6, 153.8, 193.4, 153.2);
                        a.bezierCurveTo(193.8,
                            153, 194.1, 152.8, 194.5, 152.6);
                        a.lineTo(196.6, 153.6);
                        a.bezierCurveTo(197, 153.7, 197.6, 153.8, 198.4, 153.8);
                        a.bezierCurveTo(199.3, 153.8, 200.6, 153.7, 202.1, 153.6);
                        a.bezierCurveTo(204.6, 153.5, 207, 153.1, 209.4, 152.5);
                        a.bezierCurveTo(210.5, 152.1, 211.6, 151.8, 212.6, 151.3);
                        a.bezierCurveTo(212.6, 151.4, 212.6, 151.4, 212.6, 151.4);
                        a.bezierCurveTo(213.3, 158.8, 213.4, 166.1, 212.8, 173.3);
                        a.lineTo(211.2, 182.6);
                        a.lineTo(211, 183.6);
                        a.lineTo(209.4, 192.8);
                        a.lineTo(208.3, 198);
                        a.lineTo(208.4, 198.1);
                        a.bezierCurveTo(210.9, 194.2, 212.8,
                            190, 214.2, 185.6);
                        a.lineTo(240.5, 201.5);
                        a.bezierCurveTo(241.1, 202.2, 241.6, 202.9, 241.8, 203.6);
                        a.bezierCurveTo(242.1, 205.4, 241.8, 207.4, 240.9, 209.6);
                        a.closePath();
                        a.fillStyle = "rgb(35, 44, 30)";
                        a.fill();
                        a.beginPath();
                        a.moveTo(219.9, 140.2);
                        a.bezierCurveTo(219.5, 141.6, 218.8, 143, 218, 144.5);
                        a.bezierCurveTo(217.8, 144.9, 217.6, 145.2, 217.3, 145.6);
                        a.bezierCurveTo(216.7, 146.3, 215.9, 146.9, 214.9, 147.4);
                        a.bezierCurveTo(214.1, 147.8, 213.2, 148.2, 212.3, 148.4);
                        a.bezierCurveTo(210.2, 149.1, 208, 149.5, 205.6, 149.5);
                        a.bezierCurveTo(204.5,
                            149.5, 203.4, 149.4, 202.3, 149.3);
                        a.bezierCurveTo(200.6, 148.9, 199.7, 148, 199.8, 146.7);
                        a.lineTo(200.7, 145.2);
                        a.bezierCurveTo(201.3, 144.3, 201.8, 143.4, 202.4, 142.5);
                        a.bezierCurveTo(202.7, 141.9, 203, 141.3, 203.4, 140.8);
                        a.bezierCurveTo(203.8, 140, 204.2, 139.2, 204.7, 138.5);
                        a.bezierCurveTo(205.3, 137.7, 205.9, 136.8, 206.5, 136);
                        a.bezierCurveTo(206.9, 135.5, 207.3, 135, 207.6, 134.5);
                        a.bezierCurveTo(208.3, 133.7, 209, 132.8, 209.7, 132);
                        a.bezierCurveTo(209.9, 131.7, 210.2, 131.4, 210.5, 131);
                        a.bezierCurveTo(211, 130.4, 211.5, 129.9, 212.1,
                            129.3);
                        a.bezierCurveTo(212.6, 128.8, 213.1, 128.3, 213.6, 127.8);
                        a.bezierCurveTo(214.1, 127.4, 214.6, 127, 215.1, 126.6);
                        a.bezierCurveTo(215.3, 126.4, 215.5, 126.3, 215.6, 126.2);
                        a.bezierCurveTo(216.8, 125.4, 217.9, 124.8, 219, 124.5);
                        a.lineTo(219.3, 125.4);
                        a.bezierCurveTo(220, 127.9, 220.5, 130.6, 220.8, 133.3);
                        a.bezierCurveTo(221, 135.7, 220.8, 138, 219.9, 140.2);
                        a.closePath();
                        a.moveTo(40.4, 148.8);
                        a.bezierCurveTo(37.3, 145.8, 34.1, 142.9, 30.7, 140.2);
                        a.bezierCurveTo(29.1, 139, 27.6, 137.8, 26, 136.6);
                        a.bezierCurveTo(25.2, 136, 24.4, 135.4,
                            23.6, 134.9);
                        a.bezierCurveTo(22.9, 134.4, 22.5, 134.4, 22.4, 135.1);
                        a.lineTo(22.3, 139);
                        a.bezierCurveTo(22.3, 139, 22.3, 139, 22.3, 139);
                        a.bezierCurveTo(22, 143.6, 23.2, 147.7, 25.8, 151.1);
                        a.bezierCurveTo(26.9, 152.6, 28.3, 154, 29.9, 155.3);
                        a.bezierCurveTo(29.9, 155.3, 30, 155.3, 30, 155.4);
                        a.bezierCurveTo(30.3, 155.6, 30.6, 155.7, 30.9, 155.9);
                        a.bezierCurveTo(35.6, 158.3, 40.5, 158.4, 45.5, 156.1);
                        a.lineTo(45.7, 156);
                        a.bezierCurveTo(45.9, 155.7, 45.8, 155.3, 45.6, 154.7);
                        a.bezierCurveTo(44.1, 152.6, 42.4, 150.6, 40.4, 148.8);
                        a.closePath();
                        a.moveTo(87.9,
                            175.9);
                        a.bezierCurveTo(83.2, 173.8, 79.9, 172.3, 77.9, 171.4);
                        a.bezierCurveTo(75.9, 170.5, 74.1, 169.6, 72.4, 168.8);
                        a.bezierCurveTo(70.7, 167.9, 69.1, 167.1, 67.5, 166.3);
                        a.bezierCurveTo(67.7, 166.8, 67.8, 167.3, 68, 167.8);
                        a.lineTo(69, 170.1);
                        a.bezierCurveTo(70.1, 172.9, 71.3, 175.7, 72.5, 178.3);
                        a.bezierCurveTo(74, 181.3, 76, 184.1, 78.6, 186.6);
                        a.bezierCurveTo(81.1, 189.2, 83.9, 189.9, 87.1, 188.9);
                        a.bezierCurveTo(90.2, 187.9, 93.2, 186.5, 96.3, 184.7);
                        a.lineTo(96.8, 184.3);
                        a.lineTo(97.1, 184.2);
                        a.lineTo(101.1, 181.4);
                        a.bezierCurveTo(100.4,
                            181.2, 99.2, 180.7, 97.5, 180);
                        a.bezierCurveTo(95.7, 179.3, 92.5, 177.9, 87.9, 175.9);
                        a.closePath();
                        a.moveTo(167.5, 169.3);
                        a.bezierCurveTo(164.4, 171.1, 161.2, 172.9, 158.1, 174.8);
                        a.bezierCurveTo(155.3, 176.5, 152.5, 178, 149.6, 179.4);
                        a.bezierCurveTo(148.9, 179.7, 148.2, 180, 147.5, 180.4);
                        a.bezierCurveTo(145, 181.4, 142.8, 182.1, 140.9, 182.4);
                        a.lineTo(146.3, 184.3);
                        a.lineTo(146.7, 184.5);
                        a.lineTo(147.2, 184.7);
                        a.bezierCurveTo(149.5, 185.5, 151.9, 186.4, 154.4, 187.3);
                        a.bezierCurveTo(157.5, 188.5, 160.6, 188.4, 163.6, 187.2);
                        a.bezierCurveTo(166.3,
                            186.1, 168.3, 184.5, 169.6, 182.2);
                        a.bezierCurveTo(171.1, 179.7, 172.2, 177.2, 173.1, 174.5);
                        a.bezierCurveTo(173.5, 173.3, 174, 172.1, 174.4, 170.9);
                        a.lineTo(174.7, 170.3);
                        a.lineTo(174.9, 169.8);
                        a.lineTo(177.9, 163.2);
                        a.bezierCurveTo(177.6, 163.5, 177.2, 163.7, 176.8, 163.9);
                        a.bezierCurveTo(173.7, 165.9, 170.7, 167.7, 167.5, 169.3);
                        a.closePath();
                        a.moveTo(202.2, 94.7);
                        a.bezierCurveTo(202.5, 86.8, 201.1, 79.7, 197.8, 73.5);
                        a.bezierCurveTo(196.1, 70.1, 193.9, 67, 191.1, 64.1);
                        a.bezierCurveTo(190.6, 63.5, 190, 63, 189.4, 62.4);
                        a.bezierCurveTo(183.4,
                            56.7, 176.5, 53, 168.8, 51.2);
                        a.bezierCurveTo(165.7, 50.5, 162.5, 50.1, 159.2, 50.1);
                        a.bezierCurveTo(159.1, 50.1, 158.9, 50.1, 158.7, 50.1);
                        a.bezierCurveTo(146.1, 51.7, 136, 57.6, 128.6, 67.7);
                        a.bezierCurveTo(127.5, 69.4, 126.3, 71.1, 125, 72.9);
                        a.bezierCurveTo(124.9, 73.2, 124.7, 73.5, 124.6, 73.8);
                        a.lineTo(124.4, 74.2);
                        a.lineTo(124.2, 73.8);
                        a.lineTo(120.8, 67.4);
                        a.bezierCurveTo(117.3, 59.5, 111.9, 53.4, 104.4, 49.1);
                        a.bezierCurveTo(100, 46.5, 95.6, 44.9, 91.3, 44.1);
                        a.bezierCurveTo(89.3, 43.8, 87.3, 43.6, 85.3, 43.7);
                        a.bezierCurveTo(77.8, 43.8,
                            70.4, 46.7, 63, 52.3);
                        a.bezierCurveTo(57.3, 56.8, 52.7, 61.9, 49.2, 67.7);
                        a.bezierCurveTo(47.7, 70.1, 46.5, 72.7, 45.5, 75.3);
                        a.bezierCurveTo(43.6, 79.9, 42.4, 84.8, 41.7, 90.1);
                        a.bezierCurveTo(40.4, 101.7, 42.2, 111.4, 47.4, 119.3);
                        a.bezierCurveTo(49.2, 122.2, 51.5, 124.9, 54.2, 127.3);
                        a.bezierCurveTo(64.3, 136.3, 75.9, 139.1, 88.9, 135.6);
                        a.bezierCurveTo(100.6, 132.5, 110.3, 125.2, 118, 113.7);
                        a.bezierCurveTo(118.8, 112.4, 119.7, 111, 120.5, 109.6);
                        a.bezierCurveTo(121.2, 108.3, 121.9, 106.9, 122.6, 105.5);
                        a.bezierCurveTo(122.9, 106.7, 123.3, 107.9,
                            123.8, 109);
                        a.bezierCurveTo(124.3, 110.4, 124.9, 111.7, 125.6, 113);
                        a.bezierCurveTo(130.4, 122.6, 137.6, 129.8, 147.3, 134.6);
                        a.bezierCurveTo(149.4, 135.6, 153.1, 136.4, 158.5, 137);
                        a.bezierCurveTo(168.3, 137.9, 177.6, 134.4, 186.7, 126.4);
                        a.bezierCurveTo(193.1, 120.7, 197.5, 114.2, 199.9, 107.1);
                        a.bezierCurveTo(201.3, 103.2, 202, 99, 202.2, 94.7);
                        a.closePath();
                        a.fillStyle = "rgb(255, 255, 255)";
                        a.fill();
                        a.save();
                        a.translate(g, 0);
                        a.beginPath();
                        a.moveTo(101.3, 71.1);
                        a.bezierCurveTo(101, 71.1, 100.7, 71.2, 100.5, 71.3);
                        a.bezierCurveTo(100.5,
                            71.3, 100.5, 71.3, 100.5, 71.3);
                        a.bezierCurveTo(102.7, 72.9, 103.8, 75.8, 104, 79.9);
                        a.bezierCurveTo(104.1, 84.2, 100.5, 86.1, 93, 85.6);
                        a.bezierCurveTo(91, 85.5, 89.2, 85.4, 87.8, 85.3);
                        a.bezierCurveTo(87.7, 86.6, 87.6, 87.9, 87.6, 89.3);
                        a.bezierCurveTo(87.8, 91.8, 88.6, 94.3, 89.9, 96.7);
                        a.bezierCurveTo(91.9, 101.5, 95.2, 103.9, 99.8, 103.9);
                        a.bezierCurveTo(107.4, 103.7, 112.3, 98, 114.7, 86.8);
                        a.bezierCurveTo(114.7, 74.4, 110.2, 69.2, 101.3, 71.1);
                        a.closePath();
                        a.fillStyle = "rgb(0, 0, 0)";
                        a.fill();
                        a.restore();
                        a.save();
                        a.translate(k, 0);
                        a.beginPath();
                        a.moveTo(150.4, 74.1);
                        a.bezierCurveTo(147.9, 71.7, 145.3, 70.5, 142.4, 70.5);
                        a.bezierCurveTo(141.5, 70.5, 140.5, 70.7, 139.6, 71);
                        a.bezierCurveTo(140.1, 71.3, 140.6, 71.6, 141.1, 72);
                        a.bezierCurveTo(143.3, 73.6, 144.5, 76.5, 144.6, 80.6);
                        a.bezierCurveTo(144.8, 84.9, 141.1, 86.8, 133.7, 86.3);
                        a.bezierCurveTo(132.1, 86.2, 130.8, 86.2, 129.6, 86.1);
                        a.bezierCurveTo(129.6, 86.2, 129.6, 86.2, 129.6, 86.3);
                        a.bezierCurveTo(129.6, 89.1, 130.2, 91.7, 131.5, 94.1);
                        a.bezierCurveTo(134.1, 99, 138.3, 101.5, 144, 101.5);
                        a.bezierCurveTo(146.8, 101.7, 149.7, 99.7,
                            152.5, 95.6);
                        a.bezierCurveTo(154.5, 91.6, 155.5, 88.9, 155.5, 87.5);
                        a.bezierCurveTo(155.5, 81.9, 153.8, 77.5, 150.4, 74.1);
                        a.closePath();
                        a.fillStyle = "rgb(0, 0, 0)";
                        a.fill();
                        a.restore();
                        a.restore();
                        a.restore()
                    }

                    function m(a) {
                        function b() {
                            var u = Date.now() - d;
                            u < q ? g = 0 - e.mn(u, 0, 100, q) : u < s ? u > q + 100 && (p = m = -1 * e.Xe(u - (q + 100), 0, 10, s - (q + 100))) : u < v ? p = m = -10 + e.lj(u - s, 20, v - s) : u < z ? u > v + 100 && (p = m = 10 - e.lj(u - (v + 100), 10, z - (v + 100))) : u < A || u < w && (l = e.Xe(u - A, n, 50, w - A));
                            u > q && u < v && (F = e.kj(u - q, 0.02, v - q, 6));
                            u > v && u < A && (F = 0.02 - e.kj(u - v, 0.02,
                                A - v, 2));
                            var H = 0 + k,
                                K = 75 + l + g;
                            c.save();
                            c.rotate(30 * Math.PI / 180);
                            f(c, 0.32, 0.32 + F, H, K, m, p);
                            c.restore();
                            u < w ? window.requestAnimationFrame(b) : a()
                        }
                        var c = u.getContext("2d"),
                            d = Date.now(),
                            g = 0.1,
                            k = 0,
                            l = 0,
                            m = 0,
                            p = 0,
                            n = k,
                            q = 600,
                            s = 400 + q,
                            v = 600 + s,
                            z = 700 + v,
                            A = 500 + z,
                            w = 800 + A,
                            F = 0;
                        window.requestAnimationFrame(b)
                    }

                    function p() {
                        $("#dpic").removeClass();
                        $("#dframe").animate({
                            top: b.d(50),
                            scale: 0.2
                        }, 350, "easeInExpo");
                        $("#dmsg").animate({
                            top: b.d(50),
                            scale: 0.2
                        }, 350, "easeInExpo");
                        $("#dshareBtn").fadeTo(200, 0);
                        $("#d").delay(200).fadeOut(200,
                            function() {
                                k.sg();
                                s = null;
                                $("#gameBtnTray").show()
                            })
                    }
                    var u, q, A = b.d(2.2);
                    this.eb = function() {
                        q = document.getElementById("e");
                        q.width = b.d(1024);
                        q.height = b.d(576);
                        if (u = document.getElementById("moreCanvas")) u.width = 51, u.height = 51;
                        $("#dshareBtn").click(function() {
                            c.Ft(l.W(n.Rq), c.tu, d.jy() + "drawing" + s + ".jpg", function() {
                                p();
                                return !0
                            });
                            return !1
                        });
                        $("#d").click(function() {
                            p()
                        });
                        $("#moreLink").mouseenter(function() {
                            z || (z = !0, m(function() {
                                z = !1
                            }))
                        }).click(function() {
                            Analytics.MD("SMG_MRTINX_CTR_SITE_BehindtheScenes")
                        })
                    };
                    this.Ed = function() {
                        g.subscribe(g.r.Ib, function() {
                            a.ja({
                                text: l.W(n.Op),
                                Ah: "dmsg",
                                ua: !0
                            });
                            a.ja({
                                text: l.W(n.Qq),
                                Kc: "#dshareBtn img",
                                ua: !0
                            })
                        });
                        g.subscribe(g.r.Eq, this.yB);
                        g.subscribe(g.r.Jp, this.Po)
                    };
                    var s = null;
                    this.Po = function(a) {
                        s = a + 1;
                        k.qg();
                        $("#gameBtnTray").hide();
                        $("#dpic").addClass("drawing" + s);
                        $("#dframe").animate({
                            top: b.d(100),
                            scale: 0.35
                        }, 0);
                        $("#dframe").fadeTo(0, 0);
                        $("#dmsg").animate({
                            top: b.d(60),
                            scale: 0.5
                        }, 0);
                        $("#dmsg").fadeTo(0, 0);
                        $("#dshareBtn").fadeTo(0, 0);
                        $("#d").fadeIn(100, function() {
                            $("#dframe").fadeTo(0,
                                1);
                            $("#dmsg").fadeTo(0, 1);
                            $("#dframe").animate({
                                top: 0,
                                scale: 1
                            }, 350, "easeOutBack");
                            $("#dmsg").animate({
                                top: 0,
                                scale: 1
                            }, 350, "easeOutBack");
                            $("#dshareBtn").delay(600).fadeTo(200, 1)
                        })
                    };
                    var z = !1;
                    this.yB = function() {
                        var a = q.getContext("2d");
                        k.qg();
                        $("#e").fadeIn(function() {
                            function c() {
                                var O = Date.now() - d;
                                O < v ? (g = e.mn(O, s, A, v), l = e.mn(O, u, A, v)) : O < w ? O > v + 100 && (q = n = -1 * e.Xe(O - (v + 100), 0, b.d(10), w - (v + 100))) : O < F ? q = n = b.d(-10) + e.lj(O - w, b.d(20), F - w) : O < H ? O > F + 100 && (q = n = b.d(10) - e.lj(O - (F + 100), b.d(10), H - (F + 100))) : !(O < K) &&
                                    O < N && (p = e.Xe(O - K, z, b.d(300), N - K), g = b.d(A) - e.Xe(O - K, 0, b.d(2), v), l = b.d(A) - e.Xe(O - K, 0, b.d(2), v));
                                O > v && O < F && (P = e.kj(O - v, 0.1, F - v, 6));
                                O > F && O < K && (P = 0.1 - e.kj(O - F, 0.1, K - F, 2));
                                O < N ? window.requestAnimationFrame(c) : ($("#e").fadeOut(), k.sg());
                                var O = m + (b.d(500) - g / A * b.d(200)),
                                    R = p + (b.d(600) - l / A * b.d(400));
                                f(a, g, l + P, O, R, n, q)
                            }
                            var d = Date.now(),
                                g = 0.1,
                                l = 0.1,
                                m = 0,
                                p = 0,
                                n = 0,
                                q = 0,
                                s = g,
                                u = l,
                                z = m,
                                v = 600,
                                w = 400 + v,
                                F = 600 + w,
                                H = 700 + F,
                                K = 500 + H,
                                N = 800 + K,
                                P = 0;
                            window.requestAnimationFrame(c)
                        })
                    }
                }
            }(da, cb, T, H, Na, sa, V, $a, ga, F),
            lc = function() {
                for (var a = ["ms", "moz", "webkit", "o"], c = 0; c < a.length && !window.requestAnimationFrame; c++) window.requestAnimationFrame = window[a[c] + "RequestAnimationFrame"];
                if (!window.requestAnimationFrame) {
                    var d = 1E3 / 60,
                        b = 0;
                    window.requestAnimationFrame = function(a) {
                        var c = Date.now(),
                            g = Math.max(0, d - (c - b));
                        window.setTimeout(function() {
                            a(Date.now())
                        }, g);
                        b = c + g
                    }
                }
                return window.requestAnimationFrame
            }(),
            mc = function(a, c, d, b, f, e, g, k, l) {
                function n() {
                    var a = document.getElementById("vid");
                    if (!a) {
                        try {
                            a = document.createElement("video")
                        } catch (b) {
                            return null
                        }
                        a.id =
                            "vid";
                        a.className = "ctrPointer";
                        $("#video").append(a)
                    }
                    return a
                }
                var r = null,
                    m = {
                        at: function() {
                            if (0 === (l.$e(0, 0) || 0)) {
                                var a = n(),
                                    b = c.Or,
                                    e = d.Ms(),
                                    f = d.bv;
                                if (null != a && null != e) try {
//                                    a.src = f + "intro_" + b + e, a.load()
                                } catch (g) {}
                            }
                        },
                        xA: function() {
                            0 < (l.$e(0, 0) || 0) && $("#vid").remove()
                        },
                        lA: function(a) {
                            var b = l.$e(0, 0) || 0,
                                c = document.getElementById("vid");
                            r = a;
                            if (0 === b && c && (a = c.readyState, 2 === a || 3 === a || 4 === a)) {
                                g.Xh();
                                $(c).fadeIn(300, function() {
                                    c.play()
                                });
                                c.addEventListener("ended", m.en);
                                c.addEventListener("mousedown", m.en);
                                return
                            }
                            m.en()
                        },
                        en: function() {
                            var a = document.getElementById("vid");
                            $(a).fadeOut(500, function() {
                                a.pause();
                                a.currentTime = 0
                            });
                            r && r()
                        },
                        ez: function() {
                            var a = n(),
                                b = c.Or,
                                e = d.Ms(),
                                f = d.bv;
                            if (null != a && null != e) try {
                                a.src = f + "outro_" + b + e, a.load()
                            } catch (g) {}
                        },
                        oA: function() {
                            var a = document.getElementById("vid");
                            if (a) {
                                var c = a.readyState;
                                2 === c || 3 === c || 4 === c ? (g.Xh(), g.mf || (a.volume = 0), $(a).fadeIn(300, function() {
                                    a.play()
                                }), a.addEventListener("ended", m.ms), a.addEventListener("mousedown", m.ms)) : ($(a).remove(), f.Va(b.Mg, !1))
                            }
                        },
                        ms: function() {
                            f.Va(b.Mg, !0);
                            var a = $("#vid");
                            a.fadeOut(500, function() {
                                a[0].pause();
                                a[0].currentTime = 0;
                                a.remove()
                            })
                        },
                        eb: function() {
                            this.at()
                        }
                    };
                k.subscribe(k.r.Aq, function() {
                    m.at()
                });
                return m
            }(R, H, T, xa, pb, qa, ma, V, ta),
            nc = function(a, c, d, b, f, e, g, k, l, n, r, m, p, u, q, w, s, z, h, C, D, F, x, E, I, H, K, G, L) {
                var B = a.GE || p.bm,
                    v = new function() {
                        function q() {
                            $("#levelMenu").hide()
                        }

                        function u() {
                            s.qg();
                            $("#levelMenu").show()
                        }

                        function C() {
                            f.Za >= f.Tt() - 1 ? (H.hide(), z.oA()) : (M.Un = !0, g.Va(a.ss ? e.qb : e.Sc, !1))
                        }

                        function N() {
                            if (f.Za !==
                                f.Tt() - 1) return !1;
                            var a = b.Lc(f.Za);
                            return f.Nb !== a ? !1 : !0
                        }

                        function P() {
                            $("#resultScore").text(ia[ea]);
                            ea++;
                            ea < ga.length && (ea < ja ? setTimeout(function() {
                                P()
                            }, 10) : setTimeout(function() {
                                P()
                            }, 167))
                        }

                        function R() {
                            M.qe = !0;
                            null != aa && clearTimeout(aa);
                            aa = setTimeout(function() {
                                M.qe = !1;
                                aa = null
                            }, 1E3)
                        }

                        function O(a) {
                            var d = g.Ze(a);
                            a == e.qb || a == e.Sc || a == e.Xd ? H.fadeOut(300) : a !== e.Bd && H.show();
                            a !== e.Ci && q();
                            a !== e.qb && a !== e.Bd || m.Yh(B);
                            var k = g.Ze(e.Sc);
                            a == e.Sc ? (f.Vu(), b.pi(), k.Th(), M.Un ? (M.Un = !1, setTimeout(function() {
                                $("#levelResults").hide();
                                k.EB();
                                f.Ej() || L.ru()
                            }, 800)) : (clearTimeout(ca), ca = setTimeout(function() {
                                k.hx()
                            }, 300))) : k.lo();
                            var n = g.Ze(e.Me);
                            n && (a === e.Me ? n.Th() : n.lo());
                            a == e.Bd ? (G.Nc(!0, 0), d.Th()) : a == e.Gf ? T(!1) : a === e.Mg ? ($("#levelResults").hide(), H.aB(), a = D.W(x.Rp).replace("%d", b.zf()), l.ja({
                                text: a,
                                Kc: "#finalScore img",
                                scale: 0.8 * c.bb
                            }), $("#congrats").empty().append(l.ja({
                                text: D.W(x.wp),
                                scale: 1.2 * c.bb
                            })), l.ja({
                                text: D.W(x.Sq),
                                Kc: "#finalShareBtn img",
                                scale: 0.8 * c.bb,
                                ao: c.d(130)
                            }), l.ja({
                                text: D.W(x.Dq),
                                Kc: "#finalFunBtn img",
                                scale: 0.8 *
                                    c.bb,
                                ao: c.d(310)
                            })) : a == e.Xd ? h.ra(h.r.tr) : a == e.Ee ? h.ra(h.r.Mr) : a == e.Ke && h.ra(h.r.Mr)
                        }

                        function V(k) {
                            if (k == e.qb) {
                                $("#playBtn").click(function() {
                                    m.N(p.ia);
                                    K.Nz && K.Nz();
                                    z.lA(function() {
                                        0 === (b.$e(0, 0) || 0) ? M.ot(0, 0) : g.Va(a.ss ? e.Bd : e.Sc, !1)
                                    })
                                });
                                $("#optionsBtn").click(function() {
                                    m.N(p.ia);
                                    d.XD ? h.ra(h.r.Aw) : g.Va(e.Xd)
                                });
                                $("#achievementsBtn").click(function() {
                                    Z && (m.N(p.ia), g.Va(e.Ee))
                                }).toggleClass("disabled", !Z);
                                $("#leaderboardsBtn").click(function() {
                                    Z && (m.N(p.ia), g.Va(e.Ke))
                                }).toggleClass("disabled", !Z);
                                var w =
                                    null;
                                $("#resetYesBtn").on(n.Uo, function() {
                                    m.N(p.ia);
                                    w = setTimeout(function() {
                                        L.Uf();
                                        w = null;
                                        r.clear();
                                        b.CA();
                                        f.EA();
                                        h.ra(h.r.Aq)
                                    }, 3E3)
                                }).on(n.pn, function() {
                                    null != w && clearTimeout(w)
                                });
                                T(!1);
                                $("#optionSound").click(function() {
                                    T(!0, "optionMsg")
                                });
                                M.av ? ($("#optionHd").addClass("activeResolution"), $("#optionSd").addClass("inActiveResolution"), $("#optionSd").addClass("ctrPointer"), $("#optionSd").hover(function() {
                                    U("optionMsg", D.W(x.Mq), 4E3)
                                }, function() {
                                    $("#optionMsg").stop(!0, !0).fadeOut(500)
                                }), k = "optionSd") :
                                    ($("#optionSd").addClass("activeResolution"), $("#optionHd").addClass("inActiveResolution"), $("#optionHd").addClass("ctrPointer"), $("#optionHd").hover(function() {
                                    U("optionMsg", D.W(x.Lq), 4E3)
                                }, function() {
                                    $("#optionMsg").stop(!0, !0).fadeOut(500)
                                }), k = "optionHd");
                                $("#" + k).click(function() {
                                    r.bB(!M.av);
                                    window.location.reload()
                                });
                                h.subscribe(h.r.Ib, function() {
                                    Q("#playBtn img", x.lw);
                                    Q("#optionsBtn img", x.Xd);
                                    Q("#resetYesBtn img", x.Mw);
                                    Q("#resetNoBtn img", x.iw);
                                    l.ja({
                                        text: D.W(x.Ke),
                                        Ab: "leaderboardsBtn",
                                        scale: 0.8 *
                                            c.bb
                                    });
                                    l.ja({
                                        text: D.W(x.Ee),
                                        Ab: "achievementsBtn",
                                        scale: 0.8 * c.bb
                                    })
                                })
                            } else if (k == e.Sc) $("#boxBack").click(function() {
                                m.N(p.ia);
                                g.Va(e.qb)
                            }), k = g.Ze(k), k.init(v);
                            else if (k == e.Me) $("#boxEnterCodeButton").click(function() {
                                m.N(p.ia);
                                g.Va(e.Me)
                            }), $("#codeBack").click(function() {
                                m.N(p.ia);
                                g.Va(e.Sc)
                            }), k = g.Ze(k), k.init(v);
                            else if (k == e.Bd) $("#levelBack").click(function() {
                                m.N(p.ia);
                                g.Va(a.ss ? e.qb : e.Sc)
                            }), G.Nc(!0, 0), k = g.Ze(k), k.init(v);
                            else if (k == e.Gf) $("#gameRestartBtn").click(function() {
                                M.qe || (m.N(p.ia), da(f.Nb, !0, !0))
                            }), $("#gameMenuBtn").click(function() {
                                M.qe || (m.N(p.ia), u())
                            });
                            else if (k == e.Ci) $("#continueBtn").click(function() {
                                m.N(p.ia);
                                q();
                                s.sg()
                            }), $("#skipBtn").click(function() {
                                m.N(p.ia);
                                q();
                                $("#gameBtnTray").hide();
                                f.Ej() ? (b.we(f.Za, f.Nb, 0), da(f.Nb + 1, !1)) : C()
                            }), $("#selectBtn").click(function() {
                                m.N(p.ia);
                                q();
                                s.Cu();
                                b.gg(f.Za) || (M.hg = !0, M.Fh = !1, M.dn())
                            }), $("#menuBtn").click(function() {
                                m.N(p.ia);
                                q();
                                s.Cu();
                                M.hg = !0;
                                M.Fh = !0;
                                M.dn()
                            }), T(!1), $("#gameSound").click(function() {
                                T(!0, "gameMsg")
                            }), h.subscribe(h.r.Ib,
                                function() {
                                    Q("#continueBtn img", x.nv);
                                    Q("#skipBtn img", x.rw);
                                    Q("#selectBtn img", x.bw);
                                    Q("#menuBtn img", x.dw)
                                });
                            else if (k == e.zq) $("#nextBtn").click(function() {
                                M.qe || (R(), m.N(p.ia), f.Ej() ? da(f.Nb + 1, !1) : C())
                            }), $("#replayBtn").click(function() {
                                M.qe || (R(), m.N(p.ia), da(f.Nb, !1))
                            }), $("#lrMenuBtn").click(function() {
                                M.qe || (R(), m.N(p.ia), M.hg = !0, M.Fh = !1, M.Fu())
                            }), h.subscribe(h.r.Ib, function() {

                                Q("#nextBtn img", x.NEXT);
                                Q("#replayBtn img", x.vb);
                                Q("#lrMenuBtn img", x.qb);
                                l.nc({
                                    text: D.W(x.sv),
                                    Ah: "resultTickerMessage",
                                    ua: !0
                                })
                            });
                            else if (k == e.Mg) $("#gameCompleteBack").click(function() {
                                m.N(p.ia);
                                g.Va(e.qb);
                                H.hide()
                            }), $("#finalShareBtn").click(function() {
                                var a = b.zf();
                                I.Ft(d.ky(a, f.qA()), I.tu, d.py() + "score" + a + ".png", Ga(!0))
                            });
                            else if (k == e.Xd) {
                                var A = d.cC,
                                    B = $("#soundBtn");
                                d.pB(B, function() {
                                    var a = !r.zn();
                                    m.tk(a);
                                    m.N(p.ia);
                                    A(B, a);
                                    T(!1);
                                    T(!1)
                                });
                                var O = d.aC,
                                    N = $("#musicBtn");
                                d.hB(N, function() {
                                    m.N(p.ia);
                                    var a = !r.yn();
                                    m.rk(a);
                                    O(N, a);
                                    T(!1);
                                    T(!1)
                                });
                                var P = d.$B;
                                d.eB(function(b) {
                                    m.N(p.ia);
                                    null == b && (b = a.Xn.indexOf(r.uh()), b = a.Xn[(b +
                                        1) % a.Xn.length]);
                                    r.dB(b);
                                    h.ra(h.r.Ib)
                                });
                                var S = d.YB;
                                d.WA(function() {
                                    m.N(p.ia);
                                    var a = !r.wn();
                                    r.VA(a);
                                    S(a)
                                });
                                var W = $("#resetBtn").click(function() {
                                    var a = l.ja({
                                            text: D.W(x.Oq),
                                            Dc: E.S,
                                            width: 1250 * c.Gb,
                                            ua: !0
                                        }),
                                        b = l.nc({
                                            text: D.W(x.Nq),
                                            ua: !0,
                                            ao: c.d(550)
                                        });
                                    $("#resetText").empty().append($(a));
                                    $("#resetHoldYes").empty().append($(b));
                                    m.N(p.ia);
                                    L.wk("resetGame")
                                });
                                $("#optionsBack").click(function() {
                                    m.N(p.ia);
                                    g.Va(e.qb)
                                });
                                d.NB(!a.$D);
                                k = function() {
                                    Q("#optionsTitle img", x.Xd);
                                    A(B, r.zn());
                                    O(N, r.yn());
                                    P();
                                    S(r.wn());
                                    d.oB(W, D.W(x.ow));
                                    var a = r.uh();
                                    $("#lang").removeClass("lang-en lang-de lang-ru lang-fr").addClass("lang-" + F.MB(a))
                                };
                                h.subscribe(h.r.Ib, k);
                                h.subscribe(h.r.tr, k)
                            } else k === e.Ke ? $("#leaderboardBack").click(function() {
                                m.N(p.ia);
                                g.Va(e.qb)
                            }) : k === e.Ee && $("#achievementsBack").click(function() {
                                m.N(p.ia);
                                g.Va(e.qb)
                            })
                        }

                        function S() {
                            $("#achievementsBtn").toggleClass("disabled", !Z);
                            $("#leaderboardsBtn").toggleClass("disabled", !Z)
                        }

                        function U(a, b, c) {
                            if (void 0 != a) {
                                c = c || 500;
                                a = $("#" + a);
                                var d = a.find("img");
                                0 === d.length &&
                                    (d = $("<img/>").appendTo(a));
                                l.nc({
                                    text: b,
                                    img: d[0],
                                    ua: !0,
                                    alpha: 0.6
                                });
                                a.stop(!0, !0).fadeIn(500).delay(c).fadeOut(750)
                            }
                        }

                        function T(a, b) {
                            var c, d = m.xe,
                                e = m.mf;
                            a && (d && e ? (d = !0, e = !1) : e = d || e ? d = !1 : d = !0, m.tk(d), m.rk(e));
                            c = d && !e ? "effectsOnly" : d || e ? "allSound" : "noSound";
                            $("#optionSound").removeClass("effectsOnly noSound allSound").addClass(c);
                            $("#gameSound").removeClass("effectsOnly noSound allSound").addClass(c);
                            e || d ? (c = e ? x.gw : x.fw, d = d ? x.vw : x.uw, d = D.W(x.hp).replace("{0}", D.W(c).toLowerCase()).replace("{1}", D.W(d).toLowerCase())) :
                                d = D.W(x.Mp);
                            U(b, d)
                        }

                        function Q(a, b) {
                            l.ja({
                                text: D.W(b),
                                Kc: a,
                                ua: !0
                            })
                        }
                        var M = this;
                        this.av = c.Ky;
                        this.qe = this.Dj = this.Un = this.Fh = this.hg = !1;
                        var ba = w.HE || 30,
                            Z = !1;
                        h.subscribe(h.r.Bm, function() {
                            Z = !0;
                            S()
                        });
                        h.subscribe(h.r.Cm, function() {
                            Z = !1;
                            S()
                        });
                        var ca = null,
                            aa = null,
                            da = this.Uz = function(a, b, c) {
                                H.fadeIn(650, 100);
                                f.Nb = a;
                                N() && z.ez();
                                c ? s.ik() : (g.Va(e.Gf, !b), setTimeout(function() {
                                    M.ut()
                                }, 200))
                            };
                        this.Fu = function() {
                            M.Fh && (H.fadeOut(800, 400), m.Yh(B));
                            G.sx(function() {
                                M.Dj = !1;
                                M.Fh ? g.Va(e.qb, !1) : (G.Nc(!0, 0), g.Va(e.Bd, !0))
                            })
                        };
                        this.ut = function() {
                            var a = g.fj == e.Bd ? 400 : 0;
                            $("#levelScore").fadeOut();
                            $("#levelBack").fadeOut();
                            $("#levelOptions").fadeOut(a, function() {
                                M.Dj ? ($("#levelResults").fadeOut(800), setTimeout(function() {
                                    s.yu(f.Za + 1, f.Nb);
                                    G.so(!1, function() {
                                        M.pu()
                                    })
                                }, 400)) : G.Tz(function() {
                                    M.Dj = !0;
                                    s.yu(f.Za + 1, f.Nb);
                                    G.so(!0, function() {
                                        M.pu()
                                    })
                                })
                            })
                        };
                        this.dn = function() {
                            M.ux();
                            setTimeout(function() {
                                M.hg || $("#levelResults").delay(750).fadeIn(250);
                                G.tx(function() {
                                    M.hg ? M.Fu() : setTimeout(function() {
                                        P()
                                    }, 250)
                                })
                            }, 250)
                        };
                        this.pu = function() {
                            $("#levelBackground").hide();
                            w.ou && a.Sx && $("#bg").show();
                            $("#gameBtnTray").fadeIn()
                        };
                        this.ux = function() {
                            G.Nc(!1, 1);
                            R();
                            $("#levelBackground").show();
                            w.ou && a.Sx && $("#bg").hide();
                            $("#gameBtnTray").fadeOut()
                        };
                        var ga = [],
                            ia = [],
                            ea = 0,
                            ja = 0;
                        this.mo = function(a) {
                            function c(a, b, d) {
                                function e() {
                                    var c = Date.now(),
                                        q = (c - m) / k;
                                    m = c;
                                    p += Math.round(b * q);
                                    h -= a * q;
                                    0 >= h ? (h = 0, p = f, s.fadeOut(400), r.fadeOut(400, d)) : n(e);
                                    l.nc({
                                        text: g(h),
                                        img: r[0],
                                        ua: !0
                                    });
                                    l.us({
                                        text: p,
                                        Ab: "resultScore",
                                        ua: !0
                                    })
                                }
                                var f = p + b,
                                    h = a,
                                    k = Math.max(1E3, 2E3 - 50 * a),
                                    m = Date.now(),
                                    n = window.requestAnimationFrame;
                                e()
                            }

                            function e(a, b) {
                                function c() {
                                    var e = Date.now(),
                                        h = Math.min(Math.round(a * (e - f) / 1E3), d);
                                    f = e;
                                    d -= h;
                                    p += h;
                                    0 >= d ? (d = 0, p = a, s.fadeOut(400), r.fadeOut(400, b)) : g(c);
                                    l.nc({
                                        text: d,
                                        img: r[0],
                                        ua: !0
                                    });
                                    l.us({
                                        text: p,
                                        Ab: "resultScore",
                                        ua: !0
                                    })
                                }
                                var d = a,
                                    f = Date.now(),
                                    g = window.requestAnimationFrame;
                                c()
                            }

                            function g(a) {
                                var b = Math.floor(a / 60);
                                a = Math.round(a % 60);
                                return b + ":" + (10 > a ? "0" + a : a)
                            }
                            var h = a.Eb,
                                k = a.pk,
                                m = a.time,
                                n, p = 0,
                                q = 1E3 * h;
                            Math.round((k - 1E3 * h) / m);
                            switch (h) {
                                case 3:
                                    $("#resultStar1").removeClass("starEmpty").addClass("star");
                                    $("#resultStar2").removeClass("starEmpty").addClass("star");
                                    $("#resultStar3").removeClass("starEmpty").addClass("star");
                                    n = D.W(x.aw);
                                    break;
                                case 2:
                                    $("#resultStar1").removeClass("starEmpty").addClass("star");
                                    $("#resultStar2").removeClass("starEmpty").addClass("star");
                                    $("#resultStar3").removeClass("star").addClass("starEmpty");
                                    n = D.W(x.$v);
                                    break;
                                case 1:
                                    $("#resultStar1").removeClass("starEmpty").addClass("star");
                                    $("#resultStar2").removeClass("star").addClass("starEmpty");
                                    $("#resultStar3").removeClass("star").addClass("starEmpty");
                                    n = D.W(x.Zv);
                                    break;
                                default:
                                    $("#resultStar1").removeClass("star").addClass("starEmpty"), $("#resultStar2").removeClass("star").addClass("starEmpty"), $("#resultStar3").removeClass("star").addClass("starEmpty"), n = D.W(x.Yv)
                            }
                            //pk: ending

                            l.ja({
                                text: n,
                                Kc: "#resultStatus img",
                                ua: !0
                            });
                            var r = $("#resultTickerValue").hide(),
                                s = $("#resultTickerLabel").hide(),
                                u = $("#resultScore").empty().hide(),
                                v = $("#resultImproved").hide(),
                                w = $("#resultTickerMessage").hide();
                            l.nc({
                                text: D.W(x.xw),
                                img: s[0],
                                ua: !0
                            });
                            l.nc({
                                text: q,
                                img: r[0],
                                ua: !0
                            });
                            $("#resultScore img").remove();
                            setTimeout(function() {
                                s.fadeIn(300);
                                r.fadeIn(300);
                                u.fadeIn(300, function() {
                                    e(q, function() {
                                        l.nc({
                                            text: D.W(x.Fm),
                                            img: s[0],
                                            ua: !0
                                        });
                                        s.fadeIn(300);
                                        l.nc({
                                            text: g(Math.ceil(m)),
                                            img: r[0],
                                            ua: !0
                                        });
                                        r.fadeIn(300, function() {
                                            c(Math.ceil(m), k - p, function() {
                                                w.fadeIn(300);
                                                null != B && 0 < B && k > B && v.animate({
                                                    scale: 2.5,
                                                    opacity: 0
                                                }, 0, function() {
                                                    v.css("display", "block");
                                                    v.animate({
                                                        scale: 1,
                                                        opacity: 1
                                                    }, 600, "easeInCubic")
                                                })
                                            })
                                        })
                                    })
                                })
                            }, 1E3);
                            n = f.Za;
                            var A = f.Nb,
                                B = b.wj(n, A - 1);
                            b.No(n, A - 1, k);
                            b.we(n, A - 1, h);
                            b.Lc(n) > A && f.Ej() && b.we(n, A, 0);
                            M.hg = !1;
                            M.dn();
                            0 === n && 1 === A && (K.Jz && K.Jz(a.Es), a.Es < ba && !d.aE && setTimeout(function() {
                                L.AB()
                            }, 3E3), z.xA())
                        };
                        var fa = !0;
                        this.Xu = function() {
                            $(window).width() < c.d(1024) + 120 && fa ? ($("#moreLink").fadeOut(function() {
                                fa = !1
                            }), $("#zenbox_tab").fadeOut()) : $(window).width() > c.d(1024) + 120 && !fa && ($("#moreLink").fadeIn(function() {
                                fa = !0
                            }), $("#zenbox_tab").fadeIn())
                        };
                        this.un = !0;
                        this.vo = function() {
                            g.fj === e.Gf && s.My() && !M.qe ? u() : m.Xh()
                        };
                        this.Yt = function() {
                            g.fj !== e.Ci && M.un && m.Ho()
                        };
                        this.init = function() {
                            b.load();
                            g.po = O
                        };
                        this.eb =
                            function() {
                                z.eb();
                                k.eb();
                                g.eb();
                                H.eb();
                                $(window).blur(M.vo);
                                $(window).focus(M.Yt);
                                $(window).resize(function() {
                                    M.Xu()
                                })
                        };
                        this.Ed = function() {
                            h.subscribe(h.r.zl, this.mo);
                            G.Ed();
                            k.Ed();
                            g.Ed(V);
                            f.Ed();
                            h.ra(h.r.Ib);
                            if (null != w.ix && null != w.gf) this.ot(w.ix - 1, w.gf - 1);
                            else if (r.qu) {
                                var a = g.Ze(e.Me);
                                a && a.Sn && a.Sn() ? (G.Nc(!0, 0), g.Va(e.Me, !0)) : g.Va(e.qb, !0)
                            }
                            var b = this;
                            h.subscribe(h.r.Kq, function() {
                                b.vo()
                            });
                            h.subscribe(h.r.Np, function() {
                                b.un = !0;
                                b.Yt()
                            });
                            h.subscribe(h.r.Ip, function() {
                                b.un = !1;
                                b.vo()
                            })
                        };
                        this.ot = function(a,
                            b) {
                            g.Va(e.Gf, !0);
                            f.Za = a;
                            f.Nb = b + 1;
                            this.ut()
                        };
                        this.Vz = function(a) {
                            M.Dj = !1;
                            G.Nc(!0, 0);
                            g.Va(e.Bd);
                            H.UA(a)
                        }
                    };
                return v
            }(R, H, T, ta, Qa, xa, pb, kc, da, Ua, qa, ma, w, lc, sa, ra, $a, mc, V, pa, ga, la, F, S, cb, function(a, c) {
                var d = null;
                return {
                    eb: function() {
                        d = $("#gameBorder")
                    },
                    UA: function(b) {
                        b = (b = c.as[b]) ? a.Rc + b : "";
                        d.removeClass("gameComplete").css("background-image", "url(" + b + ")")
                    },
                    aB: function() {
                        d.css("background-image", "").addClass("gameComplete")
                    },
                    hide: function() {
                        d.hide()
                    },
                    show: function() {
                        d.show()
                    },
                    fadeIn: function(a, c) {
                        d.delay(c ||
                            0).fadeIn(a)
                    },
                    fadeOut: function(a, c) {
                        d.delay(c || 0).fadeOut(a)
                    }
                }
            }(T, R), Na, bb, ab),
            oc = function(a, c, d, b, f, e, g, k, l, n) {
                return {
                    init: function() {
                        a.init();
                        e.Rh(function() {
                            d.init();
                            k.ra(k.r.iv)
                        })
                    },
                    eb: function() {
                        f.Dx && "undefined" != typeof document.body.onselectstart && (document.body.onselectstart = Ga(!1));
                        $(".ctrCursor").on("mousedown mouseup", function() {
                            $(this).toggleClass("ctrCursorActive")
                        });
                        $("body").addClass("ui-" + c.$d);
                        b.eb("c");
                        b.element.width = c.pb;
                        b.element.height = c.ab;
                        c.tC || (c.Rk ? $(b.element).width(c.Rk).height(c.sC) :
                            $(b.element).width(c.pb).height(c.ab));
                        g.eb && g.eb();
                        a.eb();
                        d.eb();
                        k.ra(k.r.hv)
                    },
                    Jo: function() {
                        a.Jo(function() {
                            d.Ed();
                            k.ra(k.r.ip);
                            $(".hideBeforeLoad").fadeIn(500);
                            d.Xu();
                            $("#gameFooterSocial").css("top", 0);
                            if (!f.Ym && n.ft()) {
                                $("#lsDomain").text(location.protocol + "//" + location.host);
                                $("#lsChromeInfoLink").show(0 <= navigator.userAgent.indexOf("Chrome"));
                                var a = $("#lsWarning").fadeIn(100);
                                $("#lsOkButton").on("click", function() {
                                    a.fadeOut()
                                })
                            }
                        })
                    }
                }
            }(wb, H, nc, P, qa, za, Va, V, Ta, T),
            pc = function(a, c, d, b, f) {
                a("forceHTML5Audio",
                    c.$x);
                window.showFpsCounter = function() {
                    b.Fs = !0
                };
                a("initFB", d.Ey);
                a("initTwitter", d.Hy);
                a("onLevelWon", function(a) {
                    f.subscribe(f.r.zl, function() {
                        a()
                    })
                });
                a("pauseGame", function() {
                    f.ra(f.r.Kq)
                });
                a("enable", function() {
                    f.ra(f.r.Np)
                });
                a("disable", function() {
                    f.ra(f.r.Ip)
                });
                return window.ZeptoLab
            }(function() {
                return function(a, c) {
                    var d = window.ZeptoLab;
                    null == d && (d = window.ZeptoLab = {});
                    var b = d.ctr;
                    null == b && (b = d.ctr = {});
                    b[a] = c
                }
            }(), ra, cb, qa, V);
        (function(a, c) {
            c.ft() && (a.init(), $(document).ready(function() {
                a.eb();
                a.Jo()
            }))
        })(oc, T, pc)
    })();
})();

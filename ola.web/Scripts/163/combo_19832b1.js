!
    function (t, n, r, e) {
        "use strict";
        !
            function (t, n) {
                var r = 1,
                    e = {},
                    i = {};
                n.getStopRecursionFn = function (o, u) {
                    u = u || t;
                    if (n.isFunction(o)) if (o.__stopRecursion && i[o.__stopRecursion]) return function () {
                        i[o.__stopRecursion](u, arguments)
                    };
                    else {
                        o.__stopRecursion = r;
                        i[o.__stopRecursion] = function (t, n) {
                            var r = e[o.__stopRecursion] || [],
                                i = 0;
                            for (i = 0; i < r.length; i++) if (r[i] === t) return t;
                            r.push(t);
                            e[o.__stopRecursion] = r;
                            o.apply(t, n);
                            for (i = 0; i < r.length; i++) if (r[i] === t) r.splice(i, 1)
                        };
                        r += 1;
                        return function () {
                            i[o.__stopRecursion](u, arguments)
                        }
                    }
                }
            }(window, jQuery);
        var i = t.Game = t.Game || {},
            o = function (t) {
                var n = i.getCdnUrl(),
                    r = i.getVersionId(),
                    e = i,
                    o = "";
                n += "/js2/game";
                if ("string" === typeof t) {
                    t = t.split(".");
                    for (var u = 0; u < t.length; u++) if (e[t[u]]) {
                        e = e[t[u]];
                        continue
                    } else o = [n, "/", t.join("/"), ".js?", r].join("");
                    if (o) return o;
                    else return true
                }
                return null
            },
            u = function (t, r, e) {
                switch (t) {
                    case "link":
                        n.loadCss(r);
                        break;
                    case "script":
                        n.loadJS(r, e)
                }
            },
            a = function (t) {
                var n = i._toStrings,
                    r = Object.prototype.toString,
                    o = {
                        1: "element",
                        3: "textnode",
                        9: "document",
                        11: "fragment"
                    };
                if (!n) {
                    n = {};
                    var u = "Arguments Array Boolean Date Document Element Error Fragment Function NodeList Null Number Object RegExp String TextNode Undefined Window".split(" ");
                    for (var a = u.length; a--;) {
                        var s = u[a],
                            f = window[s];
                        if (f) try {
                            n[r.call(new f)] = s.toLowerCase()
                        } catch (c) { }
                    }
                    i._toStrings = n
                }
                return null == t && (t === e ? "undefined" : "null") || t.nodeType && o[t.nodeType] || "number" == typeof t.length && (t.callee && _arguments || t.alert && "window" || t.item && "nodelist") || n[r.call(t)]
            },
            s = function () { };
        s.fn = s.prototype = {
            getEventCache: function () {
                return {}
            },
            regEvent: function (t) {
                var n = a(t),
                    i = this,
                    o = i.getEventCache();
                switch (n) {
                    case "string":
                        t = t.split(" ");
                    case "array":
                        r.each(t, function (t, n) {
                            o[n] = o[n] || []
                        })
                }
                r.each(o, function (t) {
                    i[t] = function (n) {
                        if (r.isFunction(n)) this.bind(t, n);
                        else if (n === e) this.callEvent(t);
                        return this
                    }
                });
                this.regEvent = function () { }
            },
            callEvent: function (t, n, r) {
                var i, o, u, a, s, f, c, l = this,
                    s = Array.prototype.slice.call(arguments, 1);
                if (!isNaN(t)) {
                    i = parseInt(t) || 200, o = this.getEventCache()[n], u = o.length;
                    if (0 === u) return;
                    o.paras = s;
                    if (!o.t) o.t = window.setTimeout(function () {
                        delete o.t;
                        l.callEvent.apply(l, o.paras)
                    }, i);
                    return
                }
                n = t;
                o = this.getEventCache()[n] || [], u = o.length, a = 0;
                if (0 == u) return;
                for (; a < u; a++) {
                    c = o[a].apply(this, s);
                    if (f === e || false === c) f = c
                }
                return f
            },
            bind: function (t, n) {
                if ("object" == Game.getType(t)) {
                    for (var e in t) this.bind(e, t[e]);
                    return this
                }
                var i = this.getEventCache()[t];
                if (i) r.isFunction(n) && i.push(n);
                else window.alert("未知的事件类型（" + t + "）！请检查大小写。");
                return this
            },
            unbind: function (t, n) {
                if ("object" == Game.getType(t)) {
                    for (var e in t) this.unbind(e, t[e]);
                    return this
                }
                var i = this.getEventCache()[t];
                if (i) this.getEventCache()[t] = n ? r.grep(i, function (t, r) {
                    return t !== n
                }) : [];
                else window.alert("未知的事件类型（" + t + "）！请检查大小写。");
                return this
            },
            extend: function (t) {
                r.extend(this, t);
                return this
            }
        };
        !
            function (t) {
                var e = 1,
                    i = {},
                    o;
                var u = function (t, n, r) {
                    this.work = t;
                    this.guid = e++;
                    this.runNum = 0;
                    this.interval = isNaN(n) ? 0 : 1e3 * +n;
                    this.maxNum = this.interval ? r || 0 : 1;
                    i[this.guid] = this;
                    u.start()
                };
                u.start = function () {
                    if (o) return;
                    o = window.setInterval(u.loop, 250)
                };
                u.loop = function () {
                    var t = 0;
                    for (var n in i) {
                        t++;
                        i[n].run()
                    }
                    if (0 == t) {
                        window.clearInterval(o);
                        o = 0
                    }
                };
                u.prototype = {
                    stop: function () {
                        if (i[this.guid]) delete i[this.guid];
                        this.running = 0;
                        this.wrok = null;
                        n.GC()
                    },
                    run: function () {
                        var t = new Date;
                        if (this.running) return;
                        if (!this.lastRunTime || t - this.lastRunTime >= this.interval && this.interval && (this.runNum < this.maxNum || !this.maxNum)) {
                            this.running = 1;
                            this.lastRunTime = t;
                            this.runNum++;
                            try {
                                this.work(r.proxy(this.notice, this), this.runNum, this.maxNum)
                            } catch (e) {
                                n.log && n.log("定时任务(" + this.guid + ")运行错误！任务已经强制终止！", e);
                                this.stop()
                            }
                        }
                        if (this.maxNum && this.runNum >= this.maxNum) this.stop()
                    },
                    notice: function (t) {
                        this.running = 0;
                        if (t) this.stop()
                    }
                };
                t.setTask = function (t, n, e) {
                    if (!r.isFunction(t)) return -1;
                    var i = new u(t, n, e);
                    return i.guid
                };
                t.clearTask = function (t) {
                    if (!t) return;
                    i[t] && i[t].stop()
                }
            }(i);
        r.extend(i, {
            config: {
                cdnUrl: "http://img3.126.net/caipiao",
                versionId: +new Date
            },
            format: r.format,
            getType: a,
            getVersionId: function () {
                return n.version || this.config.versionId
            },
            getCdnUrl: function () {
                return n.cdnUrl || this.config.cdnUrl
            },
            c: function (t, n) {
                t = +t;
                n = +n;
                if ("number" === a(t) && "number" === a(n)) {
                    var r = 1,
                        e = 1;
                    for (var i = t, o = 1; o <= n; r *= i-- , e *= o++);
                    return r / e
                }
                return 0
            },
            CR: function (t, n) {
                var r = [],
                    e = function (t, n, r, i, o) {
                        var u, a = t.length - o,
                            s;
                        for (s = i; s <= a; s++) {
                            u = r.slice(0);
                            u.push(t[s]);
                            if (1 == o) n.push(u);
                            else e(t, n, u, s + 1, o - 1)
                        }
                    };
                e(t, r, [], 0, n);
                return r
            },
            c1: function (t, n) {
                var e = 0,
                    o, u = i,
                    s, f, c = 0;
                if ("array" !== a(t[0])) t = u.groupNum(t);
                if ("array" !== a(n)) n = [n];
                o = t.length;
                f = function (n, r) {
                    s.push(Math.pow(t[n][0], r) * u.c(t[n][1], r))
                };
                !
                    function l(i, a) {
                        if (a == o) {
                            c = 0;
                            s = u.addArr(i);
                            for (var a = 0; a < n.length; a++) if (n[a] == s) c += 1;
                            if (c > 0) {
                                s = [];
                                r.each(i, f);
                                e += u.multipleArr(s) * c
                            }
                            return
                        }
                        for (var h = 0; h <= t[a][1]; h++) l(i.concat(h), a + 1)
                    }([], 0);
                return e
            },
            c2: function (t, n, e) {
                var o = 0,
                    u = 1,
                    s = 0,
                    f = i;
                if ("array" !== a(t[0])) t = f.groupNum(t);
                if ("array" !== a(n[0])) n = f.groupNum(n);
                if ("array" !== a(e)) e = [e];
                for (var c = 0, l = n.length; c < l; c++) {
                    o += n[c][1];
                    u *= Math.pow(n[c][0], n[c][1])
                }
                if (0 == o) s = f.c1(t, e);
                else r.each(e, function (r) {
                    s += e[r] > o ? f.c1(t, e[r] - o) * u : f.c1(n, e[r])
                });
                return s
            },
            groupNum: function (t) {
                var n = [],
                    r = {};
                if ("array" === a(t)) {
                    for (var e = 0, i = t.length; e < i; e++) r[t[e]] ? r[t[e]]++ : r[t[e]] = 1;
                    for (var o in r) n.push([o, r[o]])
                }
                return n
            },
            multipleArr: function (t) {
                var n = 1;
                if ("array" === a(t)) {
                    for (var r = 0, e = t.length; r < e; r++) n *= t[r];
                    return n
                } else return 0
            },
            sortNum: function (t, n) {
                var r = "desc" != n ?
                    function (t, n) {
                        return t - n
                    } : function (t, n) {
                        return n - t
                    };
                if ("array" === a(t)) return t.sort(r);
                else return t
            },
            addArr: function (t) {
                var n = 0;
                if ("array" === a(t)) for (var r = 0, e = t.length; r < e; r++) n += t[r];
                return n
            },
            indexOf: function (t, n) {
                if ("array" === a(t) && t.length) {
                    if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, n);
                    else for (var r = 0; r < t.length; r++) if (t[r] == n) return r;
                    return -1
                }
                return -1
            },
            random: function (t, n, e) {
                var i = [],
                    o, u, a = 0,
                    n = +n,
                    s = /^\d+$/;
                if ("string" === typeof t) {
                    t = t.split("-");
                    if (2 === t.length) {
                        o = +t[0];
                        u = +t[1];
                        t = [];
                        if ("number" == typeof o && u && o < u) for (a = o; a <= u; a++) t.push(a)
                    }
                }
                if (r.isArray(t) && n && n < t.length) {
                    t = t.slice(0);
                    i = this.randomSortArr(t).slice(0, n)
                } else if (n == t.length) {
                    if (!e) s.test(t.join("")) && t.sort(function (t, n) {
                        return +t - +n
                    });
                    return t
                }
                if (!e) s.test(t.join("")) && i.sort(function (t, n) {
                    return +t - +n
                });
                return i
            },
            randomWeight: function (t, n) {
                var e = [],
                    o, u, a, s, f, c = 0,
                    l, h = {},
                    g = [],
                    p, d, v, m = /^\d+$/;
                n = +n;
                if (t && r.isArray(t) && n) {
                    s = 0;
                    for (o = 0, a = t.length; o < a; o++) if (r.isArray(t[o]) && 2 == t[o].length) {
                        if (t[o][0] && r.isArray(t[o][0]) && t[o][0].length) {
                            l = +t[o][1];
                            if (!l || l < 0) l = 0;
                            l = Math.round(l);
                            s += t[o][0].length;
                            if (h[l]) h[l] = h[l].concat(t[o][0]);
                            else {
                                h[l] = t[o][0].slice(0);
                                g.push(l);
                                c += l
                            }
                        }
                    } else return e;
                    g.sort(function (t, n) {
                        return t - n
                    });
                    if (n < s) {
                        d = {};
                        for (o = 0; o < n; o++) {
                            v = ~~(Math.random() * c + 1);
                            d[v] ? d[v] += 1 : d[v] = 1
                        }
                        p = {};
                        for (v in d) {
                            f = 0;
                            for (u = 0, a = g.length; u < a; u++) if (v > f && v <= (f += g[u])) {
                                p[g[u]] ? p[g[u]] += d[v] : p[g[u]] = d[v];
                                break
                            }
                        }
                        for (v in p) e = e.concat(i.random(h[v], p[v]))
                    } else if (n == s) for (o = 0, a = t.length; o < a; o++) e = e.concat(t[o][0]);
                    if (e.length && m.test(e.join(""))) e.sort(function (t, n) {
                        return +t - +n
                    })
                }
                return e
            },
            randomNum: function (t, n) {
                t = +t;
                if (null == n) {
                    n = t;
                    t = 0
                }
                return t + Math.floor(Math.random() * (n - t + 1))
            },
            randomSortArr: function (t) {
                if (!t || !t.length) return [];
                var n, r = [],
                    e = 0,
                    o = t.length,
                    u;
                for (; e < o; e++) {
                    u = t[e];
                    n = i.randomNum(e);
                    r[e] = r[n];
                    r[n] = u
                }
                return r
            },
            fillZero: function (t, n) {
                var r = Math.floor(+t),
                    e = r + "",
                    i = [],
                    o = n || 2,
                    u = o - e.length,
                    a = 0;
                for (; a < u; a++) i[a] = "0";
                return u > 0 ? i.join("") + r : r + ""
            },
            unique: function (t) {
                var n = [],
                    e = Array.prototype.slice.call(arguments, r.isArray(t) ? 0 : 1),
                    i = e.length,
                    o = 0,
                    u;
                if (0 == i) return;
                for (; o < i; o++) {
                    u = e[o];
                    r.each(u, function (t, e) {
                        if (r.inArray(e, n) < 0) n.push(e)
                    })
                }
                true !== t && n.sort();
                return n
            },
            checkArr: function (t, n, e, i, o, u) {
                var a = 0,
                    s = [];
                if (!r.isArray(t)) return {
                    err: 1,
                    org: t,
                    fix: []
                };
                if ("boolean" == typeof o) {
                    u = o;
                    o = 0
                }
                o = o || Math.abs(e - n + 1);
                var f = {};
                r.each(t, function (t, r) {
                    var i = +((r + "").replace(/\D/g, "") || -1);
                    if (i < n || i > e) a++;
                    else if (f[i]) a++;
                    else {
                        f[i] = 1;
                        s[s.length] = i
                    }
                });
                if (s.length < i) {
                    a++;
                    s = []
                }
                if (s.length > o) {
                    a++;
                    s.length = o
                } !u && s.sort(function (t, n) {
                    return +t - +n
                });
                return {
                    err: a,
                    org: t,
                    fix: s
                }
            },
            getStopRecursionFn: function (t, n) {
                return r.getStopRecursionFn(t, n)
            },
            loadMolude: function (t, n) {
                var e;
                n = r.isFunction(n) ? n : r.noop;
                if ("string" === typeof t) {
                    e = o(t);
                    if (e) true === e ? n() : u("script", e, n)
                } else if (r.isArray(t)) {
                    var i = t.length,
                        a = 0,
                        s = i,
                        f = r.isFunction(n) ?
                            function () {
                                0 == --s && n()
                            } : r.noop;
                    for (; a < i; a++) {
                        e = o(t[a]);
                        if (e) true === e ? f() : u("script", e, f)
                    }
                }
            },
            checkGamePause: function (t, e) {
                var e = e || r.noop;
                n.checkGamePause(t, function (t) {
                    e(t);
                    if (1 == t || 999 === t) {
                        i.gameStop = true;
                        r.sendMsg("gameOver")
                    }
                });
                if ("string" === typeof t) r(function () {
                    n.popularizeConfigForBetPage(t)
                })
            },
            regBaseCom2Lib: function (t, n, e) {
                var i = function (t) {
                    var r = {};
                    this.getEventCache = function () {
                        return r
                    };
                    n && this.regEvent(n);
                    this.init(t);
                    return this
                };
                i.fn = i.prototype = new s;
                if (!e || !e.init) {
                    alert("原型链数据错误，缺少init构造函数！");
                    return
                }
                r.extend(i.fn, e);
                var o = t.split("."),
                    u = o.length,
                    a = 0,
                    f = this;
                for (; a < u; a++) if (a < u - 1) f = f[o[a]] = f[o[a]] || {};
                else f[o[a]] = i;
                return i
            },
            createCom: function (t, n, e) {
                var o = function (t) {
                    var n = i || {},
                        r = t.split("."),
                        e = r.length,
                        o = 0;
                    for (; o < e; o++) {
                        n = n[r[o]];
                        if (!n) break
                    }
                    return n
                };
                var u = o(t),
                    a = u ? new u(n) : null;
                if (a) {
                    r.isFunction(e) && e(a);
                    return a
                }
                this.loadMolude(t, function () {
                    var i = o(t),
                        u = i ? new i(n) : null;
                    r.isFunction(e) && e(u)
                })
            },
            dialog: function (t, n) {
                return r.dialog(r.extend({}, t, {
                    title: t.title || "提示",
                    css: t.className || "betDialog",
                    button: t.button || ["*确定"],
                    content: "<div class='betDialogContent'><em></em><div class='betDialogContent2'>" + t.content + "</div></div>",
                    width: t.width == e ? 430 : t.width,
                    height: t.height || 0,
                    dragable: 1,
                    animate: 0,
                    check: t.check || r.noop
                }), n || r.noop)
            },
            alert: function (t, n, e, o) {
                if (r.isFunction(n)) {
                    e = n;
                    n = null
                }
                i.dialog({
                    content: t,
                    button: n || o
                }, e)
            },
            confirm: function (t, n, r) {
                i.alert(t, n, r, ["*确定", "取消"])
            },
            getMoneyText: function (t) {
                if (isNaN(t)) return t;
                var n = 1e8,
                    r = 1e12;
                return t < n ? t : t < r ? "<span title='" + t + "元！\n土豪，我们做朋友吧！'>" + (t / n).Round(2) + "亿</span>" : "<span title='" + t + "元！\n震精！请问您是哪路高人？'>" + (t / r).Round(2) + "万亿</span>"
            },
            setTimeout: function (t, n) {
                if (!r.isFunction(t) || n === e) return;
                var i, o = 36e5,
                    u = function (n) {
                        if (n < 0) i = window.setTimeout(t, 0);
                        else if (n <= o) i = window.setTimeout(t, n);
                        else i = window.setTimeout(function () {
                            u(n - o)
                        }, o)
                    };
                u(+n);
                return {
                    clear: function () {
                        i && window.clearTimeout(i)
                    }
                }
            }
        });
        r(document).ready(function () {
            if (n.saveData2LS) r.bindMsg("login.jump", function () {
                n.saveData2LS()
            })
        })
    }(window, Core, jQuery);
!
    function (t, e, i, n, a) {
        var r = n.regBaseCom2Lib("COMS.GP.Timer", "onStart onStop onRunning onPause onResume onChange", {
            config: {
                timeCount: null,
                timeInterval: 0,
                autoSaveKey: "",
                fix: null,
                whenFix: e.noop,
                fixInterval: 0
            },
            STATUS: {
                inited: 0,
                running: 1,
                paused: 2,
                stoped: 3
            },
            init: function (t) {
                var i = n.getType(t),
                    r;
                switch (i) {
                    case "number":
                        this.config = e.extend({}, this.config, {
                            timeCount: t
                        });
                        break;
                    case "object":
                        this.config = e.extend({}, this.config, t || {});
                        break;
                    default:
                        this.config = e.extend({}, this.config);
                        return
                }
                this.status = this.STATUS.inited;
                r = this.config.timeCount;
                if (null !== r && r !== a) {
                    this.config.timeCount = +(r || 0);
                    this.start()
                }
            },
            start: function (e) {
                var i = this.config;
                if (!isNaN(e) && null != e) i.timeCount = +e;
                var n = i.timeInterval || 250,
                    a, r = this,
                    s = +new Date,
                    o;
                r.timer && t.clearInterval(r.timer);
                r.timer = t.setInterval(a = function () {
                    var t = +new Date,
                        e;
                    i.timeCount -= t - s;
                    s = t;
                    if (i.timeCount < 100) r.readyStop();
                    else {
                        e = r.getTimeDescription();
                        if (e.join(",") !== o.join(",")) {
                            o = e;
                            r.callEvent("onRunning", o[0], o[1], o[2], o[3], i.timeCount)
                        }
                    }
                }, Math.max(n, 100));
                r.status = r.STATUS.running;
                o = r.getTimeDescription();
                if (r.status == r.STATUS.paused) {
                    r.callEvent("onResume", o[0], o[1], o[2], o[3]);
                    r.callEvent("onChange", "resume")
                } else {
                    r.callEvent("onStart", o[0], o[1], o[2], o[3]);
                    r.callEvent("onChange", "start")
                }
                if (this._waittingStop) delete this._waittingStop;
                if (i.fix && i.fixInterval) {
                    r.fixTimer && t.clearInterval(r.fixTimer);
                    r.fixTimer = t.setInterval(function () {
                        r.autoFix()
                    }, i.fixInterval);
                    this.autoFix()
                }
                a()
            },
            pause: function (e) {
                if (this.status === this.STATUS.paused) return;
                this.timer && t.clearInterval(this.timer);
                this.fixTimer && t.clearInterval(this.fixTimer);
                this.status = this.STATUS.paused;
                if (!e) {
                    this.callEvent("onPause");
                    this.callEvent("onChange", "pause")
                }
            },
            autoFix: function (t) {
                var n = this,
                    a = this.config.fix,
                    r = this.config.whenFix;
                if (a) if (e.isFunction(a)) return a.call(this, t);
                else if (e.isFunction(r)) {
                    i.get(a, function (e, i) {
                        r.call(n, e, i, t)
                    });
                    return true
                }
            },
            readyStop: function () {
                if (this._waittingStop) return;
                this.fixTimer && t.clearInterval(this.fixTimer);
                this.pause(1);
                var e = this.autoFix(true);
                if (!e) {
                    if (this._waittingStop) delete this._waittingStop;
                    this.stop()
                } else this._waittingStop = true
            },
            stop: function (e) {
                if (this.status === this.STATUS.stoped) return;
                if (this._waittingStop) delete this._waittingStop;
                this.timer && t.clearInterval(this.timer);
                this.fixTimer && t.clearInterval(this.fixTimer);
                this.status = this.STATUS.stoped;
                if (!e) {
                    this.callEvent("onStop");
                    this.callEvent("onChange", "stop")
                }
            },
            getTimeDescription: function (t) {
                var e = t || this.config.timeCount,
                    t = +e > 0 ? +e : 0,
                    i = 6e4,
                    n = 60 * i,
                    a = 24 * n;
                return [Math.floor(t / a), Math.floor(t % a / n), Math.floor(t % a % n / i), Math.floor(t % a % n % i / 1e3)]
            },
            setAutoSaveKey: function (t) { },
            between: function (t, i, n, a) {
                var r = function (s, o, c, h, l) {
                    var u = e.isFunction(t) ? t() : t,
                        f = e.isFunction(i) ? i() : i;
                    if (l >= 1e3 * u && (f < 0 || l <= 1e3 * f)) {
                        n && n.call(this, s, o, c, h);
                        if (a) this.unbind("onRunning", r)
                    }
                };
                this.onRunning(r)
            },
            whenLess: function (t, e, i) {
                return this.between(0, t, e, i)
            },
            whenMore: function (t, e, i) {
                return this.between(t, -1, e, i)
            },
            getTimeLeft: function () {
                if (this.status == this.STATUS.inited || this.status == this.STATUS.stoped) return -1;
                return this.config.timeCount
            }
        });
        r.connectTime = t.performance && t.performance.timing ? t.performance.timing.connectStart || new Date : new Date;
        r.getPageRunTime = function () {
            return new Date - r.connectTime
        };
        var s = n.regBaseCom2Lib("COMS.GP.BetArea", "onGameInit onGameInitError onGameChange onBallClick onBallChange onRandom onDataTypeChange beforeGameChange onConfirm", {
            config: {
                checkAwardPeriod: null,
                profitCore: null,
                init: e.noop,
                period: null,
                gameConfig: {},
                tools: {}
            },
            init: function (i) {
                var n = this,
                    a = n.config = e.extend(true, {}, n.config, i || {});
                n.cache = {
                    currentGameType: ""
                };
                n.subGame = {};
                t.setTimeout(function () {
                    a.initGame && n.altGame(a.initGame);
                    n.loadTools()
                }, 0)
            },
            getActiveBall: function () {
                var t = this.subGame[this.cache.currentGameType];
                return t.getActiveBall.apply(t, arguments)
            },
            get: function (t) {
                var e = this.subGame[this.cache.currentGameType];
                return e.get.apply(e, arguments)
            },
            counter: function () {
                var t = this.subGame[this.cache.currentGameType].counter;
                if (t) return t.call(this, this.get())
            },
            push: function (t) {
                this.callGame2(this.cache.currentGameType, "push", arguments)
            },
            pull: function (t) {
                this.callGame2(this.cache.currentGameType, "pull", arguments)
            },
            set: function (t) {
                this.callGame2(this.cache.currentGameType, "set", arguments)
            },
            edit: function (t, i, n) {
                if (!t || !i || !e.isFunction(n)) return;
                this.altGame(t);
                this.callGame(t, "edit", i, n)
            },
            toggle: function (t) {
                this.callGame2(this.cache.currentGameType, "toggle", arguments)
            },
            updateInfo: function () {
                this.callGame(this.cache.currentGameType, "_updateInfo")
            },
            clear: function (t) {
                var i = this;
                if (!t) this.callGame(this.cache.currentGameType, "clear");
                else e.each(this.subGame, function (t, e) {
                    i.callGame(t, "clear")
                })
            },
            reset: function (t) {
                var i = this;
                if (!t) this.callGame(this.cache.currentGameType, "reset");
                else e.each(this.subGame, function (t, e) {
                    i.callGame(t, "reset")
                })
            },
            altGame: function (t, i) {
                var n = this,
                    a = this.cache,
                    r = e.isFunction(i) ? i : e.noop;
                var s = a.currentGameType,
                    o = !n.subGame[t];
                if (s == t) {
                    r.call(n);
                    return
                }
                if (a._inloading == t) return;
                a._inloading = t;
                n.callEvent("beforeGameChange", t);
                this.loadAGame(t, function (e, i) {
                    if (!e) {
                        if (a._inloading == t) a._inloading = "";
                        n.callEvent("onGameInitError", t, i);
                        return
                    }
                    if (a._inloading == t) {
                        a.currentGameType = t;
                        a._inloading = "";
                        n.callEvent("onGameChange", t);
                        e.dataType && n.callEvent("onDataTypeChange", e.dataType, t);
                        r.call(n)
                    }
                    o && n.callEvent("onGameInit", t, e)
                })
            },
            random: function (t) {
                this.callGame2(this.cache.currentGameType, "random", arguments)
            },
            random2: function (t, e) {
                this.altGame(t);
                this.callGame2(t, "random", arguments)
            },
            setCurPeriod: function (t) {
                if (this.period !== t) {
                    e.each(this.subGame, function (e, i) {
                        i.periodChange && i.periodChange(t)
                    });
                    e.each(this.tools, function (e, i) {
                        i.periodChange && i.periodChange(t)
                    })
                }
                this.period = t;
                return this
            },
            callGame: function (t, e) {
                this.callGame2(t, e, Array.prototype.slice.call(arguments, 2))
            },
            callGame2: function (t, e, i) {
                var n = this;
                this.loadAGame(t, function (t) {
                    t && t[e] && t[e].apply(t, i)
                })
            },
            subGame: {},
            getGameCache: function (t) {
                return this.subGame[t]
            },
            eachGame: function (t) {
                e.each(this.subGame, t);
                return this
            },
            loadAGame: function (t, a) {
                var r = this,
                    s = r.config,
                    o = s.gameConfig[t],
                    c = o ? o.path : "",
                    h = (o.name || t).toUpperCase(),
                    l = function () {
                        if (r.subGame[t]) {
                            a(r.subGame[t]);
                            return
                        }
                        var i = n.COMS.GP.BetArea[h];
                        if (!i) {
                            alert("子玩法(" + t + ")配置错误，没有找到组件。");
                            a(null, 2);
                            return
                        }
                        e.each(["init", "random", "get", "push", "pull", "set", "toggle", "clear"], function (n, r) {
                            if (!e.isFunction(i.prototype[r])) {
                                alert("子玩法(" + t + ")缺少必要接口:" + r);
                                a(null, 3);
                                return
                            }
                        });
                        o.frame = r;
                        var s = n.createCom("COMS.GP.BetArea." + h, o);
                        r.subGame[t] = s;
                        a(s)
                    };
                if (this.subGame[t]) {
                    a(this.subGame[t]);
                    return
                }
                var u = n.COMS.GP.BetArea[h];
                if (u) {
                    l();
                    return
                }
                if (!c) {
                    alert("不存在该玩法(" + t + ")，或没有为该玩法设定脚本地址。");
                    a(null, 1);
                    return
                }
                i.loadCdnJS(c, l)
            },
            tools: {},
            loadTools: function () {
                var t = this,
                    a = t.config,
                    r = a.tools || {},
                    s = function (a, r) {
                        var s = n.COMS.GP.BetArea[r.name],
                            o;
                        if (s && !t.tools[a]) {
                            e.each(["init", "periodChange", "reload", "update", "destroy"], function (t, n) {
                                if (!e.isFunction(s.prototype[n])) {
                                    i.log("工具(" + r.name + ")缺少必要接口:" + n);
                                    return
                                }
                            });
                            r.frame = t;
                            t.tools[a] = n.createCom("COMS.GP.BetArea." + r.name, r);
                            return true
                        }
                    };
                e.each(r, function (e, a) {
                    a.name = (a.name || e).toUpperCase();
                    a.period = t.period;
                    if (n.COMS.GP.BetArea[a.name]) {
                        s(e, a);
                        return
                    }
                    if (!a.js) {
                        i.log("工具(" + a.name + ")缺少js路径配置，无法初始化");
                        return
                    }
                    i.loadCdnJS(a.js, function () {
                        s(e, a)
                    });
                    a.css && i.loadCdnCss(a.css)
                })
            },
            calProfit: function (t, i) {
                var n = t ? e.isArray(t) ? t : [t] : null,
                    a = i || this.period,
                    r = this.config,
                    s = r.checkAwardPeriod,
                    o = r.profitCore;
                if (!n || !o) return [0, 0];
                var c = (o(t) || {}).data;
                if (!e.isArray(c)) return [0, 0];
                if (e.isFunction(s) && s(a) && c.length >= 4) return [c[2], c[3]];
                else if (c.length >= 2) return [c[0], c[1]];
                return [0, 0]
            }
        });
        var o = n.regBaseCom2Lib("COMS.GP.BetPool", "onChange onDelete onAdd onEdit onRandom onClear", {
            config: {
                wrap: "",
                highlight: "ddactive",
                hover: "ddhover",
                inedit: "inEdit",
                useServerRandom: true,
                serverRandomUrl: "",
                random: null,
                edit: null,
                adapter: null,
                counter: null,
                serialize: null,
                animate: true
            },
            init: function (t) {
                this.config = e.extend({}, this.config, t || {});
                if (!e.isFunction(this.config.random)) {
                    alert("没有提供机选算法接口random，初始化失败！", "pool001");
                    return
                }
                if (!e.isFunction(this.config.edit)) {
                    alert("没有提供投注数据修改接口edit，初始化失败！", "pool002");
                    return
                }
                if (!e.isFunction(this.config.adapter)) {
                    alert("没有提供数据转化器adapter，初始化失败！", "pool003");
                    return
                }
                if (!e.isFunction(this.config.counter)) {
                    alert("没有提供数据统计器counter，初始化失败！", "pool004");
                    return
                }
                var i = e(this.config.wrap);
                if (!i[0]) {
                    alert("号码篮容器设置错误，初始化失败！", "pool005");
                    return
                }
                if (!i.find(">dl")[0]) i.html("<dl></dl>");
                this.config.wrap = i;
                if (e.browser.msie && e.browser.version < 7) {
                    var n = this.config.hover;
                    i.delegate("dd", "mouseenter", function () {
                        e(this).addClass(n)
                    }).delegate("dd", "mouseleave", function () {
                        e(this).removeClass(n)
                    })
                }
                var a = this;
                i.delegate("a[rel=betPoolAct]", "click", function (t) {
                    var i = e(this),
                        n = i.attr("pid") || 0,
                        r = this.hash.substr(1);
                    switch (r) {
                        case "del":
                            a.del(n);
                            break;
                        case "edit":
                            a.__edit(n)
                    }
                    t.preventDefault()
                });
                this.cache = {
                    list: i.find("dl"),
                    data: [],
                    guid: 1
                }
            },
            push: function () {
                return this.push2(Array.prototype.slice.call(arguments, 0))
            },
            push2: function (t, e) {
                if ("array" !== n.getType(t)) return this;
                this.notHeightLight = !!e;
                this.insert(0, -1, t);
                delete this.notHeightLight;
                return this
            },
            getData: function () {
                return this.cache.data.slice(0)
            },
            serialize: function () {
                if (!e.isFunction(this.config.serialize)) {
                    alert("没有提供数据序列化接口serialize！", "pool006");
                    return ""
                }
                return this.config.serialize(this.getData())
            },
            getCount: function (t) {
                var e = 0,
                    i = 0,
                    n = t || this.cache.data,
                    a = n.length,
                    r = 0,
                    s;
                for (; r < a; r++) {
                    s = this.config.counter(n[r]);
                    if (!s || 2 != s.length) alert("数据统计器返回值错误！", "pool007");
                    else {
                        e += s[0];
                        i += s[1]
                    }
                }
                return [e, i]
            },
            insert: function (t, i, n, r) {
                var s = this.cache.data,
                    o = s.length,
                    c = this,
                    h, l, u = r == a ? "onAdd" : r,
                    f = 0 == o || 0 == t ? 0 : !t ? o : -1,
                    d;
                if (f < 0) e.each(s, function (e, n) {
                    if (n.guid == +t) {
                        f = i > 0 ? e + 1 : e;
                        return
                    }
                });
                if (f < 0) return this;
                if (c.config.dataChecker) {
                    h = c.config.dataChecker(n).fixData;
                    if (!e.isArray(h)) {
                        console && console.log && console.log("数据检查器dataChecker返回值错误!");
                        h = n.slice(0)
                    }
                } else h = n.slice(0);
                if (!h.length) return this;
                e.each(h, function (t, e) {
                    h[t] = c.__setGuid(e)
                });
                l = [].concat(s.slice(0, f), h, s.slice(f));
                if (u) if (false === this.callEvent(u, h, l)) return this;
                d = [];
                e.each(h, function (t, e) {
                    d[t] = c.__getItem(e, e.guid)
                });
                if (0 == f) {
                    this.cache.list.prepend(d.join("")).scrollTop(0);
                    if (1 == n.length && c.config.animate) this.cache.list.find("dd:first").hide().show(300)
                } else if (!t) this.cache.list.append(d.join("")).scrollTop(this.cache.list[0].scrollHeight);
                else {
                    var g = this.cache.list.find("dd[gid=" + t + "]"),
                        m = g.height(),
                        p = g.offset().top - this.cache.list.offset().top + m,
                        v = p - this.cache.list.height() + m,
                        C = this.cache.list.scrollTop();
                    g[i > 0 ? "after" : "before"](d.join(""));
                    if (curPos < v || C > p) this.cache.list.scrollTop(parseInt((v + p) / 2))
                }
                this.__highlight(h);
                this.cache.data = l;
                u && this.callEvent("onChange", u.replace(/^on/g, "").toLowerCase());
                return this
            },
            del: function (t) {
                var i = this.__inCache(t),
                    n, a, r, s;
                if (i < 0) return this;
                n = this.cache.data;
                a = n[i];
                r = [].concat(n.slice(0, i), n.slice(i + 1));
                if (false === this.callEvent("onDelete", a, r)) return this;
                s = this.cache.list.find("dd[gid=" + t + "]");
                if (this.config.animate) {
                    s.find("a").attr("href", "#");
                    s.hide(function () {
                        e(this).remove()
                    })
                } else s.remove();
                this.cache.data = r;
                this.callEvent("onChange", "del");
                return this
            },
            clear: function () {
                var t = this.cache.data,
                    e = t.length;
                if (0 == e) return this;
                if (false === this.callEvent("onClear")) return this;
                this.cache.list.empty().html("");
                this.cache.data.length = 0;
                this.callEvent("onChange", "clear");
                return this
            },
            edit: function (t, i) {
                var n = this.__inCache(t),
                    a, r, s = this,
                    o;
                if (!i) return this;
                if (s.config.dataChecker) {
                    o = s.config.dataChecker([i]).fixData;
                    if (!e.isArray(o)) console && console.log && console.log("数据检查器dataChecker返回值错误!");
                    else i = o.length ? o[0] : null
                }
                if (!i) return this;
                if (n >= 0 && false === this.callEvent("onEdit", this.cache.data[n], i)) return this;
                if (n < 0) return this.push(i);
                a = this.cache.list.find("dd[gid=" + t + "]");
                r = this.__setGuid(i, t);
                a.after(this.__getItem(r, r.guid));
                a.remove();
                this.cache.data[n] = r;
                this.__highlight([r]);
                this.callEvent("onChange", "edit");
                return this
            },
            __edit: function (t) {
                var e = this,
                    i = e.cache.data,
                    n = e.config.inedit,
                    a = e.__inCache(t);
                if (a >= 0) {
                    e.cache.list.find("." + n).removeClass(n).end().find("[gid=" + t + "]").addClass(n);
                    e.config.edit(t, e.cache.data[a])
                }
                return this
            },
            random: function (n, a, r) {
                var s = a || 1,
                    o = this,
                    c = this.config.serverRandomUrl,
                    h, l, u = function (t) {
                        var i = o.config.random(n, t, s);
                        if (!i || !i.length) {
                            alert("机选算法接口返回值错误！", "pool008");
                            return
                        }
                        if (false === o.callEvent("onRandom", t ? "server" : "client", i)) return;
                        o.insert(0, 1, i, "");
                        o.callEvent("onChange", "random");
                        e.isFunction(r) && r(i);
                        u = e.noop
                    };
                if (this.config.useServerRandom && c) {
                    h = e.isFunction(c) ? c.call(this.config, n, s) || "" : c;
                    !h ? u("") : i.get(h.replace(/{n}/g, s), function (e, i) {
                        l && t.clearTimeout(l);
                        u(e ? "" : i)
                    }, "@randomJX");
                    l = t.setTimeout(function () {
                        u("")
                    }, 300)
                } else u("");
                return this
            },
            __getItem: function (t, e) {
                var i = "<dd gid=" + e + ">" + this.config.adapter(t) + "</dd>",
                    a = {
                        del: '<a rel="betPoolAct" pid="' + e + '" href="#del">删除</a>',
                        edit: '<a rel="betPoolAct" pid="' + e + '" href="#edit">修改</a>'
                    };
                return n.format(i, a)
            },
            __setGuid: function (t, e) {
                if (t.guid) return t;
                var i = n.getType(t),
                    a;
                switch (i) {
                    case "string":
                        a = new String(t);
                        break;
                    case "number":
                        a = new Number(t);
                        break;
                    default:
                        a = t
                }
                a.guid = e || this.cache.guid++;
                return a
            },
            __inCache: function (t, e) {
                var i = e || this.cache.data,
                    n = i.length,
                    a = 0;
                for (; a < n; a++) if (i[a].guid == +t) return a;
                return -1
            },
            __highlight: function (i) {
                if (this.notHeightLight) return this;
                var n = this.__highlight.Cache,
                    a = this,
                    r = a.config.highlight,
                    s = function (t) {
                        var i = [];
                        a.cache.list.find("dd").each(function () {
                            var n = e(this).attr("gid") || 0,
                                s = a.__inCache(n, t);
                            if (s >= 0) i.push(e(this).addClass(r))
                        });
                        return i
                    };
                if (n && n.length > 0) {
                    this.__highlight.Cache = n.concat(s(i));
                    return this
                }
                this.__highlight.Cache = s(i);
                t.setTimeout(function () {
                    var i = a.__highlight.Cache;
                    t.setTimeout(function () {
                        e.each(i, function (t, e) {
                            e.removeClass(r)
                        });
                        i = null
                    }, 900);
                    a.__highlight.Cache = []
                }, 500)
            }
        });
        var c = n.regBaseCom2Lib("COMS.GP.iNumber", "onChange", {
            config: {
                wrap: "",
                addSelector: ".add",
                reduceSelector: ".subtract",
                addDisCss: "addDisable",
                addDownCss: "addDown",
                reduceDisCss: "subtractDisable",
                reduceDownCss: "subtractDown",
                min: 1,
                max: 9999,
                step: 1,
                editable: true
            },
            init: function (t) {
                var a = n.getType(t),
                    r = this;
                switch (a) {
                    case "string":
                    case "element":
                        this.config = e.extend({}, this.config, {
                            wrap: t
                        });
                        break;
                    case "object":
                        if (t.jquery) {
                            this.config = e.extend({}, this.config, {
                                wrap: t
                            });
                            break
                        }
                        this.config = e.extend({}, this.config, t || {});
                        break;
                    default:
                        return
                }
                var s = e(this.config.wrap);
                if (!s[0]) {
                    alert("数字容器设置错误，初始化失败！", "num001");
                    return
                }
                this.cache = {
                    wrap: s,
                    input: s.find("input"),
                    add: s.find(this.config.addSelector).disableDrag(),
                    reduce: s.find(this.config.reduceSelector).disableDrag()
                };
                this.cache.input.val(this.get());
                this.__initCtrl(this.config.addSelector, +r.config.step, this.config.addDownCss).__initCtrl(this.config.reduceSelector, -r.config.step, this.config.reduceDownCss);
                if (this.config.editable) i.loadCdnJS("js2/liveCheck.js", function () {
                    return !!e.fn.bindLiveCheck
                }, function () {
                    r.cache.input.bindLiveCheck(/\D/g, function () {
                        var t = r.get(true),
                            e = this.value;
                        if (t + "" != e && e) this.value = t;
                        e && r.callEvent(200, "onChange", +e)
                    }).blur(function () {
                        r.set(this.value)
                    }).disableIME()
                });
                else this.cache.input.attr("readonly", "readonly");
                r.onChange(r.__checkCtrl);
                r.__checkCtrl()
            },
            __initCtrl: function (i, n, a) {
                var r = function () {
                    this.ctimer && t.clearTimeout(this.ctimer);
                    this.stimer && t.clearInterval(this.stimer)
                },
                    s = this;
                this.cache.wrap.delegate(i, "click", function (t) {
                    r.call(this);
                    return s.__ctrlClick(this, t, n)
                }).delegate(i, "mousedown", function (e) {
                    var i = this;
                    this.ctimer = t.setTimeout(function () {
                        i.stimer = t.setInterval(function () {
                            s.__ctrlClick(i, e, n)
                        }, 150)
                    }, 400)
                }).delegate(i, "mouseleave", function (t) {
                    r.call(this)
                });
                if (e.fn.setControlEffect && a) this.cache.wrap.find(i).setControlEffect(a);
                return this
            },
            __ctrlClick: function (t, i, n) {
                if (e(t).hasClass("disabled")) return;
                this.set(this.get() + n)
            },
            __convert: function (t, e) {
                var i = (t + "").replace(/\D/g, ""),
                    n = this.config.min,
                    a = this.config.max,
                    r;
                if (!i.length) i = n;
                r = +i;
                if (e) r = r > a ? a : r;
                else r = r < n ? n : r > a ? a : r;
                return r
            },
            __checkCtrl: function () {
                var t = this.config,
                    e = t.min,
                    i = t.max,
                    n = this.get();
                this.cache.add[i == n ? "addClass" : "removeClass"](t.addDisCss);
                this.cache.reduce[e == n ? "addClass" : "removeClass"](t.reduceDisCss)
            },
            get: function (t) {
                return this.__convert(this.cache.input[0].value, t)
            },
            set: function (t) {
                var e = this.__convert(t),
                    i = this.cache.input[0];
                if (e + "" != i.value) {
                    i.value = e;
                    this.callEvent("onChange", e)
                }
                return this
            },
            hide: function () {
                this.config.wrap.hide();
                return this
            },
            show: function () {
                this.config.wrap.show();
                this.onChange();
                return this
            }
        })
    }(window, jQuery, Core, Game);
!
    function (e, t, n, o) {
        n.initGPTimer = function (r, a, i) {
            if (!r) return;
            i = i || {};
            var d = {
                period: a || "",
                previousPeriod: "",
                hasPeriodNum: 0,
                remainPeriodNum: 0,
                maxPeriodNum: 0,
                secondsLeft: 0,
                nextSecondsLeft: 0,
                groupBuySecondsLeft: 0,
                awardSecondsLeft: [0, 0],
                checkUrl: r,
                dataAdapter: t.isFunction(i.dataAdapter) ? i.dataAdapter : function (e) {
                    var t = n.parseJSON(e);
                    t.period = t.currentPeriod;
                    t.awardSecondsOne = Math.max(t.awardSecondsOne, 0);
                    t.awardSecondsTwo = Math.max(t.awardSecondsTwo, 0);
                    t.awardSecondsLeft = [t.awardSecondsOne, t.awardSecondsTwo];
                    return t
                }
            },
                s = t.noop,
                u = t.noop,
                c = o.createCom("COMS.GP.Timer").onStop(function () {
                    s()
                }),
                f = o.createCom("COMS.GP.Timer"),
                p = o.createCom("COMS.GP.Timer").onRunning(u = function (e, t, n, o, r) {
                    if (r <= d.awardSecondsLeft[1]) {
                        this.callEvent("onChange", "section");
                        this.unbind("onRunning", u)
                    }
                });
            var m = function () {
                if (!d.previousPeriod) return null;
                var e = {};
                t.each(["period", "previousPeriod", "hasPeriodNum", "remainPeriodNum", "maxPeriodNum", "awardSecondsLeft"], function (t, n) {
                    e[n] = d[n]
                });
                return e
            };
            var w = [];
            p.getAwardInfo = function (e) {
                var n = m();
                if (null == n) t.isFunction(e) && w.push(e);
                else {
                    var o = this.getTimeLeft();
                    n.status = o <= 0 ? 0 : o < d.awardSecondsLeft[1] ? 2 : 1;
                    n.timeLeft = Math.max(0, 1 == n.status ? o - d.awardSecondsLeft[1] : 2 == n.status ? o : 0);
                    t.isFunction(e) && e(n)
                }
                return n
            };
            var g = [];
            c.getBetInfo = function (e) {
                var n = m();
                if (null == n) t.isFunction(e) && g.push(e);
                else t.isFunction(e) && e(n);
                return n
            };
            (s = function () {
                return;
                if (d.stopAjax) return;
                n.get(r, function (n, r) {
                    if (n) {
                        d.errTimes = (d.errTimes || 0) + 1;
                        if (d.errTimes <= 10) e.setTimeout(s, 3e3);
                        else {
                            d.stopAjax = true;
                            c.stop(1);
                            f.stop(1);
                            p.stop(1);
                            if (!o.gameStop) {
                                t.dialog();
                                var a = new Date,
                                    i = e.setTimeout(function () {
                                        e.location.reload()
                                    }, 10 * 6e4);
                                t.sendMsg("periodGetFailed");
                                o.alert("服务器期次信息查询失败，请稍候再试。", function () {
                                    i && e.clearTimeout(i);
                                    if (new Date - a >= 3 * 6e4) e.location.reload()
                                })
                            }
                        }
                    } else {
                        d.errTimes = 0;
                        var m = d.dataAdapter(r),
                            l = false;
                        if (m.secondsLeft >= 0 || m.nextSecondsLeft >= 0) {
                            d.period = d.period || m.period;
                            if (m.period && d.period !== m.period) {
                                t.sendMsg("periodChange", d.period, m.period);
                                l = true
                            }
                            t.extend(d, m);
                            if (m.secondsLeft >= 0) c.start(m.secondsLeft);
                            else e.setTimeout(s, 3e3);
                            if (m.groupBuySecondsLeft >= 0) f.start(m.groupBuySecondsLeft);
                            if (m.awardSecondsOne >= 0 && m.awardSecondsTwo >= 0) {
                                p.start(m.awardSecondsOne + m.awardSecondsTwo);
                                l && p.onRunning(u)
                            }
                            if (w.length) {
                                t.each(w, function (e, t) {
                                    p.getAwardInfo(t)
                                });
                                w.length = 0
                            }
                            if (g.length) {
                                t.each(g, function (e, t) {
                                    c.getBetInfo(t)
                                });
                                g.length = 0
                            }
                        } else {
                            c.stop(1);
                            f.stop(1);
                            p.stop(1);
                            t.sendMsg("gameOver")
                        }
                    }
                }, "check.timer")
            })();
            var l = function () {
                var e = n.serverTime(),
                    t = (i.daySplitTime || "00:00:00").split(":"),
                    o = new Date(e.getFullYear(), e.getMonth(), e.getDate(), +t[0], +t[1], +t[2]);
                if (e - o > 0) o.setTime(o.getTime() + 24 * 60 * 60 * 1e3);
                return {
                    now: e,
                    newDay: o
                }
            },
                S = function () {
                    var e = l();
                    o.setTimeout(function () {
                        t.sendMsg("newDayStart");
                        S()
                    }, e.newDay - e.now)
                };
            S();
            return {
                bet: c,
                group: f,
                award: p,
                getToday: function () {
                    var e = l().newDay;
                    e.setDate(e.getDate() - 1);
                    return e.getDate()
                }
            }
        }
    }(window, window.jQuery || window.Zepto, Core, Game);
!
    function (e, t, n, i, a) {
        "use strict";
        n.initGPAside = function (a) {
            var r = i.alert,
                o = i.confirm,
                s = i.config.gameId,
                d = i.config.gameEn,
                u = i.config.gameCn,
                c = n.Timers.award,
                f = {},
                l = t.extend({
                    awardAjax: "http://caipiao.163.com/award/getAwardNumberInfo.html?gameEn=" + d,
                    taskFreq: 2,
                    maxTry: 200,
                    listBody: "#awardNumBody",
                    historyAjax: "http://caipiao.163.com/award/awardInfoForPrebet.html?gameId=" + s,
                    getInfoPeriod: function (e) {
                        return {
                            prefix: e.slice(0, -2),
                            day: +e.slice(-4, -2),
                            key: e.slice(-2)
                        }
                    }
                }, a || {});
            var m = 1;
            t.each("updateLastAwardHtml updateLastAwardTimer".split(" "), function (e, i) {
                if (!t.isFunction(l[i])) {
                    n.log("aside模块需要设置 " + i + " 方法！");
                    m = 0
                }
            });
            if (!m) return;
            if (l.getAwardListHtml) {
                var g = l.getAwardListHtml;
                l.getAwardListHtml = function (e) {
                    return g(e).replace(/^<([^ >]+)/, '<$1 data-period="' + e.period + '"')
                }
            }
            var p = function () {
                var e = {},
                    a = function (n) {
                        var i = [];
                        t.each(n || e, function (e, t) {
                            i.push(t)
                        });
                        i.sort(function (e, t) {
                            return +t.period - +e.period
                        });
                        return i
                    },
                    r = function (n) {
                        t.each(n, function (t, n) {
                            var i = e[n.period];
                            if (!n.period || i && /^\d/.test(i.winningNumber)) return;
                            e[n.period] = n
                        })
                    },
                    o = {},
                    s = function (s, d) {
                        var u = "string" == typeof s,
                            c = u ? "period" : "periodNum",
                            f = t.isFunction(d) ? d : t.noop,
                            m, g;
                        if (u) {
                            m = s;
                            g = e[m];
                            if (g && /^\d/.test(g.winningNumber)) {
                                f(g);
                                return
                            }
                        } else {
                            g = a();
                            if (g.length >= s) {
                                g.length = s;
                                t.each(g, function (e, t) {
                                    if (!/^\d/.test(t.winningNumber)) {
                                        g = null;
                                        return false
                                    }
                                });
                                if (g) {
                                    f(g);
                                    return
                                }
                            }
                        }
                        o[c] && i.clearTask(o[c]);
                        o[c] = i.setTask(function (e, t, i) {
                            var o = function () {
                                e(false);
                                t == i && f(null)
                            };
                            n.get(l.awardAjax, u ? {
                                period: m
                            } : {
                                    periodNum: s
                                }, function (t, i) {
                                    if (t) return o();
                                    var d = n.parseJSON(i),
                                        c = d.awardNumberInfoList || [];
                                    if (0 == c.length) return o();
                                    if (u) if (/^\d/.test(c[0].winningNumber)) {
                                        r(c);
                                        e(true);
                                        f(c[0])
                                    } else e(false);
                                    else {
                                        r(c);
                                        e(true);
                                        var l = a();
                                        l.length = Math.min(l.length, s);
                                        f(l)
                                    }
                                })
                        }, l.taskFreq, l.maxTry)
                    };
                t.bindMsg("periodChange", function (e, n) {
                    t.each(o, function (e, t) {
                        i.clearTask(t)
                    })
                });
                return n.awardDataCenter = {
                    getDataByNum: function (e, t) {
                        s(+e, t)
                    },
                    getDataByPeriod: function (e, t) {
                        s("" + e, t)
                    },
                    pushData: function (e) {
                        var n = t.isArray(e) ? e : a(e);
                        r(n)
                    },
                    getMaxMissPeriodLen: function (e) {
                        var n = c.getAwardInfo();
                        if (n && n.currentPeriod) {
                            var i = l.getInfoPeriod(n.currentPeriod),
                                r = +i.key,
                                o = a(),
                                s = currentPeriod;
                            t.each(o, function (e, t) {
                                var n = t.winningNumber;
                                if (n && !/^\d/.test(n)) s = Math.min(+l.getInfoPeriod(t.period).key, r)
                            });
                            return Math.max(r - s + 1, e)
                        }
                        return e
                    },
                    getAllData: function (t) {
                        return t ? a() : e
                    }
                }
            }();
            f.lastAward = function () {
                var i = -99,
                    a = function () {
                        c.getAwardInfo(function (t) {
                            var a = t.status,
                                o = t.timeLeft,
                                s = t.previousPeriod,
                                d = i != t.status;
                            i = t.status;
                            if (0 != a) n.lastPeriodAwardInfo = null;
                            switch (a) {
                                case 1:
                                case 2:
                                    if (d) {
                                        l.updateLastAwardHtml(a, {
                                            timeLeft: o,
                                            period: s
                                        });
                                        l.updateLastAwardTimer(a, o);
                                        f.awardList.update("insert", s, a)
                                    } else l.updateLastAwardTimer(a, o);
                                    if (2 == a && o < 1e3 && o > 0) e.setTimeout(function () {
                                        l.updateLastAwardTimer(2, 0)
                                    }, o);
                                    break;
                                default:
                                    r()
                            }
                        })
                    },
                    r = function () {
                        c.getAwardInfo(function (e) {
                            p.getDataByPeriod(e.previousPeriod, function (i) {
                                if (i) {
                                    i.hasPeriodNum = e.hasPeriodNum;
                                    i.remainPeriodNum = e.remainPeriodNum;
                                    l.updateLastAwardHtml(0, i, function () {
                                        n.lastPeriodAwardInfo = {
                                            period: i.period,
                                            no: i.winningNumber
                                        };
                                        t.sendMsg("periodDataHere", i.period, i.winningNumber, [i])
                                    })
                                } else {
                                    l.updateLastAwardHtml(-1);
                                    t.sendMsg("getLastPeriodDataErr", e.previousPeriod)
                                }
                            })
                        })
                    };
                c.onRunning(a).onStop(a);
                return {
                    update: function (e, n, i, a, r) {
                        if (!e.winningNumber) return;
                        l.updateLastAwardHtml(0, t.extend({}, e, {
                            period: n,
                            hasPeriodNum: i,
                            remainPeriodNum: a
                        }), r)
                    }
                }
            }();
            f.awardList = function () {
                if (!l.getAwardListHtml) return {
                    update: t.noop
                };
                var n = t(l.listBody),
                    i = n.find(".loadingTR"),
                    a = function () {
                        p.getDataByNum(p.getMaxMissPeriodLen(10), function (e) {
                            if (e) e.length = Math.min(e.length, 10);
                            r("reload", e || [])
                        })
                    },
                    r = function (e, a, r) {
                        if (i) {
                            i.remove();
                            i = null
                        }
                        switch (e) {
                            case "reload":
                                var o = a.length,
                                    s = [];
                                if (o) {
                                    var d = c.getAwardInfo() || {},
                                        u = d.previousPeriod || "",
                                        f = d.status || 0;
                                    t.each(a, function (e, n) {
                                        if (n.period == u && !/^\d/.test(n.winningNumber) && 0 != f) s.push(l.getAwardListHtml(t.extend({}, n, {
                                            winningNumber: f + ""
                                        })));
                                        else s.push(l.getAwardListHtml(n))
                                    });
                                    n.html(s.join(""))
                                }
                                break;
                            case "insert":
                                n.find("[data-period=" + a + "]").remove();
                                n.prepend(l.getAwardListHtml({
                                    period: a,
                                    winningNumber: r
                                }))
                        }
                        return this
                    };
                var o;
                c.getAwardInfo(function (t) {
                    if (0 !== t.status) a();
                    else o = e.setTimeout(function () {
                        a()
                    }, 1e3)
                });
                t.bindMsg("periodDataHere", function (t, n) {
                    o && e.clearTimeout(o);
                    o = 0;
                    a()
                });
                return {
                    update: r
                }
            }();
            f.historyList = function () {
                var i = {
                    recent: t("#recentAward"),
                    day: t("#dayAward tbody"),
                    week: t("#weekAward tbody"),
                    history: t("#historyAward tbody")
                };
                for (var a in i) if (!i[a][0]) return;
                var r = {
                    list: l.rankTemplate || '<tr{css}><td>{index}</td><td><span class="nickNames">{nickName}</span></td><td class="t_r">{bonus}元</td></tr>',
                    getList: function (e) {
                        var n = this.list;
                        e.length = Math.min(5, e.length);
                        return t.map(e, function (i, a) {
                            var r = +i.bonus;
                            return t.format(n, {
                                css: e.length == a + 1 ? " class='noborderTR'" : "",
                                nickName: t.safeHTML(i.nickName),
                                bonus: r < 1e5 ? r : r < 1e6 ? (r / 1e4).Round(1) + "万" : (r / 1e4).Cint() + "万",
                                indexNo: a + 1,
                                index: a < 3 ? '<strong class="c_ba2636">' + (a + 1) + "</strong>" : a + 1
                            })
                        }).join("")
                    },
                    recent: l.recentTemplate || '<li{css}><i class="gold_icon"></i><span class="winner">{nickName}</span> <span class="wanfaName">{extra}</span> <span class="awards">喜中<em class="c_ba2636">{bonus}元</em></span></li>',
                    getRecent: function (e) {
                        var n = this.recent;
                        return t.map(e, function (i, a) {
                            var r = +i.bonus;
                            return t.format(n, {
                                css: e.length == a + 1 && e.length <= 3 ? " class='noborderLi'" : "",
                                nickName: t.safeHTML(i.nickName),
                                bonus: r < 1e5 ? r : r < 1e6 ? (r / 1e4).Round(1) + "万" : (r / 1e4).Cint() + "万",
                                extra: i.extra
                            })
                        }).join("")
                    }
                },
                    o = null,
                    s = function () {
                        n.get(l.historyAjax, function (e, n) {
                            var a = i.recent.closest(".latestWinBox"),
                                d = i.day.closest(".rankingBox"),
                                u = t(".ranking_title", d),
                                c = 0;
                            if (!e && n) {
                                try {
                                    var f = JSON.parse(n)
                                } catch (l) { }
                                if (f) {
                                    if (f.recent && f.recent.length) {
                                        i.recent.html(r.getRecent(f.recent));
                                        o && o.destroy && o.destroy();
                                        i.recent.closest(".latestWin_con").carousel({
                                            vertical: true,
                                            step: 3,
                                            complete: function (e) {
                                                o = e
                                            }
                                        });
                                        a.show()
                                    } else a.hide();
                                    t.each(["day", "week", "history"], function (e, n) {
                                        if (f[n] && f[n].length) {
                                            i[n].html(r.getList(f[n]));
                                            t("[rel=#" + n + "Award]", u).show()
                                        } else {
                                            c++;
                                            t("[rel=#" + n + "Award]", u).hide()
                                        }
                                    });
                                    d[3 == c ? "hide" : "show"]();
                                    if (c < 3) {
                                        var m = u.find("dd").removeClass("active").end().find("dd:visible:first").addClass("active");
                                        t(".ranking_table", d).hide();
                                        t(m.attr("rel")).show()
                                    }
                                    if (!s.init) {
                                        s.init = 1;
                                        u.bindTab(t.noop, "mouseenter", "dd")
                                    }
                                    return
                                }
                            }
                            a.hide();
                            d.hide()
                        })
                    };
                s();
                t.bindMsg("periodDataHere", function (t, i) {
                    if (+n.initPeriod - +t < 1) e.setTimeout(s, 1e3 * (2 * Math.random() + 2))
                })
            }();
            !
                function () {
                    var i = {},
                        a = function (e, n, a) {
                            var o = t(e).delegate("h3", "click", function () {
                                var n = t(this).closest(e);
                                r(n[0].id, !n.hasClass(a))
                            }).each(function () {
                                i[this.id] = {
                                    wrap: t(this),
                                    content: t(n, this),
                                    css: a
                                }
                            })
                        },
                        r = function (n, a, r) {
                            var o = i[n];
                            if (o && o.wrap) {
                                o.wrap[a ? "addClass" : "removeClass"](o.css);
                                r && a && t.scrollWhenNeed(o.wrap, true);
                                if ("awardTableInfo" == n) e.LS.set(n, a ? 1 : 0)
                            }
                        };
                    a(".bottomBox", ".helpContent", "bottomBoxShow");
                    a(".helpBox", ".articleList", "helpBoxShow");
                    n.helpTab = {
                        show: function (e, t) {
                            r(e, 1, t)
                        },
                        hide: function (e, t) {
                            r(e, 0, t)
                        }
                    };
                    t("#viewTodayData").click(function (e) {
                        r("todayKaiJiang", 1, 1);
                        e.preventDefault()
                    });
                    t("#gamePlayUrl").click(function (e) {
                        r("awardTableInfo", 1, 1);
                        e.preventDefault()
                    });
                    if ("1" == (e.LS.get("awardTableInfo") || "1")) r("awardTableInfo", 1)
                }();
            !
                function () {
                    if (!l.getTodayList || !l.setTodayList) return;
                    var e = l.getTodayList(),
                        i = 0,
                        a = l.getInfoPeriod,
                        r = function () {
                            var i = n.Timers.getToday(),
                                r = p.getAllData(),
                                o;
                            t.each(r, function (t, n) {
                                var t = n.period,
                                    r = a(t),
                                    s = +r.day,
                                    d = r.key;
                                if (s == i) {
                                    o = e[d];
                                    if (!o || !/^\d/.test(o.winningNumber)) {
                                        l.setTodayList(d, n);
                                        e[d] = n
                                    }
                                }
                            })
                        },
                        o = function () {
                            for (var t in e) {
                                l.setTodayList(t, "");
                                e[t] = ""
                            }
                        };
                    t.each(e, function () {
                        i++
                    });
                    var s = n.initPeriod,
                        d = a(s),
                        u = +d.key - 1,
                        c = ("00" + u).slice(-d.key.length),
                        m = d.prefix,
                        g = m + c,
                        h, w, v, y, b, A = [];
                    t.bindMsg("periodDataHere", r);
                    t.bindMsg("newDayStart", function () {
                        var t = e[i];
                        if (t && /^\d/.test(t.winningNumber)) f.lastAward.update(t, m + i, 0, i);
                        o()
                    });
                    p.pushData(function () {
                        var n = [],
                            i = a(s);
                        t.each(e, function (e, t) {
                            var r = a(t.period);
                            if (r.key < i.key) n.push(t)
                        });
                        return n
                    }());
                    if (u > 0) {
                        w = e[c];
                        if (w && /^\d/.test(w.winningNumber)) f.lastAward.update(w, g, u, i - u, true)
                    }
                    if (u >= 10) {
                        for (var L = u; L > u - 10; L--) {
                            c = ("00" + L).slice(-d.key.length);
                            A.push(e[c])
                        }
                        f.awardList.update("reload", A)
                    }
                }();
            delete n.initGPAside;
            return this
        }
    }(window, jQuery, Core, Game);
!
    function (e, r) {
        "use strict";
        r.ssc = r.ssc || {};
        var s = /^star(\d)_([a-zA-Z\d]{2,})$/,
            t = /ren(\d)_fs/,
            i = /dxds_fs/,
            n = function (e, r) {
                var s = [];
                !
                    function t(e, r, i) {
                        var n;
                        if (0 == i) return s.push(e);
                        for (var f = 0, l = r.length - i; f <= l; f++) {
                            n = e.slice(0);
                            n.push(r[f]);
                            t(n, r.slice(f + 1), i - 1)
                        }
                    }([], e, r);
                return s
            },
            f = function (e, r) {
                var s = [];
                !
                    function t(e, r, i) {
                        var n, f, l;
                        if (0 == i) return s.push(e);
                        for (var a = 0, h = r.length - i; a <= h; a++) {
                            if ("_" == r[a] || "-" == r[a]) continue;
                            if (!r[a].length) {
                                n = e.slice(0);
                                n.push(r[a]);
                                t(n, r.slice(a + 1), i - 1)
                            } else {
                                l = "string" == typeof r[a] ? r[a].split("") : r[a];
                                for (var o = 0; o < l.length; o++) {
                                    n = e.slice(0);
                                    n.push(l[o]);
                                    t(n, r.slice(a + 1), i - 1)
                                }
                            }
                        }
                    }([], e, r || e.length);
                return s
            },
            l = function (e, r) {
                return e - r
            },
            a = r.ssc.plusMoney || (Core.sscAwardConfig || {}).plan || {
                star5_tx: [0, 0, 0],
                star5_fs: 0,
                star3_fs: 0,
                star3_hz: 0,
                star3_z3: 0,
                star3_z6: 0,
                star2_fs: 0,
                star2_hz: 0,
                star2_zx: 0,
                star2_zxhz: [0, 0],
                star2_zxfw: [0, 0],
                star1_fs: 0,
                dxds_fs: 0
            },
            h = {
                star5_tx: [2e4, 200, 20],
                star5_fs: 1e5,
                star3_fs: 1e3,
                star3_hz: 1e3,
                star3_z3: 320,
                star3_z6: 160,
                star2_fs: 100,
                star2_hz: 100,
                star2_zx: 50,
                star2_zxhz: [100, 50],
                star2_zxfw: [100, 50],
                star1_fs: 10,
                dxds_fs: 4
            },
            o = function () {
                return 0
            },
            u = function (r, s) {
                var t = [],
                    i = {},
                    n = false,
                    f = "",
                    a = {
                        q3: {
                            len: 0
                        },
                        h3: {
                            len: 0
                        },
                        q2: {
                            len: 0
                        },
                        h2: {
                            len: 0
                        },
                        bai: {
                            len: 0
                        },
                        all: {
                            len: 0
                        }
                    },
                    h, o, u, c, d, q, x, z = e.isFunction(r) ? r(s) : r || PLAYER.getData();
                if (+s && z.length > s) return -2;
                if (0 == z.length) return 0;
                for (var p = 0; p < z.length; p++) {
                    o = z[p];
                    u = z[p].type;
                    if (h && h != u) {
                        n = true;
                        return -1
                    } else if (!h) h = u;
                    t = _(o, u);
                    for (var g = 0; g < t.length; g++) {
                        if ("star2_zxfw" == h) f = t[g].sort(l).join(",");
                        else f = t[g].toString();
                        if ("star5_tx" == h) {
                            c = t[g].slice(0, 3).join(",");
                            q = t[g].slice(-3).join(",");
                            d = t[g].slice(0, 2).join(",");
                            x = t[g].slice(-2).join(",");
                            if (a.q3[c]) a.q3[c] += 1;
                            else {
                                a.q3[c] = 1;
                                a.q3.len += 1
                            }
                            if (a.h3[q]) a.h3[q] += 1;
                            else {
                                a.h3[q] = 1;
                                a.h3.len += 1
                            }
                            if (a.q2[d]) a.q2[d] += 1;
                            else {
                                a.q2[d] = 1;
                                a.q2.len += 1
                            }
                            if (a.h2[x]) a.h2[x] += 1;
                            else {
                                a.h2[x] = 1;
                                a.h2.len += 1
                            }
                            if (a.all[f]) a.all[f] = a.all[f] + 1;
                            else {
                                a.all[f] = 1;
                                a.all.len += 1
                            }
                            if (!a.bai[t[g][2]]) {
                                a.bai[t[g][2]] = 1;
                                a.bai.len += 1
                            }
                        } else if (i[f]) i[f] = i[f] + 1;
                        else i[f] = 1
                    }
                }
                if ("star5_tx" == h) i = a;
                return {
                    gameType: h,
                    data: i,
                    must: 0
                }
            },
            _ = function (e, r) {
                var t, i, l, a, h = 0;
                if (s.test(r)) {
                    l = RegExp.$1;
                    a = RegExp.$2;
                    if ("fs" == a || "tx" == a) return f(e, l);
                    else if ("star3_z3" == r) {
                        i = [];
                        if ("_" == e[0] && "_" == e[1]) i.push(e);
                        else {
                            t = n(e, 2);
                            for (var h = 0; h < t.length; h++) {
                                i.push(["_", "_", t[h][0], t[h][0], t[h][1]]);
                                i.push(["_", "_", t[h][0], t[h][1], t[h][1]])
                            }
                        }
                        return i
                    } else if ("star3_z6" == r) return n(e, 3);
                    else if ("star2_zx" == r) return n(e, 2);
                    else if ("star2_zxfw" == r) return f(e, 2)
                } else if ("dxds_fs" == r) return [e];
                return e
            },
            c = function (e) {
                var r = u(e),
                    s, t, i, n, f, l, o, _ = {
                        ret: 0,
                        errorCode: 0,
                        errorDes: "未知原因",
                        data: [0, 0],
                        must: 0
                    },
                    c = function (e, r) {
                        var i = 0,
                            n = 0,
                            f = 0,
                            l, a, h = 0,
                            o = 0,
                            u = 0,
                            _ = 0,
                            c, d, q, x, z, p, g, v, w, m, y, A, j, C, b, D;
                        D = s;
                        if ("star5_tx" == t) D = s.all;
                        if ("dxds_fs" == t) {
                            l = e[t];
                            a = e[t] + r[t];
                            j = {
                                "大,大;单,单": 0,
                                "大,大;双,单": 0,
                                "大,大;单,双": 0,
                                "大,大;双,双": 0,
                                "大,小;单,单": 0,
                                "大,小;双,单": 0,
                                "大,小;单,双": 0,
                                "大,小;双,双": 0,
                                "小,大;单,单": 0,
                                "小,大;双,单": 0,
                                "小,大;单,双": 0,
                                "小,大;双,双": 0,
                                "小,小;单,单": 0,
                                "小,小;双,单": 0,
                                "小,小;单,双": 0,
                                "小,小;双,双": 0,
                                "大,单;双,大": 0,
                                "大,单;双,小": 0,
                                "大,单;单,大": 0,
                                "大,单;单,小": 0,
                                "大,双;双,大": 0,
                                "大,双;双,小": 0,
                                "大,双;单,大": 0,
                                "大,双;单,小": 0,
                                "小,双;双,大": 0,
                                "小,双;双,小": 0,
                                "小,双;单,大": 0,
                                "小,双;单,小": 0,
                                "小,单;双,大": 0,
                                "小,单;双,小": 0,
                                "小,单;单,大": 0,
                                "小,单;单,小": 0
                            };
                            for (b in D) {
                                for (C in j) if (C.indexOf(b) > -1) j[C] += D[b];
                                ++i
                            }
                            for (C in j) if (j[C] > 0) {
                                !!n ? j[C] < n && (n = j[C]) : n = j[C]; !!f ? j[C] > f && (f = j[C]) : f = j[C]
                            }
                            h = n * l;
                            o = f * l;
                            u = f * a;
                            _ = n * a
                        } else {
                            for (C in D) {
                                if ("len" == C) continue;
                                if ("star2_zxhz" == t) {
                                    l = e[t];
                                    a = [e[t][0] + r[t][0], e[t][1] + r[t][1]];
                                    C = +C;
                                    if (C > -1) if (C % 2 == 0) if (0 == C || 18 == C) {
                                        w = m = l[0] * D[C];
                                        y = A = a[0] * D[C]
                                    } else {
                                        w = l[0] * D[C];
                                        m = l[1] * D[C];
                                        y = a[0] * D[C];
                                        A = a[1] * D[C]
                                    } else {
                                        w = m = l[1] * D[C];
                                        y = A = a[1] * D[C]
                                    } !!u ? y > u && (u = y) : u = y; !!_ ? A < _ && (_ = A) : _ = A; !!o ? w > o && (o = w) : o = w; !!h ? m < h && (h = m) : h = m
                                } else if ("star2_zxfw" == t) {
                                    l = e[t];
                                    a = [e[t][0] + r[t][0], e[t][1] + r[t][1]];
                                    j = C.split(",");
                                    if (j[0] == j[1]) {
                                        w = m = l[0] * D[C];
                                        y = A = a[0] * D[C]
                                    } else {
                                        w = m = l[1] * D[C];
                                        y = A = a[1] * D[C]
                                    } !!u ? y > u && (u = y) : u = y; !!_ ? A < _ && (_ = A) : _ = A; !!o ? w > o && (o = w) : o = w; !!h ? m < h && (h = m) : h = m
                                } else if ("star5_tx" == t) {
                                    l = e[t];
                                    a = [e[t][0] + r[t][0], e[t][1] + r[t][1], e[t][2] + r[t][2]];
                                    c = C.slice(0, 5);
                                    d = C.slice(-5);
                                    q = C.slice(0, 3);
                                    x = C.slice(-3);
                                    w = l[0] * D[C];
                                    w += s.q3[c] * l[1];
                                    w += s.h3[d] * l[1];
                                    w += s.q2[q] * l[2];
                                    w += s.h2[x] * l[2];
                                    y = a[0] * D[C];
                                    y += s.q3[c] * a[1];
                                    y += s.h3[d] * a[1];
                                    y += s.q2[q] * a[2];
                                    y += s.h2[x] * a[2];
                                    if (w > o) o = w;
                                    if (y > u) u = y;
                                    m = 0;
                                    A = 0;
                                    z = 0;
                                    p = 0;
                                    g = 0;
                                    v = 0;
                                    if (1e5 == D.len) {
                                        m += l[0] * D[C];
                                        m += s.q3[c] * l[1];
                                        m += s.h3[d] * l[1];
                                        m += s.q2[q] * l[2];
                                        m += s.h2[x] * l[2];
                                        A += a[0] * D[C];
                                        A += s.q3[c] * a[1];
                                        A += s.h3[d] * a[1];
                                        A += s.q2[q] * a[2];
                                        A += s.h2[x] * a[2]
                                    } else {
                                        if (1e3 == s.q3.len) {
                                            m += s.q3[c] * l[1];
                                            m += s.q2[q] * l[2];
                                            A += s.q3[c] * a[1];
                                            A += s.q2[q] * a[2]
                                        } else if (10 == s.bai.len) {
                                            z = s.q2[q] * l[2];
                                            z += s.q3[c] * l[1];
                                            g = s.q2[q] * a[2];
                                            g += s.q3[c] * a[1]
                                        } else if (100 == s.q2.len) {
                                            m += s.q2[q] * l[2];
                                            A += s.q2[q] * a[2]
                                        } else {
                                            z = s.q2[q] * l[2];
                                            g = s.q2[q] * a[2]
                                        }
                                        if (1e3 == s.h3.len) {
                                            m += s.h3[d] * l[1];
                                            m += s.h2[x] * l[2];
                                            A += s.h3[d] * a[1];
                                            A += s.h2[x] * a[2]
                                        } else if (10 == s.bai.len) {
                                            p = s.h2[x] * l[2];
                                            p += s.h3[d] * l[1];
                                            v = s.h2[x] * a[2];
                                            v += s.h3[d] * a[1]
                                        } else if (100 == s.h2.len) {
                                            m += s.h2[x] * l[2];
                                            A += s.h2[x] * a[2]
                                        } else {
                                            p = s.h2[x] * l[2];
                                            v = s.h2[x] * a[2]
                                        }
                                    }
                                    if (z && p) m = Math.min(z, p);
                                    if (g && v) A = Math.min(g, v);
                                    if (m && (!h || m < h)) h = m;
                                    if (A && (!_ || A < _)) _ = A
                                } else {
                                    l = e[t];
                                    a = e[t] + r[t]; !!f ? D[C] > f && (f = D[C]) : f = D[C]; !!n ? D[C] < n && (n = D[C]) : n = D[C]
                                } ++i
                            }
                            if (f && n) {
                                h = n * l;
                                o = f * l;
                                u = f * a;
                                _ = n * a
                            }
                        }
                        return [h, o, _, u, i]
                    };
                if (0 == r) {
                    _.errorCode = 1;
                    _.errorDes = "数据为空无法计算盈利";
                    return _
                }
                if (r == -1) {
                    _.errorCode = 2;
                    _.errorDes = "您选择的多种玩法，暂时无法计算盈利，将以 -- 显示";
                    return _
                }
                if (r == -2) {
                    _.errorCode = 3;
                    _.errorDes = "您选择的号码数据太多，无法计算盈利，将以 -- 显示";
                    return _
                }
                s = r.data;
                t = r.gameType;
                i = c(h, a);
                if (i[4] > 0) {
                    _.must = r.must;
                    _.errorDes = "";
                    _.ret = 1;
                    n = i[0];
                    f = i[1];
                    l = i[2];
                    o = i[3];
                    _.data = [n, f, l, o]
                }
                return _
            },
            d = function (e) {
                return window.plusAwardPeriodArray && window.plusAwardPeriodArray.join(",").indexOf(e) !== -1
            };
        r.ssc.profitCore = c;
        r.ssc.checkAwardPeriod = d
    }(jQuery, Game);
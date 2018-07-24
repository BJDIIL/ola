!
    function (a, s, n, e, r) {
        e.ssc = e.ssc || {};

        function t(a) {
            var n = a.slice(0),
                e = n.length,
                r = 0;
            for (; r < e; r++) n[r] = s.isArray(n[r]) ? t(n[r]) : ("0" + n[r]).slice(-2);
            return n
        }
        function i(a) {
            alert(a);
            throw new Error(a)
        }
        function o(a) {
            a = a.slice(0);
            for (var s = 0, n = 5 - a.length; s < n; s++) a.unshift("_");
            return a
        }
        function c(a) {
            for (var n = 0, e = a.length; n < e; n++) if (s.isArray(a[n])) c(a[n]);
            else a[n] = +a[n]
        }
        function f(a) {
            var s = [];
            for (var n = 0; n < a.length; n++) for (var e = 0; e < a.length; e++) if (e !== n) s.push([a[n], a[n], a[e]].sort());
            return s.sort()
        }
        function l(a) {
            var s = 0;
            for (var n = 0; n < a; ++n) s += Math.floor(10 * Math.random());
            return s
        }
        e.ssc.core = {
            wrap: "#select_list_box",
            useServerRandom: false,
            config: {
                gameEn: a.gameEn || a.Game.config.gameEn || i("需要指定gameEn"),
                jxssc_daxiao_nums: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
                jxssc_daxiao_strs: ["小 小", "小 大", "大 小", "大 大", "单 单", "单 双", "双 单", "双 双", "小 单", "小 双", "单 小", "双 小", "大 单", "大 双", "单 大", "双 大"],
                ssc_daxiao_nums: [2, 1, 5, 4],
                ssc_daxiao_strs: ["大", "小", "单", "双"]
            },
            convertPeriod: function (a) {
                return a.slice ? a.slice(-9) : a
            },
            random: function (a, n, r) {
                if (!this.gameNameMap[a]) {
                    alert("未定义的玩法类型：" + a + "，无法机选。");
                    return []
                }
                var t = [];
                var i = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                var o;
                var c = a.match(/star(\d)_fs/) || a.match(/star(2)_zxfw/) || a.match(/star(5)_tx/);
                if (c) {
                    var f = +c[1];
                    o = function () {
                        var a = [];
                        for (var s = 0; s < f; s++) a.push(e.random(i, 1));
                        return a
                    }
                } else if (/hz$/.test(a)) {
                    var u = /star3/.test(a) ? 3 : 2;
                    o = function () {
                        return [l(u)]
                    }
                } else if ("star2_zx" == a) o = function () {
                    return e.random(i, 2)
                };
                else if ("star3_z3" == a) o = function () {
                    var a = e.random(i, 3);
                    var s = a[0],
                        n = a[1],
                        r = a[2];
                    return (r % 2 ? [n, n, s] : [s, s, n]).sort()
                };
                else if ("star3_z6" == a) o = function () {
                    return e.random(i, 3)
                };
                else if ("dxds_fs" == a) {
                    i = ["大", "小", "单", "双"];
                    o = function () {
                        return [e.random(i, 1)[0], e.random(i, 1)[0]]
                    }
                } else if (/ren[12]_fs/.test(a)) {
                    var f = +a.match(/ren([12])_fs/)[1];
                    o = function () {
                        var a = [];
                        var n = e.random(i, f);
                        var r = e.random([0, 1, 2, 3, 4], f);
                        s.each([0, 1, 2, 3, 4], function (e, t) {
                            a.push(s.inArray(t, r) > -1 ? [n.shift()] : [])
                        });
                        return a
                    }
                }
                for (var _ = 0; _ < r; _++) t.push({
                    gameType: a.replace(/_dt$/, "_pt"),
                    no: o(),
                    random: 1
                });
                return t
            },
            htmlTmpl: ['<span class="type">{type}</span>', '<span class="nums" title="{balls} [共{num}注 {cost}元]"><strong class="c_ba2636">{balls}</strong></span>', "{editTemplate}", '<span class="sum">{cost}元</span>'].join(""),
            adapter: function (a) {
                var n = {
                    balls: "",
                    num: "",
                    cost: "",
                    type: "",
                    editTemplate: '<span class="edit">{edit}{del}</span>'
                };
                var e;
                var r = a.gameType;
                var t = r.match(/star(\d)_fs/i) || r.match(/star(5)_tx/i) || r.match(/star(2)_zxfw/i);
                var i = r.match(/ren(\d)_fs/i);
                var o;
                if (t) {
                    o = +t[1];
                    n.balls = [];
                    for (var c = 0; c < 5; c++) n.balls.push(c < 5 - o ? "_" : a.no[c + o - 5].join(""));
                    n.balls = n.balls.join(" ")
                } else if (/star\d_hz/i.test(r) || /star\d_zxhz/i.test(r) || /star\d_z[x\d]/i.test(r) || /dxds_fs/i.test(r)) n.balls = a.no.join(" ");
                else if (i) {
                    n.balls = [];
                    for (var c = 0; c < 5; c++) n.balls.push(a.no[c].length > 0 ? a.no[c].join("") : "-");
                    n.balls = n.balls.join(" ")
                }
                if (this.betPage && s.inArray(r, ["star3_z3", "star2_zxfw", "star3_hz"]) !== -1) n.editTemplate = '<span class="edit">{del}</span>';
                e = this.counter(a);
                n.num = e[0];
                n.cost = e[1];
                n.type = this.gameNameMap[r];
                return s.format(this.htmlTmpl, n)
            },
            counter: function (a) {
                var n = [0, 0],
                    e = this;
                if (s.isArray(a)) {
                    s.each(a, function (a, s) {
                        var r = e._counter(s);
                        n[0] += r[0];
                        n[1] += r[1]
                    });
                    return n
                } else return this._counter(a)
            },
            _counter: function (a) {
                var n;
                var r = a.no;
                var t = a.gameType;
                var i = t.match(/star(\d)_fs/i) || t.match(/star(2)_zxfw/i) || t.match(/star(5)_tx/i);
                var o = t.match(/star(\d)_hz/i);
                var c = t.match(/star([23])_z[x6]$/i);
                if (i) {
                    n = 1;
                    for (var f = 0; f < +i[1]; f++) n *= r[f].length
                } else if (o) {
                    function l(a) {
                        return 10 - Math.abs(a - 9)
                    }
                    function u(a) {
                        return [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1][a]
                    }
                    function _(a) {
                        return 2 == o[1] ? l(a) : u(a)
                    }
                    n = 0;
                    s.each(a.no, function (a, s) {
                        n += _(s)
                    })
                } else if (c) n = e.c(r.length, +c[1]);
                else if (/star3_z3/i.test(t)) if (3 === r.length) n = 1;
                else n = 0;
                else if ("star2_zxhz" == t) {
                    function h(a) {
                        return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1][a]
                    }
                    n = 0;
                    s.each(r, function (a, s) {
                        n += h(s)
                    })
                } else if ("dxds_fs" == t) s.each(r, function (a, s) {
                    if (!s) {
                        n = 0;
                        return false
                    } else n = 1
                });
                else if ("ren1_fs" == t) {
                    n = 0;
                    s.each(r, function (a, s) {
                        n += s.length
                    })
                } else if ("ren2_fs" == t) {
                    function m(a) {
                        var s = 0;
                        for (var n = 0; n < a; n++) s += n;
                        return s
                    }
                    var d = 0;
                    var g = 0;
                    s.each(r, function (a, s) {
                        d += m(s.length);
                        g += s.length
                    });
                    n = e.c(g, 2) - d
                }
                return [n, 2 * n]
            },
            serialize: function (a) {
                var n = this;
                if (!s.isArray(a)) a = [a];
                var r = [];

                function t(a) {
                    var s = [];
                    var n = a[0],
                        e = a[1],
                        r = a[2],
                        t = a[3],
                        i = a[4];
                    for (var o = 0; o < n.length; o++) for (var c = 0; c < e.length; c++) for (var f = 0; f < r.length; f++) for (var l = 0; l < t.length; l++) for (var u = 0; u < i.length; u++) s.push(n[o] + " " + e[c] + " " + r[f] + " " + t[l] + " " + i[u]);
                    return s
                }
                s.each(a, function (a, i) {
                    var c = [];
                    var f = "";
                    var l = [];
                    var u = "";
                    var _ = "";
                    var h = i.gameType;
                    var m = i.no;
                    var d;
                    var g = h.match(/star(\d)_fs/i);
                    var p = h.match(/star(\d)_hz/i);
                    var v = h.match(/ren(\d)_fs/i);
                    if (g) {
                        d = +g[1];
                        if (1 == d) {
                            s.each(m[0], function (a, s) {
                                if ("ssc" == n.config.gameEn) c.push("_ _ _ _ " + s + "#STAR_1#SINGLE");
                                else if ("jxssc" == n.config.gameEn) c.push("_ _ _ _ " + s + "#STAR_1#MULTIPLE")
                            });
                            f = c.join(",")
                        } else if (d > 1) {
                            s.each(m, function (a, s) {
                                l.push(s.join(""))
                            });
                            for (var x = 0, z = 5 - l.length; x < z; x++) l.unshift("_");
                            l = l.join(" ");
                            u = "STAR_" + d;
                            _ = {
                                ssc: "ZUHE",
                                jxssc: "MULTIPLE"
                            }[n.config.gameEn];
                            f = s.format("{0}#{1}#{2}", [l, u, _])
                        }
                    } else if (p) {
                        d = +p[1];
                        s.each(m, function (a, s) {
                            c.push(s + "#STAR_" + d + "#HEZHI")
                        });
                        f = c.join(",")
                    } else if ("star2_zx" == h) {
                        if ("ssc" == n.config.gameEn) {
                            l = i.no.join(" ");
                            f = l + "#" + "STAR_2#ZUXUAN_FU"
                        } else if ("jxssc" == n.config.gameEn) {
                            m = e.CR(m, 2);
                            s.each(m, function (a, s) {
                                c.push(s.join(" ") + "#STAR_2#ZUXUAN")
                            });
                            f = c.join(",")
                        }
                    } else if ("star3_z3" == h) f = o(m).join(" ") + "#STAR_3#ZUSAN_FU";
                    else if ("star3_z6" == h) f = m.join(" ") + "#STAR_3#ZULIU_FU";
                    else if ("star2_zxhz" == h) {
                        s.each(m, function (a, s) {
                            var e = {
                                ssc: "#STAR_2#BAODIAN",
                                jxssc: "#STAR_2#ZUXUAN_HEZHI"
                            }[n.config.gameEn];
                            c.push(s + e)
                        });
                        f = c.join(",")
                    } else if ("star2_zxfw" == h) {
                        s.each(m, function (a, s) {
                            l.push(s.join(""))
                        });
                        l = o(l);
                        f = l.join(" ") + "#STAR_2#ZUXUAN_FENWEI"
                    } else if ("dxds_fs" == h) {
                        if ("jxssc" == n.config.gameEn) {
                            var A = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];
                            var y = ["小 小", "小 大", "大 小", "大 大", "单 单", "单 双", "双 单", "双 双", "小 单", "小 双", "单 小", "双 小", "大 单", "大 双", "单 大", "双 大"];
                            l = A[s.inArray(m.join(" "), y)];
                            f = l + "#DAXIAO_DANSHUANG#SINGLE"
                        } else if ("ssc" == n.config.gameEn) {
                            var A = [2, 1, 5, 4];
                            var y = ["大", "小", "单", "双"];
                            s.each(m, function (a, n) {
                                l.push(A[s.inArray(n, y)])
                            });
                            l = l.join(" ");
                            f = l + "#DAXIAO_DANSHUANG#SINGLE"
                        }
                    } else if ("star5_tx" == h) {
                        l = t(m);
                        s.each(l, function (a, s) {
                            c.push(s + "#STAR_5#TONGXUAN")
                        });
                        f = c.join(",")
                    } else if (v) {
                        d = +v[1];
                        s.each(m, function (a, s) {
                            if (s.length > 0) l.push(s.join(""));
                            else l.push("-")
                        });
                        f = l.join(" ") + "#REN_XUAN#SSC_REN_" + d
                    }
                    r.push(f)
                });
                return r.join(",")
            },
            convert2old: function (a) {
                var n = [],
                    e = s.isArray(a) ? a : [a];
                s.each(e, function (a, e) {
                    var r = e.gameType;
                    var t = e.no;
                    var i = [];
                    s.each(t, function (a, n) {
                        if (s.isArray(n)) i[a] = n.join("");
                        else i[a] = "" + n
                    });
                    if (/star\d_fs|star3_z3|star2_zxfw/.test(r)) i = o(i);
                    if (/^ren/.test(r)) i = s.map(i, function (a) {
                        return a.trim().length ? a : "-"
                    });
                    i.type = r;
                    n[a] = i
                });
                return n
            },
            parse: function (a) {
                if (!a) return [];
                var n = a.split(","),
                    e = [];
                for (var r = 0; r < n.length; r++) {
                    var t = this.parseOne(n[r]);
                    if (s.isArray(t)) e = e.concat(t);
                    else e.push(t)
                }
                return e
            },
            parseOne: function (a) {
                return this["parseOne_" + this.config.gameEn](a)
            },
            parseOne_ssc: function (n) {
                var e = a.Game.ssc.core;
                var r = {};
                var t = n.match(/^(.*)#STAR_(\d)#(.*)$/);
                var i = n.match(/^(.*)#DAXIAO_DANSHUANG#SINGLE$/);
                if (i) {
                    r.gameType = "dxds_fs";
                    var o = i[1].split(" ");
                    if (s.inArray(o[0], e.config.ssc_daxiao_strs) === -1) {
                        var l = +o[0];
                        var u = +o[1];
                        var _ = e.config.ssc_daxiao_strs[s.inArray(l, e.config.ssc_daxiao_nums)];
                        var h = e.config.ssc_daxiao_strs[s.inArray(u, e.config.ssc_daxiao_nums)];
                        r.no = [_, h]
                    } else r.no = o
                } else if (t) {
                    var m = "star" + t[2] + "_" + {
                        single: "fs",
                        zuhe: "fs",
                        hezhi: "hz",
                        zuxuan_fu: "zx",
                        baodian: "zxhz",
                        zuxuan_fenwei: "zxfw",
                        zusan_fu: "z3",
                        zuliu_fu: "z6",
                        tongxuan: "tx"
                    }[t[3].toLowerCase()];
                    var d = t[1].replace(/_\s/g, "");
                    d = d.split(" ");
                    if (/star\d_fs|star2_zxfw|star5_tx/.test(m)) s.each(d, function (a, s) {
                        d[a] = s.split("")
                    });
                    r.gameType = m;
                    r.no = d;
                    c(r.no)
                }
                if ("star3_z3" === r.gameType && 2 === r.no.length) return s.map(f(r.no), function (a) {
                    return {
                        gameType: r.gameType,
                        no: a
                    }
                });
                else return r
            },
            parseOne_jxssc: function (n) {
                var e = {};
                var r = a.Game.ssc.core;
                var t = n.match(/^(.*)#STAR_(\d)#(.*)$/);
                var i = n.match(/^(.*)#DAXIAO_DANSHUANG#SINGLE$/);
                var o = n.match(/^(.*)#REN_XUAN#SSC_REN_(\d)$/);
                if (i) {
                    e.gameType = "dxds_fs";
                    var l = i[1];
                    var n = s.inArray(l, r.config.jxssc_daxiao_strs) !== -1 ? l : r.config.jxssc_daxiao_strs[s.inArray(l, r.config.jxssc_daxiao_nums)];
                    e.no = n.split(" ")
                } else if (t || o) {
                    var u;
                    var _;
                    if (o) {
                        u = "ren" + o[2] + "_fs";
                        _ = o[1]
                    } else if (t) {
                        u = "star" + t[2] + "_" + {
                            multiple: "fs",
                            hezhi: "hz",
                            zuxuan: "zx",
                            zusan_fu: "z3",
                            zuliu_fu: "z6",
                            tongxuan: "tx",
                            zuxuan_hezhi: "zxhz"
                        }[t[3].toLowerCase()];
                        _ = t[1]
                    }
                    _ = _.replace(/_\s/g, "");
                    _ = _.split(" ");
                    if (/star\d_fs|star5_tx|ren\d_fs/.test(u)) s.each(_, function (a, s) {
                        s = s.replace(/\-/g, "");
                        _[a] = s.split("")
                    });
                    e.gameType = u;
                    e.no = _;
                    c(e.no)
                }
                if ("star3_z3" === e.gameType && 2 === e.no.length) return s.map(f(e.no), function (a) {
                    return {
                        gameType: e.gameType,
                        no: a
                    }
                });
                else return e
            },
            getT: function (a) {
                var s = {
                    upload: 2,
                    dingdan: 3,
                    yilou: 4
                }[a.type];
                return s || (a.random ? 1 : 0)
            },
            setT: function (a, s) {
                a.type = {
                    2: "upload",
                    3: "dingdan",
                    4: "yilou"
                }[s];
                a.random = 5 == +s || 1 == +s ? 1 : r
            },
            gameNameMap: {
                star1_fs: "一星直选",
                star2_fs: "二星直选",
                star2_hz: "二星和值",
                star2_zx: "二星组选",
                star2_zxhz: "二星组选和值",
                star2_zxfw: "二星组选分位",
                star3_fs: "三星直选",
                star3_z3: "三星组三",
                star3_z6: "三星组六",
                star3_hz: "三星和值",
                star4_fs: "四星直选",
                star5_fs: "五星直选",
                star5_tx: "五星通选",
                dxds_fs: "大小单双",
                ren1_fs: "任选一",
                ren2_fs: "任选二"
            },
            getProfitHtml: function (a, n) {
                var a = a.slice(0);
                var n = n.slice(0);
                var e = '<span class="c_727171">若中奖，奖金';
                if (a[0] == a[1]) e += s.format('<strong class="c_ba2636"> {0} </strong>元', a);
                else e += s.format('<strong class="c_ba2636"> {0} </strong>至<strong class="c_ba2636"> {1} </strong>元', a);
                if (n[1] > 0) {
                    e += "，盈利";
                    if (n[0] == n[1]) e += s.format('<strong class="' + (n[0] > 0 ? "c_ba2636" : "c_090") + '"> {0} </strong>元</span>', n);
                    else e += s.format('<strong class="' + (n[0] > 0 ? "c_ba2636" : "c_090") + '"> {0} </strong>至<strong class="' + (n[1] > 0 ? "c_ba2636" : "c_090") + '"> {1} </strong>元</span>', n)
                } else {
                    e += "，亏损";
                    s.each(n, function (a, s) {
                        n[a] = Math.abs(s)
                    });
                    if (n[0] == n[1]) e += s.format('<strong class="c_090"> {0} </strong>元</span>', n);
                    else e += s.format('<strong class="c_090"> {0} </strong>至<strong class="c_090"> {1} </strong>元</span>', n)
                }
                return e
            },
            getRunningHTML: function (a, n, e, r, t) {
                var i = function (a) {
                    return "<em>" + ("00" + a).slice(-2).split("").join("</em><em>") + "</em>"
                };
                var o = "",
                    c = s.isFunction(t) ? t : t ?
                        function (a) {
                            return ("00" + a).slice(-2)
                        } : i;
                if (1 == a && 0 == n) {
                    a = 0;
                    n = 24
                }
                if (1 == n && 0 == e) {
                    n = 0;
                    e = 60
                }
                if (a > 0) o = c(a, "d") + "天" + c(n, "h") + "时";
                else if (n > 0) o = c(n, "h") + "时" + c(e, "m") + "分";
                else o = c(e, "m") + "分" + c(r, "s") + "秒";
                return o
            },
            endPeriodTip: function (n) {
                var e = s.extend({
                    type: 1,
                    oldPeriod: "",
                    newPeriod: "",
                    content: "",
                    callBack: s.noop
                }, n || {}),
                    r;
                e.callback = s.isFunction(e.callback) ? e.callback : s.noop;
                if (!e.oldPeriod) {
                    e.callback(1);
                    return
                }
                switch (e.type) {
                    case 1:
                        r = ['您好，第<span class="c_ba2636"> ', e.oldPeriod, "</span> 期已截止，", e.newPeriod ? '当前期是第<span class="c_ba2636"> ' + e.newPeriod + " </span>期，" : "", "投注时请确认您选择的期号。"].join("");
                        break;
                    case 2:
                        r = '您好，第<span class="c_ba2636"> ' + e.oldPeriod + "</span> 期发起合买已截止，您还可进行自购。";
                        break;
                    case 3:
                        r = '您好，第<span class="c_ba2636"> ' + e.oldPeriod + "</span> 期单式上传已截止，您还可进行自购。";
                        break;
                    case 4:
                        r = '您好，第<span class="c_ba2636"> ' + e.oldPeriod + "</span> 期发起预投已截止，您还可进行自购。"
                }
                r = e.content || r;
                if (!r) {
                    e.callback(2);
                    return
                }
                s.dialog();
                a.setTimeout(function () {
                    s.dialog();
                    var n, t;
                    s.dialog({
                        title: "提示",
                        content: "<div style='font-size:12px'>" + r + '<p style="margin:10px 0 0 0;"><span class="c_ba2636 endTime">10</span>秒后将自动关闭</p></div>',
                        width: 430,
                        animate: 240,
                        button: ["*确定"],
                        init: function () {
                            var e = s(this),
                                r = 10,
                                i = e.find(".endTime");
                            n = this.id;
                            if (i[0]) t = a.setInterval(function () {
                                if (0 == r) {
                                    t && a.clearInterval(t);
                                    s.dialog(n)
                                }
                                i.text(r);
                                r--
                            }, 1e3)
                        }
                    }, function () {
                        e.callback(0);
                        t && a.clearInterval(t)
                    })
                }, 50)
            },
            loadHtmlAndInit: function (a, e, r, t) {
                var i = s(a),
                    o = n;
                if (!i[0]) return o;
                var c = i[0].loadId = i[0].loadId || parseInt(900 * Math.random() + 100) + "";
                if (i[0].loaded) {
                    s.isFunction(t) && t.call(o);
                    return this
                }
                n.get(e, function (a, n) {
                    if (i[0]) {
                        var e = a ? "<div class='loadingData'>数据加载失败，请稍候再试。</div>" : n;
                        if (!a) i[0].loaded = true;
                        i.html(e);
                        if (s.isFunction(r)) r.call(o, i, t);
                        else s.isFunction(t) && t.call(o)
                    }
                }, c);
                return o
            },
            getLackError: function (a) {
                a = a[0];
                var n = "miss",
                    e = "至少选择1注号码才能投注，是否机选1注碰碰运气?",
                    r = "",
                    t = a.no,
                    i = [],
                    o = true,
                    c = {
                        star3_z3: {
                            gameName: "三星组三",
                            num: 2
                        },
                        star3_z6: {
                            gameName: "三星组六",
                            num: 3
                        },
                        star2_zx: {
                            gameName: "二星组选",
                            num: 2
                        }
                    };
                if (s.isArray(t[0])) {
                    s.each(t, function (a, s) {
                        if (s.length <= 0) i.push(["个位", "十位", "百位", "千位", "万位"][t.length - a - 1]);
                        else o = false
                    });
                    if (o) {
                        n = "miss";
                        r = e
                    } else {
                        n = "lack";
                        if ("ren2_fs" === a.gameType) r = '请在任两位各至少选择 <span class="c_ba2636">1</span> 个号码';
                        else r = "请在 " + i.join("，") + " 至少" + (i.length > 1 ? "各" : "") + '选择 <span class="c_ba2636">1</span> 个' + ("dxds_fs" === a.gameType ? "属性" : "号码")
                    }
                } else if ("dxds_fs" == a.gameType) if (!t[0] && !t[1]) {
                    o = true;
                    n = "miss";
                    r = e
                } else {
                    n = "lack";
                    r = "请在" + (!t[0] ? "十" : "个") + "位选择一种属性"
                } else if (t.length <= 0) {
                    n = "miss";
                    r = e
                } else {
                    n = "lack";
                    r = '请至少选择 <span class="c_ba2636">' + c[a.gameType].num + "</span> 个号码"
                }
                return {
                    type: n,
                    message: r
                }
            }
        }
    }(window, jQuery, Core, Game);
!
    function (e, t, i, a) {
        "use strict";
        var n = a.alert,
            r = a.confirm,
            o = a.config.gameId,
            s = a.config.gameEn,
            l = a.config.gameCn,
            c = a.ssc.core,
            d = e.LS;
        t.extend(i, {
            config: t.extend({
                zhuihaoAjax: "http://caipiao.163.com/bet/queryBetType_followBuy4Ftl.html?gameId=" + o,
                hemaiAjax: "http://caipiao.163.com/bet/queryBetType_newgroupBuy.html?gameId=" + o,
                timerAjax: "http://caipiao.163.com/order/preBet_periodInfoTime.html?gameEn=" + s
            }, i.config),
            quickInit: function () {
                var e = d.get(s + "_lastVisit") || "",
                    a = t.getPara("game") || t.getHashPara("betType") || "",
                    n, r = function (e) {
                        return !!c.gameNameMap[e.replace(/zt|dt$/, "")]
                    };
                n = r(a) ? a : r(e) ? e : "star1_fs";
                if (this.isChartPage) n = n.replace(/zt|dt$/, "").replace("_hz", "_fs").replace("zxhz", "zx");
                this.helper.gameType = n;
                this.initTimer().initBetArea().initAside();
                this.loadCdnJS("/js2/game/gpc/clickStat.js");
                t(".menuBox .moreLink a,.drawNotice h3>a").removeAttr("title");
                if (i.serverTime() < new Date("2014/06/30")) t("#moreOperateBox dd[rel=3] label").append('<i class="cz_new"/>')
            },
            myInit: function () {
                a.checkGamePause(s);
                this.initPool().initBuyTab().buyButtonInit();
                this.initShotEnter().initOther()
            },
            helper: {
                gameType: "star1_fs",
                dataType: "",
                buyType: 1,
                period: i.initPeriod
            },
            giveFocus: function (e) {
                if (t(e)[0]) try {
                    var i, a = jQuery(e)[0],
                        n = jQuery(a).is("input:text,textarea") ? jQuery(a).attr("readonly") ? false : a.createTextRange() ? true : false : false;
                    if (n) {
                        i = a.createTextRange();
                        i.moveStart("character", a.value.length);
                        i.collapse(true);
                        i.select()
                    }
                } catch (r) {
                    t(e)[0].focus();
                    return true
                }
            },
            scrollTo: function (e, a) {
                switch (e) {
                    case "bet":
                        i.scrollWhenNeed(t("#docBody").offset().top - 6, a);
                        break;
                    case "box":
                        i.scrollWhenNeed(".gameMenu");
                        break;
                    case "pool":
                        i.scrollWhenNeed(c.wrap)
                }
            },
            fly2Pool: function (e) {
                var i = t("#select_list_box"),
                    a = i.offset(),
                    n = {
                        width: i.width(),
                        height: 26
                    },
                    r = t(e),
                    o = r.offset(),
                    s = {
                        width: r.width(),
                        height: r.height()
                    };
                t("<div>").css({
                    position: "absolute",
                    zIndex: 999,
                    border: "1px solid #666",
                    overflow: "hidden",
                    left: o.left,
                    top: o.top,
                    width: s.width,
                    height: s.height
                }).appendTo(document.body).animate({
                    left: a.left,
                    top: a.top,
                    width: n.width,
                    height: n.height
                }, function () {
                    t(this).remove()
                })
            },
            initShotEnter: function () {
                this.loadLSData(true);
                if (this.initData) this.scrollTo("bet");
                var a = e.LS.get(s + "readyEdit");
                if (a) {
                    e.LS.remove(s + "readyEdit");
                    t.each(this.betPool.getData(), function (e, t) {
                        if (c.serialize([t]) === a) {
                            i.betPool.__edit(t.guid);
                            return false
                        }
                    })
                }
                var n = (this.config.orderType || t.getPara("buyType")).replace(/[^\d\.]/g, ""),
                    r = false,
                    o = this.config;
                t.each(this.initGroupData || {}, function (e, t) {
                    if (t) r = true
                });
                n = ("2" !== n || "2.1" !== n) && r ? "3" : n;
                if ("2" === n || "2.1" === n || "3" === n) {
                    this.helper.setBuyType(+n, true);
                    this.scrollTo("bet")
                }
                var l = +(t.getPara("random").replace(/\D/g, "") || 0);
                if (l > 0 && !this.initData) this.betPool.autoRandom(Math.min(l, 99));
                this.activityType = t.getUrlPara("activityType").replace(/\D/g, "") || this.activityType || 0;
                delete this.initShotEnter;
                return this
            },
            initOther: function () {
                t(".gameMenu a").click(function () {
                    i.saveData2LS();
                    e.LS.set(s + "pageScroll", t(e).scrollTop())
                });
                var a = e.LS.get(s + "pageScroll");
                if (a) {
                    e.LS.remove(s + "pageScroll");
                    t(e).scrollTop(a)
                } else this.scrollTo("bet");
                delete this.initOther;
                return this
            },
            initTimer: function () {
                Lottery.initTimer();
                return this
                //alert("初始化timer");
                var e = this.Timers = this.initGPTimer(this.config.timerAjax, this.helper.period, "ssc" === s ? {
                    daySplitTime: "02:00:00"
                } : null);
                var n = t(".betTimer"),
                    r = t(".betTimer2");
                e.bet.onRunning(function (e, t, i, a) {
                    var o = c.getRunningHTML(e, t, i, a);
                    if (o !== this._betTimer2HTML) {
                        n.html("本期投注剩余时间：" + c.getRunningHTML(e, t, i, a));
                        r.html(c.getRunningHTML(e, t, i, a, true));
                        this._betTimer2HTML = o
                    }
                });
                t.bindMsg("periodChange", function (e, a) {
                    if (a) i.helper.period = a;
                    i.periodEndLock || c.endPeriodTip({
                        oldPeriod: e,
                        newPeriod: a
                    });
                    t("#currentPeriod").text(c.convertPeriod(a || "---"))
                });
                t.bindMsgOnce("gameOver", function () {
                    a.gameStop = true;
                    a.checkGamePause(s)
                });
                delete this.initTimer;
                return this
            },
            initBetArea: function () {
                var e = {},
                    i = {},
                    n = {
                        pt: "putong",
                        dt: "dantuo",
                        zt: "paste"
                    },
                    r = t(".betTypeList"),
                    o = t("#mainPanels"),
                    l = this,
                    u;

                function h(e) {
                    if (!e) return;
                    var a = i[e];
                    if (!a) return;
                    t("#betAreaLoading").remove();
                    t.each(i, function (t, i) {
                        if (t !== e) {
                            i.tab.removeClass("active");
                            if (i.panl[0] === a.panl[0]) i.wrap.addClass("hide");
                            else i.panl.addClass("hide")
                        }
                    });
                    a.tab.addClass("active");
                    a.panl.removeClass("hide");
                    a.wrap.removeClass("hide");
                    a.radio.length && (a.radio[0].checked = true)
                }
                t.each(["star1_fs", "star2_fs", "star2_hz", "star2_zx", "star2_zxhz", "star3_fs", "star3_z3", "star3_z6", "star3_hz", "star4_fs", "star5_fs", "star5_tx", "dxds_fs", "star3_z3dt", "star3_z6dt", "star2_zxdt", "star2_fszt", "star2_zxzt", "star3_fszt", "star3_z3zt", "star3_z6zt", "star4_fszt", "star5_fszt", "star5_txzt"], function (a, n) {
                    var o = t("#panl_" + n.replace(/zt|dt$/, "").replace("_hz", "_fs").replace("hz", "")),
                        s = t("#wrap_" + n),
                        l = o.find(".betTypeWrap [value=" + n + "]"),
                        c = r.find("[name=" + n.replace(/zt|dt$/, "").replace("_hz", "_fs").replace("hz", "") + "]");
                    e[n] = {
                        path: "js2/game/ssc/all.js",
                        wrap: s
                    };
                    i[n] = {
                        tab: c,
                        panl: o,
                        radio: l,
                        wrap: s
                    }
                });
                u = a.createCom("COMS.GP.BetArea", {
                    initGame: l.helper.gameType,
                    profitCore: function (e) {
                        return a.ssc.profitCore(c.convert2old(e))
                    },
                    checkAwardPeriod: a.ssc.checkAwardPeriod,
                    gameConfig: e,
                    tools: l.isChartPage ? {
                        omission: {
                            js: "js2/lottery/ssc/tools/omission.js"
                        },
                        chart: {
                            js: "js2/lottery/ssc/tools/chart.js"
                        }
                    } : {
                            omission: {
                                js: "js2/lottery/ssc/tools/omission.js"
                            },
                            stat: {
                                js: ["js2/underscore.js", "js2/backbone.js", "js2/game/gpc/stat.js", "js2/game/ssc/stat.js"]
                            }
                        }
                }).beforeGameChange(function (e) {
                    h(e)
                }).onGameChange(function (e) {
                    l.helper.gameType = e;
                    d.set(s + "_lastVisit", e);
                    i[e].panl[/zt|dt$/.test(e) ? "addClass" : "removeClass"]("hideStatics")
                }).onGameInitError(function (e, t) {
                    h(l.helper.gameType)
                }).setCurPeriod(l.helper.period).onConfirm(function (e) {
                    if (l.betPool && e) {
                        l.betPool[e.gameType ? "push" : "push2"](e);
                        l.scrollTo("bet")
                    }
                });
                this.betArea = u;
                t.bindMsg("periodChange", function (e, t) {
                    t && u.setCurPeriod(t)
                });
                r.delegate("li", "click", function () {
                    var e = t(this).attr("name"),
                        i = t(".betTypeWrap :checked", "#panl_" + e).val() || e;
                    u.altGame(i)
                });
                t.isIE6 && r.delegate("li", "mouseenter", function () {
                    t(this).addClass("liHover")
                }).delegate("li", "mouseleave", function () {
                    t(this).removeClass("liHover")
                });
                o.delegate(".betTypeWrap input", "click", function () {
                    u.altGame(this.value)
                });
                var f = this.sscAwardConfig || {},
                    p = t("#docBody");
                t.each(f.plan || {}, function (e, i) {
                    var a = p.find('[data-plus-game="' + e + '"]');
                    if (t.isArray(i)) {
                        if (i.length) {
                            if ("star5_tx" === e) i = [i[0] + 2 * (i[1] + i[2]), i[1] + i[2], i[2], 2 * i[2]];
                            t.each(i, function (e, t) {
                                t > 0 && a.filter('[data-index="' + e + '"]').html('+<strong class="c_ba2636">' + t + "</strong>")
                            })
                        }
                    } else if (i) a.html('+<strong class="c_ba2636">' + i + "</strong>")
                });
                t.each(f.tip || {}, function (e, t) {
                    if (t) r.find('li[name="' + e + '"]').append('<span class="tipPop"><i></i>' + t + "</span>")
                });
                delete this.initBetArea;
                return this
            },
            initAside: function () {
                if (!this.initGPAside) return;
                var e = {},
                    n = t("#awardArea"),
                    r = {
                        head: "<p>" + l + ' 第 <strong class="c_ba2636">{period}</strong> 期 {info}</p>',
                        kaijiang: '<p class="currenAward clearfix"><em class="awardBall">{0}</em><em class="awardBall">{1}</em><em class="awardBall">{2}</em><em class="awardBall">{3}</em><em class="awardBall">{4}</em></p>',
                        timer: '<p class="waitingRelease"><i></i><span name="awardTimer"></span></p>',
                        timer2: '<p>正在获取开奖号码...<span name="awardTimer"></span></p>',
                        counter: '<p>今日已售 {already} 期，还剩 <strong class="c_ba2636">{remain}</strong> 期</p>',
                        list: '<tr{id}><td>{shortPeriod}</td><td class="c_ba2636">{viewData}</td><td>{shiWei}</td><td>{geWei}</td><td class="{houSanClass}">{houSan}</td></tr>'
                    },
                    o = function (e) {
                        var t = "";
                        t += +e <= 4 ? "小" : "大";
                        t += +e % 2 === 0 ? "双" : "单";
                        return t
                    },
                    s = function (e) {
                        return ["豹子", "组三", "组六"][a.unique(e.split("")).length - 1]
                    },
                    d = function (e) {
                        var t = "";
                        switch (e) {
                            case "组三":
                                t = "c_ba2636";
                                break;
                            case "豹子":
                                t = "c_090"
                        }
                        return t
                    },
                    u = function (e) {
                        var i = e.split(" ");
                        if (5 !== i.length) return e;
                        return t.map(i, function (e, t) {
                            return "<em class='an" + (t + 1) + "'>" + +e + "</em>"
                        }).join(" ")
                    },
                    h = function (e, t) {
                        if (/^\d/.test(t)) return {
                            winningNumber: t.split("").join(" "),
                            period: e,
                            shiWei: o(t.slice(-2, -1)),
                            geWei: o(t.slice(-1)),
                            houSan: s(t.slice(-3))
                        };
                        return {
                            winningNumber: "等待开奖中",
                            period: e
                        }
                    };
                this.initGPAside({
                    updateLastAwardHtml: function (e, i, a) {
                        switch (e) {
                            case -1:
                                n.html("");
                                break;
                            case 0:
                                n.html(t.format(r.head + t.format(r.kaijiang, i.winningNumber.split(" ")) + r.counter, {
                                    period: c.convertPeriod(i.period),
                                    info: "开奖",
                                    already: i.hasPeriodNum,
                                    remain: i.remainPeriodNum
                                }));
                                break;
                            case 1:
                                n.html(t.format(r.head + r.timer, {
                                    period: c.convertPeriod(i.period),
                                    info: "等待开奖"
                                }));
                                break;
                            case 2:
                                n.html(t.format(r.head + t.format(r.kaijiang, "?????".split("")) + r.timer2, {
                                    period: c.convertPeriod(i.period),
                                    info: "开奖"
                                }))
                        }
                        t.isFunction(a) && a()
                    },
                    updateLastAwardTimer: function (e, t) {
                        var i = n.find("[name=awardTimer]");
                        var r = Math.floor(t / 6e4),
                            o = Math.floor(t % 6e4 / 1e3);
                        t > 0 && i[0] && i.html(a.fillZero(r) + ":" + a.fillZero(o))
                    },
                    getAwardListHtml: function (e) {
                        var i = e.winningNumber;
                        return t.format(r.list, {
                            shortPeriod: e.period.slice(-7),
                            viewData: {
                                1: "等待开奖中",
                                2: "开奖中.."
                            }[i] || u(i),
                            shiWei: e.shiWei || "--",
                            geWei: e.geWei || "--",
                            houSan: e.houSan || "--",
                            houSanClass: d(e.houSan),
                            id: e.id ? " id=" + e.id : ""
                        })
                    },
                    getTodayList: function () {
                        var a = {},
                            n = i.initPeriod.slice(0, -3);
                        t("#j-todayNumTable tbody td[rel]").each(function () {
                            var i = t(this),
                                r = i.attr("rel"),
                                o = i.html().replace(/[^\d ]/g, "");
                            a[r] = h(n + r, o);
                            e[r] = i
                        });
                        return a
                    },
                    setTodayList: function (t, i) {
                        if (e[t]) {
                            var a = e[t].html(i.winningNumber ? i.winningNumber.split(" ").join("") : "--")[i.winningNumber ? "addClass" : "removeClass"]("awardTd").next().html(i.shiWei || "").next().html(i.geWei || "").next().html(i.houSan || "");
                            var n = d(i.houSan);
                            if (n) a.addClass(n);
                            else a.removeClass("c_ba2636 c_090")
                        }
                    },
                    getInfoPeriod: function (e) {
                        return {
                            prefix: e.slice(0, -3),
                            day: +e.slice(-5, -3),
                            key: e.slice(-3)
                        }
                    }
                });
                var f = t("#awardTableBox"),
                    p = function (e) {
                        f.removeClass("enNum1 enNum2 enNum3 enNum4 enNum5");
                        if (/^star(\d)/i.test(e)) f.addClass("enNum" + RegExp.$1);
                        else if ("dxds_fs" === e) f.addClass("enNum2")
                    };
                i.betArea.onGameChange(p);
                p(i.helper.gameType);
                delete this.initAside;
                return this
            },
            loadLSData: function (t) {
                var i = this.initData || e.LS.get(s + "PoolCache");
                if (i) this.betPool.push2(c.parse(i));
                if (t) e.LS.remove(s + "PoolCache")
            },
            saveData2LS: function () {
                e.LS.set(s + "PoolCache", this.betPool.serialize())
            },
            initPool: function () {
                this.poolConfig = t.extend({}, c, {
                    betPage: true,
                    edit: function (a, n) {
                        var r = n.gameType,
                            o = i;
                        if (o.isChartPage && t.inArray(r, ["star2_hz", "star2_zxhz"]) !== -1) {
                            o.saveData2LS();
                            e.LS.set(s + "readyEdit", c.serialize([n]));
                            e.location.href = t(".headerBox h1 a")[0].href;
                            return
                        }
                        if (o.betArea) {
                            o.betPool.inEditDataGuid = a;
                            o.scrollTo("bet", true);
                            o.betArea.edit(r, n, function (e) {
                                delete o.betPool.inEditDataGuid;
                                if (t.isArray(e)) t.each(e, function (e, t) {
                                    o.betPool.edit(a, t)
                                });
                                else o.betPool.edit(a, e)
                            })
                        }
                    }
                });
                var n = this,
                    o = t(".betresult"),
                    l = o.find(".betNumCount"),
                    d = o.find(".betMoneyCount"),
                    u = a.createCom("COMS.GP.BetPool", this.poolConfig).onDelete(function (e) {
                        if (+e.guid === +this.inEditDataGuid) {
                            var t = e.guid;
                            r("该条投注数据正在编辑！确定删除吗？", function (i) {
                                if (i) {
                                    delete u.inEditDataGuid;
                                    n.betArea.getGameCache(e.gameType).reset();
                                    u.del(t)
                                }
                            });
                            return false
                        }
                    }).onChange(function () {
                        i.updateBetCountInfo(this)
                    }).onRandom(function () {
                        i.scrollTo("bet")
                    });
                u.resultDom = {
                    wrap: o,
                    betNum: l,
                    betMoney: d
                };
                this.initPoolCtrl(u);
                u.beiNumber = a.createCom("COMS.GP.iNumber", {
                    wrap: o.find(".beiNumWrap"),
                    min: 1,
                    max: 99999
                }).onChange(function () {
                    n.updateBetCountInfo(u)
                });
                u.beiNumber.set(+this.config.quickBetTimes || 1);
                this.betPool = u;
                delete this.initPool;
                return this
            },
            initPoolCtrl: function (e) {
                i.bindModule({
                    "loadPoolFav savePoolFav": {
                        css: "css2/lotteryBet/collect.css",
                        js: "js2/game/fav/poolFav.js"
                    }
                });
                e.autoRandom = function (t, i) {
                    e.random(a.helper.gameType.replace(/zt|dt$/, ""), t, i)
                };
                var a = this,
                    n = ".randomBtn label input",
                    s = ".randomBtn label span";
                t(c.wrap).next(".selected_btnbox").delegate(".selected_btn", "click", function () {
                    var i = t(this).attr("num"),
                        a;
                    switch (i) {
                        case "u":
                            a = +(t(this).parent().find("input").val().replace(/\D/g, "") || 5);
                            e.autoRandom(a);
                            break;
                        case "x":
                            a = e.getData().length;
                            if (a > 0) r("您确定删除所有选号？", function (t) {
                                if (t) e.clear()
                            });
                            break;
                        default:
                            a = +i.replace(/\D/g, "");
                            e.autoRandom(a)
                    }
                }).find(n).focus(function () {
                    t(this).parent().find("span").hide();
                    this.value = this.value.replace(/\D/g, "");
                    i.giveFocus(this)
                }).blur(function () {
                    var e = this.value.replace(/\D/g, "");
                    if (!e) t(this).parent().find("span").show();
                    else this.value = e + "注"
                }).keyup(function () {
                    var e = this.value.replace(/\D/g, ""),
                        t;
                    if (e !== this.value) this.value = e;
                    if (e) {
                        t = +e < 1 ? 1 : +e > 99 ? 99 : +e;
                        if (t + "" !== this.value) this.value = t
                    }
                }).end().delegate(s, "click", function () {
                    t(this).parent().find("input").focus()
                }).delegate(".storeUpBtn", "click", function () {
                    var e = c.serialize(i.betPool.getData()).replace(/t[^\,]+/g, "");
                    i.savePoolFav(o, e, i.numberHelper, l, i.convertOldData)
                }).delegate(".exportBtn", "click", function () {
                    i.loadPoolFav(o, i.numberHelper, function (e) {
                        i.betPool.push2(c.parse(e))
                    }, i.convertOldData)
                });
                t(n)[0].value = "";
                delete this.initPoolCtrl;
                return this
            },
            convertOldData: function (e) {
                t.each(e, function (e, t) {
                    t.no = t.no.replace(/#[^!]+#([\w_\d]+)#[^!]+\d/g, function (e, t) {
                        return "#" + t.replace(/star(\d)_(.*)$/, function (e, t, i) {
                            return "STAR_" + t + "#" + {
                                fs: "SINGLE",
                                hz: "HEZHI",
                                zx: "ZUXUAN_FU",
                                z3: "ZUSAN_FU",
                                z6: "ZULIU_FU",
                                tx: "TONGXUAN",
                                zxfw: "ZUXUAN_FENWEI",
                                zxhz: "BAODIAN"
                            }[i]
                        }).replace("dxds_fs", "DAXIAO_DANSHUANG#SINGLE").replace(/ren(\d)_fs/, function (e, t) {
                            return "REN_XUAN#SSC_REN_" + t
                        })
                    }).toUpperCase()
                });
                return e
            },
            numberHelper: function (e) {
                var i = c.parse(e),
                    a = [0, 0];
                t.each(i, function (e, t) {
                    var i = c.counter(t);
                    a[0] += i[0];
                    a[1] += i[1]
                });
                return a
            },
            initBuyTab: function () {
                var e = t("#moreOperateBox"),
                    a = e.find(".tips"),
                    n = t(".moreOperate_con>div"),
                    r = this,
                    o = t(".betresult"),
                    s = function (s) {
                        var l = r.helper.buyType,
                            d = e.find("dd[rel='" + l + "']"),
                            u = t("#" + d.attr("pnl")),
                            h = d.attr("info");
                        d.find("[name=operate]")[0].checked = true;
                        n.addClass("hide");
                        u.removeClass("hide");
                        a.html(h);
                        switch (l) {
                            case 1:
                                r.updateBetCountInfo();
                                break;
                            case 2:
                            case 2.1:
                                c.loadHtmlAndInit(u, r.config.zhuihaoAjax, function () {
                                    r.loadCdnJS("js2/game/ssc/zh.js")
                                }, r.updateBetCountInfo);
                                s || r.scrollTo("pool");
                                if (i.mulitiBuy) {
                                    i.mulitiBuy.setBaseMoney(i.betPool.getCount()[1]);
                                    i.mulitiBuy.changeMode(2 === l ? 1 : 2)
                                }
                                break;
                            case 3:
                                c.loadHtmlAndInit(u, r.config.hemaiAjax, function () {
                                    r.loadCdnJS("js2/game/ssc/hm.js")
                                }, r.updateBetCountInfo);
                                s || r.scrollTo("pool")
                        }
                        o[0].className = "betresult buyType" + (2.1 == l ? 2 : l);
                        r.betPool.onChange()
                    },
                    l = function () {
                        var t = e.find("[name=operate]:checked").closest("dd").attr("rel");
                        return r.helper.buyType = +t
                    };
                e.delegate("dd", "click", function (e) {
                    var i = t(this).attr("rel") || "";
                    if (i) r.helper.setBuyType(+i)
                });
                this.helper.syncBuyType = s;
                this.helper.readBuyType = l;
                this.helper.setBuyType = function (e, t) {
                    this.buyType = +(e || 1);
                    this.syncBuyType(t)
                };
                s();
                t("#zhuihaoTab").find("label").removeClass("jtip").end().find("i").remove();
                delete this.initMainTab;
                return this
            },
            updateBetCountInfo: function (e) {
                var t = e || this.betPool,
                    i = t.resultDom,
                    n = t.getCount(),
                    r, o, s = this.helper.buyType;
                switch (s) {
                    case 1:
                        r = t.beiNumber.get();
                        o = 1;
                        break;
                    case 2:
                    case 2.1:
                        r = 1;
                        o = 1;
                        break;
                    case 3:
                        r = t.beiNumber.get();
                        o = 1
                }
                i.betNum.html(n[0]);
                i.betMoney.html(a.getMoneyText(n[1] * r * o))
            },
            buyButtonInit: function () {
                var e = t("#normalBtnBox"),
                    a = t("#groupbuyEndBtnBox"),
                    n = t("#waitBtnBox"),
                    r = t(".betBtns>span"),
                    o = function (t) {
                        var i = {
                            1: e,
                            2: a,
                            3: n
                        }[t];
                        if (i) {
                            r.addClass("hide");
                            i.removeClass("hide")
                        }
                    };
                this.loadCdnJS("js2/game/gpc/pay.js", function () {
                    e.find(".betting_Btn").click(i.buyButtonClick)
                });
                this.Timers.bet.onStop(function () {
                    o(3)
                }).onStart(function () {
                    o(1)
                });
                this.changeBtnBox = o;
                delete this.buyButtonInit;
                return this
            }
        })
    }(window, jQuery, window.Core, window.Game);
!
    function (e, t, a, s) {
        "use strict";
        var i = s.config.gameEn,
            n = s.ssc.core,
            r = s.alert,
            c = s.confirm;
        function l(e, t) {
            return e - t
        }
        function h(e) {
            var t = [];
            for (var a = 0; a < e.length; a++) for (var s = 0; s < e.length; s++) if (s !== a) t.push([e[a], e[a], e[s]].sort());
            return t.sort()
        }
        function o(e) {
            var t = 0;
            for (var a = 0; a < e; ++a) t += Math.floor(10 * Math.random());
            return t
        }
        function f() {
            return Math.random() > .5 ? -1 : 1
        }
        function u(e, a) {
            var s = true;
            t.each(e,
                function (e, t) {
                    if (!a.test(t)) {
                        s = false;
                        return false
                    }
                });
            return s
        }
        function m(e) {
            return t.map(e,
                function (e) {
                    return parseInt(e, 10)
                })
        }
        var d = {
            config: {
                wrap: "",
                frame: null,
                needRandomAnimation: false,
                activeClassName: "active"
            },
            init: function (e) {
                this.config = t.extend({},
                    this.config, e);
                var a = t(this.config.wrap);
                this.cache = {
                    $wrap: a,
                    wrap: a
                };
                this.frame = this.config.frame;
                this.activeClassName = this.config.activeClassName;
                this.changeGameType(this.gameType);
                this._bindEvents()
            },
            random: function (e, a) {
                var i, n, r = this.activeClassName,
                    c = this.cache.dom_balls,
                    l, h = !isNaN(parseInt(e, 10));
                if (/dt$/.test(this.gameType)) i = c[1];
                else if (t.isArray(c)) i = c[+ a];
                else i = c;
                if (/dt$/.test(this.gameType)) {
                    var f = c[0].filter("." + r);
                    i = i.filter(function () {
                        return 0 === f.filter('[data-value="' + t(this).attr("data-value") + '"]').length
                    })
                }
                if (h) {
                    l = i.filter("." + r).length;
                    if (/hz/.test(this.gameType)) {
                        var u = /star3/.test(this.gameType) ? 3 : 2,
                            m = +e > l ? +e - l : +e,
                            d,
                            g;
                        if (+ e <= l) i.removeClass(r);
                        for (var p = 0; p < m;) {
                            d = o(u);
                            g = i.filter('[data-value="' + d + '"]');
                            if (!g.hasClass(r)) {
                                g.addClass(r);
                                p++
                            }
                        }
                    } else {
                        var v = i[+ e > l ? "filter" : "removeClass"](+ e > l ? ":not(." + r + ")" : r);
                        v = t(s.random(v.toArray(), Math.min(v.length, +e > l ? +e - l : +e)));
                        v.addClass(r)
                    }
                } else {
                    i.removeClass(r);
                    if ("全" === e) i.addClass(r);
                    else {
                        switch (e) {
                            case "大":
                                n = [5, 6, 7, 8, 9];
                                break;
                            case "小":
                                n = [0, 1, 2, 3, 4];
                                break;
                            case "奇":
                                n = [1, 3, 5, 7, 9];
                                break;
                            case "偶":
                                n = [0, 2, 4, 6, 8]
                        }
                        t.each(n,
                            function (e, t) {
                                i.filter('[data-value="' + +t + '"]').addClass(r)
                            })
                    }
                }
                this._updateInfo()
            },
            xtSelect: function (e, a) {
                var s = t.isArray(this.cache.dom_balls) ? this.cache.dom_balls[a || 0] : this.cache.dom_balls,
                    i = this.activeClassName,
                    n = s.filter("." + i).map(function () {
                        return + t(this).attr("data-value")
                    }).toArray().join(","),
                    r = {
                        "大": [5, 6, 7, 8, 9],
                        "小": [0, 1, 2, 3, 4],
                        "奇": [1, 3, 5, 7, 9],
                        "偶": [0, 2, 4, 6, 8],
                        "大奇": [5, 7, 9],
                        "大偶": [6, 8],
                        "小奇": [1, 3],
                        "小偶": [0, 2, 4]
                    },
                    c = "",
                    l;
                t.each(r,
                    function (e, t) {
                        if (n === t.join(",")) c = e
                    });
                l = r[e + c] || r[c + e] || r[e];
                s.removeClass(i);
                t.each(l,
                    function (e, t) {
                        s.filter('[data-value="' + t + '"]').addClass(i)
                    });
                this._updateInfo()
            },
            getActiveBall: function (e) {
                var a = t.isArray(this.cache.dom_balls) ? this.cache.dom_balls[e || 0] : this.cache.dom_balls;
                return this._getActiveBall(a)
            },
            _getActiveBall: function (e) {
                return e.filter("." + this.activeClassName).map(function () {
                    return + t(this).attr("data-value")
                }).toArray().sort(function (e, t) {
                    return e - t
                })
            },
            get: function () {
                var e = [],
                    a = this.gameType.replace("dt", ""),
                    i = this,
                    n;
                if (t.isArray(this.cache.dom_balls)) t.each(this.cache.dom_balls,
                    function (t, a) {
                        e.push(i._getActiveBall(a))
                    });
                else e = this._getActiveBall(this.cache.dom_balls);
                if ("star1_fs" === a) e = [e];
                if ("star3_z3" === this.gameType) {
                    n = t.map(h(e),
                        function (e) {
                            return {
                                gameType: a,
                                no: e
                            }
                        });
                    n = n.length ? n : [{
                        gameType: a,
                        no: e
                    }];
                    return n
                } else if (/dt$/.test(this.gameType)) {
                    var r = "star3_z6" === a ? 3 : 2,
                        c = [];
                    if (e[0].length && e[1].length) {
                        n = t.map(s.CR(e[1], r - e[0].length),
                            function (t) {
                                c.push(e[0].concat(t));
                                return {
                                    gameType: a,
                                    no: e[0].concat(t).sort(l)
                                }
                            });
                        if ("star3_z3" === a) {
                            n = t.map(c,
                                function (e) {
                                    return t.map(h(e),
                                        function (e) {
                                            return {
                                                gameType: a,
                                                no: e.sort(l)
                                            }
                                        })
                                });
                            n = n.length ? n : [{
                                gameType: a,
                                no: []
                            }]
                        }
                        if (!n.length) n = [{
                            gameType: a,
                            no: e.sort(l)
                        }];
                        return n
                    } else return [{
                        gameType: a,
                        no: []
                    }]
                } else return [{
                    gameType: a,
                    no: e
                }]
            },
            push: function (e, t) {
                this._change(e.no, "addClass", t)
            },
            pull: function (e, t) {
                this._change(e.no, "removeClass", t)
            },
            set: function (e) {
                this.clear();
                this.push(e)
            },
            toggle: function (e, t) {
                this._change(e, "toggleClass", t)
            },
            _change: function (e, a, s) {
                var i = "undefined" !== typeof s && t.isArray(this.cache.dom_balls) ? this.cache.dom_balls[s] : this.cache.dom_balls,
                    n = this.activeClassName;
                if (t.isArray(i)) t.each(i,
                    function (s, i) {
                        t.each(e[s],
                            function (e, t) {
                                i.filter('[data-value="' + t + '"]')[a](n)
                            })
                    });
                else t.each(e,
                    function (e, t) {
                        i.filter('[data-value="' + t + '"]')[a](n)
                    });
                this._updateInfo()
            },
            clear: function (e) {
                var a = this.activeClassName;
                if (t.isArray(this.cache.dom_balls)) if ("undefined" !== typeof e) this.cache.dom_balls[e].removeClass(a);
                else t.each(this.cache.dom_balls,
                    function (e, t) {
                        t.removeClass(a)
                    });
                else this.cache.dom_balls.removeClass(a);
                this._updateInfo()
            },
            counter: function (e) {
                return n.counter(e)
            },
            bonus: function () {
                return n.bonus(this.get())
            },
            _getGameBalls: function (e) {
                var a, s, i;
                i = this.gameBallHash = this.gameBallHash || {};
                if (!i[e]) {
                    a = this.cache.$wrap;
                    s = a.find(".js_balls");
                    if (s.length < 2) i[e] = 1 === s.length ? s.find(".js_ball") : a.find(".js_ball");
                    else {
                        i[e] = [];
                        s.each(function () {
                            i[e].push(t(this).find(".js_ball"))
                        })
                    }
                }
                return i[e]
            },
            changeGameType: function (e) {
                this.frame.callEvent("beforeGameChange", this.gameType);
                this.gameType = e;
                this.cache.$countBox = this.cache.$wrap.find(".selectInfo span");
                this.cache.betButton = this.cache.$betButton = this.cache.$wrap.find(".betbtn");
                this.cache.dom_balls = this._getGameBalls(e);
                this.frame.callEvent("onGameChange", e)
            },
            reset: function () {
                this.cache.$betButton.parent().removeClass("revisebtnBox");
                if (this._editCallback) delete this._editCallback;
                this.clear()
            },
            edit: function (e, t) {
                if (e.gameType !== this.gameType) this.changeGameType(e.gameType);
                this.set(e);
                this.cache.$betButton.parent().addClass("revisebtnBox");
                this._editCallback = t
            },
            _betSuccess: function (e) {
                var a, s = this.cache.$betButton,
                    i = this._editCallback;
                if (!!i) {
                    delete this._editCallback;
                    a = i.call(this, t.isArray(e) ? e : [e]);
                    s.parent().removeClass("revisebtnBox")
                } else a = this.frame.callEvent("onConfirm", e);
                if (false === a) return;
                this.reset()
            },
            bet: function () {
                var e = this,
                    t = this.cache.$betButton,
                    a = e.get(),
                    s = !!this._editCallback;
                function i(t) {
                    if (t) {
                        var a = n.random(e.gameType, "", 1);
                        e._betSuccess(a)
                    }
                }
                if (t.hasClass("disabled")) {
                    var l = n.getLackError(a);
                    if ("miss" === l.type) c("至少选择1注号码才能" + (s ? "编辑" : "投注") + "，是否机选1注碰碰运气？", i);
                    else r(l.message);
                    return
                }
                this._betSuccess(a)
            },
            _updateInfo: function () {
                var t = this;
                this._updateInfoTimeout && e.clearTimeout(this._updateInfoTimeout);
                this._updateInfoTimeout = setTimeout(function () {
                    var e = t.get(),
                        a = n.counter(e),
                        s,
                        i = "您选中了<strong class='c_ba2636'>" + a[0] + "</strong>注，共<strong class='c_ba2636'>" + a[1] + "</strong>元</span>";
                    if (a[0] > 0) {
                        s = t.frame.calProfit(e);
                        i += n.getProfitHtml(s, [s[0] - a[1], s[1] - a[1]])
                    }
                    t.cache.$countBox.html(i);
                    t.cache.$betButton[a[0] > 0 ? "removeClass" : "addClass"]("disabled");
                    t.frame.callEvent("onBallChange", t.gameType)
                },
                    10)
            },
            _activeBall: function (e) {
                t(e.target).toggleClass(this.activeClassName);
                this._updateInfo()
            },
            _bindEvents: function () {
                var e = this,
                    a = /dt$/.test(this.gameType);
                this.cache.$wrap.delegate(".js_ball", "click", t.proxy(this._activeBall, this)).delegate('[data-action="clear"]', "click",
                    function () {
                        var s = a ? 1 : t(this).attr("data-index");
                        e.clear(s)
                    }).delegate('[data-action="random"]', "click",
                    function () {
                        e.random(t(this).siblings(".randomNum").val(), t(this).attr("data-index"))
                    }).delegate('[data-action="whole"]', "click",
                    function () {
                        e.random("全", t(this).attr("data-index"))
                    }).delegate(".betbtn", "click", t.proxy(this.bet, this)).delegate('[data-action="xtSelect"]', "click",
                    function () {
                        var a = t(this);
                        e.xtSelect(a.attr("data-xt"), a.attr("data-index"))
                    }).find(".randomNum").change(function () {
                        e.random(t(this).val(), t(this).attr("data-index"))
                    })
            }
        };
        t.each(n.gameNameMap,
            function (e) {
                if ("dxds_fs" === e) return;
                s.regBaseCom2Lib("COMS.GP.BetArea." + e.toUpperCase(), "", t.extend({},
                    d, {
                        gameType: e
                    }))
            });
        var g = t.extend({},
            d, {
                bet: function () {
                    var e = this,
                        t = this.cache.$betButton,
                        a = this.cache.dom_balls,
                        s = e.get(),
                        i = s[0],
                        l = this._editCallback,
                        h = !!l,
                        o = this.gameType.replace(/dt$/, ""),
                        f = {
                            star3_z3: 2,
                            star3_z6: 3,
                            star2_zx: 2
                        }[o];
                    function u(t) {
                        if (t) {
                            var a = n.random(e.gameType.replace("dt", ""), "", 1);
                            e._betSuccess(a)
                        }
                    }
                    if (t.hasClass("disabled")) {
                        if (!i || i.no[0].length + i.no[1].length === 0) c("至少选择1注号码才能" + (h ? "编辑" : "投注") + "，是否机选1注碰碰运气？", u);
                        else {
                            var m = a[0].filter("." + this.activeClassName).length,
                                d = a[1].filter("." + this.activeClassName).length;
                            if (m * d === 0) r("请至少选择 1 个" + (m ? "拖" : "胆") + "码。");
                            else r(n.gameNameMap[o] + " 胆码加拖码至少要选择 " + f + " 个号码。")
                        }
                        return
                    }
                    if (i.no[0].length + i.no[1].length === f) c("胆拖玩法必须选择 1 注以上，<br/>您只选择了1注，是否将这注转成单式？",
                        function (t) {
                            if (t) {
                                var a = {
                                    gameType: o,
                                    no: i.no[0].concat(i.no[1]).sort(function (e, t) {
                                        return e - t
                                    })
                                };
                                e._betSuccess(a)
                            }
                        });
                    else e._betSuccess(s)
                },
                _activeBall: function (e) {
                    var a = t(e.target),
                        s = this.activeClassName,
                        i = this.cache.dom_balls,
                        c = /star3\_z6/.test(this.gameType) ? 2 : 1;
                    if (!a.is("." + s)) if (i[0].index(a) !== -1) if (i[0].filter("." + s).length >= c) {
                        r(n.gameNameMap[this.gameType.replace("dt", "")] + " 最多只能选 " + c + " 个胆码");
                        return
                    } else i[1].filter('[data-value="' + a.attr("data-value") + '"]').removeClass(s);
                    else i[0].filter('[data-value="' + a.attr("data-value") + '"]').removeClass(s);
                    a.toggleClass(s);
                    this._updateInfo()
                }
            });
        t.each(["star3_z3dt", "star3_z6dt", "star2_zxdt"],
            function (e, a) {
                s.regBaseCom2Lib("COMS.GP.BetArea." + a.toUpperCase(), "", t.extend({},
                    g, {
                        gameType: a
                    }))
            });
        var p = t.extend({},
            d, {
                config: {
                    wrap: "",
                    frame: null,
                    needRandomAnimation: false,
                    activeClassName: "assistBtn_active"
                },
                gameType: "dxds_fs",
                getActiveBall: function (e) {
                    return [this.cache.dom_balls[e].filter("." + this.activeClassName).attr("data-value")]
                },
                get: function () {
                    return [{
                        gameType: this.gameType,
                        no: [this.cache.dom_balls[0].filter("." + this.activeClassName).attr("data-value"), this.cache.dom_balls[1].filter("." + this.activeClassName).attr("data-value")]
                    }]
                },
                _change: function (e, a, s) {
                    if ("undefined" !== typeof s) {
                        e = t.isArray(e) ? e.length > 1 ? e[s] : e[0] : e;
                        this.cache.dom_balls[s].removeClass(this.activeClassName).filter('[data-value="' + e + '"]').addClass(this.activeClassName)
                    } else {
                        this._change(e[0], a, 0);
                        this._change(e[1], a, 1)
                    }
                    this._updateInfo()
                },
                _activeBall: function (e) {
                    var a = t(e.currentTarget),
                        s = this.activeClassName;
                    if (!a.is("." + s)) {
                        var i = this.cache.dom_balls[0].index(a) !== -1 ? 0 : 1;
                        this.cache.dom_balls[i].removeClass(s)
                    }
                    a.toggleClass(s);
                    this._updateInfo()
                }
            });
        s.regBaseCom2Lib("COMS.GP.BetArea.DXDS_FS", "", p);
        var v = t.extend({},
            d, {
                parse: function (e, t) {
                    var a = [];
                    switch (this.gameKind) {
                        case "star2_fs":
                        case "star3_fs":
                        case "star4_fs":
                        case "star5_fs":
                        case "star5_tx":
                            a = this.weiParse(e, t);
                            break;
                        default:
                            a = this.normalParse(e, t)
                    }
                    return a
                },
                normalParse: function (e, a) {
                    var i = {
                        star2_hz: {
                            minLength: 1,
                            maxLength: 19,
                            range: [0, 18]
                        },
                        star2_zx: {
                            minLength: 2,
                            maxLength: 7,
                            range: [0, 9]
                        },
                        star3_z3: {
                            minLength: 2,
                            maxLength: 10,
                            range: [0, 9]
                        },
                        star3_z6: {
                            minLength: 3,
                            maxLength: 10,
                            range: [0, 9]
                        },
                        star3_hz: {
                            minLength: 1,
                            maxLength: 28,
                            range: [0, 27]
                        }
                    }[this.gameKind],
                        n,
                        r = new RegExp("^\\s*(?:(?:0*[" + i.range.join("-") + "])\\s+){" + (i.minLength - 1) + "," + (i.maxLength - 1) + "}(?:0*[" + i.range.join("-") + "])\\s*$"),
                        c = this.gameKind;
                    n = t.map(e,
                        function (e, i) {
                            e = e.trim();
                            if (!e) return;
                            if (r.test(e)) {
                                var n = m(e.split(" "));
                                if (n.length === s.unique(n).length) return "star3_z3" === c ? t.map(h(n),
                                    function (e) {
                                        return {
                                            gameType: c,
                                            no: e.sort(l)
                                        }
                                    }) : {
                                        gameType: c,
                                        no: n.sort(l)
                                    }
                            }
                            a.push({
                                line: i + 1,
                                text: e
                            })
                        });
                    return n
                },
                weiParse: function (e, a) {
                    var i, n = {
                        star2_fs: 2,
                        star3_fs: 3,
                        star4_fs: 4,
                        star5_fs: 5,
                        star5_tx: 5
                    }[this.gameKind],
                        r = /^\s*(?:(?:0*[0-9])\s+){0,9}(?:0*[0-9])\s*$/,
                        c = this.gameKind;
                    i = t.map(e,
                        function (e, i) {
                            var h = e.split("|"),
                                o = false,
                                f = [];
                            if (!e.trim()) return;
                            if (u(h, r) && h.length === n) {
                                t.each(h,
                                    function (e, t) {
                                        t = m(t.trim().split(" "));
                                        if (t.length > s.unique(t).length) {
                                            o = true;
                                            return false
                                        } else f.push(t.sort(l))
                                    });
                                if (!o) return {
                                    gameType: c,
                                    no: f
                                }
                            }
                            a.push({
                                line: i + 1,
                                text: e
                            })
                        });
                    return i
                },
                get: function () {
                    var e = this,
                        t = e.cache,
                        a = t.$area.val(),
                        s = {
                            "０": "0",
                            "１": 1,
                            "２": 2,
                            "３": 3,
                            "４": 4,
                            "５": 5,
                            "６": 6,
                            "７": 7,
                            "８": 8,
                            "９": 9,
                            "　": " "
                        },
                        i = [],
                        n,
                        r = a.replace(/[０１２３４５６７８９　]/g,
                            function (e) {
                                return s[e] || e
                            }).replace(/\r/g, "").replace(/[\f\r\t\v ]{2,}/g, " ").split("\n");
                    if (!this.reg) this.reg = new RegExp("^\\s*(?:(?:0*[1-9]|10|11)\\s+){" + (this.rxNum - 1) + ",10}(?:0*[1-9]|10|11)\\s*$", "i");
                    if (!a.trim().length) return [];
                    n = this.parse(r, i);
                    if (i.length) {
                        n.errInfo = i;
                        n.length = 0
                    }
                    return n
                },
                clear: function () {
                    this.cache.$area.val("");
                    this.cache.$errBox.html("");
                    this._updateInfo();
                    this.callEvent("onClear");
                    this.callEvent("onChange", "clear")
                },
                changeGameType: function (e) {
                    this.frame.callEvent("beforeGameChange", this.gameType);
                    this.gameType = e;
                    this.gameKind = e.replace(/zt$/, "");
                    this.cache.$countBox = this.cache.$wrap.find(".selectInfo span");
                    this.cache.betButton = this.cache.$betButton = this.cache.$wrap.find(".betbtn");
                    this.cache.$errBox = this.cache.$wrap.find(".zhantie_err");
                    this.cache.$area = this.cache.$wrap.find("textarea");
                    this.frame.callEvent("onGameChange", e)
                },
                bet: function () {
                    var e = this,
                        a = this.cache.$betButton,
                        s = e.get();
                    if (a.hasClass("disabled")) {
                        if (!s.errInfo) {
                            r("请先粘贴号码。");
                            return
                        }
                        var i = s.errInfo,
                            n = ["共有" + i.length + "行错误！"],
                            c = this.cache.$errBox;
                        t.each(i,
                            function (e, a) {
                                n.push("第" + a.line + "行 " + t.safeHTML(a.text))
                            });
                        c.html(n.join("<br/>"));
                        return
                    }
                    this._betSuccess(s)
                },
                _bindEvents: function () {
                    var a = this,
                        s;
                    this.cache.$area.bind("keyup blur",
                        function () {
                            s && e.clearTimeout(s);
                            s = e.setTimeout(function () {
                                a.cache.$errBox.html("");
                                a._updateInfo()
                            },
                                50)
                        });
                    this.cache.$betButton.click(t.proxy(this.bet, this))
                }
            });
        t.each(["star2_fszt", "star2_zxzt", "star3_fszt", "star3_z3zt", "star3_z6zt", "star4_fszt", "star5_fszt", "star5_txzt"],
            function (e, a) {
                s.regBaseCom2Lib("COMS.GP.BetArea." + a.toUpperCase(), "", t.extend({},
                    v, {
                        gameType: a
                    }))
            })
    }(window, window.jQuery, window.Core, window.Game);
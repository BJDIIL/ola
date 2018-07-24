!
    function (t, a, e, i, n) {
        "use strict";
        var r = {
            dxds_fs: ["dxdsforth", "dxdsfifth"],
            star2_hz: ["star2hezhi"],
            star2_zx: ["renhou2"],
            star2_zxhz: ["star2hezhi"],
            star3_hz: ["star3hezhi"],
            star3_z3: ["renhou3"],
            star3_z6: ["renhou3"],
            star1_fs: ["fifth"],
            star2_fs: ["forth", "fifth"],
            star3_fs: ["third", "forth", "fifth"],
            star4_fs: ["second", "third", "forth", "fifth"],
            star5_fs: ["first", "second", "third", "forth", "fifth"],
            star5_tx: ["first", "second", "third", "forth", "fifth"],
            ren1_fs: ["first", "second", "third", "forth", "fifth"],
            ren2_fs: ["first", "second", "third", "forth", "fifth"]
        };
        i.regBaseCom2Lib("COMS.GP.BetArea.OMISSION", "onDataReload onDataChange onDataInvalid onDataError onDataFail", {
            config: {
                period: "",
                ajax: "http://caipiao.163.com/missingnumber/getCompleteMissNumList.html?game=" + i.config.gameEn,
                interval: 2,
                maxTry: 15,
                dataAdapter: o
            },
            init: function (t) {
                var n = this,
                    r = n.config = a.extend(true, {},
                        n.config, t || {});
                if (!r.ajax || !a.isFunction(r.dataAdapter) || !t.frame || !i.config.gameEn) {
                    e.log("遗漏组件缺少设置参数或参数错误！");
                    return
                }
                n.cache = null;
                n.frame = n.config.frame;
                c(n)
            },
            get: function () {
                return this.cache
            },
            periodChange: function (t) {
                if (this.config.period === t) return;
                this.config.period = t;
                this.cache = null;
                this.callEvent("onDataInvalid")
            },
            reload: function (t, e) {
                var n = this.config;
                this.callEvent("onDataReload");
                this.taskId && i.clearTask(this.taskId);
                this.taskId = i.setTask(a.proxy(s, this), t || n.interval, e || n.maxTry)
            },
            update: function () { },
            destroy: function () { }
        });
        function s(t, a, i) {
            var n = this,
                r = n.config;
            e.get(r.ajax,
                function (e, s) {
                    var o;
                    if (!e && s) {
                        o = r.dataAdapter(s);
                        if (o) {
                            n.cache = o;
                            t(true);
                            n.callEvent("onDataChange")
                        }
                        if (false === o) {
                            t(true);
                            n.callEvent("onDataError");
                            return
                        }
                    }
                    t(false);
                    if (i && i === a) n.callEvent(null === o ? "onDataFail" : "onDataError")
                })
        }
        function o(t) {
            var a = e.parseJSON(t);
            if (a.successful && a.missNumberList) return a.missNumberList;
            if (a.errorCode) return false
        }
        var c = function (i) {
            var n = i.frame;
            e.Timers.award.getAwardInfo(function (a) {
                if (0 !== a.status) t.setTimeout(function () {
                    n.eachGame(function (t) {
                        h(i, t, "wait")
                    })
                },
                    0);
                else if (e.lastPeriodAwardInfo) i.reload()
            });
            i.onDataInvalid(function () {
                n.eachGame(function (t) {
                    h(i, t, "wait")
                })
            }).onDataReload(function () {
                n.eachGame(function (t) {
                    h(i, t, "loading")
                })
            }).onDataFail(function () {
                n.eachGame(function (t) {
                    h(i, t, "fail")
                })
            }).onDataError(function () {
                i.cache = 0;
                n.eachGame(function (t) {
                    h(i, t, "error")
                })
            }).onDataChange(function () {
                n.eachGame(function (t) {
                    h(i, t, "update")
                })
            });
            a("#mainPanels").delegate("[data-action=reloadOmission]", "click",
                function () {
                    i.callEvent("onDataInvalid");
                    i.reload()
                }).delegate("[data-miss-chk]", "click",
                function () {
                    var e = [];
                    a(this).closest(".OptimizeSelectBox").find("[data-miss-chk]").each(function () {
                        var t = a(this).attr("data-miss-chk");
                        this.checked && e.push(t)
                    });
                    t.LS.set(f, e.length ? e.join(",") : "-");
                    h(i, i.frame.cache.currentGameType, "check")
                });
            a.bindMsg("periodDataHere",
                function () {
                    i.reload()
                });
            var r = function (t) {
                h(i, t, i.lastAction || "update");
                h(i, t, "check", true);
                if (0 === i.cache) h(i, t, "error")
            };
            n.eachGame(r).onGameInit(r).onGameChange(function (t) {
                h(i, t, "check", true)
            })
        },
            f = i.config.gameEn + "_omission",
            h = function (i, n, s, o) {
                var c = i.cache,
                    h = i.frame.wrap,
                    u = i.frame.getGameCache(n);
                if (!u || /zt$/.test(n)) return;
                var m = d(i, n, u),
                    g,
                    p = i.frame.cache.currentGameType === n,
                    v = p && !o;
                if ("check" !== s) i.lastAction = s;
                switch (s) {
                    case "loading":
                    case "error":
                    case "wait":
                    case "fail":
                        m.boxs.find("ul").empty();
                        m.loading.removeClass("hide").find("span").html({
                            loading:
                            "正在更新数据...",
                            error: "数据获取失败，<a href='javascript:;' data-action='reloadOmission'>点击重新获取</a>",
                            wait: "等待更新数据",
                            fail: "等待更新数据..."
                        }[s]).end().find("img")["loading" === s ? "show" : "hide"]();
                        if (a.isIE6) m.loading.height(m.boxs.outerHeight());
                        break;
                    case "update":
                        if (!c) return;
                        m.loading.addClass("hide");
                        var x = /dt$/.test(n),
                            z = /hz$/.test(n);
                        if (e.isChartPage && "dxds_fs" === n) {
                            l(a(".Optimize", m.boxs), c[r.dxds_fs[0]], null, false);
                            l(a(".Optimize", m.boxs), c[r.dxds_fs[1]], null, true)
                        } else a.each(r[n.replace(/dt$/, "")],
                            function (t, e) {
                                if (z) m.boxs.each(function (t) {
                                    l(a(".Optimize", this), c[e], [10 * t, 10 * (t + 1)])
                                });
                                else {
                                    l(a(".Optimize", m.boxs.eq(t)), c[e]);
                                    if (x) l(a(".Optimize", m.boxs.eq(1)), c[e])
                                }
                            });
                        break;
                    case "check":
                        g = "," + (t.LS.get(f) || "curr") + ",";
                        m.loading[",-," === g ? "addClass" : "removeClass"]("hide2");
                        m.selBox.find("input").each(function () {
                            var t = "," + a(this).attr("data-miss-chk") + ",";
                            this.checked = g.indexOf(t) >= 0
                        });
                        m.rows.each(function () {
                            var t = "," + a(this).attr("data-miss-type") + ",",
                                e = g.indexOf(t) >= 0;
                            if (v) a(this).stop(true, true)[e ? "slideDown" : "slideUp"]("fast",
                                function () {
                                    a(this).removeAttr("style")[e ? "removeClass" : "addClass"]("hide")
                                });
                            else a(this).stop(true, true)[e ? "removeClass" : "addClass"]("hide")
                        });
                        if (a.isIE6 && v) t.setTimeout(function () {
                            m.loading.height(m.boxs.outerHeight())
                        },
                            200);
                        else if (a.isIE6) m.loading.height(m.boxs.outerHeight())
                }
            },
            d = function (t, e, i) {
                t.doms = t.doms || {};
                var n = t.doms[e],
                    r = i.cache.wrap;
                if (!n) t.doms[e] = {
                    boxs: a(".OptimizeBox", r),
                    rows: a(".OptimizeBox .Optimize", r),
                    loading: a(".OptimizeLoading", r),
                    selBox: a(".OptimizeSelectBox", r)
                };
                return t.doms[e]
            },
            l = function (t, e, i, n) {
                var r = {
                    120: 0,
                    curr: 1,
                    max: 2,
                    prev: 3
                };
                t.each(function () {
                    var t = a(this).attr("data-miss-type"),
                        s = r[t],
                        o = e[s],
                        c = a("ul", this),
                        f;
                    if (i) o = Array.prototype.slice.apply(o, i);
                    f = u(o, "120" === t);
                    if (n) c.append("<li></li>").append(f);
                    else c.html(f)
                })
            },
            u = function (t, e) {
                var i = t.concat([]).sort(function (t, a) {
                    return a - t
                }),
                    n = i[0],
                    r = i[i.length - 1],
                    s = [];
                a.each(t,
                    function (t, a) {
                        var i = a === n ? ' class="c_ba2636"' : a === r && e ? ' class="c_1e50a2"' : "";
                        s[t] = "<li" + i + ">" + a + "</li>"
                    });
                return s.join("")
            }
    }(window, jQuery, window.Core, window.Game);
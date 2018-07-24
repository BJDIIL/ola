!
    function (e, t, s, i, n) {
        "use strict";
        var a = {
            dxds_fs: ["十位", "个位"],
            star2_fs: ["十位", "个位"],
            star3_fs: ["百位", "十位", "个位"],
            star4_fs: ["千位", "百位", "十位", "个位"],
            star5_fs: ["万位", "千位", "百位", "十位", "个位"],
            star5_tx: ["万位", "千位", "百位", "十位", "个位"],
            ren1_fs: ["万位", "千位", "百位", "十位", "个位"],
            ren2_fs: ["万位", "千位", "百位", "十位", "个位"]
        },
            r = t.config.gameEn,
            o = t.ssc.core;
        function u(e, t) {
            if (a[e]) {
                t = t || a[e][0];
                if ("dxds_fs" === e) return ["dxdsforth", "dxdsfifth"][n.indexOf(["十位", "个位"], t)];
                else return ["first", "second", "third", "forth", "fifth"][n.indexOf(["万位", "千位", "百位", "十位", "个位"], t)]
            } else {
                var s;
                switch (e) {
                    case "star1_fs":
                        s = "fifth";
                        break;
                    case "star3_z3":
                    case "star3_z6":
                        s = "renhou3";
                        break;
                    case "star2_zx":
                        s = "renhou2";
                        break;
                    case "star3_hz":
                        s = "star3hezhi";
                        break;
                    case "star2_hz":
                    case "star2_zxhz":
                        s = "star2hezhi"
                }
                return s
            }
        }
        function c(t) {
            var i = s(t.currentTarget),
                r = n.map(i.attr("data-num").replace(/\|/g, " ").split(" "),
                    function (e) {
                        return parseInt(e, 10)
                    }),
                o = this.gameType,
                u = [],
                c;
            if (a[o]) {
                if ("dxds_fs" !== o) {
                    c = /$ren/.test(o);
                    s.each(r,
                        function (e, t) {
                            if (c) u.push("_" === t ? [] : [+ t]);
                            else "_" !== t && u.push([+ t])
                        });
                    r = u
                }
            } else if ("star1_fs" === o) r = [[+ r[0]]];
            else r = s.map(r,
                function (e) {
                    return + e
                });
            e.fly2Pool(i);
            e.betPool.push({
                gameType: o,
                no: r
            });
            e.scrollTo("bet");
            i.addClass("hide").parent().find(".addOK").removeClass("hide")
        }
        var f = e.stats,
            l = f.init;
        f.utils.convertPeriod = function (e) {
            return e ? o.convertPeriod(e) : "--"
        };
        f.init = function (e) {
            l.apply(this, [e]);
            e.frame.onGameChange(function (e) {
                s(".hmtj").hide().filter(".js_" + e + "_hmtj").show()
            });
            setTimeout(function () {
                s(".hmtj").hide().filter(".js_" + e.frame.cache.currentGameType + "_hmtj").show()
            },
                0)
        };
        f.getDOM = function (e, t, i) {
            var n = s(t.cache.wrap);
            return {
                $holder: n.parent().find(".js_" + e + "_hmtj"),
                $el: n.find(".statistics")
            }
        };
        f.needInitStatsView = function (e, t, s) {
            return !!t.cache.wrap.find(".statistics").length
        };
        f.autoOpen = function () { };
        f.views.StatsView = f.views.StatsView.extend({
            animateOpen: false,
            getShowList: function () {
                return ["hot", "yilou", "yuchu"]
            }
        });
        f.models.OmissionModel = f.models.OmissionModel.extend({
            url: function () {
                return "http://caipiao.163.com/missingnumber/queryHmtjMissingNumber.html?gameEn=" + r + "&analysis=cur_miss&rule=" + this.gameType + "&periods=0"
            }
        });
        f.models.WillModel = f.models.WillModel.extend({
            url: function () {
                return "http://caipiao.163.com/missingnumber/queryHmtjMissingNumber.html?gameEn=" + r + "&analysis=show_up_rate&rule=" + this.gameType + "&periods=0"
            }
        });
        f.views.ColdHotView = f.views.ColdHotView.extend({
            getData: function () {
                var e = this.model.get("missNumberList")[u(this.gameType, this.$position.val() || "")],
                    t = this.gameType;
                return n.map(["recent", "today", "yesterday"],
                    function (s, i) {
                        var a = e[i],
                            r,
                            o;
                        r = n.map(a,
                            function (e, s) {
                                var i = "dxds_fs" === t ? ["大", "小", "单", "双"][s] : +s;
                                return {
                                    label: i,
                                    value: i,
                                    count: +e
                                }
                            });
                        o = n.sortBy(r,
                            function (e) {
                                return - e.count
                            });
                        n.each(r,
                            function (e) {
                                var t = 5;
                                if (!o[0].count || !e.count) e.height = t;
                                else e.height = Math.max(t, (100 * e.count / o[0].count).Round(1))
                            });
                        return {
                            hot: o.slice(0, "dxds_fs" === t ? 2 : 3),
                            cold: o.slice("dxds_fs" === t ? -2 : -3),
                            all: r,
                            noHotData: 0 === o[0].count
                        }
                    })
            },
            getPositionList: function () {
                var e = [],
                    t = this.gameType,
                    s = a[t];
                if (s) e = n.map(s,
                    function (e) {
                        return {
                            label: e + "号码",
                            value: e
                        }
                    });
                return e
            },
            syncToBetArea: function (e) {
                var t = s(e.currentTarget),
                    i = t.attr("rel"),
                    r = this.$position.val(),
                    o = this.gameType,
                    u;
                if (i) {
                    u = a[o];
                    if (u) {
                        r = n.indexOf(u, r);
                        r = r === -1 ? 0 : r;
                        if ("dxds_fs" === o) this.betArea.toggle([i], r);
                        else this.betArea.toggle([parseInt(i, 10)], r)
                    } else this.betArea.toggle([parseInt(i, 10)])
                }
            },
            syncFromBetArea: function () {
                var e = this.$position.val(),
                    t = this.gameType,
                    i,
                    r = "dxds_fs" === t;
                if (a[t]) i = this.betArea.getGameCache(t).getActiveBall(n.indexOf(a[t], e || a[t][0]));
                else i = this.betArea.getGameCache(t).getActiveBall();
                this.$num.each(function () {
                    var e = s(this),
                        t = e.attr("rel");
                    if (t) {
                        t = r ? t : parseInt(t, 10);
                        e[n.indexOf(i, t) !== -1 ? "addClass" : "removeClass"]("choosed")
                    }
                })
            }
        });
        f.views.OmissionView = f.views.OmissionView.extend({
            pushData: c
        });
        f.views.WillView = f.views.WillView.extend({
            pushData: c
        });
        t.regBaseCom2Lib("COMS.GP.BetArea.STAT", "onDataChange onDataInvalid onDataError", e.stats)
    }(window.Core, window.Game, window.jQuery, window.Backbone, window._);
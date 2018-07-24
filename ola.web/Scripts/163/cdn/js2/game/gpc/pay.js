!
    function (e, t, i, r, o) {
        var n = r.alert,
            a = r.confirm,
            s = r.config.gameId,
            u = r.config.gameEn,
            c = r.config.gameCn;
        t.extend(i, {
            buyButtonClick: function () {
                if (r.gameStop) return;
                var e = i,
                    o = e.helper.buyType,
                    u = e.helper.gameType,
                    l = o,
                    p, f, d, y, b = [],
                    g, m, h = false,
                    k, B = {
                        gameId: s,
                        activityType: e.activityType || 0,
                        stakeNumber: e.betPool.serialize()
                    },
                    P;
                //if (!t("#agree_rule").is(":checked")) {
                //    n("请先阅读并同意《委托投注规则》后才能继续");
                //    return
                //}
                k = function (t, i, r) {
                    var o = t || 1,
                        n = i || "至少选择" + o + "注号码才能投注，是否机选" + o + "注碰碰运气？";
                    a(n, r || ["*机选1注", "取消"], function (t) {
                        t && e.betPool.autoRandom(o, function () {
                            e.buyButtonClick()
                        })
                    })
                };
                if (!B.stakeNumber) {
                    var v = e.betArea.getGameCache(e.helper.gameType).cache.betButton;
                    if (!v.hasClass("disabled")) {
                        v.click();
                        B.stakeNumber = e.betPool.serialize()
                    } else h = true
                }
                o = o >= 2 && o < 3 && !e.mulitiBuy ? 11 : 3 == o && !e.groupBuy ? 1 : parseInt(o, 10);
                l = o;
                switch (o) {
                    case 1:
                        if (h) {
                            k();
                            return
                        }
                        B.betTimes = e.betPool.beiNumber.get();
                        B.period = e.helper.period;
                        break;
                    case 2:
                    case 2.1:
                        if (h) {
                            k();
                            return
                        }
                        p = e.mulitiBuy.getData(), f = e.mulitiBuy.getInfo(), m = 0;
                        if (t.isFunction(i.mulitiBuyDataConvert)) {
                            P = i.mulitiBuyDataConvert(p);
                            if (P && !t.isEmptyObject(P)) p = P
                        }
                        t.each(p, function (e, t) {
                            m++;
                            B[e + "_times"] = t;
                            b.push(e)
                        });
                        if (0 == m) {
                            n("追号金额不能为空！");
                            return
                        }
                        y = e.mulitiBuy.getCurPeriod();
                        if (1 == m && p[y]) {
                            delete B[y + "_times"];
                            B.betTimes = p[y];
                            B.period = y;
                            l = 1
                        } else {
                            B.selectPeriods = b.join(",");
                            B.followMode = !f.stopWhenFeed ? 0 : f.stopMoney > 0 ? 2 : 1;
                            if (2 == B.followMode) B.stopAwardAmount = f.stopMoney;
                            B.followType = 2.1 == o ? 4 : 1;
                            B.betWay = "ZHUIHAO";
                            B.followName = c + " 追号" + b.length + "期";
                            d = e.mulitiBuy.selfCheck();
                            if (d.losed.length) {
                                r.dialog({
                                    button: ["*修改追号方案", "继续投注"],
                                    content: (d.skiped.length ? "您的追号方案期次不连续且" : "您的追号方案") + '可能<span class="c_ba2636">亏损</span>，建议您修改方案！'
                                }, function (e) {
                                    0 == e && i.payOrder(l, B)
                                });
                                return
                            } else if (d.skiped.length) {
                                r.confirm("您的追号方案中，没有选择<br/>" + d.skiped.join(",") + "<br/>期次，真的要这样做么？", function (e) {
                                    e && i.payOrder(l, B)
                                });
                                return
                            }
                        }
                        break;
                    case 3:
                        B.betTimes = i.betPool.beiNumber.get();
                        var C = e.betPool.getCount()[1] * B.betTimes;
                        if (C < 8) {
                            var T = Math.ceil((8 - C) / B.betTimes / 2);
                            k(T, "发起合买的投注金额不能少于8元，是否机选" + T + "注碰碰运气？", ["*机选" + T + "注", "取消"]);
                            return
                        }
                        f = e.groupBuy.selfCheck();
                        if (true !== f) return;
                        p = e.groupBuy.getData();
                        B.caseTitle = p.title;
                        B.caseDesc = p.desc;
                        B.totalPieces = p.totalPieces;
                        B.createrBuyPieces = p.createrBuyPieces;
                        B.proportion = p.feeType;
                        B.secretLevel = p.secretLevel;
                        B.guarantee = p.baodi;
                        if (2 == p.groupBuyType && p.periods) {
                            if (t.isFunction(i.mulitiBuyDataConvert)) {
                                P = i.mulitiBuyDataConvert(p.periods);
                                if (P && !t.isEmptyObject(P)) p = P
                            }
                            l = 5;
                            t.each(p.periods, function (e, t) {
                                m++;
                                B[e + "_grouptimes"] = t;
                                b.push(e)
                            });
                            B.selectPeriods = b.join(",");
                            d = e.groupBuy.getStatInfo();
                            if (d.creater.length) {
                                r.dialog({
                                    button: ["*修改合买方案", "继续投注"],
                                    content: (d.skiped.length ? "您的合买方案期次不连续且" : "您的合买方案") + '可能<span class="c_ba2636">亏损</span>，建议您修改方案！'
                                }, function (e) {
                                    0 == e && i.payOrder(l, B)
                                });
                                return
                            } else if (d.joiner.length) {
                                r.dialog({
                                    button: ["*修改合买方案", "继续投注"],
                                    content: (d.skiped.length ? "您的合买方案期次不连续且" : "您的合买方案中") + '跟单人可能<span class="c_ba2636">亏损</span>，建议您修改方案！'
                                }, function (e) {
                                    0 == e && i.payOrder(l, B)
                                });
                                return
                            } else if (d.skiped.length) {
                                r.confirm("您的连续合买方案中，没有选择<br/>" + d.skiped.join(",") + "<br/>期次，真的要这样做么？", function (e) {
                                    e && i.payOrder(l, B)
                                });
                                return
                            } else if (!d.skiped.choosed) {
                                r.alert("请至少选择一期发起合买。");
                                return
                            }
                        }
                }
                i.payOrder(l, B)
            },
            payOrder: function (e, r) {
                var o = r;
                if (r.selectPeriods) {
                    o = [];
                    t.each(r.selectPeriods.split(","), function (e, t) {
                        o.push("selectPeriods=" + t)
                    });
                    t.each(r, function (e, t) {
                        if ("selectPeriods" !== e) o.push(e + "=" + t)
                    });
                    o = "@" + o.join("&")
                }
                console.log(o);
                console.log(e);
                console.log(t.noop);
                Lottery.order();
                //this.loadJS(this.cdnUrl + "/js2/pay/pay.js", function () {
                //    return !!i.pay
                //}, function () {
                //    i.pay.toPay({
                //        data: o,
                //        orderType: e,
                //        payCallBack: t.noop
                //    })
                //})
            }
        })
    }(window, jQuery, Core, Game);
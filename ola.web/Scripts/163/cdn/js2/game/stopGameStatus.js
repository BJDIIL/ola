!
    function (t, e, a, i, o) {
        i.Base.Event.extend("Game.StopGameStatus", {
            init: function (t) {
                this.config = a.extend({},
                    this.config, t);
                this.cache = {
                    stopStatus: false
                };
                this.callSuper("onCheck")
            },
            checkStopStatus: function (t) {
                if (this.___protectedSelf) return this;
                var i = this.cache,
                    o = this,
                    r = function (t) {
                        if (1 === t.gameStatus) {
                            if (0 === t.stopSaleStatus) o.desaturate(t);
                            else {
                                a("[data-bet-type=2]").hide();
                                o.trigger("onCheck", 0)
                            }
                            return
                        } else if (0 === t.gameStatus) {
                            i.stopStatus = true;
                            switch (t.stopType) {
                                case 6:
                                    s.alertFstival.call(o, t);
                                    break;
                                case 7:
                                default:
                                    o.desaturate(t)
                            }
                        }
                    };
                this.___protectedSelf = true;
                if (a.isPlainObject(t)) {
                    r(t);
                    this.noticeConfig = t;
                    this.___protectedSelf = false
                } else {
                    var n = {
                        lotterySalePlatform: "pc"
                    };
                    if (t) n.gameEn = t;
                    //e.get("http://caipiao.163.com/order/queryStopSaleInfo.html", n,
                    //    function (t, e) {
                    //        if (t) {
                    //            o.trigger("onCheck", -1);
                    //            o.___protectedSelf = false;
                    //            return
                    //        }
                    //        o.noticeConfig = this.parseJSON(e);
                    //        r(o.noticeConfig);
                    //        o.___protectedSelf = false
                    //    })
                }
            },
            desaturate: function (t) {
                var i = this;
                a("[data-bet-type]").each(function (o, r) {
                    var n = a(this),
                        c = +n.attr("data-bet-type");
                    if (2 === c || 3 === c || 5 === c) {
                        n.css("display", "none");
                        return
                    }
                    r.onclick = null;
                    r.onmousedown = function () {
                        return false
                    };
                    n.removeAttr("title").unbind().mousedown(function () {
                        s.alertStopSale(i, t);
                        return false
                    });
                    var l = n.css("background-position"),
                        d = function () {
                            n.css({
                                "-webkit-filter": "grayscale(100%)",
                                filter: "grayscale(100%)",
                                opacity: .5,
                                backgroundPosition: l
                            })
                        };
                    if (a.browser.msie && +a.browser.version < 10) n.css({
                        backgroundPosition: l,
                        filter: "gray alpha(opacity=50)"
                    });
                    else {
                        var p = n.css("background-image").match(/(http[^"')]+)/)[1];
                        if (p.indexOf("/caipiao_info/") !== -1) {
                            d();
                            return
                        }
                        var h = document.createElement("canvas"),
                            f = h.getContext("2d"),
                            u = new Image,
                            g = l.split(" "),
                            m = null;
                        e.loadCdnJS("js2/com/getSize.js",
                            function () {
                                return !!a.fn.getSize
                            },
                            function () {
                                m = n.getSize();
                                u.onload = function () {
                                    h.width = m.width;
                                    h.height = m.height;
                                    try {
                                        f.drawImage(u, Math.abs(g[0].slice(0, -2)), Math.abs(g[1].slice(0, -2)), h.width, h.height, 0, 0, h.width, h.height);
                                        var t = f.getImageData(0, 0, h.width, h.height);
                                        for (var e = 0; e < t.height; e++) for (var a = 0; a < t.width; a++) {
                                            var i = 4 * e * t.width + 4 * a;
                                            var o = (t.data[i] + t.data[i + 1] + t.data[i + 2]) / 3;
                                            t.data[i] = o;
                                            t.data[i + 1] = o;
                                            t.data[i + 2] = o;
                                            t.data[i + 3] = 122
                                        }
                                        f.putImageData(t, 0, 0, 0, 0, t.width, t.height);
                                        n.css("background", "url(" + h.toDataURL() + ")")
                                    } catch (s) {
                                        d()
                                    }
                                };
                                u.src = p.replace("pimg1.126.net", "caipiao.163.com")
                            })
                    }
                });
                i.desaturate = a.noop
            },
            getStopStatus: function () {
                return !!this.cache.stopStatus
            },
            notice: {}
        });
        var s = {
            alertFstival: function (t, i) {
                var o = a.extend({
                    gameName: "当前彩种"
                },
                    t),
                    s = ['<div id="festivalDialog">', '<div class="imgBg"></div>', '<div class="contentText">{contentText}</div>', '<a href="http://caipiao.163.com/outside/getclient_cp.html#from=2015cjts" style="left: 346px;top: 329px;width: 89px;position:absolute;display:block;height:24px;z-index:33"></a>', "{backIndex}{scrollList}", "</div>"],
                    r = '<a href="http://caipiao.163.com/#from=2015cjts" class="backIndex" target="_blank"></a>',
                    n = '<a class="iDialogClose close" href="javascript:;"></a>',
                    c = ['<div class="scrollList">', "<span>客户端中奖用户 : </span>", '<div class ="stopScrollWrap clearfix">', "<ul>", "<%for(var i = 0; i < data.scrollList.length; i++){%>", "<li><%=data.scrollList[i].nickName%>获得<%=data.scrollList[i].award%></li>", "<%}%>", "</ul></div>", "</div>"],
                    l = [["<p>您好，2月18日-2月24日（除夕至初六）仅预售双色球、大乐透、</p>", "<p>3D、排列3、排列5、七星彩、七乐彩，其余彩种停售。</p>", '<p>2月25日（初七）所有彩种恢复销售。<a href="{detailUrl}" target="_blank">详情》</a></p>'], ['<p>本彩种，<strong>2月18日-2月24日停售，2月25日</strong>恢复销售。<a href="{detailUrl}" target="_blank">详情》</a></p>', '<p>推荐您购买：<strong><a href="http://caipiao.163.com/order/ssq/#from=2015cjts" target="_blank">双色球</a></strong>   ', '<strong><a href="http://caipiao.163.com/order/dlt/#from=2015cjts" target="_blank">大乐透</a></strong></p>']];
                this.trigger && this.trigger("onCheck", 999);
                var d = "http://caipiao.163.com/activity/checkStopSale15.html",
                    p;
                e.get(d,
                    function (t, d) {
                        try {
                            d = e.parseJSON(d);
                            if (1 == d.isStop) {
                                o.detailUrl = d.detailUrl;
                                p = a.format(l[i ? 0 : 1].join(""), o);
                                if (i) {
                                    if (d.textForIndexPc) p = d.textForIndexPc
                                } else if (d.textForBetPc) p = d.textForBetPc;
                                a.dialog();
                                a.dialog({
                                    type: "shell",
                                    content: a.format(s.join(""), {
                                        contentText: p,
                                        backIndex: i ? n : r,
                                        scrollList: d.awardList && d.awardList.length ? a.template(c.join(""), {
                                            scrollList: d.awardList
                                        }) : ""
                                    }),
                                    height: 486,
                                    width: 718,
                                    init: function () {
                                        a(this).find(".stopScrollWrap").xScrollGrid(0)
                                    }
                                })
                            }
                        } catch (h) { }
                    });
                return this
            },
            alertStopSale: function (t, a) {
                e.loadCdnJS("js2/game/notice/pause.js",
                    function () {
                        return !!i.Game.checkStopStatus && i.Game.checkStopStatus.notice && i.Game.checkStopStatus.notice.alertCommon
                    },
                    function () {
                        s.alertCommon.call(t, {
                            showType: 2,
                            gameStatus: "undefined" !== typeof a.stopSaleStatus ? a.stopSaleStatus : a.gameStatus,
                            pauseTit: a.stopSaleTitle || a.gameName + "暂停销售",
                            pauseMsg: a.stopSaleNoteList || ["已成功出票的订单将会正常兑奖。", "用户之前设定的追号、自动跟单可通过网易彩票手机客户端查询执行中奖情况。", "彩票资讯、全国开奖号码、走势图、数据图表等服务将继续提供。"],
                            note: " "
                        })
                    });
                return this
            }
        };
        i.Game.StopGameStatus.notice = s
    }(window, Core, jQuery, window.Class);
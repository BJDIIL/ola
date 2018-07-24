!
    function (t, e, i, a, s) {
        "use strict";
        var n = e.config.gameId,
            o = e.config.gameEn;
        var r = {
            gameType2Rule: function () {
                return ""
            },
            convertPeriod: function (t) {
                return t || "--"
            }
        };
        var d = a.Model.extend({
            interval: 10,
            maxTryCount: 10,
            initialize: function (e, a) {
                s.bindAll(this, "fetch", "afterPeriodDataHere");
                if (t.lastPeriodAwardInfo && t.lastPeriodAwardInfo.period) this.awardPeriod = t.lastPeriodAwardInfo.period;
                i.bindMsg("periodDataHere", this.afterPeriodDataHere);
                this.lock()
            },
            afterPeriodDataHere: function (t) {
                var e = this;
                this.awardPeriod = t;
                setTimeout(function () {
                    e.reload()
                },
                    3e3)
            },
            reload: function () {
                var t = this;
                if (this.reloadLock) return this;
                if (!this.awardPeriod && this.get("period") || this.awardPeriod && this.get("period") === this.awardPeriod) {
                    t.trigger("fetch:success", t);
                    return this
                }
                return this.fetch()
            },
            lock: function () {
                this.reloadLock = true;
                return this
            },
            unLock: function () {
                this.reloadLock = false;
                return this
            },
            fetch: function () {
                var i = this,
                    a = this.url(),
                    n = this.ajaxKey(),
                    o = this.maxTryCount;
                i.clear();
                i.trigger("fetch:before", i);
                this.fetchTaskId && e.clearTask(this.fetchTaskId);
                this.fetchTaskId = e.setTask(function (e, r) {
                    t.get(a, {
                        period_id: i.awardPeriod || ""
                    },
                        function (t, a) {
                            if (!t && a) {
                                var n = i.parse(a);
                                if (s.isObject(n) && i.set(n)) {
                                    i.awardPeriod = i.get("period");
                                    i.trigger("fetch:success", i);
                                    e(true);
                                    return
                                }
                            }
                            e(false)
                        },
                        "!" + n);
                    if (o && o === r) i.trigger("fetch:failed", i)
                },
                    this.interval, this.maxTryCount);
                return this
            },
            parse: function (t) {
                var e;
                try {
                    e = JSON.parse(t)
                } catch (i) { }
                if (e && e.successful && (!this.awardPeriod || e.period === this.awardPeriod)) return e;
                else return false
            },
            ajaxKey: function () {
                return this.cid
            }
        });
        var l = d.extend({
            url: function () {
                return "http://caipiao.163.com/missingnumber/getHotColdMissNumList.html?game=" + o
            },
            ajaxKey: function () {
                return "cold_hot"
            }
        });
        var c = d.extend({
            initialize: function (t, e) {
                d.prototype.initialize.apply(this, [t, e]);
                this.gameType = e.gameType
            },
            url: function () {
                return "http://caipiao.163.com/analysis/rank/getMissRankList.html?game=" + o + "&analysis=cur_miss&rule=" + r.gameType2Rule(this.gameType) + "&periods=0"
            },
            ajaxKey: function () {
                return "omission_" + this.gameType
            }
        });
        var h = c.extend({
            url: function () {
                return "http://caipiao.163.com/analysis/rank/getMissRankList.html?game=" + o + "&analysis=show_up_rate&rule=" + r.gameType2Rule(this.gameType) + "&periods=0"
            },
            ajaxKey: function () {
                return "will_" + this.gameType
            }
        });
        var u = c.extend({
            url: function () {
                return "http://caipiao.163.com/missingnumber/getHotNum.html?gameId=" + n + "&type=" + r.gameType2Rule(this.gameType)
            },
            ajaxKey: function () {
                return "hot_no_" + this.gameType
            }
        });
        var p = a.View.extend({
            initialize: function (t) {
                s.bindAll(this, "render", "renderContent", "renderLoading", "renderFailed");
                this.listenTo(this.model, "fetch:success", this.render);
                this.listenTo(this.model, "fetch:before", this.renderLoading);
                this.listenTo(this.model, "fetch:failed", this.renderFailed);
                this.gameType = t.gameType;
                this.betArea = t.betArea
            },
            render: function () {
                return this
            },
            renderContent: function () { },
            renderLoading: function () {
                this.$el.html('<div class="loading"><span>数据加载中，请稍候…</span></div>');
                this.status = "loading"
            },
            renderFailed: function () {
                this.$el.html('<div class="loadError"><span>数据获取失败，请稍候<a class="js-reload" href="javascript:;">重试</a>。</span></div>');
                this.status = "failed"
            },
            reload: function () {
                this.model.reload()
            }
        });
        var f = p.extend({
            className: "detail_con clearfix",
            events: {
                "click .number": "syncToBetArea"
            },
            template: s.template(["<%= nav%>", "<%= pos%>", '<div class="js-content-wrap"></div>'].join("")),
            navTemplate: s.template(['<ul class="detail_nav">', '<li rel="#cold_hot_recent_<%= cid%>" class="active" data-key="recent">近<%= maxPeriod%>期</li>', '<li rel="#cold_hot_today_<%= cid%>" data-key="today">今天</li>', '<li rel="#cold_hot_yesterday_<%= cid%>" data-key="yesterday">昨天</li>', "</ul>"].join("")),
            posTemplate: s.template(['<div class="posSelect">', "<% if(positionList && positionList.length){%>", "<select>", "<% _.each(positionList, function(position){%>", '<option value="<%= position.value%>"><%= position.label%></option>', "<% })%>", "</select>", "<% }%>", "</div>"].join("")),
            cntTemplate: s.template(['<% _.each(["recent", "today", "yesterday"], function(key, i){%>', '<div id="cold_hot_<%= key%>_<%= cid%>" class="hide js-content" data-key="<%= key%>">', '<dl class="probabilityBox">', "<% _.each(data[i].all, function(info, j){%>", '<dd><span><%= info.count%></span><em><i style="height:<%= info.height%>%;"></i></em><a rel="<%= info.value%>" class="number" href="javascript:;"><%= info.label%></a></dd>', "<% })%>", "</dl>", '<div class="hotcoldBox clearfix">', '<dl><dt><span class="c_ba2636">热号</span><em>次数：</em></dt>', '<dd><% _.each(data[i].hot, function(info, j){%><p><% if(data[i].noHotData){%> --<span>--</span><% }else{%><a rel="<%= info.value%>" class="number" href="javascript:;"><%= info.label%></a><span><%= info.count%></span><% }%></p><% })%></dd></dl>', '<dl><dt><span class="c_1e50a2">冷号</span><em>次数：</em></dt>', '<dd><% _.each(data[i].cold, function(info, j){%><p><% if(data[i].noHotData){%> --<span>--</span><% }else{%><a rel="<%= info.value%>" class="number" href="javascript:;"><%= info.label%></a><span><%= info.count%></span><% }%></p><% })%></dd></dl>', "</div>", "</div>", "<% })%>"].join("")),
            initialize: function (t) {
                p.prototype.initialize.apply(this, [t]);
                var e = this;
                this.betArea.onGameChange(function (t) {
                    if (e.gameType === t && "success" === e.status) e.syncFromBetArea()
                }).onBallChange(function (t, i, a) {
                    if (e.gameType === t && "success" === e.status) e.syncFromBetArea()
                })
            },
            render: function () {
                this.positionList = this.getPositionList() || [];
                this.$el.html(this.template({
                    nav: this.navTemplate({
                        maxPeriod: t.maxPeriod,
                        cid: this.cid
                    }),
                    pos: this.posTemplate({
                        positionList: this.positionList
                    })
                }));
                this.$nav = this.$(".detail_nav").bindTab();
                this.$position = this.$(".posSelect select");
                this.$contentWrap = this.$(".js-content-wrap");
                if (this.positionList.length) this.$position.change(this.renderContent);
                this.renderContent();
                this.status = "success";
                return this
            },
            renderContent: function () {
                var t = this.getData();
                this.$contentWrap.html(this.cntTemplate({
                    data: t,
                    cid: this.cid
                }));
                this.$contents = this.$contentWrap.find(".js-content");
                this.$contents.filter('[data-key="' + this.$nav.find(".active").attr("data-key") + '"]').show();
                this.$num = this.$contents.find("[rel]");
                this.syncFromBetArea()
            },
            getData: function () {
                return []
            },
            getPositionList: function () {
                return []
            },
            syncFromBetArea: function () { },
            syncToBetArea: function (t) { }
        });
        var m = p.extend({
            className: "omitBox",
            events: {
                "click .addData": "pushData"
            },
            template: ['<table class="omit_table">', "<thead><tr>", '<th width="30%">号码</th>', '<th width="*">未出期数</th>', '<th width="*">最大遗漏</th>', '<th width="12%">操作</th>', "</tr></thead>", "<tbody></tbody>", "</table>"].join(""),
            cntTemplate: s.template(["<% _.each(list, function(item){%>", "<tr>", '<td class="num"><%= item.number.replace(/\\|/g, " ")%></td>', "<td><%=item.curMiss%></td>", "<td><%=item.maxMiss%></td>", '<td class="add"><span class="addData" data-num="<%= item.number.replace(/\\|/g, " ")%>">添加</span><span class="addOK hide"><i></i><span>已添加</span></span></td>', "</tr>", "<% })%>"].join("")),
            render: function () {
                this.$el.html(this.template);
                this.$content = this.$("tbody");
                this.renderContent();
                this.status = "success";
                return this
            },
            renderContent: function () {
                this.$content.html(this.cntTemplate({
                    list: this.getData()
                }))
            },
            getData: function () {
                return this.model.get("rank")
            },
            pushData: function (t) { }
        });
        var y = m.extend({
            template: ['<table class="omit_table">', "<thead><tr>", '<th width="30%">号码</th>', "<th>欲出率</th>", '<th width="12%">操作</th>', "</tr></thead>", "<tbody></tbody>", "</table>"].join(""),
            cntTemplate: s.template(["<% _.each(list, function(item){%>", "<tr>", '<td class="num"><%= item.number.replace(/\\|/g, " ")%></td>', "<td><%= Number(item.showUpRate).Cint()%>%</td>", '<td class="add"><span class="addData" data-num="<%= item.number.replace(/\\|/g, " ")%>">添加</span><span class="addOK hide"><i></i><span>已添加</span></span></td>', "</tr>", "<% });%>"].join(""))
        });
        var v = m.extend({
            template: ['<table class="omit_table">', "<thead><tr>", '<th width="30%">号码</th>', '<th><a data-hotno-sort="recent" href="javascript:;">近' + t.maxPeriod + '期-出现次数<em class="icon_sort icon_sort_recent"></em></a></th>', '<th><a data-hotno-sort="today" href="javascript:;">今天-出现次数<em class="icon_sort icon_sort_today"></em></a></th>', '<th><a data-hotno-sort="yesterday" href="javascript:;">昨天-出现次数<em class="icon_sort icon_sort_yesterday"></em></a></th>', '<th width="12%">操作</th></tr></thead>', '<tbody class="wrap_recent wrap_hotNo"></tbody>', '<tbody class="wrap_today wrap_hotNo"></tbody>', '<tbody class="wrap_yesterday wrap_hotNo"></tbody>', "</table>"].join(""),
            cntTemplate: s.template(["<% _.each(list, function(item){%>", "<tr>", '<td class="num"><%= item.ballNumber.replace(/\\|/g, " ")%></td>', "<td class=\"<%= key === 'recent' ? 'active' : ''%>\"><%= item.recent%></td>", "<td class=\"<%= key === 'today' ? 'active' : ''%>\"><%= item.today%></td>", "<td class=\"<%= key === 'yesterday' ? 'active' : ''%>\"><%= item.yesterday%></td>", '<td class="add"><span class="addData" data-num="<%= item.ballNumber.replace(/\\|/g, " ")%>">添加</span><span class="addOK hide"><i></i><span>已添加</span></span></td>', "</tr>", "<% })%>"].join("")),
            events: {
                "click [data-hotno-sort]": "changeSortType",
                "click .addData": "pushData"
            },
            renderContent: function () {
                var t = this.$content,
                    e = this.cntTemplate,
                    i = this.model;
                s.each(["recent", "today", "yesterday"],
                    function (a, s) {
                        t.eq(s).html(e({
                            key: a,
                            list: i.get(a)
                        }))
                    });
                this.changeSortType()
            },
            changeSortType: function (t) {
                if (t) {
                    var e = i(t.currentTarget);
                    this.currentSortType = e.attr("data-hotno-sort")
                } else this.currentSortType = this.currentSortType || "recent";
                this.$el.removeClass("sort_recent sort_today sort_yesterday").addClass("sort_" + this.currentSortType)
            }
        });
        var g = a.View.extend({
            template: s.template(['<div class="statisticsDetail">', '<p class="detail_title">', "<% _.each(showList, function(key, index){%>", '<label><input type="radio" value="<%= key%>" name="<%= cid%>stat-nav" data-index="<%= index%>" class="showType"><%= infoMap[key].label%><i inf="<%= infoMap[key].tip%>" class="questionMark jtip"></i></label>', "<% })%>", "</p>", '<p class="update_control">数据已更新至：<span class="periodUpdate">--</span>期<a class="js-reload" href="javascript:;">刷新</a></p>', "</div>"].join("")),
            events: {
                "click .detail_title input": "navTo",
                "click .js-reload": "reload"
            },
            animateOpen: true,
            initialize: function (t) {
                this.gameType = t.gameType;
                this.betArea = t.betArea;
                s.bindAll(this, "toggle");
                this.$holder = i(t.holder);
                this.$holder.click(this.toggle)
            },
            render: function () {
                this.$el.html(this.template({
                    cid: this.cid,
                    showList: this.getShowList(),
                    infoMap: this.getInfoMap()
                }));
                if (this.animateOpen) this.$el.css({
                    height: 0
                });
                this.$nav = this.$(".detail_title input");
                this.$content = this.$(".statisticsDetail");
                this.views = [];
                this.renderContent();
                this.rendered = true;
                return this
            },
            renderContent: function () {
                var t = this,
                    e = this.getShowList(),
                    i = this.getViewMap();
                this.views = s.map(e,
                    function (e, a) {
                        var s = new i[e].view({
                            gameType: t.gameType,
                            betArea: t.betArea,
                            model: new i[e].model({},
                                {
                                    gameType: t.gameType
                                })
                        });
                        s.$el.appendTo(t.$content).attr("data-index", a);
                        return s
                    });
                this.listenViews();
                this.navTo(this.getDefaultShow())
            },
            listenViews: function () {
                var t = this;
                s.each(this.views,
                    function (e, i) {
                        !
                        function (e, i) {
                            t.listenTo(e.model, "fetch:before",
                                function (e) {
                                    if (i === t.currentIndex) t.updatePeriod(null)
                                });
                            t.listenTo(e.model, "fetch:success",
                                function (e) {
                                    if (i === t.currentIndex) t.updatePeriod(e.get("period"))
                                });
                            t.listenTo(e.model, "fetch:failed",
                                function () {
                                    if (i === t.currentIndex) t.updatePeriod(null)
                                })
                        }(e, i)
                    })
            },
            navTo: function (t) {
                var e = this;
                if (t.currentTarget) t = +i(t.currentTarget).attr("data-index");
                this.$nav.each(function () {
                    this.checked = false
                })[t].checked = true;
                s.each(this.views,
                    function (i, a) {
                        if (t === a) {
                            i.$el.show();
                            i.model.unLock();
                            e.updatePeriod(i.model.get("period"))
                        } else {
                            i.model.lock();
                            i.$el.hide()
                        }
                    });
                window.LS.set(o + "Stat", this.getShowList()[t]);
                this.currentIndex = t;
                this.reload()
            },
            updatePeriod: function (t) {
                this.$(".periodUpdate").html(r.convertPeriod(t))
            },
            reload: function (t) {
                if ("all" === t) s.invoke(this.views, "reload");
                else this.views[this.currentIndex].reload()
            },
            toggle: function () {
                if (this.opened) this.close();
                else this.open()
            },
            open: function () {
                var t = this;
                if (this.opened) return;
                if (!this.rendered) this.render();
                if (this.animateOpen) this.$el.stop().animate({
                    height: 255
                },
                    function () {
                        t.$el.css("display", "").removeClass("hide");
                        t.$holder.addClass("active")
                    });
                else {
                    this.$el.removeClass("hide");
                    this.$holder.addClass("active")
                }
                this.views[this.currentIndex].model.unLock();
                this.reload();
                this.opened = true
            },
            close: function () {
                var t = this;
                if (!this.opened) return;
                if (this.animateOpen) this.$el.stop().animate({
                    height: 0
                },
                    function () {
                        t.$el.css("display", "").addClass("hide");
                        t.$holder.removeClass("active")
                    });
                else {
                    this.$el.addClass("hide");
                    this.$holder.removeClass("active")
                }
                s.each(this.views,
                    function (t) {
                        t.model.lock()
                    });
                this.opened = false
            },
            getDefaultShow: function () {
                var t = s.indexOf(this.getShowList(), window.LS.get(o + "Stat") || "yilou");
                return t === -1 ? 0 : t
            },
            getShowList: function () {
                return ["hot", "yilou", "yuchu"]
            },
            getInfoMap: function () {
                return {
                    hot: {
                        label: "冷热统计",
                        tip: "热号：出现次数最多的号码<br>冷号：出现次数最少的号码"
                    },
                    yilou: {
                        label: "遗漏排行",
                        tip: "该号码自上次开出以来至本<br>次未出现的期数"
                    },
                    yuchu: {
                        label: "欲出排行",
                        tip: "较可能出现的号码"
                    },
                    hotNo: {
                        label: "热号排行",
                        tip: "统计范围内出现次数最多的<br>号码组合"
                    }
                }
            },
            getViewMap: function () {
                return {
                    hot: {
                        view: t.stats.views.ColdHotView,
                        model: t.stats.models.ColdHotModel
                    },
                    yilou: {
                        view: t.stats.views.OmissionView,
                        model: t.stats.models.OmissionModel
                    },
                    yuchu: {
                        view: t.stats.views.WillView,
                        model: t.stats.models.WillModel
                    },
                    hotNo: {
                        view: t.stats.views.HotNoView,
                        model: t.stats.models.HotNoModel
                    }
                }
            },
            disappear: function () {
                s.each(this.views,
                    function (t) {
                        t.model.lock()
                    })
            },
            appear: function () {
                this.opened && this.views[this.currentIndex].model.unLock().reload()
            }
        });
        t.stats = {
            utils: r,
            models: {
                BaseModel: d,
                ColdHotModel: l,
                OmissionModel: c,
                WillModel: h,
                HotNoModel: u
            },
            views: {
                BaseView: p,
                ColdHotView: f,
                OmissionView: m,
                WillView: y,
                HotNoView: v,
                StatsView: g
            },
            statsViews: {},
            init: function (e) {
                var i = this;
                if (!e.frame || !o) {
                    t.log("号码统计组件缺少设置参数或参数错误！");
                    return
                }
                e.frame.onGameInit(function (t, a) {
                    i.initStatsView(t, a, e.frame)
                }).eachGame(function (t, a) {
                    i.initStatsView(t, a, e.frame)
                }).onGameChange(function (t) {
                    s.each(i.statsViews,
                        function (e, i) {
                            if (t === i) e.appear();
                            else e.disappear()
                        })
                })
            },
            getDOM: function (t, e, a) {
                var s = i(e.cache.wrap),
                    n = s.parent();
                return {
                    $holder: n.find(".hmtj"),
                    $el: n.find(".statistics")
                }
            },
            initStatsView: function (t, e, i) {
                var a, s;
                if (this.needInitStatsView(t, e, i)) {
                    s = this.getDOM(t, e, i);
                    a = new this.views.StatsView({
                        gameType: t,
                        betArea: i,
                        holder: s.$holder,
                        el: s.$el[0]
                    });
                    this.statsViews[t] = a;
                    this.autoOpen(a, s.$holder)
                }
            },
            needInitStatsView: function (t, e, i) {
                return /pt$/.test(t)
            },
            autoOpen: function (t, e) {
                if (!window.LS.get(o + "Stat") && e.is(":visible")) {
                    t.open();
                    var i = setTimeout(function () {
                        t.close()
                    },
                        5e3);
                    t.$el.one("mouseenter",
                        function () {
                            i && clearTimeout(i)
                        })
                }
            }
        }
    }(window.Core, window.Game, window.jQuery, window.Backbone, window._);
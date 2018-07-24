!
    function (e, t, o) {
        function n(t, o, n) {
            var r = document.createElement("script");
            r.id = "_urlDecodeFn_";
            e._urlDecodeFn_ = n;
            if (document.all) if (navigator.userAgent.indexOf("MSIE 8") > -1) {
                var c = document.createElement("link");
                c.rel = "stylesheet";
                c.type = "text/css";
                c.charset = o;
                c.href = "data:text/plain;charset=" + o + ",%23_decode_hidden_el_for_test_%7Bbackground-image%3Aurl(" + t + ")%7D";
                document.body.appendChild(c);
                var i = document.createElement("div");
                i.id = "_decode_hidden_el_for_test_";
                i.style.display = "none";
                document.body.appendChild(i);
                setTimeout(function () {
                    n(document.getElementById("_decode_hidden_el_for_test_").currentStyle["backgroundImage"].match(/\("data\:text\/(.+)"\)/)[1]);
                    c.parentNode.removeChild(c);
                    i.parentNode.removeChild(i)
                },
                    300)
            } else {
                if (!e["_urlDecode_iframe_"]) {
                    var a;
                    if (document.all) try {
                        a = document.createElement('<iframe name="_urlDecode_iframe_"></iframe>')
                    } catch (d) {
                        a = document.createElement("iframe");
                        a.setAttribute("name", "_urlDecode_iframe_")
                    } else {
                        a = document.createElement("iframe");
                        a.setAttribute("name", "_urlDecode_iframe_")
                    }
                    a.setAttribute("name", "_urlDecode_iframe_");
                    a.style.display = "none";
                    a.width = "0";
                    a.height = "0";
                    a.scrolling = "no";
                    a.allowtransparency = "true";
                    a.frameborder = "0";
                    a.src = "about:blank";
                    document.body.appendChild(a)
                }
                a.contentWindow.document.write("<html><scrip" + 't charset="gbk" src="data:text/javascript;charset=gbk,parent._decodeStr_=\'' + t + "'\"></s" + "cript></html>");
                setTimeout(function () {
                    n(_decodeStr_);
                    a.parentNode.removeChild(a)
                },
                    300)
            } else {
                var m = "data:text/javascript;charset=" + o + ',_urlDecodeFn_("' + t + '");';
                m += 'document.getElementById("_urlDecodeFn_").parentNode.removeChild(document.getElementById("_urlDecodeFn_"));';
                r.src = m;
                document.body.appendChild(r)
            }
        }
        var r = "";
        function c(e, t, o) {
            if (!e || !t) {
                o("");
                return
            }
            var r, c = "",
                i = t.split(","),
                a,
                d,
                m = function (e) {
                    o(e);
                    m = function () { }
                };
            while (a = i.shift()) {
                r = new RegExp("(?:^|&)" + a + "=([^&$]*)", "gi");
                d = r.test(e);
                try {
                    c = d ? decodeURIComponent(RegExp.$1) : ""
                } catch (u) {
                    d && n(RegExp.$1, "gbk",
                        function (e) {
                            if (e) m(e)
                        })
                }
                if (c) {
                    m(c);
                    return
                }
            }
        }
        function i(e, t) {
            if (r) {
                t(r);
                return
            }
            var o = {
                "http://www.baidu.com": "wd,word",
                "http://www.soso.com": "w",
                "http://www.sogou.com": "query",
                "http://www.youdao.com": "q",
                "http://www.yodao.com": "q",
                "http://search.yahoo.com": "p",
                "http://search.naver.com": "query",
                "http://www.so.com": "q",
                "http://so.360.cn": "q",
                "http://cn.bing.com": "q",
                "http://www.bing.com": "q",
                "http://www.google.com.hk": "q",
                "http://www.google.com": "q",
                "http://www.yahoo.cn": "q"
            },
                n = function () {
                    for (var t in o) if (0 == e.indexOf(t)) return o[t]
                };
            c(e.indexOf("?") >= 0 ? e.split("?")[1] : "", n(),
                function (e) {
                    r = e;
                    t(e)
                })
        }
        o.fireSEO = function (e, n, r) {
            if (!e || !n) return;
            i(n,
                function (c) {
                    //o.get("http://caipiao.163.com/seoSem/getSeoSemConfig.html", {
                    //    key: c,
                    //    from: t.getPara("from"),
                    //    domain: e,
                    //    ref: n
                    //},
                    //    function (e, o) {
                    //        if (e) {
                    //            t.isFunction(r) && r([]);
                    //            return
                    //        }
                    //        var n;
                    //        try {
                    //            n = this.parseJSON(o);
                    //            if (!n.length) n = []
                    //        } catch (c) {
                    //            n = [];
                    //            this.log && this.log("seo广告ajax返回的内容格式错误！")
                    //        }
                    //        t.isFunction(r) && r(n)
                    //    })
                });
            return this
        }
    }(window, jQuery, Core);
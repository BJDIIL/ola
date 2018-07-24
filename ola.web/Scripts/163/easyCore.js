!
    function (window, $, undefined) {
        !
            function () {
                try {
                    window.document.execCommand("BackgroundImageCache", false, true)
                } catch (e) { }
                $.extend(Number.prototype, {
                    Round: function (e, i) {
                        var m = Math.pow(10, e || 0);
                        return 0 == i ? Math.ceil(this * m) / m : Math.round(this * m + (5 - (i || 5)) / 10) / m
                    },
                    Cint: function (e) {
                        return this.Round(0, e)
                    },
                    Round465: function (e) {
                        var i, e = e || 0,
                            m = "" + this,
                            t = false,
                            n;
                        i = new RegExp("^(\\d*)(\\d)(\\.)(\\d{" + e + "})5(\\d*)$");
                        if (i.test(m)) {
                            if (0 == e) {
                                m = m.replace(i, "$1$2");
                                n = RegExp.$2
                            } else {
                                m = m.replace(i, "$1$2$3$4");
                                n = RegExp.$4
                            }
                            if (+RegExp.$5 > 0) t = true;
                            else if (n % 2 != 0) t = true;
                            if (t) m = +m + 1 / Math.pow(10, e)
                        }
                        m = (+m).Round(e);
                        return m
                    }
                });
                var i = /./,
                    m = i.compile && i.compile(i.source, "g");
                RegExp.regCompile = m;
                $.extend(String.prototype, {
                    trim: function () {
                        return this.replace(/^(?:\s|\xa0|\u3000)+|(?:\s|\xa0|\u3000)+$/g, "")
                    },
                    byteLen: function () {
                        return this.replace(/([^\x00-\xff])/g, "ma").length
                    },
                    cutString: function (e, i) {
                        var m = /([^\x00-\xff])/g,
                            t = /([^\x00-\xff]) /g;
                        if (i) {
                            var n = String(i),
                                s = n.length,
                                r = this.replace(m, "$1 ");
                            e = e >= s ? e - s : 0;
                            i = r.length > e ? n : "";
                            return r.substr(0, e).replace(t, "$1") + i
                        }
                        return this.substr(0, e).replace(m, "$1 ").substr(0, e).replace(t, "$1")
                    }
                });
                $.fn.fixPosition = function () {
                    var e = this,
                        i, m, t, n, s = function (e, i) {
                            var m = e[0].currentStyle[i];
                            return m.indexOf("%") + 1 ? false : e.css(i).replace(/\D/g, "") || null
                        },
                        r = $(window),
                        o, a, c, l, u;
                    if ("absolute" == e.css("position")) {
                        i = s(e, "top");
                        m = s(e, "bottom");
                        t = s(e, "left");
                        n = s(e, "right");
                        l = e.offsetParent()[0];
                        u = l ? /^html|body$/i.test(l.tagName) : false;
                        o = u ? +r.scrollTop() : 0;
                        a = u ? +r.scrollLeft() : 0;
                        c = function (s) {
                            var c = "resize" == s.type,
                                l;
                            if (c) {
                                l = e.is(":hidden");
                                if (!l) e.hide()
                            }
                            var h = +r.scrollTop(),
                                f = +r.scrollLeft();
                            if (u) m && e.css("bottom", +m + 1).css("bottom", m + "px");
                            else m && e.css("bottom", $(document).height() - r.height() - h + +m + "px");
                            i && e.css("top", +i + h - o + "px");
                            if (u) n && e.css("right", +n + 1).css("right", n + "px");
                            else n && e.css("right", $(document).width() - r.width() - f + +n + "px");
                            t && e.css("left", +t + f - a + "px");
                            if (c && !l) e.show()
                        };
                        r.scroll(c).resize(c)
                    }
                    return e
                }
            }();
        !
            function () {
                $.isIE678 = eval('"\\v"=="v"');
                if ($.isIE678) {
                    $.isIE8 = !! "1"[0];
                    $.isIE6 = !$.isIE8 && (!document.documentMode || "BackCompat" == document.compatMode);
                    $.isIE7 = !$.isIE8 && !$.isIE6;
                    $.fn.extend({
                        _bind_: $.fn.bind,
                        bind: function (e, i, m) {
                            /^click$/gi.test(e) && d(this);
                            return this._bind_(e, i, m)
                        }
                    });
                    var d = function (e) {
                        var i = e.length,
                            m = 0,
                            t;
                        for (; m < i; m++) {
                            t = e[m];
                            if (!t.fixClick) {
                                t.fixClick = true;
                                $(t).bind("dblclick", function (e) {
                                    var i = e.target,
                                        m = 0;
                                    while (i && 9 !== i.nodeType && (1 !== i.nodeType || i !== this)) {
                                        if (1 === i.nodeType) if (i.fixClick) return;
                                        i = i.parentNode
                                    }
                                    e.type = "click";
                                    e.source = "dblclick";
                                    $(e.target).trigger(e)
                                })
                            }
                        }
                    };
                    var f = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(","),
                        i = f.length;
                    while (i--) document.createElement(f[i])
                }
            }();
        $.extend({
            getUrlPara: function (e) {
                return $.getParaFromString(window.location.search.replace(/^\?/g, ""), e)
            },
            getHashPara: function (e) {
                var i = window.location.href.match(/#(.*)$/);
                return $.getParaFromString(i ? i[1] : "", e)
            },
            getPara: function (e) {
                return $.getUrlPara(e) || $.getHashPara(e)
            },
            getParaFromString: function (e, i) {
                var m = {};
                $.each(("" + e).match(/([^=&#\?]+)=[^&#]+/g) || [], function (e, i) {
                    var t = i.split("="),
                        n = decodeURIComponent(t[1]);
                    if (m[t[0]] !== undefined) m[t[0]] += "," + n;
                    else m[t[0]] = n
                });
                return i ? m[i] || "" : m
            },
            safeHTML: function (e) {
                return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
            },
            safeRegStr: function (e) {
                return String(e).replace(/([\\\(\)\{\}\[\]\^\$\+\-\*\?\|])/g, "\\$1")
            },
            falseFn: function () {
                return false
            },
            stopProp: function (e) {
                e.stopPropagation()
            },
            preventDft: function (e) {
                e.preventDefault()
            },
            isLeftClick: function (e) {
                return e.button == (eval('"\\v"=="v"') ? 1 : 0)
            },
            addUrlPara: function (e, i, m) {
                var t = (e + "").split("#"),
                    n;
                if (m) t[0] = $.removeUrlPara(t[0], $.map(i.match(/([^=&#\?]+)=[^&#]+/g), function (e) {
                    return e.replace(/=.+$/, "")
                }));
                n = t[0].indexOf("?") + 1 ? "&" : "?";
                return (t[0] + n + i + (t.length > 1 ? "#" + t[1] : "")).replace(/\?\&/, "?")
            },
            removeUrlPara: function (e, i) {
                var m = e.split("#"),
                    t = m[0].split("?"),
                    n = t[0],
                    s = t.length > 1 ? t[1] : "",
                    r = m.length > 1 ? "#" + m[1] : "",
                    o = "string" === typeof i && i ? [i] : i.join ? i : [];
                if (!o.length || !s) return n.replace(/\?.+$/, "") + r;
                $.map(o, function (e) {
                    return e.replace(/([\\\(\)\{\}\[\]\^\$\+\-\*\?\|])/g, "\\$1")
                });
                return (n + "?" + s.replace(new RegExp("(?:^|&)(?:" + o.join("|") + ")=[^&$]+", "g"), "").replace(/^&/, "")).replace(/\?$/, "") + r
            },
            fillUrl: function (e) {
                if ("string" !== typeof e || "" == e) return e;
                if (!/^http/i.test(e)) {
                    var i = window.location.port || "80",
                        m = /^\//.test(e);
                    if (!m) e = document.URL.replace(/\/[^\/]*$/g, "/") + e;
                    else e = window.location.protocol + "//" + window.location.host + ("80" == i ? "" : ":" + i) + e
                }
                return e
            },
            addFav: window.sidebar && window.sidebar.addPanel ?
                function (e, i) {
                    window.sidebar.addPanel(i, e, "")
                } : function (e, i) {
                    try {
                        window.external.addFavorite(e, i)
                    } catch (m) {
                        window.alert("请尝试点击 Ctrl + D 来添加！")
                    }
                },
            formatTime: function (e, i) {
                var m = /^\d+$/i.test(e + "") ? +e : Date.parse(e);
                if (isNaN(m)) return e;
                var t = new Date(m),
                    n = function (e) {
                        return ("0" + e).slice(-2)
                    },
                    s = t.getFullYear(),
                    r = t.getMonth() + 1,
                    o = n(r),
                    a = t.getDate(),
                    c = n(a),
                    l = t.getHours(),
                    u = n(l),
                    h = t.getMinutes(),
                    f = n(h),
                    W = t.getSeconds(),
                    d = n(W);
                return (i || "yyyy-MM-dd hh:mm:ss").replace(/yyyy/g, s).replace(/MM/g, o).replace(/M/g, r).replace(/dd/g, c).replace(/d/g, a).replace(/hh/g, u).replace(/h/g, l).replace(/mm/g, f).replace(/m/g, h).replace(/ss/g, d).replace(/s/g, W)
            }
        });
        !
            function (e) {
                var i = {},
                    m = {},
                    t = 0,
                    n = Object.prototype.toString,
                    s = function (e, i) {
                        var m = i || "%",
                            t = new Function("var p=[],my=this,data=my,print=function(){p.push.apply(p,arguments);};p.push('" + e.replace(/[\r\t\n]/g, " ").split("<" + m).join("	").replace(new RegExp("((^|" + m + ">)[^\\t]*)'", "g"), "$1\r").replace(new RegExp("\\t=(.*?)" + m + ">", "g"), "',$1,'").split("	").join("');").split(m + ">").join("p.push('").split("\r").join("\\'") + "');return p.join('');");
                        return t
                    };
                e.template = function (e, r, o) {
                    o = o || "%";
                    var a = "[object Function]" === n.call(e) ? e : !/\W/.test(e) ? m[e + o] = m[e + o] || s(document.getElementById(e).innerHTML, o) : function () {
                        for (var n in i) if (i[n] === e) return m[n];
                        return i[++t] = e, m[t] = s(e, o)
                    }();
                    return r ? a.call(r) : a
                }
            }(window.jQuery || window);
        $.fn.extend({
            disabled: function (e) {
                return this.each(function () {
                    var i = this.bindDownCssFix || "",
                        m = !e ? "disabled" + i : e;
                    $(this).attr("disabled", "disabled").addClass(m)[0].disabled = true
                })
            },
            enabled: function (e) {
                return this.each(function () {
                    var i = this.bindDownCssFix || "",
                        m = !e ? "disabled" + i : e;
                    $(this).removeClass(m).removeAttr("disabled")[0].disabled = false
                })
            },
            disableDrag: function () {
                return this.bind("dragstart", $.falseFn)
            },
            enableDrag: function () {
                return this.unbind("dragstart", $.falseFn)
            }
        });
        !
            function () {
                var e = RegExp.regCompile ? /./.compile("\\{([\\w\\.]+)\\}", "g") : /\{([\w\.]+)\}/g;
                $.format = function (i, m) {
                    var t = true,
                        n, s, r = m === undefined ? null : $.isPlainObject(m) ? (t = false, m) : $.isArray(m) ? m : Array.prototype.slice.call(arguments, 1);
                    if (null === r) return i;
                    n = t ? r.length : 0;
                    s = RegExp.regCompile ? /./.compile("^\\d+$") : /^\d+$/;
                    return String(i).replace(e, function (e, i) {
                        var m = s.test(i),
                            o, a, c;
                        if (m && t) {
                            o = parseInt(i, 10);
                            return o < n ? r[o] : e
                        } else {
                            a = i.split(".");
                            c = r;
                            for (var l = 0; l < a.length; l++) c = c[a[l]];
                            return c === undefined ? e : c
                        }
                    })
                }
            }();
        $.fn.bindTab = function (e, i, m, t, n) {
            if (!$.isFunction(e)) {
                n = t;
                t = m;
                m = i;
                i = e;
                e = $.noop
            }
            return this.each(function () {
                var s = $(this),
                    r, o = (t || "active").split("::"),
                    a = m || "li",
                    c = n || "rel",
                    l = i || "mouseenter",
                    u = "mouseenter" == l,
                    h = function (i) {
                        var m = $(s.find("." + o[0]).removeClass(o[0]).attr(c)),
                            t = $(i.addClass(o[0]).attr(c));
                        if (o[1]) {
                            m.addClass(o[1]);
                            t.removeClass(o[1])
                        } else {
                            m.hide();
                            t.show()
                        }
                        e.call(i[0], t[0])
                    };
                s.delegate(a, l, function () {
                    var e = $(this);
                    if (e.hasClass(o[0]) || this.disabled) return;
                    if (u) {
                        r && window.clearTimeout(r);
                        r = window.setTimeout(function () {
                            h(e)
                        }, 200)
                    } else h(e)
                });
                u && s.delegate(a, "mouseleave", function () {
                    r && window.clearTimeout(r);
                    r = 0
                });
                "a" == a && s.delegate(a, "click", function (e) {
                    e.preventDefault()
                });
                var f = s.find("." + o[0]);
                if (!f[0]) s.find(a).eq(0).addClass(o[0]);
                s.find(a).each(function () {
                    var e = $($(this).attr(c)),
                        i = $(this).hasClass(o[0]);
                    if (o[1]) e[i ? "removeClass" : "addClass"](o[1]);
                    else e[i ? "show" : "hide"]()
                })
            })
        };
        !
            function (e) {
                if (isNaN(new Date("2013-12-09T08:39:15"))) Date.prototype.toJSON = function () {
                    var e = function (e) {
                        return ("0" + e).slice(-2)
                    };
                    return this.getFullYear() + "/" + e(this.getMonth() + 1) + "/" + e(this.getDate()) + " " + e(this.getHours()) + ":" + e(this.getMinutes()) + ":" + e(this.getSeconds())
                };
                if (e.JSON) return;
                var i = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                    m = function (e) {
                        if (/["\\\x00-\x1f]/.test(e)) e = e.replace(/["\\\x00-\x1f]/g, function (e) {
                            var m = i[e];
                            if (m) return m;
                            m = e.charCodeAt();
                            return "\\u00" + Math.floor(m / 16).toString(16) + (m % 16).toString(16)
                        });
                        return '"' + e + '"'
                    },
                    t = function (e) {
                        var i = ["["],
                            m = e.length,
                            t, n, s;
                        for (n = 0; n < m; n++) {
                            s = e[n];
                            switch (typeof s) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    if (t) i.push(",");
                                    i.push(a(s));
                                    t = 1
                            }
                        }
                        i.push("]");
                        return i.join("")
                    },
                    n = function (e) {
                        return e < 10 ? "0" + e : e
                    },
                    s = function (e) {
                        if (e.toJSON) return '"' + e.toJSON() + '"';
                        return '"' + e.getUTCFullYear() + "-" + n(e.getUTCMonth() + 1) + "-" + n(e.getUTCDate()) + "T" + n(e.getUTCHours()) + ":" + n(e.getUTCMinutes()) + ":" + n(e.getUTCSeconds()) + '"'
                    },
                    r = Object.prototype.hasOwnProperty,
                    o = function (e) {
                        var i = ["{"],
                            m, t;
                        for (var n in e) if (r.call(e, n)) {
                            t = e[n];
                            switch (typeof t) {
                                case "undefined":
                                case "unknown":
                                case "function":
                                    break;
                                default:
                                    m && i.push(",");
                                    m = 1;
                                    i.push(a(n) + ":" + a(t))
                            }
                        }
                        i.push("}");
                        return i.join("")
                    },
                    a = function (e) {
                        switch (typeof e) {
                            case "unknown":
                            case "function":
                            case "undefined":
                                return;
                            case "number":
                                return isFinite(e) ? String(e) : "null";
                            case "string":
                                return m(e);
                            case "boolean":
                                return String(e);
                            default:
                                return null === e ? "null" : e instanceof Array ? t(e) : e instanceof Date ? s(e) : o(e)
                        }
                    };
                e.JSON = {
                    parse: function (e) {
                        e = e.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g, "new Date($2)");
                        return new Function("return " + e)()
                    },
                    stringify: function (e) {
                        return a(e)
                    }
                }
            }(window);
        !
            function (e) {
                var i, m = function () { },
                    t = e.document,
                    n = {
                        set: m,
                        get: m,
                        remove: m,
                        clear: m,
                        each: m,
                        obj: m
                    };
                !
                    function () {
                        if ("localStorage" in e) try {
                            i = e.localStorage;
                            return
                        } catch (m) { }
                        var n = t.getElementsByTagName("head")[0],
                            s = e.location.hostname || "localStorage",
                            r = new Date,
                            o, a;
                        if (!n.addBehavior) {
                            try {
                                i = e.localStorage
                            } catch (m) {
                                i = null
                            }
                            return
                        }
                        try {
                            a = new ActiveXObject("htmlfile");
                            a.open();
                            a.write("<s" + "cript>document.w=window;</s" + 'cript><iframe src="/favicon.ico"></frame>');
                            a.close();
                            o = a.w.frames[0].document;
                            n = o.createElement("head");
                            o.appendChild(n)
                        } catch (m) {
                            n = t.getElementsByTagName("head")[0]
                        }
                        try {
                            r.setDate(r.getDate() + 36500);
                            n.addBehavior("#default#userData");
                            n.expires = r.toUTCString();
                            n.load(s);
                            n.save(s)
                        } catch (m) {
                            return
                        }
                        var c, l;
                        try {
                            c = n.XMLDocument.documentElement;
                            l = c.attributes
                        } catch (m) {
                            return
                        }
                        var u = "p__hack_",
                            h = "m-_-c",
                            f = new RegExp("^" + u),
                            W = new RegExp(h, "g"),
                            d = function (e) {
                                return encodeURIComponent(u + e).replace(/%/g, h)
                            },
                            p = function (e) {
                                return decodeURIComponent(e.replace(W, "%")).replace(f, "")
                            };
                        i = {
                            length: l.length,
                            isVirtualObject: true,
                            getItem: function (e) {
                                return (l.getNamedItem(d(e)) || {
                                    nodeValue: null
                                }).nodeValue || c.getAttribute(d(e))
                            },
                            setItem: function (e, i) {
                                try {
                                    c.setAttribute(d(e), i);
                                    n.save(s);
                                    this.length = l.length
                                } catch (m) { }
                            },
                            removeItem: function (e) {
                                try {
                                    c.removeAttribute(d(e));
                                    n.save(s);
                                    this.length = l.length
                                } catch (i) { }
                            },
                            clear: function () {
                                while (l.length) this.removeItem(l[0].nodeName);
                                this.length = 0
                            },
                            key: function (e) {
                                return l[e] ? p(l[e].nodeName) : undefined
                            }
                        };
                        if (!("localStorage" in e)) e.localStorage = i
                    }();
                e.LS = !i ? n : {
                    set: function (e, m) {
                        if (this.get(e) !== undefined) this.remove(e);
                        i.setItem(e, m)
                    },
                    get: function (e) {
                        var m = i.getItem(e);
                        return null === m ? undefined : m
                    },
                    remove: function (e) {
                        i.removeItem(e)
                    },
                    clear: function () {
                        i.clear()
                    },
                    each: function (e) {
                        var i = this.obj(),
                            m = e ||
                                function () { }, t;
                        for (t in i) if (false === m.call(this, t, this.get(t))) break
                    },
                    obj: function () {
                        var e = {},
                            m = 0,
                            t, n;
                        if (i.isVirtualObject) e = i.key(-1);
                        else {
                            t = i.length;
                            for (; m < t; m++) {
                                n = i.key(m);
                                e[n] = this.get(n)
                            }
                        }
                        return e
                    }
                };
                if (e.jQuery) e.jQuery.LS = e.LS
            }(window);
        $.hash = function (e, i) {
            if ("string" === typeof e && i === undefined) return $.getHashPara(e);
            var m = window.location.hash.replace(/^#*/, "").split("&"),
                t = {},
                n = m.length,
                s = 0,
                r, o = {},
                a = {},
                c, l;
            for (; s < n; s++) {
                r = m[s].split("=");
                if (2 == r.length && r[0].length) {
                    l = decodeURIComponent(r[0]);
                    c = l.toLowerCase();
                    if (!a[c]) {
                        o[l] = decodeURIComponent(r[1]);
                        a[c] = l
                    }
                }
            }
            if (e === undefined) return o;
            if ($.isPlainObject(e)) t = e;
            else t[e] = i;
            for (l in t) {
                i = t[l];
                c = l.toLowerCase();
                a[c] && o[a[c]] !== undefined && delete o[a[c]];
                if (null !== i) {
                    a[c] = l;
                    o[l] = String(i)
                }
            }
            m.length = 0;
            for (l in o) m.push(encodeURIComponent(l) + "=" + encodeURIComponent(o[l]));
            window.location.hash = "#" + m.join("&")
        };
        $.cookie = function (e, i, m) {
            if (arguments.length > 1 && (null === i || "object" !== typeof i)) {
                m = $.extend({}, m);
                if (null === i) m.expires = -1;
                if ("number" === typeof m.expires) {
                    var t = m.expires,
                        n = m.expires = new Date;
                    n.setDate(n.getDate() + t)
                }
                return document.cookie = [encodeURIComponent(e), "=", m.raw ? String(i) : encodeURIComponent(String(i)), m.expires ? "; expires=" + m.expires.toUTCString() : "", m.path ? "; path=" + m.path : "", m.domain ? "; domain=" + m.domain : "", m.secure ? "; secure" : ""].join("")
            }
            m = i || {};
            var s, r = m.raw ?
                function (e) {
                    return e
                } : decodeURIComponent;
            return (s = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? r(s[1]) : null
        };
        !
            function () {
                var e = "163.com",
                    i = /\.163\.com$/i,
                    m = function (e) {
                        var m = (e + "").toLowerCase(),
                            t = m.indexOf("http");
                        return t < 0 ? i.test(m) ? m : "" : t ? "" : m.replace(/^https?:\/\//, "").replace(/\/.+$/, "")
                    },
                    t = {},
                    n = {},
                    s = function (e, i) {
                        var r = m(e),
                            o = window.location.host + "",
                            a = t[r],
                            c = e.replace(/\/$/g, "") + "/agent/ajaxAgentV2.htm",
                            l = function (e) {
                                var i = n[r] || [];
                                $.each(i, function (i, m) {
                                    m(e)
                                });
                                n[r] = null
                            };
                        if (c.indexOf("http") < 0) c = "http://" + c;
                        if (!r || r == o) {
                            l($);
                            i($);
                            return
                        }
                        if (a) try {
                            a.__test = +new Date
                        } catch (u) {
                            t[r] = a = null
                        }
                        if (a) {
                            l(a);
                            i(a);
                            return
                        }
                        if (n[r]) {
                            n[r].push(i);
                            return
                        }
                        if (!document.body) {
                            window.setTimeout(function () {
                                s(e, i)
                            }, 1);
                            return
                        }
                        n[r] = n[r] || [];
                        n[r].push(i);
                        var h = document.createElement("iframe");
                        h.src = "about:blank";
                        h.width = 0;
                        h.height = 0;
                        h.setAttribute("frameborder", 0);
                        h.scrolling = "no";
                        document.body.appendChild(h);

                        function f(e, i) {
                            $(h).unbind().bind("load", function () {
                                try {
                                    var m = h.contentWindow.jQuery;
                                    m.__test = +new Date;
                                    t[e] = m;
                                    l(m)
                                } catch (n) {
                                    i && i()
                                }
                            });
                            h.src = c + "?domain=" + e + "&v=" + +new Date
                        }
                        if (r.indexOf(document.domain) > 0) f(document.domain = document.domain);
                        else f(document.domain, function () {
                            if (r.indexOf(document.domain) > 0) f(document.domain);
                            else f("")
                        })
                    },
                    r = function (e) {
                        e = e.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g, "new Date($2)");
                        return new Function("return " + e)()
                    },
                    o = {},
                    a = function (e, t, n, r, o) {
                        var a = window.location.host + "",
                            l = m(t) || a,
                            u = "http:",
                            h = "80",
                            f;
                        if (/^(https?:)/i.test(t)) {
                            u = RegExp.$1.toLowerCase();
                            if (/:(\d+)/i.test(t)) h = RegExp.$1 || "80"
                        } else {
                            u = window.location.protocol;
                            h = window.location.port || "80"
                        }
                        if (window.location.protocol != u || (window.location.port || "80") != h) {
                            f = $.isFunction(r) ? r : $.isFunction(n) ? n : $.noop;
                            f.call(window.Core || window, 2, "", "protocols or ports not match");
                            return
                        }
                        if (i.test(l) && i.test(a) && l.indexOf(document.domain) >= 0 && "http:" == u) s(l, function (i) {
                            c(i, e, t, n, r, o)
                        });
                        else c(jQuery, e, t.replace(/https?:\/\/[^\/]+/, ""), n, r, o)
                    },
                    n = {},
                    c = function (e, i, m, t, s, a) {
                        var c = $.isFunction(s) ? s : $.noop,
                            l = m,
                            u, h, f = window.Core || window,
                            W = false,
                            d = (l.indexOf("?") + 1 ? "&" : "?") + "cache=" + +new Date,
                            p, C;
                        if ($.isFunction(t)) {
                            c = t;
                            t = null;
                            a = s
                        }
                        if (a && 0 == a.indexOf("*")) {
                            W = true;
                            a = a.substr(1)
                        }
                        if (a) {
                            if (0 === a.indexOf("!")) {
                                a = a.substr(1);
                                if (n[a]) {
                                    n[a].push(c);
                                    return
                                }
                                n[a] = [];
                                s = c;
                                c = function () {
                                    var e = arguments,
                                        i = this;
                                    s.apply(i, e);
                                    $.each(n[a], function (m, t) {
                                        t.apply(i, e)
                                    });
                                    delete n[a]
                                }
                            }
                            u = o[a];
                            if (u) {
                                if (0 !== a.indexOf("@")) return;
                                h = u.readyState;
                                if (h > 0 && h < 5) {
                                    try {
                                        u.aborted = true
                                    } catch (g) { }
                                    u.abort()
                                }
                            }
                        }
                        p = i.split(".");
                        C = p.length > 1 ? p[1] : "";
                        u = e.ajax({
                            url: l + (W ? "" : d),
                            type: p[0],
                            data: t,
                            success: function (e, i, m) {
                                delete o[a];
                                if (m.aborted) return;
                                e = m.responseText;
                                if (e == undefined || null == e || "" == e || e.indexOf("<!DOCTYPE") >= 0) {
                                    c.call(f, 1, e, i);
                                    return
                                }
                                if ("JSON" == C) try {
                                    e = r(e)
                                } catch (t) {
                                    c.call(f, 3, m.responseText, i);
                                    return
                                }
                                c.call(f, 0, e, i)
                            },
                            error: function (e, i) {
                                delete o[a];
                                if (!i || "error" == i) {
                                    c.call(f, 1, "", i);
                                    return
                                }
                                if (e.aborted) return;
                                c.call(f, 1, e.responseText, i)
                            }
                        });
                        a && (o[a] = u)
                    };
                $.extend({
                    get2: function (e, i, m, t) {
                        a("GET", e, i, m, t);
                        return this
                    },
                    post2: function (e, i, m, t) {
                        a("POST", e, i, m, t);
                        return this
                    },
                    getJSON2: function (e, i, m, t) {
                        a("GET.JSON", e, i, m, t);
                        return this
                    },
                    postJSON2: function (e, i, m, t) {
                        a("POST.JSON", e, i, m, t);
                        return this
                    }
                })
            }();
        $.bindModule = function (e, i, m) {
            if ("object" != typeof i) {
                m = i;
                i = e;
                e = 0
            }
            var t = e || this;
            $.each(i || {}, function (e, i) {
                i && i.js && $.each(e.split(" "), function (e, n) {
                    if (t[n]) return;
                    var s = [],
                        r = [];
                    var o = t[n] = function () {
                        var e = arguments;
                        s.push(this);
                        r.push(e);
                        if (1 == o.autoLoaded) return;
                        o.autoLoaded = 1;
                        var a = window.setTimeout(function () {
                            o.autoLoaded = 0
                        }, 1e3);
                        i.css && $.loadCss(i.css, m);
                        $.loadJS(i.js, function () {
                            a && window.clearTimeout(a);
                            if (t[n] === o) {
                                window.console && window.console.log("方法" + n + "在" + i.js + "中未被定义！自动加载模块处理失败！");
                                t[n] = $.noop;
                                return
                            }
                            for (var e = r.length, m = 0; m < e; m++) t[n].apply(s[m], r[m]);
                            r.length = 0
                        }, m)
                    }
                })
            });
            return this
        };
        !
            function () {
                var e = {},
                    i = function (i, m, t, n, s) {
                        var r = m.toLowerCase().replace(/#.*$/, "").replace("/?.*$/", ""),
                            o, a, c = $.isFunction,
                            l = e[r] || [],
                            u = !!(t || $.noop)(m),
                            h = window.CollectGarbage || $.noop;
                        if (u) {
                            c(n) && n();
                            return
                        }
                        e[r] = l;
                        if (!l || !l.loaded || t && !u) {
                            c(n) && l.push(n);
                            l.loaded = 1;
                            o = document.createElement(i), a = document.getElementsByTagName("head")[0] || document.documentElement;
                            m = m + (m.indexOf("?") >= 0 ? "&" : "?") + (window.Core ? Core.version : +new Date);
                            if ("link" == i) {
                                o.rel = "stylesheet";
                                o.type = "text/css";
                                o.media = "screen";
                                o.charset = s || "UTF-8";
                                o.setAttribute && o.setAttribute("charset", "UTF-8");
                                o.href = m
                            } else {
                                o.type = "text/javascript";
                                o.charset = s || "UTF-8";
                                o.setAttribute && o.setAttribute("charset", "UTF-8");
                                var f = false;
                                o.onload = o.onreadystatechange = function () {
                                    if (!f && (!this.readyState || {
                                        loaded: 1,
                                        complete: 1
                                    }[this.readyState])) {
                                        f = true;
                                        o.onload = o.onreadystatechange = null;
                                        this.parentNode.removeChild(this);
                                        var i = e[r],
                                            m = i.length,
                                            t = 0;
                                        i.loaded = 2;
                                        for (; t < m; t++) c(i[t]) && i[t]();
                                        i.length = 0;
                                        i = a = o = null;
                                        h()
                                    }
                                };
                                o.src = m
                            }
                            a.appendChild(o, a.lastChild)
                        } else if (2 == l.loaded) {
                            c(n) && n();
                            l = null;
                            h()
                        } else {
                            c(n) && l.push(n);
                            l = null;
                            h()
                        }
                    },
                    m = function (e, i) {
                        if (!i) return e;
                        return /^http/i.test(e) ? e : i.replace(/\/*$/, "") + (0 == e.indexOf("/") ? "" : "/") + e
                    };
                $.extend({
                    loadJS: function (e, t, n, s, r) {
                        if (!$.isFunction(n)) {
                            r = s;
                            s = n;
                            n = t;
                            t = null
                        }
                        if (!$.isFunction(n)) {
                            r = s;
                            s = n;
                            n = null
                        }
                        if (/^http/i.test(s)) {
                            r = s;
                            s = ""
                        }
                        if ($.isArray(e)) {
                            var o = e.length,
                                a = function (c) {
                                    if (c < o) i("script", m(e[c], r), t, function () {
                                        a(c + 1)
                                    }, s);
                                    else $.isFunction(n) && n()
                                };
                            a(0)
                        } else i("script", m(e, r), t, n, s);
                        return this
                    },
                    loadCss: function (e, t) {
                        if ($.isArray(e)) {
                            var n = e.length,
                                s = 0;
                            for (; s < n; s++) i("link", m(e[s], t))
                        } else i("link", m(e, t));
                        return this
                    }
                })
            }();

        function Class() { } !
            function (e) {
                if (e.Class !== Class) e.Class = Class;

                function i() { }
                Class.prototype.log = Class.prototype.warn = i;
                if (e.console) {
                    Class.prototype.log = function () {
                        console.log && console.log.apply(console, arguments)
                    };
                    Class.prototype.warn = function () {
                        console.warn && console.warn.apply(console, arguments)
                    }
                }
                var m = Class.prototype.warn;
                Class.prototype.callSuper = function () {
                    m("父类没有同名方法，不能调用callSuper！")
                };
                Class.extend = function o(e, i) {
                    var a, c, l = this.prototype;
                    if (!i) {
                        i = e;
                        e = ""
                    }
                    if ("object" !== typeof i || !i.hasOwnProperty) {
                        m("继承类的原型数据错误！");
                        return
                    }
                    var u = n(e);
                    if (!u) return;
                    a = new this;
                    for (var h in i) if (i.hasOwnProperty(h)) if ("function" == typeof i[h] && "function" == typeof l[h]) {
                        var f = l[h];
                        if (!f.__isAgent) f = s(r(h + "方法被子类覆盖，但是父类没有同名函数，不能调用callSuper!"), l[h]);
                        a[h] = s(f, i[h])
                    } else a[h] = i[h];

                    function W() { }
                    W.prototype = a;
                    W.prototype.constructor = W;
                    W.extend = o;
                    W.create = t;
                    u(W);
                    return W
                };

                function t() {
                    var e = new this;
                    if (e.init) e.init.apply(e, arguments);
                    return e
                }
                function n(e) {
                    if (!e) return i;
                    if (!/^(?:Base|Tools|Widgets|Game|Page)\./.test(e)) return m("Class命名空间错误，一级命名空间只能是:Base、Tools、Widgets、Game、Page");
                    var t = e.split("."),
                        n = t.length,
                        s = 0,
                        r = Class,
                        o;
                    for (; s < n - 1; s++) {
                        o = t[s];
                        r = r[o] = r[o] || {}
                    }
                    o = t[n - 1];
                    if (r[o]) return m("已经有同名Class存在，请更换名称或路径！");
                    return function (e) {
                        r[o] = e
                    }
                }
                function s(e, i) {
                    var m = function () {
                        var m = this.hasOwnProperty("callSuper"),
                            t = this.callSuper,
                            n;
                        this.callSuper = e;
                        n = i.apply(this, arguments);
                        if (!m) delete this.callSuper;
                        else this.callSuper = t;
                        return n
                    };
                    m.__isAgent = true;
                    return m
                }
                function r(e) {
                    return function () {
                        m(e)
                    }
                }
            }(window);
        !
            function (e) {
                var i = Array.prototype.slice,
                    m = Object.prototype.toString,
                    t = function () { },
                    n = 1,
                    s = function (e) {
                        return "[object Function]" == m.call(e)
                    };
                var r = e.extend({
                    init: function () {
                        this.eventCache = this.eventCache || {}
                    },
                    createEvent: function (e, m) {
                        if ("string" !== typeof e) return;
                        var t = this,
                            n = t.eventCache;
                        $.each(e.split(" "), function (e, r) {
                            n[r] = n[r] || [];
                            m && (t[r] = function (e) {
                                if (s(e)) {
                                    t.bind(r, e);
                                    return this
                                } else return t.trigger.apply(t, [r].concat(i.call(arguments, 0)))
                            })
                        })
                    },
                    trigger: function (e, m) {
                        var t, n = 0,
                            s = this,
                            r = i.call(arguments, 1);
                        if (!isNaN(e) && e && +e > 0) {
                            if ("string" !== typeof m) return 1;
                            t = this.eventCache[m || ""];
                            if (!t) return 2;
                            if (!t.length) return 0;
                            t.paras = r;
                            if (!t.t) t.t = window.setTimeout(function () {
                                delete t.t;
                                s.trigger.apply(s, t.paras)
                            }, parseInt(e, 10) || 200);
                            return 0
                        }
                        if ("number" === typeof e && (isNaN(e) || e < 0)) {
                            if ("string" !== typeof m) return 1;
                            t = this.eventCache[m || ""];
                            if (t) this.warn("事件" + m + "设置的缓冲保护时间不是合法数字")
                        } else {
                            if ("string" !== typeof (e || m)) return 1;
                            t = this.eventCache[e || m || ""]
                        }
                        if (!t) return 2;
                        $.each(t.slice(0), function (e, i) {
                            try {
                                if (false === i.apply(s, r)) n++
                            } catch (m) {
                                s.log(m);
                                return
                            }
                        });
                        return n ? false : 0
                    },
                    bind: function (e, i) {
                        if ("string" !== typeof e) return 1;
                        var m = this.eventCache[e];
                        if (!m) return 2;
                        if (!s(i)) return 3;
                        i.muid = i.muid || n++;
                        m.push(i);
                        return 0
                    },
                    unbind: function (e, i) {
                        if (0 === arguments.length) {
                            this.eventCache = {};
                            return 0
                        }
                        if ("string" !== typeof e) return 1;
                        var m = this.eventCache[e || ""];
                        if (!m) return 2;
                        if (i === undefined) {
                            m.length = 0;
                            return this
                        }
                        if (!s(i)) return 3;
                        for (var t = 0; t < m.length; t++) if (m[t] === i || i.muid && m[t].muid === i.muid) {
                            m.splice(t, 1);
                            t--
                        }
                        return 0
                    },
                    bindOnce: function (e, i) {
                        if ("string" !== typeof e) return 1;
                        var m = this.eventCache[e],
                            t = this;
                        if (!m) return 2;
                        if (!s(i)) return 3;
                        var r = function () {
                            var m = i.apply(this, arguments);
                            t.unbind(e, r);
                            return m
                        };
                        r.muid = i.muid = i.muid || n++;
                        return t.bind(e, r)
                    }
                });
                e.extend("Base.Message", {
                    init: function () {
                        this.__agent = this.__agent || r.create()
                    },
                    bindMsg: function (e, i, m, t) {
                        if (!e || !s(i)) return this;
                        this.__agent.createEvent(e);
                        var n = m ?
                            function () {
                                return i.apply(m, arguments)
                            } : function () {
                                return i.apply(window, arguments)
                            };
                        n.muid = i.muid;
                        this.__agent[t ? "bindOnce" : "bind"](e, n);
                        i.muid = n.muid;
                        return this
                    },
                    bindMsgOnce: function (e, i, m) {
                        return this.bindMsg(e, i, m, 1)
                    },
                    unbindMsg: function (e) {
                        if (!e) return this;
                        this.__agent.unbind.apply(this.__agent, arguments);
                        return this
                    },
                    sendMsg: function (e) {
                        this.__agent.trigger.apply(this.__agent, arguments);
                        return this
                    }
                });
                !
                    function (i, m) {
                        var t = e.Base.Message.create();
                        i.each(["bindMsg", "bindMsgOnce", "unbindMsg", "sendMsg"], function (e, n) {
                            m[n] = i[n] = function () {
                                t[n].apply(t, arguments);
                                return this
                            }
                        })
                    }(window.jQuery || window.Zepto, window.Zepto || window);
                r.extend("Base.Event", {
                    init: function (e) {
                        this.callSuper();
                        this.createEvent(e, true);
                        this.createEvent = t
                    },
                    trigger: function (e) {
                        var i = this.callSuper.apply(this, arguments);
                        if (i && !isNaN(i)) this.warn(["trigger事件名称必须是字符串", "未注册的事件(" + e + ")不能trigger"][i - 1]);
                        if (false === i) return false
                    },
                    bind: function (e) {
                        var i = this.callSuper.apply(this, arguments);
                        if (i) this.warn(["bind事件名称必须是字符串", "未注册的事件(" + e + ")不能bind", "bind(" + e + ")注册事件必须是函数"][i - 1]);
                        return this
                    },
                    unbind: function (e) {
                        if (!e) {
                            this.warn("暂不支持全部事件一次性卸载");
                            return this
                        }
                        this.callSuper.apply(this, arguments);
                        return this
                    },
                    bindOnce: function (e) {
                        var i = this.callSuper.apply(this, arguments);
                        if (i) this.warn(["bindOnce事件名称必须是字符串", "未注册的事件(" + e + ")不能bindOnce", "bindOnce(" + e + ")注册事件必须是函数"][i - 1]);
                        return this
                    }
                })
            }(window.Class);
        !
            function () {
                var e = function (e, i, m) {
                    if (window.addEventListener) e.addEventListener(i, m, !1);
                    else e.attachEvent("on" + i, m)
                };
                var i = function (e, i, m) {
                    if (window.removeEventListener) e.removeEventListener(i, m);
                    else e.detachEvent("on" + i, m)
                };
                var m = {},
                    t, n, s = [],
                    r;
                m.flag = !1;
                m.getDiscoverCss = function () {
                    var e = "";
                    if (this.__coverBackground && this._$supportCss3("animation")) e = -1 != this.__coverBackground.indexOf("background:") ? this.__coverBackground : "";
                    return "position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:rgb(0,0,0); filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6;z-index:1000;" + e
                };
                m.getPanelCss = function (e, i) {
                    return "position:fixed;z-index:10000;left:50%;top:50%;width:" + e + "px;margin-left:-" + e / 2 + "px;height:" + i + "px;margin-top:-" + i / 2 + "px;"
                };
                m.getIframeCss = function () {
                    var e = null;
                    if (this.__iframeShowAnimation) var e = "-webkit-animation:" + this.__iframeShowAnimation + ";-moz-animation:" + this.__iframeShowAnimation + ";-ms-animation:" + this.__iframeShowAnimation + ";-o-animation:" + this.__iframeShowAnimation + ";animation:" + this.__iframeShowAnimation + ";";
                    return "width:100%;height:100%;border:none;background:none;" + (e ? e : "")
                };
                m.setOpacity = function (e, i) {
                    e.style.opacity = i / 100
                };
                m.setWh = function (e, i, m) {
                    e.style.cssText = this.getPanelCss(i, m)
                };
                m.addIframe = function (e, i) {
                    var t = document.getElementById("x-URS-iframe"),
                        n = this._name || "";
                    if (!t) {
                        try {
                            t = document.createElement("<iframe  name='" + n + "' allowTransparency=true ></iframe>")
                        } catch (s) {
                            t = document.createElement("iframe");
                            t.allowTransparency = !0;
                            t.name = n
                        }
                        t.frameBorder = 0;
                        t.id = "x-URS-iframe";
                        t.scrolling = "no";
                        t.style.cssText = this.getIframeCss()
                    }
                    if (i) e.appendChild(t);
                    else {
                        var r = 420,
                            o = 408;
                        if (m.frameSize) {
                            r = m.frameSize.width;
                            o = m.frameSize.height
                        }
                        var a = document.getElementById("x-discover");
                        if (!a) {
                            a = document.createElement("div");
                            a.id = "x-discover";
                            a.style.cssText = this.getDiscoverCss()
                        }
                        var c = document.getElementById("x-panel");
                        if (!c) {
                            c = document.createElement("div");
                            c.id = "x-panel";
                            this._panel = c;
                            c.style.cssText = this.getPanelCss(r, o)
                        }
                        c.appendChild(t);
                        e.appendChild(a);
                        e.appendChild(c);
                        e.style.display = "none"
                    }
                };
                m.initIframe = function () {
                    var e = document.getElementById("x-URS-iframe");
                    window.setTimeout(function () {
                        e.src = t
                    }, 0)
                };
                m._$supportCss3 = function (e) {
                    var i = ["webkit", "Moz", "ms", "o"],
                        m, t = [],
                        n = document.documentElement.style,
                        s = function (e) {
                            return e.replace(/-(\w)/g, function (e, i) {
                                return i.toUpperCase()
                            })
                        };
                    for (m in i) t.push(s(i[m] + "-" + e));
                    t.push(s(e));
                    for (m in t) if (t[m] in n) return !0;
                    return !1
                };
                var o = function () {
                    var e = document.getElementById("x-URS-iframe");
                    var i = window.name || "_parent";
                    var m = {};
                    m.data = n;
                    m.data.from = "URS|";
                    m.origin = "*";
                    m.source = i;
                    u(e.contentWindow, m)
                };
                var a = function () {
                    var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
                    return function (i) {
                        i = i || "";
                        if (e.test(i)) return RegExp.$1;
                        else return "*"
                    }
                }();
                var c = function (e, i) {
                    try {
                        i = i.toLowerCase();
                        if (null === e) return "null" == i;
                        if (void 0 === e) return "undefined" == i;
                        else return Object.prototype.toString.call(e).toLowerCase() == "[object " + i + "]"
                    } catch (m) {
                        return !1
                    }
                };
                var l = function (e, i, m) {
                    if (!e) return "";
                    var t = [];
                    for (var n in e) if (e.hasOwnProperty(n)) {
                        var s = e[n];
                        if (s) if (!c(s, "function")) {
                            if (c(s, "date")) s = s.getTime();
                            else if (c(s, "array")) s = s.join(",");
                            else if (c(s, "object")) s = JSON.stringify(s);
                            if (m) s = encodeURIComponent(s);
                            t.push(encodeURIComponent(n) + "=" + s)
                        } else;
                        else;
                    } else;
                    return t.join(i || ",")
                };
                var u = function () {
                    var e = "MSG|";
                    var i = function (i) {
                        var m = {};
                        i = i || {};
                        m.origin = i.origin || "";
                        m.ref = location.href;
                        m.self = i.source;
                        m.data = JSON.stringify(i.data);
                        return e + l(m, "|", !0)
                    };
                    return function (e, m) {
                        if (window.postMessage) {
                            m = m || {};
                            e.postMessage(JSON.stringify(m.data), a(m.origin))
                        } else s.unshift({
                            w: e,
                            d: escape(i(m))
                        })
                    }
                }();
                window.URS = function (l, u, h) {
                    1 == this._$COM_NUM ? this._$COM_NUM = 1 : this._$COM_NUM = 2;
                    if ("object" == typeof l) h = l;
                    m.frameSize = h.frameSize;
                    m.__coverBackground = h.coverBackground;
                    m.__iframeShowAnimation = h.iframeShowAnimation;
                    window.PTDOM = 0 != h.isHttps ? "https://" : "http://";
                    if (h.cssDomain && h.cssFiles) {
                        m.__cssStr = "cd=" + h.cssDomain + "&cf=" + h.cssFiles;
                        if (-1 != m.__cssStr.indexOf("http://")) m.__cssStr = encodeURIComponent(m.__cssStr)
                    }
                    this.isInclude = document.getElementById(h.includeBox) || 0;
                    m.needPrepare = h.needPrepare || 0;
                    var f, W;
                    if ("string" == typeof u) W = u;
                    if ("string" == typeof l) f = document.getElementById(l);
                    else f = l;
                    if (h.logincb) this.logincb = h.logincb;
                    if (h.closecb) this.closecb = h.closecb;
                    if (h.regcb) this.regcb = h.regcb;
                    r = document.createElement("div");
                    r.id = "x-URS";
                    document.body.appendChild(r);
                    this.box = r;
                    var d = "index.html";
                    if (h.single) {
                        d = "index_dl.html";
                        if ("register" == h.page) d = "index_reg.html"
                    }
                    t = window.PTDOM + "webzj.reg.163.com/out/pub/" + d;
                    if (m.__cssStr) t += "?" + m.__cssStr;
                    n = h || {};
                    try {
                        JSON.stringify(n)
                    } catch (p) {
                        return null
                    }
                    if (!this.isInclude && f && W) e(f, W, this.showIframe);
                    else this.includeBox = this.isInclude;
                    if (m.needPrepare || this.isInclude) this.prepareIframe();
                    var C = function (e) {
                        if (e) e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                    };
                    var g = function (e) {
                        C(e);
                        var i = e.data || "null";
                        B({
                            data: i,
                            origin: a(e.origin)
                        })
                    };
                    var y = this;
                    var B = function (e) {
                        var t = e.data,
                            n = e.origin;
                        var s;
                        if (y.isInclude) s = y.includeBox;
                        else s = m._panel;
                        if (t) {
                            if ("string" == typeof t) try {
                                t = JSON.parse(t)
                            } catch (r) {
                                t = {}
                            }
                            if (!t["URS-READY"] || !y.isInclude && m.needPrepare) {
                                if (t["URS-READY"] && !m._initReady) m._initReady = !0;
                                if (t["URS-CM"] && document.getElementById("x-URS-iframe")) if ("success" == t.type) {
                                    if (y.logincb) y.logincb(t["username"], t["isOther"]);
                                    if (!this.isInclude) {
                                        if (f && W) i(f, W, y.showIframe);
                                        y.closeIframe()
                                    }
                                } else if ("close" == t.type) {
                                    if (y.closecb) y.closecb();
                                    y.closeIframe()
                                } else if ("resize" == t.type || "init" == t.type) {
                                    s.style.width = t.width + "px";
                                    s.style.height = t.height + "px";
                                    if (!y.isInclude) s.style.marginLeft = -1 * t.width / 2 + "px"
                                } else if ("register-success" == t.type) if (y.regcb) y.regcb(t["username"])
                            } else o()
                        }
                    };
                    var v = function () {
                        var e = "MSG|";
                        var i = function (e, i) {
                            var m = c(i, "function") ? i : function (e) {
                                return e === i
                            },
                                t = null;
                            for (var n = 0, s = e.length - 1, r; s > n; n++) {
                                r = e[n];
                                if (m(r)) t = n
                            }
                            return null != t ? t : -1
                        };
                        var m = function () {
                            var e;
                            var m = function (m, t, n) {
                                if (i(e, m.w) < 0) {
                                    e.push(m.w);
                                    n.splice(t, 1);
                                    m.w.name = m.d
                                }
                            };
                            return function () {
                                e = [];
                                if (s && s.length) for (var i = s.length, t; i--; i >= 0) {
                                    t = s[i];
                                    m(t, i, s)
                                }
                                e = null
                            }
                        }();
                        var t = function () {
                            var i = unescape(window.name || "");
                            if (i && 0 == i.indexOf(e)) {
                                window.name = "";
                                var m = i.replace(e, ""),
                                    t = m.split("|"),
                                    n = t.length,
                                    s = {};
                                for (var r = 0; n > r; r++) {
                                    var o = t[r].split("=");
                                    if (!o || !o.length) return;
                                    var c = o.shift();
                                    if (!c) return;
                                    s[decodeURIComponent(c)] = decodeURIComponent(o.join("="))
                                }
                                m = s;
                                var l = (m.origin || "").toLowerCase();
                                if (!l || "*" == l || 0 == location.href.toLowerCase().indexOf(l)) B({
                                    data: m.data || "null",
                                    origin: a(m.ref || document.referrer)
                                })
                            }
                        };
                        return function () {
                            setInterval(m, 100);
                            setInterval(t, 20)
                        }
                    }();
                    var w = function () {
                        if (window.postMessage) e(window, "message", g);
                        else v()
                    };
                    return w()
                };
                URS.prototype.prepareIframe = function () {
                    if (this.isInclude) {
                        m.addIframe(this.includeBox, 1);
                        m.initIframe();
                        this.showIframe()
                    } else {
                        m.addIframe(r);
                        m.initIframe()
                    }
                };
                URS.prototype.showIframe = function (e) {
                    if (!this.isInclude) if (!m.needPrepare) {
                        m.addIframe(r);
                        m.initIframe()
                    } else if (!m._initReady) return;
                    e = e || {};
                    if (e.page) {
                        if (e.page != n.page && n.single) {
                            var i = "index_dl.html";
                            if ("register" == e.page) i = "index_reg.html";
                            t = window.PTDOM + "webzj.reg.163.com/out/pub/" + i;
                            if (m.__cssStr) t += "?" + m.__cssStr
                        }
                        m.initIframe();
                        n.page = e.page
                    }
                    if (m.needPrepare && !m.isInclude) o();
                    r.style.display = "block"
                };
                URS.prototype.closeIframe = function (e) {
                    e = e || {};
                    if (!this.isInclude) {
                        r.style.display = "none";
                        m.initIframe();
                        if (!m.needPrepare) {
                            m.flag = !1;
                            if (navigator.userAgent.indexOf("MSIE") > 0) {
                                var i = document.getElementById("x-URS-iframe"),
                                    t = i.contentWindow;
                                if (i) {
                                    i.src = "about:blank";
                                    try {
                                        t.document.write("");
                                        t.document.clear()
                                    } catch (n) { }
                                }
                                var s = document.getElementById("x-panel");
                                s.removeChild(i);
                                CollectGarbage()
                            }
                            r.innerHTML = ""
                        }
                    } else;
                }
            }();
        !
            function ($) {
                if (!$) return void (window.console && console.log("need jquery."));
                var startAct = function () {
                    var URS = window.URS,
                        globalMsg = $;
                    $.sendMsg = $.sendMsg || $.noop;
                    var cookie = $.cookie,
                        login = function () {
                            "use strict";

                            function e(e) {
                                var i = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)"),
                                    m = i.exec(document.cookie);
                                return m ? decodeURIComponent(m[1]) : ""
                            }
                            var i = {
                                product: "urs",
                                promark: "zCqdWsL",
                                host: "dl.reg.163.com",
                                isHttps: location.protocol.indexOf("https:") + 1,
                                skin: 1,
                                page: "login",
                                placeholder: {
                                    account: "邮箱帐号或手机号",
                                    pwd: "密码"
                                },
                                needUnLogin: 1,
                                defaultUnLogin: 1,
                                needQrLogin: 0,
                                needPrepare: 0,
                                needanimation: 1,
                                single: 0,
                                notFastReg: 0,
                                oauthLogin: ["qq", "weixin"],
                                frameSize: {
                                    width: 420,
                                    height: 480
                                },
                                errMsg: ""
                            },
                                m = {
                                    fillUrl: function (e) {
                                        if ("string" != typeof e || !e || /^(?:http|javascript)/i.test(e)) return e;
                                        if (/^#/.test(e)) return document.URL.replace(/#.*$/, "") + e;
                                        if (/^\//.test(e)) {
                                            var i = ":" + (window.location.port || "80");
                                            return window.location.protocol + "//" + window.location.host + (":80" === i ? "" : i) + e
                                        }
                                        return document.URL.replace(/\/[^\/]*$/g, "/") + e
                                    },
                                    checkOptions: function (e, t, n) {
                                        var s = $.extend(!0, {}, i);
                                        "string" == typeof e && $.extend(s, t || {}, {
                                            successUrl: e
                                        }), $.isFunction(e) && $.extend(s, $.isFunction(t) ? {
                                            cancel: t
                                        } : t || {}, {
                                                callback: e
                                            }), "object" != typeof e || $.isArray(e) || $.extend(s, e || {}), s.successUrl = m.fillUrl(s.successUrl);
                                        var r = s.successUrl || document.URL;
                                        return n === !0 ? s : (s.oauthLoginConfig = function (e) {
                                            var i = ["qq", "weixin", "yixin", "weibo"],
                                                m = {
                                                    wuba: 10,
                                                    qihu: 5,
                                                    alipay: 101
                                                };
                                            return delete s.oauthLogin, $.map(e, function (e) {
                                                var t;
                                                return $.inArray(e, i) >= 0 ? {
                                                    name: e
                                                } : (t = m[e]) ? {
                                                    name: e,
                                                    url: "http://reg.163.com/outerLogin/oauth2/connect.do?target=" + t + "&product=" + s.product
                                                } : void 0
                                            })
                                        }(s.oauthLogin), s.cssFiles = function (e, i) {
                                            return s.cssDomain ? e ? i ? e + "," + i : e : i : ""
                                        }(s.baseCssFiles, s.cssFiles), s.callback = function (e, i) {
                                            return function (m, t) {
                                                if ("giveup" === t) $.isFunction(i) && i();
                                                else {
                                                    if ($.isFunction(e)) return void e(m, t);
                                                    globalMsg.sendMsg("login.jump", m), document.URL.replace(/#.+$/g, "") === r.replace(/#.+$/g, "") ? window.location.reload(!0) : window.location.href = r
                                                }
                                            }
                                        }(s.callback, s.cancel), delete s.successUrl, delete s.cancel, s)
                                    },
                                    uninIdReg: {
                                        qq: /@tencent\.163\.com$/,
                                        weixin: /@wx\.163\.com$/,
                                        yixin: /@yixin\.163\.com$/,
                                        weibo: /@sina\.163\.com$/,
                                        alipay: /@alipay\.163\.com$/,
                                        qihu: /@qh\.163\.com$/,
                                        wuba: /@58\.163\.com$/
                                    },
                                    getSite: function (e) {
                                        var i = e + "";
                                        for (var t in m.uninIdReg) if (m.uninIdReg[t].test(i)) return t
                                    },
                                    cookie: {
                                        getSInfo: function () {
                                            var i = "P_INFO" === this.getPInfo(!0) ? "S_INFO" : "S_OINFO",
                                                m = e(i);
                                            return m.split("|").length > 1 ? m : ""
                                        },
                                        getPInfo: function (i) {
                                            var t = e("S_OINFO") ? "P_OINFO" : "P_INFO";
                                            if (i) return t;
                                            var n = e(t).replace(/\"|\'/g, ""),
                                                s = n.split("|");
                                            if (s.length > 1 && /^.+@.+$/.test(s[0])) {
                                                var r = s[s.length - 1];
                                                return {
                                                    site: m.getSite(s[0]) || "163",
                                                    base: s[0],
                                                    alias: /^1\d{10}@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(r) ? r : s[0]
                                                }
                                            }
                                            return {}
                                        }
                                    }
                                },
                                t = {
                                    getNickName: null,
                                    getURSId: null,
                                    isLogin: null,
                                    onLogin: null,
                                    ursInit: null
                                },
                                n = {},
                                s = function (e, i, s) {
                                    return function () {
                                        if (!n[s]) {
                                            n[s] = !0, window.setTimeout(function () {
                                                n[s] = null
                                            }, 100);
                                            var r = this,
                                                o = Array.prototype.slice.call(arguments, 0),
                                                a = function () {
                                                    i.apply(r, o)
                                                };
                                            e && t[e] ? t[e](m.cookie.getPInfo(), a) : a()
                                        }
                                    }
                                },
                                r = function (e, i) {
                                    var n = m.checkOptions(e, i),
                                        o = function (e, i) {
                                            e.showIframe(i), $(document).unbind("keydown", r.close), $(document).keydown(r.close);
                                            var m = $("#x-panel").css("z-index", 20020),
                                                n = $("#x-discover").css("z-index", 20001);
                                            t.ursInit && t.ursInit(m, n)
                                        };
                                    if (m.urs) return m._callback = n.callback, void o(m.urs, n);
                                    var a = new URS(n);
                                    m._callback = n.callback, m.urs = a, a.logincb = s("onLogin", function (e) {
                                        m.ursId = e, m._callback(e, "login"), globalMsg.sendMsg("login.success", e), globalMsg.sendMsg("login.change")
                                    }, "logincb"), a.regcb = s("onLogin", function (e) {
                                        m.ursId = e, m._callback(e, "reg"), globalMsg.sendMsg("reg.success", e), globalMsg.sendMsg("login.success", e), globalMsg.sendMsg("login.change")
                                    }, "regcb"), a.closecb = s(null, function () {
                                        setTimeout(function () {
                                            globalMsg.sendMsg("login.giveup"), globalMsg.sendMsg("reg.giveup"), m._callback("", "giveup")
                                        }, 100)
                                    }, "closecb"), o(a)
                                };
                            return m.ursId = m.cookie.getSInfo() ? m.cookie.getPInfo().base || "" : "", $.extend(r, {
                                setDefaultConf: function (e) {
                                    $.extend(i, e || {})
                                },
                                hook: function (e, i) {
                                    var m = {};
                                    "string" != typeof e || !$.isFunction(i) && null !== i || (m[e] = i), "object" != typeof e || $.isArray(e) || $.extend(m, e || {});
                                    for (var n in t) $.isFunction(m[n]) && (t[n] = m[n])
                                },
                                setURSId: function (e) {
                                    m.ursId !== e && (e ? s("onLogin", function () {
                                        m.ursId = e, globalMsg.sendMsg("login.success", e), globalMsg.sendMsg("login.change")
                                    }, "setId")() : (m.ursId = e, globalMsg.sendMsg("login.off"), globalMsg.sendMsg("login.change")))
                                },
                                getNickName: function () {
                                    var e = m.cookie.getPInfo(),
                                        i = this.getURSId();
                                    e.base !== i && (e.base = e.alias = i, e.site = m.getSite(i) || "163");
                                    var n = t.getNickName ? t.getNickName(e) : e.alias;
                                    return n || ""
                                },
                                getURSId: function () {
                                    var e = m.ursId;
                                    return t.getURSId ? t.getURSId(e, m.cookie.getSInfo(), m.cookie.getPInfo()) : e
                                },
                                getSite: function (e) {
                                    return m.getSite(e || this.getURSId()) || "163"
                                },
                                isLogin: function () {
                                    var e = m.ursId;
                                    return !!(t.isLogin ? t.isLogin(e, m.cookie.getSInfo(), m.cookie.getPInfo()) : e)
                                },
                                close: function (e) {
                                    e && void 0 !== e.keyCode && 27 !== e.keyCode || m.urs && $("#x-panel")[0] && m.urs.closeIframe()
                                },
                                reg: function (e, i) {
                                    var t = m.checkOptions(e, i, !0);
                                    t.page = "register", r(t)
                                }
                            }), r.getAccount = r.getNickName, r
                        }();
                    login.drag = function () {
                        var options = {
                            top: 25,
                            width: "90%",
                            height: 70,
                            miniShow: 80
                        },
                            isIE6789 = navigator.userAgent.indexOf("MSIE 9") > 0 || eval('"\\v"=="v"'),
                            hookFn = function (e, i) {
                                if ($ && $.fn && $.fn.bindDrag && e && e[0]) {
                                    var m = $("<div>").css({
                                        position: "absolute",
                                        top: isIE6789 ? 0 : options.top,
                                        left: 0,
                                        width: options.width,
                                        height: options.height,
                                        opacity: 0,
                                        filter: "alpha(opacity=0)",
                                        backgroud: "#000",
                                        zIndex: 102
                                    }),
                                        t = $("<div>").css({
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            opacity: 0,
                                            filter: "alpha(opacity=0)",
                                            zIndex: 101
                                        }).hide();
                                    e.prepend(t), e.prepend(m);
                                    var n, s, r, o = "fixed" == e.css("position").toLowerCase(),
                                        a = o ?
                                            function (e) {
                                                return {
                                                    left: e[0].offsetLeft,
                                                    top: e[0].offsetTop
                                                }
                                            } : function (e) {
                                                return e.offset()
                                            };
                                    m.css("cursor", "move").bindDrag({
                                        dragStart: function (i) {
                                            n = a(e), s = [i.pageX, i.pageY], r = {
                                                marginLeft: e.css("marginLeft"),
                                                marginTop: e.css("marginTop")
                                            }, e.css({
                                                marginLeft: "",
                                                marginTop: "",
                                                left: n.left,
                                                top: n.top,
                                                right: "",
                                                bottom: ""
                                            }), t.show()
                                        },
                                        onDrag: function (i) {
                                            e.css({
                                                left: n.left + i.pageX - s[0],
                                                top: n.top + i.pageY - s[1]
                                            })
                                        },
                                        dragEnd: function () {
                                            var i = a(e),
                                                m = $(window),
                                                n = [m.width(), m.height()],
                                                s = [e.width(), e.height()],
                                                c = o ? [0, 0] : [m.scrollTop(), m.scrollLeft()],
                                                l = {},
                                                u = function () {
                                                    l.left -= +(r.marginLeft.replace(/[^\d\-\.]/g, "") || 0), l.top -= +(r.marginTop.replace(/[^\d\-\.]/g, "") || 0), e.css(r).css(l)
                                                };
                                            l.top = Math.max(c[0] - options.top + 5, Math.min(i.top, n[1] - (options.miniShow + options.top) + c[0])), l.left = Math.min(n[0] - options.miniShow + c[1], Math.max(i.left, options.miniShow - s[0] + c[1])), l.top != i.top || l.left != i.left ? e.animate(l, 200, u) : u(), t.hide()
                                        }
                                    })
                                }
                            };
                        return {
                            hookFn: hookFn,
                            init: function (e, i) {
                                var m = e || {};
                                $.each(["top", "height", "miniShow"], function (e) {
                                    var i = m[e];
                                    isNaN(i) ? void 0 !== i && delete m[e] : m[e] = parseInt(i, 10)
                                }), $.extend(options, m), i || login.hook("ursInit", hookFn)
                            }
                        }
                    }(), $.login = login
                };
                if ($(document).ready(function () {
                    !
                        function (name, conf) {
                            var isLowerIE = eval('"\\v"=="v"');
                            if (!isLowerIE) {
                                var make = function (e, i) {
                                    var m, t = [];
                                    for (var n in conf) m = (conf[n] + "").split(","), t.push([n, "%{", m.length > 1 ? "opacity:" + m[1] + ";" : "", i + ":scale(", m[0], ");", "}"].join(""));
                                    return "@" + e + " " + name + "{" + t.join("") + "}"
                                },
                                    aniStyle = make("-webkit-keyframes", "-webkit-transform") + make("keyframes", "transform"),
                                    style = document.createElement("style"),
                                    head = document.head || document.getElementsByTagName("head")[0],
                                    textNode = document.createTextNode(aniStyle);
                                head.appendChild(style), style.type = "text/css", style.appendChild(textNode)
                            }
                        }("loginPopAni", {
                            0: "0,0",
                            15: .667,
                            25: .867,
                            40: 1,
                            55: 1.05,
                            70: 1.08,
                            85: "1.05,1",
                            100: "1,1"
                        })
                }), window.URS) return $.loginReady = function (e) {
                    e && e()
                }, startAct();
                var URSJS = "//webzj.reg.163.com/webapp/javascript/message.js?" +
                    function (e) {
                        return [e.getFullYear(), e.getMonth() + 1, e.getDate(), parseInt(e.getHours() / 6)].join("_")
                    }(new Date), getHolderFn = function () {
                        var e = {},
                            i = function (i) {
                                return e[i] = e[i] || [], function () {
                                    e[i].push(Array.prototype.slice.call(arguments, 0))
                                }
                            };
                        return i.clearKey = function (i, m, t) {
                            $.each(e[i], function (e, i) {
                                m.apply(t, i)
                            }), delete e[i]
                        }, i
                    }();
                $.login = getHolderFn("a"), $.login.reg = getHolderFn("b"), $.login.hook = getHolderFn("c"), $.login.setDefaultConf = getHolderFn("d");
                var readyCache = [];
                $.loginReady = function (e) {
                    e && readyCache ? readyCache.push(e) : e && e()
                }, function (e, i) {
                    var m = document.getElementsByTagName("head")[0] || document.documentElement || document.body,
                        t = document.createElement("script");
                    t.type = "text/javascript", t.charset = "UTF-8";
                    var n = !1;
                    t.onload = t.onreadystatechange = function () {
                        n || this.readyState && !{
                            loaded: 1,
                            complete: 1
                        }[this.readyState] || (n = !0, t.onload = t.onreadystatechange = null, this.parentNode.removeChild(this), i && i(), m = t = null)
                    }, t.src = e, m.appendChild(t, m.lastChild)
                }(URSJS, function () {
                    startAct(), getHolderFn.clearKey("d", $.login.setDefaultConf, $.login), getHolderFn.clearKey("c", $.login.hook, $.login), getHolderFn.clearKey("b", $.login.reg, $.login), getHolderFn.clearKey("a", $.login, $), $.each(readyCache || [], function (e, i) {
                        i()
                    }), readyCache = null
                })
            }(window.jQuery);
        !
            function (e) {
                var i = window.jQuery;
                e(window, i, (i || {}).login)
            }(function (e, i, m, t) {
                var n = e.document,
                    s = encodeURIComponent,
                    r = n.URL,
                    o = e.console ?
                        function (e) {
                            console.log(e)
                        } : function () { };
                if (!i || !m || !i.format || !i.safeHTML) {
                    o("easyNav依赖的模块尚未加载!");
                    return
                }
                var a = {
                    appName: "",
                    appId: "",
                    home: e.location.protocol + "//" + e.location.host,
                    regUrl: "http://reg.163.com/reg/mobileAliasReg.do?product={appId}&url=" + s(r) + "&loginurl=" + s(r),
                    loginUrl: "javascript:easyNav.login()",
                    logoutUrl: "http://reg.163.com/Logout.jsp?username={username}&url=" + s(r),
                    welcomeUser: "{time}好，{nameHolder}<span id='mailInfoHolder'></span>，欢迎来到{appName}！{logoutLink}",
                    welcomeGuest: "欢迎来到{appName}！{loginLink} {regLink}",
                    logoutTxt: "安全退出",
                    loginTxt: "请登录",
                    regTxt: "免费注册",
                    funcEntry: true,
                    mailInfoConf: {
                        infoTmpl: "( {0})",
                        holderId: "mailInfoHolder"
                    }
                },
                    c = {
                        mails: {
                            "163.com": "http://entry.mail.163.com/coremail/fcg/ntesdoor2?verifycookie=1&lightweight=1",
                            "126.com": "http://entry.mail.126.com/cgi/ntesdoor?verifycookie=1&lightweight=1&style=-1",
                            "yeah.net": "http://entry.yeah.net/cgi/ntesdoor?verifycookie=1&lightweight=1&style=-1",
                            "188.com": "http://reg.mail.188.com/servlet/enter",
                            "vip.163.com": "http://reg.vip.163.com/enterMail.m?enterVip=true",
                            "vip.126.com": "http://reg.vip.126.com/enterMail.m"
                        },
                        entrys: [{
                            text: "进入我的通行证",
                            url: "http://reg.163.com/Main.jsp?username={ursId}"
                        }, function (e) {
                            if (!e || !e.username || e.username.indexOf("@") < 0) return;
                            var i = e.username.split("@")[1],
                                m = c.mails[i];
                            if (!i) return;
                            return {
                                text: "进入我的邮箱",
                                url: m
                            }
                        }, {
                            text: "进入网易支付",
                            url: "http://epay.163.com/index.jsp#from=jsdh"
                        }, {
                            text: "进入我的贵金属",
                            url: "http://fa.163.com/#from=jsdh"
                        }, {
                            text: "进入我的彩票",
                            url: "//caipiao.163.com/#from=jsdh"
                        }, {
                            text: "进入我的车险",
                            url: "http://baoxian.163.com/car/#from=jsdh"
                        }, {
                            text: "进入我的博客",
                            url: "http://blog.163.com/passportIn.do?entry={from}"
                        }, {
                            text: "进入我的海购",
                            url: "http://dwz.cn/2c8tit"
                        }]
                    },
                    l = {
                        init: function (e, i) {
                            if (!e || !e.appName || !e.appId) {
                                o("easyNav配置错误：初始化缺少appName和appId.");
                                return
                            }
                            u.setWrap(i);
                            l.setConf(e)
                        },
                        setConf: function (e) {
                            u.checkOptions(e);
                            this.repaint()
                        },
                        repaint: function () {
                            if (!u.wrap) return;
                            u.wrap.empty().html(u.getHTML());
                            var m = i("#user163Box")[0];
                            if (m) l.bindDropMenu(m, i("#user163List")[0], "mouseover", "user163BoxActive", i.noop, 200);
                            var t = i("#" + u.options.mailInfoConf.holderId);
                            if (t[0]) {
                                e.mailInfoConf = u.options.mailInfoConf;
                                i.getScript("http://pimg1.126.net/caipiao/js2/popularize/mail.js?2014")
                            }
                        },
                        login: m,
                        login2: function (e, t) {
                            return m(e || i.noop, t)
                        },
                        isLogin: function () {
                            return m.isLogin()
                        },
                        onLogin: function (e) {
                            if (i.isFunction(e)) i.bindMsg("login.success", e);
                            if (m.isLogin && m.isLogin()) e(m.getSite(), m.getURSId());
                            l.repaint()
                        },
                        bindDropMenu: function (m, t, n, s, r, o, a, c) {
                            var l = r || i.noop,
                                u, h = {
                                    mouseout: function (n) {
                                        var r = n.relatedTarget || n.toElement;
                                        if (r !== this && !i.contains(this, r) && r !== t && !i.contains(t, r)) {
                                            if (!f) t.style.display = "none";
                                            i(m).removeClass(s);
                                            c && c()
                                        }
                                        u && e.clearTimeout(u)
                                    }
                                },
                                f = i.contains(m, t);
                            h[n || "click"] = function (m) {
                                if (o && (n || "").indexOf("mouse") >= 0) {
                                    var r = this;
                                    u && e.clearTimeout(u);
                                    u = e.setTimeout(function () {
                                        u = 0;
                                        if (!f) t.style.display = "block";
                                        i(r).addClass(s);
                                        a && a(m)
                                    }, o)
                                } else {
                                    if (!f) t.style.display = "block";
                                    i(this).addClass(s);
                                    a && a(m)
                                }
                                i.contains(t, m.target) || m.preventDefault()
                            };
                            i(m).bind(h);
                            i(t).bind({
                                mouseout: function (t) {
                                    var n = t.relatedTarget;
                                    if (n !== this && !i.contains(this, n) && n !== m && !i.contains(m, n)) {
                                        if (!f) this.style.display = "none";
                                        i(m).removeClass(s);
                                        c && c(t)
                                    }
                                    u && e.clearTimeout(u)
                                },
                                click: function (e) {
                                    var n = "a" == e.target.tagName.toLowerCase() ? e.target : "a" == e.target.parentNode.tagName.toLowerCase() ? e.target.parentNode : null;
                                    if (!n || false !== l.call(n, e)) {
                                        if (!f) t.style.display = "none";
                                        i(m).removeClass(s);
                                        c && c(e)
                                    }
                                }
                            })
                        }
                    },
                    u = {
                        setWrap: function (e) {
                            this.wrap = this.wrap || i(e || "#topNavLeft")
                        },
                        checkOptions: function (e) {
                            var m = this.options || i.extend({}, a),
                                n = e || {};
                            i.each(a, function (e, i) {
                                m[e] = n[e] !== t ? n[e] : m[e]
                            });
                            m.loginUrl = m.loginUrl || "javascript:easyNav.login()";
                            i.each(m, function (e, t) {
                                if ("string" === typeof t) m[e] = i.format(t, m)
                            });
                            this.options = m
                        },
                        checkData: function () {
                            var e = this.options;
                            this.data = {
                                loginLink: u.getUrl(e.loginUrl, e.loginTxt),
                                logoutLink: u.getUrl(e.logoutUrl, e.logoutTxt),
                                regLink: u.getUrl(e.regUrl, e.regTxt),
                                time: u.getTimeDesc(),
                                nickName: i.safeHTML(m.getAccount()),
                                nameHolder: function () {
                                    var t = m.getSite(),
                                        n = i.isFunction(e.funcEntry) ? e.funcEntry(t) : e.funcEntry;
                                    if (null === n || false === n) return m.getAccount();
                                    if (true === n) return u.get163Entry(m.getAccount());
                                    if (n) return i.safeHTML(n + "");
                                    if ("163" === m.getSite()) return u.get163Entry();
                                    return i.safeHTML(m.getAccount())
                                }()
                            }
                        },
                        getUrl: function (e, t) {
                            var n = /^javascript:/i.test(e) ? 'javascript:void(0);" onclick="' + e.substring(11) : e;
                            n = i.format(n, {
                                username: s(m.getURSId())
                            });
                            return '<a href="' + n + '">' + t + "</a>"
                        },
                        getHTML: function () {
                            this.checkData();
                            return i.format(this.options[m.isLogin() ? "welcomeUser" : "welcomeGuest"], this.data)
                        },
                        getTimeDesc: function () {
                            var e = (new Date).getHours();
                            return e > 5 && e <= 11 ? "上午" : e > 11 && e <= 13 ? "中午" : e > 13 && e <= 17 ? "下午" : e > 17 || e <= 2 ? "晚上" : "凌晨"
                        },
                        get163Entry: function (e) {
                            var t = ['<span id="user163Box">', '<a href="{link}" target="_blank" hideFocus="true" id="user163Name" title="{username}"><em>{username}</em></a>', '<i id="userBoxArrow"></i><div id="user163List">{list}</div></span>'].join(""),
                                n = '<a target="_blank" href="{url}">{text}</a>',
                                s = [];
                            var r = {
                                ursId: i.safeHTML(m.getURSId()),
                                username: i.safeHTML(e || m.getURSId()),
                                from: u.options.appId
                            },
                                o = u.tools.getUrlDomain();
                            i.each(c.entrys, function (e, m) {
                                var t = i.extend({}, i.isFunction(m) ? m(r) : m);
                                if (t && t.text && t.url) {
                                    var a = t.domain || u.tools.getUrlDomain(t.url);
                                    if (!u.tools.checkUrlDomain(o, a)) {
                                        t.url = i.format(t.url, r);
                                        s.push(i.format(n, t));
                                        if (1 === s.length) r.link = t.url
                                    }
                                }
                            });
                            r.link = r.link || "#";
                            r.list = s.join("");
                            return i.format(t, r)
                        },
                        tools: {
                            getUrlDomain: function (e) {
                                var i = (e || n.URL).replace(/\?.*$/g, "").replace(/#.*$/g, "");
                                if (/^[^:]+:\/\/([^\/\?\#]+).*$/gi.test(i)) return RegExp.$1;
                                return i
                            },
                            checkUrlDomain: function (e, i) {
                                return new RegExp(i + "$", "i").test(e)
                            }
                        }
                    };
                e.easyNav = l;
                i.bindMsg("login.change", function () {
                    l.repaint()
                })
            })
    }(window, jQuery);
!
    function () {
        var e = [68, 97, 36, 7, 80, 69, 22, 67, 14, 5, 2, 0, 1423857449, -2, 3, -3, 3432918353, 1555261956, 4, 2847714899, -4, 5, -5, 2714866558, 1281953886, 6, -6, 198958881, 1141124467, 2970347812, -7, 7, 3110523913, 8, -8, 2428444049, -9, 9, 10, -10, 828e5, -11, 11, 2563907772, -12, 12, 13, 2282248934, -13, 2154129355, -14, 14, 15, -15, 16, -16, 17, -17, -18, 18, 19, -19, 20, -20, 21, -21, -22, 22, -23, 23, 24, -24, 25, -25, -26, 26, 27, -27, 28, -28, 29, -29, 30, -30, 31, -31, 33, -33, -32, 32, -34, -35, 34, 35, 37, -37, 36, -36, 38, 39, -39, -38, 40, 41, -41, -40, 42, -43, -42, 43, 45, -45, -44, 44, 47, -46, -47, 46, 48, -49, -48, 49, -50, 51, -51, 50, 570562233, 53, -52, 52, -53, -54, -55, 55, 54, 503444072, 57, -56, -57, 56, 59, 58, -59, -58, 60, 61, -61, -60, 62, 63, -63, -62, -64, 711928724, -66, 67, -65, 65, -67, 66, 64, -71, -69, 69, 68, 70, -68, -70, 71, -72, 3686517206, -74, -73, 73, 75, 74, -75, 72, -79, 76, 79, 78, -78, -76, 77, -77, 3554079995, -81, 81, -82, -83, 80, -80, 82, 83, -84, 84, 85, -86, -87, 86, -85, 87, 90, -88, -89, -90, 88, 89, 91, -91, 94, 92, 95, -94, 93, -93, -95, -92, -98, 97, 98, -97, -99, 96, 99, -96, -100, 3272380065, 102, -102, -101, -103, 103, 100, 101, -107, -104, 105, 104, 106, -106, -105, 107, 109, -109, -108, -111, 110, -110, 111, 108, 251722036, 115, -115, 112, -114, -112, 113, 114, -113, -117, 119, -116, -119, 117, -118, 118, 116, 123, -120, 122, -121, 120, -122, -123, 121, 125, 127, 3412177804, -127, 126, -126, 124, -125, -124, -128, 128, -129, 1843258603, 3803740692, 984961486, 3939845945, 4195302755, 4066508878, 255, 1706088902, 256, 1969922972, 365, 2097651377, 376229701, 853044451, 752459403, 1e3, 426522225, 3772115230, 615818150, 3904427059, 4167216745, 4027552580, 3654703836, 1886057615, 879679996, 3518719985, 3244367275, 2013776290, 3373015174, 1759359992, 285281116, 1622183637, 1006888145, 1e4, 1231636301, 83908371, 1090812512, 2463272603, 1373503546, 2596254646, 2321926636, 1504918807, 2181625025, 2882616665, 2747007092, 3009837614, 3138078467, 397917763, 81470997, 829329135, 2657392035, 956543938, 2517215374, 2262029012, 40735498, 2394877945, 3266489909, 702138776, 2808555105, 2936675148, 1258607687, 1131014506, 3218104598, 3082640443, 1404277552, 565507253, 534414190, 1541320221, 1913087877, 2053790376, 1789927666, 3965973030, 3826175755, 4107580753, 4240017532, 1658658271, 3579855332, 3708648649, 3453421203, 3317316542, 936e5, 1873836001, 1742555852, 461845907, 3608007406, 1996959894, 3747672003, 3485111705, 2137656763, 3352799412, 213261112, 3993919788, 1.01, 3865271297, 4139329115, 4275313526, 282753626, 1068828381, 2768942443, 2909243462, 936918e3, 3183342108, 27492, 141376813, 3050360625, 654459306, 2617837225, 1454621731, 2489596804, 2227061214, 1591671054, 2362670323, 4294967295, 1308918612, 2246822507, 795835527, 1181335161, 414664567, 4279200368, 1661365465, 1037604311, 4150417245, 3887607047, 1802195444, 4023717930, 2075208622, 1943803523, 901097722, 628085408, 755167117, 3322730930, 3462522015, 3736837829, 3604390888, 2366115317, .4, 2238001368, 2512341634, 2647816111, -.2, 314042704, 1510334235, 58964, 1382605366, 31158534, 450548861, 3020668471, 1119000684, 3160834842, 2898065728, 1256170817, 2765210733, 3060149565, 3188396048, 2932959818, 124634137, 2797360999, 366619977, 62317068, -.26, 1202900863, 498536548, 1340076626, 2405801727, 2265490386, 1594198024, 1466479909, 2547177864, 249268274, 2680153253, 2125561021, 3294710456, 855842277, 3423369109, .732134444, 3705015759, 3569037538, 1994146192, 1711684554, 1852507879, 997073096, 733239954, 4251122042, 601450431, 4111451223, 167816743, 3855990285, 3988292384, 3369554304, 3233442989, 3495958263, 3624741850, 65535, 453092731, -.9, 2094854071, 1957810842, 325883990, 4057260610, 1684777152, 4189708143, 3915621685, 162941995, 1812370925, 3775830040, 783551873, 3134207493, 1172266101, 2998733608, 2724688242, 1303535960, 2852801631, 112637215, 1567103746, 651767980, 1426400815, 906185462, 2211677639, 1047427035, 2344532202, 2607071920, 2466906013, 225274430, 544179635, 2176718541, 2312317920, 1483230225, 1342533948, 2567524794, 2439277719, 1088359270, 671266974, 1219638859, 953729732, 3099436303, 2966460450, 817233897, 2685067896, 2825379669, 4089016648, 4224994405, 3943577151, 3814918930, 476864866, 1634467795, 335633487, 1762050814, 1, 2044508324, -1, 3401237130, 3268935591, 3524101629, 3663771856, 1907459465];
        !
            function () {
                function i() {
                    var i = "BhsC3imWy4Kde62G".split("");
                    this.d = function (m) {
                        if (null == m || void 0 == m) return m;
                        if (m.length % e[10] != e[11]) throw Error("1100");
                        for (var t = [], n = e[11]; n < m.length; n++) {
                            n % e[10] == e[11] && t.push("%");
                            for (var s = i, r = e[11]; r < s.length; r++) if (m.charAt(n) == s[r]) {
                                t.push(r.toString(e[54]));
                                break
                            }
                        }
                        return decodeURIComponent(t.join(""))
                    }
                }
                var m = (new i).d,
                    t = (new i).d,
                    n = (new i).d,
                    s = (new i).d,
                    r = (new i).d;
                !
                    function () {
                        function i(i, m) {
                            if (null == i) return null;
                            for (var t = v(m), n = [], s = i.length, r = e[11]; r < s; r++) n.push(y(i[r], t--));
                            return n
                        }
                        function o(i, m) {
                            if (null == i) return null;
                            for (var t = v(m), n = [], s = i.length, r = e[11]; r < s; r++) n.push(B(i[r], t++));
                            return n
                        }
                        function a(i) {
                            if (null == i) return null;
                            for (var m = [], t = e[11], n = i.length; t < n; t++) {
                                var s = i[t];
                                m[t] = ni[(s >>> e[18] & e[52]) * e[54] + (s & e[52])]
                            }
                            return m
                        }
                        function c(i) {
                            var m = [];
                            if (null == i || void 0 == i || i.length == e[11]) return h(ri);
                            if (i.length >= ri) {
                                var m = e[11],
                                    n = [];
                                if (null != i && i.length != e[11]) {
                                    if (i.length < ri) throw Error(t("ChCBCBCC"));
                                    for (var s = e[11]; s < ri; s++) n[s] = i[m + s]
                                }
                                return n
                            }
                            for (n = e[11]; n < ri; n++) m[n] = i[n % i.length];
                            return m
                        }
                        function l(i) {
                            var t = e[401];
                            if (null != i) for (var n = e[11]; n < i.length; n++) t = t >>> e[33] ^ ti[(t ^ i[n]) & e[295]];
                            i = W(t ^ e[401]);
                            t = i.length;
                            if (null == i || t < e[11]) i = new String(m(""));
                            else {
                                for (var n = [], s = e[11]; s < t; s++) n.push(C(i[s]));
                                i = n.join(m(""))
                            }
                            return i
                        }
                        function u(i, o, a) {
                            var c, l = [n("WW"), s("3C"), m("Ch"), n("Wi"), r("3e"), r("36"), m("WB"), t("CW"), t("mW"), t("34"), t("mK"), t("m2"), s("ih"), m("33"), m("3h"), t("iC"), t("sG"), n("my"), m("C3"), t("i4"), s("sd"), r("Wm"), r("mi"), t("iK"), m("mh"), t("mm"), m("WC"), m("32"), m("Cs"), m("3K"), t("CB"), t("mC"), r("3W"), t("3m"), m("W3"), s("im"), m("Wh"), t("C4"), r("i3"), t("3y"), n("md"), t("iW"), m("Ws"), s("WK"), s("ms"), t("3i"), r("Wy"), s("iB"), m("is"), n("m4"), m("Cy"), t("mG"), t("m6"), m("ii"), s("3s"), s("3G"), n("iy"), n("Ci"), t("W4"), n("CC"), t("3d"), t("me"), n("ie"), m("m3")],
                                u = n("Cm"),
                                h = [];
                            if (a == e[536]) a = i[o], c = e[11], h.push(l[a >>> e[10] & e[149]]), h.push(l[(a << e[18] & e[118]) + (c >>> e[18] & e[52])]), h.push(u), h.push(u);
                            else if (a == e[10]) a = i[o], c = i[o + e[536]], i = e[11], h.push(l[a >>> e[10] & e[149]]), h.push(l[(a << e[18] & e[118]) + (c >>> e[18] & e[52])]), h.push(l[(c << e[10] & e[144]) + (i >>> e[25] & e[14])]), h.push(u);
                            else if (a == e[14]) a = i[o], c = i[o + e[536]], i = i[o + e[10]], h.push(l[a >>> e[10] & e[149]]), h.push(l[(a << e[18] & e[118]) + (c >>> e[18] & e[52])]), h.push(l[(c << e[10] & e[144]) + (i >>> e[25] & e[14])]), h.push(l[i & e[149]]);
                            else throw Error(n("ChCBChCB"));
                            return h.join(r(""))
                        }
                        function h(i) {
                            for (var m = [], t = e[11]; t < i; t++) m[t] = e[11];
                            return m
                        }
                        function f(i, m, t, s, r) {
                            if (null != i && i.length != e[11]) {
                                if (null == t) throw Error(n("ChCBCBC3"));
                                if (i.length < r) throw Error(n("ChCBCBCC"));
                                for (var o = e[11]; o < r; o++) t[s + o] = i[m + o]
                            }
                        }
                        function W(i) {
                            var m = [];
                            m[e[11]] = i >>> e[70] & e[295];
                            m[e[536]] = i >>> e[54] & e[295];
                            m[e[10]] = i >>> e[33] & e[295];
                            m[e[14]] = i & e[295];
                            return m
                        }
                        function d(i) {
                            if (null == i || void 0 == i) return i;
                            i = encodeURIComponent(i);
                            for (var t = [], n = i.length, o = e[11]; o < n; o++) if (i.charAt(o) == r("si")) if (o + e[10] < n) t.push(p(i.charAt(++o) + m("") + i.charAt(++o))[e[11]]);
                            else throw Error(s("ChCBCBC4"));
                            else t.push(i.charCodeAt(o));
                            return t
                        }
                        function p(i) {
                            if (null == i || i.length == e[11]) return [];
                            i = new String(i);
                            for (var m = [], t = i.length / e[10], n = e[11], s = e[11]; s < t; s++) {
                                var r = parseInt(i.charAt(n++), e[54]) << e[18],
                                    o = parseInt(i.charAt(n++), e[54]);
                                m[s] = v(r + o)
                            }
                            return m
                        }
                        function C(i) {
                            var t = [];
                            t.push(mi[i >>> e[18] & e[52]]);
                            t.push(mi[i & e[52]]);
                            return t.join(m(""))
                        }
                        function g(i, m) {
                            if (null == i || null == m || i.length != m.length) return i;
                            for (var t = [], n = e[11], s = i.length; n < s; n++) t[n] = y(i[n], m[n]);
                            return t
                        }
                        function y(e, i) {
                            e = v(e);
                            i = v(i);
                            return v(e ^ i)
                        }
                        function B(e, i) {
                            return v(e + i)
                        }
                        function v(i) {
                            if (i < e[286]) return v(e[287] - (e[286] - i));
                            if (i >= e[286] && i <= e[278]) return i;
                            if (i > e[278]) return v(e[288] + i - e[278]);
                            throw Error(t("ChCBCBCh"))
                        }
                        function w(i) {
                            function o() {
                                for (var i = [r("3hmsmhm3m4sB36i3sB3CmGm2m3mim2WCmim3sB3em4mWmyW3"), r("3hm3mGmsmisB3mmhm2mWWCmGm2mWsBiCW3m3"), m("3hm3mGmsmisB3ymimsWsmiWW"), s("3hm3mGmsmisB36m4m2mWsBiCW3m3"), s("3hmWmim2mCW4sB3m3s"), s("3hWsmhms"), n("3hWsmhmsm4mCsBi3W4WBmiWCmiW3W3m4m2mW"), n("3hWsm4mhmesB3smemhmCmd"), s("3smhW3mhm2mW"), s("3smhWimymhWiWCsBC4CC"), n("3smimemesB36i3"), t("3sm4W3WCW3Wsmimhm6sBimmiWsmhsBiCmiWsm4mm"), s("3smGm3mGm2m4sB36i3"), n("3smGmGmdm6mhm2sB3Gmem3sBiCW3W4memi"), n("3sWsmhmWmWmhm3mGmCm4mG"), t("3sWsmGmhm3WWmhW4"), r("3Cmhmem4msWsm4"), t("3Cmhmem4mmmGWsm2m4mhm2sB3m3s"), t("3CmhWCW3mimememhWs"), t("3CmhWCWimhme"), r("3Cmim2W3mhWiWs"), r("3Cmim2W3WiWsW4sB3WmGW3mym4mC"), t("3Cmymhmemdm3WiWCW3miWs"), r("3CmGmemGm2m2mhsB36i3"), s("3CmGWBWBmiWsWBmemhW3misB3WmGW3mym4mCsB3em4mWmyW3"), t("33mimKmhimWisB3e3W3CsBiCmhm2WCsB36mGm2mG"), r("33miWCm3mim6mGm2mh"), s("333m3dmhm4s6iC3s"), m("33mGW3Wim6"), t("3im2mWWsmhWmmiWsWCsB36i3"), n("3iWsmhWCsB3smGmem3sB34i33C"), s("3iWiWsmGWCW3m4memi"), s("3mmhm2mWiCmGm2mW"), s("3mmGWsW3mi"), n("3mWsmhm2mdmem4m2sB3WmGW3mym4mCsB3ymimhWmW4"), m("3mWsmim2mCmysBiCmCWsm4WBW3sB36i3"), t("3WmhmsWsm4mGmemh"), s("3Wm4mWm4"), m("3Wm4WCmymh"), r("3WmGWim3W4sB3Gmem3sBiCW3W4memi"), m("3WWimem4m6"), t("3WWim2mWiCmimG"), t("3ymhmiW3W3mim2WCmCmyWWmim4memiWs"), s("3ymhWsWsm4m2mWW3mGm2"), r("3ym4WsmhmWm4m2mGsBiCmhm2WCsB3W3s"), t("34m6WBmhmCW3"), t("34m2mmmGWsm6mhmesBismGm6mhm2"), r("3dmhmCWCW33Gm2mi"), s("3dm4m2mGsB36i3"), m("3dmGWKWimdmhsB3WmGW3mym4mCsBiBWsCm32"), t("3emGmym4W3sB3WWimKmhWsmhW3m4"), n("3emGm6mh"), n("3eWimCm4m3mhsB3sWsm4mWmyW3"), m("3eWimCm4m3mhsB3mmhWy"), n("36mhmWm2miW3mG"), s("36mhmemWWim2sB3WmGW3mym4mC"), m("36mhW3WiWsmhsB36i3sBiCmCWsm4WBW3sB3CmhWBm4W3mhmeWC"), n("36mim2memG"), n("36m4m2mW3em4iis63iWyW33s"), r("36mGmGme3smGWsmhm2"), m("36iCsBiB36m4m2mCmymG"), t("36iCsBismimmmiWsmim2mCmisBiCmhm2WCsBiCmiWsm4mm"), r("32miWWWCsB3WmGW3mym4mCsB36i3"), r("32m4mhmWmhWsmhsBiCmGmem4m3"), m("32W4mhmemh"), t("iBmhmemhmCmisBiCmCWsm4WBW3sB36i3"), t("iBmhWBW4WsWiWC"), r("iBmiWsWBmiW3Wimh"), t("iBmemhW4msm4meme"), r("iB36m4m2mW3em4ii"), t("ismhmCmymhm2mh"), t("ismGmCmdWWmimeme"), m("iCmhWWmhWCm3mimi"), s("iCmCWsm4WBW3sB36i3sB3smGmem3"), t("iCmimWmGmisBiBWsm4m2W3"), r("iCmymGWWmCmhWsm3sB3WmGW3mym4mC"), r("iCm4m63ymim4"), n("iCm2mhWBsB34i33C"), s("i3meWWmW36mGm2mG"), s("i3WWsB3Cmim2sB36i3sB3CmGm2m3mim2WCmim3sB3iWyW3WsmhsB3smGmem3"), n("iimsWim2W3Wi"), s("iim6WBWiWCmy"), n("iim2m4WmmiWsWC"), r("iiW3mGWBm4mh"), m("immemhm3m4m6m4WssBiCmCWsm4WBW3"), s("iWm4m3misB3emhW3m4m2"), m("23dddG2iK2yd"), r("2iy6y22m4myW23dyK62iK2yd"), n("2iy6y22m4myW23dddG2iK2yd"), m("2iy6y22m4myW2iK2yd23d64C"), s("2iy6y22m4myW2id6K423dK4h"), r("2iy6y22m4myW2m4mdB24K6yG"), r("2iy6y22m4myW2mKidW23d64C"), n("2iy6y22m4myW2W4BKi2WyGyB"), r("2iy6y22m4myW2Wddym24dd4h"), n("2iy6y22m4myW2yKhye2mKidW"), t("2iy6y22m4myW244Kdm23d4Km"), n("2iK2yd23d64C"), t("2id4de2i4eym"), r("2id2K22yd6KG244dyi24dd4h"), n("2m4mdB2iK2yd23d64C"), r("2m4md42mK6KC2iKW4K23d64C"), m("2m4md42mK6KC2yyy4s23d64C"), m("2mKidW23d64C"), n("244Kdm23d4Km"), t("24dd4h23d64C"), m("2m4mdB2Wddym2m4yy223d64C"), r("2Wddym2m4yy223d64C"), r("2mKByW2mKidW23d64C"), r("23dddG2iK2ydiG3W3sCsCCChCs"), m("2mKidW23d64CiG3W3sCsCCChCs"), m("2id2K22yd6KG2mK6KC24dd4h23d64C"), t("2iy6y22m4myW24dd4h23d64C"), s("23dyd624dd4hsBiBWsmG"), n("23dyd62iK2ydsBiBWsmG"), m("2yydd42m424e23dyd623dyK624dd4h"), r("2yydd42m424e23dyd62Wddym2iK2yd")], o = [], c = e[11]; c < i.length; c++) try {
                                    var l = i[c];
                                    a()(l) && o.push(l)
                                } catch (u) {
                                    r("mmmGm2W3sBm3miW3mimCW3sBmiWsWsmGWs")
                                }
                                return o.join(r("Cd"))
                            }
                            function a() {
                                function i(e) {
                                    var i = {};
                                    return u.style.fontFamily = e, l.appendChild(u), i.height = u.offsetHeight, i.width = u.offsetWidth, l.removeChild(u), i
                                }
                                var s = [n("m6mGm2mGWCWBmhmCmi"), m("WCmhm2WCs6WCmiWsm4mm"), n("WCmiWsm4mm")],
                                    o = [],
                                    a = r("WWWWWWm6m6m6m6m6m6m6m6m6m6memem4"),
                                    c = n("CWCsWBWy"),
                                    l = X.body,
                                    u = X.createElement(m("WCWBmhm2"));
                                u.style.fontSize = c;
                                u.style.visibility = t("mym4m3m3mim2");
                                u.innerHTML = a;
                                for (a = e[11]; a < s.length; a++) o[a] = i(s[a]);
                                return function (m) {
                                    for (var n = e[11]; n < o.length; n++) {
                                        var r = i(m + t("se") + s[n]),
                                            a = o[n];
                                        if (r.height !== a.height || r.width !== a.width) return !0
                                    }
                                    return !1
                                }
                            }
                            function c() {
                                var e = null,
                                    i = null,
                                    m = [];
                                try {
                                    i = X.createElement(n("mCmhm2WmmhWC")), e = i[n("mWmiW33CmGm2W3miWyW3")](t("WWmimsmWme")) || i[r("mWmiW33CmGm2W3miWyW3")](n("miWyWBmiWsm4m6mim2W3mhmes6WWmimsmWme"))
                                } catch (s) { }
                                if (!e) return m;
                                try {
                                    m.push(e.getSupportedExtensions())
                                } catch (o) { }
                                try {
                                    m.push(l(e, i))
                                } catch (a) { }
                                return m.join(n("Cd"))
                            }
                            function l(i, t) {
                                try {
                                    var s = n("mhW3W3Wsm4msWiW3misBWmmimCCssBmhW3W3WsimmiWsW3miWyCdsBWmmhWsW4m4m2mWsBWmmimCCssBWmmhWsW4m4m2i3miWy3CmGmGWsm3m4m2mhW3miCdsBWim2m4mmmGWsm6sBWmmimCCssBWim2m4mmmGWsm63GmmmmWCmiW3CdsBWmmGm4m3sBm6mhm4m2sys4sBWdsBsBsBWmmhWsW4m4m2i3miWy3CmGmGWsm3m4m2mhW3misBC6sBmhW3W3WsimmiWsW3miWysBsdsBWim2m4mmmGWsm63GmmmmWCmiW3CdsBsBsBmWmeiGiBmGWCm4W3m4mGm2sBC6sBWmmimCC3symhW3W3WsimmiWsW3miWysesBCBsesBChs4CdsBW6"),
                                        o = n("WBWsmimCm4WCm4mGm2sBm6mim3m4Wim6WBsBmmmemGmhW3CdsBWmmhWsW4m4m2mWsBWmmimCCssBWmmhWsW4m4m2i3miWy3CmGmGWsm3m4m2mhW3miCdsBWmmGm4m3sBm6mhm4m2sys4sBWdsBsBsBmWmeiG3mWsmhmW3CmGmemGWssBC6sBWmmimCC3syWmmhWsW4m4m2i3miWy3CmGmGWsm3m4m2mhW3misesBCBsesBChs4CdsBW6"),
                                        a = i.createBuffer();
                                    i.bindBuffer(i.ARRAY_BUFFER, a);
                                    var c = new Float32Array([e[428], e[483], e[11], e[424], e[448], e[11], e[11], e[463], e[11]]);
                                    i.bufferData(i.ARRAY_BUFFER, c, i.STATIC_DRAW);
                                    a.k = e[14];
                                    a.l = e[14];
                                    var l = i.createProgram(),
                                        u = i.createShader(i.VERTEX_SHADER);
                                    i.shaderSource(u, s);
                                    i.compileShader(u);
                                    var h = i.createShader(i.FRAGMENT_SHADER);
                                    return i.shaderSource(h, o), i.compileShader(h), i.attachShader(l, u), i.attachShader(l, h), i.linkProgram(l), i.useProgram(l), l.n = i.getAttribLocation(l, m("mhW3W3WsimmiWsW3miWy")), l.m = i.getUniformLocation(l, r("Wim2m4mmmGWsm63GmmmmWCmiW3")), i.enableVertexAttribArray(l.o), i.vertexAttribPointer(l.n, a.k, i.FLOAT, !e[536], e[11], e[11]), i.uniform2f(l.m, e[536], e[536]), i.drawArrays(i.TRIANGLE_STRIP, e[11], a.l), G(t[r("W3mG33mhW3mhiiis3e")]())
                                } catch (f) {
                                    return n("WWmimsmWmesBmiWymCmiWBW3m4mGm2")
                                }
                            }
                            function u() {
                                var i = X.createElement(r("m3m4Wm")),
                                    o = [],
                                    a = [n("3hmCW3m4Wmmi3smGWsm3miWs"), t("3hmCW3m4Wmmi3CmhWBW3m4mGm2"), m("3hWBWBiWmGWsmdWCWBmhmCmi"), s("3smhmCmdmWWsmGWim2m3"), n("3sWiW3W3mGm23mmhmCmi"), t("3sWiW3W3mGm23ym4mWmymem4mWmyW3"), r("3sWiW3W3mGm2iCmymhm3mGWW"), m("3sWiW3W3mGm2i3miWyW3"), m("3CmhWBW3m4mGm2i3miWyW3"), t("3WWsmhW4i3miWyW3"), m("3ym4mWmymem4mWmyW3"), s("3ym4mWmymem4mWmyW3i3miWyW3"), s("34m2mhmCW3m4Wmmi3smGWsm3miWs"), t("34m2mhmCW3m4Wmmi3CmhWBW3m4mGm2"), n("34m2mhmCW3m4Wmmi3CmhWBW3m4mGm2i3miWyW3"), s("34m2mmmG3smhmCmdmWWsmGWim2m3"), t("34m2mmmGi3miWyW3"), n("36mim2Wi"), s("36mim2Wii3miWyW3"), n("iCmCWsmGmememsmhWs"), r("i3myWsmimi3333mhWsmdiCmymhm3mGWW"), m("i3myWsmimi333mmhmCmi"), t("i3myWsmimi333ym4mWmymem4mWmyW3"), n("i3myWsmimi333em4mWmyW3iCmymhm3mGWW"), t("i3myWsmimi33iCmymhm3mGWW"), r("iWm4m2m3mGWW"), m("iWm4m2m3mGWW3mWsmhm6mi"), n("iWm4m2m3mGWWi3miWyW3")];
                                if (!window[t("mWmiW33CmGm6WBWiW3mim3iCW3W4memi")]) return o.join(t(""));
                                for (var c = e[11]; c < a.length; c++) try {
                                    X.body.appendChild(i), i.style.color = a[c], o.push(a[c]), o.push(window[t("mWmiW33CmGm6WBWiW3mim3iCW3W4memi")](i).getPropertyValue(m("mCmGmemGWs"))), X.body.removeChild(i)
                                } catch (l) {
                                    o.push(n("mWmiW3sBWCW4WCW3mim6sBmCmGmemGWsWCsBmiWymCmiWBW3m4mGm2"))
                                }
                                return o.join(m("CK"))
                            }
                            function h() {
                                try {
                                    var i = X.createElement(r("mCmhm2WmmhWC")),
                                        o = i[t("mWmiW33CmGm2W3miWyW3")](r("Csm3")),
                                        a = s("m6WW3CsBm2mdmsmhmmmKmGWsm3sBWBmyWCmWmeW4sBmiWyWmW3sBWKWhm4WisesB2hd6KBsBW3WBmyWCW3sGCKsGWimymsmWW3m4mCs2m6mGsGmemiWmWmmh");
                                    o.textBaseline = n("W3mGWB");
                                    o.font = n("CWCBWBWysBsW3hWsm4mhmesW");
                                    o.textBaseline = r("mhmeWBmymhmsmiW3m4mC");
                                    o.fillStyle = t("sCmmCmCB");
                                    o.fillRect(e[277], e[536], e[148], e[62]);
                                    o.fillStyle = m("sCCBCmC4");
                                    o.fillText(a, e[10], e[52]);
                                    o.fillStyle = t("WsmWmsmhsyChCBCssesBCsCBC3sesBCBsesBCBs2CWs4");
                                    o.fillText(a, e[18], e[56]);
                                    return i[n("W3mG33mhW3mhiiis3e")]()
                                } catch (c) {
                                    return m("mCmhm2WmmhWCsBmhWBm4sBmiWymCmiWBW3m4mGm2")
                                }
                            }
                            function f() {
                                try {
                                    return window[m("3hmCW3m4Wmmiiy3GmsmKmimCW3")] && w.h ? d() : W()
                                } catch (e) {
                                    return s("mWmiW3sBWBmeWimWm4m2sBWCW3Wsm4m2mWsBmiWymCmiWBW3m4mGm2")
                                }
                            }
                            function W() {
                                if (!Z[t("WBmeWimWm4m2WC")]) return m("");
                                var i = [m("C3mWmhm6mi"), r("3hm3msmemGmCmdiBmeWimWm4m2"), s("3hm3mGmsmi3iWy36mhm23C3C33miW3mimCW3"), r("3hm3mGmsmi3iWy36mhm233miW3mimCW3"), r("3hmemhWWmhWssB32iB3hiB34sBWiW3m4meWC"), n("3hmem4mim3m4W3sBiBmeWimWs634m2"), m("3hmem4WBmhW4sBiCmimCWiWsm4W3W4sB3CmGm2W3WsmGmesBCC"), m("3hmem4iCiC3G3emGmWm4m2sBWBmeWimWm4m2"), s("3hm6mhWKmGm236iBCC33mGWWm2memGmhm3miWsiBmeWimWm4m2"), m("3h3G3esB36mim3m4mhsBiBmemhW4msmhmCmdsBiBmeWimWm4m2"), r("3hWBWBiiWB"), t("3hWsmCmym43C3h33"), n("3him3WsBiCm4W3miiCmhmmmiW3W4sBWBmeWimWm4m2"), s("3smhmsW4memGm2sBi3mGmGme3smhWs"), m("3smhW3W3memimemGmWsB3Wmhm6misB3emhWim2mCmymiWs"), r("3sm4W33CmGm6miW33hmWmim2W3"), s("3sm4W3m3mimmmim2m3miWssBihWim4mCmdiCmCmhm2"), r("3smeWimiiCW3mhmCmdWCsB34m2WCW3mhmemesB33miW3mimCW3mGWs"), t("3CmhW3mhmem4m2mh3WWsmGWiWBsBiiWBm3mhW3mi"), s("3Cm4W3Wsm4WysB343C3hsB3Cmem4mim2W3"), t("3Cm4W3Wsm4WysBmGm2mem4m2misBWBmeWimWs6m4m2"), m("3Cm4W3Wsm4WysBismimCmim4WmmiWssBiBmeWimWs6m4m2"), s("3CmGmGWWmGm2sBiiWBm3mhW3mi"), m("33mimhmeiBmeW43em4WmmisBiiWBm3mhW3mi"), n("33mimmmhWimeW3sB3sWsmGWWWCmiWssB3ymimeWBmiWs"), m("33m4WmiysB3sWsmGWWWCmiWssBiBmeWimWs634m2"), t("33m4WmiysBiBmeWiWCsBiWmimssBiBmemhW4miWs"), n("33m4WmiysBim3G33sB3ymimeWBmiWssBiBmeWimWs6m4m2"), r("m3mGWimsmemii3WWm4WCW3sBiWmimssBiBmeWimWm4m2"), m("33mGWWm2memGmhm3miWsWCsBWBmeWimWm4m2"), n("m3mGWWm2memGmhm3iiWBm3mhW3miWs"), n("mi36WiWCm4mCiBmeWimWm4m2sB333e36Cm"), s("3iiC32sB3emhWim2mCmysB36mGWKm4mememhsBiBmeWimWm4m2"), r("3iiC32sBiCmGm2mhWssB3hiB34"), m("3iWym4mmsB3iWmmiWsW4WWmymiWsmi"), m("3mmhmCmimsmGmGmdsBiBmeWimWm4m2"), t("3mm4memisB33mGWWm2memGmhm3miWssBiBmeWimWs6m4m2"), s("3mm4memi3emhmssBWBmeWimWm4m2"), t("3mmeW43GWs33m4misB3Wmhm6miWCsBiBmeWimWm4m2"), n("3mmGmeWysBCCsB3sWsmGWWWCmiWssBiBmeWimWm4m2"), m("3miiiK3iiCmymhWsmi"), n("3W333esB3GmsmKmimCW3sBiWmimssBiBmeWimWs6m4m2sBChCms2CBCB"), t("3W3m3h3C3isBiBmeWimWm4m2"), n("3Wm4m2mWmiWs"), t("3Wm2mGm6misBiCmymimemesB34m2W3mimWWsmhW3m4mGm2"), r("3WmGmGmWmemisB3imhWsW3mysBiBmeWimWm4m2"), m("3WmGmGmWmemisB3imhWsW3mysBiBmeWimWs6m4m2"), m("3WmGmGmWmemisB3WmimhWsWCsBCBs2Cis2CCCCs2CB"), r("3WmGmGmWmemisBi3mhmemdsB3immmmmimCW3WCsBiBmeWimWm4m2"), m("3WmGmGmWmemisBiiWBm3mhW3mi"), n("3ymhWsm6mGm2W4sB3mm4WsmimmmGWysBiBmeWimWm4m2"), r("3ymhWsm6mGm2W4sBiBmeWimWs634m2"), n("3ymiWsmGmiWCsBsmsB3Wmim2miWsmhmeWCsBmem4Wmmi"), t("3yiB33miW3mimCW3"), n("3yW3m6meCisBmemGmCmhW3m4mGm2sBWBWsmGWmm4m3miWs"), r("343isBi3mhmssBWBmeWimWm4m2"), r("m43WmiW3W3miWsiCmCWsm4WBW3mhmsmemiiBmeWimWm4m2"), s("m436miWCmysBWBmeWimWm4m2"), t("3dmhWCWBmiWsWCmdW4sBiBmhWCWCWWmGWsm3sB36mhm2mhmWmiWs"), s("3emhWCW3iBmhWCWC"), t("3emGmW36mi34m2sBiBmeWimWm4m2sBChs2CBs2CBs2C4CCCi"), s("3emGmW36mi34m2sBiBmeWimWm4m2sBChs2CBs2CBs2C4CmCh"), n("36mhs63CmGm2mmm4mWs2mCmGm6sBWBmeWimWm4m2"), t("36m4mCWsmGWCmGmmW3sB3Gmmmmm4mCmisBCsCBChCC"), r("36m4m2m4msmhWsiBmeWimWm4m2"), t("32mhW3m4WmmisB3Cmem4mim2W3"), s("32m4W3WsmGsBiB333msBiBmeWimWs634m2"), t("32mGmdm4mhsBiCWim4W3misB3im2mhmsmemiWssBiBmeWimWm4m2"), r("32mGWsW3mGm2sB34m3mim2W3m4W3W4sBiCmhmmmi"), t("m2WB3hiB34sBiBmeWimWm4m2"), t("32iB3emhWCW3iBmhWCWC"), m("32iBiBmemhW4miWsiCmymimeme"), m("m2WBi3mGm2mWmsWi3hm3m3m4m2"), r("32W4Wy3emhWim2mCmymiWs"), t("3GmCW3mGWCmymhWBmisBiCW3Wsmimhm6m4m2mWsBiCmiWsWmm4mCmiWC"), s("3Gm2mem4m2misBiCW3mGWsmhmWmisBWBmeWimWs6m4m2"), r("3GWsmsm4W3sB33mGWWm2memGmhm3miWs"), s("iBmhm2m3mGsBiWmimssBiBmeWimWm4m2"), s("iBmhWsmGm6s2i3imsBWBmemhW4miWssBWBmeWimWm4m2"), n("iB333msBm4m2W3mimWWsmhm3mGsBm3mGsBiWmims3dm4W3"), n("iB333ms6iy3Cmymhm2mWmisBimm4miWWmiWs"), t("iBmymGW3mG3Cmim2W3miWsiBmeWimWm4m2Chs2Chs2Css2Cs"), m("iBm4mCmhWCmh"), s("iBmemhW43Gm2sBiBmeWimWs6m4m2"), t("ihihCsCBChCCsB3mm4WsmimmmGWysBiBmeWimWm4m2"), n("ihih33mGWWm2memGmhm3sBiBmeWimWm4m2"), t("ihih36m4m2m4333esBiBmeWimWm4m2"), m("ihih36WiWCm4mC"), s("ismimhme33mGWWm2memGmhm3miWssBiBmeWimWm4m2"), m("ismGmsmemGWysB3emhWim2mCmymiWssBiBmeWimWm4m2"), r("ismGmCmd36mimeW3sBiiWBm3mhW3mi"), r("iCmhmmmiWssBiiWBm3mhW3mi"), m("iCmhmmmiiCmimhWsmCmy"), m("iCmCWsm4WBW3m4m2mWs233m4mCW3m4mGm2mhWsW4"), r("iCmimm3Cmem4mim2W3sBiBmeWimWm4m2"), s("iCmymimemes2ii343ymimeWBmiWs"), r("iCm4meWmmiWsmem4mWmyW3sBiBmeWimWs634m2"), r("iCm4m6WBmemisBiBmhWCWC"), r("iCmdW4WBmisBiWmimssBiBmeWimWm4m2"), r("iCWim6mhW3WsmhiB333msB3sWsmGWWWCmiWssBiBmeWimWm4m2"), r("iCW4m6mhm2W3mimCsBiB3d34sB3Cmem4mim2W3"), m("i3mim2mCmim2W3sB3mi332sBWBmeWimWs6m4m2"), s("i3myWim2m3miWssB33mhWB3CW3WsmesB32iB3hiB34sBiBmeWimWm4m2"), m("i3mGWsmCmy3ymimeWBmiWs"), t("iim2m4W3W4sBiBmemhW4miWs"), r("iiWBmemhW4sBiB3C"), t("im33mGWWm2memGmhm3miWs"), s("immimiW3memisBi3imsB3CmGWsmi"), s("im3e3CsB36WimeW3m4m6mim3m4mhsBiBmeWimWm4m2"), t("iWmimssB3CmGm6WBmGm2mim2W3WC"), r("iWmims3dm4W3s6m4m2W3mimWWsm4miWsW3misBiB333m"), n("iW3i3siK3i32sB3sWsmGWWWCmiWssB3iWyW3mim2WCm4mGm2"), s("iWmGmemmWsmhm6sB36mhW3mymim6mhW3m4mCmh"), t("iWmGWsm33CmhWBW3WiWsmiiy"), n("iWiB34sB33miW3mimCW3mGWssBChs2C3"), r("i4mhm2m3miWysB36mim3m4mhsBiBmeWimWm4m2"), s("i4mhm2m3miWysBiB333msBimm4miWWmiWs"), r("i4mGWii3WimsmisBiBmeWimWs6m4m2"), n("WKmhmdmG")],
                                    o = [],
                                    a = {};
                                o.push(g(Z[n("WBmeWimWm4m2WC")], function (i) {
                                    a[i.name] = e[536];
                                    var t = g(i, function (e) {
                                        return [e.type, e.suffixes].join(m("W2"))
                                    }).join(m("se"));
                                    return [i.name, i.description, t].join(r("CKCK"))
                                }, this).join(m("s3")));
                                o.push(g(i, function (e) {
                                    if (a[e]) return n("");
                                    e = Z[m("WBmeWimWm4m2WC")][e];
                                    if (!e) return s("");
                                    var i = g(e, function (e) {
                                        return [e.type, e.suffixes].join(r("W2"))
                                    }).join(n("se"));
                                    return [e.name, e.description, i].join(s("CKCK"))
                                }, this).join(m("Cd")));
                                return o.join(n("Cd"))
                            }
                            function d() {
                                if (window[s("3hmCW3m4Wmmiiy3GmsmKmimCW3")]) {
                                    var e = [m("3hmCWsmGiB333ms2iB333m"), t("3hm3mGm3mss2iCW3Wsmimhm6"), r("3hmW3CmGm2W3WsmGmes23hmW3CmGm2W3WsmGme"), t("33miWmmhmeimisiy3CW3Wsmes233miWmmhmeimisiy3CW3Wsmes2Ch"), n("36mhmCWsmGm6mim3m4mh3mmemhWCmyiBmhWBmiWss236mhmCWsmGm6mim3m4mh3mmemhWCmyiBmhWBmiWs"), m("36WCWym6meCss2333G3633mGmCWim6mim2W3"), s("36WCWym6meCss2iy363e3yi3i3iB"), r("iB333ms2iBm3mm3CW3Wsme"), s("ihWim4mCmdi3m4m6mis2ihWim4mCmdi3m4m6mi"), s("ihWim4mCmdi3m4m6mi3CmymimCmd3GmsmKmimCW3s2ihWim4mCmdi3m4m6mi3CmymimCmds2Ch"), n("Wsm6mGmCWys2ismimhmeiBmemhW4miWssB3WCssB3CmGm2W3WsmGme"), t("Wsm6mGmCWys2ismimhmeiBmemhW4miWssB3WCssB3CmGm2W3WsmGmes2Ch"), s("ismimhmeiBmemhW4miWs"), m("ismimhmeiBmemhW4miWss2ismimhmeiBmemhW4miWssyW3m6s4sB3hmCW3m4WmmiiysB3CmGm2W3WsmGmesBsyCCCss6msm4W3s4"), m("ismimhmeimm4m3mimGs2ismimhmeimm4m3mimGsyW3m6s4sB3hmCW3m4WmmiiysB3CmGm2W3WsmGmesBsyCCCss6msm4W3s4"), m("Wsm6mGmCWys2ismimhmeiBmemhW4miWssB3WCssB3CmGm2W3WsmGme"), t("iCmCWsm4WBW3m4m2mWs233m4mCW3m4mGm2mhWsW4"), t("iCmymimemes2ii343ymimeWBmiWs"), t("iCmymGmCmdWWmhWmmi3mmemhWCmys2iCmymGmCmdWWmhWmmi3mmemhWCmy"), s("iCiW3CW3mes2iCiW3CW3me"), r("iCmdW4WBmis233miW3mimCW3m4mGm2"), r("i3333C3CW3mes2i3333C3CW3me"), m("iW36iBmemhW4miWss23G3Ciy")];
                                    return g(e, function (e) {
                                        try {
                                            return new (window[s("3hmCW3m4Wmmiiy3GmsmKmimCW3")])(e), e
                                        } catch (i) {
                                            return null
                                        }
                                    }).join(m("Cd"))
                                }
                                return n("")
                            }
                            function p() {
                                try {
                                    return !!window[r("WCmiWCWCm4mGm2iCW3mGWsmhmWmi")]
                                } catch (e) {
                                    return !0
                                }
                            }
                            function C() {
                                try {
                                    return !!window[n("memGmCmhmeiCW3mGWsmhmWmi")]
                                } catch (e) {
                                    return !0
                                }
                            }
                            function g(e, i, m) {
                                var t = [];
                                if (null == e) return t;
                                if (v && e.map === v) return e.map(i, m);
                                y(e, function (e, n, s) {
                                    t[t.length] = i.call(m, e, n, s)
                                });
                                return t
                            }
                            function y(i, m) {
                                if (null !== i) if (B && i.forEach === B) i.forEach(m, void 0);
                                else if (i.length === +i.length) for (var t = e[11], n = i.length; t < n && m.call(void 0, i[t], t, i) !== {}; t++);
                                else for (t in i) if (i.hasOwnProperty(t) && m.call(void 0, i[t], t, i) === {}) break
                            }
                            var B = Array.prototype.forEach,
                                v = Array.prototype.map,
                                w = {
                                    e: G,
                                    j: !0,
                                    i: !0,
                                    h: !0,
                                    b: !0,
                                    a: !0
                                };
                            typeof i == m("mmWim2mCW3m4mGm2") ? w.e = i : (null != i.b && void 0 != i.b && (w.b = i.b), null != i.a && void 0 != i.a && (w.a = i.a));
                            this.get = function () {
                                var i = [],
                                    a = [];
                                if (Q) {
                                    i.push(p());
                                    i.push(C());
                                    i.push(!!window[m("m4m2m3miWymim3333s")]);
                                    X.body ? i.push(typeof X.body[n("mhm3m33smimymhWmm4mGWs")]) : i.push("undefined");
                                    i.push(typeof window[s("mGWBmim233mhW3mhmsmhWCmi")]);
                                    i.push(Z[n("mCWBWi3CmemhWCWC")]);
                                    i.push(Z[t("WBmemhW3mmmGWsm6")]);
                                    var l;
                                    if (l = w.i) try {
                                        var W = X.createElement(m("mCmhm2WmmhWC"));
                                        l = !(!W[s("mWmiW33CmGm2W3miWyW3")] || !W[n("mWmiW33CmGm2W3miWyW3")](r("Csm3")))
                                    } catch (d) {
                                        l = !1
                                    }
                                    if (l) try {
                                        i.push(h()), w.b && i.push(c())
                                    } catch (g) {
                                        i.push(n("mCmhm2WmmhWCsBmiWymCmiWBW3m4mGm2"))
                                    }
                                    i.push(u());
                                    w.a && a.push(o());
                                    a.push(Z[r("WiWCmiWs3hmWmim2W3")]);
                                    a.push(Z[m("memhm2mWWimhmWmi")]);
                                    a.push(window[n("WCmCWsmimim2")][t("mCmGmemGWs33miWBW3my")]);
                                    w.j && (l = window[r("WCmCWsmimim2")] ? [window[n("WCmCWsmimim2")].height, window[r("WCmCWsmimim2")].width] : [e[11], e[11]], typeof l !== m("Wim2m3mimmm4m2mim3") && a.push(l.join(m("Wy"))));
                                    a.push((new Date)[n("mWmiW3i3m4m6miWKmGm2mi3GmmmmWCmiW3")]());
                                    a.push(Z[n("m3mG32mGW3i3WsmhmCmd")]);
                                    a.push(f())
                                }
                                l = [];
                                w.e ? (l.push(w.e(i.join(r("sCsCsC")))), l.push(w.e(a.join(t("sCsCsC"))))) : (l.push(G(i.join(m("sCsCsC")))), l.push(G(a.join(r("sCsCsC")))));
                                return l
                            }
                        }
                        function G(i) {
                            var o = e[84],
                                a, c, l, u, h, f;
                            a = i.length & e[14];
                            c = i.length - a;
                            l = o;
                            o = e[16];
                            u = e[372];
                            for (f = e[11]; f < c;) h = i.charCodeAt(f) & e[295] | (i.charCodeAt(++f) & e[295]) << e[33] | (i.charCodeAt(++f) & e[295]) << e[54] | (i.charCodeAt(++f) & e[295]) << e[70], ++f, h = (h & e[481]) * o + (((h >>> e[54]) * o & e[481]) << e[54]) & e[401], h = h << e[52] | h >>> e[56], h = (h & e[481]) * u + (((h >>> e[54]) * u & e[481]) << e[54]) & e[401], l ^= h, l = l << e[46] | l >>> e[60], l = (l & e[481]) * e[21] + (((l >>> e[54]) * e[21] & e[481]) << e[54]) & e[401], l = (l & e[481]) + e[391] + (((l >>> e[54]) + e[431] & e[481]) << e[54]);
                            h = e[11];
                            switch (a) {
                                case e[14]:
                                    h ^= (i.charCodeAt(f + e[10]) & e[295]) << e[54];
                                case e[10]:
                                    h ^= (i.charCodeAt(f + e[536]) & e[295]) << e[33];
                                case e[536]:
                                    h ^= i.charCodeAt(f) & e[295], h = (h & e[481]) * o + (((h >>> e[54]) * o & e[481]) << e[54]) & e[401], h = h << e[52] | h >>> e[56], h = (h & e[481]) * u + (((h >>> e[54]) * u & e[481]) << e[54]) & e[401], l ^= h
                            }
                            l ^= i.length;
                            l ^= l >>> e[54];
                            l = (l & e[481]) * e[403] + (((l >>> e[54]) * e[403] & e[481]) << e[54]) & e[401];
                            l ^= l >>> e[46];
                            l = (l & e[481]) * e[345] + (((l >>> e[54]) * e[345] & e[481]) << e[54]) & e[401];
                            l ^= l >>> e[54];
                            i = l >>> e[11];
                            a = [];
                            a.push(i);
                            try {
                                for (var W, d = i + n(""), p = e[11], C = e[11], g = e[11]; g < d.length; g++) try {
                                    var y = parseInt(d.charAt(g) + r("")),
                                        p = y || y === e[11] ? p + y : p + e[536];
                                    C++
                                } catch (B) {
                                    p += e[536], C++
                                }
                                C = C == e[11] ? e[536] : C;
                                W = b(p * e[536] / C, ei);
                                for (var v, w = Math.floor(W / Math.pow(e[38], ei - e[536])), G = i + n(""), S = e[11], k = e[11], j = e[11], $ = e[11], M = e[11]; M < G.length; M++) try {
                                    var E = parseInt(G.charAt(M) + m(""));
                                    E || E === e[11] ? E < w ? (k++ , S += E) : ($++ , j += E) : ($++ , j += w)
                                } catch (U) {
                                    $++ , j += w
                                }
                                $ = $ == e[11] ? e[536] : $;
                                k = k == e[11] ? e[536] : k;
                                v = b(j * e[536] / $ - S * e[536] / k, ii);
                                a.push(x(W, ei, r("CB")));
                                a.push(x(v, ii, s("CB")))
                            } catch (_) {
                                a = [], a.push(i), a.push(I(ei, t("s6")).join(r(""))), a.push(I(ii, n("s6")).join(t("")))
                            }
                            return a.join(r(""))
                        }
                        function b(i, m) {
                            if (i < e[11] || i >= e[38]) throw Error(r("ChChChCB"));
                            for (var o = I(m, t("CB")), a = s("") + i, c = e[11], l = e[11]; c < o.length && l < a.length; l++) a.charAt(l) != n("s2") && (o[c++] = a.charAt(l));
                            return parseInt(o.join(t("")))
                        }
                        function x(e, i, t) {
                            e = r("") + e;
                            if (e.length > i) throw Error(m("ChChChCh"));
                            if (e.length == i) return e;
                            for (var n = [], o = e.length; o < i; o++) n.push(t);
                            n.push(e);
                            return n.join(s(""))
                        }
                        function I(i, m) {
                            if (i <= e[11]) return [e[11]];
                            for (var t = [], n = e[11]; n < i; n++) t.push(m);
                            return t
                        }
                        function S(e) {
                            return null == e || void 0 == e
                        }
                        function k(e, i, m) {
                            this.f = e;
                            this.c = i;
                            this.g = S(m) ? !0 : m
                        }
                        function j(e) {
                            if (S(e) || S(e.f) || S(e.c)) return !1;
                            try {
                                if (S(window[e.f])) return !1
                            } catch (i) {
                                return !1
                            }
                            return !0
                        }
                        function $(i, m) {
                            if (S(i)) return r("");
                            for (var t = e[11]; t < i.length; t++) {
                                var n = i[t];
                                if (!S(n) && n.f == m) return n
                            }
                        }
                        function M() {
                            var i;
                            e: {
                                if (!S(Y)) for (i = e[11]; i < Y.length; i++) {
                                    var o = Y[i];
                                    if (o.g && !j(o)) {
                                        i = o;
                                        break e
                                    }
                                }
                                i = null
                            }
                            var a;
                            if (S(i)) {
                                try {
                                    a = window.parseFloat(t("Chs2CBCh")) === e[381] && window.isNaN(window.parseFloat(t("3y3i3e3e3G")))
                                } catch (c) {
                                    a = !1
                                }
                                if (a) {
                                    var l;
                                    try {
                                        l = window.parseInt(r("ChCsCC")) === e[269] && window.isNaN(window.parseInt(t("3y3i3e3e3G")))
                                    } catch (u) {
                                        l = !1
                                    }
                                    if (l) {
                                        var h;
                                        try {
                                            h = window.decodeURI(r("siCsCs")) === m("ss")
                                        } catch (f) {
                                            h = !1
                                        }
                                        if (h) {
                                            var W;
                                            try {
                                                W = window.decodeURIComponent(r("siCsCm")) === m("sm")
                                            } catch (d) {
                                                W = !1
                                            }
                                            if (W) {
                                                var p;
                                                try {
                                                    p = window.encodeURI(t("ss")) === t("siCsCs")
                                                } catch (C) {
                                                    p = !1
                                                }
                                                if (p) {
                                                    var g;
                                                    try {
                                                        g = window.encodeURIComponent(r("sm")) === n("siCsCm")
                                                    } catch (y) {
                                                        g = !1
                                                    }
                                                    if (g) {
                                                        var B;
                                                        try {
                                                            B = window.escape(r("sm")) === s("siCsCm")
                                                        } catch (v) {
                                                            B = !1
                                                        }
                                                        if (B) {
                                                            var w;
                                                            try {
                                                                w = window.unescape(t("siCsCm")) === n("sm")
                                                            } catch (G) {
                                                                w = !1
                                                            }
                                                            if (w) {
                                                                var b;
                                                                try {
                                                                    b = window.eval(t("symmWim2mCW3m4mGm2sys4WdWsmiW3WiWsm2sBChCsCCCdW6s4sys4Cd")) === e[269]
                                                                } catch (x) {
                                                                    b = !1
                                                                }
                                                                a = b ? null : $(Y, t("miWmmhme"))
                                                            } else a = $(Y, r("Wim2miWCmCmhWBmi"))
                                                        } else a = $(Y, s("miWCmCmhWBmi"))
                                                    } else a = $(Y, t("mim2mCmGm3miiiis343CmGm6WBmGm2mim2W3"))
                                                } else a = $(Y, r("mim2mCmGm3miiiis34"))
                                            } else a = $(Y, s("m3mimCmGm3miiiis343CmGm6WBmGm2mim2W3"))
                                        } else a = $(Y, t("m3mimCmGm3miiiis34"))
                                    } else a = $(Y, s("WBmhWsWCmi34m2W3"))
                                } else a = $(Y, r("WBmhWsWCmi3mmemGmhW3"))
                            } else a = i;
                            return a
                        }
                        function E() {
                            var e = M();
                            if (!S(e)) return e.c;
                            try {
                                e = S(window[t("WBmymhm2W3mGm6")]) || S(window[n("WBmymhm2W3mGm6")][r("m4m2mKmimCW33KWC")]) ? null : $(Y, t("WBmymhm2W3mGm6s2m4m2mKmimCW33KWC"))
                            } catch (i) {
                                e = null
                            }
                            if (!S(e)) return e.c;
                            try {
                                e = S(context) || S(context[s("mymhWCmy3CmGm3mi")]) ? null : $(Y, m("mCmGm2W3miWyW3s2mymhWCmy3CmGm3mi"))
                            } catch (o) {
                                e = null
                            }
                            return S(e) ? null : e.c
                        }
                        function U(i) {
                            for (var m = [], t = e[11]; t < i; t++) {
                                var n = Math.random() * Wi,
                                    n = Math.floor(n);
                                m.push(fi.charAt(n))
                            }
                            return m.join(s(""))
                        }
                        function _(i) {
                            for (var m = (X[r("mCmGmGmdm4mi")] || t("")).split(r("CdsB")), n = e[11]; n < m.length; n++) {
                                var s = m[n].indexOf(r("C6"));
                                if (s >= e[11]) {
                                    var o = m[n].substring(s + e[536], m[n].length);
                                    if (m[n].substring(e[11], s) == i) return window.decodeURIComponent(o)
                                }
                            }
                            return null
                        }
                        function L(i) {
                            var o = [m("Wm"), n("mmWB"), r("Wi"), t("my"), m("mimC"), s("mim6"), n("m4mCWB")],
                                a = m("");
                            if (null == i || void 0 == i) return i;
                            if (typeof i == [s("mGms"), t("mKmi"), s("mCW3")].join(n(""))) {
                                for (var a = a + r("Wd"), c = e[11]; c < o.length; c++) if (i.hasOwnProperty(o[c])) {
                                    var l = n("sW") + o[c] + m("sWCKsW"),
                                        u;
                                    u = m("") + i[o[c]];
                                    u = null == u || void 0 == u ? u : u.replace(/'/g, r("iesW")).replace(/"/g, m("ss"));
                                    a += l + u + n("sWse")
                                }
                                a.charAt(a.length - e[536]) == r("se") && (a = a.substring(e[11], a.length - e[536]));
                                return a += t("W6")
                            }
                            return null
                        }
                        function N(e, i, o, a) {
                            var c = [];
                            c.push(e + n("C6") + encodeURIComponent(i));
                            o && (e = new Date, e = new Date(a), a = e[s("W3mG3W36i3iCW3Wsm4m2mW")](), c.push(t("CdsB")), c.push(m("miWy")), c.push(s("WBm4")), c.push(r("Wsmi")), c.push(t("WCC6")), c.push(a));
                            c.push(n("CdsB"));
                            c.push(n("WBmh"));
                            c.push(n("W3myC6sG"));
                            null != Bi && void 0 != Bi && Bi != t("") && (c.push(t("CdsB")), c.push(r("m3mG")), c.push(t("m6mhm4")), c.push(n("m2C6")), c.push(Bi));
                            X[t("mCmGmGmdm4mi")] = c.join(m(""))
                        }
                        function T(e) {
                            window[vi] = e
                        }
                        function A(e) {
                            window[wi] = e
                        }
                        function R(i, m) {
                            for (var t = [], n = e[11]; n < m; n++) t.push(i);
                            return t.join(s(""))
                        }
                        function D(e, i) {
                            var m = _(e);
                            null !== m && void 0 !== m && m !== t("") || N(e, i, !1)
                        }
                        function O() {
                            var e = _(ui);
                            if (null == e || void 0 == e || e == s("")) e = window[wi];
                            return e
                        }
                        function F() {
                            var e = O();
                            if (null == e || void 0 == e || e == m("")) return !1;
                            try {
                                return (e = parseInt(e)) && e >= hi ? !0 : !1
                            } catch (i) {
                                return !1
                            }
                        }
                        function P(i) {
                            if (null == i || void 0 == i || i == n("")) return null;
                            i = i.split(s("CK"));
                            return i.length < e[10] || !/[0-9]+/gi.test(i[e[536]]) ? null : parseInt(i[e[536]])
                        }
                        function K() {
                            var e = _(li);
                            if (null == e || void 0 == e || e == r("")) e = window[vi];
                            return e
                        }
                        function H() {
                            var i = K();
                            if (null == i || void 0 == i || i == t("")) return e[11];
                            i = P(i);
                            return null == i ? e[11] : i - (di - pi) - (new (window[m("33mhW3mi")]))[n("mWmiW3i3m4m6mi")]()
                        }
                        function z(i, o) {
                            var a = new (window[m("33mhW3mi")]);
                            a[n("WCmiW3i3m4m6mi")](a[s("mWmiW3i3m4m6mi")]() - e[322]);
                            null == o || void 0 == o || o == t("") ? window[t("m3mGmCWim6mim2W3")][n("mCmGmGmdm4mi")] = i + r("C6m2WimemeCdsBWBmhW3myC6sGCdsBmiWyWBm4WsmiWCC6") + a[r("W3mG3W36i3iCW3Wsm4m2mW")]() : window[r("m3mGmCWim6mim2W3")][n("mCmGmGmdm4mi")] = i + n("C6m2WimemeCdsBWBmhW3myC6sGCdsBm3mGm6mhm4m2C6") + o + n("CdsBmiWyWBm4WsmiWCC6") + a[m("W3mG3W36i3iCW3Wsm4m2mW")]()
                        }
                        function J() {
                            if (!(null == Gi || void 0 == Gi || Gi.length <= e[11])) for (var i = e[11]; i < Gi.length; i++) {
                                var m = Gi[i];
                                (null != Bi && void 0 != Bi && Bi != n("") || null != m && void 0 != m && m != n("")) && Bi != m && (z(li, m), z(ui, m))
                            }
                        }
                        function q() {
                            J();
                            window[wi] = null;
                            window[vi] = null;
                            var m = !0,
                                p = {
                                    v: t("WmChs2Ch")
                                },
                                C = E();
                            C && (p[s("m4mCWB")] = C);
                            C = null;
                            p[s("my")] = V;
                            var y = (new (window[n("33mhW3mi")]))[t("mWmiW3i3m4m6mi")]() + di,
                                B = y + e[304] * e[144] * e[144] * e[70] * e[299] * e[21];
                            p[t("Wi")] = U(e[14]) + y + U(e[14]);
                            try {
                                var G = new w({
                                    b: gi,
                                    a: Ci
                                }).get();
                                null != G && void 0 != G && G.length > e[11] ? p[s("mmWB")] = G.join(s("se")) : (p[t("mmWB")] = R(n("CB"), e[38]), p[r("mimC")] = n("Ch"), m = !1)
                            } catch (b) {
                                p[r("mmWB")] = R(r("CB"), e[38]), p[t("mimC")] = n("Ch"), m = !1
                            }
                            try {
                                var x = C = L(p),
                                    p = ci;
                                if (null == p || void 0 == p) throw Error(r("ChCBCBCy"));
                                if (null == x || void 0 == x) x = n("");
                                var G = x,
                                    I;
                                I = null == x ? l([]) : l(d(x));
                                var S = d(G + I),
                                    k = d(p);
                                null == S && (S = []);
                                I = [];
                                for (var j = e[11]; j < ai; j++) {
                                    var $ = Math.random() * e[297],
                                        $ = Math.floor($);
                                    I[j] = v($)
                                }
                                var k = c(k),
                                    k = g(k, c(I)),
                                    j = k = c(k),
                                    M;
                                if (null == S || void 0 == S || S.length == e[11]) M = h(si);
                                else {
                                    var _ = S.length,
                                        O = e[11],
                                        O = _ % si <= si - oi ? si - _ % si - oi : si * e[10] - _ % si - oi,
                                        $ = [];
                                    f(S, e[11], $, e[11], _);
                                    for (var F = e[11]; F < O; F++) $[_ + F] = e[11];
                                    f(W(_), e[11], $, _ + O, oi);
                                    M = $
                                }
                                _ = M;
                                if (null == _ || _.length % si != e[11]) throw Error(r("ChCBCBCi"));
                                M = [];
                                for (var P = e[11], K = _.length / si, H = e[11]; H < K; H++) {
                                    M[H] = [];
                                    for (var z = e[11]; z < si; z++) M[H][z] = _[P++]
                                }
                                P = [];
                                f(I, e[11], P, e[11], ai);
                                for (var Y = M.length, Q = e[11]; Q < Y; Q++) {
                                    var X, Z = o(M[Q], e[82]),
                                        ei = i(Z, e[194]),
                                        ii = i(ei, e[215]);
                                    X = o(ii, e[173]);
                                    var mi = g(X, k),
                                        ti;
                                    K = mi;
                                    H = j;
                                    if (null == K) ti = null;
                                    else if (null == H) ti = K;
                                    else {
                                        for (var z = [], ni = H.length, ri = e[11], fi = K.length; ri < fi; ri++) z[ri] = v(K[ri] + H[ri % ni]);
                                        ti = z
                                    }
                                    var mi = g(ti, j),
                                        Wi = a(mi),
                                        Wi = a(Wi);
                                    f(Wi, e[11], P, Q * si + ai, si);
                                    j = Wi
                                }
                                var yi;
                                if (null == P || void 0 == P) yi = null;
                                else if (P.length == e[11]) yi = n("");
                                else {
                                    var Bi = e[14];
                                    try {
                                        for (var Y = [], Gi = e[11]; Gi < P.length;) if (Gi + Bi <= P.length) Y.push(u(P, Gi, Bi)), Gi += Bi;
                                        else {
                                            Y.push(u(P, Gi, P.length - Gi));
                                            break
                                        }
                                        yi = Y.join(n(""))
                                    } catch (bi) {
                                        throw Error(s("ChCBChCB"))
                                    }
                                }
                                C = yi
                            } catch (xi) {
                                C = L({
                                    ec: n("Cs"),
                                    em: xi.message
                                }), m = !1
                            }
                            C = C + t("CK") + y;
                            N(li, C, m, B);
                            D(li, C);
                            T(C);
                            N(ui, hi, m, B);
                            D(ui, hi);
                            A(hi);
                            window[n("WCmiW3i3m4m6mimGWiW3")] && window[r("WCmiW3i3m4m6mimGWiW3")](q, pi)
                        }
                        k.prototype = {
                            toString: function () {
                                return r("WdsWm2mhm6misWCK") + this.f + t("sesBsWmCmGm3misWCK") + this.c + s("sesBsWmsWsmGWWWCmiWsiBWsmGWBsWCK") + this.g + m("W6")
                            }
                        };
                        var Y = [new k(m("WWm4m2m3mGWW"), t("CBCBCBCB")), new k(s("m3mGmCWim6mim2W3"), n("CBCBCBCh")), new k(m("m2mhWmm4mWmhW3mGWs"), n("CBCBCBCs")), new k(s("memGmCmhW3m4mGm2"), s("CBCBCBCC")), new k(s("mym4WCW3mGWsW4"), m("CBCBCBC3")), new k(r("WCmCWsmimim2"), m("CBCBCBCW")), new k(r("WBmhWsmim2W3"), m("CBCBCBCy")), new k(t("W3mGWB"), r("CBCBCBC4")), new k(t("WCmimemm"), n("CBCBChCB")), new k(n("WBmhWsWCmi3mmemGmhW3"), t("CBChCBCB")), new k(s("WBmhWsWCmi34m2W3"), t("CBChCBCh")), new k(m("m3mimCmGm3miiiis34"), s("CBChCBCs")), new k(r("m3mimCmGm3miiiis343CmGm6WBmGm2mim2W3"), m("CBChCBCC")), new k(r("mim2mCmGm3miiiis34"), r("CBChCBC3")), new k(s("mim2mCmGm3miiiis343CmGm6WBmGm2mim2W3"), s("CBChCBCi")), new k(m("miWCmCmhWBmi"), r("CBChCBCm")), new k(m("Wim2miWCmCmhWBmi"), m("CBChCBCW")), new k(s("miWmmhme"), m("CBChCBCy")), new k(s("iGWBmymhm2W3mGm6"), m("CBCsCBCB"), !1), new k(r("mCmhmemeiBmymhm2W3mGm6"), s("CBCsCBCh"), !1), new k(m("WBmymhm2W3mGm6"), n("CBCsCBCs"), !1), new k(m("WBmymhm2W3mGm6s2m4m2mKmimCW33KWC"), m("CBCsCBCC"), !1), new k(t("mCmGm2W3miWyW3s2mymhWCmy3CmGm3mi"), s("CBCsChCh"), !1)],
                            Q = M() ? !1 : !0,
                            V = window && window[s("memGmCmhW3m4mGm2")] && window[n("memGmCmhW3m4mGm2")].host || r("m2mGW3iGmiWym4WCW3iGmymGWCW3"),
                            X = window[r("m3mGmCWim6mim2W3")],
                            Z = window[t("m2mhWmm4mWmhW3mGWs")],
                            ei = e[10],
                            ii = e[10],
                            mi = [s("CB"), r("Ch"), s("Cs"), m("CC"), s("C3"), n("Ci"), t("Cm"), s("CW"), t("Cy"), t("C4"), r("mh"), m("ms"), n("mC"), s("m3"), r("mi"), s("mm")],
                            ti = [e[11], e[374], e[380], e[517], e[444], e[312], e[490], e[339], e[457], e[537], e[306], e[456], e[491], e[459], e[411], e[35], e[450], e[359], e[528], e[398], e[434], e[289], e[362], e[506], e[486], e[488], e[471], e[329], e[534], e[408], e[293], e[423], e[469], e[24], e[365], e[498], e[321], e[349], e[541], e[387], e[416], e[436], e[170], e[438], e[302], e[496], e[464], e[332], e[503], e[327], e[477], e[351], e[354], e[396], e[376], e[523], e[520], e[454], e[419], e[29], e[404], e[515], e[315], e[441], e[466], e[433], e[43], e[413], e[543], e[501], e[458], e[308], e[316], e[252], e[341], e[493], e[377], e[392], e[518], e[382], e[412], e[532], e[425], e[294], e[492], e[482], e[331], e[473], e[296], e[429], e[508], e[363], e[364], e[446], e[400], e[529], e[499], e[291], e[333], e[465], e[439], e[409], e[440], e[186], e[350], e[313], e[388], e[542], e[28], e[461], e[500], e[366], e[516], e[394], e[442], e[317], e[455], e[512], e[32], e[420], e[399], e[346], e[524], e[378], e[330], e[494], e[352], e[478], e[476], e[328], e[447], e[485], e[292], e[427], e[337], e[415], e[531], e[397], e[511], e[358], e[361], e[510], e[474], e[300], e[310], e[453], e[135], e[535], e[410], e[49], e[305], e[468], e[384], e[514], e[385], e[371], e[489], e[344], e[336], e[320], e[422], e[23], e[522], e[451], e[314], e[445], e[386], e[521], e[480], e[348], e[505], e[325], e[375], e[527], e[338], e[405], e[279], e[437], e[417], e[432], e[462], e[335], e[126], e[504], e[368], e[497], e[470], e[17], e[540], e[393], e[303], e[356], e[509], e[360], e[298], e[343], e[395], e[530], e[357], e[324], e[426], e[290], e[414], e[379], e[326], e[475], e[484], e[27], e[342], e[487], e[318], e[355], e[513], e[383], e[370], e[406], e[47], e[407], e[467], e[319], e[452], e[309], e[533], e[301], e[526], e[373], e[402], e[340], e[347], e[479], e[323], e[507], e[443], e[311], e[519], e[389], e[19], e[421], e[449], e[525], e[390], e[539], e[353], e[307], e[495], e[367], e[12], e[472], e[334], e[460], e[502], e[153], e[435], e[228], e[430], e[418]],
                            ni = [e[36], e[195], e[122], e[140], e[253], e[229], e[136], e[277], e[211], e[53], e[52], e[10], e[169], e[219], e[178], e[98], e[137], e[119], e[179], e[74], e[261], e[144], e[203], e[37], e[236], e[44], e[161], e[227], e[149], e[106], e[58], e[78], e[270], e[41], e[86], e[110], e[180], e[212], e[94], e[220], e[18], e[141], e[221], e[196], e[222], e[204], e[213], e[237], e[48], e[205], e[181], e[206], e[262], e[154], e[46], e[22], e[80], e[263], e[20], e[187], e[76], e[102], e[142], e[107], e[197], e[118], e[171], e[244], e[152], e[75], e[155], e[87], e[254], e[11], e[95], e[230], e[207], e[120], e[278], e[198], e[103], e[238], e[13], e[271], e[108], e[255], e[214], e[188], e[85], e[156], e[231], e[50], e[157], e[121], e[158], e[256], e[232], e[199], e[61], e[239], e[159], e[172], e[90], e[182], e[111], e[77], e[245], e[246], e[114], e[145], e[200], e[109], e[131], e[72], e[160], e[91], e[112], e[127], e[257], e[96], e[173], e[208], e[189], e[123], e[88], e[99], e[190], e[191], e[201], e[247], e[45], e[143], e[233], e[183], e[115], e[280], e[92], e[536], e[223], e[51], e[138], e[248], e[240], e[215], e[128], e[42], e[258], e[62], e[241], e[174], e[148], e[162], e[100], e[132], e[264], e[281], e[259], e[269], e[38], e[184], e[272], e[34], e[175], e[64], e[216], e[56], e[146], e[65], e[242], e[282], e[59], e[283], e[57], e[129], e[39], e[185], e[71], e[66], e[273], e[217], e[73], e[224], e[249], e[67], e[68], e[163], e[284], e[286], e[116], e[101], e[538], e[14], e[63], e[234], e[164], e[235], e[21], e[265], e[274], e[113], e[124], e[97], e[104], e[70], e[192], e[82], e[193], e[150], e[105], e[218], e[209], e[26], e[130], e[285], e[151], e[79], e[250], e[60], e[125], e[251], e[165], e[166], e[81], e[176], e[225], e[210], e[147], e[167], e[168], e[266], e[15], e[194], e[202], e[30], e[89], e[133], e[84], e[275], e[276], e[243], e[260], e[117], e[83], e[267], e[134], e[69], e[268], e[55], e[31], e[25], e[93], e[54], e[226], e[139], e[177], e[33]],
                            si = e[160],
                            ri = e[160],
                            oi = e[18],
                            ai = e[18],
                            i = function (i, m) {
                                if (null == i) return null;
                                for (var t = v(m), n = [], s = i.length, r = e[11]; r < s; r++) n.push(y(i[r], t--));
                                return n
                            },
                            o = function (i, m) {
                                if (null == i) return null;
                                for (var t = v(m), n = [], s = i.length, r = e[11]; r < s; r++) n.push(B(i[r], t++));
                                return n
                            },
                            ci = n("ChC3CWC3C3ChmiCiCiCCCiCim3C3C3C4ChC3mhmsCWC4ms33Cs3C3mChmi3iCCCimimmCWmC"),
                            li = t("3KiC3iiCiC343G323433s6iWi43s36"),
                            ui = m("iGCWCyWyCyCCCBC4Wym4WiW4meiG"),
                            hi = e[84],
                            fi = t("mhiKmsi4CBmCiym3iWChmiimmmCsiimWCCi3myC3iCm4isCimKihmdCmiBme3GCWm632m2Cy36mG3eC4WB3dWh3KWs34WC3yW33WWi3mWm3iWW33Wy3CW43sWK3h"),
                            Wi = fi.length,
                            di = e[369],
                            pi = e[40],
                            Ci = !1,
                            gi = !1,
                            yi = window && window[n("memGmCmhW3m4mGm2")] && window[s("memGmCmhW3m4mGm2")][t("mymGWCW3m2mhm6mi")] || t("m2mGW3iGmiWym4WCW3iGmymGWCW3m2mhm6mi"),
                            Bi = n(""),
                            Bi = function (i, s) {
                                if (null == i || void 0 == i || i == n("") || null == s || void 0 == s || s.length <= e[11]) return null;
                                s = s.split(m("Cd"));
                                for (var r = e[11]; r < s.length; r++) {
                                    var o = new RegExp(s[r].replace(/\./g, t("ies2")) + t("s3"));
                                    if (null != i.match(o)) return s[r]
                                }
                                return null
                            }(yi, Bi),
                            vi = li.replace(/[^a-zA-Z0-9$]/g, t("")).toLowerCase(),
                            wi = ui.replace(/[^a-zA-Z0-9$]/g, n("")).toLowerCase(),
                            Gi = function (i) {
                                var m = [];
                                if (!i) return m;
                                i = i.split(t("s2"));
                                for (var n = r(""), o = e[11]; o < i.length; o++) o < i.length - e[536] && (n = s("s2") + i[i.length - e[536] - o] + n, m.push(n));
                                return m
                            }(yi);
                        Gi.push(null);
                        Gi.push(r("s2") + yi);
                        (function (i) {
                            for (var t = e[11], r = (X[s("mCmGmGmdm4mi")] || s("")).split(n("CdsB")), o = e[11]; o < r.length; o++) {
                                var a = r[o].indexOf(m("C6"));
                                a >= e[11] && r[o].substring(e[11], a) == i && (t += e[536])
                            }
                            return t
                        })(li) > e[536] && J();
                        !
                            function () {
                                var e = K();
                                if (null == e || void 0 == e || e == r("")) e = !1;
                                else {
                                    var i;
                                    if (i = F()) e = P(e), i = !(null == e || e - (new (window[n("33mhW3mi")]))[s("mWmiW3i3m4m6mi")]() <= di - pi);
                                    e = i
                                }
                                return e
                            }() ? q() : (T(K()), A(O()), yi = H(), window[r("WCmiW3i3m4m6mimGWiW3")] && window[r("WCmiW3i3m4m6mimGWiW3")](q, yi))
                    }()
            }()
    }();
var Core = function (e, i, m) {
    var t = document.domain,
        n = t.indexOf("bbs.") >= 0;
    if (/.*\.caipiao\.163\.com$/i.test(t) && !n) try {
        document.domain = "caipiao.163.com"
    } catch (s) { }
    if (/.*\.*(?:cai|cp)\.163\.com$/i.test(t)) try {
        document.domain = "163.com"
    } catch (s) { }
    var r = false;
    var o = ["qq", "weixin"];
    if ("58tc" === i.cookie("unionLogin")) o.push("wuba");
    i.login.setDefaultConf({
        product: "caipiao",
        promark: "tuwBcCx",
        host: "caipiao.163.com",
        productkey: "dea73de74a83060af37c341a95904479",
        cssDomain: "http://pimg1.126.net/caipiao/",
        baseCssFiles: "css2/login-urs-red-201604.css?132",
        oauthLogin: o,
        frameSize: {
            width: 420,
            height: 460
        }
    });
    i.login.hook({
        getNickName: function (e) {
            switch (e.site) {
                case "qq":
                case "weixin":
                    var m = i.cookie("CPThirdPartyInfo") || "{}",
                        t;
                    try {
                        t = JSON.parse(m).nickName || null
                    } catch (n) {
                        t = null
                    }
                    return t;
                case "58":
                    return "58同城用户" + e.base.replace(/@.+$/, "")
            }
            return e.alias || e.base
        },
        onLogin: function (e, m) {
            r = "163" !== e.site;
            switch (e.site) {
                case "qq":
                    i.get("http://caipiao.163.com/third/qq_login.html?username=" + encodeURIComponent(e.base), m);
                    break;
                case "weixin":
                    i.get("http://caipiao.163.com/third/weixin_login.html?username=" + encodeURIComponent(e.base), m);
                    break;
                default:
                    m()
            }
        }
    });
    i.login.drag.init({
        height: 80
    });
    var a = {
        connectTime: e.performance && e.performance.timing ? e.performance.timing.connectStart || 0 : 0,
        serverInitTime: +new Date,
        localInitTime: +new Date,
        getServerTime: function () {
            var e = this.localInitTime - this.connectTime,
                i = this.serverInitTime + +new Date - this.localInitTime;
            return new Date(this.connectTime > 0 && e > 0 ? i + e : i)
        }
    };
    var c = {
        countLoadingTime: i.noop,
        version: "2.01",
        serverTime: function () {
            return a.getServerTime()
        },
        now: function () {
            return (new Date).getTime()
        },
        GC: e.CollectGarbage || i.noop,
        log: i.getPara("debugger") && e.console ?
            function () {
                return e.console.log.applay(e.console, arguments)
            } : i.noop,
        infoCdnUrl: "http://pimg1.126.net/caipiao_info",
        cdnUrl: "http://myola.com/Scripts/163/cdn/",
        //cdnUrl: "http://pimg1.126.net/caipiao/",
        navConfig: {
            appName: "网易彩票",
            appId: "caipiao",
            funcEntry: true,
            regUrl: "javascript:Core.register();"
        },
        navInit: function (e, i, m, t) {
            this.configInit && this.configInit(e, i, m, t);
            if (this.userPage || this.privatePage) this.navConfig.logoutUrl = "http://reg.163.com/Logout.jsp?username={username}&url=" + encodeURIComponent("http://caipiao.163.com/reg/logoutredirect.html?gotoUrl=" + encodeURIComponent("//caipiao.163.com"));
            easyNav.init(this.navConfig);
            delete this.navInit
        },
        configInit: function (m, t, n, s) {
            this.easyNav = e.easyNav;
            this.cdnUrl = m;
            this.version = n || this.version;
            if (s) a.serverInitTime = +s;
            i.bindModule({
                dialog: {
                    js: "js2/dialog.js"
                },
                scrollWhenNeed: {
                    js: "js2/easyTools/scroll.js"
                },
                easyEvents: {
                    js: "js2/easyTools/event.js"
                }
            }, this.cdnUrl);
            i.bindModule(i.fn, {
                "disableSelection enableSelection disableRightClick enableRightClick disableIME enableIME setControlEffect": {
                    js: "js2/easyTools/tools.js"
                },
                bindDrag: {
                    js: "js2/easyTools/drag.js"
                },
                "scrollGrid xScrollGrid": {
                    js: "js2/easyTools/scroll.js"
                },
                easyEvents: {
                    js: "js2/easyTools/event.js"
                },
                placeholder: {
                    js: "js2/placeholder.js"
                },
                carousel: {
                    js: "js2/carousel.js"
                }
            }, this.cdnUrl);
            this.bindModule({
                "insertMobDownFix insertMobDownHover initMobileLoad": {
                    js: "js2/phoneclient/mobileCom.js",
                    css: "css2/phoneclient/mobileCom.css"
                },
                "shareAction shareGet sharePost": {
                    js: "js2/shareAction.js"
                }
            });
            this.loadGolbalConfig();
            this.popularizeNavConfig();
            delete this.configInit
        },
        popularizeNavConfig: function () {
            if (i.cookie("caipiao_tcy")) {
                var e = i.cookie("caipiao_tcy");
                e = e.split("|");
                var m = document.URL;
                m = m.indexOf("from=") + 1 ? m : i.addUrlPara(document.URL, "from=reg");
                var t = i.addUrlPara(m, "isShowLogin=1");
                this.navConfig.regUrl = "http://reg.163.com/reg/reg.jsp?product=caipiaotcy&url=" + encodeURIComponent(m) + "&loginurl=" + encodeURIComponent(t) + "&username_r=" + (e[0] || "");
                if (e[1]) {
                    this.navConfig.loginConfig = this.navConfig.loginConfig || {};
                    this.navConfig.loginConfig.initUserName = e[1]
                }
            }
        },
        loadGolbalConfig: function () {
            //e.gameActConf ? i.sendMsg("globalConfig") : this.loadJS("//caipiao.163.com/globalConfig.html?" + +new Date, function () {
            //    i.sendMsg("globalConfig")
            //})
        },
        bindModule: function (e) {
            i.bindModule(this, e, this.cdnUrl);
            return this
        },
        gameAct: {
            is: function (m, t, n) {
                if (!c.gameActConfig) {
                    c.loadCdnJS("js2/config.js", function () {
                        c.gameAct.is(m, t, n)
                    });
                    return
                }
                var s = c.gameActConfig[m],
                    r = c.serverTime(),
                    o = false,
                    a, l = 0,
                    u = "",
                    h;
                if (i.isFunction(t)) {
                    n = t;
                    t = ""
                }
                if (s) {
                    h = i.isFunction(n) ?
                        function (e) {
                            n.call(s, e)
                        } : i.noop;
                    a = i.isArray(s.type);
                    if (s.range) {
                        if ("server" == s.range) {
                            var f = function () {
                                var i = e.gameActConf,
                                    n = false;
                                if (!i) return;
                                if (i[m]) n = t ? a ? s.type[i[m] - 1] == t : s.type == t : a ? s.type[i[m] - 1] : s.type;
                                return n
                            };
                            if (e.gameActConf) o = f();
                            else {
                                i.isFunction(h) && i.bindMsgOnce("globalConfig", function () {
                                    h(f())
                                });
                                return
                            }
                            i.isFunction(h) && h(o);
                            return o
                        }
                        i.each(s.range, function (e, i) {
                            var m, t, n, c;
                            if (i.indexOf("-") + 1) {
                                c = i.split("-");
                                if (c[1].indexOf(":") < 0) c[1] += " 23:59:59";
                                m = new Date(c[0]);
                                t = new Date(c[1])
                            } else {
                                n = new Date(i);
                                m = new Date(n.getFullYear(), n.getMonth(), n.getDate());
                                t = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1)
                            }
                            if (r >= m && r <= t) {
                                o = true;
                                l = e;
                                if (a && e >= s.type.length) l = 0;
                                return false
                            }
                        });
                        u = a ? s.type[l] : s.type
                    } else {
                        o = r <= s.end && (s.start ? r >= s.start : true);
                        u = a ? s.type[0] : s.type
                    }
                    o = t ? o && u == t : o ? u : ""
                }
                i.isFunction(h) && h(o)
            },
            list: function (e) {
                if (!i.isFunction(e)) return;
                var m = this,
                    t = function (i) {
                        m.is(i, function (m) {
                            m && e.call(this, i, m)
                        })
                    };
                if (!c.gameActConfig) c.loadCdnJS("js2/config.js", function () {
                    for (var e in c.gameActConfig) t(e)
                });
                else for (var n in c.gameActConfig) t(n)
            }
        },
        fastInit: function (e) {
            if (r) i("#myEpay").addClass("hide3");
            easyNav.onLogin(function () {
                c.getEpayInfo();
                if (null !== i.cookie("COOKIEYIMAFROM") && null !== i.cookie("COOKIEYIMACPC")) c.loadCdnJS("js2/popularize/entry.js")
            });
            if (c.eventWrap && c.events && i.fn.easyEvents) i(c.eventWrap).easyEvents(c.events, c);
            c.navInit && c.navInit(c.cdnUrl, "", +new Date, "", true);
            c.isLogin(function (e) {
                if (e) i.login.setURSId(e)
            });
            try {
                c.initMyCoupon().updateLogo().initLotteryList().dealCPPara()
            } catch (m) { }
            c.bindModule({
                popularizeConfigForBetPage: {
                    js: "js2/lottery/popularizeConfigForBetPage.js"
                },
                mobileDialogInit: {
                    js: ["js2/mobileDialogInit.js", "js2/tools.js"],
                    css: "css2/mobileDialogInit.css"
                },
                clickFun: {
                    js: ["js2/mobileDialogInit.js", "js2/tools.js"],
                    css: "css2/mobileDialogInit.css"
                }
            });
            delete c.fastInit;
            e && c.quickInit && c.quickInit()
        },
        dealCPPara: function () {
            var i = e.document,
                m = i.getElementsByTagName("a"),
                t = m.length,
                n = 0,
                s, r, o;
            for (; n < t; n++) {
                r = m[n];
                s = r.getAttribute("cppara") || "";
                if (s) {
                    o = r.innerHTML;
                    r.setAttribute("href", r.getAttribute("href") + "?" + s);
                    r.removeAttribute("cppara");
                    r.innerHTML = o
                }
            }
            return this
        },
        virualViewStat: function (e, i) {
            if (!e) return;
            neteaseTracker(true, e, i);
            return this
        },
        updateLogo: function () {
            var m = function () {
                var m = e.logoConf,
                    t, n, s;
                if (m) {
                    n = i("#docHead");
                    t = n.attr("rel") || "white";
                    s = m.img ? m : m[t];
                    if ("gray" === t && !s) s = m.white;
                    if (s && s.img) {
                        n.css("background-image", "url(" + s.img + ")");
                        if ("1" == s.outUrl) i(".logoLnk").addClass("outLogoLnk").attr("href", s.url || "/");
                        else if (s.url) {
                            i("#docHeadWrap .guideLnk").attr("href", s.url).attr("title", s.title || "").show();
                            return
                        }
                    }
                }
                i("#docHeadWrap .guideLnk").remove()
            };
            if (e.logoConf) m();
            else i.bindMsgOnce("globalConfig", m);
            return this
        },
        checkAd: function () {
            if (this.is4050x || this.hideAd || e.self !== e.top) return;
            var m = this,
                t = function () {
                    var t = e.adConfig,
                        n, s = m.pageId4Ad,
                        r, a = 0;
                    if (t) i.each(t, function (e, i) {
                        if (i.id && i.png && i.url) {
                            i.page = +(i.page || 3);
                            if (4 == i.type || 5 == i.type) m.showPngAd(i, "", "");
                            else if (i.page & s) m.showPngAd(i, "", function (e) {
                                if (!e && c.indexAdInit) c.indexAdInit()
                            })
                        }
                    });
                    o()
                },
                n = function () {
                    var e = JSON.parse(LS.get("seoAdCache") || "null");
                    if (e) {
                        e.zoom = .5;
                        m.showPngAd(e, "seo")
                    }
                };
            this.bindModule({
                showPngAd: {
                    js: "js2/popularize/hello.js"
                },
                fireSEO: {
                    js: "js2/popularize/SSEEOO.js"
                }
            });
            var s = i.getUrlPara("referered") || document.referrer,
                r = c.pullback || i.noop,
                o = r,
                a = s.replace(/^https?:\/\//g, "").replace(/\/.*/, "").toLowerCase();
            if (/reg\.163\.com/i.test(a) || /reg\.youdao\.com/i.test(a)) a = "";
            if (a && !/caipiao\.163\.com$/.test(a) && !/(?:cai|cp)\.163\.com$/.test(a) && !this.is4050x && e.top == e.self) o = function () {
                m.fireSEO(a, s, function (e) {
                    if (0 == e.length) {
                        r();
                        return
                    }
                    var t, s = e.length;
                    i.each(e, function (e, i) {
                        m.showPngAd(i, "seo", function (e) {
                            if (e) {
                                LS.remove("seoAdCache");
                                if (2 == e && 5 == i.mode) t = JSON.stringify(i)
                            }
                            s--;
                            if (0 == s) if (t) LS.set("seoAdCache", t);
                            else n()
                        })
                    });
                    r()
                })
            };
            else n();
            if (e.adConfig) t();
            else i.bindMsgOnce("globalConfig", t);
            return this
        },
        init: function () {
            this.fastInit && this.fastInit(1);
            i("#seohotNav").bindTab(i.noop, "click", "em[rel]");
            i("#showmore,.seohot_block .showmore").click(function () {
                var e = i(this).text();
                if (/更多/.test(e)) {
                    i(this).text(e.replace(/更多/, "收起"));
                    i(this).parent().css("height", "auto")
                } else {
                    i(this).text(e.replace(/收起/, "更多"));
                    i(this).parent().removeAttr("style")
                }
            });
            var m = i("#hot_block"),
                t = i("#sport_block"),
                n = function (e) {
                    if (!e[0]) return;
                    var i = e.find(".showmore"),
                        m = e.attr("style");
                    if (e.css("height", "auto").height() - e.removeAttr("style").height() <= 12) i.hide();
                    e.attr("style", m)
                };
            n(m);
            n(t);
            i(document).delegate("a[csrf],a.csrf", "click", function () {
                var e = i(this).attr("href") || "",
                    m = i(this).attr("csrf") || "csrf",
                    t;
                if (e && !/^(?:javascript|#)/.test(e)) {
                    t = i.cookie("ANTICSRF");
                    if (!t) {
                        t = +new Date;
                        i.cookie("ANTICSRF", t)
                    }
                    e = e.replace(new RegExp("(\\?|#)" + i.safeRegStr(m) + "=[^$|&]*?", "gi"), "");
                    i(this).attr("href", i.addUrlPara(e, m + "=" + t))
                }
            });
            i("#friendlyLink .more a").click(function () {
                i("#friendlyLink .hide").show();
                i("#friendlyLink .more").hide()
            });
            i("#seoFriendlyLink .more a").click(function () {
                i("#seoFriendlyLink .hide").show();
                i("#seoFriendlyLink .more").hide()
            });
            i(document).delegate('a[href*="javascript:"]', "click", function (e) {
                var m = i(this).attr("href").split("javascript:")[1];
                try {
                    new Function(m)()
                } catch (t) { }
                e.preventDefault()
            });
            if (i.getPara("debug")) i.cookie("debug", "true" === i.getPara("debug") ? "true" : null, {
                path: "/"
            });
            this.__debug__ = "true" === i.cookie("debug");
            this.checkAd();
            try {
                this.myInit()
            } catch (s) { }
            this.initNav();
            c.bindModule({
                sendPopularizeOrder: {
                    js: "js2/popularize/entry.js"
                }
            });
            if (null !== i.cookie("COOKIEYIMAFROM") && null !== i.cookie("COOKIEYIMACPC")) c.loadCdnJS("js2/popularize/entry.js");
            this.loadCdnJS("js2/jtip.js", function () {
                return !!i.jtip
            }, function () {
                i.jtip(".jtip")
            });
            var r = i(".tgTextWrap");
            r[0] && r.scrollGrid({
                perScroll: 1,
                interval: 3e3
            });
            var o = i(".scrollWrap");
            o[0] && o.xScrollGrid();
            if (i.getUrlPara("showDownloadClient")) this.clientDom();
            this.is4050x || this.hideSysMessage || e.top == e.self && /^caipiao\.163\.com$/i.test(e.location.host) && this.loadCdnJS("js2/userCenter/userMessage.js");
            var a = e.gameEn || c.gameEn;
            if (!a || "string" == !typeof a) {
                if (c.config && c.config.gameEn) a = c.config.gameEn;
                if (e.Game) {
                    if (Game.gameEn) a = e.Game.gameEn;
                    if (e.Game.config && e.Game.config.gameEn) a = e.Game.config.gameEn
                }
            }
            if (!/(orderview_detail|MyFollow_detail)\.html/i.test(location.href)) this.checkGamePause(a);
            delete this.init;
            delete this.myInit;
            this.quickInit && delete this.quickInit;
            this.GC()
        },
        checkGamePause: function () {
            var m, t;
            return function (n, s) {
                var r = this;
                if (t) return;
                if (e.self !== e.top) return;
                t = e.setTimeout(function () {
                    s = s || i.noop;
                    c.loadCdnJS("js2/game/stopGameStatus.js", function () {
                        return !!Class.Game && Class.Game.StopGameStatus
                    }, function () {
                        m = m || Class.Game.StopGameStatus.create();
                        r.stopGameStatus = m;
                        m.onCheck(function (e) {
                            s(e)
                        });
                        m.checkStopStatus(n)
                    });
                    t = null
                }, 200)
            }
        }(),
        clientDom: function () {
            var e = i.getUrlPara("iclientid") || "411654863",
                m = i.getUrlPara("channel") || "netease",
                t = '<style id="cssId">.downClient2{width:990px;margin:0 auto;   background: none repeat scroll 0 0 #F0F0F0;overflow: hidden;padding:45px 0; background:-webkit-gradient(linear,0 0,0 104%,from(#fff),to(#e5e5e5));background:-moz-linear-gradient(top, #fff, #e5e5e5 104%);-pie-background:linear-gradient(top, #fff, #e5e5e5 104%);position:relative;}.leftMod2 {float: left;padding: 0 0 0 88px;}.rightBtn2{padding:15px 41px 0 0;float:right;}#downBtn2{width:302px;text-align:center;border-radius:6px;font:52px/94px "Microsoft YaHei",Simhei;cursor:pointer;border:1px solid #dadada;border-bottom:1px solid #b7b7b7;background:-webkit-gradient(linear,0 0,0 104%,from(#fff),to(#d8d8d8));background:-moz-linear-gradient(top, #fff, #d8d8d8 104%);-pie-background:linear-gradient(top, #0, #d8d8d8 104%);-webkit-box-shadow: 0px 5px 5px -5px #fff;-moz-box-shadow: 0px 5px 5px -5px #fff;box-shadow: 0px 5px 5px -5px #fff;display:block;}#downBtn2, a#downBtn2:link, a#downBtn2:visited, a#downBtn2:hover{ color:#5f5f5f; text-decoration:none;}.closeBtn {position: absolute; top: 15px;left:18px;z-index: 1;cursor:pointer;}</style>',
                n = t + '<div class="downClient2" style="width:100%;padding:0;border-bottom:1px solid #D1D1D1;"><div class="downClient2"><span class="closeBtn"><img src="' + c.cdnUrl + '/img/index/close_btn.png" /></span><div class="leftMod2"><img src="' + c.cdnUrl + '/img/index/wapLogo.png" /></div><div class="rightBtn2"><a href="//caipiao.163.com/m/downloadClient.html?iclientid=' + e + "&channel=" + m + '&isPop=true" target="_blank" id="downBtn2">立即下载</a> </div></div></div>';
            i(document.body).prepend(n);
            i(".closeBtn").click(function () {
                i(".downClient2, #cssId").remove()
            })
        },
        emptySendHttp: function (i) {
            var m = "imgLoad_" + +new Date + parseInt(100 * Math.random()),
                t, n;
            t = e[m] = new Image;
            t.onload = function () {
                e[m] = null;
                _ntes_void()
            };
            t.onerror = function () {
                e[m] = null
            };
            i = i.replace(/#\S*$/, "");
            n = (i + "").indexOf("?") + 1 ? "&" : "?";
            t.src = i + n + "d=" + +new Date;
            t = null
        },
        zclip: e.clipboardData ?
            function (m, t, n) {
                i(m).click(function () {
                    var m = true,
                        s = i.isFunction(t) ? t() : String(t);
                    try {
                        e.clipboardData.clearData();
                        e.clipboardData.setData("Text", s)
                    } catch (r) {
                        m = false
                    }
                    n && n(m)
                })
            } : function (e, m, t) {
                var n = i(e),
                    s = this.cdnUrl + "/swf/ZeroClipboard20130715.swf";
                this.loadCdnJS("js2/zClip.js", function () {
                    return !!i.fn.zclip
                }, function () {
                    n.zclip({
                        path: s,
                        copy: m,
                        afterCopy: t
                    })
                })
            },
        insertFlash: function (e, m, t) {
            m.path = m.path || this.cdnUrl + "/swf/" + m.swf;
            this.loadCdnJS("js2/flash.js", function () {
                return !!i.easyFlash
            }, function () {
                var n = i.isFunction(t) ? t(i.easyFlash.support, i.easyFlash.version) : null;
                if (false !== n) i.easyFlash.insert(e, m)
            })
        },
        loadGame: function (m, t) {
            var n = "object" == typeof m;
            this.loadCdnJS("js2/game/game.js", function () {
                return !!e.Game && !!e.Game.loadMolude
            }, function () {
                var s = e.Game,
                    r;
                c.Game = c.G = s;
                if (n) r = m;
                else {
                    r = {};
                    r[m] = t || i.noop
                }
                for (var o in r) s.loadMolude(o, r[o] || i.noop)
            });
            return this
        },
        getTimeDescription: function (e) {
            var i = +e > 0 ? +e : 0,
                m = 6e4,
                t = 60 * m,
                n = 24 * t,
                s = function (e) {
                    return ("0" + Math.floor(e)).slice(-2)
                };
            return [s(i / n), s(i % n / t), s(i % n % t / m), s(i % n % t % m / 1e3)]
        },
        scrollWhenNeed: function (e, m) {
            i.scrollWhenNeed(e, m)
        },
        formatTime: function (e, m) {
            return i.formatTime(e, m)
        },
        initMyCoupon: function () {
            var m = i("#myCoupon .couponContent"),
                t, n = function (t) {
                    var s, r, o = '<dl><dt><span class="couponName">名称</span><span class="couponMoney">可用金额(元)</span><span class="couponRange">适用范围</span></dt>{0}</dl>',
                        a = '<dd class="{ddClass}"><span class="couponName">{couponName}</span><span class="couponMoney">{remainAmount}</span><span class="couponRange" title="{ruleDesc}">{ruleDesc}</span></dd>',
                        c = '<a target="_blank" href="//caipiao.163.com/my/coupon.html#from=top" class="seeCoupon">查看全部<i>{couponNum}</i>个红包</a>',
                        l = [],
                        u = [],
                        h = 0,
                        f;
                    try {
                        if ("string" == typeof t) t = this.parseJSON(t);
                        r = t.accountId;
                        if (r && r != e.easyNav.sessionId) i.login.setURSId(r);
                        if (t && t.couponList) {
                            s = t.couponList;
                            f = s.length;
                            if (f > 0) {
                                for (; h < f; h++) {
                                    s[h].couponName = s[h].couponName || "";
                                    s[h].remainAmount = s[h].remainAmount || "";
                                    s[h].ruleDesc = s[h].ruleDesc || "";
                                    if (h == f - 1) s[h].ddClass = "last";
                                    else s[h].ddClass = "";
                                    u.push(i.format(a, s[h]))
                                }
                                l.push(i.format(o, u.join("")));
                                if (t.couponNum && t.couponNum > 3) l.push(i.format(c, t));
                                m.html(l.join(""))
                            } else m.html('<div class="tip"><i class="iconHappy"></i>您当前没有可以使用的红包</div>')
                        } else if (t.status == -1) m.html('<div class="tip"><i class="iconHappy"></i>您没有登录，请<a href="javascript:easyNav.login();" target="_self">登录</a>后查看</div>');
                        else if (t.status == -2) m.html('<div class="tip"><i class="iconHappy"></i>您当前没有可以使用的红包</div>');
                        else m.html('<div class="tip"><i class="iconSad"></i>获取失败，请稍后再试</div>');
                        e.myCouponCallBack = null;
                        delete n
                    } catch (W) {
                        e.myCouponCallBack = null;
                        m.html('<div class="tip"><i class="iconSad"></i>获取失败，请稍后再试</div>')
                    }
                },
                s = function () {
                    m.html('<div class="tip"><i class="iconLoading"></i>努力加载中</div>');
                    e.myCouponCallBack = n;
                    i.ajax({
                        url: "//caipiao.163.com/my/topCoupon.html",
                        cache: false,
                        complete: function () {
                            if (e.myCouponCallBack) e.myCouponCallBack()
                        },
                        context: e.Core,
                        dataType: "jsonp",
                        jsonp: "callBackName",
                        jsonpCallback: "myCouponCallBack",
                        timeout: 5e3
                    })
                };
            i("#myCoupon").delegate(".topNavHolder", "mouseenter", function () {
                t = e.setTimeout(function () {
                    s()
                }, 100)
            }).delegate(".topNavHolder", "mouseleave", function () {
                t && e.clearTimeout(t)
            });
            return this
        },
        initNav: function () {
            i('#funcTab .wordsNum4 a[href*="/hit_ssq.html?index=1"]').remove();
            var e = function (e) {
                var m = i(this);
                if (!!m.attr("user") && !easyNav.isLogin()) {
                    c.easyNav.login(this.href);
                    e.preventDefault();
                    return
                }
            };
            i(".mcDropMenuBox").each(function () {
                c.easyNav.bindDropMenu(this, i(".mcDropMenu", this)[0], "mouseover", "dropMenuBoxActive", e, 200);
                i(".topNavHolder", this).click(e)
            });
            var m = i("#topNavRight li:eq(2)"),
                t = i.parseJSON(LS.get("topNavGiftLink")),
                n = function () {
                    m.unbind("mouseover", n);
                    if (t && (new Date).getTime() - t.time < 10 * 60 * 1e3) s(t.data);
                    else c.get("http://caipiao.163.com/activity/newUserPayAds.html?memType=myordermenu", function (e, i) {
                        if (!e) {
                            s(i);
                            t = {
                                data: i,
                                time: (new Date).getTime()
                            };
                            LS.set("topNavGiftLink", JSON.stringify(t))
                        }
                    })
                },
                s = function (e) {
                    try {
                        var t = c.parseJSON(e),
                            n;
                        if (t.img) {
                            n = i.format("<a style='padding-left:0;' href='{url}' title='{title}'><img src='{img}' /></a>", {
                                img: t.img,
                                url: t.url || "javascript:;",
                                title: t.title || ""
                            });
                            m.find(".mcDropMenu").append(n).css({
                                "padding-bottom": 0,
                                background: "#f9f7f7",
                                "text-indent": "9px"
                            })
                        }
                    } catch (s) { }
                };
            m.bind("mouseover", n);
            if (i.getUrlPara("isShowLogin") && !this.easyNav.isLogin()) this.easyNav.login();
            i(".wordsNum2,.wordsNum4", "#funcTab").each(function () {
                c.easyNav.bindDropMenu(this, i(".mcDropMenu", this)[0], "mouseover", "hover", i.noop, 200)
            });
            i("#funcTab a").not("#lotteryListEntry a").removeAttr("title");
            var r = i("#funcTab li[pid=mobile]"),
                o = i("a", r);
            o.attr("href", o.attr("href") + "?from=nav1");
            o.prepend('<span class="icon_mob"></span>');
            if (!r.hasClass("active")) r.hover(function () {
                c.__mobDownHover = 1;
                c.insertMobDownHover(r, true, {
                    from: "nav1"
                })
            }, function () {
                c.__mobDownHover = 0
            });
            delete this.initNav;
            return this
        },
        initLotteryList: function () {
            var m = i("#lotteryListEntry"),
                t = i("#lotteryList"),
                n = i("#funcTab"),
                s = i(".lotteryListWrap", t),
                r = false,
                o, a = function (e) {
                    e.prepend('<iframe class="iFrameGround" frameborder="0"></iframe>');
                    e.find(".iFrameGround:first").width(e.outerWidth()).height(e.outerHeight())
                },
                c = function (e) {
                    if (!i.isIE678) {
                        t.show();
                        !r && s.stop().animate({
                            height: o
                        }, 300, function () {
                            s.css("overflow", "visible");
                            r = true
                        });
                        r = true
                    }
                },
                l = function (e) {
                    if (!i.isIE678) {
                        if (e && "click" === e.type) {
                            m.addClass("open");
                            return
                        }
                        r && s.stop().animate({
                            height: 0
                        }, 300, function () {
                            s.css("overflow", "visible");
                            t.hide();
                            r = false
                        });
                        r = false
                    }
                },
                u = function () {
                    var e = i(".otherGames", t),
                        m = 100;
                    t.css("display", "block");
                    e.each(function (e, t) {
                        var n = i(this),
                            s = i("h3", n),
                            r = i(".exBox", n),
                            o, a, c = +n.attr("data-maxrow"),
                            l, u = n.height();
                        s.css({
                            height: u - (u / 2 - 16),
                            "padding-top": u / 2 - 16
                        });
                        o = i.makeArray(r.children());
                        if (r[0]) {
                            a = o.length;
                            l = Math.ceil(a / c);
                            r.height(u);
                            r.width(l * m);
                            r.empty();
                            for (var e = 0; e < l; e++) {
                                var h = i("<div></div>");
                                h.css({
                                    width: m,
                                    height: u,
                                    "float": "left"
                                });
                                h.append(o.slice(e * c, (e + 1) * c));
                                r.append(h)
                            }
                            n.hover(function () {
                                n.addClass("otherGamesOn");
                                n.prev().css("border", "0")
                            }, function () {
                                n.prev().removeAttr("style");
                                n.removeClass("otherGamesOn")
                            })
                        }
                    })
                };
            this.dealKuai2();
            s.delegate("a[href]", "click", function (e) {
                var m;
                m = this.getAttribute("href", 2);
                m = /^http/.test(m) ? m : location.protocol + "//" + location.host + m;
                if ("_blank" !== i(this).attr("target") && m.split("#")[0] == location.href.split("#")[0]) {
                    location.href = m;
                    location.reload();
                    e.preventDefault()
                }
            });
            if (t[0]) {
                function h() {
                    var m = e.lotteryListConf,
                        t, n, r, o, a, c, l, h = "",
                        f = ["", "高频", "竞技", "数字"],
                        W = ["", 4, 2, 2],
                        d = {
                            jclq_mix_p: "jclq"
                        },
                        p;
                    if (m) {
                        t = m.top;
                        n = m.gp;
                        r = m.jj;
                        o = m.sz;
                        p = i.map([t, n, r, o], function (e, m) {
                            if (0 === m) {
                                a = '<li class="zyGame {className}"><a gid="{gameEn}" href="{url}#from=leftnav"><em class="cz_logo35 logo35_{logoName}"></em><strong>{gameCn}</strong>{grayHTML}{redHTML}</a></li>';
                                c = "";
                                l = ""
                            } else {
                                a = '<em class="{className}"><a gid="{gameEn}" title="{title}" href="{url}#from=leftnav">{gameCn}{redHTML}</a></em>';
                                c = '<li class="otherGames clearfix ' + (3 === m ? "end" : "") + '" data-maxrow=' + W[m] + "><h3>" + f[m] + "</h3><div>";
                                l = "</div></li>";
                                h = '<i class="exArrow">&gt;</i></div><div class="exBox">'
                            }
                            return c + i.map(e, function (e, t) {
                                var n = "";
                                if (0 === m) if (e.isTJ) n = "tjGame";
                                return (t == 2 * W[m] ? h : "") + i.format(a, i.extend({}, e, {
                                    url: e.url.replace(/\#from\=.*/, ""),
                                    className: n,
                                    grayHTML: e.gray ? '<span class="grayWords">' + e.gray + "</span>" : "",
                                    redHTML: e.red ? '<span class="redWords"><i class="arrowsIcon"></i>' + e.red + "</span>" : "",
                                    logoName: d[e.gameEn] || e.gameEn
                                }))
                            }).join("") + l
                        }).join("");
                        s.find("ul").html(p);
                        u();
                        s.trigger("contentChange")
                    }
                }
                if (e.lotteryListConf) h();
                else i.bindMsgOnce("globalConfig", h);
                this.gameAct.list(function (e, m) {
                    var t = "cz_" + m;
                    n.find("[pid=" + e + "]").each(function () {
                        i(this).find("a").prepend("<span class='" + t + "'></span>")
                    })
                })
            }
            if (m[0] && t[0] && i.contains(m[0], t[0])) {
                this.easyNav.bindDropMenu(m[0], t[0], "mouseover", "open", i.noop, 200, c, l);
                if (i.isIE678) a(t);
                else {
                    o = s.outerHeight();
                    t.hide().css({
                        left: 0
                    });
                    s.height(0);
                    s.bind("contentChange", function () {
                        if (!s.is(":animated")) {
                            if (!r) t.css({
                                left: -9999
                            }).show();
                            s.height("auto");
                            o = s.outerHeight();
                            if (!r) {
                                t.hide().css({
                                    left: 0
                                });
                                s.height(0)
                            }
                        }
                    })
                }
            }
            delete this.initLotteryList;
            return this
        },
        dealKuai2: function () {
            var m = i("#lotteryList"),
                t = function (e) {
                    var t = location.host.toLowerCase(),
                        n = "caipiao.163.com" == t,
                        s = "zx.caipiao.163.com" == t || "cai.163.com" == t;
                    if (1 == e && 1 == c.pageId4Ad || 2 == e) {
                        m.find("[gid=kuai2]").parent().remove();
                        n && 1 == c.pageId4Ad && i('.chartList a[href*="/gdkuai2/"]').parent().remove()
                    }
                    if (2 == e) {
                        if (n) {
                            i("#docBody").find(".lately,.allList").find("[gid=kuai2]").closest("li").remove();
                            i('.main .awardList a[href*="/gdkuai2/"]').closest("tr").remove();
                            i(".index_help_right .icon_kuai2").closest("li").remove();
                            i("#siderbar").find('[href*="/99KJ821500754IHE.html"]').closest("li").remove()
                        }
                        if (s) {
                            i(".zx_nav,.quick_in").find('a[href*="/gdkuai2/"]').remove();
                            i("#kuai2").remove()
                        }
                    }
                };
            if (e.kuai2Display) t(e.kuai2Display);
            else i.bindMsgOnce("globalConfig", function () {
                t(e.kuai2Display)
            });
            delete this.dealKuai2
        },
        getEpayInfo: function () {
            if (!i("#myEpay")[0] || this.getEpayInfo.lock || this.isStatic) return this;
            this.getEpayInfo.lock = 1;
            e.setTimeout(function () {
                c.getEpayInfo.lock = 0
            }, 1e3);
            var m = this.easyNav.isLogin(true),
                t = encodeURIComponent,
                n = easyNav.sessionId || easyNav.account,
                s = {
                    charge: "https://epay.163.com/charge/chargeView.htm?from=caipiao&returnUrl=" + t(document.URL),
                    center: "https://epay.163.com/servlet/controller?operation=main",
                    active: "https://epay.163.com/servlet/controller?operation=activateAccount&method=activateView&sourceOp=main&platformReturnUrl={0}",
                    auth: "https://epay.163.com/quickpay_identify/view.htm"
                };
            m && this.get("//caipiao.163.com/epayAccountInfo.html", function (e, m) {
                if (e || !m) return;
                var n = this.parseJSON(m),
                    r = n.accountId || "",
                    o;
                i.login.setURSId(r);
                var a = 1 == n.ifDisplayBalance,
                    c = +n.epayStatus || 0,
                    l = i("#myEpay"),
                    u, h;
                switch (c) {
                    case 1:
                        h = s.center;
                        if (a) u = "余额：<strong class='c_ba2636'>" + n.epayBalance + "</strong> 元 <a href='" + s.charge + "' target='_blank'>充值</a>";
                        break;
                    case 123:
                        h = s.center;
                        s.active = i.format(s.active, t(n.platformReturnUrl || ""));
                        if (a) u = "余额：<strong class='c_ba2636'>" + n.epayBalance + "</strong> 元 <a href='" + s.charge + "' target='_blank'>充值</a>";
                        o = "为了您的账户资金安全和顺利领奖，立即补全帐户信息。<a class='nowrap c_1e50a2' target='_blank' href='" + s.active + "'>立即补全帐户信息</a>";
                        l.addClass("jtip").attr("inf", o);
                        break;
                    case 3:
                    case 4:
                        s.active = i.format(s.active, t(n.platformReturnUrl || ""));
                        o = "您的奖金将派发至网易支付，补全帐户信息<br/>即可查看和使用。<a class='nowrap c_1e50a2' target='_blank' href='" + s.active + "'>立即补全帐户信息</a>";
                        u = "余额：<strong class='c_ba2636'>***</strong> 元 <a href='https://epay.163.com/' target='_blank' inf=\"" + o + "\" class='jtip'>查看</a><a href='" + s.charge + "' target='_blank'>充值</a>";
                        l.addClass("jtip").attr("inf", o);
                        break;
                    case 6:
                        h = s.center;
                        if (a) u = "余额：<strong class='c_ba2636'>" + n.epayBalance + "</strong> 元 <a href='" + s.charge + "' target='_blank'>充值</a>";
                        o = "为了您的账户资金安全和顺利领奖，请进行实名认证。<a class='nowrap c_1e50a2' target='_blank' href='" + s.auth + "'>实名认证</a>";
                        l.addClass("jtip").attr("inf", o)
                }
                h && l.attr("href", h);
                u && i("#topEpayInfo").html(u).show()
            });
            return this
        },
        myInit: i.noop,
        parseJSON: function (e) {
            e = e.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g, "new Date($2)");
            return new Function("return " + e)()
        },
        get: i.get2,
        post: i.post2,
        getJSON: i.getJSON2,
        postJSON: i.postJSON2,
        loadJS: i.loadJS,
        loadCss: i.loadCss,
        loadCdnJS: function () {
            var e = arguments;
            Array.prototype.push.call(arguments, this.cdnUrl);
            return this.loadJS.apply(this, e)
        },
        loadCdnCss: function (e) {
            return this.loadCss(e, this.cdnUrl)
        },
        isLogin: function (e) {
            //this.get("http://caipiao.163.com/identity/queryLoginStatus.html", function (i, m) {
            //    var t = i ? this.easyNav.isLogin() ? easyNav.account : "" : "0" == m ? "" : m;
            //    e && e.call(this, t)
            //})
        },
        register: function (e) {
            i.login.reg(e)
        },
        css3: {
            test: function (e, i) {
                var t = document.createElement("div").style,
                    n = ["Webkit", "Moz", "O", "ms"],
                    s = e.charAt(0).toUpperCase() + e.slice(1),
                    r = (e + " " + n.join(s + " ") + s).split(" ");
                for (var o in r) if (t[r[o]] !== m) return i ? r[o] : true;
                return i ? "" : false
            },
            getName: function (e) {
                var i = "",
                    m = {
                        WebkitAnimation: "webkitAnimationEnd",
                        OAnimation: "oAnimationEnd",
                        msAnimation: "MSAnimationEnd",
                        animation: "animationend"
                    };
                switch (e.toLowerCase()) {
                    case "animationend":
                        i = m[this.test("animation", true)];
                        break;
                    default:
                        i = this.test(e, true)
                }
                return i
            }
        }
    };
    return c
}(window, jQuery);
jQuery(window).unload(function () {
    document.oncontextmenu = null;
    window.Core = null;
    window.onload = null;
    window.onresize = null;
    window.onunload = null;
    window.onerror = null;
    window.onbeforeunload = null;
    (window.CollectGarbage ||
        function () { })()
});
jQuery(document).ready(function () {
    Core.init && Core.init()
});
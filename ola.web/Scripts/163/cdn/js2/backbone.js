!
    function (t, e) {
        if ("function" === typeof define && define.amd) define(["underscore", "jquery", "exports"],
            function (i, s, r) {
                t.Backbone = e(t, r, i, s)
            });
        else if ("undefined" !== typeof exports) {
            var i = require("underscore");
            e(t, exports, i)
        }
        t.Backbone = e(t, {},
            t._, t.jQuery || t.Zepto || t.ender || t.$)
    }(this,
        function (t, e, i, s) {
            var r = t.Backbone;
            var n = [];
            var a = n.push;
            var o = n.slice;
            var h = n.splice;
            e.VERSION = "1.1.2";
            e.$ = s;
            e.noConflict = function () {
                t.Backbone = r;
                return this
            };
            e.emulateHTTP = false;
            e.emulateJSON = false;
            var u = e.Events = {
                on: function (t, e, i) {
                    if (!c(this, "on", t, [e, i]) || !e) return this;
                    this._events || (this._events = {});
                    var s = this._events[t] || (this._events[t] = []);
                    s.push({
                        callback: e,
                        context: i,
                        ctx: i || this
                    });
                    return this
                },
                once: function (t, e, s) {
                    if (!c(this, "once", t, [e, s]) || !e) return this;
                    var r = this;
                    var n = i.once(function () {
                        r.off(t, n);
                        e.apply(this, arguments)
                    });
                    n._callback = e;
                    return this.on(t, n, s)
                },
                off: function (t, e, s) {
                    var r, n, a, o, h, u, l, f;
                    if (!this._events || !c(this, "off", t, [e, s])) return this;
                    if (!t && !e && !s) {
                        this._events = void 0;
                        return this
                    }
                    o = t ? [t] : i.keys(this._events);
                    for (h = 0, u = o.length; h < u; h++) {
                        t = o[h];
                        if (a = this._events[t]) {
                            this._events[t] = r = [];
                            if (e || s) for (l = 0, f = a.length; l < f; l++) {
                                n = a[l];
                                if (e && e !== n.callback && e !== n.callback._callback || s && s !== n.context) r.push(n)
                            }
                            if (!r.length) delete this._events[t]
                        }
                    }
                    return this
                },
                trigger: function (t) {
                    if (!this._events) return this;
                    var e = o.call(arguments, 1);
                    if (!c(this, "trigger", t, e)) return this;
                    var i = this._events[t];
                    var s = this._events.all;
                    if (i) f(i, e);
                    if (s) f(s, arguments);
                    return this
                },
                stopListening: function (t, e, s) {
                    var r = this._listeningTo;
                    if (!r) return this;
                    var n = !e && !s;
                    if (!s && "object" === typeof e) s = this;
                    if (t) (r = {})[t._listenId] = t;
                    for (var a in r) {
                        t = r[a];
                        t.off(e, s, this);
                        if (n || i.isEmpty(t._events)) delete this._listeningTo[a]
                    }
                    return this
                }
            };
            var l = /\s+/;
            var c = function (t, e, i, s) {
                if (!i) return true;
                if ("object" === typeof i) {
                    for (var r in i) t[e].apply(t, [r, i[r]].concat(s));
                    return false
                }
                if (l.test(i)) {
                    var n = i.split(l);
                    for (var a = 0,
                        o = n.length; a < o; a++) t[e].apply(t, [n[a]].concat(s));
                    return false
                }
                return true
            };
            var f = function (t, e) {
                var i, s = -1,
                    r = t.length,
                    n = e[0],
                    a = e[1],
                    o = e[2];
                switch (e.length) {
                    case 0:
                        while (++s < r) (i = t[s]).callback.call(i.ctx);
                        return;
                    case 1:
                        while (++s < r) (i = t[s]).callback.call(i.ctx, n);
                        return;
                    case 2:
                        while (++s < r) (i = t[s]).callback.call(i.ctx, n, a);
                        return;
                    case 3:
                        while (++s < r) (i = t[s]).callback.call(i.ctx, n, a, o);
                        return;
                    default:
                        while (++s < r) (i = t[s]).callback.apply(i.ctx, e);
                        return
                }
            };
            var d = {
                listenTo: "on",
                listenToOnce: "once"
            };
            i.each(d,
                function (t, e) {
                    u[e] = function (e, s, r) {
                        var n = this._listeningTo || (this._listeningTo = {});
                        var a = e._listenId || (e._listenId = i.uniqueId("l"));
                        n[a] = e;
                        if (!r && "object" === typeof s) r = this;
                        e[t](s, r, this);
                        return this
                    }
                });
            u.bind = u.on;
            u.unbind = u.off;
            i.extend(e, u);
            var p = e.Model = function (t, e) {
                var s = t || {};
                e || (e = {});
                this.cid = i.uniqueId("c");
                this.attributes = {};
                if (e.collection) this.collection = e.collection;
                if (e.parse) s = this.parse(s, e) || {};
                s = i.defaults({},
                    s, i.result(this, "defaults"));
                this.set(s, e);
                this.changed = {};
                this.initialize.apply(this, arguments)
            };
            i.extend(p.prototype, u, {
                changed: null,
                validationError: null,
                idAttribute: "id",
                initialize: function () { },
                toJSON: function (t) {
                    return i.clone(this.attributes)
                },
                sync: function () {
                    return e.sync.apply(this, arguments)
                },
                get: function (t) {
                    return this.attributes[t]
                },
                escape: function (t) {
                    return i.escape(this.get(t))
                },
                has: function (t) {
                    return null != this.get(t)
                },
                set: function (t, e, s) {
                    var r, n, a, o, h, u, l, c;
                    if (null == t) return this;
                    if ("object" === typeof t) {
                        n = t;
                        s = e
                    } else (n = {})[t] = e;
                    s || (s = {});
                    if (!this._validate(n, s)) return false;
                    a = s.unset;
                    h = s.silent;
                    o = [];
                    u = this._changing;
                    this._changing = true;
                    if (!u) {
                        this._previousAttributes = i.clone(this.attributes);
                        this.changed = {}
                    }
                    c = this.attributes,
                        l = this._previousAttributes;
                    if (this.idAttribute in n) this.id = n[this.idAttribute];
                    for (r in n) {
                        e = n[r];
                        if (!i.isEqual(c[r], e)) o.push(r);
                        if (!i.isEqual(l[r], e)) this.changed[r] = e;
                        else delete this.changed[r];
                        a ? delete c[r] : c[r] = e
                    }
                    if (!h) {
                        if (o.length) this._pending = s;
                        for (var f = 0,
                            d = o.length; f < d; f++) this.trigger("change:" + o[f], this, c[o[f]], s)
                    }
                    if (u) return this;
                    if (!h) while (this._pending) {
                        s = this._pending;
                        this._pending = false;
                        this.trigger("change", this, s)
                    }
                    this._pending = false;
                    this._changing = false;
                    return this
                },
                unset: function (t, e) {
                    return this.set(t, void 0, i.extend({},
                        e, {
                            unset: true
                        }))
                },
                clear: function (t) {
                    var e = {};
                    for (var s in this.attributes) e[s] = void 0;
                    return this.set(e, i.extend({},
                        t, {
                            unset: true
                        }))
                },
                hasChanged: function (t) {
                    if (null == t) return !i.isEmpty(this.changed);
                    return i.has(this.changed, t)
                },
                changedAttributes: function (t) {
                    if (!t) return this.hasChanged() ? i.clone(this.changed) : false;
                    var e, s = false;
                    var r = this._changing ? this._previousAttributes : this.attributes;
                    for (var n in t) {
                        if (i.isEqual(r[n], e = t[n])) continue; (s || (s = {}))[n] = e
                    }
                    return s
                },
                previous: function (t) {
                    if (null == t || !this._previousAttributes) return null;
                    return this._previousAttributes[t]
                },
                previousAttributes: function () {
                    return i.clone(this._previousAttributes)
                },
                fetch: function (t) {
                    t = t ? i.clone(t) : {};
                    if (t.parse === void 0) t.parse = true;
                    var e = this;
                    var s = t.success;
                    t.success = function (i) {
                        if (!e.set(e.parse(i, t), t)) return false;
                        if (s) s(e, i, t);
                        e.trigger("sync", e, i, t)
                    };
                    q(this, t);
                    return this.sync("read", this, t)
                },
                save: function (t, e, s) {
                    var r, n, a, o = this.attributes;
                    if (null == t || "object" === typeof t) {
                        r = t;
                        s = e
                    } else (r = {})[t] = e;
                    s = i.extend({
                        validate: true
                    },
                        s);
                    if (r && !s.wait) {
                        if (!this.set(r, s)) return false
                    } else if (!this._validate(r, s)) return false;
                    if (r && s.wait) this.attributes = i.extend({},
                        o, r);
                    if (s.parse === void 0) s.parse = true;
                    var h = this;
                    var u = s.success;
                    s.success = function (t) {
                        h.attributes = o;
                        var e = h.parse(t, s);
                        if (s.wait) e = i.extend(r || {},
                            e);
                        if (i.isObject(e) && !h.set(e, s)) return false;
                        if (u) u(h, t, s);
                        h.trigger("sync", h, t, s)
                    };
                    q(this, s);
                    n = this.isNew() ? "create" : s.patch ? "patch" : "update";
                    if ("patch" === n) s.attrs = r;
                    a = this.sync(n, this, s);
                    if (r && s.wait) this.attributes = o;
                    return a
                },
                destroy: function (t) {
                    t = t ? i.clone(t) : {};
                    var e = this;
                    var s = t.success;
                    var r = function () {
                        e.trigger("destroy", e, e.collection, t)
                    };
                    t.success = function (i) {
                        if (t.wait || e.isNew()) r();
                        if (s) s(e, i, t);
                        if (!e.isNew()) e.trigger("sync", e, i, t)
                    };
                    if (this.isNew()) {
                        t.success();
                        return false
                    }
                    q(this, t);
                    var n = this.sync("delete", this, t);
                    if (!t.wait) r();
                    return n
                },
                url: function () {
                    var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || M();
                    if (this.isNew()) return t;
                    return t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
                },
                parse: function (t, e) {
                    return t
                },
                clone: function () {
                    return new this.constructor(this.attributes)
                },
                isNew: function () {
                    return !this.has(this.idAttribute)
                },
                isValid: function (t) {
                    return this._validate({},
                        i.extend(t || {},
                            {
                                validate: true
                            }))
                },
                _validate: function (t, e) {
                    if (!e.validate || !this.validate) return true;
                    t = i.extend({},
                        this.attributes, t);
                    var s = this.validationError = this.validate(t, e) || null;
                    if (!s) return true;
                    this.trigger("invalid", this, s, i.extend(e, {
                        validationError: s
                    }));
                    return false
                }
            });
            var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
            i.each(v,
                function (t) {
                    p.prototype[t] = function () {
                        var e = o.call(arguments);
                        e.unshift(this.attributes);
                        return i[t].apply(i, e)
                    }
                });
            var g = e.Collection = function (t, e) {
                e || (e = {});
                if (e.model) this.model = e.model;
                if (e.comparator !== void 0) this.comparator = e.comparator;
                this._reset();
                this.initialize.apply(this, arguments);
                if (t) this.reset(t, i.extend({
                    silent: true
                },
                    e))
            };
            var m = {
                add: true,
                remove: true,
                merge: true
            };
            var y = {
                add: true,
                remove: false
            };
            i.extend(g.prototype, u, {
                model: p,
                initialize: function () { },
                toJSON: function (t) {
                    return this.map(function (e) {
                        return e.toJSON(t)
                    })
                },
                sync: function () {
                    return e.sync.apply(this, arguments)
                },
                add: function (t, e) {
                    return this.set(t, i.extend({
                        merge: false
                    },
                        e, y))
                },
                remove: function (t, e) {
                    var s = !i.isArray(t);
                    t = s ? [t] : i.clone(t);
                    e || (e = {});
                    var r, n, a, o;
                    for (r = 0, n = t.length; r < n; r++) {
                        o = t[r] = this.get(t[r]);
                        if (!o) continue;
                        delete this._byId[o.id];
                        delete this._byId[o.cid];
                        a = this.indexOf(o);
                        this.models.splice(a, 1);
                        this.length--;
                        if (!e.silent) {
                            e.index = a;
                            o.trigger("remove", o, this, e)
                        }
                        this._removeReference(o, e)
                    }
                    return s ? t[0] : t
                },
                set: function (t, e) {
                    e = i.defaults({},
                        e, m);
                    if (e.parse) t = this.parse(t, e);
                    var s = !i.isArray(t);
                    t = s ? t ? [t] : [] : i.clone(t);
                    var r, n, a, o, h, u, l;
                    var c = e.at;
                    var f = this.model;
                    var d = this.comparator && null == c && false !== e.sort;
                    var v = i.isString(this.comparator) ? this.comparator : null;
                    var g = [],
                        y = [],
                        _ = {};
                    var b = e.add,
                        w = e.merge,
                        x = e.remove;
                    var E = !d && b && x ? [] : false;
                    for (r = 0, n = t.length; r < n; r++) {
                        h = t[r] || {};
                        if (h instanceof p) a = o = h;
                        else a = h[f.prototype.idAttribute || "id"];
                        if (u = this.get(a)) {
                            if (x) _[u.cid] = true;
                            if (w) {
                                h = h === o ? o.attributes : h;
                                if (e.parse) h = u.parse(h, e);
                                u.set(h, e);
                                if (d && !l && u.hasChanged(v)) l = true
                            }
                            t[r] = u
                        } else if (b) {
                            o = t[r] = this._prepareModel(h, e);
                            if (!o) continue;
                            g.push(o);
                            this._addReference(o, e)
                        }
                        o = u || o;
                        if (E && (o.isNew() || !_[o.id])) E.push(o);
                        _[o.id] = true
                    }
                    if (x) {
                        for (r = 0, n = this.length; r < n; ++r) if (!_[(o = this.models[r]).cid]) y.push(o);
                        if (y.length) this.remove(y, e)
                    }
                    if (g.length || E && E.length) {
                        if (d) l = true;
                        this.length += g.length;
                        if (null != c) for (r = 0, n = g.length; r < n; r++) this.models.splice(c + r, 0, g[r]);
                        else {
                            if (E) this.models.length = 0;
                            var $ = E || g;
                            for (r = 0, n = $.length; r < n; r++) this.models.push($[r])
                        }
                    }
                    if (l) this.sort({
                        silent: true
                    });
                    if (!e.silent) {
                        for (r = 0, n = g.length; r < n; r++)(o = g[r]).trigger("add", o, this, e);
                        if (l || E && E.length) this.trigger("sort", this, e)
                    }
                    return s ? t[0] : t
                },
                reset: function (t, e) {
                    e || (e = {});
                    for (var s = 0,
                        r = this.models.length; s < r; s++) this._removeReference(this.models[s], e);
                    e.previousModels = this.models;
                    this._reset();
                    t = this.add(t, i.extend({
                        silent: true
                    },
                        e));
                    if (!e.silent) this.trigger("reset", this, e);
                    return t
                },
                push: function (t, e) {
                    return this.add(t, i.extend({
                        at: this.length
                    },
                        e))
                },
                pop: function (t) {
                    var e = this.at(this.length - 1);
                    this.remove(e, t);
                    return e
                },
                unshift: function (t, e) {
                    return this.add(t, i.extend({
                        at: 0
                    },
                        e))
                },
                shift: function (t) {
                    var e = this.at(0);
                    this.remove(e, t);
                    return e
                },
                slice: function () {
                    return o.apply(this.models, arguments)
                },
                get: function (t) {
                    if (null == t) return void 0;
                    return this._byId[t] || this._byId[t.id] || this._byId[t.cid]
                },
                at: function (t) {
                    return this.models[t]
                },
                where: function (t, e) {
                    if (i.isEmpty(t)) return e ? void 0 : [];
                    return this[e ? "find" : "filter"](function (e) {
                        for (var i in t) if (t[i] !== e.get(i)) return false;
                        return true
                    })
                },
                findWhere: function (t) {
                    return this.where(t, true)
                },
                sort: function (t) {
                    if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                    t || (t = {});
                    if (i.isString(this.comparator) || 1 === this.comparator.length) this.models = this.sortBy(this.comparator, this);
                    else this.models.sort(i.bind(this.comparator, this));
                    if (!t.silent) this.trigger("sort", this, t);
                    return this
                },
                pluck: function (t) {
                    return i.invoke(this.models, "get", t)
                },
                fetch: function (t) {
                    t = t ? i.clone(t) : {};
                    if (t.parse === void 0) t.parse = true;
                    var e = t.success;
                    var s = this;
                    t.success = function (i) {
                        var r = t.reset ? "reset" : "set";
                        s[r](i, t);
                        if (e) e(s, i, t);
                        s.trigger("sync", s, i, t)
                    };
                    q(this, t);
                    return this.sync("read", this, t)
                },
                create: function (t, e) {
                    e = e ? i.clone(e) : {};
                    if (!(t = this._prepareModel(t, e))) return false;
                    if (!e.wait) this.add(t, e);
                    var s = this;
                    var r = e.success;
                    e.success = function (t, i) {
                        if (e.wait) s.add(t, e);
                        if (r) r(t, i, e)
                    };
                    t.save(null, e);
                    return t
                },
                parse: function (t, e) {
                    return t
                },
                clone: function () {
                    return new this.constructor(this.models)
                },
                _reset: function () {
                    this.length = 0;
                    this.models = [];
                    this._byId = {}
                },
                _prepareModel: function (t, e) {
                    if (t instanceof p) return t;
                    e = e ? i.clone(e) : {};
                    e.collection = this;
                    var s = new this.model(t, e);
                    if (!s.validationError) return s;
                    this.trigger("invalid", this, s.validationError, e);
                    return false
                },
                _addReference: function (t, e) {
                    this._byId[t.cid] = t;
                    if (null != t.id) this._byId[t.id] = t;
                    if (!t.collection) t.collection = this;
                    t.on("all", this._onModelEvent, this)
                },
                _removeReference: function (t, e) {
                    if (this === t.collection) delete t.collection;
                    t.off("all", this._onModelEvent, this)
                },
                _onModelEvent: function (t, e, i, s) {
                    if (("add" === t || "remove" === t) && i !== this) return;
                    if ("destroy" === t) this.remove(e, s);
                    if (e && t === "change:" + e.idAttribute) {
                        delete this._byId[e.previous(e.idAttribute)];
                        if (null != e.id) this._byId[e.id] = e
                    }
                    this.trigger.apply(this, arguments)
                }
            });
            var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
            i.each(_,
                function (t) {
                    g.prototype[t] = function () {
                        var e = o.call(arguments);
                        e.unshift(this.models);
                        return i[t].apply(i, e)
                    }
                });
            var b = ["groupBy", "countBy", "sortBy", "indexBy"];
            i.each(b,
                function (t) {
                    g.prototype[t] = function (e, s) {
                        var r = i.isFunction(e) ? e : function (t) {
                            return t.get(e)
                        };
                        return i[t](this.models, r, s)
                    }
                });
            var w = e.View = function (t) {
                this.cid = i.uniqueId("view");
                t || (t = {});
                i.extend(this, i.pick(t, E));
                this._ensureElement();
                this.initialize.apply(this, arguments);
                this.delegateEvents()
            };
            var x = /^(\S+)\s*(.*)$/;
            var E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
            i.extend(w.prototype, u, {
                tagName: "div",
                $: function (t) {
                    return this.$el.find(t)
                },
                initialize: function () { },
                render: function () {
                    return this
                },
                remove: function () {
                    this.$el.remove();
                    this.stopListening();
                    return this
                },
                setElement: function (t, i) {
                    if (this.$el) this.undelegateEvents();
                    this.$el = t instanceof e.$ ? t : e.$(t);
                    this.el = this.$el[0];
                    if (false !== i) this.delegateEvents();
                    return this
                },
                delegateEvents: function (t) {
                    if (!(t || (t = i.result(this, "events")))) return this;
                    this.undelegateEvents();
                    for (var e in t) {
                        var s = t[e];
                        if (!i.isFunction(s)) s = this[t[e]];
                        if (!s) continue;
                        var r = e.match(x);
                        var n = r[1],
                            a = r[2];
                        s = i.bind(s, this);
                        if (this.$el.on) {
                            n += ".delegateEvents" + this.cid;
                            if ("" === a) this.$el.on(n, s);
                            else this.$el.on(n, a, s)
                        } else this.$el.delegate(a, n, s)
                    }
                    return this
                },
                undelegateEvents: function () {
                    if (this.$el.off) this.$el.off(".delegateEvents" + this.cid);
                    else {
                        this.$el.undelegate(".delegateEvents" + this.cid);
                        for (var t in this.events) {
                            var e = t.match(x);
                            var i = e[1],
                                s = e[2];
                            this.$el.undelegate(s, i)
                        }
                    }
                    return this
                },
                _ensureElement: function () {
                    if (!this.el) {
                        var t = i.extend({},
                            i.result(this, "attributes"));
                        if (this.id) t.id = i.result(this, "id");
                        if (this.className) t["class"] = i.result(this, "className");
                        var s = e.$("<" + i.result(this, "tagName") + ">").attr(t);
                        this.setElement(s, false)
                    } else this.setElement(i.result(this, "el"), false)
                }
            });
            e.sync = function (t, s, r) {
                var n = k[t];
                i.defaults(r || (r = {}), {
                    emulateHTTP: e.emulateHTTP,
                    emulateJSON: e.emulateJSON
                });
                var a = {
                    type: n,
                    dataType: "json"
                };
                if (!r.url) a.url = i.result(s, "url") || M();
                if (null == r.data && s && ("create" === t || "update" === t || "patch" === t)) {
                    a.contentType = "application/json";
                    a.data = JSON.stringify(r.attrs || s.toJSON(r))
                }
                if (r.emulateJSON) {
                    a.contentType = "application/x-www-form-urlencoded";
                    a.data = a.data ? {
                        model: a.data
                    } : {}
                }
                if (r.emulateHTTP && ("PUT" === n || "DELETE" === n || "PATCH" === n)) {
                    a.type = "POST";
                    if (r.emulateJSON) a.data._method = n;
                    var o = r.beforeSend;
                    r.beforeSend = function (t) {
                        t.setRequestHeader("X-HTTP-Method-Override", n);
                        if (o) return o.apply(this, arguments)
                    }
                }
                if ("GET" !== a.type && !r.emulateJSON) a.processData = false;
                if ("PATCH" === a.type && $) a.xhr = function () {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                };
                var h = r.xhr = e.ajax(i.extend(a, r));
                s.trigger("request", s, h, r);
                return h
            };
            var $ = "undefined" !== typeof window && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);
            var k = {
                create: "POST",
                update: "PUT",
                patch: "PATCH",
                "delete": "DELETE",
                read: "GET"
            };
            e.ajax = function () {
                return e.$.ajax.apply(e.$, arguments)
            };
            var T = e.Router = function (t) {
                t || (t = {});
                if (t.routes) this.routes = t.routes;
                this._bindRoutes();
                this.initialize.apply(this, arguments)
            };
            var S = /\((.*?)\)/g;
            var H = /(\(\?)?:\w+/g;
            var A = /\*\w+/g;
            var I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            i.extend(T.prototype, u, {
                initialize: function () { },
                route: function (t, s, r) {
                    if (!i.isRegExp(t)) t = this._routeToRegExp(t);
                    if (i.isFunction(s)) {
                        r = s;
                        s = ""
                    }
                    if (!r) r = this[s];
                    var n = this;
                    e.history.route(t,
                        function (i) {
                            var a = n._extractParameters(t, i);
                            n.execute(r, a);
                            n.trigger.apply(n, ["route:" + s].concat(a));
                            n.trigger("route", s, a);
                            e.history.trigger("route", n, s, a)
                        });
                    return this
                },
                execute: function (t, e) {
                    if (t) t.apply(this, e)
                },
                navigate: function (t, i) {
                    e.history.navigate(t, i);
                    return this
                },
                _bindRoutes: function () {
                    if (!this.routes) return;
                    this.routes = i.result(this, "routes");
                    var t, e = i.keys(this.routes);
                    while (null != (t = e.pop())) this.route(t, this.routes[t])
                },
                _routeToRegExp: function (t) {
                    t = t.replace(I, "\\$&").replace(S, "(?:$1)?").replace(H,
                        function (t, e) {
                            return e ? t : "([^/?]+)"
                        }).replace(A, "([^?]*?)");
                    return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
                },
                _extractParameters: function (t, e) {
                    var s = t.exec(e).slice(1);
                    return i.map(s,
                        function (t, e) {
                            if (e === s.length - 1) return t || null;
                            return t ? decodeURIComponent(t) : null
                        })
                }
            });
            var N = e.History = function () {
                this.handlers = [];
                i.bindAll(this, "checkUrl");
                if ("undefined" !== typeof window) {
                    this.location = window.location;
                    this.history = window.history
                }
            };
            var R = /^[#\/]|\s+$/g;
            var O = /^\/+|\/+$/g;
            var P = /msie [\w.]+/;
            var C = /\/$/;
            var j = /#.*$/;
            N.started = false;
            i.extend(N.prototype, u, {
                interval: 50,
                atRoot: function () {
                    return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
                },
                getHash: function (t) {
                    var e = (t || this).location.href.match(/#(.*)$/);
                    return e ? e[1] : ""
                },
                getFragment: function (t, e) {
                    if (null == t) if (this._hasPushState || !this._wantsHashChange || e) {
                        t = decodeURI(this.location.pathname + this.location.search);
                        var i = this.root.replace(C, "");
                        if (!t.indexOf(i)) t = t.slice(i.length)
                    } else t = this.getHash();
                    return t.replace(R, "")
                },
                start: function (t) {
                    if (N.started) throw new Error("Backbone.history has already been started");
                    N.started = true;
                    this.options = i.extend({
                        root: "/"
                    },
                        this.options, t);
                    this.root = this.options.root;
                    this._wantsHashChange = false !== this.options.hashChange;
                    this._wantsPushState = !!this.options.pushState;
                    this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                    var s = this.getFragment();
                    var r = document.documentMode;
                    var n = P.exec(navigator.userAgent.toLowerCase()) && (!r || r <= 7);
                    this.root = ("/" + this.root + "/").replace(O, "/");
                    if (n && this._wantsHashChange) {
                        var a = e.$('<iframe src="javascript:0" tabindex="-1">');
                        this.iframe = a.hide().appendTo("body")[0].contentWindow;
                        this.navigate(s)
                    }
                    if (this._hasPushState) e.$(window).on("popstate", this.checkUrl);
                    else if (this._wantsHashChange && "onhashchange" in window && !n) e.$(window).on("hashchange", this.checkUrl);
                    else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
                    this.fragment = s;
                    var o = this.location;
                    if (this._wantsHashChange && this._wantsPushState) if (!this._hasPushState && !this.atRoot()) {
                        this.fragment = this.getFragment(null, true);
                        this.location.replace(this.root + "#" + this.fragment);
                        return true
                    } else if (this._hasPushState && this.atRoot() && o.hash) {
                        this.fragment = this.getHash().replace(R, "");
                        this.history.replaceState({},
                            document.title, this.root + this.fragment)
                    }
                    if (!this.options.silent) return this.loadUrl()
                },
                stop: function () {
                    e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
                    if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
                    N.started = false
                },
                route: function (t, e) {
                    this.handlers.unshift({
                        route: t,
                        callback: e
                    })
                },
                checkUrl: function (t) {
                    var e = this.getFragment();
                    if (e === this.fragment && this.iframe) e = this.getFragment(this.getHash(this.iframe));
                    if (e === this.fragment) return false;
                    if (this.iframe) this.navigate(e);
                    this.loadUrl()
                },
                loadUrl: function (t) {
                    t = this.fragment = this.getFragment(t);
                    return i.any(this.handlers,
                        function (e) {
                            if (e.route.test(t)) {
                                e.callback(t);
                                return true
                            }
                        })
                },
                navigate: function (t, e) {
                    if (!N.started) return false;
                    if (!e || true === e) e = {
                        trigger: !!e
                    };
                    var i = this.root + (t = this.getFragment(t || ""));
                    t = t.replace(j, "");
                    if (this.fragment === t) return;
                    this.fragment = t;
                    if ("" === t && "/" !== i) i = i.slice(0, -1);
                    if (this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({},
                        document.title, i);
                    else if (this._wantsHashChange) {
                        this._updateHash(this.location, t, e.replace);
                        if (this.iframe && t !== this.getFragment(this.getHash(this.iframe))) {
                            if (!e.replace) this.iframe.document.open().close();
                            this._updateHash(this.iframe.location, t, e.replace)
                        }
                    } else return this.location.assign(i);
                    if (e.trigger) return this.loadUrl(t)
                },
                _updateHash: function (t, e, i) {
                    if (i) {
                        var s = t.href.replace(/(javascript:|#).*$/, "");
                        t.replace(s + "#" + e)
                    } else t.hash = "#" + e
                }
            });
            e.history = new N;
            var U = function (t, e) {
                var s = this;
                var r;
                if (t && i.has(t, "constructor")) r = t.constructor;
                else r = function () {
                    return s.apply(this, arguments)
                };
                i.extend(r, s, e);
                var n = function () {
                    this.constructor = r
                };
                n.prototype = s.prototype;
                r.prototype = new n;
                if (t) i.extend(r.prototype, t);
                r.__super__ = s.prototype;
                return r
            };
            p.extend = g.extend = T.extend = w.extend = N.extend = U;
            var M = function () {
                throw new Error('A "url" property or function must be specified')
            };
            var q = function (t, e) {
                var i = e.error;
                e.error = function (s) {
                    if (i) i(t, s, e);
                    t.trigger("error", t, s, e)
                }
            };
            return e
        });
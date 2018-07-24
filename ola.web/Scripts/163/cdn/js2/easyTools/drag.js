!
    function (e) {
        e.fn.bindDrag = function (o) {
            var n = e.extend({
                beforeDrag: e.noop,
                dragStart: e.noop,
                onDrag: e.noop,
                dragEnd: e.noop,
                pix: 3
            },
                o || {}),
                t,
                u = {
                    mousedown: function (o) {
                        if (false === n.beforeDrag.call(this, o)) return;
                        t = {
                            mouse: [o.pageX, o.pageY],
                            flag: 1
                        };
                        this.setCapture ? this.setCapture() : window.captureEvents && window.captureEvents(window.Event.MOUSEMOVE | window.Event.MOUSEUP);
                        e(this).one("losecapture",
                            function () {
                                e(document).mouseup()
                            });
                        e(document).mousemove(e.proxy(u.mousemove, this)).mouseup(e.proxy(u.mouseup, this));
                        o.preventDefault()
                    },
                    mousemove: function (e) {
                        var o = t;
                        if (o.flag < 1) return;
                        if (o.flag > 1) n.onDrag.call(this, e);
                        else if (Math.abs(e.pageX - o.mouse[0]) >= n.pix || Math.abs(e.pageY - o.mouse[1]) >= n.pix) {
                            o.flag = 2;
                            if (false === n.dragStart.call(this, e)) {
                                o.flag = 1;
                                u.mouseup.call(this, e)
                            }
                        }
                    },
                    mouseup: function (o) {
                        var a = t;
                        if (a.flag > 1) n.dragEnd.call(this, o);
                        a.flag = 0;
                        this.releaseCapture ? this.releaseCapture() : window.releaseEvents && window.releaseEvents(window.Event.MOUSEMOVE | window.Event.MOUSEUP);
                        e(this).unbind("losecapture");
                        e(document).unbind("mousemove", u.mousemove).unbind("mouseup", u.mouseup);
                        return false
                    }
                };
            n.pix = n.pix < 1 ? 1 : n.pix > 9 ? 9 : n.pix;
            return this.mousedown(u.mousedown)
        }
    }(jQuery);
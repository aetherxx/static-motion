!(function(a, b) {
	function c() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
			var b = (16 * Math.random()) | 0,
				c = "x" == a ? b : (3 & b) | 8
			return c.toString(16)
		})
	}
	function d() {
		;(this.key = !1), (this.sendConsoleErrors = !1), (this.tag =
			"jslogger"), (this.useDomainProxy = !1)
	}
	function e(a, b) {
		;(a.key = b), a.setSession(), i(a)
	}
	function f(a, b) {
		a.tag = b
	}
	function g(a, b) {
		;(a.useDomainProxy = b), i(a)
	}
	function h(b, c) {
		if (((b.sendConsoleErrors = c), b.sendConsoleErrors === !0)) {
			var d = a.onerror
			a.onerror = function(c, e, f, g) {
				b.push({
					category: "BrowserJsException",
					exception: { message: c, url: e, lineno: f, colno: g },
				}), d && "function" == typeof d && d.apply(a, arguments)
			}
		}
	}
	function i(b) {
		1 == b.useDomainProxy
			? (b.inputUrl =
					j + a.location.host + "/" + n + "/inputs/" + b.key + "/tag/" + b.tag)
			: (b.inputUrl =
					j +
					(b.logglyCollectorDomain || k) +
					"/inputs/" +
					b.key +
					"/tag/" +
					b.tag)
	}
	var j = "http" + ("https:" === b.location.protocol ? "s" : "") + "://",
		k = "logs-01.loggly.com",
		l = "logglytrackingsession",
		m = l.length + 1,
		n = "loggly"
	d.prototype = {
		setSession: function(a) {
			a
				? ((this.session_id = a), this.setCookie(this.session_id))
				: this.session_id ||
					(
						(this.session_id = this.readCookie()),
						this.session_id ||
							((this.session_id = c()), this.setCookie(this.session_id))
					)
		},
		push: function(a) {
			var b = typeof a
			if (a && ("object" === b || "string" === b)) {
				var c = this
				if ("string" === b) a = { text: a }
				else {
					if (a.logglyCollectorDomain)
						return void (c.logglyCollectorDomain = a.logglyCollectorDomain)
					if (
						(
							void 0 !== a.sendConsoleErrors && h(c, a.sendConsoleErrors),
							a.tag && f(c, a.tag),
							a.useDomainProxy && g(c, a.useDomainProxy),
							a.logglyKey
						)
					)
						return void e(c, a.logglyKey)
					if (a.session_id) return void c.setSession(a.session_id)
				}
				c.key && c.track(a)
			}
		},
		track: function(b) {
			b.sessionId = this.session_id
			try {
				var c = new XMLHttpRequest()
				c.open("POST", this.inputUrl, !0), c.setRequestHeader(
					"Content-Type",
					"text/plain"
				), c.send(JSON.stringify(b))
			} catch (d) {
				a &&
					a.console &&
					"function" == typeof a.console.log &&
					(
						console.log(
							"Failed to log to loggly because of this exception:\n" + d
						),
						console.log("Failed log data:", b)
					)
			}
		},
		readCookie: function() {
			var a = b.cookie,
				c = a.indexOf(l)
			if (0 > c) return !1
			var d = a.indexOf(";", c + 1)
			return (d = 0 > d ? a.length : d), a.slice(c + m, d)
		},
		setCookie: function(a) {
			b.cookie = l + "=" + a
		},
	}
	var o = a._LTracker,
		p = new d()
	if (o && o.length) {
		var q = 0,
			r = o.length
		for (q = 0; r > q; q++) p.push(o[q])
	}
	;(a._LTracker = p), (a.LogglyTracker = d)
})(window, document)

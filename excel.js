var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.4 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs, require, define;
!function (global, setTimeout) { function commentReplace(e, t) { return t || ""; } function isFunction(e) { return "[object Function]" === ostring.call(e); } function isArray(e) { return "[object Array]" === ostring.call(e); } function each(e, t) { if (e) {
    var i;
    for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1)
        ;
} } function eachReverse(e, t) { if (e) {
    var i;
    for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1)
        ;
} } function hasProp(e, t) { return hasOwn.call(e, t); } function getOwn(e, t) { return hasProp(e, t) && e[t]; } function eachProp(e, t) { var i; for (i in e)
    if (hasProp(e, i) && t(e[i], i))
        break; } function mixin(e, t, i, r) { return t && eachProp(t, function (t, n) { !i && hasProp(e, n) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r))); }), e; } function bind(e, t) { return function () { return t.apply(e, arguments); }; } function scripts() { return document.getElementsByTagName("script"); } function defaultOnError(e) { throw e; } function getGlobal(e) { if (!e)
    return e; var t = global; return each(e.split("."), function (e) { t = t[e]; }), t; } function makeError(e, t, i, r) { var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e); return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n; } function newContext(e) { function t(e) { var t, i; for (t = 0; t < e.length; t++)
    if ("." === (i = e[t]))
        e.splice(t, 1), t -= 1;
    else if (".." === i) {
        if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])
            continue;
        t > 0 && (e.splice(t - 1, 2), t -= 2);
    } } function i(e, i, r) { var n, o, a, s, u, c, d, p, f, l, h = i && i.split("/"), m = y.map, g = m && m["*"]; if (e && (c = (e = e.split("/")).length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), t(e), e = e.join("/")), r && m && (h || g)) {
    e: for (a = (o = e.split("/")).length; a > 0; a -= 1) {
        if (u = o.slice(0, a).join("/"), h)
            for (s = h.length; s > 0; s -= 1)
                if ((n = getOwn(m, h.slice(0, s).join("/"))) && (n = getOwn(n, u))) {
                    d = n, p = a;
                    break e;
                }
        !f && g && getOwn(g, u) && (f = getOwn(g, u), l = a);
    }
    !d && f && (d = f, p = l), d && (o.splice(0, p, d), e = o.join("/"));
} return getOwn(y.pkgs, e) || e; } function r(e) { isBrowser && each(scripts(), function (t) { if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName)
    return t.parentNode.removeChild(t), !0; }); } function n(e) { var t = getOwn(y.paths, e); if (t && isArray(t) && t.length > 1)
    return t.shift(), q.require.undef(e), q.makeRequire(null, { skipMap: !0 })([e]), !0; } function o(e) { var t, i = e ? e.indexOf("!") : -1; return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]; } function a(e, t, r, n) { var a, s, u, c, d = null, p = t ? t.name : null, f = e, l = !0, h = ""; return e || (l = !1, e = "_@r" + (T += 1)), c = o(e), d = c[0], e = c[1], d && (d = i(d, p, n), s = getOwn(j, d)), e && (d ? h = r ? e : s && s.normalize ? s.normalize(e, function (e) { return i(e, p, n); }) : -1 === e.indexOf("!") ? i(e, p, n) : e : (d = (c = o(h = i(e, p, n)))[0], h = c[1], r = !0, a = q.nameToUrl(h))), u = !d || s || r ? "" : "_unnormalized" + (A += 1), { prefix: d, name: h, parentMap: t, unnormalized: !!u, url: a, originalName: f, isDefine: l, id: (d ? d + "!" + h : h) + u }; } function s(e) { var t = e.id, i = getOwn(S, t); return i || (i = S[t] = new q.Module(e)), i; } function u(e, t, i) { var r = e.id, n = getOwn(S, r); !hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e)).error && "error" === t ? i(n.error) : n.on(t, i) : "defined" === t && i(j[r]); } function c(e, t) { var i = e.requireModules, r = !1; t ? t(e) : (each(i, function (t) { var i = getOwn(S, t); i && (i.error = e, i.events.error && (r = !0, i.emit("error", e))); }), r || req.onError(e)); } function d() { globalDefQueue.length && (each(globalDefQueue, function (e) { var t = e[0]; "string" == typeof t && (q.defQueueMap[t] = !0), O.push(e); }), globalDefQueue = []); } function p(e) { delete S[e], delete k[e]; } function f(e, t, i) { var r = e.map.id; e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, n) { var o = r.id, a = getOwn(S, o); !a || e.depMatched[n] || i[o] || (getOwn(t, o) ? (e.defineDep(n, j[o]), e.check()) : f(a, t, i)); }), i[r] = !0); } function l() { var e, t, i = 1e3 * y.waitSeconds, o = i && q.startTime + i < (new Date).getTime(), a = [], s = [], u = !1, d = !0; if (!x) {
    if (x = !0, eachProp(k, function (e) { var i = e.map, c = i.id; if (e.enabled && (i.isDefine || s.push(e), !e.error))
        if (!e.inited && o)
            n(c) ? (t = !0, u = !0) : (a.push(c), r(c));
        else if (!e.inited && e.fetched && i.isDefine && (u = !0, !i.prefix))
            return d = !1; }), o && a.length)
        return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = q.contextName, c(e);
    d && each(s, function (e) { f(e, {}, {}); }), o && !t || !u || !isBrowser && !isWebWorker || w || (w = setTimeout(function () { w = 0, l(); }, 50)), x = !1;
} } function h(e) { hasProp(j, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2]); } function m(e, t, i, r) { e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1); } function g(e) { var t = e.currentTarget || e.srcElement; return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), { node: t, id: t && t.getAttribute("data-requiremodule") }; } function v() { var e; for (d(); O.length;) {
    if (null === (e = O.shift())[0])
        return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
    h(e);
} q.defQueueMap = {}; } var x, b, q, E, w, y = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} }, S = {}, k = {}, M = {}, O = [], j = {}, P = {}, R = {}, T = 1, A = 1; return E = { require: function (e) { return e.require ? e.require : e.require = q.makeRequire(e.map); }, exports: function (e) { if (e.usingExports = !0, e.map.isDefine)
        return e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {}; }, module: function (e) { return e.module ? e.module : e.module = { id: e.map.id, uri: e.map.url, config: function () { return getOwn(y.config, e.map.id) || {}; }, exports: e.exports || (e.exports = {}) }; } }, b = function (e) { this.events = getOwn(M, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0; }, b.prototype = { init: function (e, t, i, r) { r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) { this.emit("error", e); })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()); }, defineDep: function (e, t) { this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t); }, fetch: function () { if (!this.fetched) {
        this.fetched = !0, q.startTime = (new Date).getTime();
        var e = this.map;
        if (!this.shim)
            return e.prefix ? this.callPlugin() : this.load();
        q.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], bind(this, function () { return e.prefix ? this.callPlugin() : this.load(); }));
    } }, load: function () { var e = this.map.url; P[e] || (P[e] = !0, q.load(this.map.id, e)); }, check: function () { if (this.enabled && !this.enabling) {
        var e, t, i = this.map.id, r = this.depExports, n = this.exports, o = this.factory;
        if (this.inited) {
            if (this.error)
                this.emit("error", this.error);
            else if (!this.defining) {
                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                    if (isFunction(o)) {
                        if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                            try {
                                n = q.execCb(i, o, r, n);
                            }
                            catch (t) {
                                e = t;
                            }
                        else
                            n = q.execCb(i, o, r, n);
                        if (this.map.isDefine && void 0 === n && ((t = this.module) ? n = t.exports : this.usingExports && (n = this.exports)), e)
                            return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e);
                    }
                    else
                        n = o;
                    if (this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad)) {
                        var a = [];
                        each(this.depMaps, function (e) { a.push(e.normalizedMap || e); }), req.onResourceLoad(q, this.map, a);
                    }
                    p(i), this.defined = !0;
                }
                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0);
            }
        }
        else
            hasProp(q.defQueueMap, i) || this.fetch();
    } }, callPlugin: function () { var e = this.map, t = e.id, r = a(e.prefix); this.depMaps.push(r), u(r, "defined", bind(this, function (r) { var n, o, d, f = getOwn(R, this.map.id), l = this.map.name, h = this.map.parentMap ? this.map.parentMap.name : null, m = q.makeRequire(e.parentMap, { enableBuildCallback: !0 }); return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function (e) { return i(e, h, !0); }) || ""), o = a(e.prefix + "!" + l, this.map.parentMap, !0), u(o, "defined", bind(this, function (e) { this.map.normalizedMap = o, this.init([], function () { return e; }, null, { enabled: !0, ignore: !0 }); })), void ((d = getOwn(S, o.id)) && (this.depMaps.push(o), this.events.error && d.on("error", bind(this, function (e) { this.emit("error", e); })), d.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : ((n = bind(this, function (e) { this.init([], function () { return e; }, null, { enabled: !0 }); })).error = bind(this, function (e) { this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function (e) { 0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id); }), c(e); }), n.fromText = bind(this, function (i, r) { var o = e.name, u = a(o), d = useInteractive; r && (i = r), d && (useInteractive = !1), s(u), hasProp(y.config, t) && (y.config[o] = y.config[t]); try {
        req.exec(i);
    }
    catch (e) {
        return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]));
    } d && (useInteractive = !0), this.depMaps.push(u), q.completeLoad(o), m([o], n); }), void r.load(e.name, m, n, y)); })), q.enable(r, this), this.pluginMaps[r.id] = r; }, enable: function () { k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) { var i, r, n; if ("string" == typeof e) {
        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id))
            return void (this.depExports[t] = n(this));
        this.depCount += 1, u(e, "defined", bind(this, function (e) { this.undefed || (this.defineDep(t, e), this.check()); })), this.errback ? u(e, "error", bind(this, this.errback)) : this.events.error && u(e, "error", bind(this, function (e) { this.emit("error", e); }));
    } i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this); })), eachProp(this.pluginMaps, bind(this, function (e) { var t = getOwn(S, e.id); t && !t.enabled && q.enable(e, this); })), this.enabling = !1, this.check(); }, on: function (e, t) { var i = this.events[e]; i || (i = this.events[e] = []), i.push(t); }, emit: function (e, t) { each(this.events[e], function (e) { e(t); }), "error" === e && delete this.events[e]; } }, q = { config: y, contextName: e, registry: S, defined: j, urlFetched: P, defQueue: O, defQueueMap: {}, Module: b, makeModuleMap: a, nextTick: req.nextTick, onError: c, configure: function (e) { if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
        var t = e.urlArgs;
        e.urlArgs = function (e, i) { return (-1 === i.indexOf("?") ? "?" : "&") + t; };
    } var i = y.shim, r = { paths: !0, bundles: !0, config: !0, map: !0 }; eachProp(e, function (e, t) { r[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e; }), e.bundles && eachProp(e.bundles, function (e, t) { each(e, function (e) { e !== t && (R[e] = t); }); }), e.shim && (eachProp(e.shim, function (e, t) { isArray(e) && (e = { deps: e }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), i[t] = e; }), y.shim = i), e.packages && each(e.packages, function (e) { var t; t = (e = "string" == typeof e ? { name: e } : e).name, e.location && (y.paths[t] = e.location), y.pkgs[t] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, ""); }), eachProp(S, function (e, t) { e.inited || e.map.unnormalized || (e.map = a(t, null, !0)); }), (e.deps || e.callback) && q.require(e.deps || [], e.callback); }, makeShimExports: function (e) { return function () { var t; return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports); }; }, makeRequire: function (t, n) { function o(i, r, u) { var d, p, f; return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, o) : (p = a(i, t, !1, !0), d = p.id, hasProp(j, d) ? j[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function () { v(), (f = s(a(null, t))).skipMap = n.skipMap, f.init(i, r, u, { enabled: !0 }), l(); }), o); } return n = n || {}, mixin(o, { isBrowser: isBrowser, toUrl: function (e) { var r, n = e.lastIndexOf("."), o = e.split("/")[0], a = "." === o || ".." === o; return -1 !== n && (!a || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0); }, defined: function (e) { return hasProp(j, a(e, t, !1, !0).id); }, specified: function (e) { return e = a(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e); } }), t || (o.undef = function (e) { d(); var i = a(e, t, !0), n = getOwn(S, e); n.undefed = !0, r(e), delete j[e], delete P[i.url], delete M[e], eachReverse(O, function (t, i) { t[0] === e && O.splice(i, 1); }), delete q.defQueueMap[e], n && (n.events.defined && (M[e] = n.events), p(e)); }), o; }, enable: function (e) { getOwn(S, e.id) && s(e).enable(); }, completeLoad: function (e) { var t, i, r, o = getOwn(y.shim, e) || {}, a = o.exports; for (d(); O.length;) {
        if (null === (i = O.shift())[0]) {
            if (i[0] = e, t)
                break;
            t = !0;
        }
        else
            i[0] === e && (t = !0);
        h(i);
    } if (q.defQueueMap = {}, r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
        if (!(!y.enforceDefine || a && getGlobal(a)))
            return n(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
        h([e, o.deps || [], o.exportsFn]);
    } l(); }, nameToUrl: function (e, t, i) { var r, n, o, a, s, u, c, d = getOwn(y.pkgs, e); if (d && (e = d), c = getOwn(R, e))
        return q.nameToUrl(c, t, i); if (req.jsExtRegExp.test(e))
        s = e + (t || "");
    else {
        for (r = y.paths, o = (n = e.split("/")).length; o > 0; o -= 1)
            if (a = n.slice(0, o).join("/"), u = getOwn(r, a)) {
                isArray(u) && (u = u[0]), n.splice(0, o, u);
                break;
            }
        s = n.join("/"), s = ("/" === (s += t || (/^data\:|^blob\:|\?/.test(s) || i ? "" : ".js")).charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s;
    } return y.urlArgs && !/^blob\:/.test(s) ? s + y.urlArgs(e, s) : s; }, load: function (e, t) { req.load(q, e, t); }, execCb: function (e, t, i, r) { return t.apply(r, i); }, onScriptLoad: function (e) { if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
        interactiveScript = null;
        var t = g(e);
        q.completeLoad(t.id);
    } }, onScriptError: function (e) { var t = g(e); if (!n(t.id)) {
        var i = [];
        return eachProp(S, function (e, r) { 0 !== r.indexOf("_@r") && each(e.depMaps, function (e) { if (e.id === t.id)
            return i.push(r), !0; }); }), c(makeError("scripterror", 'Script error for "' + t.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), e, [t.id]));
    } } }, q.require = q.makeRequire(), q; } function getInteractiveScript() { return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) { if ("interactive" === e.readyState)
    return interactiveScript = e; }), interactiveScript); } var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.4", commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1; if (void 0 === define) {
    if (void 0 !== requirejs) {
        if (isFunction(requirejs))
            return;
        cfg = requirejs, requirejs = void 0;
    }
    void 0 === require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, i, r) { var n, o, a = defContextName; return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = i, i = r) : e = []), o && o.context && (a = o.context), (n = getOwn(contexts, a)) || (n = contexts[a] = req.s.newContext(a)), o && n.configure(o), n.require(e, t, i); }, req.config = function (e) { return req(e); }, req.nextTick = void 0 !== setTimeout ? function (e) { setTimeout(e, 4); } : function (e) { e(); }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = { contexts: contexts, newContext: newContext }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) { req[e] = function () { var t = contexts[defContextName]; return t.require[e].apply(t, arguments); }; }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], (baseElement = document.getElementsByTagName("base")[0]) && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, i) { var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"); return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r; }, req.load = function (e, t, i) { var r, n = e && e.config || {}; if (isBrowser)
        return (r = req.createNode(n, t, i)).setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, n.onNodeCreated && n.onNodeCreated(r, n, t, i), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r; if (isWebWorker)
        try {
            setTimeout(function () { }, 0), importScripts(i), e.completeLoad(t);
        }
        catch (r) {
            e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, r, [t]));
        } }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) { if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main"))
        return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0; }), define = function (e, t, i) { var r, n; "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (e, i) { t.push(i); }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript()) && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")]), n ? (n.defQueue.push([e, t, i]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, t, i]); }, define.amd = { jQuery: !0 }, req.exec = function (text) { return eval(text); }, req(cfg);
} }(this, "undefined" == typeof setTimeout ? void 0 : setTimeout);
requirejs(["src/Main"]);
define("src/file/SFile", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SFile = /** @class */ (function () {
        /**
         * Creates an instance of File.
         * @param {*} file 路径
         *
         * @memberOf File
         */
        function SFile(url) {
            this.mUrl = url;
        }
        Object.defineProperty(SFile.prototype, "url", {
            /**
             * 获取当前File路径
             *
             * @readonly
             * @type {string}
             * @memberOf File
             */
            get: function () {
                return this.mUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SFile.prototype, "type", {
            /**
             *获取当前文件类型
             * @readonly
             * @type {string}
             * @memberOf File
             */
            get: function () {
                var url = this.mUrl;
                var arr = url.split(".");
                return arr[arr.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SFile.prototype, "name", {
            /**
             * 获取文件名
             * @readonly
             * @type {string}
             * @memberOf File
             */
            get: function () {
                var url = this.mUrl;
                var arr = url.split(/\/|\\/);
                var str = arr[arr.length - 1];
                arr = str.split(".");
                return arr[0].toString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SFile.prototype, "isExists", {
            /**
             *
             * 当前文件是否存在
             * @readonly
             * @type {boolean}
             * @memberOf File
             */
            get: function () {
                //exists是废弃的 existsSync不是
                return FS.existsSync(this.mUrl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SFile.prototype, "isDirectory", {
            /**
             *
             * 是否是一个目录文件
             * @readonly
             * @type {boolean}
             * @memberOf File
             */
            get: function () {
                return this.mUrl.indexOf(".") == -1;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * 获取目录下的文件
         * @returns {SFile []}
         *
         * @memberOf File
         */
        SFile.prototype.getFileList = function () {
            if (this.isDirectory) {
                var urls = FS.readdirSync(this.mUrl);
                var files = [];
                for (var i = 0; i < urls.length; i++) {
                    files.push(new SFile(this.mUrl + "/" + urls[i]));
                }
                return files;
            }
            return null;
        };
        /**
         * 创建一个基于APP路径的File类
         *
         * @static
         * @returns {SFile}
         *
         * @memberOf File
         */
        SFile.createAPPFile = function () {
            var url = FS.realpathSync('');
            return new SFile(url);
        };
        /**
         *
         * 重置路径
         * @param {string} url
         *
         * @memberOf File
         */
        SFile.prototype.resetUrl = function (url) {
            this.mUrl = url;
        };
        return SFile;
    }());
    exports.SFile = SFile;
});
define("src/file/FileStream", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileStream = /** @class */ (function () {
        function FileStream() {
            // this.arrayLike[FileModel.READ] = this.read.bind(this);
            // this.arrayLike[FileModel.WRITE] = this.write.bind(this);;
            // this.arrayLike[FileModel.UPDATE] = this.update.bind(this);;
        }
        // public arrayLike: any = {};
        // public open(file: SFile, model: any = FileModel.WRITE): void {
        //     var fun = this.arrayLike[model];
        //     fun(file);
        // }
        // private mBuffer: Buffer;
        /**
         *
         *
         * @param {SFile} file
         * @param {string} [type="buffer",type = "string"] 使用buff，就返回的是Buffer,string,返回字符串
         * @returns {*}
         *
         * @memberOf FileStream
         */
        FileStream.prototype.read = function (file, type) {
            if (type === void 0) { type = "buffer"; }
            var value = FS.readFileSync(file.url);
            // this.byte = value;
            if (type == 'string')
                return value.toString();
            else
                return value;
        };
        FileStream.prototype.write = function (file) {
        };
        FileStream.prototype.update = function (file) {
        };
        return FileStream;
    }());
    exports.FileStream = FileStream;
});
define("src/clz/ExcelClass", ["require", "exports", "src/file/SFile"], function (require, exports, SFile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExcelClass = /** @class */ (function () {
        function ExcelClass() {
        }
        Object.defineProperty(ExcelClass.prototype, "keys", {
            set: function (value) {
                this.mKeys = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExcelClass.prototype, "types", {
            set: function (value) {
                this.mTypes = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExcelClass.prototype, "sheetName", {
            set: function (value) {
                this.mName = value;
            },
            enumerable: true,
            configurable: true
        });
        ExcelClass.prototype.write = function () {
            var str = this.dTs;
            FS.appendFileSync(ts + '/Sheets.ts', str);
            this.saveSheetVo();
            ExcelClass.len += str.length;
        };
        ExcelClass.prototype.saveSheetVo = function () {
            var first = this.mName.charAt(0).toLocaleUpperCase();
            var clsName = first + this.mName.substr(1, this.mName.length);
            var str = "import {" + clsName + "Base} from \"./Sheets\"\n        export class " + clsName + " extends " + clsName + "Base{\n        //id\u7D22\u5F15\n        public static get(id:any){\n            if(this[id])return this[id];\n            return SheetManager.get(\"" + this.mName + "\",id," + clsName + ");\n        }\n}";
            var url = ts + "/" + clsName + ".ts";
            var file = new SFile_1.SFile(url);
            if (!file.isExists) {
                FS.writeFileSync(url, str);
            }
        };
        Object.defineProperty(ExcelClass.prototype, "dTs", {
            get: function () {
                var first = this.mName.charAt(0).toLocaleUpperCase();
                var clsName = first + this.mName.substr(1, this.mName.length);
                var str = "\nexport class " + clsName + "Base{\n            " + this.getKeys() + "\n}";
                return str;
            },
            enumerable: true,
            configurable: true
        });
        ExcelClass.prototype.getKeys = function () {
            var str = "";
            for (var i = 0; i < this.mKeys.length; i++) {
                str += "\n      " + this.mKeys[i] + ":" + this.getType(this.mTypes[i]) + ";//" + (this.caption[i] ? this.caption[i].replace(/\r\n|\n/g, "") : "");
            }
            return str + "\n";
        };
        ExcelClass.prototype.getType = function (type) {
            var arr = {};
            arr['array'] = 'Array<any>';
            arr['object'] = 'any';
            if (arr[type])
                return arr[type];
            return type;
        };
        ExcelClass.len = 0;
        return ExcelClass;
    }());
    exports.ExcelClass = ExcelClass;
});
define("src/excel/Excel", ["require", "exports", "src/file/FileStream", "src/clz/ExcelClass"], function (require, exports, FileStream_1, ExcelClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Excel = /** @class */ (function () {
        function Excel(file) {
            this.workerBook = [];
            this.captions = [];
            this.clzKeys = [];
            this.sheetNames = [];
            this.clzTyps = [];
            this.file = file;
            this.parse();
        }
        Excel.prototype.parse = function () {
            if (this.file.name.indexOf("~$") != -1 || this.file.type.indexOf("xls") == -1 && this.file.type.indexOf("xlsx") == -1)
                return;
            var fileSteam = new FileStream_1.FileStream();
            var data = fileSteam.read(this.file);
            var wb = XLSX.read(data);
            var tables = wb.SheetNames;
            for (var i = 0; i < tables.length; i++) {
                var wbJson = XLSX.utils.sheet_to_json(wb.Sheets[tables[i]]);
                wbJson.sheetName = tables[i];
                // this.parseKeys(wbJson);
                this.workerBook.push(wbJson);
            }
            this.parseToJson();
            this.writeClz();
        };
        Excel.prototype.writeClz = function () {
            for (var i = 0; i < this.sheetNames.length; i++) {
                var clz = new ExcelClass_1.ExcelClass();
                clz.sheetName = this.sheetNames[i];
                clz.keys = this.clzKeys[i];
                clz.types = this.clzTyps[i];
                clz.caption = this.captions[i];
                clz.write();
            }
        };
        Excel.prototype.parseToJson = function () {
            for (var i = 0; i < this.workerBook.length; i++) {
                var wbJson = this.workerBook[i];
                var keys = this.parseKeys(wbJson);
                var types = this.parseType(keys, wbJson);
                this.captions.push(this.parseCaption(keys, wbJson));
                this.parseValue(keys, types, wbJson);
            }
        };
        Excel.prototype.parseCaption = function (keys, json) {
            var cap = [];
            for (var i = 0; i < keys.length; i++) {
                cap.push(json[0][keys[i]]);
            }
            return cap;
        };
        Excel.prototype.saveKeys = function (obj, keys) {
            var arr = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var save = Excel.values[key + '__Value'];
                if (!isNaN(save)) {
                    arr.push(save);
                }
                else {
                    var len = Excel.values.length;
                    arr.push(len);
                    Excel.values.push(key);
                    Excel.values[key + '__Value'] = len;
                }
            }
            obj.keys = arr;
        };
        Excel.prototype.parseValue = function (keys, types, json) {
            var obj = {};
            Excel.jsons[json.sheetName] = obj;
            var other = {};
            this.clzKeys.push(keys);
            this.clzTyps.push(types);
            this.sheetNames.push(json.sheetName);
            this.saveKeys(obj, keys);
            for (var key in json) {
                if (~~key < 3)
                    continue;
                var arr = [];
                for (var i = 0; i < keys.length; i++) {
                    var key1 = keys[i];
                    var type = types[i];
                    var value = json[key][key1];
                    if (!type) {
                        type = "string";
                    }
                    if (type.toLocaleLowerCase().indexOf("number") != -1) {
                        value = parseFloat(value);
                    }
                    else if (type.toLocaleLowerCase().indexOf("string") == -1) {
                        try{
                            value = JSON.parse(value);
                        }catch(e){
                            console.log(value);
                        }
                      
                    }
                    // Excel.values[json[key][key1] ]
                    var save = Excel.values[json[key][key1] + '__Value'];
                    if (!isNaN(save)) {
                        arr.push(save);
                    }
                    else {
                        var len = Excel.values.length;
                        arr.push(len);
                        Excel.values.push(value);
                        Excel.values[json[key][key1] + '__Value'] = len;
                    }
                }
                var index = arr[0];
                var value = Excel.values[index];
                if (!other[value])
                    other[value] = [arr];
                else
                    other[value].push(arr);
                if (!obj[value])
                    obj[value] = arr;
                else {
                    obj[value] = other[value];
                }
            }
        };
        Excel.prototype.parseType = function (keys, json) {
            var types = [];
            for (var i = 0; i < keys.length; i++) {
                types.push(json[2][keys[i]]);
            }
            return types;
        };
        Excel.prototype.parseKeys = function (json) {
            var keys = [];
            for (var key in json[1]) {
                if (json[1][key].indexOf("C") != -1)
                    keys.push(key);
            }
            return keys;
        };
        Excel.values = [];
        Excel.jsons = {};
        return Excel;
    }());
    exports.Excel = Excel;
});
define("src/Main", ["require", "exports", "src/file/SFile", "src/excel/Excel"], function (require, exports, SFile_2, Excel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = /** @class */ (function () {
        function Main() {
            program
                .version('0.0.1')
                .option('-e, --excel', 'url1 -- doc目录, url2--ts代码目录,url3--json数据目录')
                .parse(process.argv);
            if (program.excel) {
                if (!program.args.length)
                    console.log(program.help());
                else {
                    doc = program.args[0];
                    ts = program.args[1];
                    data = program.args[2];
                    this.initLoad();
                }
            }
        }
        Main.prototype.initLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                var file, str;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            FS.writeFileSync(ts + '/Sheets.ts', "");
                            file = new SFile_2.SFile(doc);
                            return [4 /*yield*/, this.loadExcel(file)];
                        case 1:
                            _a.sent();
                            Excel_1.Excel.jsons.dic = Excel_1.Excel.values;
                            str = JSON.stringify(Excel_1.Excel.jsons);
                            FS.writeFileSync(data + "/cfg.json", str);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Main.prototype.loadExcel = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var files, i, excel;
                return __generator(this, function (_a) {
                    files = file.getFileList();
                    for (i = 0; i < files.length; i++) {
                        file = files[i];
                        if (file.isExists && file.isDirectory) {
                            this.loadExcel(file);
                            continue;
                        }
                        excel = new Excel_1.Excel(file);
                    }
                    return [2 /*return*/];
                });
            });
        };
        return Main;
    }());
    exports.Main = Main;
    new Main();
});
var doc;
var ts;
var data;
var FS = require("fs");
var program = require('commander');
var XLSX = require("XLSX");
var FileModel;
(function (FileModel) {
    FileModel["WRITE"] = "WRITE";
    FileModel["READ"] = "READ";
    FileModel["UPDATE"] = "UPDATE";
})(FileModel || (FileModel = {}));
define("src/file/FileReadLine", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileReadLine = /** @class */ (function () {
        function FileReadLine(str) {
            this.lines = [];
            this.mStr = str;
            this.lines = this.mStr.split(/\r\n|\n/g);
        }
        Object.defineProperty(FileReadLine.prototype, "appendLine", {
            set: function (value) {
                this.lines = value.slice();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileReadLine.prototype, "count", {
            get: function () {
                return this.lines.length;
            },
            enumerable: true,
            configurable: true
        });
        FileReadLine.prototype.getLine = function (index) {
            return this.lines[index];
        };
        FileReadLine.prototype.foreach = function (fun) {
            for (var i = 0; i < this.count; i++) {
                fun(this.lines[i]);
            }
        };
        return FileReadLine;
    }());
    exports.FileReadLine = FileReadLine;
});
//# sourceMappingURL=excel.js.map
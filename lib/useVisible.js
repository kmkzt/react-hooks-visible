var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { useRef, useEffect, useCallback, useState } from 'react';
var defaultIntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from({ length: 100 }, function (v, i) { return i * 0.01; })
};
export var useVisible = function (cb, option) {
    if (option === void 0) { option = {}; }
    var targetRef = useRef(null);
    var observerRef = useRef(null);
    var _a = __read(useState(0), 2), visible = _a[0], setVisible = _a[1];
    var status = typeof cb === 'function' ? cb(visible) : visible;
    var observerCallback = useCallback(function (entries) {
        entries.forEach(function (entry) {
            setVisible(entry.intersectionRatio);
        });
    }, []);
    useEffect(function () {
        if (observerRef.current)
            return;
        if (!targetRef.current)
            return;
        observerRef.current = new IntersectionObserver(observerCallback, __assign({}, defaultIntersectionObserverInit, option));
        observerRef.current.observe(targetRef.current);
    });
    return [targetRef, status];
};

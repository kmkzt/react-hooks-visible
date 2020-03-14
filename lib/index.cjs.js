'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var defaultIntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: Array.from({
    length: 100
  }, function (v, i) {
    return i * 0.01;
  })
};
var useVisible = function useVisible(cb, option) {
  if (option === void 0) {
    option = {};
  }

  var targetRef = react.useRef(null);
  var observerRef = react.useRef(null);

  var _useState = react.useState(0),
      visible = _useState[0],
      setVisible = _useState[1]; // TODO: visible types refactor


  var status = typeof cb === 'function' ? cb(visible) : visible;
  var observerCallback = react.useCallback(function (entries) {
    entries.forEach(function (entry) {
      setVisible(entry.intersectionRatio);
    });
  }, []);
  react.useEffect(function () {
    if (observerRef.current) return;
    if (!targetRef.current) return;
    observerRef.current = new IntersectionObserver(observerCallback, _extends_1({}, defaultIntersectionObserverInit, {}, option));
    observerRef.current.observe(targetRef.current);
  });
  return [targetRef, status];
};

exports.useVisible = useVisible;
//# sourceMappingURL=index.cjs.js.map

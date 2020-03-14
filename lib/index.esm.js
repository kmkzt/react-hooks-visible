import { useRef, useState, useCallback, useEffect } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
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

const defaultIntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: Array.from({
    length: 100
  }, (v, i) => i * 0.01)
};
const useVisible = (cb, option = {}) => {
  const targetRef = useRef(null);
  const observerRef = useRef(null);
  const [visible, setVisible] = useState(0); // TODO: visible types refactor

  const status = typeof cb === 'function' ? cb(visible) : visible;
  const observerCallback = useCallback(entries => {
    entries.forEach(entry => {
      setVisible(entry.intersectionRatio);
    });
  }, []);
  useEffect(() => {
    if (observerRef.current) return;
    if (!targetRef.current) return;
    observerRef.current = new IntersectionObserver(observerCallback, _extends({}, defaultIntersectionObserverInit, {}, option));
    observerRef.current.observe(targetRef.current);
  });
  return [targetRef, status];
};

export { useVisible };
//# sourceMappingURL=index.esm.js.map

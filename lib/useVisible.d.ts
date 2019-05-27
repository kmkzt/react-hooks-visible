import React from 'react';
export declare const useVisible: <T extends Element, V = number>(cb?: ((vi: number) => V) | undefined, option?: Partial<IntersectionObserverInit>) => [React.MutableRefObject<T | null>, V];

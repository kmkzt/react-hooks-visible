# react-hooks-visible

[![npm version](https://badge.fury.io/js/react-hooks-visible.svg)](https://badge.fury.io/js/react-hooks-visible.svg) ![npm](https://img.shields.io/npm/dt/react-hooks-visible.svg)

`react-hooks-visible` is React Hooks library for element visibility. Uses the intersection observer API.

**[demo](https://kmkzt.github.io/react-hooks-visible/)**

## Get started

```shell
yarn add react react-hooks-visible
```

## How to use

started

```javascript
import React from 'react'
import { useVisible } from 'react-hooks-visible'

const VisibleComponent = () => {
  const [targetRef, visible] = useVisible()
  return (
    <div ref={targetRef}>This is {Math.floor(visible * 100)} % visible </div>
  )
}
```

Pass a function to an argument, and you can change the return value

```javascript
// Percent value.
const [targetRef, percent] = useVisible((vi: number) => Math.floor(vi * 100))

// Boolean. This example is 50% visible.
const [targetRef, isVisible] = useVisible((vi: number) => vi > 0.5)

// CSSProperties. opacity
const [styleExampleRef, visibleStyle] = useVisible((vi: number) => ({
  opacity: vi
}))
```

### Options.

This is same as IntersectionObserver Option.
https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer

```javascript
const [targetRef, visible] = useVisble(Math.floor(visible * 100),{
  root: document.querySelector('wrapper') // Wrap element
  rootMargin: '10px', //wrap element margin
  threshold: [0.1, 0.2, 0.3, 0.4]
})
```

[example code](src/example/)

import React, {
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useState,
  CSSProperties
} from 'react'
import { render } from 'react-dom'
import { useVisible } from '../'

const BoxStyle: CSSProperties = {
  fontSize: '2rem',
  width: '500px',
  height: '500px',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px',
  backgroundColor: '#ddd',
  boxSizing: 'border-box',
  overflow: 'hidden'
}
const Example = () => {
  const [defaultExampleRef, origin] = useVisible<HTMLDivElement>()
  const [percentExampleRef, percent] = useVisible<HTMLDivElement, number>(
    (vi: number) => Math.floor(vi * 100)
  )
  const [booleanExampleRef, isVisible] = useVisible<HTMLDivElement, boolean>(
    (vi: number) => vi > 0.5
  )
  const [styleExampleRef, visibleStyle] = useVisible<
    HTMLDivElement,
    CSSProperties
  >((vi: number) => ({
    height: `${Math.floor(vi * 100)}%`,
    opacity: vi
  }))
  return (
    <div
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflowY: 'scroll'
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '500vh'
        }}
      >
        <div ref={defaultExampleRef} style={BoxStyle}>
          {origin}
        </div>
        <div ref={percentExampleRef} style={BoxStyle}>
          {percent}%
        </div>
        <div
          ref={booleanExampleRef}
          style={{
            ...BoxStyle,
            fontSize: '5rem',
            textAlign: 'center',
            backgroundColor: isVisible ? '#f00' : '#00b'
          }}
        >
          50%
          <br />
          over
          <br />
          {isVisible ? 'visible' : 'hidden'}
        </div>
        <div
          ref={styleExampleRef}
          style={{
            ...BoxStyle,
            backgroundColor: 'transparent'
          }}
        >
          <img style={visibleStyle} src={require('./example.png')} />
        </div>
      </div>
    </div>
  )
}

const app = document.createElement('div')
document.body.appendChild(app)
render(<Example />, app)

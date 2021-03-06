import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import json from "@rollup/plugin-json"
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import pkg from './package.json'

const input = './src/index.ts'
const globals = {
  react: 'React'
}

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json']
// TODO: research
// const external = id => !id.startsWith('.') && !id.startsWith('/')
const external = Object.keys(globals)
const esm_targets = '>1%, not dead, not ie 11, not op_mini all'

const getBabelOptions = ({ useESModules }) => ({
  extensions,
  babelrc: false,
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        targets: useESModules ? esm_targets : undefined
      }
    ],
    // react
    ['@babel/preset-react', { useBuiltIns: true }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['transform-react-remove-prop-types', { removeImport: true }],
    // '@babel/plugin-proposal-class-properties',
    // TODO: optimize bundle size
    // 'babel-plugin-annotate-pure-calls',
    ['@babel/plugin-transform-runtime', { regenerator: false, useESModules }]
  ]
})

export default [
  /**
   * umd
   */
  {
    input,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      globals,
      exports: 'named',
      sourcemap: false
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({ extensions }),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(),
      sourceMaps(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      // terser({ output: { comments: /Copyright/i } }), // memo
      terser({}),
      sizeSnapshot()
    ]
  },
  /**
   * umd(development)
   */
  // {
  //   input,
  //   output: {
  //     file: pkg.browser,
  //     format: 'umd',
  //     name: pkg.name,
  //     globals,
  //     exports: 'named',
  //     sourcemap: false
  //   },
  //   external: Object.keys(globals),
  //   plugins: [
  //     babel(getBabelOptions({ useESModules: true })),
  //     nodeResolve({ extensions }),
  //     commonjs(),
  //     replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  //     terser()
  //   ]
  // },
  /**
   * cjs
   */
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    external,
    plugins: [
      babel(getBabelOptions({ useESModules: false })),
      commonjs(),
      nodeResolve({ extensions }),
      sourceMaps(),
      sizeSnapshot()
    ]
  },
  /**
   * esm
   */
  {
    input,
    output: { file: pkg.module, format: 'esm', sourcemap: true },
    external,
    plugins: [
      babel(getBabelOptions({ useESModules: true })),
      nodeResolve({ extensions }),
      sourceMaps(),
      sizeSnapshot()
    ]
  }
]

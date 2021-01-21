const { default: babel } = require('@rollup/plugin-babel');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const styles = require('rollup-plugin-styles');

function isBareModuleId(id) {
  return !id.startsWith('.') && !id.startsWith('/') && !/\.css$/.test(id);
}

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const cjs = [
  {
    input: 'src/index.ts',
    output: { file: 'lib/cjs/index.js', format: 'cjs' },
    external: isBareModuleId,
    plugins: [
      nodeResolve({
        extensions,
      }),

      styles(),

      babel({
        extensions,
        babelrc: false,
        exclude: /node_modules/,
        babelHelpers: 'bundled',
        presets: [
          ['@babel/env', { loose: true }],
          '@babel/react',
          '@babel/typescript',
        ],
      }),
    ],
  },
];

const esm = [
  {
    input: 'src/index.ts',
    output: { file: 'lib/esm/index.js', format: 'esm' },
    external: isBareModuleId,
    plugins: [
      nodeResolve({
        extensions,
      }),

      styles(),

      babel({
        extensions,
        babelrc: false,
        exclude: /node_modules/,
        babelHelpers: 'runtime',
        presets: [
          ['@babel/env', { loose: true }],
          '@babel/react',
          '@babel/typescript',
        ],
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
    ],
  },
];

module.exports = [...cjs, ...esm];

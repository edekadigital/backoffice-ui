const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');

function isBareModuleId(id) {
  return !id.startsWith('.') && !id.startsWith('/');
}

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const cjs = [
  {
    input: 'src/index.ts',
    output: { file: `lib/cjs/index.js`, format: 'cjs' },
    external: isBareModuleId,
    plugins: [
      nodeResolve({
        extensions,
      }),

      babel({
        extensions,
        babelrc: false,
        exclude: /node_modules/,
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
    output: { file: `lib/esm/index.js`, format: 'esm' },
    external: isBareModuleId,
    plugins: [
      nodeResolve({
        extensions,
      }),

      babel({
        extensions,
        babelrc: false,
        exclude: /node_modules/,
        runtimeHelpers: true,
        presets: [
          ['@babel/env', { loose: true }],
          '@babel/react',
          '@babel/typescript',
        ],
        plugins: [['@babel/transform-runtime', { useESModules: true }]],
      }),
    ],
  },
];

module.exports = [...cjs, ...esm];

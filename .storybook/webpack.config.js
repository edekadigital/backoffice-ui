const path = require('path');
module.exports = ({ config }) => {
  // config.module.rules.push({
  //   test: /\.(ts|tsx)$/,
  //   use: [
  //     require.resolve('babel-loader'),
  //     {
  //       loader: require.resolve('react-docgen-typescript-loader'),
  //       options: {
  //         // Provide the path to your tsconfig.json so that your stories can
  //         // display types from outside each individual story.
  //         tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
  //       },
  //     },
  //   ],
  // });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};

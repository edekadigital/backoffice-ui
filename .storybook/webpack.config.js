module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: require.resolve('babel-loader'),
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader',
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};

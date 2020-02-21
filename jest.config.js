module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/{typography,forms,layouts,global,components}/**/*.{ts,tsx}',
    '!./src/**/*.stories.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

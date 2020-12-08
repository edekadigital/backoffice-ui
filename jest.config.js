module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/{typography,forms,layouts,global,components}/**/*.{ts,tsx}',
    '!./src/**/*.stories.{ts,tsx}',
    '!./src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
};

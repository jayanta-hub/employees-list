module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Coverage options (optional)
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts", // Exclude TypeScript declaration files
    "!src/index.tsx", // Exclude index file
  ],
  coverageDirectory: "coverage",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle CSS imports in tests
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js", // Handle static asset imports in tests
  },

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\.next\\\\"],

  // Transform settings for TypeScript and JavaScript files
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use Babel for transforming JS/TS files
  },

  // Global setup to ensure the correct environment for React testing library
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Enables test to run with `node_modules` imports that are ESModules
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
};

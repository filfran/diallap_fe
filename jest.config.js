module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": require.resolve("babel-jest"),
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)",
  ],
  setupFiles: ["<rootDir>/node_modules/react-native/jest/setup.js"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

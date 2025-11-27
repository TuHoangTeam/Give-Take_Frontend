module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@reduxjs|redux-toolkit|react-redux|styled-components|immer)',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!**/__tests__/**',
    '!**/__mocks__/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/.expo/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/__mocks__/',
    '/coverage/',
  ],
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>'],
};

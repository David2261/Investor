/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
  // Custom configs
  verbose: true,
  bail: 1,
  // Setup configs
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  preset: 'ts-jest/presets/js-with-ts-esm',
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.setup.ts',
    "<rootDir>/config/setupTests.ts"
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '\\.(webp)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@/__tests__/(.*)$': '<rootDir>/src/__tests__/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
  }
}
module.exports = config;
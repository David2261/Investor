/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // среда тестирования - браузер
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: [".ts"],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '\\.(webp)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  }
}
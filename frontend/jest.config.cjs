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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
  }
}
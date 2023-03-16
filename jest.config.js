/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>'
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }

}

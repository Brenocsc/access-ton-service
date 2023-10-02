/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [".build"],
  moduleNameMapper: {
    "@application/(.*)": "<rootDir>/src/application/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@infra/(.*)": "<rootDir>/src/infra/$1",

    // "@application/*": [
    //   "src/application/*"
    // ],
    // "@domain/*": [
    //   "src/domain/*"
    // ],
    // "@infra/*": [
    //   "src/infra/*"
    // ],
  },
};
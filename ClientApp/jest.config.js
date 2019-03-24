module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupEnzyme.ts"],
  coverageReporters: [
    "lcov",
    "json"
  ],
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  coverageDirectory: "coverage",
  testResultsProcessor: "jest-sonar-reporter",
  setupFiles: [
    "./tests/dom.js"
  ]
}
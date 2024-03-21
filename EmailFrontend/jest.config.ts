// jest.config.ts

export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" ,
    },
    transformIgnorePatterns: [
        '../../node_modules/react-quill/dist/'
    ],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    },
    reporters: [
        "default",
        [
          "jest-junit",
          {
            outputDirectory: "./coverage",
            outputName: "test-report.xml"
          }
        ]
      ],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/__mocks__/fileMock.js"
    ],
 ///node_modules/react-quill/dist/.*.css
}
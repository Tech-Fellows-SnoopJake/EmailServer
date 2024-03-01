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
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__test__/__mocks__/fileMock.js',
    },
 ///node_modules/react-quill/dist/.*.css
}
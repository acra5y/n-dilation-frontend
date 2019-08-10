// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    globals: {
        window: {}
    },
    setupFilesAfterEnv: ["<rootDir>setupTests.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testEnvironment: "jsdom",
};

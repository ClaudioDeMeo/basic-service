module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coverageReporters: [
        'html',
        'text',
        'text-summary',
        'cobertura',
        'json',
        'clover',
        'json-summary'
    ]
};

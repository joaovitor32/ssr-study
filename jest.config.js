/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
//import { pathsToModuleNameMapper } from 'ts-jest/utils'

//import { compilerOptions } from './tsconfig.json'

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/shared/**/*.ts',
        '!<rootDir>/src/shared/drivers/queue/interfaces/types.ts',
        '!<rootDir>/src/shared/drivers/queue/index.ts'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text-summary', 'lcov'],
    preset: 'jest-puppeteer',
    testMatch: ['**/*.spec.ts'],

    testPathIgnorePatterns: ['/node_modules/'],
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
    testEnvironment: './puppeteer_environment.js'
}

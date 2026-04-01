import {JestConfigWithTsJest} from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm', // Use ESM support
  testEnvironment: 'node',
  verbose: false,
  noStackTrace: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {useESM: true}], // Ensure proper regex escaping
  },
}

export default config

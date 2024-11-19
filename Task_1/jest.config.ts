import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Use ts-jest preset for handling TypeScript files
  preset: 'ts-jest',

  // Define where Jest can find your tests
  testMatch: ['**/src/test/**/*.test.ts'], 

  // If you have specific patterns or directories to ignore
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  // Enable TypeScript compilation for the test files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Enable coverage collection (optional)
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

  // Optional: Add any specific test environment if needed
  testEnvironment: 'node',

  // To prevent Jest from hanging after tests are complete
  clearMocks: true,
};

export default config;

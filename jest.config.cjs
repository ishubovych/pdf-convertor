/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-pdf|pdfjs-dist|@react-pdf|react-pdf-highlighter)/)',
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};

module.exports = config; 
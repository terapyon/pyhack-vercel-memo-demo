const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// CI環境かどうかを判定
const isCI = process.env.CI === 'true'

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // CI環境では詳細なマッピングを使用
    ...(isCI ? {
      '^@/components/(.*)$': '<rootDir>/src/components/$1',
      '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
      '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
      '^@/types/(.*)$': '<rootDir>/src/types/$1',
      '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    } : {}),
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  // CI環境での追加設定
  ...(isCI ? {
    maxWorkers: 1,
    forceExit: true,
    detectOpenHandles: true,
    verbose: true,
    testTimeout: 10000,
  } : {}),
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
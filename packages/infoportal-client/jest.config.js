const baseConfig = require('../../jest.base.config')

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
}

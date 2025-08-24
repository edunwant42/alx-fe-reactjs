module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
}

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', 'plugin:mocha/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['mocha'],
  rules: { 'mocha/no-mocha-arrows': 0, 'mocha/max-top-level-suites': ['warn', { limit: 2 }] },
};

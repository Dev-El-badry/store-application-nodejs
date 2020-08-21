module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    camelcase: 0,
  },
};

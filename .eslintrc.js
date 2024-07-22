module.exports = {
  extends: ['next', 'eslint:recommended', 'prettier'],
  plugins: ['react', 'unicorn'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};

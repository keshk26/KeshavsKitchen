// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'universe/native'],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    // React specific rules
    'react/prop-types': 'off', // Since we're using TypeScript
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-key': 'error',

    // General best practices
    'no-unused-vars': 'off', // Turn off the base rule as it can report incorrect errors
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    'no-duplicate-imports': 'error',

    // TypeScript specific rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Import rules
    'import/order': 'off',

    // Code style
    'no-multiple-empty-lines': ['error', { max: 1 }],

    // Error prevention
    'prefer-const': 'error',
    'no-const-assign': 'error'
  }
};

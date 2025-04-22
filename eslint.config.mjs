// eslint.config.mjs
import nextPlugin from 'eslint-config-next';

export default [
  ...nextPlugin.configs['recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    },
  },
];
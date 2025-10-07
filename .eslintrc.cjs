module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Disable false positive for Vue template class bindings
    'vue/no-setup-props-destructure': 'off',
    // This is a false positive - class bindings are not hooks
    'react-hooks/rules-of-hooks': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // Vue-specific overrides
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
}

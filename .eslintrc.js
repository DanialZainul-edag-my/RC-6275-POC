module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@intlify/vue-i18n/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
    '@intlify/vue-i18n/no-dynamic-keys': 'off',
    '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'warn',
    '@intlify/vue-i18n/no-raw-text': [
      'warn',
      {
        attributes: {
          '/.+/': [
            'title',
            'aria-label',
            'aria-placeholder',
            'aria-roledescription',
            'aria-valuetext'
          ],
          input: ['placeholder'],
          img: ['alt']
        },
        ignoreNodes: ['md-icon', 'v-icon'],
        ignorePattern: '^[-#:()&]+$',
        ignoreText: ['EUR', 'HKD', 'USD']
      }
    ],
    '@intlify/vue-i18n/no-unused-keys': [
      'warn',
      {
        extensions: ['.ts', '.js', '.vue', '.json']
      }
    ]
  },
  overrides: [
    {
      files: ['layouts/**/*.vue', 'pages/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    },
    {
      files: ['*.json', '*.json5'],
      extends: ['plugin:@intlify/vue-i18n/base']
    }
  ],
  settings: {
    'vue-i18n': {
      localeDir: './locales/*.{json,json5,yaml,yml}',
      messageSyntaxVersion: '^9.0.0'
    }
  }
}

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from "@stylistic/eslint-plugin"
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/key-spacing": ["error", { "afterColon": true }],
      "@stylistic/no-trailing-spaces": ["error"],
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/space-before-blocks": ["warn", "always"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/semi": ["error", "always"],
      "no-mixed-spaces-and-tabs": "error",
    }
  },
])

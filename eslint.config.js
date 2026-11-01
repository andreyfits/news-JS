const { defineConfig, globalIgnores } = require('eslint/config');
const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.js'],
        extends: [js.configs.recommended],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
        rules: {
            'no-debugger': 'off',
        },
    },
    {
        files: ['**/*.ts'],
        extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            'no-debugger': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
            ],
        },
    },
    prettierRecommended,
]);

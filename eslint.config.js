import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
    js.configs.recommended,
    {
        files: ['lib/**/*.js', 'lib/**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            react
        },
        rules: {
            'no-console': 'off',
            'react/jsx-uses-vars': 'error'
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
];

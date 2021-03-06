module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/react',
    ],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 7,
        sourceType: 'module',
    },
    parser: 'babel-eslint',
    plugins: ['react', 'import', 'react-hooks', 'prettier', 'emotion'],
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    globals: {
        global: 'readonly',
    },
    rules: {
        indent: ['error', 4],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: ['error', 'never'],

        'linebreak-style': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-alert': 'error',
        'no-unused-vars': 'off',
        'no-template-curly-in-string': 'error',

        'import/no-unresolved': 'off',

        'react/prop-types': [
            'warn',
            {
                ignore: ['className', 'children'],
            },
        ],
        'react/boolean-prop-naming': 'error',
        'react/destructuring-assignment': 'warn',
        'react/no-deprecated': 'warn',
        'react/no-redundant-should-component-update': 'error',
        'react/no-will-update-set-state': 'error',

        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-spacing': ['error', { when: 'never' }],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
            },
        ],
        'react/jsx-wrap-multilines': ['error', { return: 'parens-new-line' }],

        'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    },
}

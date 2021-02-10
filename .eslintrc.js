module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'plugin:react/recommended',
        'google',
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 2020,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'indent': ['error', 4],
        'max-len': ['error', {'code': 110}],
        'react/prop-types': 0,
        'require-jsdoc': ['error', {
            'require': {
                'FunctionDeclaration': false,
                'MethodDefinition': false,
                'ClassDeclaration': false,
                'ArrowFunctionExpression': false,
                'FunctionExpression': false,
            },
        }],
        'new-cap': 0,
        'no-invalid-this': 'off',
    },
};

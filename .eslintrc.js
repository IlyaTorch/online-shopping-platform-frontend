module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'plugin:react/recommended',
        'google',
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
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
    },
};

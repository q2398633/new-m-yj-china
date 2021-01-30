module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        // 缩进
        "indent": ["off", 2],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "space-before-function-paren": 0,
        "no-multiple-empty-lines": [2, { "max": 99999, "maxEOF": 0 }],
        'eslint eol-last': 0,
        "camelcase": [1, { "properties": "never" }],
        'semi': 0,
        'no-unused-vars': 'warn',
        "quotes":[1, "single"],
        "no-tabs":"off",
        "trailingComma": false,
        "eqeqeq":["off"]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },

}
module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        // Code Quality Rules
        "no-unused-vars": "error",
        "no-console": "warn",
        "complexity": ["error", 10],
        "max-lines-per-function": ["warn", 50],
        "max-depth": ["error", 4],
        "max-params": ["error", 4],
        
        // Code Style Rules
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-trailing-spaces": "error",
        "eol-last": "error",
        
        // Maintainability Rules
        "no-duplicate-imports": "error",
        "no-var": "error",
        "prefer-const": "error",
        "no-magic-numbers": ["warn", { "ignore": [0, 1, -1] }]
    }
};
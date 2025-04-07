import typescriptEslint from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/*.js", "**/*.d.ts", "tests/**/*.ts"],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "@stylistic": stylistic
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "indent": ["warn", 4],
        "linebreak-style": ["warn", "unix"],
        "quotes": ["error", "double"],
        "semi": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-unused-expressions": "warn",
        "prefer-const": "warn",
        "no-var": ["error"],
        "no-eval": ["error"],
        "no-implicit-globals": ["error"],
        "prefer-arrow-callback": ["error"],
        "no-trailing-spaces": ["warn"],
        "no-debugger": ["warn"],
        "brace-style": ["warn"],
        "no-unused-vars": "off",
        "no-constant-binary-expression": ["warn"],
        "valid-typeof": ["warn"],
        "require-await": ["error"],
        "no-return-await": ["error"],
        "camelcase": ["warn"],
        "no-implied-eval": ["error"],
        "no-lonely-if": ["warn"],
        "no-return-assign": ["error"],
        "no-sequences": ["error"],
        "no-implicit-coercion": ["error"],
        "curly": ["error", "all"],
        "arrow-body-style": ["error", "as-needed"],
        "no-duplicate-imports": ["error"],
        "radix": ["error"],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-new-func": ["error"],
        "no-buffer-constructor": ["error"],
        "no-shadow": ["warn"],
        "prefer-destructuring": ["warn", { "object": true, "array": false }],
        "object-shorthand": ["error", "always"],
        "no-unused-expressions": ["error"],
        "no-else-return": ["error", { "allowElseIf": false }],
        "no-undef-init": ["error"],
        "consistent-this": ["error", "self"],
        "no-new-object": ["error"],
        "no-dupe-keys": ["error"],
        "no-useless-constructor": ["error"],
        "prefer-numeric-literals": ["error"],
        "no-new-wrappers": ["error"],
        "no-useless-return": "warn",
        "arrow-parens": ["warn", "as-needed"],
        "no-extra-bind": "warn",
        "no-floating-decimal": "warn",
        "no-self-compare": "error",
        "no-useless-concat": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "no-unneeded-ternary": "warn",
        "no-promise-executor-return": "error",
        "no-mixed-operators": ["warn", { "groups": [["&&", "||"]] }],
        "array-bracket-spacing": ["error", "never"],
        "no-prototype-builtins": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@stylistic/keyword-spacing": ["warn", { "before": true, "after": true }]
    },
}];

module.exports = {
  extends: "eslint:all",
  rules: {
    "array-callback-return": "off",
    "camelcase": "off",
    "capitalized-comments": "off",
    "class-methods-use-this": ["warn", { enforceForClassFields: false }],
    "complexity": ["warn", 25],
    "curly": ["error", "multi"],
    "func-names": ["warn", "never"],
    "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
    "id-length": [
      "warn",
      {
        exceptionPatterns: [],
        exceptions: [],
        max: 50,
        min: 1,
        properties: "always"
      }
    ],
    "line-comment-position": ["warn", { ignorePattern: "NOSONAR" }],
    "max-depth": ["warn", 5],
    "max-lines": ["warn", 1500],
    "max-lines-per-function": ["warn", 500],
    "max-params": ["warn", 5],
    "max-statements": ["warn", 100],
    "multiline-comment-style": "off",
    "new-cap": "off",
    "no-inline-comments": ["warn", { ignorePattern: "NOSONAR" }],
    "no-lone-blocks": "off",
    "no-magic-numbers": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-ternary": "off",
    "no-undef": ["warn", { typeof: true }],
    "no-undefined": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "object-shorthand": ["warn", "properties"],
    "one-var": ["warn", "never"],
    "prefer-destructuring": "off",
    "prefer-named-capture-group": "off",
    "prefer-object-has-own": "off",
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
    "sort-keys": "off",
    "spaced-comment": [
      "warn",
      "always",
      {
        // eslint-disable-next-line xss/no-mixed-html -- Ok
        markers: ["/ <reference"]
      }
    ]
  },
  overrides: [
    {
      files: "*.{ts,vue}",
      rules: {
        "consistent-return": "off",
        "default-case": "off",
        "no-undef": "off"
      }
    }
  ]
};

module.exports = {
  extends: ["plugin:@typescript-eslint/all"],
  plugins: ["@typescript-eslint"],
  rules: {
    ...require("./getAll")("@typescript-eslint/eslint-plugin"),
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/ban-types": [
      "warn",
      {
        extendDefaults: false,
        types: {
          "Number": "Not allowed",
          "Object": "Not allowed",
          "String": "Not allowed",
          "{}": "Not allowed"
        }
      }
    ],
    "@typescript-eslint/consistent-indexed-object-style": [
      "warn",
      "index-signature"
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { disallowTypeAnnotations: true, prefer: "type-imports" }
    ],
    "@typescript-eslint/init-declarations": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/method-signature-style": ["warn", "property"],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        custom: { match: true, regex: "^.{1,50}$" },
        format: ["camelCase"],
        leadingUnderscore: "allow",
        selector: ["default"]
      },
      {
        custom: { match: true, regex: "^.{1,50}$" },
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
        selector: ["classProperty", "function", "typeLike"]
      },
      {
        custom: { match: true, regex: "^.{1,50}$" },
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        selector: ["variable"]
      },
      {
        custom: { match: true, regex: "^.{1,50}$" },
        // eslint-disable-next-line unicorn/no-null -- Ok
        format: null,
        selector: ["objectLiteralProperty", "typeProperty"]
      },
      {
        // eslint-disable-next-line unicorn/no-null -- Ok
        format: null,
        modifiers: ["requiresQuotes"],
        selector: ["default"]
      }
    ],
    "@typescript-eslint/no-empty-interface": [
      "warn",
      { allowSingleExtends: true }
    ],
    "@typescript-eslint/no-implicit-any-catch": "off",
    "@typescript-eslint/no-invalid-void-type": [
      "warn",
      { allowAsThisParameter: true }
    ],
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-shadow": [
      "warn",
      {
        allow: ["event", "name"],
        builtinGlobals: true,
        hoist: "all",
        ignoreFunctionTypeParameterNameValueShadow: false,
        ignoreTypeValueShadow: false
      }
    ],
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: /^(?:_|omit)/u.source,
        varsIgnorePattern: /^(?:_|omit)/u.source
      }
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      { allowNumber: true }
    ],
    "@typescript-eslint/return-await": ["warn", "always"],
    "@typescript-eslint/switch-exhaustiveness-check": "off"
  }
};

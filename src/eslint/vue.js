const { quasarGlobalComponents } = require("./get-options");

module.exports = {
  plugins: ["vue"],
  rules: {
    ...require("./get-all")("eslint-plugin-vue"),
    "vue/attributes-order": [
      "warn",
      {
        alphabetical: true,
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "SLOT",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT"
        ]
      }
    ],
    "vue/block-lang": ["warn", { script: { lang: "ts" } }],
    "vue/component-api-style": ["warn", ["composition"]],
    "vue/component-definition-name-casing": ["warn", "kebab-case"],
    "vue/component-options-name-casing": ["warn", "kebab-case"],
    "vue/custom-event-name-casing": ["warn", "camelCase"],
    // eslint-disable-next-line no-warning-comments -- Wait for https://github.com/vuejs/eslint-plugin-vue/issues/1791
    // fixme
    "vue/match-component-file-name": "off",
    "vue/new-line-between-multi-line-property": "off",
    "vue/no-bare-strings-in-template": "off",
    "vue/no-multiple-template-root": "off",
    "vue/no-restricted-syntax": [
      "warn",
      {
        message: "Unexpected empty line",
        selector: "VElement[name=template] VText[value=/^\n\n/u]"
      }
    ],
    "vue/no-undef-components": [
      "warn",
      { ignorePatterns: quasarGlobalComponents }
    ],
    "vue/no-unregistered-components": "off",
    "vue/no-unused-properties": [
      "warn",
      {
        deepData: true,
        groups: ["computed", "data", "methods", "props", "setup"],
        ignorePublicMembers: false
      }
    ],
    "vue/no-unused-vars": ["warn", { ignorePattern: /^(?:_|omit)/u.source }],
    "vue/no-v-model-argument": "off",
    "vue/object-shorthand": ["warn", "never"],
    "vue/require-expose": "off",
    "vue/return-in-computed-property": "off",
    "vue/v-on-function-call": ["warn", "never"]
  }
};

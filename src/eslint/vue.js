const { eslint } = require("../../api");

module.exports = {
  overrides: [
    {
      files: "*.vue",
      plugins: ["vue"],
      rules: {
        ...eslint.getAllRules("eslint-plugin-vue"),
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
        "vue/component-options-name-casing": "off",
        "vue/custom-event-name-casing": ["warn", "camelCase"],
        "vue/match-component-file-name": "off",
        "vue/new-line-between-multi-line-property": "off",
        "vue/no-multiple-template-root": "off",
        "vue/no-restricted-syntax": [
          "warn",
          {
            message: "Unexpected empty line",
            selector: "VElement[name=template] VText[value=/^\n\n/u]"
          }
        ],
        "vue/no-unused-properties": [
          "warn",
          {
            deepData: true,
            groups: ["computed", "data", "methods", "props", "setup"],
            ignorePublicMembers: false
          }
        ],
        "vue/no-unused-vars": [
          "warn",
          { ignorePattern: /^(?:_|omit)/u.source }
        ],
        "vue/no-v-model-argument": "off",
        "vue/object-shorthand": ["warn", "never"],
        "vue/require-expose": "off",
        "vue/return-in-computed-property": "off",
        "vue/v-on-function-call": ["warn", "never"]
      }
    }
  ]
};

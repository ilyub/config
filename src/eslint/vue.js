module.exports = {
  plugins: ["vue"],
  rules: {
    ...require("./getAll")("eslint-plugin-vue"),
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
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts"
        }
      }
    ],
    "vue/component-api-style": ["warn", ["composition"]],
    "vue/component-definition-name-casing": ["warn", "kebab-case"],
    "vue/component-options-name-casing": ["warn", "kebab-case"],
    "vue/custom-event-name-casing": ["warn", "camelCase"],
    // eslint-disable-next-line no-warning-comments
    // temp
    "vue/match-component-file-name": "off",
    "vue/name-property-casing": ["warn", "kebab-case"],
    "vue/new-line-between-multi-line-property": "off",
    "vue/no-bare-strings-in-template": [
      "warn",
      {
        allowlist: [
          "(",
          ")",
          "*",
          "+",
          ",",
          "-",
          ".",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          ":",
          "\u2013"
        ],
        attributes: {
          "/.+/": [
            "aria-label",
            "aria-placeholder",
            "aria-roledescription",
            "aria-valuetext",
            "caption",
            "label",
            "title"
          ],
          "img": ["alt"],
          "input": ["placeholder"]
        },
        directives: ["v-text"]
      }
    ],
    "vue/no-multiple-template-root": "off",
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
    "vue/require-expose": "off",
    "vue/return-in-computed-property": "off",
    "vue/v-on-function-call": ["warn", "never"]
  }
};

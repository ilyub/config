module.exports = {
  extends: ["plugin:vue/vue3-recommended"],
  plugins: ["vue"],
  rules: {
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
    "vue/component-api-style": ["warn", ["composition"]],
    "vue/component-definition-name-casing": ["warn", "kebab-case"],
    // temp
    "vue/match-component-file-name": "off",
    "vue/name-property-casing": ["warn", "kebab-case"],
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
    "vue/no-unused-properties": [
      "warn",
      {
        deepData: true,
        groups: ["computed", "data", "methods", "props", "setup"],
        ignorePublicMembers: false
      }
    ],
    "vue/no-unused-vars": ["warn", { ignorePattern: /^(?:_|omit)/u.source }],
    "vue/return-in-computed-property": "off"
  }
};

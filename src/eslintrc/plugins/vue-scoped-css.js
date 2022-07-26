const { getAllRules } = require("./api");

module.exports = {
  overrides: [
    {
      files: "*.vue",
      plugins: ["vue-scoped-css"],
      rules: {
        ...getAllRules("eslint-plugin-vue-scoped-css"),
        "vue-scoped-css/enforce-style-type": ["warn", { allows: ["module"] }],
        "vue-scoped-css/require-scoped": "off"
      }
    }
  ]
};

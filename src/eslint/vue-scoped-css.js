const { eslint } = require("..");

module.exports = {
  overrides: [
    {
      files: "*.vue",
      plugins: ["vue-scoped-css"],
      rules: {
        ...eslint.getAllRules("eslint-plugin-vue-scoped-css"),
        "vue-scoped-css/enforce-style-type": ["warn", { allows: ["module"] }],
        "vue-scoped-css/require-scoped": "off"
      }
    }
  ]
};

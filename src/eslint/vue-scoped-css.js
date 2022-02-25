module.exports = {
  plugins: ["vue-scoped-css"],
  rules: {
    ...require("./getAll")("eslint-plugin-vue-scoped-css"),
    "vue-scoped-css/enforce-style-type": ["warn", { allows: ["module"] }],
    "vue-scoped-css/require-scoped": "off"
  }
};

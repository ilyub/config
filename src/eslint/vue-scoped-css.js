module.exports = {
  plugins: ["vue-scoped-css"],
  rules: {
    ...require("./get-all")("eslint-plugin-vue-scoped-css"),
    "vue-scoped-css/enforce-style-type": ["warn", { allows: ["module"] }],
    "vue-scoped-css/require-scoped": "off"
  }
};

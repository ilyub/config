module.exports = {
  plugins: ["tsdoc"],
  rules: {
    ...require("./getAll")("eslint-plugin-tsdoc"),
    "tsdoc/syntax": "off"
  }
};

module.exports = {
  plugins: ["github"],
  rules: {
    ...require("./getAll")("eslint-plugin-github"),
    "github/unescaped-html-literal": "off"
  }
};

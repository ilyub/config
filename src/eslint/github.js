module.exports = {
  plugins: ["github"],
  rules: {
    ...require("./get-all")("eslint-plugin-github"),
    "github/unescaped-html-literal": "off"
  }
};

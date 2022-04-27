module.exports = {
  plugins: ["xss"],
  rules: {
    ...require("./get-all")("eslint-plugin-xss"),
    "xss/no-mixed-html": "off"
  }
};

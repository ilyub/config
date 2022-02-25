module.exports = {
  plugins: ["xss"],
  rules: {
    ...require("./getAll")("eslint-plugin-xss"),
    "xss/no-mixed-html": "off"
  }
};

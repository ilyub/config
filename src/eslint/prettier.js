module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: require("./getAll")("eslint-plugin-prettier")
};

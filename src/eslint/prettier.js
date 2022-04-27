module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: require("./get-all")("eslint-plugin-prettier")
};

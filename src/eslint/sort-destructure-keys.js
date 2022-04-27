module.exports = {
  plugins: ["sort-destructure-keys"],
  rules: {
    ...require("./get-all")("eslint-plugin-sort-destructure-keys"),
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      { caseSensitive: true }
    ]
  }
};

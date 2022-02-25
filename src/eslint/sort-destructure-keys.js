module.exports = {
  plugins: ["sort-destructure-keys"],
  rules: {
    ...require("./getAll")("eslint-plugin-sort-destructure-keys"),
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      { caseSensitive: true }
    ]
  }
};

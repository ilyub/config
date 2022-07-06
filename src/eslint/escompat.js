module.exports = {
  overrides: [
    { files: "*.{ts,vue}", extends: "plugin:escompat/typescript" },
    { files: "*.js", extends: "plugin:escompat/recommended" }
  ]
};

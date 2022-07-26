module.exports = {
  overrides: [
    { files: "!*.js", extends: "plugin:escompat/typescript" },
    { files: "*.js", extends: "plugin:escompat/recommended" }
  ]
};

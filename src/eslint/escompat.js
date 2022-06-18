module.exports = {
  overrides: [
    { extends: "plugin:escompat/typescript", files: "*.{ts,vue}" },
    { extends: "plugin:escompat/recommended", files: "*.js" }
  ]
};

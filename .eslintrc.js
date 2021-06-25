module.exports = {
  extends: ["./src/eslintrc"],
  rules: {
    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": [
      "warn",
      {
        bundledDependencies: false,
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: true
      }
    ],
    "import/no-nodejs-modules": "off"
  }
};

module.exports = {
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
    "import/no-nodejs-modules": "off",
    "import/no-relative-parent-imports": "off"
  }
};
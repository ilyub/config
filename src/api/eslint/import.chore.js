module.exports = {
  rules: {
    "import/no-extraneous-dependencies": [
      "warn",
      {
        bundledDependencies: false,
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: true
      }
    ]
  }
};

module.exports = {
  plugins: ["import"],
  rules: {
    ...require("./getAll")("eslint-plugin-import"),
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/newline-after-import": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-extraneous-dependencies": [
      "warn",
      {
        bundledDependencies: false,
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: true
      }
    ],
    "import/no-internal-modules": "off",
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-unassigned-import": [
      "warn",
      {
        allow: ["**/*.css", "**/*.scss"]
      }
    ],
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/unambiguous": "off"
  },
  settings: {
    "import/resolver": {
      typescript: { project: "tsconfig.json" }
    }
  }
};

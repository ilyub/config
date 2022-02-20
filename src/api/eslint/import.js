module.exports = {
  plugins: ["import"],
  settings: {
    "import/resolver": {
      typescript: { project: "tsconfig.json" }
    }
  },
  // @skylib/sort-keys break
  rules: {
    "import/default": "warn",
    "import/dynamic-import-chunkname": "warn",
    "import/export": "warn",
    "import/exports-last": "off",
    "import/extensions": "warn",
    "import/first": "warn",
    "import/group-exports": "off",
    "import/imports-first": "warn",
    "import/max-dependencies": "off",
    "import/named": "warn",
    "import/namespace": "warn",
    "import/newline-after-import": "off",
    "import/no-absolute-path": "warn",
    "import/no-amd": "warn",
    "import/no-anonymous-default-export": "off",
    "import/no-commonjs": "warn",
    "import/no-cycle": "warn",
    "import/no-default-export": "warn",
    "import/no-deprecated": "warn",
    "import/no-duplicates": "warn",
    "import/no-dynamic-require": "warn",
    "import/no-extraneous-dependencies": [
      "warn",
      {
        bundledDependencies: false,
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: true
      }
    ],
    "import/no-import-module-exports": "warn",
    "import/no-internal-modules": "off",
    "import/no-mutable-exports": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-as-default-member": "warn",
    "import/no-named-default": "warn",
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-nodejs-modules": "warn",
    "import/no-relative-packages": "warn",
    "import/no-relative-parent-imports": "warn",
    "import/no-restricted-paths": "warn",
    "import/no-self-import": "warn",
    "import/no-unassigned-import": [
      "warn",
      {
        allow: ["**/*.css", "**/*.scss"]
      }
    ],
    "import/no-unresolved": "warn",
    "import/no-unused-modules": "warn",
    "import/no-useless-path-segments": "warn",
    "import/no-webpack-loader-syntax": "warn",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/unambiguous": "off"
  }
};

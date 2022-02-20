module.exports = {
  plugins: ["etc"],
  rules: {
    "etc/no-assign-mutated-array": "warn",
    "etc/no-commented-out-code": "warn",
    "etc/no-const-enum": "warn",
    "etc/no-deprecated": "warn",
    "etc/no-enum": "warn",
    "etc/no-foreach": "warn",
    "etc/no-implicit-any-catch": "warn",
    "etc/no-internal": "warn",
    "etc/no-misused-generics": "off",
    // temp
    "etc/no-t": "off",
    "etc/prefer-interface": "warn",
    // temp
    "etc/prefer-less-than": "off",
    "etc/throw-error": "warn",
    "etc/underscore-internal": "warn"
  }
};

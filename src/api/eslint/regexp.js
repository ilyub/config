module.exports = {
  extends: ["plugin:regexp/all"],
  rules: {
    "regexp/prefer-lookaround": "off",
    // eslint-disable-next-line @skylib/disallow-by-regexp
    // temp
    "regexp/prefer-named-capture-group": "off"
  }
};

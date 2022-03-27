module.exports = {
  rules: {
    "selector-class-pattern": undefined,
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global"] }
    ]
  }
};

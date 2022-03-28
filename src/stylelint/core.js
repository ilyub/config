module.exports = {
  rules: {
    "selector-class-pattern": [
      /^[\w-]+$/u.source,
      { resolveNestedSelectors: true }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global"] }
    ]
  }
};

module.exports = {
  rules: {
    "alpha-value-notation": "number",
    "at-rule-allowed-list": ["import", "keyframes", "use"],
    "at-rule-disallowed-list": [],
    "at-rule-empty-line-before": ["always", { except: "first-nested" }],
    "at-rule-name-case": "lower",
    "at-rule-name-newline-after": "always-multi-line",
    "at-rule-name-space-after": "always-single-line",
    "at-rule-no-unknown": [true, { ignoreAtRules: ["use"] }],
    "at-rule-no-vendor-prefix": true,
    "at-rule-property-required-list": {},
    "at-rule-semicolon-newline-after": "always",
    "at-rule-semicolon-space-before": "never",
    "block-closing-brace-empty-line-before": "never",
    "block-closing-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always",
    "block-closing-brace-space-after": undefined,
    "block-closing-brace-space-before": undefined,
    "block-no-empty": true,
    "block-opening-brace-newline-after": "always",
    "block-opening-brace-newline-before": undefined,
    "block-opening-brace-space-after": undefined,
    "block-opening-brace-space-before": "always",
    "color-function-notation": "modern",
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-named": "always-where-possible",
    "color-no-hex": undefined,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": "never",
    "comment-no-empty": true,
    "comment-pattern": ".*",
    "comment-whitespace-inside": "always",
    "comment-word-disallowed-list": [],
    "custom-media-pattern": ".*",
    "custom-property-empty-line-before": "always",
    "custom-property-pattern": ".*",
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-block-no-duplicate-custom-properties": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-semicolon-newline-after": "always",
    "declaration-block-semicolon-newline-before": "never-multi-line",
    "declaration-block-semicolon-space-after": "always-single-line",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-single-line-max-declarations": 0,
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-newline-after": "always-multi-line",
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "declaration-empty-line-before": "never",
    "declaration-no-important": true,
    "declaration-property-unit-allowed-list": {},
    "declaration-property-unit-disallowed-list": {},
    "declaration-property-value-allowed-list": {},
    "declaration-property-value-disallowed-list": {},
    "font-family-name-quotes": "always-unless-keyword",
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "font-weight-notation": undefined,
    "function-allowed-list": [
      "map.get",
      "rotate",
      "scale",
      "translateX",
      "translateY",
      "v-bind",
      "var"
    ],
    "function-calc-no-unspaced-operator": true,
    "function-comma-newline-after": "always-multi-line",
    "function-comma-newline-before": "never-multi-line",
    "function-comma-space-after": "always",
    "function-comma-space-before": "never",
    "function-disallowed-list": [],
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-max-empty-lines": 0,
    "function-name-case": "lower",
    "function-parentheses-newline-inside": "always-multi-line",
    "function-parentheses-space-inside": "never",
    "function-url-no-scheme-relative": true,
    "function-url-quotes": "always",
    "function-url-scheme-allowed-list": "always",
    "function-url-scheme-disallowed-list": "always",
    "function-whitespace-after": "always",
    "hue-degree-notation": "number",
    "indentation": 2,
    "keyframe-declaration-no-important": true,
    "keyframes-name-pattern": ".*",
    "length-zero-no-unit": true,
    "linebreaks": "unix",
    "max-empty-lines": 1,
    "max-line-length": 80,
    "max-nesting-depth": undefined,
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "always",
    "media-feature-name-allowed-list": [],
    "media-feature-name-case": "lower",
    "media-feature-name-disallowed-list": [],
    "media-feature-name-no-unknown": true,
    "media-feature-name-no-vendor-prefix": true,
    "media-feature-name-value-allowed-list": {},
    "media-feature-parentheses-space-inside": "always",
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "always",
    "media-query-list-comma-newline-after": "always",
    "media-query-list-comma-newline-before": "always",
    "media-query-list-comma-space-after": "always",
    "media-query-list-comma-space-before": "always",
    "named-grid-areas-no-invalid": true,
    "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-first-line": true,
    "no-empty-source": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    "no-invalid-double-slash-comments": true,
    "no-invalid-position-at-import-rule": [true, { ignoreAtRules: "use" }],
    "no-irregular-whitespace": true,
    "no-missing-end-of-source-newline": true,
    "no-unknown-animations": undefined,
    "number-leading-zero": "always",
    "number-max-precision": 3,
    "number-no-trailing-zeros": true,
    "property-allowed-list": undefined,
    "property-case": "lower",
    "property-disallowed-list": [],
    "property-no-unknown": true,
    "property-no-vendor-prefix": true,
    "rule-empty-line-before": ["always", { except: "first-nested" }],
    "selector-attribute-brackets-space-inside": "always",
    "selector-attribute-name-disallowed-list": [],
    "selector-attribute-operator-allowed-list": [],
    "selector-attribute-operator-disallowed-list": [],
    "selector-attribute-operator-space-after": "always",
    "selector-attribute-operator-space-before": "always",
    "selector-attribute-quotes": "always",
    "selector-class-pattern": undefined,
    "selector-combinator-allowed-list": [" ", "+", ">", "~"],
    "selector-combinator-disallowed-list": [],
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-descendant-combinator-no-non-space": true,
    "selector-disallowed-list": [],
    "selector-id-pattern": ".*",
    "selector-list-comma-newline-after": "always",
    "selector-list-comma-newline-before": "never-multi-line",
    "selector-list-comma-space-after": "always-single-line",
    "selector-list-comma-space-before": "always-single-line",
    "selector-max-attribute": 2,
    "selector-max-class": 5,
    "selector-max-combinators": 5,
    "selector-max-compound-selectors": 5,
    "selector-max-empty-lines": 0,
    "selector-max-id": 2,
    "selector-max-pseudo-class": 2,
    "selector-max-specificity": "2,5,2",
    "selector-max-type": 2,
    "selector-max-universal": 2,
    "selector-nested-pattern": ".*",
    "selector-no-qualifying-type": true,
    "selector-no-vendor-prefix": true,
    "selector-pseudo-class-allowed-list": [
      "deep",
      "disabled",
      "empty",
      "first-child",
      "focus",
      "global",
      "hover",
      "not"
    ],
    "selector-pseudo-class-case": "lower",
    "selector-pseudo-class-disallowed-list": [],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global"] }
    ],
    "selector-pseudo-class-parentheses-space-inside": "never",
    "selector-pseudo-element-allowed-list": ["after", "before", "v-deep"],
    "selector-pseudo-element-case": "lower",
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-disallowed-list": [],
    "selector-pseudo-element-no-unknown": true,
    "selector-type-case": "lower",
    "selector-type-no-unknown": true,
    "shorthand-property-no-redundant-values": true,
    "string-no-newline": true,
    "string-quotes": "double",
    "time-min-milliseconds": 0,
    "unicode-bom": "never",
    "unit-allowed-list": ["%", "deg", "em", "ms", "px", "rem", "s"],
    "unit-case": "lower",
    "unit-disallowed-list": [],
    "unit-no-unknown": true,
    "value-keyword-case": ["lower", { ignoreFunctions: [/v-bind/u.source] }],
    "value-list-comma-newline-after": "always-multi-line",
    "value-list-comma-newline-before": "always-multi-line",
    "value-list-comma-space-after": "always",
    "value-list-comma-space-before": "never",
    "value-list-max-empty-lines": 0,
    "value-no-vendor-prefix": true
  }
};
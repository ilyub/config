const { getAllRules, selectors } = require("./api");

const contexts = [selectors.function];

const definedTags = ["jest-environment"];

module.exports = {
  plugins: ["jsdoc"],
  rules: {
    ...getAllRules("eslint-plugin-jsdoc"),
    "jsdoc/check-access": ["warn", { contexts }],
    "jsdoc/check-alignment": ["warn", { contexts }],
    "jsdoc/check-examples": "off",
    "jsdoc/check-syntax": ["warn", { contexts }],
    "jsdoc/check-tag-names": ["warn", { definedTags }],
    "jsdoc/implements-on-classes": ["warn", { contexts }],
    "jsdoc/match-description": ["warn", { contexts }],
    "jsdoc/match-name": "off",
    "jsdoc/multiline-blocks": ["warn", { contexts }],
    "jsdoc/no-defaults": ["warn", { contexts }],
    "jsdoc/no-missing-syntax": "off",
    "jsdoc/no-multi-asterisks": ["warn", { contexts }],
    "jsdoc/no-restricted-syntax": "off",
    "jsdoc/no-types": ["warn", { contexts }],
    "jsdoc/require-description": ["warn", { contexts }],
    "jsdoc/require-example": "off",
    "jsdoc/require-file-overview": "off",
    "jsdoc/require-jsdoc": "off",
    "jsdoc/require-param": ["warn", { contexts }],
    "jsdoc/require-param-description": ["warn", { contexts }],
    "jsdoc/require-param-name": ["warn", { contexts }],
    "jsdoc/require-param-type": "off",
    "jsdoc/require-property": ["warn", { contexts }],
    "jsdoc/require-property-description": ["warn", { contexts }],
    "jsdoc/require-property-name": ["warn", { contexts }],
    "jsdoc/require-property-type": ["warn", { contexts }],
    "jsdoc/require-returns": ["warn", { checkGetters: false, contexts }],
    "jsdoc/require-returns-description": ["warn", { contexts }],
    "jsdoc/require-returns-type": "off",
    "jsdoc/require-throws": "off",
    "jsdoc/require-yields": "off",
    "jsdoc/require-yields-check": ["warn", { contexts }],
    "jsdoc/sort-tags": ["warn", { contexts }],
    "jsdoc/valid-types": ["warn", { contexts }]
  }
};

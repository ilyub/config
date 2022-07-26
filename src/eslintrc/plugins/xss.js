const { getAllRules } = require("./api");

module.exports = { plugins: ["xss"], rules: getAllRules("eslint-plugin-xss") };

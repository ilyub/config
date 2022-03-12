module.exports = {
  plugins: ["pii"],
  rules: {
    ...require("./getAll")("eslint-plugin-pii"),
    "pii/no-dob": "off",
    "pii/no-phone-number": "off"
  }
};

module.exports = {
  plugins: ["pii"],
  rules: {
    ...require("./get-all")("eslint-plugin-pii"),
    "pii/no-dob": "off",
    "pii/no-phone-number": "off"
  }
};

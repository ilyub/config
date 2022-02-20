module.exports = {
  plugins: ["pii"],
  rules: {
    "pii/no-email": "warn",
    "pii/no-ip": "warn",
    "pii/no-phone-number": "warn"
  }
};

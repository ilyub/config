module.exports = {
  plugins: ["xss"],
  rules: {
    "xss/no-location-href-assign": "warn",
    "xss/no-mixed-html": "off"
  }
};

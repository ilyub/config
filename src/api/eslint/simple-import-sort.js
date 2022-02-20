module.exports = {
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/exports": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          [/^\0?[\dA-Za-z]/u.source, /^\0?(?!@skylib\/)@[\dA-Za-z]/u.source],
          [/^\0?@skylib\//u.source],
          [/^\0?@\//u.source],
          [/^\0?\.\./u.source],
          [/^\0?\.(?!\.)/u.source]
        ]
      }
    ]
  }
};

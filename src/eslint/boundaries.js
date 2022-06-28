const { eslint } = require("../../api");

module.exports = {
  overrides: [
    { files: "./*", rules: { "boundaries/no-unknown-files": "off" } }
  ],
  plugins: ["boundaries"],
  rules: {
    ...eslint.getAllRules("eslint-plugin-boundaries"),
    "boundaries/element-types": [
      "warn",
      { default: "disallow", rules: eslint.boundaries.elementTypes.rules }
    ],
    "boundaries/no-private": "off"
  },
  settings: {
    "boundaries/elements": [
      {
        mode: "file",
        pattern: "./api/**",
        type: "api"
      },
      {
        mode: "file",
        pattern: "./bin/**",
        type: "bin"
      },
      {
        mode: "file",
        pattern: "./configs/**",
        type: "configs"
      },
      {
        mode: "file",
        pattern: "./fixtures/**",
        type: "fixtures"
      },
      {
        mode: "file",
        pattern: "./__mocks__/**",
        type: "mocks"
      },
      {
        mode: "file",
        pattern: "./tests/**",
        type: "tests"
      },
      ...(() => {
        const capture = [];

        let directories = "";

        const part = "([a-zA-Z0-9-]+)";

        const result = [];

        for (let index = 1; index <= 7; index++) {
          result.push(
            {
              capture: [...capture, "filename", "suffix", "ext"],
              mode: "file",
              pattern: [`./src/${directories}${part}().${part}`],
              type: `src${index}`
            },
            {
              capture: [...capture, "filename", "suffix", "ext"],
              mode: "file",
              pattern: [`./src/${directories}${part}.${part}.${part}`],
              type: `src${index}`
            }
          );

          capture.push(`dir${index}`);

          directories = `${directories}*/`;
        }

        return result;
      })()
    ]
  }
};

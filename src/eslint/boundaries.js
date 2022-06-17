/* eslint-disable no-template-curly-in-string -- Ok */

module.exports = {
  overrides: [
    { files: "./*", rules: { "boundaries/no-unknown-files": "off" } }
  ],
  plugins: ["boundaries"],
  rules: {
    ...require("./get-all")("eslint-plugin-boundaries"),
    "boundaries/element-types": [
      "warn",
      {
        default: "disallow",
        rules: [
          {
            allow: [
              [
                "{src1,src2,src3,src4,src5,src6,src7}",
                { filename: "${filename}" }
              ]
            ],
            from: "{src1,src2,src3,src4,src5,src6,src7}"
          },
          {
            allow: "{src1,src2,src3,src4,src5,src6,src7}",
            from: [
              "mocks",
              "tests",
              ["{src1,src2,src3,src4,src5,src6,src7}", { filename: "index" }],
              [
                "{src2,src3,src4,src5,src6,src7}",
                { dir1: "{boot,samples,test-utils}" }
              ]
            ]
          },
          { allow: ["src2"], from: ["src1"] },
          { allow: ["src3"], from: ["src2"] },
          { allow: ["src4"], from: ["src3"] },
          { allow: ["src5"], from: ["src4"] },
          { allow: ["src6"], from: ["src5"] },
          { allow: ["src7"], from: ["src6"] }
        ]
      }
    ]
  },
  settings: {
    "boundaries/elements": [
      ...(() => {
        const capture = [];

        let dirs = "";

        const part = "([a-zA-Z0-9-]+)";

        const result = [];

        for (let i = 1; i <= 7; i++) {
          result.push(
            {
              capture: [...capture, "filename", "suffix", "ext"],
              mode: "file",
              pattern: [`./src/${dirs}${part}().${part}`],
              type: `src${i}`
            },
            {
              capture: [...capture, "filename", "suffix", "ext"],
              mode: "file",
              pattern: [`./src/${dirs}${part}.${part}.${part}`],
              type: `src${i}`
            }
          );

          capture.push(`dir${i}`);

          dirs = `${dirs}*/`;
        }

        return result;
      })(),
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
      }
    ]
  }
};

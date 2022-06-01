module.exports = {
  plugins: ["boundaries"],
  rules: {
    ...require("./get-all")("eslint-plugin-boundaries"),
    "boundaries/element-types": [
      "warn",
      {
        default: "disallow",
        rules: [
          { allow: ["src2"], from: ["src1"] },
          { allow: ["src3"], from: ["src2"] },
          { allow: ["src4"], from: ["src3"] },
          { allow: ["src5"], from: ["src4"] },
          { allow: ["src1", "src2", "src3", "src4", "src5"], from: ["mocks"] },
          { allow: ["src1", "src2", "src3", "src4", "src5"], from: ["tests"] },
          {
            allow: ["src1", "src2", "src3", "src4", "src5"],
            from: [["src2", { part1: "test-utils" }]]
          }
        ]
      }
    ]
  },
  settings: {
    "boundaries/elements": [
      {
        mode: "file",
        pattern: "./configs/**",
        type: "configs"
      },
      {
        mode: "file",
        pattern: "./__mocks__/**",
        type: "mocks"
      },
      {
        capture: ["part1"],
        mode: "file",
        pattern: "./src/*",
        type: "src1"
      },
      {
        capture: ["part1", "part2"],
        mode: "file",
        pattern: "./src/*/*",
        type: "src2"
      },
      {
        capture: ["part1", "part2", "part3"],
        mode: "file",
        pattern: "./src/*/*/*",
        type: "src3"
      },
      {
        capture: ["part1", "part2", "part3", "part4"],
        mode: "file",
        pattern: "./src/*/*/*/*",
        type: "src4"
      },
      {
        capture: ["part1", "part2", "part3", "part4", "part5"],
        mode: "file",
        pattern: "./src/*/*/*/*/*",
        type: "src5"
      },
      {
        mode: "file",
        pattern: "./tests/**",
        type: "tests"
      }
    ]
  }
};

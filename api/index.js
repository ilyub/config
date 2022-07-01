const fs = require("node:fs");

module.exports = {
  eslint: {
    boundaries: {
      elementTypes: {
        /**
         * Creates rules for "boundaries/element-types" rule.
         *
         * @param generator - Creates element matcher from filename.
         * @param blocks - Blocks.
         * @returns Rules.
         */
        createRules: (generator, ...blocks) => {
          const result = [];

          for (const [allowIndex, allowFilename] of blocks.entries())
            for (const [fromIndex, fromFilename] of blocks.entries())
              if (allowIndex < fromIndex)
                result.push({
                  allow: [generator(allowFilename)],
                  from: [generator(fromFilename)]
                });

          return result;
        },
        rules: [
          { allow: ["src2"], from: ["src1"] },
          { allow: ["src3"], from: ["src2"] },
          { allow: ["src4"], from: ["src3"] },
          { allow: ["src5"], from: ["src4"] },
          { allow: ["src6"], from: ["src5"] },
          { allow: ["src7"], from: ["src6"] },
          {
            allow: "{src1,src2,src3,src4,src5,src6,src7}",
            from: [
              "{mocks,tests}",
              ["{src1,src2,src3,src4,src5,src6,src7}", { filename: "index" }],
              ["src2", { dir1: "{__mocks__,test-utils}" }],
              ["src3", { dir2: "__mocks__" }],
              ["src4", { dir3: "__mocks__" }],
              ["src5", { dir4: "__mocks__" }],
              ["src6", { dir5: "__mocks__" }],
              ["src7", { dir6: "__mocks__" }]
            ]
          },
          {
            allow: [
              [
                "{src1,src2,src3,src4,src5,src6,src7}",
                // eslint-disable-next-line no-template-curly-in-string -- Ok
                { filename: "${filename}" }
              ]
            ],
            from: "{src1,src2,src3,src4,src5,src6,src7}"
          }
        ]
      }
    },
    getAllRules: source => {
      const prefix = (() => {
        if (source.endsWith("/eslint-plugin")) return source.slice(0, -14);

        if (source.startsWith("eslint-plugin-")) return source.slice(14);

        throw new Error(`Unexpected source name: ${source}`);
      })();

      const { rules } = require(source);

      return Object.fromEntries(
        Object.keys(rules).map(rule => [`${prefix}/${rule}`, "warn"])
      );
    },
    skylib: {
      readonliness: { ignoreTypes: ["^Promise$", "^Readonly", "^Writable"] }
    }
  },
  jest: {
    preset: {
      cacheDirectory: "./cache/jest",
      collectCoverage: true,
      collectCoverageFrom: ["src/**/*.{ts,tsx,vue}", "!**/*.d.ts"],
      coverageDirectory: ".",
      coverageReporters: ["lcov", "lcovonly"],
      globals: {
        "ts-jest": { isolatedModules: true, tsconfig: "./tsconfig-min.json" }
      },
      haste: { throwOnModuleCollision: true },
      maxWorkers: 1,
      moduleFileExtensions: ["js", "ts", "vue"],
      moduleNameMapper: {
        [/^@$/u.source]: "<rootDir>/src",
        [/^@\/(.+)/u.source]: "<rootDir>/src/$1",
        [/^lodash-es$/u.source]: "lodash",
        [/^quasar$/u.source]:
          "<rootDir>/node_modules/quasar/dist/quasar.esm.prod.js",
        [/^uuid$/u.source]: "<rootDir>/node_modules/uuid/dist/index.js"
      },
      modulePathIgnorePatterns: [
        "/(?:\\.git|\\.quasar|\\.scannerwork|\\.vscode|cache|dist|docs|es|lcov-report|node_modules)/"
      ],
      resolver: "@skylib/config/src/jest-resolver",
      setupFiles: fs.existsSync("./jest.setup.ts") ? ["./jest.setup.ts"] : [],
      setupFilesAfterEnv: fs.existsSync("./jest.setup-after-env.ts")
        ? ["./jest.setup-after-env.ts"]
        : [],
      testEnvironment: "@skylib/config/src/jest-env-node",
      testMatch: ["<rootDir>/tests/**/*.ts"],
      testSequencer: "@skylib/config/src/jest-sequencer",
      testTimeout: 10_000,
      transform: {
        [/\.(?:css|gif|jpg|less|png|sass|scss|styl|svg|ttf|woff|woff2)$/u
          .source]: "jest-transform-stub",
        [/\.(?:html|js|ts)$/u.source]: "ts-jest",
        [/\.vue$/u.source]: "@vue/vue3-jest"
      },
      transformIgnorePatterns: [
        "node_modules/(?!@skylib/quasar-extension|is-obj|is-regexp|quasar|stringify-object)"
      ]
    }
  }
};

const fs = require("node:fs");

const pkg = require(fs.realpathSync("./package.json"));

module.exports = {
  eslint: {
    getAllRules: (source, filter = () => true) => {
      const prefix = (() => {
        if (source.endsWith("/eslint-plugin")) return source.slice(0, -14);

        if (source.startsWith("eslint-plugin-")) return source.slice(14);

        throw new Error(`Unexpected source name: ${source}`);
      })();

      const { rules } = require(source);

      return Object.fromEntries(
        Object.keys(rules)
          .map(rule => `${prefix}/${rule}`)
          .filter(filter)
          .map(rule => [rule, "warn"])
      );
    },
    rules: {
      "@skylib/consistent-import/project": {
        sources: [
          {
            _id: "test-utils",
            source: `${pkg.name}/src/test-utils`,
            type: "wildcard"
          },
          {
            _id: "catch-all",
            source: `${pkg.name}/**`,
            type: "default"
          }
        ]
      },
      "@typescript-eslint/no-shadow": {
        allow: ["Plugin", "event", "name"],
        builtinGlobals: true,
        hoist: "all",
        ignoreFunctionTypeParameterNameValueShadow: false,
        ignoreTypeValueShadow: true
      }
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

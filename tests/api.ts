/* eslint jest/max-expects: [warn, { max: 3 }] -- Ok */

/* eslint-disable @typescript-eslint/no-shadow -- Ok */

import { eslint, jest } from "../api";

test("eslint", () => {
  expect(eslint.getAllRules).toBeInstanceOf(Function);
  expect(eslint.rules["@skylib/consistent-import"]).toBeInstanceOf(Object);
  expect(eslint.rules["@typescript-eslint/no-shadow"]).toBeInstanceOf(Object);
});

test("jest", () => {
  expect(jest.preset).toBeInstanceOf(Object);
});

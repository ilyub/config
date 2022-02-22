import { sample } from "@/api/tsconfig/sample";

test("sample test", () => {
  expect.assertions(1);
  expect(sample).toBeUndefined();
});

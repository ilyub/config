import { sample } from "@/api/sample";

test("sample test", () => {
  expect.assertions(1);
  expect(sample).toBeUndefined();
});

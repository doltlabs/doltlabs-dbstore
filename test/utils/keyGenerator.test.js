import { generateId } from "../../src/utils";

test('generateId() generates a valid ID', () => {
  const id = generateId();
  expect(id).toMatch(/^id_\w{9}$/);
});

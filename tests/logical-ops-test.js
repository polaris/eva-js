const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(["or", true, true]), true);
  assert.strictEqual(eva.eval(["or", true, false]), true);
  assert.strictEqual(eva.eval(["or", false, true]), true);
  assert.strictEqual(eva.eval(["or", false, false]), false);

  assert.strictEqual(eva.eval(["and", true, true]), true);
  assert.strictEqual(eva.eval(["and", true, false]), false);
  assert.strictEqual(eva.eval(["and", false, true]), false);
  assert.strictEqual(eva.eval(["and", false, false]), false);

  assert.strictEqual(eva.eval(["not", true]), false);
  assert.strictEqual(eva.eval(["not", false]), true);
};

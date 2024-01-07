const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(["+", 1, 5]), 6);
  assert.strictEqual(eva.eval(["+", ["+", 3, 2], 5]), 10);
  assert.strictEqual(eva.eval(["-", 1, 5]), -4);
  assert.strictEqual(eva.eval(["+", ["*", 3, 2], 5]), 11);
  assert.strictEqual(eva.eval(["/", 20, 5]), 4);
  assert.strictEqual(eva.eval(["mod", 21, 5]), 1);
};

const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva._isNumber(123), true);
  assert.strictEqual(eva._isNumber(true), false);
};

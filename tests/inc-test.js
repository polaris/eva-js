const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(
    ["begin",
      ["var", "result", 0],
      ["++", "result"],
      "result",
    ]),
    1
  );

  assert.strictEqual(eva.eval(
    ["begin",
      ["var", "result", 122],
      ["++", "result"],
      "result",
    ]),
    123
  );
};

const test = require("./test-util");

module.exports = (eva) => {
  test(
    eva,
    `
    (import Math)
    ((prop Math abs) (- 10))
    `,
    10
  );

  test(
    eva,
    `
    (var abs (prop Math abs))
    (abs (- 10))
    `,
    10
  );

  test(
    eva,
    `
    (prop Math MAX_VALUE)
    `,
    1000
  );

  test(
    eva,
    `
    (import (abs MAX_VALUE) Math)
    (* (prop Math MAX_VALUE) ((prop Math abs) (- 10)))
    `,
    10000
  );
};

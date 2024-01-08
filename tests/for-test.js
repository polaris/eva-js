const test = require("./test-util");

module.exports = (eva) => {
  test(
    eva,
    `
    (begin
      (var cnt 0)
      (for (var x 10)
           (> x 0)
           (-- x)
           (++ cnt))
      cnt)
  `,
    10
  );
};

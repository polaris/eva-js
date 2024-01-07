const Eva = require("../Eva");
const Environment = require("../Environment");

const tests = [
  require("./built-in-function-test"),
  require("./user-defined-function-test"),
  require("./self-eval-test"),
  require("./math-test"),
  require("./comparison-test"),
  require("./inc-test"),
  require("./dec-test"),
  require("./logical-ops-test"),
  require("./variables-test"),
  require("./block-test"),
  require("./if-test"),
  require("./while-test"),
  require("./lambda-function-test"),
];

const eva = new Eva();

tests.forEach((test) => test(eva));

eva.eval(["print", '"Hello,"', '"World!"']);

console.log("All assertions passed!");

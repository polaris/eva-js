const Eva = require("../Eva");
const Environment = require("../Environment");

const tests = [
  require("./block-test"),
  require("./built-in-function-test"),
  require("./comparison-test"),
  require("./dec-test"),
  require("./if-test"),
  require("./inc-test"),
  require("./lambda-function-test"),
  require("./logical-ops-test"),
  require("./math-test"),
  require("./self-eval-test"),
  require("./user-defined-function-test"),
  require("./variables-test"),
  require("./while-test"),
];

const eva = new Eva();

tests.forEach((test) => test(eva));

eva.eval(["print", '"Hello,"', '"World!"']);

console.log("All assertions passed!");

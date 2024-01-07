const Environment = require("./Environment");

class Eva {
  constructor(global = GlobalEnvironment) {
    this.global = global;
  }

  eval(exp, env = this.global) {
    if (this._isBoolean(exp)) {
      return exp;
    }

    if (this._isNumber(exp)) {
      return exp;
    }

    if (this._isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === "++") {
      const [_, name] = exp;
      return env.assign(name, env.lookup(name) + 1);
    }

    if (exp[0] === "--") {
      const [_, name] = exp;
      return env.assign(name, env.lookup(name) - 1);
    }

    if (exp[0] === "or") {
      return this.eval(exp[1], env) || this.eval(exp[2], env);
    }

    if (exp[0] === "and") {
      return this.eval(exp[1], env) && this.eval(exp[2], env);
    }

    if (exp[0] === "not") {
      return !this.eval(exp[1], env);
    }

    if (exp[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    if (this._isVariableName(exp)) {
      return env.lookup(exp);
    }

    if (exp[0] === "if") {
      const [_tag, condition, consequent, alternate] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      } else {
        return this.eval(alternate, env);
      }
    }

    if (exp[0] === "while") {
      const [_tag, condition, innerExp] = exp;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(innerExp, env);
      }
      return result;
    }

    if (exp[0] === "def") {
      const [_tag, name, params, body] = exp;
      const fn = {
        params,
        body,
        env,
      };
      return env.define(name, fn);
    }

    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);
      const args = exp.slice(1).map((arg) => this.eval(arg, env));
      if (typeof fn === "function") {
        return fn(...args);
      }

      const activationRecord = {};
      fn.params.forEach((param, index) => {
        activationRecord[param] = args[index];
      });
      const activationEnv = new Environment(activationRecord, fn.env);
      return this._evalBody(fn.body, activationEnv);
    }

    throw new EvalError(`Unimplemented: ${JSON.stringify(exp)}`);
  }

  _isBoolean(exp) {
    return typeof exp === "boolean";
  }

  _isNumber(exp) {
    return typeof exp === "number";
  }

  _isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
  }

  _isVariableName(exp) {
    return typeof exp === "string" && /^[+\-*/<>=a-zA-Z0-9_]+$/.test(exp);
  }

  _evalBlock(block, env) {
    let result;
    const [_tag, ...expressions] = block;
    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });
    return result;
  }

  _evalBody(body, env) {
    if (body[0] === "begin") {
      return this._evalBlock(body, env);
    }
    return this.eval(body, env);
  }
}

const GlobalEnvironment = new Environment({
  null: null,

  true: true,
  false: false,

  VERSION: "0.1",

  "+"(op1, op2) {
    return op1 + op2;
  },
  "-"(op1, op2) {
    return op1 - op2;
  },
  "*"(op1, op2) {
    return op1 * op2;
  },
  "/"(op1, op2) {
    return op1 / op2;
  },
  "<"(op1, op2) {
    return op1 < op2;
  },
  "<="(op1, op2) {
    return op1 <= op2;
  },
  ">"(op1, op2) {
    return op1 > op2;
  },
  ">="(op1, op2) {
    return op1 >= op2;
  },
  "="(op1, op2) {
    return op1 === op2;
  },
  mod(op1, op2) {
    return op1 % op2;
  },
  print(...args) {
    console.log(...args);
  },
});

module.exports = Eva;

class Environment {
  constructor(record = {}, parent = null) {
    this.record = record;
    this.parent = parent;
  }

  define(name, value) {
    this.record[name] = value;
    return value;
  }

  lookup(name) {
    return this.resolve(name).record[name];
  }

  assign(name, value) {
    this.resolve(name).record[name] = value;
    return value;
  }

  resolve(name) {
    if (name in this.record) {
      return this;
    }
    if (this.parent === null) {
      throw new ReferenceError(`Variable "${name}" is not defined.`);
    }
    return this.parent.resolve(name);
  }
}

module.exports = Environment;

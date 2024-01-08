class Transformer {
  transformDefToVarLambda(defExp) {
    const [_tag, name, params, body] = defExp;
    return ["var", name, ["lambda", params, body]];
  }

  transformSwitchToIf(switchExp) {
    const [_tag, ...cases] = switchExp;
    const ifExp = ["if", null, null, null];
    let current = ifExp;
    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCond, currentBlock] = cases[i];
      current[1] = currentCond;
      current[2] = currentBlock;
      const [nextCond, nextBlock] = cases[i + 1];
      current[3] = nextCond === "else" ? nextBlock : ["if", null, null, null];
      current = current[3];
    }
    return ifExp;
  }
}

module.exports = Transformer;

// src/lib/icu/parser.ts
var ICUParser = class {
  pos = 0;
  input = "";
  errors = [];
  parse(input) {
    this.pos = 0;
    this.input = input;
    this.errors = [];
    const nodes = this.parseMessage();
    return { nodes, errors: this.errors };
  }
  parseMessage() {
    const nodes = [];
    let literal = "";
    while (this.pos < this.input.length) {
      const ch = this.input[this.pos];
      if (ch === "{") {
        if (literal) {
          nodes.push({ type: "literal", value: literal });
          literal = "";
        }
        this.pos++;
        const argNode = this.parseArgument();
        if (argNode) nodes.push(argNode);
      } else if (ch === "'") {
        this.pos++;
        const escaped = this.parseEscaped();
        literal += escaped;
      } else {
        literal += ch;
        this.pos++;
      }
    }
    if (literal) {
      nodes.push({ type: "literal", value: literal });
    }
    return nodes;
  }
  parseEscaped() {
    if (this.pos < this.input.length && this.input[this.pos] === "'") {
      this.pos++;
      return "'";
    }
    let result = "";
    while (this.pos < this.input.length && this.input[this.pos] !== "'") {
      result += this.input[this.pos];
      this.pos++;
    }
    if (this.pos >= this.input.length) {
      return "'" + result;
    }
    if (this.pos < this.input.length) this.pos++;
    return result;
  }
  parseArgument() {
    this.skipWhitespace();
    const name = this.parseIdentifier();
    if (!name) {
      this.errors.push({ message: "Expected argument name", position: this.pos });
      return null;
    }
    this.skipWhitespace();
    if (this.peek() === "}") {
      this.pos++;
      return { type: "argument", name };
    }
    if (this.peek() === ",") {
      this.pos++;
      this.skipWhitespace();
      return this.parseFormat(name);
    }
    this.errors.push({ message: `Unexpected character: ${this.peek()}`, position: this.pos });
    return null;
  }
  parseFormat(name) {
    const formatType = this.parseIdentifier();
    if (!formatType) {
      this.errors.push({ message: "Expected format type", position: this.pos });
      return null;
    }
    this.skipWhitespace();
    if (this.peek() === ",") {
      this.pos++;
    }
    this.skipWhitespace();
    switch (formatType) {
      case "plural":
        return this.parsePlural(name);
      case "select":
        return this.parseSelect(name);
      case "selectOrdinal":
        return this.parseSelectOrdinal(name);
      case "number":
        return this.parseNumber(name);
      case "date":
        return this.parseDate(name);
      case "time":
        return this.parseTime(name);
      default:
        this.errors.push({ message: `Unknown format type: ${formatType}`, position: this.pos });
        return null;
    }
  }
  parsePlural(name) {
    let offset = 0;
    const clauses = [];
    this.skipWhitespace();
    if (this.match("offset:")) {
      this.skipWhitespace();
      const offsetStr = this.parseNumberLiteral();
      offset = parseInt(offsetStr, 10) || 0;
      this.skipWhitespace();
    }
    while (this.pos < this.input.length && this.peek() !== "}") {
      const selector = this.parseSelector();
      if (!selector) break;
      this.skipWhitespace();
      if (this.peek() !== "{") {
        this.errors.push({ message: "Expected '{' after selector", position: this.pos });
        break;
      }
      this.pos++;
      const content = this.parseClauseContent();
      if (this.peek() === "}") this.pos++;
      clauses.push({ selector, content });
      this.skipWhitespace();
    }
    if (this.peek() === "}") this.pos++;
    return { type: "plural", name, offset, clauses };
  }
  parseSelect(name) {
    return this.parseSelectLike(name, "select");
  }
  parseSelectOrdinal(name) {
    return this.parseSelectLike(name, "selectOrdinal");
  }
  parseSelectLike(name, kind) {
    const clauses = [];
    while (this.pos < this.input.length && this.peek() !== "}") {
      const selector = this.parseSelector();
      if (!selector) break;
      this.skipWhitespace();
      if (this.peek() !== "{") {
        this.errors.push({ message: "Expected '{' after selector", position: this.pos });
        break;
      }
      this.pos++;
      const content = this.parseClauseContent();
      if (this.peek() === "}") this.pos++;
      clauses.push({ selector, content });
      this.skipWhitespace();
    }
    if (this.peek() === "}") this.pos++;
    return { type: kind === "selectOrdinal" ? "selectOrdinal" : "select", name, clauses };
  }
  parseNumber(name) {
    this.skipWhitespace();
    let format;
    if (this.peek() !== "}") {
      format = this.parseIdentifier();
    }
    this.skipWhitespace();
    if (this.peek() === "}") this.pos++;
    return { type: "number", name, format };
  }
  parseDate(name) {
    this.skipWhitespace();
    let format;
    if (this.peek() !== "}") {
      format = this.parseIdentifier();
    }
    this.skipWhitespace();
    if (this.peek() === "}") this.pos++;
    return { type: "date", name, format };
  }
  parseTime(name) {
    this.skipWhitespace();
    let format;
    if (this.peek() !== "}") {
      format = this.parseIdentifier();
    }
    this.skipWhitespace();
    if (this.peek() === "}") this.pos++;
    return { type: "time", name, format };
  }
  parseClauseContent() {
    const nodes = [];
    let literal = "";
    while (this.pos < this.input.length) {
      const ch = this.input[this.pos];
      if (ch === "'") {
        this.pos++;
        literal += this.parseEscaped();
      } else if (ch === "#") {
        if (literal) {
          nodes.push({ type: "literal", value: literal });
          literal = "";
        }
        this.pos++;
        nodes.push({ type: "argument", name: "#" });
      } else if (ch === "{") {
        if (literal) {
          nodes.push({ type: "literal", value: literal });
          literal = "";
        }
        this.pos++;
        const arg = this.parseArgumentInner();
        if (arg) nodes.push(arg);
      } else if (ch === "}") {
        break;
      } else {
        literal += ch;
        this.pos++;
      }
    }
    if (literal) {
      nodes.push({ type: "literal", value: literal });
    }
    return nodes;
  }
  parseArgumentInner() {
    this.skipWhitespace();
    if (this.peek() === "#") {
      this.pos++;
      if (this.peek() === "}") this.pos++;
      return { type: "argument", name: "#" };
    }
    const name = this.parseIdentifier();
    if (!name) return null;
    this.skipWhitespace();
    if (this.peek() === "}") {
      this.pos++;
      return { type: "argument", name };
    }
    if (this.peek() === ",") {
      this.pos++;
      this.skipWhitespace();
      return this.parseFormat(name);
    }
    return { type: "argument", name };
  }
  parseSelector() {
    this.skipWhitespace();
    if (this.peek() === "=") {
      this.pos++;
      return "=" + this.parseNumberLiteral();
    }
    return this.parseIdentifier();
  }
  parseNumberLiteral() {
    let result = "";
    if (this.peek() === "-") {
      result += "-";
      this.pos++;
    }
    while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
      result += this.input[this.pos];
      this.pos++;
    }
    return result;
  }
  parseIdentifier() {
    let result = "";
    while (this.pos < this.input.length && /[a-zA-Z0-9_-]/.test(this.input[this.pos])) {
      result += this.input[this.pos];
      this.pos++;
    }
    return result;
  }
  peek() {
    return this.input[this.pos] ?? "";
  }
  skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
  match(s) {
    if (this.input.substring(this.pos, this.pos + s.length) === s) {
      this.pos += s.length;
      return true;
    }
    return false;
  }
};

export { ICUParser };
//# sourceMappingURL=parser.js.map
//# sourceMappingURL=parser.js.map
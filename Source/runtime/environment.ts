import { RuntimeVal } from "./values.ts";

export default class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeVal> = new Map();

  constructer(parentEnvironment?: Environment) {
    this.parent = parentEnvironment;
  }

  public declareVariable(name: string, value: RuntimeVal): RuntimeVal {
    if (this.variables.has(name)) {
      throw `Variable ${name} already declared`;
    }
    this.variables.set(name, value);
    return value;
  }

  public assignVariable(name: string, value: RuntimeVal): RuntimeVal {
    const env = this.resolveVariable(name);
    env.variables.set(name, value);
    return value;
  }

  public lookupVariable(name: string): RuntimeVal {
    const env = this.resolveVariable(name);
    return env.variables.get(name) as RuntimeVal;
  }

  public resolveVariable(name: string): Environment {
    if (this.variables.has(name)) {
      return this;
    }

    if (this.parent == undefined) {
      throw `Cannot resolve '${name}' as it does not exist.`;
    }

    return this.parent.resolveVariable(name);
  }
}

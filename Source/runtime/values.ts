// deno-lint-ignore-file no-explicit-any
export type ValueType = "null" | "number" | "boolean";

export interface RuntimeVal {
  type: ValueType;
  value: any;
}

export interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

export function createNull() {
  return { type: "null", value: null } as NullVal;
}


export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export function createNumber(n = 0) {
  return { type: "number", value: n } as NumberVal;
}


export interface BooleanVal extends RuntimeVal {
  type: "boolean";
  value: boolean;
}

export function createBoolean(n = true) {
  return { type: "boolean", value: n } as BooleanVal;
}

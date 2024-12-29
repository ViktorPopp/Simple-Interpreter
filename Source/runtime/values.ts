// deno-lint-ignore-file no-explicit-any
export type ValueType = "null" | "number";

export interface RuntimeVal {
    type: ValueType;
    value: any;
}

export interface NullVal extends RuntimeVal {
    type: "null";
    value: "null";
}

export interface NumberVal extends RuntimeVal {
    type: "number";
    value: number;
}

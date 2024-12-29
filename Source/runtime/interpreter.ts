import { NullVal, NumberVal, RuntimeVal } from "./values.ts";
import { BinaryExpr, NumericLiteral, Program, Stmt } from "../frontend/ast.ts";

function evaluateProgram(program: Program): RuntimeVal {
  let lastEvaluated: RuntimeVal = { type: "null", value: "null" } as NullVal;
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }
  return lastEvaluated;
}

function evaluateNumericBinaryExpr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string,
): NumberVal {
    let result: number;
    if (operator == "+") {
      result = lhs.value + rhs.value;
    } else if (operator == "-") {
      result = lhs.value - rhs.value;
    } else if (operator == "*") {
      result = lhs.value * rhs.value;
    } else if (operator == "/") {
      // TODO: Division by zero checks
      result = lhs.value / rhs.value;
    } else {
      result = lhs.value % rhs.value;
    }

  return { value: result, type: "number" };
}

function evaluateBinaryExpr(binop: BinaryExpr): RuntimeVal {
  const lhs = evaluate(binop.left);
  const rhs = evaluate(binop.right);

  // Only currently support numeric operations
  if (lhs.type == "number" && rhs.type == "number") {
    return evaluateNumericBinaryExpr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator,
    );
  }

  return { type: "null", value: "null" } as NullVal;
}

export function evaluate(astNode: Stmt): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: ((astNode as NumericLiteral).value),
        type: "number",
      } as NumberVal;

    case "NullLiteral":
      return { value: "null", type: "null" } as NullVal;

    case "BinaryExpr":
      return evaluateBinaryExpr(astNode as BinaryExpr);

    case "Program":
      return evaluateProgram(astNode as Program);

    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode,
      );
      Deno.exit(1);
  }
}

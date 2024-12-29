import { createNull, NumberVal, RuntimeVal } from "./values.ts";
import {
  BinaryExpr,
  Identifier,
  NumericLiteral,
  Program,
  Stmt,
} from "../frontend/ast.ts";
import Environment from "./environment.ts";

function evaluateProgram(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = createNull();
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
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

function evaluateBinaryExpr(binop: BinaryExpr, env: Environment): RuntimeVal {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);

  // Only currently support numeric operations
  if (lhs.type == "number" && rhs.type == "number") {
    return evaluateNumericBinaryExpr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator,
    );
  }

  return createNull();
}

function evaluateIdentifier(ident: Identifier, env: Environment): RuntimeVal {
  const value = env.lookupVariable(ident.symbol);
  if (!value) {
    console.error(`Identifier ${ident.symbol} not found in environment.`);
    Deno.exit(1);
  }
  return value;
}

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: ((astNode as NumericLiteral).value),
        type: "number",
      } as NumberVal;

    case "Identifier":
      return evaluateIdentifier(astNode as Identifier, env);

    case "BinaryExpr":
      return evaluateBinaryExpr(astNode as BinaryExpr, env);

    case "Program":
      return evaluateProgram(astNode as Program, env);

    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode,
      );
      Deno.exit(1);
  }
}

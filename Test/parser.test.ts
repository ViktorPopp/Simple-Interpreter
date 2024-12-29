import { assertEquals } from "@std/assert";
import Parser from "../Source/frontend/parser.ts";

Deno.test("Parser handles numeric literals", () => {
    const parser = new Parser();
    const ast = parser.produceAST("42");
    assertEquals(ast.body[0].kind, "NumericLiteral");
});

Deno.test("Parser handles binary expressions", () => {
    const parser = new Parser();
    const ast = parser.produceAST("1 + 2");
    assertEquals(ast.body[0].kind, "BinaryExpr");
});

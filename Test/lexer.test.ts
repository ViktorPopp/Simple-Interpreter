import { assertEquals } from "@std/assert";
import { tokenize, TokenType } from "../Source/frontend/lexer.ts";

// Lexer tests
Deno.test("Lexer tokenizes numbers", () => {
    const tokens = tokenize("123");
    assertEquals(tokens[0].type, TokenType.Number);
    assertEquals(tokens[0].value, "123");
});

Deno.test("Lexer tokenizes basic math", () => {
    const tokens = tokenize("1 + 2 * 3");
    assertEquals(tokens[0].type, TokenType.Number);
    assertEquals(tokens[1].type, TokenType.BinaryOperator); 
    assertEquals(tokens[3].type, TokenType.BinaryOperator);
});

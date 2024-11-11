import { tokenize } from "../Source/lexer.ts";

Deno.test("Lexer test", () => {
    const source = "let x = (4 * 3)";
    console.log(`Program to test: \"${source}\"`);
    for (const token of tokenize(source)) {
        console.log(token);
    }
})

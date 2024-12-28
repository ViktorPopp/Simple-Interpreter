import { tokenize } from "../Source/lexer.ts";

Deno.test("Lexer test", async () => {
    const source = await Deno.readTextFile("./Test/Sources/lexer_test.txt");;
    console.log(`Program to test: \"${source}\"`);
    for (const token of tokenize(source)) {
        console.log(token);
    }
})

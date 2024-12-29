import Parser from "./frontend/parser.ts";
import { evaluate } from "./runtime/interpreter.ts";

repl();

function repl() {
    const parser = new Parser();
    console.log("REPL v0.0.1-alpha-1");
    while (true) {
        const input = prompt("> ");

        if (!input) {
            console.log("Please enter a valid input");
            Deno.exit(1);
        }
        if (input.includes("exit")) {
            Deno.exit(0);
        }
        if (input.includes("cls") || input.includes("clear")) {
            console.clear();
            continue;
        }

        const program = parser.produceAST(input);
        console.log(program);
        const result = evaluate(program);
        console.log(result.value);
    }
}
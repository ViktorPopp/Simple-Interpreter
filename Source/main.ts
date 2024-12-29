import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { createBoolean, createNull, createNumber } from "./runtime/values.ts";

repl();

function repl() {
    const parser = new Parser();
    const env = new Environment();
    console.log("REPL v0.0.1-alpha-1");

    env.declareVariable("pi", createNumber(Math.PI));
    env.declareVariable("true", createBoolean(true));
    env.declareVariable("false", createBoolean(false));
    env.declareVariable("null", createNull());

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
        const result = evaluate(program, env);
        console.log(result);
    }
}

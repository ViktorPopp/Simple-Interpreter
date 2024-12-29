import { assertEquals } from "@std/assert";
import Environment from "../Source/runtime/environment.ts";
import { createNumber } from "../Source/runtime/values.ts";

Deno.test("Environment variable declaration", () => {
    const env = new Environment();
    const num = createNumber(42);
    env.declareVariable("x", num);
    assertEquals(env.lookupVariable("x"), num);
});

Deno.test("Environment variable assignment", () => {
    const env = new Environment();
    const num1 = createNumber(42);
    const num2 = createNumber(24);
    env.declareVariable("x", num1);
    env.assignVariable("x", num2);
    assertEquals(env.lookupVariable("x"), num2);
});

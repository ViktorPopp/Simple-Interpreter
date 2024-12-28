// import Parser from "../Source/frontend/parser.ts";
// import { assertEquals } from "@std/assert";

// Deno.test("Parser - Numeric Literal", () => {
//     const parser = new Parser();
//     const program = parser.produceAST("42");
//     assertEquals(program, {
//         kind: "Program",
//         body: [{
//             kind: "NumericLiteral",
//             value: 42,
//         }],
//     });
// });

// Deno.test("Parser - Identifier", () => {
//     const parser = new Parser();
//     const program = parser.produceAST("x");
//     assertEquals(program, {
//         kind: "Program",
//         body: [{
//             kind: "Identifier",
//             symbol: "x",
//         }],
//     });
// });

// Deno.test("Parser - Additive Expression", () => {
//     const parser = new Parser();
//     const program = parser.produceAST("1 + 2");
//     assertEquals(program, {
//         kind: "Program",
//         body: [{
//             kind: "BinaryExpr",
//             left: {
//                 kind: "NumericLiteral",
//                 value: 1,
//             },
//             right: {
//                 kind: "NumericLiteral",
//                 value: 2,
//             },
//             operator: "+",
//         }],
//     });
// });

// Deno.test("Parser - Multiplicative Expression", () => {
//     const parser = new Parser();
//     const program = parser.produceAST("3 * 4");
//     assertEquals(program, {
//         kind: "Program",
//         body: [{
//             kind: "BinaryExpr",
//             left: { kind: "NumericLiteral", value: 3 },
//             right: { kind: "NumericLiteral", value: 4 },
//             operator: "*",
//         }],
//     });
// });

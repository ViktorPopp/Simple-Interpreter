// deno-lint-ignore-file no-explicit-any

/*
 * Orders Of Prescidence:
 * AssignmentExpr --- NOT IMPLEMENTED!
 * MemberExpr --- NOT IMPLEMENTED!
 * FunctionCall --- NOT IMPLEMENTED!
 * LogicalExpr --- NOT IMPLEMENTED!
 * ComparisonExpr --- NOT IMPLEMENTED!
 * AdditiveExpr
 * MultiplicitaveExpr
 * UnaryExpr --- NOT IMPLEMENTED!
 * PrimaryExpr
 */

import {
  BinaryExpr,
  Expr,
  Identifier,
  NumericLiteral,
  Program,
  Stmt,
} from "./ast.ts";

import { Token, tokenize, TokenType } from "./lexer.ts";

export default class Parser {
  private tokens: Token[] = [];

  public produceAST(source: string): Program {
    this.tokens = tokenize(source);
    const program: Program = { kind: "Program", body: [] };

    while (this.notEOF()) {
      program.body.push(this.parseStmt());
    }

    return program;
  }

  private at() {
    return this.tokens[0] as Token;
  }

  private eat() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, "\nExpecting: ", type);
      Deno.exit(1);
    }
    return prev;
  }

  private notEOF(): boolean {
    return this.tokens[0].type != TokenType.EndOfFile;
  }

  private parseStmt(): Stmt {
    return this.parseExpr();
  }

  private parseExpr(): Expr {
    return this.parseAdditiveExpr();
  }

  private parseAdditiveExpr(): Expr {
    let left = this.parseMultiplicitaveExpr();

    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parseMultiplicitaveExpr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  private parseMultiplicitaveExpr(): Expr {
    let left = this.parsePrimraryExpr();

    while (
      this.at().value == "/" || this.at().value == "*" || this.at().value == "%"
    ) {
      const operator = this.eat().value;
      const right = this.parsePrimraryExpr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  private parsePrimraryExpr(): Expr {
    const tk = this.at().type;

    switch (tk) {
      // case TokenType.Let:
      // case TokenType.BinaryOperator:
      // case TokenType.Equals:
      // case TokenType.CloseParen:
      // case TokenType.EndOfFile:
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;

      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value),
        } as NumericLiteral;

      case TokenType.OpenParen: {
        this.eat();
        const value = this.parseExpr();
        this.expect(
          TokenType.CloseParen,
          "Unexpected token found inside parenthesised expression. Expected closing parenthesis.",
        );
        return value;
      }

      default:
        console.error("Unexpected token found during parsing: ", this.at());
        Deno.exit(1);
    }
  }
}

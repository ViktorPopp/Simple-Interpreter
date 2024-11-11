export enum TokenType {
	// Literal Types
	Number,
	Identifier,

	// Keywords
	Let,

	// Grouping * Operators
	BinaryOperator,
	Equals,
	OpenParen,
	CloseParen,
}

const KEYWORDS: Record<string, TokenType> = {
	"let": TokenType.Let,
};

function token(value = "", type: TokenType): Token {
	return { value, type };
}

export interface Token {
	value: string;
	type: TokenType;
}

function isAlphabetic(source: string) {
	return source.toUpperCase() != source.toLowerCase();
}

function isInteger(str: string) {
    const c = str.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
	return c >= bounds[0] && c <= bounds[1];
}

function isSkippable(str: string) {
	return str == " " || str == "\n" || str == "\t";
}

export function tokenize(sourceCode: string): Token[] {
	const tokens = new Array<Token>();
	const src = sourceCode.split("");

	while (src.length > 0) {
		// Single character tokens
		if (src[0] == "(")
			tokens.push(token(src.shift(), TokenType.OpenParen));
		else if (src[0] == ")")
			tokens.push(token(src.shift(), TokenType.CloseParen));
		else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/")
			tokens.push(token(src.shift(), TokenType.BinaryOperator));
		else if (src[0] == "=")
			tokens.push(token(src.shift(), TokenType.Equals));
        // Multi character tokens
		else {
            if (isInteger(src[0])) {
				let num = "";
				while (src.length > 0 && isInteger(src[0]))
					num += src.shift();
				tokens.push(token(num, TokenType.Number));
			}
            else if(isAlphabetic(src[0])) {
                let ident = "";
				while (src.length > 0 && isAlphabetic(src[0]))
					ident += src.shift();

				const reserved = KEYWORDS[ident];
				if (reserved == undefined)
					tokens.push(token(ident, TokenType.Identifier));
				else
					tokens.push(token(ident, reserved));
            }
			else if (isSkippable(src[0])) {
				src.shift();
			}
			else {
				console.log(`ERROR: Invalid character: ${src[0]}`);
				Deno.exit(1);
			}
		}
	}

	return tokens;
}

# My Little Interpreter
A simple interpreter written in TypeScript/Deno that supports basic arithmetic expressions and variables.

## Features
- Basic arithmetic operations (+, -, *, /, %)
- Numeric literals and variables 
- Built-in constants (pi, true, false, null)
- REPL environment for interactive execution
- Parenthesized expressions

## Dependencies
| Name | Version | Usage |
|------|---------|-------|
| Deno | <= 2.0  | Runtime environment and test runner |

## Installation
1. Install [Deno](https://deno.com/manual@v1.41.1/getting_started/installation)
2. Clone this repository
3. Run setup script:
```sh
# Unix/Linux/macOS
./scripts/setup.sh

# Windows
scripts\setup.cmd
```

## Usage
### REPL Mode
Start the interactive REPL:
```sh
deno run -A Source/main.ts
```
Example session:
```sh
REPL v0.0.1-alpha-1
> 2 + 3 * 4
14
> pi
3.141592653589793
> (4 + 5) * 2
18
```

### Commands
* `exit` - Exit the REPL
* `clear` or `cls` - Clear the screen

## Development
### Running tests
```sh
deno test -A
```

### Running Linter
```sh
deno lint
```

### Project Structure
* :file_folder: `scripts` - Utility scripts
* :open_file_folder: `Source` - Source code
    * :file_folder: `frontend/` - Lexer, parser and AST definitions
    * :file_folder: `runtime/` - Interpreter and runtime environment
* :file_folder: `Test` - Test files and test utilities

## License
MIT License

## Contributing
See [CONTRIBUTING.md](https://github.com/ViktorPopp/Simple-Interpreter/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/ViktorPopp/Simple-Interpreter/blob/main/CODE_OF_CONDUCT.md) for details on how to contribute to this project.

## Security
For security issues, please refer to [SECURITY.md](https://github.com/ViktorPopp/Simple-Interpreter/blob/main/SECURITY.md).

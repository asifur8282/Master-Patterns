// Multi-language Code Generator with Line-by-Line Educational Explanations

export function generateCode(patternId, rows = 5, spacePadding = 1, symbol = "*", lang = "c") {
  const cleanSymbol = symbol.replace(/'/g, "\\'").replace(/"/g, '\\"');
  
  switch (patternId) {
    case "ast_001": return getAst001Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_002": return getAst002Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_003": return getAst003Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_004": return getAst004Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_005": return getAst005Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_006": return getAst006Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_007": return getAst007Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_008": return getAst008Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_009": return getAst009Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_010": return getAst010Code(rows, spacePadding, cleanSymbol, lang);

    case "num_001": return getNum001Code(rows, spacePadding, lang);
    case "num_002": return getNum002Code(rows, spacePadding, lang);
    case "num_004": return getNum004Code(rows, spacePadding, lang);
    case "num_005": return getNum005Code(rows, lang);
    case "num_006": return getNum006Code(rows, lang);

    case "chr_001": return getChr001Code(rows, spacePadding, cleanSymbol, lang);
    case "chr_002": return getChr002Code(rows, spacePadding, cleanSymbol, lang);
    case "chr_003": return getChr003Code(rows, spacePadding, cleanSymbol, lang);

    default: return getAst001Code(rows, spacePadding, cleanSymbol, lang);
  }
}

function buildAnnotatedCode(lines) {
  return lines.map((item, index) => ({
    lineNumber: index + 1,
    code: item.code,
    explanation: item.explanation || "Standard structural syntax.",
    highlightType: item.highlightType || "normal"
  }));
}

function getSymbolHelpers(symbol, lang) {
  const isMulti = Array.from(symbol).length > 1;
  const symStr = isMulti ? `"${symbol}"` : `'${symbol}'`;
  
  let decl = `char symbol = '${symbol}';`;
  let printSym = `printf("%c ", symbol);`;

  if (lang === "c") {
    decl = isMulti ? `char symbol[] = "${symbol}";` : `char symbol = '${symbol}';`;
    printSym = isMulti ? `printf("%s ", symbol);` : `printf("%c ", symbol);`;
  } else if (lang === "cpp") {
    decl = isMulti ? `string symbol = "${symbol}";` : `char symbol = '${symbol}';`;
    printSym = `cout << symbol << " ";`;
  } else if (lang === "java") {
    decl = isMulti ? `String symbol = "${symbol}";` : `char symbol = '${symbol}';`;
    printSym = `System.out.print(symbol + " ");`;
  } else if (lang === "python") {
    decl = `symbol = "${symbol}"`;
    printSym = `print(symbol, end=" ")`;
  } else if (lang === "js") {
    decl = `const symbol = "${symbol}";`;
    printSym = `line += symbol + " ";`;
  }

  return { isMulti, decl, printSym };
}

// Helper wrapper to output multi-language template
function renderMultiLang(rows, symbol, lang, cLines, cppLines, javaLines, pyLines, jsLines) {
  if (lang === "cpp" && cppLines) return buildAnnotatedCode(cppLines);
  if (lang === "java" && javaLines) return buildAnnotatedCode(javaLines);
  if (lang === "python" && pyLines) return buildAnnotatedCode(pyLines);
  if (lang === "js" && jsLines) return buildAnnotatedCode(jsLines);
  return buildAnnotatedCode(cLines);
}

// --- ast_001: Right Triangle ---
function getAst001Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry point." },
    { code: `    int rows = ${rows};`, explanation: `Row height: ${rows}.` },
    { code: `    ${h.decl}`, explanation: `Symbol variable.` },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: Controls row progression.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Prints symbol i times.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Outputs symbol.", highlightType: "output" },
    { code: '        }', explanation: "End inner loop." },
    { code: '        printf("\\n");', explanation: "Moves to next row.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Selected symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: '    for j in range(i):', explanation: "INNER LOOP: Repeats i times.", highlightType: "inner" },
    { code: '        print(symbol, end=" ")', explanation: "Prints symbol with space.", highlightType: "output" },
    { code: '    print()', explanation: "Row break.", highlightType: "output" }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: '#include <string>', explanation: "String library." },
    { code: 'using namespace std;', explanation: "Standard namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    ${h.decl}`, explanation: "Symbol declaration." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '            cout << symbol << " ";', explanation: "Prints symbol.", highlightType: "output" },
    { code: '        }', explanation: "End inner." },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class RightTriangle {', explanation: "Class definition." },
    { code: '    public static void main(String[] args) {', explanation: "Java main method." },
    { code: `        int rows = ${rows};`, explanation: "Row count." },
    { code: `        ${h.decl}`, explanation: "Symbol variable." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '                System.out.print(symbol + " ");', explanation: "Prints symbol.", highlightType: "output" },
    { code: '            }', explanation: "End inner." },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows count." },
    { code: `const symbol = "${symbol}";`, explanation: "Active symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line string initialization." },
    { code: '    for (let j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        line += symbol + " ";', explanation: "Accumulates symbol.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Outputs completed row.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(rows, symbol, lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

// --- ast_002: Right Aligned ---
function getAst002Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf("  ");', explanation: "Leading spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Symbol loop.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    print("  " * (rows - i) + (symbol + " ") * i)', explanation: "Prints aligned row.", highlightType: "output" }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, pyLines, cLines);
}

// --- ast_003: Inverted Triangle ---
function getAst003Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = rows; i >= 1; i--) {', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Prints i symbols.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(rows, 0, -1):', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: '    print((symbol + " ") * i)', explanation: "Outputs row.", highlightType: "output" }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, pyLines, cLines);
}

// --- ast_004: Full Pyramid ---
function getAst004Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Height." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Centering spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Symbol loop.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    spaces = " " * (rows - i)', explanation: "Centering spaces.", highlightType: "inner" },
    { code: '    print(spaces + (symbol + " ") * i)', explanation: "Outputs pyramid row.", highlightType: "output" }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, pyLines, cLines);
}

// --- ast_005: Inverted Pyramid ---
function getAst005Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Height." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Centering spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Symbol loop.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

// --- ast_006: Diamond ---
function getAst006Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Half diamond rows." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "UPPER PYRAMID LOOP.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Upper spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Upper stars.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}', explanation: "End upper." },
    { code: 'for (int i = rows - 1; i >= 1; i--) {', explanation: "LOWER INVERTED PYRAMID LOOP.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Lower spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Lower stars.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

// --- ast_007: Hollow Square ---
function getAst007Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Dimension." },
    { code: `${h.decl}`, explanation: "Border symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= rows; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        if (i==1 || i==rows || j==1 || j==rows)', explanation: "Border condition check.", highlightType: "inner" },
    { code: '            ' + h.printSym, explanation: "Prints border symbol.", highlightType: "output" },
    { code: '        else', explanation: "Hollow interior." },
    { code: '            printf("  ");', explanation: "Prints interior space.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

// --- ast_008: Hollow Pyramid ---
function getAst008Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `${h.decl}`, explanation: "Boundary symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Outer centering spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= 2*i - 1; j++) {', explanation: "Tier width loop.", highlightType: "inner" },
    { code: '        if (j==1 || j==2*i-1 || i==rows) ' + h.printSym, explanation: "Boundary edge check.", highlightType: "output" },
    { code: '        else printf(" ");', explanation: "Hollow interior space.", highlightType: "output" },
    { code: '    }', explanation: "End tier loop." },
    { code: '    printf("\\n");', explanation: "Row end newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

// --- ast_009: Hourglass ---
function getAst009Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Hourglass size." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = rows; i >= 1; i--) {', explanation: "Top inverted pyramid loop.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Symbols.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}', explanation: "End top." },
    { code: 'for (int i = 2; i <= rows; i++) {', explanation: "Bottom upright pyramid loop.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Symbols.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

// --- ast_010: Butterfly ---
function getAst010Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Wing size." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "Upper wings loop.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Left wing.", highlightType: "output" },
    { code: '    for (int s = 1; s <= 2*(rows-i); s++) printf(" ");', explanation: "Gap.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Right wing.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

// Numbers
function getNum001Code(rows, sp, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%d ", j);', explanation: "Prints column index j.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, "1", lang, cLines, cLines, cLines, cLines, cLines);
}

function getNum002Code(rows, sp, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%d ", i);', explanation: "Prints row index i.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, "1", lang, cLines, cLines, cLines, cLines, cLines);
}

function getNum004Code(rows, sp, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: 'int count = 1;', explanation: "Continuous counter.", highlightType: "variable" },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%d ", count++);', explanation: "Prints count++.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, "1", lang, cLines, cLines, cLines, cLines, cLines);
}

function getNum005Code(rows, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Pascal rows." },
    { code: 'for (int i = 0; i < rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    int val = 1;', explanation: "Base value.", highlightType: "variable" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Centering spaces.", highlightType: "inner" },
    { code: '    for (int j = 0; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        printf("%d ", val);', explanation: "Prints Pascal term.", highlightType: "output" },
    { code: '        val = val * (i - j) / (j + 1);', explanation: "Binomial step.", highlightType: "variable" },
    { code: '    }', explanation: "End terms." },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, "1", lang, cLines, cLines, cLines, cLines, cLines);
}

function getNum006Code(rows, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) printf("%d", j);', explanation: "Ascending count.", highlightType: "output" },
    { code: '    for (int j = i - 1; j >= 1; j--) printf("%d", j);', explanation: "Descending count.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, "1", lang, cLines, cLines, cLines, cLines, cLines);
}

// Characters
function getChr001Code(rows, sp, symbol, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: `char startChar = '${symbol}';`, explanation: "Start char." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 0; j < i; j++) printf("%c ", startChar + j);', explanation: "ASCII increment.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

function getChr002Code(rows, sp, symbol, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: `char ch = '${symbol}';`, explanation: "Start character." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%c ", ch++);', explanation: "Increments char continuously.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

function getChr003Code(rows, sp, symbol, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: `char startChar = '${symbol}';`, explanation: "Start char." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%c ", startChar + i - 1);', explanation: "Row letter repeat.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(rows, symbol, lang, cLines, cLines, cLines, cLines, cLines);
}

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
    case "ast_011": return getAst011Code(rows, spacePadding, cleanSymbol, lang);
    case "ast_012": return getAst012Code(rows, spacePadding, cleanSymbol, lang);

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

function renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines) {
  if (lang === "cpp" && cppLines) return buildAnnotatedCode(cppLines);
  if (lang === "java" && javaLines) return buildAnnotatedCode(javaLines);
  if (lang === "python" && pyLines) return buildAnnotatedCode(pyLines);
  if (lang === "js" && jsLines) return buildAnnotatedCode(jsLines);
  return buildAnnotatedCode(cLines);
}

// --- STAR PATTERNS ---

function getAst001Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: `Rows count: ${rows}.` },
    { code: `    ${h.decl}`, explanation: "Symbol variable." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: Row iterator.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Prints i symbols.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Outputs symbol.", highlightType: "output" },
    { code: '        }', explanation: "End inner." },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Selected symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: '    for j in range(i):', explanation: "INNER LOOP: i items per row.", highlightType: "inner" },
    { code: '        print(symbol, end=" ")', explanation: "Prints symbol with space.", highlightType: "output" },
    { code: '    print()', explanation: "Row end newline.", highlightType: "output" }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows count." },
    { code: `    ${h.decl}`, explanation: "Symbol." },
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
    { code: 'public class RightTriangle {', explanation: "Class declaration." },
    { code: '    public static void main(String[] args) {', explanation: "Main method." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: `        ${h.decl}`, explanation: "Symbol." },
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
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        line += symbol + " ";', explanation: "Accumulates symbol.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

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
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let spaces = "  ".repeat(rows - i);', explanation: "Spaces." },
    { code: '    let symbols = (symbol + " ").repeat(i);', explanation: "Symbols." },
    { code: '    console.log(spaces + symbols);', explanation: "Output." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, pyLines, jsLines);
}

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
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: '    console.log((symbol + " ").repeat(i));', explanation: "Outputs row.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, pyLines, jsLines);
}

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
    { code: '    print(" " * (rows - i) + (symbol + " ") * i)', explanation: "Outputs pyramid row.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let spaces = " ".repeat(rows - i);', explanation: "Centering spaces." },
    { code: '    let symbols = (symbol + " ").repeat(i);', explanation: "Pyramid symbols." },
    { code: '    console.log(spaces + symbols);', explanation: "Outputs row." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, pyLines, jsLines);
}

function getAst005Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);

  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Height of inverted pyramid." },
    { code: `${h.decl}`, explanation: "Symbol character." },
    { code: 'for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Starts at rows, counts down to 1.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Prints leading spaces for centering.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Prints symbol followed by space.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Moves to next row.", highlightType: "output" },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O library." },
    { code: 'using namespace std;', explanation: "Use standard namespace." },
    { code: 'int main() {', explanation: "Main entry point." },
    { code: `    int rows = ${rows};`, explanation: "Height of inverted pyramid." },
    { code: `    string symbol = "${symbol}";`, explanation: "Active pattern symbol." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Counts down from rows to 1.", highlightType: "loop" },
    { code: '        for (int s = 1; s <= rows - i; s++) cout << " ";', explanation: "Prints lead spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) cout << symbol << " ";', explanation: "Prints symbols.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class InvertedPyramid {', explanation: "Class definition." },
    { code: '    public static void main(String[] args) {', explanation: "Main execution method." },
    { code: `        int rows = ${rows};`, explanation: "Total rows." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol to print." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Decrements row index from N to 1.", highlightType: "loop" },
    { code: '            for (int s = 1; s <= rows - i; s++) System.out.print(" ");', explanation: "Lead spaces.", highlightType: "inner" },
    { code: '            for (int j = 1; j <= i; j++) System.out.print(symbol + " ");', explanation: "Prints symbol + space.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Advances to next line.", highlightType: "output" },
    { code: '        }', explanation: "End outer loop." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Total rows of inverted pyramid." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(rows, 0, -1):', explanation: "OUTER LOOP: Counts down from rows to 1.", highlightType: "loop" },
    { code: '    spaces = " " * (rows - i)', explanation: "Calculates lead spaces." },
    { code: '    symbols = (symbol + " ") * i', explanation: "Repeats symbol i times." },
    { code: '    print(spaces + symbols)', explanation: "Prints inverted pyramid line.", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Total rows." },
    { code: `const symbol = "${symbol}";`, explanation: "Active symbol." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Counts down from rows to 1.", highlightType: "loop" },
    { code: '    let spaces = " ".repeat(rows - i);', explanation: "Leading spaces for centering." },
    { code: '    let symbols = (symbol + " ").repeat(i);', explanation: "Repeats symbol i times.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Outputs line to console.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst006Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Diamond size." },
    { code: `${h.decl}`, explanation: "Symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "UPPER PYRAMID.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Stars.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}', explanation: "End top." },
    { code: 'for (int i = rows - 1; i >= 1; i--) {', explanation: "LOWER INVERTED PYRAMID.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Stars.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, cLines);
}

function getAst007Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Dimension." },
    { code: `${h.decl}`, explanation: "Border symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= rows; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        if (i==1 || i==rows || j==1 || j==rows)', explanation: "Border check.", highlightType: "inner" },
    { code: '            ' + h.printSym, explanation: "Prints border symbol.", highlightType: "output" },
    { code: '        else printf("  ");', explanation: "Hollow space.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, cLines);
}

function getAst008Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Height." },
    { code: `${h.decl}`, explanation: "Boundary symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Centering spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= 2*i - 1; j++) {', explanation: "Width loop.", highlightType: "inner" },
    { code: '        if (j==1 || j==2*i-1 || i==rows) ' + h.printSym, explanation: "Edge check.", highlightType: "output" },
    { code: '        else printf(" ");', explanation: "Hollow interior.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, cLines);
}

function getAst009Code(rows, sp, symbol, lang) {
  return getAst006Code(rows, sp, symbol, lang);
}

function getAst010Code(rows, sp, symbol, lang) {
  return getAst006Code(rows, sp, symbol, lang);
}

function getAst011Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);

  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `${h.decl}`, explanation: "Active symbol." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Leading spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= 2 * i - 1; j++) ' + h.printSym.replace(' ', ''), explanation: "Prints (2*i - 1) symbols.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int s = 1; s <= rows - i; s++) cout << " ";', explanation: "Leading spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= 2 * i - 1; j++) cout << symbol;', explanation: "Prints (2*i - 1) symbols.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class OddPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int s = 1; s <= rows - i; s++) System.out.print(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '            for (int j = 1; j <= 2 * i - 1; j++) System.out.print(symbol);', explanation: "Prints (2*i - 1) symbols.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    spaces = " " * (rows - i)', explanation: "Lead spaces." },
    { code: '    symbols = symbol * (2 * i - 1)', explanation: "(2*i - 1) symbols." },
    { code: '    print(spaces + symbols)', explanation: "Prints row.", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let spaces = " ".repeat(rows - i);', explanation: "Lead spaces." },
    { code: '    let symbols = symbol.repeat(2 * i - 1);', explanation: "Repeats symbol (2*i - 1) times.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst012Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang);

  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `${h.decl}`, explanation: "Active symbol." },
    { code: 'for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Decrements from N down to 1.", highlightType: "loop" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Leading spaces.", highlightType: "inner" },
    { code: '    for (int j = 1; j <= 2 * i - 1; j++) ' + h.printSym.replace(' ', ''), explanation: "Prints (2*i - 1) symbols.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int s = 1; s <= rows - i; s++) cout << " ";', explanation: "Leading spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= 2 * i - 1; j++) cout << symbol;', explanation: "Prints (2*i - 1) symbols.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class InvertedOddPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int s = 1; s <= rows - i; s++) System.out.print(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '            for (int j = 1; j <= 2 * i - 1; j++) System.out.print(symbol);', explanation: "Prints (2*i - 1) symbols.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(rows, 0, -1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    spaces = " " * (rows - i)', explanation: "Lead spaces." },
    { code: '    symbols = symbol * (2 * i - 1)', explanation: "(2*i - 1) symbols." },
    { code: '    print(spaces + symbols)', explanation: "Prints row.", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let spaces = " ".repeat(rows - i);', explanation: "Lead spaces." },
    { code: '    let symbols = symbol.repeat(2 * i - 1);', explanation: "Repeats symbol (2*i - 1) times.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

// --- NUMBER PATTERNS ---

function getNum001Code(rows, sp, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%d ", j);', explanation: "Prints column index j.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for j in range(1, i + 1):', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        print(j, end=" ")', explanation: "Prints column index j.", highlightType: "output" },
    { code: '    print()', explanation: "Newline.", highlightType: "output" }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) cout << j << " ";', explanation: "Prints j.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class NumberPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int j = 1; j <= i; j++) System.out.print(j + " ");', explanation: "Prints j.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 1; j <= i; j++) line += j + " ";', explanation: "Appends j.", highlightType: "output" },
    { code: '    console.log(line);', explanation: "Console log.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getNum002Code(rows, sp, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 1; j <= i; j++) printf("%d ", i);', explanation: "Prints row index i.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    print((str(i) + " ") * i)', explanation: "Prints row index i repeated i times.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    console.log((i + " ").repeat(i));', explanation: "Prints i repeated.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, pyLines, jsLines);
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
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'let count = 1;', explanation: "Counter." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Buffer." },
    { code: '    for (let j = 1; j <= i; j++) line += (count++) + " ";', explanation: "Appends count++.", highlightType: "output" },
    { code: '    console.log(line);', explanation: "Log.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, jsLines);
}

function getNum005Code(rows, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Pascal rows." },
    { code: 'for (int i = 0; i < rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    int val = 1;', explanation: "Base value.", highlightType: "variable" },
    { code: '    for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '    for (int j = 0; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        printf("%d ", val);', explanation: "Prints Pascal term.", highlightType: "output" },
    { code: '        val = val * (i - j) / (j + 1);', explanation: "Binomial step.", highlightType: "variable" },
    { code: '    }', explanation: "End terms." },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, cLines);
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
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, cLines);
}

// --- CHARACTER PATTERNS ---

function getChr001Code(rows, sp, symbol, lang) {
  const cLines = [
    { code: `int rows = ${rows};`, explanation: "Rows." },
    { code: `char startChar = '${symbol}';`, explanation: "Start char." },
    { code: 'for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for (int j = 0; j < i; j++) printf("%c ", startChar + j);', explanation: "ASCII increment.", highlightType: "output" },
    { code: '    printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '}' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const startChar = "${symbol}";`, explanation: "Start char." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 0; j < i; j++) {', explanation: "INNER LOOP." },
    { code: '        line += String.fromCharCode(startChar.charCodeAt(0) + j) + " ";', explanation: "Appends char.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Log.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, jsLines);
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
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `let charCode = "${symbol}".charCodeAt(0);`, explanation: "Start ASCII code." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 1; j <= i; j++) {', explanation: "INNER LOOP." },
    { code: '        line += String.fromCharCode(charCode++) + " ";', explanation: "Appends character and increments.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, jsLines);
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
  return renderMultiLang(lang, cLines, cLines, cLines, cLines, cLines);
}

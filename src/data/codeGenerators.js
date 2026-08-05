// Multi-language Code Generator with Line-by-Line Educational Explanations
// Every snippet includes full, runnable entry wrappers (#include <stdio.h>, #include <iostream>, public class, main)
// Bulletproof dynamic spacePadding support for both custom symbols and spacer gaps

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
    case "ast_013": return getAst013Code(rows, spacePadding, cleanSymbol, lang);

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

function getSymbolHelpers(symbol, lang, spacePadding = 1) {
  const isMulti = Array.from(symbol).length > 1;
  const symLen = Array.from(symbol).length;
  const spaces = " ".repeat(spacePadding);
  
  const unitWidth = symLen + spacePadding;
  const unitSpaces = " ".repeat(unitWidth);
  const halfUnitVal = Math.max(1, Math.floor(unitWidth / 2));
  const halfSpaces = " ".repeat(halfUnitVal);
  
  let decl = `char symbol = '${symbol}';`;
  let printSym = `printf("%c${spaces}", symbol);`;

  if (lang === "c") {
    decl = isMulti ? `char symbol[] = "${symbol}";` : `char symbol = '${symbol}';`;
    printSym = isMulti ? `printf("%s${spaces}", symbol);` : `printf("%c${spaces}", symbol);`;
  } else if (lang === "cpp") {
    decl = isMulti ? `string symbol = "${symbol}";` : `char symbol = '${symbol}';`;
    printSym = spacePadding > 0 ? `cout << symbol << "${spaces}";` : `cout << symbol;`;
  } else if (lang === "java") {
    decl = isMulti ? `String symbol = "${symbol}";` : `char symbol = '${symbol}';`;
    printSym = spacePadding > 0 ? `System.out.print(symbol + "${spaces}");` : `System.out.print(symbol);`;
  } else if (lang === "python") {
    decl = `symbol = "${symbol}"`;
    printSym = spacePadding > 0 ? `print(symbol + "${spaces}", end="")` : `print(symbol, end="")`;
  } else if (lang === "js") {
    decl = `const symbol = "${symbol}";`;
    printSym = `line += symbol + "${spaces}";`;
  }

  return { isMulti, decl, printSym, spaces, halfSpaces, unitSpaces, unitWidth, symLen };
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
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main execution entry." },
    { code: `    int rows = ${rows};`, explanation: `Height of triangle.` },
    { code: `    ${h.decl}`, explanation: "Symbol variable." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: Row iterator.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Prints i symbols.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Outputs symbol.", highlightType: "output" },
    { code: '        }', explanation: "End inner loop." },
    { code: '        printf("\\n");', explanation: "Moves to next line.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream header." },
    { code: 'using namespace std;', explanation: "Standard namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows count." },
    { code: `    ${h.decl}`, explanation: "Symbol declaration." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Prints symbol with dynamic padding.", highlightType: "output" },
    { code: '        }', explanation: "End inner." },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class RightTriangle {', explanation: "Class declaration." },
    { code: '    public static void main(String[] args) {', explanation: "Main method." },
    { code: `        int rows = ${rows};`, explanation: "Rows count." },
    { code: `        ${h.decl}`, explanation: "Symbol declaration." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `                ${h.printSym}`, explanation: "Prints symbol with padding.", highlightType: "output" },
    { code: '            }', explanation: "End inner." },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Selected symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: '    for j in range(i):', explanation: "INNER LOOP: i items per row.", highlightType: "inner" },
    { code: `        ${h.printSym}`, explanation: "Prints symbol with dynamic spaces.", highlightType: "output" },
    { code: '    print()', explanation: "Row end newline.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows count." },
    { code: `const symbol = "${symbol}";`, explanation: "Active symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 1; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `        ${h.printSym}`, explanation: "Accumulates symbol with spacing.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst002Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows count." },
    { code: `    ${h.decl}`, explanation: "Symbol variable." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.unitSpaces}");`, explanation: "Leading spaces offset aligned with symbol width.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Prints symbols.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream header." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.unitSpaces}";`, explanation: "Lead spaces matching unit width.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with padding.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class RightAlignedPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.unitSpaces}");`, explanation: "Lead spaces matching unit width.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with padding.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    print("${h.unitSpaces}" * (rows - i) + (symbol + "${h.spaces}") * i)`, explanation: "Prints aligned row with custom spacing.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    let spaces = "${h.unitSpaces}".repeat(rows - i);`, explanation: "Lead spaces." },
    { code: `    let symbols = (symbol + "${h.spaces}").repeat(i);`, explanation: "Symbols with dynamic spacing.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Output." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst003Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows count." },
    { code: `    ${h.decl}`, explanation: "Symbol declaration." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Prints i symbols.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream header." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with padding.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class InvertedRightTriangle {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with padding.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(rows, 0, -1):', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: `    print((symbol + "${h.spaces}") * i)`, explanation: "Outputs row with custom spacing.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "DECREMENTING LOOP.", highlightType: "loop" },
    { code: `    console.log((symbol + "${h.spaces}").repeat(i));`, explanation: "Outputs row with spacing.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst004Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Height." },
    { code: `    ${h.decl}`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Centering spaces scaled to half-unit width.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Symbol loop.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O header." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Height." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Lead centering spaces.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with padding.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class FullPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Height." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Spaces.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with padding.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    print("${h.halfSpaces}" * (rows - i) + (symbol + "${h.spaces}") * i)`, explanation: "Outputs pyramid row with padding.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    let spaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Centering spaces." },
    { code: `    let symbols = (symbol + "${h.spaces}").repeat(i);`, explanation: "Pyramid symbols with custom spacing.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Outputs row." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst005Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);

  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Height of inverted pyramid." },
    { code: `    ${h.decl}`, explanation: "Symbol character." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Starts at rows, counts down to 1.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Prints leading spaces for centering.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Prints symbol followed by space.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Moves to next row.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O library." },
    { code: 'using namespace std;', explanation: "Use standard namespace." },
    { code: 'int main() {', explanation: "Main entry point." },
    { code: `    int rows = ${rows};`, explanation: "Height of inverted pyramid." },
    { code: `    string symbol = "${symbol}";`, explanation: "Active pattern symbol." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Counts down from rows to 1.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Prints lead spaces.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbols with custom padding.", highlightType: "output" },
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
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Lead spaces.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Prints symbol + space.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Advances to next line.", highlightType: "output" },
    { code: '        }', explanation: "End outer loop." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Total rows of inverted pyramid." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(rows, 0, -1):', explanation: "OUTER LOOP: Counts down from rows to 1.", highlightType: "loop" },
    { code: `    spaces = "${h.halfSpaces}" * (rows - i)`, explanation: "Calculates lead spaces." },
    { code: `    symbols = (symbol + "${h.spaces}") * i`, explanation: "Repeats symbol with space.", highlightType: "output" },
    { code: '    print(spaces + symbols)', explanation: "Prints inverted pyramid line.", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Total rows." },
    { code: `const symbol = "${symbol}";`, explanation: "Active symbol." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Counts down from rows to 1.", highlightType: "loop" },
    { code: `    let spaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Leading spaces for centering." },
    { code: `    let symbols = (symbol + "${h.spaces}").repeat(i);`, explanation: "Repeats symbol i times with padding.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Outputs line to console.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst006Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Diamond size." },
    { code: `    ${h.decl}`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "UPPER PYRAMID.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Stars.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End top." },
    { code: '    for (int i = rows - 1; i >= 1; i--) {', explanation: "LOWER INVERTED PYRAMID.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Stars.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End bottom." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O header." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Diamond size." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "TOP PYRAMID.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Spaces.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Stars with padding.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End top." },
    { code: '    for (int i = rows - 1; i >= 1; i--) {', explanation: "BOTTOM INVERTED PYRAMID.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Spaces.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Stars with padding.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End bottom." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class DiamondPattern {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Diamond size." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "TOP PYRAMID.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Spaces.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Stars with padding.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End top." },
    { code: '        for (int i = rows - 1; i >= 1; i--) {', explanation: "BOTTOM PYRAMID.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Spaces.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Stars with padding.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End bottom." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Diamond size." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "TOP PYRAMID.", highlightType: "loop" },
    { code: `    print("${h.halfSpaces}" * (rows - i) + (symbol + "${h.spaces}") * i)`, explanation: "Top row with custom padding.", highlightType: "output" },
    { code: 'for i in range(rows - 1, 0, -1):', explanation: "BOTTOM PYRAMID.", highlightType: "loop" },
    { code: `    print("${h.halfSpaces}" * (rows - i) + (symbol + "${h.spaces}") * i)`, explanation: "Bottom row with custom padding.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Diamond size." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "TOP PYRAMID.", highlightType: "loop" },
    { code: `    console.log("${h.halfSpaces}".repeat(rows - i) + (symbol + "${h.spaces}").repeat(i));`, explanation: "Top row with padding." },
    { code: '}' },
    { code: 'for (let i = rows - 1; i >= 1; i--) {', explanation: "BOTTOM PYRAMID.", highlightType: "loop" },
    { code: `    console.log("${h.halfSpaces}".repeat(rows - i) + (symbol + "${h.spaces}").repeat(i));`, explanation: "Bottom row with padding." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst007Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Dimension." },
    { code: `    ${h.decl}`, explanation: "Border symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= rows; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '            if (i==1 || i==rows || j==1 || j==rows)', explanation: "Border check.", highlightType: "inner" },
    { code: '                ' + h.printSym, explanation: "Prints border symbol.", highlightType: "output" },
    { code: `            else printf("${h.unitSpaces}");`, explanation: "Hollow space matching symbol spacing.", highlightType: "output" },
    { code: '        }', explanation: "End inner." },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Dimension." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= rows; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `            if (i==1 || i==rows || j==1 || j==rows) cout << symbol << "${h.spaces}";`, explanation: "Border with custom padding.", highlightType: "output" },
    { code: `            else cout << "${h.unitSpaces}";`, explanation: "Inside hollow space.", highlightType: "output" },
    { code: '        }', explanation: "End inner." },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class HollowSquare {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Dimension." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int j = 1; j <= rows; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `                if (i==1 || i==rows || j==1 || j==rows) System.out.print(symbol + "${h.spaces}");`, explanation: "Border.", highlightType: "output" },
    { code: `                else System.out.print("${h.unitSpaces}");`, explanation: "Inside space.", highlightType: "output" },
    { code: '            }', explanation: "End inner." },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Dimension." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for j in range(1, rows + 1):', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '        if i == 1 or i == rows or j == 1 or j == rows:', explanation: "Border check." },
    { code: `            print(symbol, end="${h.spaces}")`, explanation: "Border print with custom spacing.", highlightType: "output" },
    { code: '        else:', explanation: "Space check." },
    { code: `            print("${h.unitSpaces}", end="")`, explanation: "Hollow space.", highlightType: "output" },
    { code: '    print()', explanation: "Newline.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Dimension." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Buffer." },
    { code: '    for (let j = 1; j <= rows; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `        if (i===1 || i===rows || j===1 || j===rows) line += symbol + "${h.spaces}";`, explanation: "Border." },
    { code: `        else line += "${h.unitSpaces}";`, explanation: "Space." },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Console output." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst008Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Height." },
    { code: `    ${h.decl}`, explanation: "Boundary symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= 2*i - 1; j++) {', explanation: "Width loop.", highlightType: "inner" },
    { code: `            if (j==1 || j==2*i-1 || i==rows) printf("%c${h.spaces}", symbol);`, explanation: "Edge print.", highlightType: "output" },
    { code: '            else printf(" ");', explanation: "Hollow interior.", highlightType: "output" },
    { code: '        }', explanation: "End inner." },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main." },
    { code: `    int rows = ${rows};`, explanation: "Height." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= 2*i - 1; j++) {', explanation: "Width loop.", highlightType: "inner" },
    { code: `            if (j==1 || j==2*i-1 || i==rows) cout << symbol << "${h.spaces}";`, explanation: "Edge.", highlightType: "output" },
    { code: '            else cout << " ";', explanation: "Hollow space.", highlightType: "output" },
    { code: '        }', explanation: "End width." },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class HollowPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Height." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Spaces.", highlightType: "inner" },
    { code: '            for (int j = 1; j <= 2*i - 1; j++) {', explanation: "Width loop.", highlightType: "inner" },
    { code: `                if (j==1 || j==2*i-1 || i==rows) System.out.print(symbol + "${h.spaces}");`, explanation: "Edge.", highlightType: "output" },
    { code: '                else System.out.print(" ");', explanation: "Hollow space.", highlightType: "output" },
    { code: '            }', explanation: "End width." },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    spaces = "${h.halfSpaces}" * (rows - i)`, explanation: "Spaces." },
    { code: '    if i == 1 or i == rows:', explanation: "Base/Top check." },
    { code: `        symbols = (symbol + "${h.spaces}") * i`, explanation: "Solid base with padding.", highlightType: "output" },
    { code: '    else:', explanation: "Hollow interior." },
    { code: `        symbols = symbol + " " * (2 * (i - 2) + 1) + symbol`, explanation: "Edges." },
    { code: '    print(spaces + symbols)', explanation: "Prints row." }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    let spaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Lead spaces." },
    { code: `    if (i === 1 || i === rows) console.log(spaces + (symbol + "${h.spaces}").repeat(i));`, explanation: "Solid with dynamic spacing.", highlightType: "output" },
    { code: `    else console.log(spaces + symbol + " ".repeat(2 * (i - 2) + 1) + symbol);`, explanation: "Hollow." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst009Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);

  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Hourglass height." },
    { code: `    char symbol = '${symbol}';`, explanation: "Symbol." },
    { code: '    // Top: inverted pyramid (wide to narrow)', explanation: "Upper hourglass half." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "UPPER LOOP: rows → 1 (inverted).", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Centering spaces increase as rows shrink.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "i symbols per row — shrinks each row.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End upper loop." },
    { code: '    // Bottom: upright pyramid (narrow to wide)', explanation: "Lower hourglass half (starts from 2 to skip shared apex)." },
    { code: '    for (int i = 2; i <= rows; i++) {', explanation: "LOWER LOOP: 2 → rows (upright). Starts at 2 to skip shared apex.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf("${h.halfSpaces}");`, explanation: "Centering spaces decrease as rows grow.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "i symbols per row — grows each row.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End lower loop." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream header." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Hourglass height." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    // Top: inverted pyramid', explanation: "Upper half." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "UPPER LOOP: rows → 1.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "i symbols, shrinking.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End upper." },
    { code: '    // Bottom: upright pyramid', explanation: "Lower half." },
    { code: '    for (int i = 2; i <= rows; i++) {', explanation: "LOWER LOOP: 2 → rows (skips shared apex).", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << "${h.halfSpaces}";`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "i symbols, growing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End lower." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class HourglassPattern {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Hourglass height." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        // Top: inverted pyramid', explanation: "Upper half." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "UPPER LOOP: rows → 1.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "i symbols, shrinking.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End upper." },
    { code: '        // Bottom: upright pyramid', explanation: "Lower half." },
    { code: '        for (int i = 2; i <= rows; i++) {', explanation: "LOWER LOOP: 2 → rows (skips shared apex).", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print("${h.halfSpaces}");`, explanation: "Centering spaces.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "i symbols, growing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End lower." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Hourglass height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: '# Top: inverted pyramid (wide to narrow)', explanation: "Upper half." },
    { code: 'for i in range(rows, 0, -1):', explanation: "UPPER LOOP: rows → 1.", highlightType: "loop" },
    { code: `    print("${h.halfSpaces}" * (rows - i) + (symbol + "${h.spaces}") * i)`, explanation: "Centering + i symbols (shrinking).", highlightType: "output" },
    { code: '# Bottom: upright pyramid (narrow to wide)', explanation: "Lower half." },
    { code: 'for i in range(2, rows + 1):', explanation: "LOWER LOOP: 2 → rows (skips shared apex).", highlightType: "loop" },
    { code: `    print("${h.halfSpaces}" * (rows - i) + (symbol + "${h.spaces}") * i)`, explanation: "Centering + i symbols (growing).", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Hourglass height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '// Top: inverted pyramid (wide to narrow)', explanation: "Upper half." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "UPPER LOOP: rows → 1.", highlightType: "loop" },
    { code: `    const spaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Centering spaces." },
    { code: `    console.log(spaces + (symbol + "${h.spaces}").repeat(i));`, explanation: "i symbols shrinking per row.", highlightType: "output" },
    { code: '}' },
    { code: '// Bottom: upright pyramid (narrow to wide)', explanation: "Lower half." },
    { code: 'for (let i = 2; i <= rows; i++) {', explanation: "LOWER LOOP: 2 → rows (skips shared apex).", highlightType: "loop" },
    { code: `    const spaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Centering spaces." },
    { code: `    console.log(spaces + (symbol + "${h.spaces}").repeat(i));`, explanation: "i symbols growing per row.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}


function getAst010Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);

  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Wing height." },
    { code: `    char symbol = '${symbol}';`, explanation: "Symbol." },
    { code: '    // Upper half', explanation: "Upper butterfly wings." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "UPPER HALF: i grows 1 to rows.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Left wing: i symbols.", highlightType: "output" },
    { code: `        for (int s = 1; s <= 2*(rows-i)*${h.unitWidth}; s++) printf(" ");`, explanation: "Middle gap shrinks as i grows.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Right wing: mirrors left.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End upper loop." },
    { code: '    // Lower half', explanation: "Lower butterfly wings." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "LOWER HALF: i shrinks rows to 1.", highlightType: "loop" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Left wing.", highlightType: "output" },
    { code: `        for (int s = 1; s <= 2*(rows-i)*${h.unitWidth}; s++) printf(" ");`, explanation: "Middle gap grows as i shrinks.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) ' + h.printSym, explanation: "Right wing.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End lower loop." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream header." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Wing height." },
    { code: `    string symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '    // Upper half', explanation: "Upper butterfly." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "UPPER HALF.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Left wing.", highlightType: "output" },
    { code: `        for (int s = 1; s <= 2*(rows-i)*${h.unitWidth}; s++) cout << " ";`, explanation: "Middle gap.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Right wing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End upper." },
    { code: '    // Lower half', explanation: "Lower butterfly." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "LOWER HALF.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Left wing.", highlightType: "output" },
    { code: `        for (int s = 1; s <= 2*(rows-i)*${h.unitWidth}; s++) cout << " ";`, explanation: "Middle gap.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Right wing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End lower." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class ButterflyPattern {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Wing height." },
    { code: `        String symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '        // Upper half', explanation: "Upper wings." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "UPPER HALF.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Left wing.", highlightType: "output" },
    { code: `            for (int s = 1; s <= 2*(rows-i)*${h.unitWidth}; s++) System.out.print(" ");`, explanation: "Middle gap.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Right wing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End upper." },
    { code: '        // Lower half', explanation: "Lower wings." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "LOWER HALF.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Left wing.", highlightType: "output" },
    { code: `            for (int s = 1; s <= 2*(rows-i)*${h.unitWidth}; s++) System.out.print(" ");`, explanation: "Middle gap.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= i; j++) ${h.printSym}`, explanation: "Right wing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End lower." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Wing height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: '# Upper half', explanation: "Upper butterfly." },
    { code: 'for i in range(1, rows + 1):', explanation: "UPPER HALF: i grows 1 to rows.", highlightType: "loop" },
    { code: `    left = (symbol + "${h.spaces}") * i`, explanation: "Left wing: i symbols with spacing." },
    { code: `    gap = " " * (2 * (rows - i) * ${h.unitWidth})`, explanation: "Middle gap: shrinks as i grows.", highlightType: "inner" },
    { code: `    right = (symbol + "${h.spaces}") * i`, explanation: "Right wing: mirrors left.", highlightType: "output" },
    { code: '    print(left + gap + right)', explanation: "Prints full butterfly row." },
    { code: '# Lower half', explanation: "Lower butterfly." },
    { code: 'for i in range(rows, 0, -1):', explanation: "LOWER HALF: i shrinks rows to 1.", highlightType: "loop" },
    { code: `    left = (symbol + "${h.spaces}") * i`, explanation: "Left wing." },
    { code: `    gap = " " * (2 * (rows - i) * ${h.unitWidth})`, explanation: "Middle gap: grows as i shrinks.", highlightType: "inner" },
    { code: `    right = (symbol + "${h.spaces}") * i`, explanation: "Right wing.", highlightType: "output" },
    { code: '    print(left + gap + right)', explanation: "Prints row." }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Wing height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: '// Upper half', explanation: "Upper butterfly wings." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "UPPER HALF: i grows 1 to rows.", highlightType: "loop" },
    { code: `    const left = (symbol + "${h.spaces}").repeat(i);`, explanation: "Left wing: i symbols." },
    { code: `    const gap = " ".repeat(2 * (rows - i) * ${h.unitWidth});`, explanation: "Middle gap: shrinks as i grows.", highlightType: "inner" },
    { code: `    const right = (symbol + "${h.spaces}").repeat(i);`, explanation: "Right wing: mirrors left.", highlightType: "output" },
    { code: '    console.log(left + gap + right);', explanation: "Prints row.", highlightType: "output" },
    { code: '}' },
    { code: '// Lower half', explanation: "Lower butterfly wings." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "LOWER HALF: i shrinks rows to 1.", highlightType: "loop" },
    { code: `    const left = (symbol + "${h.spaces}").repeat(i);`, explanation: "Left wing." },
    { code: `    const gap = " ".repeat(2 * (rows - i) * ${h.unitWidth});`, explanation: "Middle gap: grows as i shrinks.", highlightType: "inner" },
    { code: `    const right = (symbol + "${h.spaces}").repeat(i);`, explanation: "Right wing.", highlightType: "output" },
    { code: '    console.log(left + gap + right);', explanation: "Prints row.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}


function getAst011Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const symLen = Array.from(symbol).length;

  // Odd pyramid: symbols are PACKED (no inter-symbol spaces)
  // so we use dedicated no-space print expressions per language
  const printNoSpace = {
    c: `printf("%c", symbol);`,
    cpp: `cout << symbol;`,
    java: `System.out.print(symbol);`
  };

  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `    char symbol = '${symbol}';`, explanation: "Active symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP: 1 to rows.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf(" ");`, explanation: "1 leading space per offset unit to center the pyramid.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= 2 * i - 1; j++) ${printNoSpace.c}`, explanation: "Prints (2*i-1) symbols tightly packed — no spacing between them.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `    char symbol = '${symbol}';`, explanation: "Symbol." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << " ";`, explanation: "1 leading space per offset unit.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= 2 * i - 1; j++) ${printNoSpace.cpp}`, explanation: "Prints (2*i-1) symbols tightly packed.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class OddPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `        char symbol = '${symbol}';`, explanation: "Symbol." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print(" ");`, explanation: "1 lead space per offset unit.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= 2 * i - 1; j++) ${printNoSpace.java}`, explanation: "Prints (2*i-1) symbols tightly packed.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    spaces = " " * (rows - i)`, explanation: "1 lead space per offset unit." },
    { code: `    symbols = symbol * (2 * i - 1)`, explanation: "Repeats symbol (2*i-1) times, no spacing.", highlightType: "output" },
    { code: '    print(spaces + symbols)', explanation: "Prints row.", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    let spaces = " ".repeat(rows - i);`, explanation: "1 lead space per offset unit." },
    { code: `    let symbols = symbol.repeat(2 * i - 1);`, explanation: "Repeats symbol (2*i-1) times, tightly packed.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst012Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);

  // Inverted Odd pyramid: symbols PACKED (no inter-symbol spaces)
  const printNoSpace = {
    c: `printf("%c", symbol);`,
    cpp: `cout << symbol;`,
    java: `System.out.print(symbol);`
  };

  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `    char symbol = '${symbol}';`, explanation: "Active symbol." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Decrements from N down to 1.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) printf(" ");`, explanation: "1 lead space per offset unit.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= 2 * i - 1; j++) ${printNoSpace.c}`, explanation: "Prints (2*i-1) symbols tightly packed.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `    char symbol = '${symbol}';`, explanation: "Symbol." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int s = 1; s <= rows - i; s++) cout << " ";`, explanation: "1 lead space per offset unit.", highlightType: "inner" },
    { code: `        for (int j = 1; j <= 2 * i - 1; j++) ${printNoSpace.cpp}`, explanation: "Prints (2*i-1) symbols tightly packed.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer loop." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class InvertedOddPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Pyramid height." },
    { code: `        char symbol = '${symbol}';`, explanation: "Symbol." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int s = 1; s <= rows - i; s++) System.out.print(" ");`, explanation: "1 lead space per offset unit.", highlightType: "inner" },
    { code: `            for (int j = 1; j <= 2 * i - 1; j++) ${printNoSpace.java}`, explanation: "Prints (2*i-1) symbols tightly packed.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Height." },
    { code: `symbol = "${symbol}"`, explanation: "Symbol." },
    { code: 'for i in range(rows, 0, -1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    spaces = " " * (rows - i)', explanation: "1 lead space per offset unit." },
    { code: `    symbols = symbol * (2 * i - 1)`, explanation: "Repeats symbol (2*i-1) times, no spacing.", highlightType: "output" },
    { code: '    print(spaces + symbols)', explanation: "Prints row.", highlightType: "output" }
  ];

  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let spaces = " ".repeat(rows - i);', explanation: "1 lead space per offset unit." },
    { code: `    let symbols = symbol.repeat(2 * i - 1);`, explanation: "Repeats symbol (2*i-1) times, tightly packed.", highlightType: "output" },
    { code: '    console.log(spaces + symbols);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

// --- NUMBER PATTERNS ---

function getNum001Code(rows, sp, lang) {
  const spaces = " ".repeat(sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) printf("%d${spaces}", j);`, explanation: "Prints column index with padding spacing.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) cout << j << "${spaces}";`, explanation: "Prints index with dynamic padding spacing.", highlightType: "output" },
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
    { code: `            for (int j = 1; j <= i; j++) System.out.print(j + "${spaces}");`, explanation: "Prints index with spacing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for j in range(1, i + 1):', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: `        print(j, end="${spaces}")`, explanation: "Prints index with custom padding spacing.", highlightType: "output" },
    { code: '    print()' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: `    for (let j = 1; j <= i; j++) line += j + "${spaces}";`, explanation: "Appends index with dynamic spacing.", highlightType: "output" },
    { code: '    console.log(line);', explanation: "Console log.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getNum002Code(rows, sp, lang) {
  const spaces = " ".repeat(sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) printf("%d${spaces}", i);`, explanation: "Prints row index i with custom padding.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) cout << i << "${spaces}";`, explanation: "Prints row index i with spacing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class SameNumberRowPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) System.out.print(i + "${spaces}");`, explanation: "Prints row index i with spacing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    print((str(i) + "${spaces}") * i)`, explanation: "Prints row index i repeated with padding.", highlightType: "output" }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    console.log((i + "${spaces}").repeat(i));`, explanation: "Prints i repeated with dynamic spacing.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getNum004Code(rows, sp, lang) {
  const spaces = " ".repeat(sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    int count = 1;', explanation: "Continuous counter.", highlightType: "variable" },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) printf("%d${spaces}", count++);`, explanation: "Prints count with dynamic spacing.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    int count = 1;', explanation: "Counter." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) cout << count++ << "${spaces}";`, explanation: "Prints count with spacing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class FloydsTriangle {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: '        int count = 1;', explanation: "Counter." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) System.out.print((count++) + "${spaces}");`, explanation: "Prints count with spacing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: 'count = 1', explanation: "Counter." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for j in range(1, i + 1):', explanation: "INNER LOOP." },
    { code: `        print(count, end="${spaces}")`, explanation: "Prints count with dynamic spacing.", highlightType: "output" },
    { code: '        count += 1', explanation: "Increments count." },
    { code: '    print()' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'let count = 1;', explanation: "Counter." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Buffer." },
    { code: `    for (let j = 1; j <= i; j++) line += (count++) + "${spaces}";`, explanation: "Appends count with custom spacing.", highlightType: "output" },
    { code: '    console.log(line);', explanation: "Log.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getNum005Code(rows, lang) {
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pascal rows." },
    { code: '    for (int i = 0; i < rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        int val = 1;', explanation: "Base value.", highlightType: "variable" },
    { code: '        for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '        for (int j = 0; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '            printf("%d ", val);', explanation: "Prints Pascal term.", highlightType: "output" },
    { code: '            val = val * (i - j) / (j + 1);', explanation: "Binomial step.", highlightType: "variable" },
    { code: '        }', explanation: "End terms." },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Pascal rows." },
    { code: '    for (int i = 0; i < rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        int val = 1;', explanation: "Base value." },
    { code: '        for (int s = 1; s <= rows - i; s++) cout << " ";', explanation: "Spaces.", highlightType: "inner" },
    { code: '        for (int j = 0; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '            cout << val << " ";', explanation: "Prints term.", highlightType: "output" },
    { code: '            val = val * (i - j) / (j + 1);', explanation: "Binomial calculation.", highlightType: "variable" },
    { code: '        }', explanation: "End terms." },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class PascalsTriangle {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Pascal rows." },
    { code: '        for (int i = 0; i < rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            int val = 1;', explanation: "Base value." },
    { code: '            for (int s = 1; s <= rows - i; s++) System.out.print(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '            for (int j = 0; j <= i; j++) {', explanation: "INNER LOOP.", highlightType: "inner" },
    { code: '                System.out.print(val + " ");', explanation: "Prints term.", highlightType: "output" },
    { code: '                val = val * (i - j) / (j + 1);', explanation: "Binomial step.", highlightType: "variable" },
    { code: '            }', explanation: "End terms." },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Pascal rows." },
    { code: 'for i in range(rows):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    val = 1', explanation: "Base value." },
    { code: '    print(" " * (rows - i), end="")', explanation: "Spaces." },
    { code: '    for j in range(i + 1):', explanation: "INNER LOOP." },
    { code: '        print(val, end=" ")', explanation: "Prints term." },
    { code: '        val = val * (i - j) // (j + 1)', explanation: "Binomial calculation." },
    { code: '    print()' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Pascal rows." },
    { code: 'for (let i = 0; i < rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let val = 1;', explanation: "Base value." },
    { code: '    let line = " ".repeat(rows - i);', explanation: "Spaces." },
    { code: '    for (let j = 0; j <= i; j++) {', explanation: "INNER LOOP." },
    { code: '        line += val + " ";', explanation: "Appends term." },
    { code: '        val = Math.floor(val * (i - j) / (j + 1));', explanation: "Binomial calculation." },
    { code: '    }', explanation: "End terms." },
    { code: '    console.log(line);', explanation: "Console log." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getNum006Code(rows, lang) {
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int s = 1; s <= rows - i; s++) printf(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) printf("%d", j);', explanation: "Ascending count.", highlightType: "output" },
    { code: '        for (int j = i - 1; j >= 1; j--) printf("%d", j);', explanation: "Descending count.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '        for (int s = 1; s <= rows - i; s++) cout << " ";', explanation: "Spaces.", highlightType: "inner" },
    { code: '        for (int j = 1; j <= i; j++) cout << j;', explanation: "Ascending count.", highlightType: "output" },
    { code: '        for (int j = i - 1; j >= 1; j--) cout << j;', explanation: "Descending count.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class PalindromicPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int s = 1; s <= rows - i; s++) System.out.print(" ");', explanation: "Spaces.", highlightType: "inner" },
    { code: '            for (int j = 1; j <= i; j++) System.out.print(j);', explanation: "Ascending count.", highlightType: "output" },
    { code: '            for (int j = i - 1; j >= 1; j--) System.out.print(j);', explanation: "Descending count.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    spaces = " " * (rows - i)', explanation: "Lead spaces." },
    { code: '    asc = "".join(str(j) for j in range(1, i + 1))', explanation: "Ascending numbers." },
    { code: '    desc = "".join(str(j) for j in range(i - 1, 0, -1))', explanation: "Descending numbers." },
    { code: '    print(spaces + asc + desc)' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = " ".repeat(rows - i);', explanation: "Lead spaces." },
    { code: '    for (let j = 1; j <= i; j++) line += j;', explanation: "Ascending numbers." },
    { code: '    for (let j = i - 1; j >= 1; j--) line += j;', explanation: "Descending numbers." },
    { code: '    console.log(line);', explanation: "Console log." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

// --- CHARACTER PATTERNS ---

function getChr001Code(rows, sp, symbol, lang) {
  const spaces = " ".repeat(sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    char startChar = '${symbol}';`, explanation: "Start char." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 0; j < i; j++) printf("%c${spaces}", startChar + j);`, explanation: "ASCII increment with spacing.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    char startChar = '${symbol}';`, explanation: "Start char." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 0; j < i; j++) cout << (char)(startChar + j) << "${spaces}";`, explanation: "ASCII increment with spacing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class AlphabetTriangle {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: `        char startChar = '${symbol}';`, explanation: "Start char." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int j = 0; j < i; j++) System.out.print((char)(startChar + j) + "${spaces}");`, explanation: "Prints char with spacing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `start_char = "${symbol}"`, explanation: "Start char." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `    line = "".join(chr(ord(start_char) + j) + "${spaces}" for j in range(i))`, explanation: "Constructs line with spacing." },
    { code: '    print(line)' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const startChar = "${symbol}";`, explanation: "Start char." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 0; j < i; j++) {', explanation: "INNER LOOP." },
    { code: `        line += String.fromCharCode(startChar.charCodeAt(0) + j) + "${spaces}";`, explanation: "Appends char with dynamic spacing.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Log.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getChr002Code(rows, sp, symbol, lang) {
  const spaces = " ".repeat(sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    char ch = '${symbol}';`, explanation: "Start character." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) printf("%c${spaces}", ch++);`, explanation: "Increments char continuously with spacing.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    char ch = '${symbol}';`, explanation: "Start char." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) cout << ch++ << "${spaces}";`, explanation: "Increments char with custom spacing.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class ContinuousAlphabet {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: `        char ch = '${symbol}';`, explanation: "Start char." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) System.out.print((ch++) + "${spaces}");`, explanation: "Increments char with dynamic spacing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `ch = ord("${symbol}")`, explanation: "Start ASCII." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    for j in range(i):', explanation: "INNER LOOP." },
    { code: `        print(chr(ch), end="${spaces}")`, explanation: "Prints char with custom padding.", highlightType: "output" },
    { code: '        ch += 1', explanation: "Increments char." },
    { code: '    print()' }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `let charCode = "${symbol}".charCodeAt(0);`, explanation: "Start ASCII code." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    let line = "";', explanation: "Line buffer." },
    { code: '    for (let j = 1; j <= i; j++) {', explanation: "INNER LOOP." },
    { code: `        line += String.fromCharCode(charCode++) + "${spaces}";`, explanation: "Appends character with custom dynamic spacing.", highlightType: "output" },
    { code: '    }', explanation: "End inner." },
    { code: '    console.log(line);', explanation: "Console output.", highlightType: "output" },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getChr003Code(rows, sp, symbol, lang) {
  const spaces = " ".repeat(sp);
  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    char startChar = '${symbol}';`, explanation: "Start char." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) printf("%c${spaces}", startChar + i - 1);`, explanation: "Row letter repeat with dynamic padding.", highlightType: "output" },
    { code: '        printf("\\n");', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const cppLines = [
    { code: '#include <iostream>', explanation: "I/O stream." },
    { code: 'using namespace std;', explanation: "Namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${rows};`, explanation: "Rows." },
    { code: `    char startChar = '${symbol}';`, explanation: "Start char." },
    { code: '    for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `        for (int j = 1; j <= i; j++) cout << (char)(startChar + i - 1) << "${spaces}";`, explanation: "Row letter repeat with padding.", highlightType: "output" },
    { code: '        cout << endl;', explanation: "Newline.", highlightType: "output" },
    { code: '    }', explanation: "End outer." },
    { code: '    return 0;', explanation: "Exit." },
    { code: '}' }
  ];
  const javaLines = [
    { code: 'public class RepeatingCharacterPyramid {', explanation: "Class." },
    { code: '    public static void main(String[] args) {', explanation: "Main." },
    { code: `        int rows = ${rows};`, explanation: "Rows." },
    { code: `        char startChar = '${symbol}';`, explanation: "Start char." },
    { code: '        for (int i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: `            for (int j = 1; j <= i; j++) System.out.print((char)(startChar + i - 1) + "${spaces}");`, explanation: "Row letter repeat with custom spacing.", highlightType: "output" },
    { code: '            System.out.println();', explanation: "Newline.", highlightType: "output" },
    { code: '        }', explanation: "End outer." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];
  const pyLines = [
    { code: `rows = ${rows}`, explanation: "Rows." },
    { code: `start_char = "${symbol}"`, explanation: "Start char." },
    { code: 'for i in range(1, rows + 1):', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    char = chr(ord(start_char) + i - 1)', explanation: "Calculates character for row." },
    { code: `    print((char + "${spaces}") * i)`, explanation: "Prints repeated character with spacing." }
  ];
  const jsLines = [
    { code: `const rows = ${rows};`, explanation: "Rows." },
    { code: `const startChar = "${symbol}";`, explanation: "Start char." },
    { code: 'for (let i = 1; i <= rows; i++) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '    const char = String.fromCharCode(startChar.charCodeAt(0) + i - 1);', explanation: "Row char." },
    { code: `    console.log((char + "${spaces}").repeat(i));`, explanation: "Console output with dynamic spacing." },
    { code: '}' }
  ];
  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

function getAst013Code(rows, sp, symbol, lang) {
  const h = getSymbolHelpers(symbol, lang, sp);
  const r = Math.max(6, rows);

  const cLines = [
    { code: '#include <stdio.h>', explanation: "Standard I/O header." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${r};`, explanation: "Height of the heart." },
    { code: `    ${h.decl}`, explanation: "Symbol character." },
    { code: '    // Upper part of the heart (two lobes)', explanation: "Draw humps." },
    { code: '    for (int i = rows / 2; i <= rows; i += 2) {', explanation: "OUTER LOOP: Upper lobes row iterator.", highlightType: "loop" },
    { code: '        // Print left spacing', explanation: "Spaces before the first lobe." },
    { code: '        for (int j = 1; j < rows - i; j += 2) {', explanation: "INNER LOOP: Left side spacing.", highlightType: "inner" },
    { code: `            printf("${h.halfSpaces}");`, explanation: "Output spacer." },
    { code: '        }', explanation: "End left spacing." },
    { code: '        // Print first lobe', explanation: "Symbols for left lobe." },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Left lobe symbols.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Output symbol." },
    { code: '        }', explanation: "End first lobe." },
    { code: '        // Print middle spacing', explanation: "Spaces between lobes." },
    { code: '        for (int j = 1; j <= rows - i; j++) {', explanation: "INNER LOOP: Center spacing.", highlightType: "inner" },
    { code: `            printf("${h.halfSpaces}");`, explanation: "Output spacer." },
    { code: '        }', explanation: "End middle spacing." },
    { code: '        // Print second lobe', explanation: "Symbols for right lobe." },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Right lobe symbols.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Output symbol." },
    { code: '        }', explanation: "End second lobe." },
    { code: '        printf("\\n");', explanation: "Newline after row." },
    { code: '    }', explanation: "End upper part." },
    { code: '    // Lower part of the heart (inverted triangle)', explanation: "Draw V-shape." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Inverted triangle rows.", highlightType: "loop" },
    { code: '        // Print leading spaces', explanation: "Indentation for centering." },
    { code: '        for (int j = i; j < rows; j++) {', explanation: "INNER LOOP: Leading spaces.", highlightType: "inner" },
    { code: `            printf("${h.halfSpaces}");`, explanation: "Output spacer." },
    { code: '        }', explanation: "End spaces." },
    { code: '        // Print symbols', explanation: "Symbols for current row." },
    { code: '        for (int j = 1; j <= (i * 2) - 1; j++) {', explanation: "INNER LOOP: Heart body symbols.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Output symbol." },
    { code: '        }', explanation: "End symbols." },
    { code: '        printf("\\n");', explanation: "Newline." },
    { code: '    }', explanation: "End lower part." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const cppLines = [
    { code: '#include <iostream>', explanation: "Standard I/O stream." },
    { code: 'using namespace std;', explanation: "Standard namespace." },
    { code: 'int main() {', explanation: "Main entry." },
    { code: `    int rows = ${r};`, explanation: "Heart height." },
    { code: `    ${h.decl}`, explanation: "Active symbol." },
    { code: '    // Upper part (two lobes)', explanation: "Draw humps." },
    { code: '    for (int i = rows / 2; i <= rows; i += 2) {', explanation: "OUTER LOOP: Upper lobes.", highlightType: "loop" },
    { code: '        for (int j = 1; j < rows - i; j += 2) {', explanation: "INNER LOOP: Left indentation.", highlightType: "inner" },
    { code: `            cout << "${h.halfSpaces}";`, explanation: "Prints spacer." },
    { code: '        }', explanation: "End spacing." },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Left lobe.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Prints symbol." },
    { code: '        }', explanation: "End lobe." },
    { code: '        for (int j = 1; j <= rows - i; j++) {', explanation: "INNER LOOP: Center spacing.", highlightType: "inner" },
    { code: `            cout << "${h.halfSpaces}";`, explanation: "Prints center spacer." },
    { code: '        }', explanation: "End middle spacing." },
    { code: '        for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Right lobe.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Prints symbol." },
    { code: '        }', explanation: "End lobe." },
    { code: '        cout << endl;', explanation: "Newline." },
    { code: '    }', explanation: "End upper part." },
    { code: '    // Lower part (inverted triangle)', explanation: "Draw V-shape." },
    { code: '    for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Decrements rows.", highlightType: "loop" },
    { code: '        for (int j = i; j < rows; j++) {', explanation: "INNER LOOP: Centering spaces.", highlightType: "inner" },
    { code: `            cout << "${h.halfSpaces}";`, explanation: "Prints spacer." },
    { code: '        }', explanation: "End spaces." },
    { code: '        for (int j = 1; j <= (i * 2) - 1; j++) {', explanation: "INNER LOOP: Row symbols.", highlightType: "inner" },
    { code: `            ${h.printSym}`, explanation: "Prints symbol." },
    { code: '        }', explanation: "End symbols." },
    { code: '        cout << endl;', explanation: "Newline." },
    { code: '    }', explanation: "End lower part." },
    { code: '    return 0;', explanation: "Exit program." },
    { code: '}' }
  ];

  const javaLines = [
    { code: 'public class HeartPattern {', explanation: "Class definition." },
    { code: '    public static void main(String[] args) {', explanation: "Main entry method." },
    { code: `        int rows = ${r};`, explanation: "Height." },
    { code: `        ${h.decl}`, explanation: "Symbol variable." },
    { code: '        // Upper part (two lobes)', explanation: "Draw humps." },
    { code: '        for (int i = rows / 2; i <= rows; i += 2) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int j = 1; j < rows - i; j += 2) {', explanation: "INNER LOOP: Left spacing.", highlightType: "inner" },
    { code: `                System.out.print("${h.halfSpaces}");`, explanation: "Spacer." },
    { code: '            }', explanation: "End spacing." },
    { code: '            for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Left lobe.", highlightType: "inner" },
    { code: `                ${h.printSym}`, explanation: "Symbol print." },
    { code: '            }', explanation: "End lobe." },
    { code: '            for (int j = 1; j <= rows - i; j++) {', explanation: "INNER LOOP: Center spacing.", highlightType: "inner" },
    { code: `                System.out.print("${h.halfSpaces}");`, explanation: "Spacer." },
    { code: '            }', explanation: "End middle spacing." },
    { code: '            for (int j = 1; j <= i; j++) {', explanation: "INNER LOOP: Right lobe.", highlightType: "inner" },
    { code: `                ${h.printSym}`, explanation: "Symbol print." },
    { code: '            }', explanation: "End lobe." },
    { code: '            System.out.println();', explanation: "Newline." },
    { code: '        }', explanation: "End upper part." },
    { code: '        // Lower part (inverted triangle)', explanation: "Draw V-shape." },
    { code: '        for (int i = rows; i >= 1; i--) {', explanation: "OUTER LOOP.", highlightType: "loop" },
    { code: '            for (int j = i; j < rows; j++) {', explanation: "INNER LOOP: Centering spaces.", highlightType: "inner" },
    { code: `                System.out.print("${h.halfSpaces}");`, explanation: "Spacer." },
    { code: '            }', explanation: "End spaces." },
    { code: '            for (int j = 1; j <= (i * 2) - 1; j++) {', explanation: "INNER LOOP: Row symbols.", highlightType: "inner" },
    { code: `                ${h.printSym}`, explanation: "Symbol print." },
    { code: '            }', explanation: "End symbols." },
    { code: '            System.out.println();', explanation: "Newline." },
    { code: '        }', explanation: "End lower part." },
    { code: '    }', explanation: "End main." },
    { code: '}' }
  ];

  const pyLines = [
    { code: `rows = ${r}`, explanation: "Heart height." },
    { code: `symbol = "${symbol}"`, explanation: "Selected symbol." },
    { code: 'print("Upper part (two lobes)")', explanation: "Humps comment." },
    { code: 'for i in range(rows // 2, rows + 1, 2):', explanation: "OUTER LOOP: Upper lobes.", highlightType: "loop" },
    { code: `    left_spaces = "${h.halfSpaces}" * ((rows - i) // 2)`, explanation: "Calculate left spacer." },
    { code: `    lobe1 = (symbol + "${h.spaces}") * i`, explanation: "Left lobe." },
    { code: `    mid_spaces = "${h.halfSpaces}" * (rows - i)`, explanation: "Center spacer." },
    { code: `    lobe2 = ((symbol + "${h.spaces}") * i).rstrip()`, explanation: "Right lobe without trailing spacer." },
    { code: '    print(left_spaces + lobe1 + mid_spaces + lobe2)', explanation: "Outputs lobes row.", highlightType: "output" },
    { code: 'print("Lower part (inverted triangle)")', explanation: "V-shape comment." },
    { code: 'for i in range(rows, 0, -1):', explanation: "OUTER LOOP: Lower inverted triangle.", highlightType: "loop" },
    { code: `    spaces = "${h.halfSpaces}" * (rows - i)`, explanation: "Centering spacer." },
    { code: `    symbols = ((symbol + "${h.spaces}") * ((i * 2) - 1)).rstrip()`, explanation: "Row symbols.", highlightType: "output" },
    { code: '    print(spaces + symbols)', explanation: "Outputs lower row." }
  ];

  const jsLines = [
    { code: `const rows = ${r};`, explanation: "Height." },
    { code: `const symbol = "${symbol}";`, explanation: "Symbol." },
    { code: 'console.log("Upper part (two lobes)");', explanation: "Humps comment." },
    { code: 'for (let i = Math.floor(rows / 2); i <= rows; i += 2) {', explanation: "OUTER LOOP: Upper lobes.", highlightType: "loop" },
    { code: `    const leftSpaces = "${h.halfSpaces}".repeat(Math.floor((rows - i) / 2));`, explanation: "Left spacing." },
    { code: `    const lobe1 = (symbol + "${h.spaces}").repeat(i);`, explanation: "Left lobe." },
    { code: `    const midSpaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Center spacing." },
    { code: `    const lobe2 = (symbol + "${h.spaces}").repeat(i).trimEnd();`, explanation: "Right lobe." },
    { code: '    console.log(leftSpaces + lobe1 + midSpaces + lobe2);', explanation: "Outputs upper row.", highlightType: "output" },
    { code: '}' },
    { code: 'console.log("Lower part (inverted triangle)");', explanation: "V-shape comment." },
    { code: 'for (let i = rows; i >= 1; i--) {', explanation: "OUTER LOOP: Lower part.", highlightType: "loop" },
    { code: `    const leftSpaces = "${h.halfSpaces}".repeat(rows - i);`, explanation: "Centering spaces." },
    { code: `    const symbols = (symbol + "${h.spaces}").repeat(2 * i - 1).trimEnd();`, explanation: "Row symbols." },
    { code: '    console.log(leftSpaces + symbols);', explanation: "Outputs lower row.", highlightType: "output" },
    { code: '}' }
  ];

  return renderMultiLang(lang, cLines, cppLines, javaLines, pyLines, jsLines);
}

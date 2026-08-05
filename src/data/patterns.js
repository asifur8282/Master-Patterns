// Dataset of CS Patterns for Master Patterns with Bulletproof Multi-Character Symbol Alignment

function getUnitConfig(symbol = "*", spacePadding = 1) {
  const symLen = symbol ? Array.from(symbol).length : 1;
  const sp = " ".repeat(spacePadding);
  const unitWidth = symLen + spacePadding;
  const halfUnit = Math.max(1, Math.floor(unitWidth / 2));
  return { symLen, sp, unitWidth, halfUnit };
}

export const PATTERNS = [
  // --- STAR PATTERNS ---
  {
    id: "ast_001",
    name: "Right-Angled Half Pyramid",
    category: "Star",
    difficulty: "Easy",
    description: "The classic starting pattern in CS. Row i prints i symbols left-aligned.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        res.push((symbol + sp).repeat(i).trimEnd());
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const line = (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({
          step: i,
          row: i,
          lineAdded: line,
          explanation: `Row ${i}: Print '${symbol}' ${i} time(s).`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },
  {
    id: "ast_002",
    name: "Right-Aligned Half Pyramid",
    category: "Star",
    difficulty: "Easy",
    description: "Requires lead-in space padding before printing symbols in each row.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const leadingSpaces = " ".repeat((rows - i) * unitWidth);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(leadingSpaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const leadingSpaces = " ".repeat((rows - i) * unitWidth);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        const line = leadingSpaces + symbols;
        currentOutput.push(line);
        steps.push({
          step: i,
          row: i,
          lineAdded: line,
          explanation: `Row ${i}: Print ${rows - i} space blocks, then ${i} symbol(s).`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },
  {
    id: "ast_003",
    name: "Inverted Right Triangle",
    category: "Star",
    difficulty: "Easy",
    description: "Row i starts at N symbols and decreases down to 1 symbol.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = rows; i >= 1; i--) {
        res.push((symbol + sp).repeat(i).trimEnd());
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = rows; i >= 1; i--) {
        const line = (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({
          step: rows - i + 1,
          row: rows - i + 1,
          lineAdded: line,
          explanation: `Row ${rows - i + 1}: Print '${symbol}' ${i} time(s).`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },
  {
    id: "ast_004",
    name: "Full Pyramid",
    category: "Pyramid",
    difficulty: "Medium",
    description: "Symmetrical centered pyramid with leading spaces and odd symbol count (2*i - 1) or centered spacing.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(spaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        const line = spaces + symbols;
        currentOutput.push(line);
        steps.push({
          step: i,
          row: i,
          lineAdded: line,
          explanation: `Row ${i}: Centered pyramid tier with '${symbol}'.`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },
  {
    id: "ast_005",
    name: "Inverted Full Pyramid",
    category: "Pyramid",
    difficulty: "Medium",
    description: "Upside-down centered pyramid tapering from N down to 1.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = rows; i >= 1; i--) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(spaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = rows; i >= 1; i--) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        const line = spaces + symbols;
        currentOutput.push(line);
        steps.push({
          step: rows - i + 1,
          row: rows - i + 1,
          lineAdded: line,
          explanation: `Row ${rows - i + 1}: Centered inverted pyramid tier with '${symbol}'.`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },
  {
    id: "ast_006",
    name: "Diamond Pattern",
    category: "Pyramid",
    difficulty: "Medium",
    description: "Combines an upper pyramid and a lower inverted pyramid to form a diamond shape.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(spaces + symbols);
      }
      for (let i = rows - 1; i >= 1; i--) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(spaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      let stepCount = 1;
      for (let i = 1; i <= rows; i++) {
        const line = " ".repeat((rows - i) * halfUnit) + (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: stepCount++, row: i, lineAdded: line, explanation: `Upper Diamond Row ${i}`, fullOutput: currentOutput.join("\n") });
      }
      for (let i = rows - 1; i >= 1; i--) {
        const line = " ".repeat((rows - i) * halfUnit) + (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: stepCount++, row: rows + (rows - i), lineAdded: line, explanation: `Lower Diamond Row ${rows - i}`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "ast_007",
    name: "Hollow Square",
    category: "Advanced",
    difficulty: "Medium",
    description: "Prints border symbols around an empty interior.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        if (i === 1 || i === rows) {
          res.push((symbol + sp).repeat(rows).trimEnd());
        } else {
          const middleSpaces = " ".repeat((rows - 2) * unitWidth + spacePadding);
          res.push(symbol + middleSpaces + symbol);
        }
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        let line = "";
        if (i === 1 || i === rows) {
          line = (symbol + sp).repeat(rows).trimEnd();
        } else {
          const middleSpaces = " ".repeat((rows - 2) * unitWidth + spacePadding);
          line = symbol + middleSpaces + symbol;
        }
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Hollow square line`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "ast_008",
    name: "Hollow Pyramid",
    category: "Advanced",
    difficulty: "Hard",
    description: "Pyramid with stars only at outer boundary edges.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth, halfUnit } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const outerSpaces = " ".repeat((rows - i) * halfUnit);
        if (i === 1) {
          res.push(outerSpaces + symbol);
        } else if (i === rows) {
          res.push((symbol + sp).repeat(rows).trimEnd());
        } else {
          const innerSpaces = " ".repeat((i - 2) * unitWidth + spacePadding);
          res.push(outerSpaces + symbol + innerSpaces + symbol);
        }
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth, halfUnit } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const outerSpaces = " ".repeat((rows - i) * halfUnit);
        let line = "";
        if (i === 1) {
          line = outerSpaces + symbol;
        } else if (i === rows) {
          line = (symbol + sp).repeat(rows).trimEnd();
        } else {
          const innerSpaces = " ".repeat((i - 2) * unitWidth + spacePadding);
          line = outerSpaces + symbol + innerSpaces + symbol;
        }
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Hollow pyramid boundary tier.`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "ast_009",
    name: "Hourglass X-Pattern",
    category: "Advanced",
    difficulty: "Hard",
    description: "Inverted pyramid on top, upright pyramid on bottom meeting at apex.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = rows; i >= 1; i--) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(spaces + symbols);
      }
      for (let i = 2; i <= rows; i++) {
        const spaces = " ".repeat((rows - i) * halfUnit);
        const symbols = (symbol + sp).repeat(i).trimEnd();
        res.push(spaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, halfUnit } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      let stepCount = 1;
      for (let i = rows; i >= 1; i--) {
        const line = " ".repeat((rows - i) * halfUnit) + (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: stepCount++, row: stepCount, lineAdded: line, explanation: `Upper Hourglass row`, fullOutput: currentOutput.join("\n") });
      }
      for (let i = 2; i <= rows; i++) {
        const line = " ".repeat((rows - i) * halfUnit) + (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: stepCount++, row: stepCount, lineAdded: line, explanation: `Lower Hourglass row`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "ast_010",
    name: "Butterfly Pattern",
    category: "Advanced",
    difficulty: "Hard",
    description: "Symmetrical wing-like shape created by left/right triangles with middle spaces.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const left = (symbol + sp).repeat(i);
        const spaces = " ".repeat(2 * (rows - i) * unitWidth);
        const right = (symbol + sp).repeat(i).trimEnd();
        res.push(left + spaces + right);
      }
      for (let i = rows; i >= 1; i--) {
        const left = (symbol + sp).repeat(i);
        const spaces = " ".repeat(2 * (rows - i) * unitWidth);
        const right = (symbol + sp).repeat(i).trimEnd();
        res.push(left + spaces + right);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      let stepCount = 1;
      for (let i = 1; i <= rows; i++) {
        const line = (symbol + sp).repeat(i) + " ".repeat(2 * (rows - i) * unitWidth) + (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: stepCount++, row: i, lineAdded: line, explanation: `Upper butterfly wing row ${i}`, fullOutput: currentOutput.join("\n") });
      }
      for (let i = rows; i >= 1; i--) {
        const line = (symbol + sp).repeat(i) + " ".repeat(2 * (rows - i) * unitWidth) + (symbol + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: stepCount++, row: stepCount, lineAdded: line, explanation: `Lower butterfly wing row`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "ast_011",
    name: "Odd Star Pyramid (2*i - 1)",
    category: "Pyramid",
    difficulty: "Medium",
    description: "Classic CS pyramid where row i prints (2*i - 1) symbols without inter-symbol spaces (1, 3, 5, 7, 9...).",
    defaultRows: 5,
    defaultSpaces: 0,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 0, symbol = "*") => {
      const { symLen } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const spaces = " ".repeat((rows - i) * symLen);
        const symbols = symbol.repeat(2 * i - 1);
        res.push(spaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 0, symbol = "*") => {
      const { symLen } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const spaces = " ".repeat((rows - i) * symLen);
        const symbols = symbol.repeat(2 * i - 1);
        const line = spaces + symbols;
        currentOutput.push(line);
        steps.push({
          step: i,
          row: i,
          lineAdded: line,
          explanation: `Row ${i}: Print ${rows - i} lead spaces, then ${2 * i - 1} '${symbol}' symbol(s).`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },
  {
    id: "ast_012",
    name: "Inverted Odd Star Pyramid",
    category: "Pyramid",
    difficulty: "Medium",
    description: "Upside-down pyramid starting at (2*rows - 1) symbols tapering down to 1 symbol.",
    defaultRows: 5,
    defaultSpaces: 0,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 0, symbol = "*") => {
      const { symLen } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = rows; i >= 1; i--) {
        const spaces = " ".repeat((rows - i) * symLen);
        const symbols = symbol.repeat(2 * i - 1);
        res.push(spaces + symbols);
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 0, symbol = "*") => {
      const { symLen } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      let stepCount = 1;
      for (let i = rows; i >= 1; i--) {
        const spaces = " ".repeat((rows - i) * symLen);
        const symbols = symbol.repeat(2 * i - 1);
        const line = spaces + symbols;
        currentOutput.push(line);
        steps.push({
          step: stepCount++,
          row: stepCount,
          lineAdded: line,
          explanation: `Row ${stepCount}: Print ${rows - i} lead spaces, then ${2 * i - 1} '${symbol}' symbol(s).`,
          fullOutput: currentOutput.join("\n")
        });
      }
      return steps;
    }
  },

  // --- NUMBER PATTERNS ---
  {
    id: "num_001",
    name: "Sequential Number Pyramid",
    category: "Number",
    difficulty: "Easy",
    description: "Prints numbers from 1 to i in each row i.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "1",
    isSymbolCustomizable: false,
    generateOutput: (rows, spacePadding = 1) => {
      const sp = " ".repeat(spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        let line = [];
        for (let j = 1; j <= i; j++) line.push(j);
        res.push(line.join(sp));
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1) => {
      const sp = " ".repeat(spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        let lineArr = [];
        for (let j = 1; j <= i; j++) lineArr.push(j);
        const line = lineArr.join(sp);
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Print 1 to ${i}`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "num_002",
    name: "Repeating Row Number",
    category: "Number",
    difficulty: "Easy",
    description: "Prints row index i repeated i times.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "1",
    isSymbolCustomizable: false,
    generateOutput: (rows, spacePadding = 1) => {
      const sp = " ".repeat(spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        res.push((i.toString() + sp).repeat(i).trimEnd());
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1) => {
      const sp = " ".repeat(spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const line = (i.toString() + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Repeat number '${i}' ${i} times.`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "num_004",
    name: "Floyd's Triangle",
    category: "Number",
    difficulty: "Medium",
    description: "Continuously increments a counter from 1 across all rows.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "1",
    isSymbolCustomizable: false,
    generateOutput: (rows, spacePadding = 1) => {
      const sp = " ".repeat(spacePadding);
      let res = [];
      let count = 1;
      for (let i = 1; i <= rows; i++) {
        let line = [];
        for (let j = 1; j <= i; j++) line.push(count++);
        res.push(line.join(sp));
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1) => {
      const sp = " ".repeat(spacePadding);
      const steps = [];
      let currentOutput = [];
      let count = 1;
      for (let i = 1; i <= rows; i++) {
        let lineArr = [];
        for (let j = 1; j <= i; j++) lineArr.push(count++);
        const line = lineArr.join(sp);
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Print continuous sequence.`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "num_005",
    name: "Pascal's Triangle",
    category: "Number",
    difficulty: "Medium",
    description: "Each number is the sum of the two numbers directly above it.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "1",
    isSymbolCustomizable: false,
    generateOutput: (rows) => {
      let res = [];
      for (let i = 0; i < rows; i++) {
        let val = 1;
        let line = [];
        const spaces = " ".repeat(rows - i - 1);
        for (let j = 0; j <= i; j++) {
          line.push(val);
          val = (val * (i - j)) / (j + 1);
        }
        res.push(spaces + line.join(" "));
      }
      return res.join("\n");
    },
    getStepByStepData: (rows) => {
      const steps = [];
      let currentOutput = [];
      for (let i = 0; i < rows; i++) {
        let val = 1;
        let lineArr = [];
        const spaces = " ".repeat(rows - i - 1);
        for (let j = 0; j <= i; j++) {
          lineArr.push(val);
          val = Math.floor((val * (i - j)) / (j + 1));
        }
        const line = spaces + lineArr.join(" ");
        currentOutput.push(line);
        steps.push({ step: i + 1, row: i + 1, lineAdded: line, explanation: `Row ${i + 1}: Pascal binomial coefficients`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "num_006",
    name: "Palindromic Number Pyramid",
    category: "Number",
    difficulty: "Medium",
    description: "Numbers count up to row index i and then count down back to 1.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "1",
    isSymbolCustomizable: false,
    generateOutput: (rows) => {
      let res = [];
      for (let i = 1; i <= rows; i++) {
        let spaces = " ".repeat(rows - i);
        let left = [];
        for (let j = 1; j <= i; j++) left.push(j);
        let right = [];
        for (let j = i - 1; j >= 1; j--) right.push(j);
        res.push(spaces + left.concat(right).join(""));
      }
      return res.join("\n");
    },
    getStepByStepData: (rows) => {
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        let spaces = " ".repeat(rows - i);
        let left = [];
        for (let j = 1; j <= i; j++) left.push(j);
        let right = [];
        for (let j = i - 1; j >= 1; j--) right.push(j);
        const line = spaces + left.concat(right).join("");
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Count 1 -> ${i} -> 1`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },

  // --- CHARACTER PATTERNS ---
  {
    id: "chr_001",
    name: "Alphabet Half Pyramid",
    category: "Character",
    difficulty: "Easy",
    description: "Prints letters 'A', 'B', 'C'... up to row position i.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "A",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "A") => {
      const startCharCode = symbol.charCodeAt(0) || 65;
      const { sp } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        let line = [];
        for (let j = 0; j < i; j++) {
          line.push(String.fromCharCode(startCharCode + j));
        }
        res.push(line.join(sp));
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "A") => {
      const startCharCode = symbol.charCodeAt(0) || 65;
      const { sp } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        let lineArr = [];
        for (let j = 0; j < i; j++) {
          lineArr.push(String.fromCharCode(startCharCode + j));
        }
        const line = lineArr.join(sp);
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Print starting from ${String.fromCharCode(startCharCode)}`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "chr_002",
    name: "Continuous Alphabet Triangle",
    category: "Character",
    difficulty: "Medium",
    description: "Increments character from A to Z across all rows continuously.",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "A",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "A") => {
      let charCode = symbol.charCodeAt(0) || 65;
      const { sp } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        let line = [];
        for (let j = 1; j <= i; j++) {
          line.push(String.fromCharCode(charCode++));
        }
        res.push(line.join(sp));
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "A") => {
      let charCode = symbol.charCodeAt(0) || 65;
      const { sp } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        let lineArr = [];
        for (let j = 1; j <= i; j++) {
          lineArr.push(String.fromCharCode(charCode++));
        }
        const line = lineArr.join(sp);
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Continuous character stream`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "chr_003",
    name: "Repeated Letter Pyramid",
    category: "Character",
    difficulty: "Easy",
    description: "Prints the same character across row i ('A' on row 1, 'B' on row 2...).",
    defaultRows: 5,
    defaultSpaces: 1,
    defaultSymbol: "A",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "A") => {
      const startCharCode = symbol.charCodeAt(0) || 65;
      const { sp } = getUnitConfig(symbol, spacePadding);
      let res = [];
      for (let i = 1; i <= rows; i++) {
        const char = String.fromCharCode(startCharCode + i - 1);
        res.push((char + sp).repeat(i).trimEnd());
      }
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "A") => {
      const startCharCode = symbol.charCodeAt(0) || 65;
      const { sp } = getUnitConfig(symbol, spacePadding);
      const steps = [];
      let currentOutput = [];
      for (let i = 1; i <= rows; i++) {
        const char = String.fromCharCode(startCharCode + i - 1);
        const line = (char + sp).repeat(i).trimEnd();
        currentOutput.push(line);
        steps.push({ step: i, row: i, lineAdded: line, explanation: `Row ${i}: Repeat letter '${char}' ${i} times`, fullOutput: currentOutput.join("\n") });
      }
      return steps;
    }
  },
  {
    id: "ast_013",
    name: "Heart Shape Pattern",
    category: "Advanced",
    difficulty: "Hard",
    description: "Draws a beautiful heart shape using nested loops. Demonstrates math-to-loop centering, lobe branching, and custom spacing.",
    defaultRows: 6,
    defaultSpaces: 1,
    defaultSymbol: "*",
    isSymbolCustomizable: true,
    generateOutput: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      const r = Math.max(6, rows);
      let res = [];
      
      // Upper part (two lobes)
      for (let i = Math.floor(r / 2); i <= r; i += 2) {
        const leftSpaces = " ".repeat(Math.max(0, Math.floor((r - i - 1) / 2)) * unitWidth);
        const lobe1 = (symbol + sp).repeat(i);
        const midSpaces = " ".repeat(Math.max(0, r - i) * unitWidth);
        const lobe2 = (symbol + sp).repeat(i).trimEnd();
        res.push(leftSpaces + lobe1 + midSpaces + lobe2);
      }
      
      // Lower part (inverted triangle)
      for (let i = r; i >= 1; i--) {
        const leftSpaces = " ".repeat(Math.max(0, r - i) * unitWidth);
        const symbols = (symbol + sp).repeat(2 * i - 1).trimEnd();
        res.push(leftSpaces + symbols);
      }
      
      return res.join("\n");
    },
    getStepByStepData: (rows, spacePadding = 1, symbol = "*") => {
      const { sp, unitWidth } = getUnitConfig(symbol, spacePadding);
      const r = Math.max(6, rows);
      const steps = [];
      let currentOutput = [];
      let stepCount = 1;
      
      // Upper part (two lobes)
      for (let i = Math.floor(r / 2); i <= r; i += 2) {
        const leftSpaces = " ".repeat(Math.max(0, Math.floor((r - i - 1) / 2)) * unitWidth);
        const lobe1 = (symbol + sp).repeat(i);
        const midSpaces = " ".repeat(Math.max(0, r - i) * unitWidth);
        const lobe2 = (symbol + sp).repeat(i).trimEnd();
        const line = leftSpaces + lobe1 + midSpaces + lobe2;
        currentOutput.push(line);
        steps.push({
          step: stepCount++,
          row: stepCount - 1,
          lineAdded: line,
          explanation: `Upper row: Print double lobes of width ${i} with center spaces.`,
          fullOutput: currentOutput.join("\n")
        });
      }
      
      // Lower part (inverted triangle)
      for (let i = r; i >= 1; i--) {
        const leftSpaces = " ".repeat(Math.max(0, r - i) * unitWidth);
        const symbols = (symbol + sp).repeat(2 * i - 1).trimEnd();
        const line = leftSpaces + symbols;
        currentOutput.push(line);
        steps.push({
          step: stepCount++,
          row: stepCount - 1,
          lineAdded: line,
          explanation: `Lower row: Centered inverted triangle width ${2 * i - 1}.`,
          fullOutput: currentOutput.join("\n")
        });
      }
      
      return steps;
    }
  }
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const formatOption = (val) => {
    return { value: String(val), label: String(val) };
};

const ensureUnique = (correct, distractors) => {
    const options = [correct];
    const seen = new Set([correct.value]);

    for (const opt of distractors) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            options.push(opt);
        }
    }

    // Fill if needed (basic fallback)
    let safety = 0;
    while (options.length < 4 && safety < 20) {
        const val = options[0].value + " " + (safety + 1); // Only triggers if extremely desperate
        if (!seen.has(val)) {
            seen.add(val);
            options.push({ value: val, label: options[0].label }); // Dup label, unique value
        }
        safety++;
    }

    return shuffleArray(options).slice(0, 4);
};

// Helper: Greatest Common Divisor
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// Helper: Least Common Multiple
const lcm = (a, b) => (a * b) / gcd(a, b);

// --- CAT01: Fundamental Operations on Natural and Whole Numbers ---
export const generateNaturalWholeNumbers = () => {
    const type = getRandomInt(0, 2); // 0: Add/Sub, 1: Mult/Div, 2: Properties
    let question, answer;

    if (type === 0) {
        const a = getRandomInt(1000, 9999);
        const b = getRandomInt(100, 9999);
        const op = Math.random() > 0.5 ? '+' : '-';
        if (op === '+') {
            question = `${a} + ${b} = ?`;
            answer = String(a + b);
        } else {
            // Ensure positive result for "Natural/Whole Numbers" usually
            const max = Math.max(a, b);
            const min = Math.min(a, b);
            question = `${max} - ${min} = ?`;
            answer = String(max - min);
        }
    } else if (type === 1) {
        const a = getRandomInt(10, 100);
        const b = getRandomInt(2, 20);
        const op = Math.random() > 0.5 ? '*' : '/';
        if (op === '*') {
            question = `${a} \\times ${b} = ?`;
            answer = String(a * b);
        } else {
            // Ensure divisibility
            const dividend = a * b;
            question = `${dividend} \\div ${b} = ?`;
            answer = String(a);
        }
    } else {
        // Properties question (e.g. Successor/Predecessor)
        const n = getRandomInt(100, 10000);
        if (Math.random() > 0.5) {
            question = `What is the successor of ${n}?`;
            answer = String(n + 1);
        } else {
            question = `What is the predecessor of ${n}?`;
            answer = String(n - 1);
        }
    }

    // Options
    const ansNum = Number(answer);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(ansNum + 1),
        formatOption(ansNum - 1),
        formatOption(ansNum + 10)
    ]);

    return {
        type: Math.random() > 0.5 ? 'mcq' : 'userInput',
        question,
        answer,
        options,
        topic: 'Natural and Whole Numbers'
    };
};

// --- CAT02: Fundamental Operations On Integers ---
export const generateIntegers = () => {
    const a = getRandomInt(-50, 50);
    const b = getRandomInt(-50, 50);
    const op = ['+', '-', '*', '/'][getRandomInt(0, 3)]; // removed '/' if non-integer result needed, handling below

    let question, answer;

    if (op === '/') {
        // Ensure integer division
        let divisor = b === 0 ? 1 : b; // Avoid div by zero
        let quotient = getRandomInt(-20, 20);
        let dividend = quotient * divisor;
        question = `${dividend} \\div (${divisor}) = ?`;
        answer = String(quotient);
    } else if (op === '*') {
        question = `${a} \\times (${b}) = ?`;
        answer = String(a * b);
    } else if (op === '-') {
        question = `${a} - (${b}) = ?`;
        answer = String(a - b);
    } else {
        question = `${a} + (${b}) = ?`;
        answer = String(a + b);
    }

    const ansNum = Number(answer);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(-ansNum),
        formatOption(ansNum + 1),
        formatOption(ansNum - 1)
    ]);

    // De-dupe options if 0 or similar
    const unique = new Set(options.map(o => o.value));
    while (unique.size < 4) {
        unique.add(String(ansNum + getRandomInt(2, 10)));
    }

    return {
        type: 'mcq', // Keep mixed?
        question,
        answer,
        options: Array.from(unique).map(v => formatOption(v)).slice(0, 4),
        topic: 'Integers'
    };
};

// --- CAT03: Fractions ---
export const generateFractions = () => {
    // Add/Sub/Mult/Div fractions
    const type = getRandomInt(0, 3);
    const n1 = getRandomInt(1, 9);
    const d1 = getRandomInt(2, 9);
    const n2 = getRandomInt(1, 9);
    const d2 = getRandomInt(2, 9);

    let num, den, opSymbol;

    if (type === 0) { // Add
        // n1/d1 + n2/d2 = (n1d2 + n2d1) / (d1d2)
        num = n1 * d2 + n2 * d1;
        den = d1 * d2;
        opSymbol = '+';
    } else if (type === 1) { // Sub
        num = n1 * d2 - n2 * d1;
        den = d1 * d2;
        opSymbol = '-';
    } else if (type === 2) { // Mult
        num = n1 * n2;
        den = d1 * d2;
        opSymbol = '\\times';
    } else { // Div
        // (n1/d1) / (n2/d2) = (n1*d2) / (d1*n2)
        num = n1 * d2;
        den = d1 * n2;
        opSymbol = '\\div';
    }

    // Simplify
    const common = gcd(Math.abs(num), Math.abs(den));
    const simpleNum = num / common;
    const simpleDen = den / common;

    const question = `$\\frac{${n1}}{${d1}} ${opSymbol} \\frac{${n2}}{${d2}} = ?$`;
    const answer = simpleDen === 1 ? String(simpleNum) : `${simpleNum}/${simpleDen}`;
    const latexAnswer = simpleDen === 1 ? String(simpleNum) : `$\\frac{${simpleNum}}{${simpleDen}}$`;

    // Distractors
    const options = ensureUnique(
        { value: answer, label: latexAnswer },
        [
            { value: simpleDen === 1 ? String(simpleNum + 1) : `${simpleNum + 1}/${simpleDen}`, label: simpleDen === 1 ? String(simpleNum + 1) : `$\\frac{${simpleNum + 1}}{${simpleDen}}$` },
            { value: simpleDen === 1 ? String(simpleNum - 1) : `${simpleNum}/${simpleDen + 1}`, label: simpleDen === 1 ? String(simpleNum - 1) : `$\\frac{${simpleNum}}{${simpleDen + 1}}$` },
            { value: "1", label: "$1$" },
            { value: "0", label: "$0$" },
            { value: simpleDen === 1 ? String(simpleNum + 2) : `${simpleNum + 2}/${simpleDen}`, label: simpleDen === 1 ? String(simpleNum + 2) : `$\\frac{${simpleNum + 2}}{${simpleDen}}$` }
        ]
    );
    // Ensure unique options logic omitted for brevity, adding roughly safe ones

    return {
        type: 'mcq',
        question,
        answer, // Store string logic like "3/4"
        options,
        topic: 'Fractions'
    };
};

// --- CAT04: Fundamental operations on decimals ---
export const generateDecimals = () => {
    const a = (getRandomInt(10, 1000) / 100).toFixed(2);
    const b = (getRandomInt(10, 1000) / 100).toFixed(2);
    const op = getRandomInt(0, 1); // Add/Sub mostly for simplicity, Mult can get messy decimals

    let val;
    let question;
    if (op === 0) {
        question = `$${a} + ${b} = ?$`;
        val = (parseFloat(a) + parseFloat(b)).toFixed(2);
    } else {
        // ensure a > b
        const max = Math.max(parseFloat(a), parseFloat(b));
        const min = Math.min(parseFloat(a), parseFloat(b));
        question = `$${max.toFixed(2)} - ${min.toFixed(2)} = ?$`;
        val = (max - min).toFixed(2);
    }

    const answer = String(val);
    const options = shuffleArray([
        { value: answer, label: answer },
        { value: (parseFloat(val) + 0.1).toFixed(2), label: (parseFloat(val) + 0.1).toFixed(2) },
        { value: (parseFloat(val) - 0.1).toFixed(2), label: (parseFloat(val) - 0.1).toFixed(2) },
        { value: (parseFloat(val) * 10).toFixed(2), label: (parseFloat(val) * 10).toFixed(2) }
    ]);

    return {
        type: 'mcq',
        question,
        answer,
        options,
        topic: 'Decimals'
    };
};

// --- CAT11: BODMAS ---
export const generateBODMAS = () => {
    // a + b * c - d
    const a = getRandomInt(1, 10);
    const b = getRandomInt(1, 10);
    const c = getRandomInt(1, 10);
    const d = getRandomInt(1, 20);

    // (a + b) * c - d or a + b * (c - d) etc.
    const type = getRandomInt(0, 2);
    let question, val;

    if (type === 0) {
        question = `$${a} + ${b} \\times ${c} - ${d} = ?$`;
        val = a + (b * c) - d;
    } else if (type === 1) {
        question = `$(${a} + ${b}) \\times ${c} - ${d} = ?$`;
        val = (a + b) * c - d;
    } else {
        question = `$${a} + ${b} \\times (${c} - ${d}) = ?$`;
        val = a + b * (c - d);
    }

    const answer = String(val);
    const options = shuffleArray([
        { value: answer, label: answer },
        { value: String(val + 10), label: String(val + 10) },
        { value: String(val - 5), label: String(val - 5) },
        { value: String(val * 2), label: String(val * 2) }
    ]);

    return {
        type: 'mcq',
        question,
        answer,
        options,
        topic: 'BODMAS'
    };
};

// --- CAT05: Least Common Multiple (LCM) ---
export const generateLCM = () => {
    const a = getRandomInt(4, 20);
    const b = getRandomInt(4, 20);
    const val = lcm(a, b);

    const question = `Find the Least Common Multiple (LCM) of ${a} and ${b}.`;
    const answer = String(val);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(val + getRandomInt(1, 5) * a),
        formatOption(Math.max(a, b)),
        formatOption(a * b)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Least Common Multiple' };
};

// --- CAT06: Highest Common Factor (HCF) ---
export const generateHCF = () => {
    const a = getRandomInt(12, 100);
    const b = getRandomInt(12, 100);
    const val = gcd(a, b);
    const question = `Find the Highest Common Factor (HCF) of ${a} and ${b}.`;
    const answer = String(val);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(1),
        formatOption(Math.min(a, b)),
        formatOption(2)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Highest Common Factor' };
};

// --- CAT07: Ratio and Proportion ---
export const generateRatioProportion = () => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const x = getRandomInt(5, 15);
    const y = (b * x) / a;
    // a : b :: x : ? => ? = b*x/a
    // Ensure integer result
    let realX = x;
    if (y % 1 !== 0) realX = x * a; // adjust to make it divisible
    const realY = (b * realX) / a;

    const question = `If ${a}:${b} :: ${realX}:x, find x.`;
    const answer = String(realY);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(realY + 1),
        formatOption(realY - 1),
        formatOption(realY + 2)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Ratio and Proportion' };
};

// --- CAT08: Finding Square and Square Roots ---
export const generateSquareRoots = () => {
    const isSquare = Math.random() > 0.5;
    let question, answer;
    if (isSquare) {
        const n = getRandomInt(2, 20);
        question = `Find the square of ${n}.`;
        answer = String(n * n);
    } else {
        const n = getRandomInt(2, 20);
        const sq = n * n;
        question = `Find the square root of ${sq}.`;
        answer = String(n);
    }
    const val = Number(answer);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(val + 1),
        formatOption(val - 1),
        formatOption(isSquare ? val + 10 : val + 2)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Square and Square Roots' };
};

// --- CAT09: Finding Cube and Cube Roots ---
export const generateCubeRoots = () => {
    const isCube = Math.random() > 0.5;
    let question, answer;
    if (isCube) {
        const n = getRandomInt(2, 10);
        question = `Find the cube of ${n}.`;
        answer = String(n * n * n);
    } else {
        const n = getRandomInt(2, 10);
        const cb = n * n * n;
        question = `Find the cube root of ${cb}.`;
        answer = String(n);
    }
    const val = Number(answer);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(val + 1),
        formatOption(val - 1),
        formatOption(isCube ? val + 10 : val + 2)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Cube and Cube Roots' };
};

// --- CAT10: Laws of Exponents ---
export const generateExponents = () => {
    const rule = getRandomInt(0, 1);
    const a = getRandomInt(2, 5);
    const m = getRandomInt(2, 5);
    const n = getRandomInt(2, 5);
    let question, answerStr, val;
    if (rule === 0) {
        question = `Simplify $${a}^{${m}} \\times ${a}^{${n}}$`;
        answerStr = `$${a}^{${m + n}}$`;
        val = m + n;
    } else {
        question = `Simplify $(${a}^{${m}})^{${n}}$`;
        answerStr = `$${a}^{${m * n}}$`;
        val = m * n;
    }
    const options = shuffleArray([
        { value: answerStr, label: answerStr },
        { value: `$${a}^{${val + 1}}$`, label: `$${a}^{${val + 1}}$` },
        { value: `$${a}^{${Math.abs(val - 1)}}$`, label: `$${a}^{${Math.abs(val - 1)}}$` },
        { value: `$${a + 1}^{${val}}$`, label: `$${a + 1}^{${val}}$` }
    ]);
    return { type: 'mcq', question, answer: answerStr, options, topic: 'Laws of Exponents' };
};

// --- CAT12: Addition and Subtraction of Algebraic Expressions ---
export const generateAlgebraicAdditionSubtraction = () => {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 5);
    const c = getRandomInt(1, 5);
    const d = getRandomInt(1, 5);
    const termX = a + c;
    const termConst = b + d;
    const question = `Add: $( ${a}x + ${b} ) + ( ${c}x + ${d} )$`;
    const answer = `${termX}x + ${termConst}`;
    const options = shuffleArray([
        formatOption(answer),
        formatOption(`${termX}x - ${termConst}`),
        formatOption(`${termX + 1}x + ${termConst}`),
        formatOption(`${termX}x + ${termConst + 2}`)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Algebraic Aggregation' };
};

// --- CAT13: Multiplication of Algebraic Expressions ---
export const generateAlgebraicMultiplication = () => {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 5);
    const question = `Multiply: $${a} \\times ${b}x$`;
    const answer = `${a * b}x`;
    const options = ensureUnique(formatOption(answer), [
        formatOption(`${a * b}x^2`),
        formatOption(`${a + b}x`),
        formatOption(`${a * b + 1}x`),
        formatOption(`${a * b - 1}x`),
        formatOption(`${(a * b) + 2}x`)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Algebraic Multiplication' };
};

// --- CAT14: Division of Algebraic Expressions ---
export const generateAlgebraicDivision = () => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const coeff = a * b;
    const question = `Divide: $${coeff}x \\div ${a}$`;
    const answer = `${b}x`;
    const options = shuffleArray([
        formatOption(answer),
        formatOption(`${b}`),
        formatOption(`${b}x^2`),
        formatOption(`${b + 1}x`)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Algebraic Division' };
};

// --- CAT15: Solve Linear Equation in one variable ---
export const generateLinearEquationOneVar = () => {
    const x = getRandomInt(1, 10);
    const a = getRandomInt(2, 5);
    const b = getRandomInt(1, 10);
    const c = a * x + b;
    const question = `Solve for x: $${a}x + ${b} = ${c}$`;
    const answer = String(x);
    const options = ensureUnique(formatOption(answer), [
        formatOption(x + 1),
        formatOption(x - 1),
        formatOption(x * 2),
        formatOption(x + 2),
        formatOption(x - 2)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Linear Equations 1 Var' };
};

// --- CAT16: Solve Simultaneous Linear Equations ---
export const generateSimultaneousEquations = () => {
    const x = getRandomInt(2, 8);
    const roots = [getRandomInt(1, 5), getRandomInt(1, 5)]; // keep simple roots
    const sum = roots[0] + roots[1];
    const prod = roots[0] * roots[1];
    const term2 = sum >= 0 ? `- ${sum}x` : `+ ${Math.abs(sum)}x`;
    const term3 = prod >= 0 ? `+ ${prod}` : `- ${Math.abs(prod)}`;
    const question = `Find the roots: $x^2 ${term2} ${term3} = 0$`;
    const answer = `${roots[0]}, ${roots[1]}`;
    // Dedupe answer before logic
    const options = shuffleArray([
        formatOption(answer),
        formatOption(`${roots[0] + 1}, ${roots[1]}`),
        formatOption(`${roots[0]}, ${roots[1] + 1}`),
        formatOption(`${roots[0] + 1}, ${roots[1] + 1}`)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Quadratic Equations' };
};

// --- CAT18: Perimeter of Plane Figures ---
export const generatePerimeter = () => {
    const s = getRandomInt(3, 10);
    const question = `Find the perimeter of a square with side ${s} units.`;
    const answer = String(4 * s);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(s * s),
        formatOption(2 * s),
        formatOption(4 * s + 4)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Perimeter' };
};

// --- CAT19: Area of Plane Figures ---
export const generateArea = () => {
    const l = getRandomInt(3, 10);
    const w = getRandomInt(3, 10);
    const question = `Find the area of a rectangle with length ${l} and width ${w}.`;
    const answer = String(l * w);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(2 * (l + w)),
        formatOption(l * w + 5),
        formatOption(l + w)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Area' };
};

// --- CAT20: Locating a point in a Cartesian Plane ---
export const generateCartesianPoint = () => {
    const x = getRandomInt(-5, 5);
    const y = getRandomInt(-5, 5);
    const question = `Which quadrant (or axis) does the point (${x}, ${y}) lie in?`;
    let answer;
    if (x > 0 && y > 0) answer = "Quadrant I";
    else if (x < 0 && y > 0) answer = "Quadrant II";
    else if (x < 0 && y < 0) answer = "Quadrant III";
    else if (x > 0 && y < 0) answer = "Quadrant IV";
    else if (x === 0 && y === 0) answer = "Origin";
    else answer = x === 0 ? "Y-axis" : "X-axis";

    const allOptions = ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV", "X-axis", "Y-axis", "Origin"];
    const unique = new Set([answer, "Quadrant I", "Quadrant II", "Quadrant III", "X-axis"]);
    const finalOptions = Array.from(unique).slice(0, 4).map(v => formatOption(v));
    return { type: 'mcq', question, answer, options: finalOptions, topic: 'Cartesian Point' };
};

// --- CAT21: Coordinate Geometry ---
export const generateCoordinateGeometry = () => {
    const x = [3, 6, 5, 8, 9][getRandomInt(0, 4)];
    const y = [4, 8, 12, 15, 12][getRandomInt(0, 4)];
    const dist = Math.sqrt(x * x + y * y).toFixed(2);
    const question = `Find the distance of point (${x}, ${y}) from the origin.`;
    const answer = String(Number(dist) === parseInt(dist) ? parseInt(dist) : dist);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(parseInt(answer) + 1),
        formatOption(parseInt(answer) - 1),
        formatOption(parseInt(answer) + 2)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Coordinate Geometry' };
};

// --- CAT22: Section Formula ---
export const generateSectionFormula = () => {
    const x1 = 2, y1 = 4;
    const x2 = 6, y2 = 8;
    const question = `Find the midpoint of the line segment joining (${x1}, ${y1}) and (${x2}, ${y2}).`;
    const answer = `(4, 6)`;
    const options = shuffleArray([
        formatOption(answer),
        formatOption(`(3, 5)`),
        formatOption(`(5, 7)`),
        formatOption(`(2, 4)`)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Section Formula' };
};

// --- CAT23: Trigonometry ---
export const generateTrigonometry = () => {
    const question = "What is the value of $\\sin 90^\\circ$?";
    const answer = "1";
    const options = shuffleArray([
        formatOption("1"),
        formatOption("0"),
        formatOption("1/2"),
        formatOption("-1")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Trigonometry' };
};

// --- CAT24: Trigonometric Ratios of Standard angles ---
export const generateTrigRatios = () => {
    const question = "Evaluate: $\\tan 45^\\circ$";
    const answer = "1";
    const options = shuffleArray([
        formatOption("1"),
        formatOption("0"),
        formatOption("sqrt(3)"),
        formatOption("1/sqrt(3)")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Trig Ratios' };
};

// --- CAT25: Word Problems - Pythagorean Theorem ---
export const generatePythagoras = () => {
    const b = 3, h = 4;
    const question = `In a right-angled triangle, if base is ${b} and height is ${h}, find the hypotenuse.`;
    const answer = "5";
    const options = shuffleArray([
        formatOption("5"),
        formatOption("6"),
        formatOption("7"),
        formatOption("25")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Pythagoras' };
};

// --- CAT26: Clocks – Angle between hands ---
export const generateClocks = () => {
    const h = 3;
    const question = `Find the angle between the hour and minute hands at ${h}:00.`;
    const answer = "90 degrees";
    const options = shuffleArray([
        formatOption("90 degrees"),
        formatOption("180 degrees"),
        formatOption("60 degrees"),
        formatOption("45 degrees")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Clocks' };
};

// --- CAT27: Probability ---
export const generateProbability = () => {
    const question = "Probability of getting a head in a single coin toss?";
    const answer = "1/2";
    const options = shuffleArray([
        formatOption("1/2"),
        formatOption("1/4"),
        formatOption("1"),
        formatOption("0")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Probability' };
};

// --- CAT28: Word Problem - Linear Equation in One Variable ---
export const generateWordProblemLinearEq = () => {
    const n = getRandomInt(1, 10);
    const sum = n + (n + 1);
    const question = `The sum of two consecutive integers is ${sum}. Find the smaller integer.`;
    const answer = String(n);
    const options = shuffleArray([
        formatOption(answer),
        formatOption(n + 1),
        formatOption(n - 1),
        formatOption(sum)
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Linear Eq Word Problem' };
};

// --- CAT29: Word Problem ---
export const generateWordProblem = () => {
    const cp = 100;
    const sp = 120;
    const question = `A book is bought for 100 and sold for 120. Find the profit percentage.`;
    const answer = "20%";
    const options = shuffleArray([
        formatOption("20%"),
        formatOption("10%"),
        formatOption("25%"),
        formatOption("15%")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'General Word Problem' };
};

// --- CAT30: Miscellaneous ---
export const generateMiscellaneous = () => {
    const question = "How many degrees are there in a circle?";
    const answer = "360";
    const options = shuffleArray([
        formatOption("360"),
        formatOption("180"),
        formatOption("90"),
        formatOption("270")
    ]);
    return { type: 'mcq', question, answer, options, topic: 'Miscellaneous' };
};

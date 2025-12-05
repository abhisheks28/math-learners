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
        if (options.length >= 4) break;
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            options.push(opt);
        }
    }

    let safety = 0;
    while (options.length < 4 && safety < 20) {
        const val = options[0].value + " " + (safety + 1);
        let newVal = val;
        let newLabel = options[0].label;

        const numVal = parseFloat(options[0].value);
        if (!isNaN(numVal)) {
            const jitter = numVal + (Math.random() > 0.5 ? 1 : -1) * (safety + 1);
            newVal = String(jitter);
            newLabel = String(jitter);
        }

        if (!seen.has(newVal)) {
            seen.add(newVal);
            options.push({ value: newVal, label: newLabel });
        }
        safety++;
    }

    return shuffleArray(options).slice(0, 4);
};

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

// --- CAT01: Fundamental Operations on Natural and Whole Numbers ---
export const generateNaturalWholeNumbers = () => {
    const rows = [];
    const a1 = getRandomInt(10, 99);
    const b1 = getRandomInt(10, 99);
    rows.push({ left: a1, op: '+', right: b1, answer: String(a1 + b1) });

    const a2 = getRandomInt(100, 999);
    const b2 = getRandomInt(10, 99);
    const max2 = Math.max(a2, b2);
    const min2 = Math.min(a2, b2);
    rows.push({ left: max2, op: '-', right: min2, answer: String(max2 - min2) });

    const a3 = getRandomInt(10, 20);
    const b3 = getRandomInt(2, 9);
    rows.push({ left: a3, op: '×', right: b3, answer: String(a3 * b3) });

    const b4 = getRandomInt(2, 15);
    const q4 = getRandomInt(10, 50);
    const a4 = b4 * q4;
    rows.push({ left: a4, op: '÷', right: b4, answer: String(q4) });

    const answerObj = { 0: rows[0].answer, 1: rows[1].answer, 2: rows[2].answer, 3: rows[3].answer };
    return {
        type: 'tableInput',
        question: 'Solve the following operations:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Fundamental Operations on Natural and Whole Numbers'
    };
};

// --- CAT02: Fundamental Operations On Integers ---
export const generateIntegers = () => {
    const rows = [];
    const a1 = -1 * getRandomInt(2, 20);
    const b1 = -1 * getRandomInt(2, 20);
    rows.push({ left: `(${a1})`, op: '+', right: `(${b1})`, answer: String(a1 + b1) });

    const a2 = -1 * getRandomInt(2, 20);
    const b2 = -1 * getRandomInt(2, 20);
    rows.push({ left: `(${a2})`, op: '-', right: `(${b2})`, answer: String(a2 - b2) });

    const a3 = -1 * getRandomInt(2, 12);
    const b3 = -1 * getRandomInt(2, 12);
    rows.push({ left: `(${a3})`, op: '×', right: `(${b3})`, answer: String(a3 * b3) });

    const b4 = getRandomInt(2, 10);
    const q4 = -1 * getRandomInt(2, 12);
    const a4 = b4 * q4;
    rows.push({ left: `(${a4})`, op: '÷', right: `(${b4})`, answer: String(q4) });

    const answerObj = { 0: rows[0].answer, 1: rows[1].answer, 2: rows[2].answer, 3: rows[3].answer };
    return {
        type: 'tableInput',
        question: 'Solve the following integer operations:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Fundamental Operations On Integers'
    };
};

// --- CAT03: Fractions ---
export const generateFractions = () => {
    const rows = [];
    const d1 = getRandomInt(2, 9);
    const n1 = getRandomInt(1, d1 * 2);
    const n2 = getRandomInt(1, d1 * 2);
    const nAns1 = n1 + n2;
    rows.push({
        left: { n: n1, d: d1 }, op: '+', right: { n: n2, d: d1 },
        answer: { num: String(nAns1), den: String(d1) }
    });

    const d2 = getRandomInt(2, 9);
    const n3 = getRandomInt(5, 15);
    const n4 = getRandomInt(1, 4);
    const maxN = Math.max(n3, n4);
    const minN = Math.min(n3, n4);
    rows.push({
        left: { n: maxN, d: d2 }, op: '-', right: { n: minN, d: d2 },
        answer: { num: String(maxN - minN), den: String(d2) }
    });

    const n5 = getRandomInt(1, 4);
    const d5 = getRandomInt(2, 5);
    const n6 = getRandomInt(1, 4);
    const d6 = getRandomInt(2, 5);
    rows.push({
        left: { n: n5, d: d5 }, op: '×', right: { n: n6, d: d6 },
        answer: { num: String(n5 * n6), den: String(d5 * d6) }
    });

    const n7 = getRandomInt(1, 5);
    const d7 = getRandomInt(2, 6);
    const n8 = getRandomInt(1, 5);
    const d8 = getRandomInt(2, 6);
    rows.push({
        left: { n: n7, d: d7 }, op: '÷', right: { n: n8, d: d8 },
        answer: { num: String(n7 * d8), den: String(d7 * n8) }
    });

    const answerObj = { 0: rows[0].answer, 1: rows[1].answer, 2: rows[2].answer, 3: rows[3].answer };
    return {
        type: 'tableInput',
        variant: 'fraction',
        question: 'Solve the following fraction operations:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Fractions'
    };
};

// --- CAT04: Fundamental operations on decimals ---
export const generateDecimals = () => {
    const rows = [];
    const a1 = (getRandomInt(10, 99) / 100).toFixed(2);
    const b1 = (getRandomInt(10, 99) / 10).toFixed(1);
    const ans1 = (parseFloat(a1) + parseFloat(b1)).toFixed(2);
    rows.push({ left: a1, op: '+', right: b1, answer: String(ans1) });

    const a2 = (getRandomInt(50, 99) / 100).toFixed(2);
    const b2 = (getRandomInt(10, 40) / 100).toFixed(2);
    const ans2 = (parseFloat(a2) - parseFloat(b2)).toFixed(2);
    rows.push({ left: a2, op: '-', right: b2, answer: String(ans2) });

    const a3 = (getRandomInt(1, 9) / 10).toFixed(1);
    const b3 = (getRandomInt(1, 9) / 10).toFixed(1);
    const ans3 = (parseFloat(a3) * parseFloat(b3)).toFixed(2);
    rows.push({ left: a3, op: '×', right: b3, answer: String(ans3) });

    const divisor = getRandomInt(2, 9);
    const quotient = getRandomInt(2, 9);
    const dividendRaw = divisor * quotient;
    const a4 = (dividendRaw / 10).toFixed(1);
    const b4 = (divisor / 10).toFixed(1);
    const ans4 = String(quotient);
    rows.push({ left: a4, op: '÷', right: b4, answer: ans4 });

    const answerObj = { 0: rows[0].answer, 1: rows[1].answer, 2: rows[2].answer, 3: rows[3].answer };
    return {
        type: 'tableInput',
        question: 'Solve the following decimal operations:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Fundamental operations on decimals'
    };
};

// --- CAT05: LCM ---
export const generateLCM = () => {
    const rows = [];

    const a1 = getRandomInt(4, 15);
    const b1 = getRandomInt(4, 15);
    const val1 = lcm(a1, b1);
    rows.push({ text: `Find the LCM of ${a1}, ${b1}`, answer: String(val1) });

    const a2 = getRandomInt(12, 30);
    const b2 = getRandomInt(12, 30);
    const val2 = lcm(a2, b2);
    rows.push({ text: `Find the LCM of ${a2}, ${b2}`, answer: String(val2) });

    const a3 = getRandomInt(3, 10);
    const b3 = getRandomInt(3, 10);
    const c3 = getRandomInt(3, 10);
    const val3 = lcm(a3, lcm(b3, c3));
    rows.push({ text: `Find the LCM of ${a3}, ${b3}, ${c3}`, answer: String(val3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Find the Least Common Multiple (LCM) for the following numbers:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Least Common Multiple'
    };
};

// --- CAT06: HCF ---
export const generateHCF = () => {
    const rows = [];

    const a1 = getRandomInt(12, 40);
    const b1 = getRandomInt(12, 40);
    const val1 = gcd(a1, b1);
    rows.push({ text: `Find the HCF of ${a1}, ${b1}`, answer: String(val1) });

    const a2 = getRandomInt(20, 60);
    const b2 = getRandomInt(20, 60);
    const val2 = gcd(a2, b2);
    rows.push({ text: `Find the HCF of ${a2}, ${b2}`, answer: String(val2) });

    const factor = getRandomInt(2, 6);
    const a3 = factor * getRandomInt(3, 8);
    const b3 = factor * getRandomInt(3, 8);
    const c3 = factor * getRandomInt(3, 8);
    const val3 = gcd(a3, gcd(b3, c3));
    rows.push({ text: `Find the HCF of ${a3}, ${b3}, ${c3}`, answer: String(val3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Find the Highest Common Factor (HCF) for the following numbers:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Highest Common Factor'
    };
};

// --- CAT07: Ratio and Proportion ---
export const generateRatioProportion = () => {
    const rows = [];

    // Q1: Direct ratio problem
    const a1 = getRandomInt(2, 5);
    const b1 = getRandomInt(2, 5);
    const x1 = getRandomInt(5, 12);
    const y1 = (b1 * x1) / a1;
    // ensure integer answer
    const adjX1 = (y1 % 1 === 0) ? x1 : x1 * a1;
    const adjY1 = (b1 * adjX1) / a1;
    rows.push({ text: `If ${a1}:${b1} :: ${adjX1}:x, find x`, answer: String(adjY1) });

    // Q2: Word simple
    const total = getRandomInt(20, 100);
    // ensure total divisible by sum of parts
    const ratioA = 2, ratioB = 3;
    const adjTotal = Math.ceil(total / 5) * 5;
    const shareB = (adjTotal / 5) * 3;
    rows.push({ text: `Divide ${adjTotal} in ratio 2:3. Value of second part?`, answer: String(shareB) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Solve the following Ratio and Proportion problems:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Ratio and Proportion'
    };
};

// --- CAT08: Square and Square Roots ---
export const generateSquareRoots = () => {
    const rows = [];

    const n1 = getRandomInt(11, 30);
    rows.push({ text: `Find the value of (${n1})²`, answer: String(n1 * n1) });

    const n2 = getRandomInt(12, 30);
    const sq2 = n2 * n2;
    rows.push({ text: `Find the value of √${sq2}`, answer: String(n2) });

    const n3 = getRandomInt(31, 50);
    rows.push({ text: `Find the value of (${n3})²`, answer: String(n3 * n3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Evaluate the following Squares and Square Roots:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Square and Square Roots'
    };
};

// --- CAT09: Cube and Cube Roots ---
export const generateCubeRoots = () => {
    const rows = [];

    const n1 = getRandomInt((-10), (-3)); // Negative cube
    rows.push({ text: `Find the value of (${n1})³`, answer: String(n1 * n1 * n1) });

    const n2 = getRandomInt(4, 12);
    const cb2 = n2 * n2 * n2;
    rows.push({ text: `Find the value of ∛${cb2}`, answer: String(n2) });

    const n3 = getRandomInt((-8), (-2));
    const cb3 = n3 * n3 * n3;
    rows.push({ text: `Find the value of ∛${cb3}`, answer: String(n3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Evaluate the following Cubes and Cube Roots:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Cube and Cube Roots'
    };
};

// --- CAT10: Laws of Exponents ---
export const generateExponents = () => {
    // Mix of 3 types: a^m * a^n, (a^m)^n, a^(-n)
    const type = getRandomInt(0, 2);
    let question, answerStr, val;
    const a = getRandomInt(2, 5);

    if (type === 0) {
        // a^m * a^n
        const m = getRandomInt(2, 5);
        const n = getRandomInt(2, 5);
        question = `Simplify $${a}^{${m}} \\times ${a}^{${n}}$`;
        answerStr = `$${a}^{${m + n}}$`;
        val = m + n;
    } else if (type === 1) {
        // (a^m)^n
        const m = getRandomInt(2, 4);
        const n = getRandomInt(2, 3);
        question = `Simplify $(${a}^{${m}})^{${n}}$`;
        answerStr = `$${a}^{${m * n}}$`;
        val = m * n;
    } else {
        // Negative exponent: Find value of (-a)^(-n) or similar
        // Image shows (-2)^(-2) -> 1/4 = 0.25 (options: -4, 1/4, -1/4, 4)
        const base = -1 * getRandomInt(2, 5);
        const exp = -1 * getRandomInt(2, 3); // -2 or -3
        question = `Find the value of $(${base})^{${exp}}$`;

        // precise calculation
        const realVal = Math.pow(base, exp);
        // format as fraction if possible
        const den = Math.pow(base, Math.abs(exp)); // e.g. (-2)^2 = 4, (-2)^3 = -8
        // answer string "1/4" or "-1/8"
        answerStr = (den > 0) ? `1/${den}` : `-1/${Math.abs(den)}`;

        // Custom distractors for this type
        const options = ensureUnique({ value: answerStr, label: answerStr }, [
            { value: String(den), label: String(den) },          // 4
            { value: String(-den), label: String(-den) },        // -4
            { value: (den > 0) ? `-1/${den}` : `1/${Math.abs(den)}`, label: (den > 0) ? `-1/${den}` : `1/${Math.abs(den)}` } // wrong sign fraction
        ]);
        return { type: 'mcq', question, answer: answerStr, options, topic: 'Laws of Exponents' };
    }

    const options = ensureUnique(
        { value: answerStr, label: answerStr },
        [
            { value: `$${a}^{${val + 1}}$`, label: `$${a}^{${val + 1}}$` },
            { value: `$${a}^{${Math.abs(val - 1)}}$`, label: `$${a}^{${Math.abs(val - 1)}}$` },
            { value: `$${a + 1}^{${val}}$`, label: `$${a + 1}^{${val}}$` },
            { value: `$${a}^{${val + 2}}$`, label: `$${a}^{${val + 2}}$` }
        ]
    );
    return { type: 'mcq', question, answer: answerStr, options, topic: 'Laws of Exponents' };
};

// --- CAT11: BODMAS ---
export const generateBODMAS = () => {
    // Convert to Table Input
    const rows = [];

    // Row 1: Simple mixed ops
    const a1 = getRandomInt(2, 9);
    const b1 = getRandomInt(2, 9);
    const c1 = getRandomInt(2, 9);
    // a + b * c
    const ans1 = a1 + (b1 * c1);
    rows.push({ text: `Evaluate: ${a1} + ${b1} × ${c1}`, answer: String(ans1) });

    // Row 2: Brackets
    const a2 = getRandomInt(2, 9);
    const b2 = getRandomInt(2, 9);
    const c2 = getRandomInt(2, 5);
    // (a + b) * c
    const ans2 = (a2 + b2) * c2;
    rows.push({ text: `Evaluate: (${a2} + ${b2}) × ${c2}`, answer: String(ans2) });

    // Row 3: Complex
    // a + b x (c - d)
    const a3 = getRandomInt(2, 10);
    const b3 = getRandomInt(2, 5);
    const c3 = getRandomInt(6, 12);
    const d3 = getRandomInt(2, 5); // ensure c-d > 0
    const ans3 = a3 + b3 * (c3 - d3);
    rows.push({ text: `Evaluate: ${a3} + ${b3} × (${c3} - ${d3})`, answer: String(ans3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Solve using BODMAS rules:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'BODMAS'
    };
};

// --- CAT12: Algebraic Aggregation ---
export const generateAlgebraicAdditionSubtraction = () => {
    // Keep as MCQ, but verify format matches image style (12x - 4y + 3z) + (-6x + 10y - 14z)
    const a1 = getRandomInt(5, 15);
    const b1 = getRandomInt(2, 9); // we'll make it negative in string
    const c1 = getRandomInt(2, 9);

    const a2 = -1 * getRandomInt(2, 9);
    const b2 = getRandomInt(5, 15);
    const c2 = -1 * getRandomInt(5, 15);

    // Question: (a1 x - b1 y + c1 z) + (a2 x + b2 y + c2 z)
    // Coeffs X: a1 + a2
    const resX = a1 + a2;
    // Coeffs Y: -b1 + b2
    const resY = -b1 + b2;
    // Coeffs Z: c1 + c2
    const resZ = c1 + c2;

    const question = `(${a1}x - ${b1}y + ${c1}z) + (${a2}x + ${b2}y ${c2}z)`;

    const formatTerm = (n, v) => {
        if (n === 0) return "";
        const sign = n > 0 ? "+" : "-";
        return `${sign}${Math.abs(n)}${v}`;
    };
    // First term doesn't need plus sign if positive
    let ansStr = `${resX}x`;
    ansStr += formatTerm(resY, 'y');
    ansStr += formatTerm(resZ, 'z');

    // distractors
    // error 1: subtract instead of add somewhere
    let d1 = `${resX}x` + formatTerm(resY - 2, 'y') + formatTerm(resZ, 'z');
    let d2 = `${resX + 1}x` + formatTerm(resY, 'y') + formatTerm(resZ, 'z');
    let d3 = `${resX}x` + formatTerm(resY, 'y') + formatTerm(resZ + 2, 'z');

    const options = ensureUnique({ value: ansStr, label: ansStr }, [
        { value: d1, label: d1 },
        { value: d2, label: d2 },
        { value: d3, label: d3 },
        { value: `${resX + 2}x${formatTerm(resY + 2, 'y')}${formatTerm(resZ + 2, 'z')}`, label: `${resX + 2}x${formatTerm(resY + 2, 'y')}${formatTerm(resZ + 2, 'z')}` }
    ]);

    return { type: 'mcq', question, answer: ansStr, options, topic: 'Algebraic Aggregation' };
};

// --- CAT13: Algebraic Multiplication ---
export const generateAlgebraicMultiplication = () => {
    // Keep as MCQ (binomial product) (2x + 3y)(3x - 4y)
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const c = getRandomInt(2, 5);
    const d = getRandomInt(2, 5);

    // (ax + by)(cx - dy)
    // ac x^2 - ad xy + bc xy - bd y^2
    // ac x^2 + (bc - ad) xy - bd y^2

    const term1 = a * c;
    const term2 = (b * c) - (a * d); // coeff of xy
    const term3 = b * d; // since it is -d, last term is -bd y^2

    const question = `(${a}x + ${b}y)(${c}x - ${d}y)`;

    const term2Str = term2 >= 0 ? `+ ${term2}xy` : `- ${Math.abs(term2)}xy`;
    const ansStr = `${term1}x^2 ${term2Str} - ${term3}y^2`;

    // format option wrapper
    const fo = (s) => ({ value: s, label: s });

    const options = ensureUnique(fo(ansStr), [
        fo(`${term1}x^2 - ${Math.abs(term2) + 2}xy - ${term3}y^2`),
        fo(`${term1}x^2 ${term2Str} + ${term3}y^2`), // wrong last sign
        fo(`${term1 + 1}x^2 ${term2Str} - ${term3}y^2`),
        fo(`${term1}x^2 + ${Math.abs(term2) + 5}xy - ${term3}y^2`)
    ]);

    return { type: 'mcq', question, answer: ansStr, options, topic: 'Algebraic Multiplication' };
};

// --- CAT14: Algebraic Division ---
export const generateAlgebraicDivision = () => {
    // Convert to Table Input
    // Format: (9x - 42) / (3x - 14) = 3
    const rows = [];

    // Q1: Constant factor
    const k1 = getRandomInt(2, 5);
    const a1 = getRandomInt(2, 5);
    const b1 = getRandomInt(5, 20); // (ax - b)
    // Numerator: k(ax - b) = k*a x - k*b
    const num1 = `${k1 * a1}x - ${k1 * b1}`;
    const den1 = `${a1}x - ${b1}`;
    rows.push({ text: `Divide: (${num1}) ÷ (${den1})`, answer: String(k1) });

    // Q2: Quadratic / Quadratic (2 common)
    // (k(ax^2 + bx + c)) / (ax^2 + bx + c)
    const k2 = getRandomInt(2, 4);
    const a2 = getRandomInt(2, 5);
    const b2 = getRandomInt(2, 5); // negative
    const c2 = getRandomInt(2, 5);
    // 14x^2 - 20x + 10 / 7x^2 - 10x + 5 (from image, k=2)
    const num2 = `${k2 * a2}x^2 - ${k2 * b2}x + ${k2 * c2}`;
    const den2 = `${a2}x^2 - ${b2}x + ${c2}`;
    rows.push({ text: `Divide: (${num2}) ÷ (${den2})`, answer: String(k2) });

    // Q3: Monomial division
    // 63 p^4 m^2 n / 7 p^4 m^2 n = 9
    const k3 = getRandomInt(3, 9);
    const c3 = getRandomInt(3, 9);
    const num3 = `${k3 * c3}p^4m^2n`;
    const den3 = `${c3}p^4m^2n`;
    rows.push({ text: `Divide: ${num3} ÷ ${den3}`, answer: String(k3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Solve the following Algebraic Divisions:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Algebraic Division'
    };
};

// --- CAT15: Linear Eq 1 Var ---
export const generateLinearEquationOneVar = () => {
    // Convert to Table Input
    // Format: 4x + 48 = 12 -> x = -9
    const rows = [];

    // Q1: ax + b = c
    const x1 = getRandomInt(2, 9); // let's keep x positive or negative
    const a1 = getRandomInt(2, 6);
    const b1 = getRandomInt(10, 50);
    // make lhs = c
    const c1 = a1 * x1 + b1;
    rows.push({ text: `Solve: ${a1}x + ${b1} = ${c1}`, answer: String(x1) });

    // Q2: ax - b = c
    const x2 = getRandomInt(2, 9);
    const a2 = getRandomInt(2, 6);
    const b2 = getRandomInt(5, 20);
    const c2 = a2 * x2 - b2;
    rows.push({ text: `Solve: ${a2}x - ${b2} = ${c2}`, answer: String(x2) });

    // Q3: Slightly harder? 2x = x + k
    // or variables on both sides? Image is simple 4x+48=12.
    // Let's do variables on both sides: 5x = 3x + 10
    const x3 = getRandomInt(2, 10);
    const diff = getRandomInt(2, 5); // 2x
    const rhs = diff * x3; // 10
    // 5x = 3x + 10 -> (3+diff)x = 3x + rhs
    rows.push({ text: `Solve: ${3 + diff}x = 3x + ${rhs}`, answer: String(x3) });

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Find the value of x for the following equations:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Linear Equations 1 Var'
    };
};

// --- CAT16: Simultaneous Equations ---
// --- CAT16: Simultaneous Equations ---
export const generateSimultaneousEquations = () => {
    // 5x - 4y = 81
    // 7x + 4y = 27
    const rows = [];

    // Generate integer solution
    const x = getRandomInt(1, 10);
    const y = getRandomInt(1, 10);

    // Eq 1: a1x + b1y = c1
    const a1 = getRandomInt(2, 9);
    const b1 = getRandomInt(2, 9);
    // Randomize signs
    const sign1 = Math.random() < 0.5 ? -1 : 1;
    const c1 = a1 * x + (sign1 * b1) * y;

    // Eq 2: a2x + b2y = c2
    const a2 = getRandomInt(2, 9);
    const b2 = getRandomInt(2, 9);
    // Ensure not parallel/identical lines
    const sign2 = Math.random() < 0.5 ? -1 : 1;
    const c2 = a2 * x + (sign2 * b2) * y;

    const op1 = sign1 === -1 ? '-' : '+';
    const op2 = sign2 === -1 ? '-' : '+';

    const eqText = `$$ \\begin{cases} ${a1}x ${op1} ${b1}y = ${c1} \\\\ ${a2}x ${op2} ${b2}y = ${c2} \\end{cases} $$`;

    rows.push({ text: `x =`, answer: String(x) });
    rows.push({ text: `y =`, answer: String(y) });

    const answerObj = { 0: String(x), 1: String(y) };

    return {
        type: 'tableInput',
        question: `Solve Simultaneous Linear Equations in Two Variables: <br/> ${eqText}`,
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Simultaneous Equations'
    };
};

// --- CAT17: Quadratic Equations ---
export const generateQuadraticEquation = () => {
    // x^2 - Sum x + Prod = 0
    // Ask for Smaller Root and Larger Root
    const rows = [];

    // Roots
    const r1 = getRandomInt(2, 9);
    const r2 = getRandomInt(r1 + 1, 12); // r2 > r1

    // eq: x^2 - (r1+r2)x + r1*r2 = 0
    const sum = r1 + r2;
    const prod = r1 * r2;
    const eq = `x^2 - ${sum}x + ${prod} = 0`;

    // Display equation using MathJax
    const eqText = `$$ ${eq} $$`;

    rows.push({ text: `Smaller Root (x_1) =`, answer: String(r1) });
    rows.push({ text: `Larger Root (x_2) =`, answer: String(r2) });



    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: `Solve the following Quadratic Equation: <br/> ${eqText}`,
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Quadratic Equations'
    };
};

// --- CAT18: Perimeter ---
// --- CAT18: Perimeter ---
export const generatePerimeter = () => {
    const rows = [];
    const shapeType = getRandomInt(1, 4); // 1: Circle, 2: Rectangle, 3: Square
    let questionText = "";
    let answer = "";

    if (shapeType === 1) {
        // Circle
        const r = 7 * getRandomInt(1, 5); // divisible by 7
        questionText = `Find the perimeter of circle with radius ${r} cm. (Take $\\pi = \\frac{22}{7}$)`;
        answer = String(2 * (22 / 7) * r);
    } else if (shapeType === 2) {
        // Rectangle
        const l = getRandomInt(5, 15);
        const w = getRandomInt(2, 10);
        questionText = `Find the perimeter of a rectangle with length ${l} cm and width ${w} cm.`;
        answer = String(2 * (l + w));
    } else {
        // Square
        const s = getRandomInt(4, 12);
        questionText = `Find the perimeter of a square with side ${s} cm.`;
        answer = String(4 * s);
    }

    rows.push({ text: `Perimeter =`, unit: 'cm', answer: answer });

    const answerObj = { 0: answer };

    return {
        type: 'tableInput',
        question: questionText,
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Perimeter of Plane Figures'
    };
};

// --- CAT19: Area ---
// --- CAT19: Area ---
export const generateArea = () => {
    const rows = [];

    // Logic: Triangle Area. Mixed Units.
    // Area (A) in sq.cm. Base (b) in m. Find Height (h) in cm.
    // A = 0.5 * (b_m * 100) * h_cm
    // => h_cm = (2 * A) / (b_m * 100)

    // Let's pick h_cm and b_cm first to ensure integers.
    const h_cm = getRandomInt(10, 300);
    // Picks b_cm from a set that converts nicely to meters (e.g. 4cm=0.04m, 20cm=0.2m, 50cm=0.5m)
    const baseOptionsCm = [2, 4, 5, 8, 10, 20, 25, 40, 50, 80];
    const b_cm = baseOptionsCm[getRandomInt(0, baseOptionsCm.length - 1)];

    const b_m = b_cm / 100; // e.g. 0.04
    const area = 0.5 * b_cm * h_cm; // in sq.cm

    // Text: "If the area of \triangle ABC is {area} sq.cm and the base measure {b_m} m then the height is in cm"
    // Use MathJax for triangle.
    const questionText = `If the area of $\\triangle ABC$ is ${area} sq.cm and the base measure ${b_m} m then the height is in cm`;

    rows.push({ text: `height =`, unit: 'cm', answer: String(h_cm) });

    const answerObj = { 0: String(h_cm) };

    return {
        type: 'tableInput',
        question: questionText,
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Area of Plane Figures'
    };
};

// --- CAT20: Cartesian Point ---
// --- CAT20: Cartesian Point ---
export const generateCartesianPoint = () => {
    // Show table with Points (x,y) -> Select Box [Quadrant-1, Quadrant-2, Quadrant-3, Quadrant-4]
    const rows = [];
    const options = ['Quadrant-1', 'Quadrant-2', 'Quadrant-3', 'Quadrant-4'];

    const getQuad = (x, y) => {
        if (x > 0 && y > 0) return 'Quadrant-1';
        if (x < 0 && y > 0) return 'Quadrant-2';
        if (x < 0 && y < 0) return 'Quadrant-3';
        if (x > 0 && y < 0) return 'Quadrant-4';
        return 'Quadrant-1';
    };

    for (let i = 0; i < 4; i++) {
        // Ensure non-zero coordinates to avoid axis ambiguity
        let x = getRandomInt(1, 15);
        let y = getRandomInt(1, 15);

        // Randomize signs
        if (Math.random() < 0.5) x *= -1;
        if (Math.random() < 0.5) y *= -1;

        rows.push({
            text: `(${x}, ${y})`,
            inputType: 'select',
            options: options,
            answer: getQuad(x, y)
        });
    }

    const answerObj = {};
    rows.forEach((r, i) => answerObj[i] = r.answer);

    return {
        type: 'tableInput',
        question: 'Select the quadrant in which the following points are present:',
        answer: JSON.stringify(answerObj),
        rows: rows,
        topic: 'Locating a point in a Cartesian Plane'
    };
};

// --- CAT21: Coordinate Geometry ---
export const generateCoordinateGeometry = () => {
    const x = [3, 6, 5, 8, 9][getRandomInt(0, 4)];
    const y = [4, 8, 12, 15, 12][getRandomInt(0, 4)];
    const dist = Math.sqrt(x * x + y * y).toFixed(2);
    const answer = String(Number(dist) === parseInt(dist) ? parseInt(dist) : dist);
    const options = ensureUnique(formatOption(answer), [
        formatOption(parseInt(answer) + 1),
        formatOption(parseInt(answer) - 1),
        formatOption(parseInt(answer) + 2),
        formatOption(parseInt(answer) + 5)
    ]);
    return { type: 'mcq', question: `Find the distance of point (${x}, ${y}) from the origin.`, answer, options, topic: 'Coordinate Geometry' };
};

// --- CAT22: Section Formula ---
export const generateSectionFormula = () => {
    const x1 = 2, y1 = 4;
    const x2 = 6, y2 = 8;
    const answer = `(4, 6)`;
    const options = ensureUnique(formatOption(answer), [
        formatOption(`(3, 5)`),
        formatOption(`(5, 7)`),
        formatOption(`(2, 4)`),
        formatOption(`(1, 2)`)
    ]);
    return { type: 'mcq', question: `Find the midpoint of the line segment joining (${x1}, ${y1}) and (${x2}, ${y2}).`, answer, options, topic: 'Section Formula' };
};

// --- CAT23: Trigonometry ---
export const generateTrigonometry = () => {
    const answer = "1";
    const options = ensureUnique(formatOption(answer), [
        formatOption("0"),
        formatOption("1/2"),
        formatOption("-1"),
        formatOption("sqrt(3)/2")
    ]);
    return { type: 'mcq', question: "What is the value of $\\sin 90^\\circ$?", answer, options, topic: 'Trigonometry' };
};

// --- CAT24: Trig Ratios ---
export const generateTrigRatios = () => {
    const answer = "1";
    const options = ensureUnique(formatOption(answer), [
        formatOption("0"),
        formatOption("sqrt(3)"),
        formatOption("1/sqrt(3)"),
        formatOption("2")
    ]);
    return { type: 'mcq', question: "Evaluate: $\\tan 45^\\circ$", answer, options, topic: 'Trig Ratios' };
};

// --- CAT25: Pythagoras ---
export const generatePythagoras = () => {
    const b = 3, h = 4;
    const answer = "5";
    const options = ensureUnique(formatOption(answer), [
        formatOption("6"),
        formatOption("7"),
        formatOption("25"),
        formatOption("4")
    ]);
    return { type: 'mcq', question: `In a right-angled triangle, if base is ${b} and height is ${h}, find the hypotenuse.`, answer, options, topic: 'Pythagoras' };
};

// --- CAT26: Clocks ---
export const generateClocks = () => {
    const h = 3;
    const answer = "90 degrees";
    const options = ensureUnique(formatOption(answer), [
        formatOption("180 degrees"),
        formatOption("60 degrees"),
        formatOption("45 degrees"),
        formatOption("30 degrees")
    ]);
    return { type: 'mcq', question: `Find the angle between the hour and minute hands at ${h}:00.`, answer, options, topic: 'Clocks' };
};

// --- CAT27: Probability ---
export const generateProbability = () => {
    const answer = "1/2";
    const options = ensureUnique(formatOption(answer), [
        formatOption("1/4"),
        formatOption("1"),
        formatOption("0"),
        formatOption("1/8")
    ]);
    return { type: 'mcq', question: "Probability of getting a head in a single coin toss?", answer, options, topic: 'Probability' };
};

// --- CAT28: Linear Eq Word Problem ---
export const generateWordProblemLinearEq = () => {
    const n = getRandomInt(1, 10);
    const sum = n + (n + 1);
    const answer = String(n);
    const options = ensureUnique(formatOption(answer), [
        formatOption(n + 1),
        formatOption(n - 1),
        formatOption(sum),
        formatOption(n + 2)
    ]);
    return { type: 'mcq', question: `The sum of two consecutive integers is ${sum}. Find the smaller integer.`, answer, options, topic: 'Linear Eq Word Problem' };
};

// --- CAT29: Word Problem ---
export const generateWordProblem = () => {
    const answer = "20%";
    const options = ensureUnique(formatOption(answer), [
        formatOption("10%"),
        formatOption("25%"),
        formatOption("15%"),
        formatOption("30%")
    ]);
    return { type: 'mcq', question: `A book is bought for 100 and sold for 120. Find the profit percentage.`, answer, options, topic: 'General Word Problem' };
};

// --- CAT30: Miscellaneous ---
export const generateMiscellaneous = () => {
    const answer = "360";
    const options = ensureUnique(formatOption(answer), [
        formatOption("180"),
        formatOption("90"),
        formatOption("270"),
        formatOption("100")
    ]);
    return { type: 'mcq', question: "How many degrees are there in a circle?", answer, options, topic: 'Miscellaneous' };
};

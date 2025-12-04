const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// --- Number System ---

export const generateRationalNumbers = () => {
    // Find a rational number between two given rational numbers or simple properties
    const type = Math.random() > 0.5 ? "Between" : "Property";
    let question, answer;

    if (type === "Between") {
        const den = getRandomInt(2, 10);
        const n1 = getRandomInt(1, 5);
        const n2 = n1 + 2; // Ensure gap
        question = `Find a rational number between ${n1}/${den} and ${n2}/${den}.`;
        answer = `${n1 + 1}/${den}`;
    } else {
        // Additive Inverse
        const num = getRandomInt(1, 10);
        const den = getRandomInt(2, 10);
        question = `What is the additive inverse of ${num}/${den}?`;
        answer = `-${num}/${den}`;
    }

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: type === "Between" ? `${parseFloat(answer) + 1}` : answer.replace("-", ""), label: type === "Between" ? `${parseFloat(answer) + 1}` : answer.replace("-", "") },
        { value: type === "Between" ? `${parseFloat(answer) - 0.5}` : `1/${answer.replace("-", "")}`, label: type === "Between" ? `${parseFloat(answer) - 0.5}` : `1/${answer.replace("-", "")}` },
        { value: "0", label: "0" }
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(1, 20);
        const val = String(r);
        if (!seen.has(val)) {
            seen.add(val);
            uniqueOptions.push({ value: val, label: val });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question,
            topic: "Rational Numbers",
            answer: answer
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Rational Numbers",
        options: uniqueOptions,
        answer: answer
    };
};

export const generateExponentsGrade8 = () => {
    // Negative exponents: 2^-3 = 1/8
    const base = getRandomInt(2, 5);
    const pow = getRandomInt(2, 4);

    const question = `Evaluate: ${base}^(-${pow})`;
    const val = Math.pow(base, pow);
    const answer = `1/${val}`;

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: String(val), label: String(val) },
        { value: `-${val}`, label: `-${val}` },
        { value: `1/${val + 1}`, label: `1/${val + 1}` }
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(10, 50);
        const val = `1/${r}`;
        if (!seen.has(val)) {
            seen.add(val);
            uniqueOptions.push({ value: val, label: val });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question,
            topic: "Exponents & Powers",
            answer: answer
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Exponents & Powers",
        options: uniqueOptions,
        answer: answer
    };
};

export const generateSquaresCubes = () => {
    // Square root or Cube root
    const type = Math.random() > 0.5 ? "Square" : "Cube";
    let question, answer;

    if (type === "Square") {
        const num = getRandomInt(11, 30);
        const sq = num * num;
        question = `Find the square root of ${sq}.`;
        answer = String(num);
    } else {
        const num = getRandomInt(2, 10);
        const cb = num * num * num;
        question = `Find the cube root of ${cb}.`;
        answer = String(num);
    }

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: String(Number(answer) + 1), label: String(Number(answer) + 1) },
        { value: String(Number(answer) - 1), label: String(Number(answer) - 1) },
        { value: String(Number(answer) * 2), label: String(Number(answer) * 2) }
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(10, 50);
        const val = String(r);
        if (!seen.has(val)) {
            seen.add(val);
            uniqueOptions.push({ value: val, label: val });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question,
            topic: "Squares & Cubes",
            answer: answer
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Squares & Cubes",
        options: uniqueOptions,
        answer: answer
    };
};

// --- Algebra ---

export const generateAlgebraExpressions = () => {
    // Operations or Identities
    const type = Math.random() > 0.5 ? "Operation" : "Identity";
    let question, answer;

    if (type === "Operation") {
        // Add/Sub like terms: (3x + 5) + (2x - 2)
        const a = getRandomInt(2, 9);
        const b = getRandomInt(1, 10);
        const c = getRandomInt(2, 9);
        const d = getRandomInt(1, 10);

        question = `Simplify: (${a}x + ${b}) + (${c}x - ${d})`;
        const coeff = a + c;
        const constTerm = b - d;
        answer = `${coeff}x ${constTerm >= 0 ? '+' : '-'} ${Math.abs(constTerm)}`;
    } else {
        // Identity: (x + a)^2
        const a = getRandomInt(1, 9);
        question = `Expand: (x + ${a})^2`;
        answer = `x^2 + ${2 * a}x + ${a * a}`;
    }

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: type === "Operation" ? `${parseInt(answer) + 1}x + 1` : `x^2 - ${parseInt(answer.split('+')[1])}x + ${parseInt(answer.split('+')[2])}`, label: type === "Operation" ? `${parseInt(answer) + 1}x + 1` : `x^2 - ${parseInt(answer.split('+')[1])}x + ${parseInt(answer.split('+')[2])}` },
        { value: type === "Operation" ? `${parseInt(answer)}x` : `x^2 + ${parseInt(answer.split('+')[2])}`, label: type === "Operation" ? `${parseInt(answer)}x` : `x^2 + ${parseInt(answer.split('+')[2])}` },
        { value: "x", label: "x" }
    ]);

    // Refine wrong options
    const uniqueOptions = [];
    const seen = new Set();
    uniqueOptions.push({ value: answer, label: answer });
    seen.add(answer);

    while (uniqueOptions.length < 4) {
        let wrong;
        if (type === "Operation") {
            const r1 = getRandomInt(2, 20);
            const r2 = getRandomInt(1, 10);
            wrong = `${r1}x + ${r2}`;
        } else {
            const r = getRandomInt(1, 10);
            wrong = `x^2 + ${r}x + ${r * r}`;
        }

        if (!seen.has(wrong)) {
            seen.add(wrong);
            uniqueOptions.push({ value: wrong, label: wrong });
        }
    }

    return {
        type: "mcq",
        question: question,
        topic: "Algebraic Expressions",
        options: shuffleArray(uniqueOptions),
        answer: answer
    };
};

export const generateFactorisation = () => {
    // Common factor or difference of squares
    const type = Math.random() > 0.5 ? "Common" : "DiffSquares";
    let question, answer;

    if (type === "Common") {
        const hcf = getRandomInt(2, 5);
        const a = getRandomInt(2, 5);
        const b = getRandomInt(2, 5);
        // hcf(ax + b) -> hcf*a x + hcf*b
        const t1 = hcf * a;
        const t2 = hcf * b;
        question = `Factorise: ${t1}x + ${t2}`;
        answer = `${hcf}(${a}x + ${b})`;
    } else {
        // a^2 - b^2 = (a-b)(a+b)
        const a = getRandomInt(2, 9); // coefficient for x^2 e.g. (ax)^2 - b^2
        const b = getRandomInt(1, 10);
        // Simpler: x^2 - a^2
        const num = getRandomInt(2, 10);
        question = `Factorise: x^2 - ${num * num}`;
        answer = `(x - ${num})(x + ${num})`;
    }

    const uniqueOptions = [];
    const seen = new Set();
    uniqueOptions.push({ value: answer, label: answer });
    seen.add(answer);

    while (uniqueOptions.length < 4) {
        let wrong;
        if (type === "Common") {
            const r = getRandomInt(2, 10);
            wrong = `${r}(x + 1)`;
        } else {
            const r = getRandomInt(1, 10);
            wrong = `(x - ${r})(x - ${r})`;
        }

        if (!seen.has(wrong)) {
            seen.add(wrong);
            uniqueOptions.push({ value: wrong, label: wrong });
        }
    }

    return {
        type: "mcq",
        question: question,
        topic: "Factorisation",
        options: shuffleArray(uniqueOptions),
        answer: answer
    };
};

export const generateLinearEquationsGrade8 = () => {
    // Solve linear equation
    const a = getRandomInt(2, 9);
    const b = getRandomInt(1, 20);
    const x = getRandomInt(1, 10);
    const c = a * x - b; // ax - b = c

    const question = `Solve: ${a}x - ${b} = ${c}`;
    const answer = String(x);

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: String(x + 1), label: String(x + 1) },
        { value: String(x - 1), label: String(x - 1) },
        { value: String(x * 2), label: String(x * 2) }
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(10, 50);
        const val = String(r);
        if (!seen.has(val)) {
            seen.add(val);
            uniqueOptions.push({ value: val, label: val });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question,
            topic: "Linear Equations",
            answer: answer
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Linear Equations",
        options: uniqueOptions,
        answer: answer
    };
};

// --- Geometry & Mensuration ---

export const generateMensuration = () => {
    // Area of Trapezium or Volume of Cube/Cuboid
    const type = Math.random() > 0.5 ? "Trapezium" : "Volume";
    let question, answer;

    if (type === "Trapezium") {
        const a = getRandomInt(5, 15);
        const b = getRandomInt(5, 15);
        const h = getRandomInt(2, 10);
        // Area = 0.5 * (a+b) * h
        const area = 0.5 * (a + b) * h;
        question = `Find the area of a trapezium with parallel sides ${a}cm, ${b}cm and height ${h}cm.`;
        answer = `${area} cm²`;
    } else {
        // Volume of Cuboid
        const l = getRandomInt(2, 10);
        const w = getRandomInt(2, 10);
        const h = getRandomInt(2, 10);
        const vol = l * w * h;
        question = `Find the volume of a cuboid with length ${l}cm, width ${w}cm, and height ${h}cm.`;
        answer = `${vol} cm³`;
    }

    const val = parseFloat(answer.split(' ')[0]);
    const options = shuffleArray([
        { value: answer, label: answer },
        { value: `${val + 10} ${answer.split(' ')[1]}`, label: `${val + 10} ${answer.split(' ')[1]}` },
        { value: `${val - 5} ${answer.split(' ')[1]}`, label: `${val - 5} ${answer.split(' ')[1]}` },
        { value: `${val * 2} ${answer.split(' ')[1]}`, label: `${val * 2} ${answer.split(' ')[1]}` }
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(10, 100);
        const valStr = `${r} ${answer.split(' ')[1]}`;
        if (!seen.has(valStr)) {
            seen.add(valStr);
            uniqueOptions.push({ value: valStr, label: valStr });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question + " (number only)",
            topic: "Mensuration",
            answer: String(val)
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Mensuration",
        options: uniqueOptions,
        answer: answer
    };
};

export const generateGraphs = () => {
    // Identify quadrant
    const x = getRandomInt(-10, 10);
    const y = getRandomInt(-10, 10);
    if (x === 0 || y === 0) return generateGraphs(); // Avoid axes for simplicity

    const question = `In which quadrant does the point (${x}, ${y}) lie?`;
    let answer;
    if (x > 0 && y > 0) answer = "Quadrant I";
    else if (x < 0 && y > 0) answer = "Quadrant II";
    else if (x < 0 && y < 0) answer = "Quadrant III";
    else answer = "Quadrant IV";

    const options = shuffleArray([
        { value: "Quadrant I", label: "Quadrant I" },
        { value: "Quadrant II", label: "Quadrant II" },
        { value: "Quadrant III", label: "Quadrant III" },
        { value: "Quadrant IV", label: "Quadrant IV" }
    ]);

    return {
        type: "mcq",
        question: question,
        topic: "Introduction to Graphs",
        options: options,
        answer: answer
    };
};

// --- Applied Math ---

export const generateProportion = () => {
    // Direct or Inverse
    const type = Math.random() > 0.5 ? "Direct" : "Inverse";
    let question, answer;

    if (type === "Direct") {
        // Cost of items
        const n1 = getRandomInt(2, 10);
        const cost1 = n1 * getRandomInt(5, 20);
        const n2 = getRandomInt(2, 10);
        const cost2 = (cost1 / n1) * n2;

        question = `If ${n1} pens cost ₹${cost1}, what is the cost of ${n2} pens?`;
        answer = `₹${cost2}`;
    } else {
        // Workers and days
        const w1 = getRandomInt(2, 10);
        const d1 = getRandomInt(2, 10) * w1; // Ensure product is divisible
        // Actually product is constant. w1*d1 = k.
        // Let work = w1 * d1.
        const work = w1 * getRandomInt(2, 10);
        const d_actual = work / w1;

        const w2 = getRandomInt(2, 10);
        // Ensure w2 divides work
        // Let's simplify: w1 * d1 = w2 * d2
        // Pick w1, d1. w2 such that it divides w1*d1
        const totalWork = 120; // divisible by many
        const factors = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120];
        const w_1 = factors[getRandomInt(2, 10)];
        const d_1 = totalWork / w_1;
        const w_2 = factors[getRandomInt(2, 10)];
        const d_2 = totalWork / w_2;

        question = `If ${w_1} workers can finish a task in ${d_1} days, how many days will ${w_2} workers take?`;
        answer = `${d_2} days`;
    }

    const val = parseInt(answer.replace(/\D/g, ''));
    const suffix = answer.replace(/[\d\.]/g, '').trim(); // '₹' or ' days'

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: type === "Direct" ? `₹${val + 10}` : `${val + 2} days`, label: type === "Direct" ? `₹${val + 10}` : `${val + 2} days` },
        { value: type === "Direct" ? `₹${val - 5}` : `${val - 1} days`, label: type === "Direct" ? `₹${val - 5}` : `${val - 1} days` },
        { value: type === "Direct" ? `₹${val * 2}` : `${val * 2} days`, label: type === "Direct" ? `₹${val * 2}` : `${val * 2} days` }
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(10, 100);
        const valStr = type === "Direct" ? `₹${r}` : `${r} days`;
        if (!seen.has(valStr)) {
            seen.add(valStr);
            uniqueOptions.push({ value: valStr, label: valStr });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question + " (number only)",
            topic: "Direct & Inverse Proportion",
            answer: String(val)
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Direct & Inverse Proportion",
        options: uniqueOptions,
        answer: answer
    };
};

export const generateComparingQuantities = () => {
    // Percentage or Profit/Loss or CI
    const type = ["Percentage", "ProfitLoss", "CI"][getRandomInt(0, 2)];
    let question, answer;

    if (type === "Percentage") {
        const val = getRandomInt(100, 500);
        const pct = getRandomInt(10, 50);
        const res = val + (val * pct / 100);
        question = `Increase ${val} by ${pct}%.`;
        answer = String(res);
    } else if (type === "ProfitLoss") {
        const cp = getRandomInt(100, 500);
        const profitPct = getRandomInt(10, 30);
        const profit = (cp * profitPct) / 100;
        const sp = cp + profit;
        question = `Find SP if CP = ₹${cp} and Profit % = ${profitPct}%.`;
        answer = `₹${sp}`;
    } else {
        // CI: A = P(1 + R/100)^n
        const P = 1000;
        const R = 10;
        const n = 2;
        const A = P * Math.pow((1 + R / 100), n);
        question = `Calculate Amount for CI: P=₹${P}, R=${R}%, n=${n} years.`;
        answer = `₹${A}`;
    }

    const val = parseFloat(answer.replace(/[^\d\.]/g, ''));
    const prefix = answer.includes('₹') ? '₹' : '';

    const options = shuffleArray([
        { value: answer, label: answer },
        { value: `${prefix}${val + 10}`, label: `${prefix}${val + 10}` },
        { value: `${prefix}${val - 10}`, label: `${prefix}${val - 10}` },
        { value: `${prefix}${val * 1.1}`, label: `${prefix}${val * 1.1}` } // Approximate
    ]);

    // Ensure unique options
    const uniqueOptions = [];
    const seen = new Set();
    for (const opt of options) {
        if (!seen.has(opt.value)) {
            seen.add(opt.value);
            uniqueOptions.push(opt);
        }
    }
    while (uniqueOptions.length < 4) {
        const r = getRandomInt(100, 1000);
        const valStr = `${prefix}${r}`;
        if (!seen.has(valStr)) {
            seen.add(valStr);
            uniqueOptions.push({ value: valStr, label: valStr });
        }
    }

    if (Math.random() > 0.5) {
        return {
            type: "userInput",
            question: question + (type !== "Percentage" ? " (number only)" : ""),
            topic: "Comparing Quantities",
            answer: type !== "Percentage" ? String(val) : answer
        };
    }

    return {
        type: "mcq",
        question: question,
        topic: "Comparing Quantities",
        options: uniqueOptions,
        answer: answer
    };
};

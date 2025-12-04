const fs = require('fs');

// Helper to get random int
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate options
const generateOptions = (correctAnswer, type = 'number') => {
    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        let wrong;
        if (type === 'number') {
            const offset = getRandomInt(-5, 5);
            wrong = correctAnswer + offset;
            if (wrong < 0) wrong = Math.abs(wrong); // No negatives for grade 3 usually
        } else {
            // For strings or other types, we might need specific logic, but mostly we deal with numbers here
            wrong = correctAnswer + getRandomInt(1, 10);
        }
        if (wrong !== correctAnswer) options.add(wrong);
    }

    return Array.from(options).sort(() => Math.random() - 0.5).map(val => ({
        label: String(val),
        value: String(val)
    }));
};

const questions = {};

// Q1: Add Single-Digit (regrouping)
questions.q1 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(5, 9);
    const b = getRandomInt(5, 9);
    const ans = a + b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `What is ${a} + ${b}?`,
        questionId: `q1_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q2: Add Double-Digit
questions.q2 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(10, 50);
    const b = getRandomInt(10, 40);
    const ans = a + b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} + ${b} = ?`,
        questionId: `q2_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q3: Add Three-Digit
questions.q3 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(100, 500);
    const b = getRandomInt(100, 400);
    const ans = a + b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} + ${b} = ?`,
        questionId: `q3_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q4: Subtract Single Digit
questions.q4 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(5, 9);
    const b = getRandomInt(1, a - 1);
    const ans = a - b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} − ${b} = ?`,
        questionId: `q4_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q5: Subtract Double Digit
questions.q5 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(30, 90);
    const b = getRandomInt(10, 29);
    const ans = a - b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} − ${b} = ?`,
        questionId: `q5_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q6: Subtract Three-Digit
questions.q6 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(300, 900);
    const b = getRandomInt(100, 299);
    const ans = a - b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} − ${b} = ?`,
        questionId: `q6_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q7: Multiply Single Digit
questions.q7 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    const ans = a * b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} × ${b} = ?`,
        questionId: `q7_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q8: Multiply Double Digit
questions.q8 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(10, 15);
    const b = getRandomInt(2, 9);
    const ans = a * b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} × ${b} = ?`,
        questionId: `q8_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q9: Division Single Digit
questions.q9 = Array.from({ length: 10 }, (_, i) => {
    const b = getRandomInt(2, 9);
    const ans = getRandomInt(2, 9);
    const a = b * ans;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} ÷ ${b} = ?`,
        questionId: `q9_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q10: Division Double Digit
questions.q10 = Array.from({ length: 10 }, (_, i) => {
    const b = getRandomInt(2, 9);
    const ans = getRandomInt(11, 15);
    const a = b * ans;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} ÷ ${b} = ?`,
        questionId: `q10_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q11: Missing Number
questions.q11 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(10, 20);
    const b = getRandomInt(1, 9);
    const ans = a - b;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${a} − ${b} = ?`,
        questionId: `q11_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q12: Mixed Operations
questions.q12 = Array.from({ length: 10 }, (_, i) => {
    const div = getRandomInt(2, 5);
    const inner = div * getRandomInt(2, 10); // Ensure divisibility
    const add = getRandomInt(1, 10);
    const ans = (inner / div) + add;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `(${inner} ÷ ${div}) + ${add} = ?`,
        questionId: `q12_${i}`,
        topic: "Number Sense & Operations",
        type: "mcq"
    };
});

// Q13 - Q15 (Geometry Images - Static for now as they need specific images)
questions.q13 = Array(10).fill({
    "answer": "rectangle",
    "options": [
        { "label": "sphere", "value": "sphere" },
        { "label": "triangle", "value": "triangle" },
        { "label": "circle", "value": "circle" },
        { "label": "rectangle", "value": "rectangle" }
    ],
    "question": "Which shape it is?",
    "questionId": "q13_0",
    "topic": "Geometry & Shapes",
    "type": "mcq",
    "image": "/assets/grade3/q13.png"
});
questions.q14 = Array(10).fill({
    "answer": "A ball",
    "options": [
        { "label": "A box", "value": "A box" },
        { "label": "A ball", "value": "A ball" },
        { "label": "An ice-cream cone", "value": "An ice-cream cone" },
        { "label": "A tin can", "value": "A tin can" }
    ],
    "question": "A sphere looks like:",
    "questionId": "q14_0",
    "topic": "Geometry & Shapes",
    "type": "mcq",
    "image": "/assets/grade3/q14.png"
});
questions.q15 = Array(10).fill({
    "answer": "A butterfly with two same wings",
    "options": [
        { "label": "A broken line", "value": "A broken line" },
        { "label": "A butterfly with two same wings", "value": "A butterfly with two same wings" },
        { "label": "A zig-zag line", "value": "A zig-zag line" },
        { "label": "A triangle with one curved side", "value": "A triangle with one curved side" }
    ],
    "question": "Which picture shows symmetry?",
    "questionId": "q15_0",
    "topic": "Geometry & Shapes",
    "type": "mcq",
    "image": "/assets/grade3/q15.png"
});

// Q16: Measure Length
questions.q16 = Array.from({ length: 10 }, (_, i) => {
    const cm = getRandomInt(1, 10);
    const mm = cm * 10;
    return {
        answer: `${cm}cm`,
        options: [
            { label: `${cm}cm`, value: `${cm}cm` },
            { label: `${cm + 1}cm`, value: `${cm + 1}cm` },
            { label: `${mm}kg`, value: `${mm}kg` },
            { label: `${cm}m`, value: `${cm}m` }
        ].sort(() => Math.random() - 0.5),
        question: `How much is ${mm}mm?`,
        questionId: `q16_${i}`,
        topic: "Measurement",
        "type": "mcq"
    };
});

// Q17 (Static - Compare Lengths)
questions.q17 = Array(10).fill({
    "answer": "Pencil",
    "options": [
        { "label": "Eraser", "value": "Eraser" },
        { "label": "Pencil", "value": "Pencil" },
        { "label": "Sharpener", "value": "Sharpener" },
        { "label": "Coin", "value": "Coin" }
    ],
    "question": "Which is longer?",
    "questionId": "q17_0",
    "topic": "Measurement",
    "type": "mcq"
});

// Q18 (Static Image - Clock)
questions.q18 = Array(10).fill({
    "answer": "3:30",
    "options": [
        { "label": "3:00", "value": "3:00" },
        { "label": "3:30", "value": "3:30" },
        { "label": "4:00", "value": "4:00" },
        { "label": "4:30", "value": "4:30" }
    ],
    "question": "What time does the clock show?",
    "questionId": "q18_0",
    "topic": "Measurement",
    "type": "mcq",
    "image": "/assets/grade3/q18.png"
});

// Q19: Calendar
questions.q19 = Array.from({ length: 10 }, (_, i) => {
    const isLeap = Math.random() > 0.5;
    const ans = isLeap ? "29" : "28";
    return {
        answer: ans,
        options: [
            { label: "28", value: "28" },
            { label: "29", value: "29" },
            { label: "30", value: "30" },
            { label: "31", value: "31" }
        ].sort(() => Math.random() - 0.5),
        question: `How many days are in February (${isLeap ? 'leap year' : 'non-leap year'})?`,
        questionId: `q19_${i}`,
        topic: "Measurement",
        "type": "mcq"
    };
});

// Q20, Q21, Q22 (Static Images)
questions.q20 = Array(10).fill({
    "answer": "Right",
    "options": [
        { "label": "Left", "value": "Left" },
        { "label": "Right", "value": "Right" },
        { "label": "Both equal", "value": "Both equal" },
        { "label": "None", "value": "None" }
    ],
    "question": "In the picture, which side is heavier?",
    "questionId": "q20_0",
    "topic": "Measurement",
    "type": "mcq",
    "image": "/assets/grade3/q20.png"
});
questions.q21 = Array(10).fill({
    "answer": "Jug",
    "options": [
        { "label": "Cup", "value": "Cup" },
        { "label": "Jug", "value": "Jug" },
        { "label": "Spoon", "value": "Spoon" },
        { "label": "Plate", "value": "Plate" }
    ],
    "question": "Which holds more?",
    "questionId": "q21_0",
    "topic": "Measurement",
    "type": "mcq",
    "image": "/assets/grade3/q21.png"
});
questions.q22 = Array(10).fill({
    "answer": "₹10",
    "options": [
        { "label": "₹5", "value": "₹5" },
        { "label": "₹10", "value": "₹10" },
        { "label": "₹50", "value": "₹50" },
        { "label": "₹20", "value": "₹20" }
    ],
    "question": "What is the value of this note?",
    "questionId": "q22_0",
    "topic": "Money",
    "type": "mcq",
    "image": "/assets/grade3/q22.png"
});

// Q23: Money Word Problem
questions.q23 = Array.from({ length: 10 }, (_, i) => {
    const has = getRandomInt(30, 60);
    const spends = getRandomInt(10, 25);
    const ans = has - spends;
    return {
        answer: `₹${ans}`,
        options: generateOptions(ans).map(o => ({ label: `₹${o.label}`, value: `₹${o.value}` })),
        question: `Riya has ₹${has} and spends ₹${spends}. How much is left?`,
        questionId: `q23_${i}`,
        topic: "Money",
        "type": "mcq"
    };
});

// Q24 (Static Image - Pictograph)
questions.q24 = Array(10).fill({
    "answer": "10",
    "options": [
        { "label": "5", "value": "5" },
        { "label": "8", "value": "8" },
        { "label": "10", "value": "10" },
        { "label": "12", "value": "12" }
    ],
    "question": "If each picture = 2 apples, and there are 5 pictures, how many apples?",
    "questionId": "q24_0",
    "topic": "Data Handling",
    "type": "mcq",
    "image": "/assets/grade3/q24.png"
});

// Q25: Algebra
questions.q25 = Array.from({ length: 10 }, (_, i) => {
    const a = getRandomInt(2, 5);
    const mul = getRandomInt(3, 6);
    const ans = a * mul;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `If a= ${a} and there are ${mul}a, how much will be the answer?`,
        questionId: `q25_${i}`,
        topic: "Data Handling",
        "type": "mcq"
    };
});

// Q26 (Static Image - Tally)
questions.q26 = Array(10).fill({
    "answer": "||",
    "options": [
        { "label": "||||", "value": "||||" },
        { "label": "||", "value": "||" },
        { "label": "|||", "value": "|||" },
        { "label": "|", "value": "|" }
    ],
    "question": "12 in tally marks is:",
    "questionId": "q26_0",
    "topic": "Data Handling",
    "type": "mcq",
    "image": "/assets/grade3/q26.png"
});

// Q27: Number Patterns
questions.q27 = Array.from({ length: 10 }, (_, i) => {
    const start = getRandomInt(1, 5);
    const step = getRandomInt(2, 4);
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const ans = start + step * 4;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `What comes next? ${seq.join(', ')}, ___`,
        questionId: `q27_${i}`,
        topic: "Patterns",
        "type": "mcq"
    };
});

// Q28: Growing Patterns (Doubling)
questions.q28 = Array.from({ length: 10 }, (_, i) => {
    const start = getRandomInt(1, 3);
    const seq = [start, start * 2, start * 4, start * 8];
    const ans = start * 16;
    return {
        answer: String(ans),
        options: generateOptions(ans),
        question: `${seq.join(', ')}, ___`,
        questionId: `q28_${i}`,
        topic: "Patterns",
        "type": "mcq"
    };
});

// Q29, Q30 (Static Fractions)
questions.q29 = Array(10).fill({
    "answer": "4 equal slices",
    "options": [
        { "label": "Uneven slices", "value": "Uneven slices" },
        { "label": "3 pieces of different sizes", "value": "3 pieces of different sizes" },
        { "label": "4 equal slices", "value": "4 equal slices" },
        { "label": "Random cuts", "value": "Random cuts" }
    ],
    "question": "Which picture shows equal parts?",
    "questionId": "q29_0",
    "topic": "Fractions",
    "type": "mcq",
    "image": "/assets/grade3/q29.png"
});
questions.q30 = Array(10).fill({
    "answer": "1/4",
    "options": [
        { "label": "1/2", "value": "1/2" },
        { "label": "1/3", "value": "1/3" },
        { "label": "1/4", "value": "1/4" },
        { "label": "2/4", "value": "2/4" }
    ],
    "question": "If a chocolate bar is cut into 4 equal parts, each part is:",
    "questionId": "q30_0",
    "topic": "Fractions",
    "type": "mcq"
});


const fileContent = `export default ${JSON.stringify(questions, null, 4)};`;
fs.writeFileSync('src/questionBook/Grade3/GetGrade3Question.js', fileContent);
console.log('Generated questions successfully');

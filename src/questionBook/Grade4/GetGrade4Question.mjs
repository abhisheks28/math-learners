import {
    generatePlaceValue5Digit,
    generateAddition4Digit,
    generateSubtraction4Digit,
    generateMultiplication,
    generateDivision,
    generateEstimation,
    generateFractionTypes,
    generateFractionOperations,
    generateAngles,
    generateTriangles,
    generateAreaPerimeter,
    generateTimeConversion,
    generateBarGraph,
    generatePattern
} from './grade4Generators.mjs';

const generate = (generator, count = 10) => {
    return Array.from({ length: count }, () => generator());
};

const Grade4Questions = {
    q1: generate(generatePlaceValue5Digit),
    q2: generate(generateAddition4Digit),
    q3: generate(generateSubtraction4Digit),
    q4: generate(generateMultiplication),
    q5: generate(generateDivision),
    q6: generate(generateEstimation),
    q7: generate(generateFractionTypes),
    q8: generate(generateFractionOperations),
    q9: generate(generateAngles),
    q10: generate(generateTriangles),
    q11: generate(generateAreaPerimeter),
    q12: generate(generateTimeConversion),
    q13: generate(generateBarGraph),
    q14: generate(generatePattern),
    // Fill remaining slots
    q15: generate(generatePlaceValue5Digit),
    q16: generate(generateAddition4Digit),
    q17: generate(generateSubtraction4Digit),
    q18: generate(generateMultiplication),
    q19: generate(generateDivision),
    q20: generate(generateEstimation),
    q21: generate(generateFractionTypes),
    q22: generate(generateFractionOperations),
    q23: generate(generateAngles),
    q24: generate(generateTriangles),
    q25: generate(generateAreaPerimeter),
    q26: generate(generateTimeConversion),
    q27: generate(generateBarGraph),
    q28: generate(generatePattern),
    q29: generate(generatePlaceValue5Digit),
    q30: generate(generateAddition4Digit)
};

export default Grade4Questions;

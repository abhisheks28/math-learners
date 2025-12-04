import {
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    generateMissingNumber,
    generateMixedOperations,
    generateFractions,
    generateCompareFractions,
    generateShapes,
    generateSymmetry,
    generateLengthConversion,
    generateWeightConversion,
    generateCapacityConversion,
    generateTimeReading,
    generateIdentifyMoney,
    generateMoneyOperations,
    generateTally,
    generateNumberPattern
} from './grade3Generators.mjs';

const generate = (generator, count = 10) => {
    return Array.from({ length: count }, () => generator());
};

const Grade3Questions = {
    q1: generate(generateAddition),
    q2: generate(generateSubtraction),
    q3: generate(generateMultiplication),
    q4: generate(generateDivision),
    q5: generate(generateMissingNumber),
    q6: generate(generateMixedOperations),
    q7: generate(generateFractions),
    q8: generate(generateCompareFractions),
    q9: generate(generateShapes),
    q10: generate(generateSymmetry),
    q11: generate(generateLengthConversion),
    q12: generate(generateWeightConversion),
    q13: generate(generateCapacityConversion),
    q14: generate(generateTimeReading),
    q15: generate(generateIdentifyMoney),
    q16: generate(generateMoneyOperations),
    q17: generate(generateTally),
    q18: generate(generateNumberPattern),
    // Fill remaining slots with mixed topics if needed or reuse existing
    q19: generate(generateAddition),
    q20: generate(generateSubtraction),
    q21: generate(generateMultiplication),
    q22: generate(generateDivision),
    q23: generate(generateMissingNumber),
    q24: generate(generateMixedOperations),
    q25: generate(generateFractions),
    q26: generate(generateCompareFractions),
    q27: generate(generateShapes),
    q28: generate(generateSymmetry),
    q29: generate(generateLengthConversion),
    q30: generate(generateWeightConversion)
};

export default Grade3Questions;
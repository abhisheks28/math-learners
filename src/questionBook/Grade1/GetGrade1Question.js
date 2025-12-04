import {
    generateCountForward,
    generateCountBackward,
    generateCountingObjects,
    generateSkipCounting,
    generatePlaceValue,
    generateComparison,
    generateEvenOdd,
    generateAdditionObjects,
    generateAdditionWordProblems,
    generateSubtractionObjects,
    generateSubtractionWordProblems,
    generateIdentifyShapes,
    generateSpatial,
    generateWeightComparison,
    generateCapacityComparison,
    generateTimeBasics,
    generateDaysOfWeek,
    generateMoneyCounting,
    generatePatterns
} from './grade1Generators.js';

const generate = (generator, count = 10) => {
    return Array.from({ length: count }, () => generator());
};

const Grade1Questions = {
    q1: generate(generateCountForward),
    q2: generate(generateCountBackward),
    q3: generate(generateCountingObjects),
    q4: generate(() => generateSkipCounting(2)),
    q5: generate(() => generateSkipCounting(5)),
    q6: generate(() => generateSkipCounting(10)),
    q7: generate(generatePlaceValue),
    q8: generate(() => generateComparison('greatest')),
    q9: generate(generateEvenOdd),
    q10: generate(generateAdditionObjects),
    q11: generate(generateAdditionWordProblems),
    q12: generate(generateSubtractionObjects),
    q13: generate(generateSubtractionWordProblems),
    q14: generate(generateIdentifyShapes),
    q15: generate(generateSpatial),
    q16: generate(generateWeightComparison),
    q17: generate(generateCapacityComparison),
    q18: generate(generateTimeBasics),
    q19: generate(generateDaysOfWeek),
    q20: generate(generateMoneyCounting),
    q21: generate(generatePatterns),
    q22: generate(() => generateComparison('smallest')),
    q23: generate(generateAdditionObjects),
    q24: generate(generateSubtractionObjects),
    q25: generate(generateIdentifyShapes)
};

export default Grade1Questions;
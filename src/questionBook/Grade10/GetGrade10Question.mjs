import {
    generateRealNumbers,
    generatePolynomials,
    generateLinearEquations,
    generateQuadraticEquations,
    generateArithmeticProgression,
    generateCoordinateGeometry,
    generateTrigonometry,
    generateMensuration,
    generateStatistics,
    generateProbability
} from './grade10Generators.mjs';

const generate = (generator, count = 10) => {
    return Array.from({ length: count }, () => generator());
};

const Grade10Questions = {
    q1: generate(generateRealNumbers),
    q2: generate(generatePolynomials),
    q3: generate(generateLinearEquations),
    q4: generate(generateQuadraticEquations),
    q5: generate(generateArithmeticProgression),
    q6: generate(generateCoordinateGeometry),
    q7: generate(generateTrigonometry),
    q8: generate(generateMensuration),
    q9: generate(generateStatistics),
    q10: generate(generateProbability),
    // Fill remaining slots
    q11: generate(generateRealNumbers),
    q12: generate(generatePolynomials),
    q13: generate(generateLinearEquations),
    q14: generate(generateQuadraticEquations),
    q15: generate(generateArithmeticProgression),
    q16: generate(generateCoordinateGeometry),
    q17: generate(generateTrigonometry),
    q18: generate(generateMensuration),
    q19: generate(generateStatistics),
    q20: generate(generateProbability),
    q21: generate(generateRealNumbers),
    q22: generate(generatePolynomials),
    q23: generate(generateLinearEquations),
    q24: generate(generateQuadraticEquations),
    q25: generate(generateArithmeticProgression),
    q26: generate(generateCoordinateGeometry),
    q27: generate(generateTrigonometry),
    q28: generate(generateMensuration),
    q29: generate(generateStatistics),
    q30: generate(generateProbability)
};

export default Grade10Questions;

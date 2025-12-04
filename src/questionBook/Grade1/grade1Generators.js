const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// --- Number Sense ---


// --- Number Sense ---

export const generateCountForward = () => {
  const start = getRandomInt(1, 15);
  const sequence = [start, start + 1, start + 2, start + 3];
  const answer = start + 4;

  // 50% chance for userInput
  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: `What comes next: ${sequence.join(", ")}, ...?`,
      topic: "Number Sense / Counting",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 2), label: String(answer + 2) }
  ]);

  return {
    type: "mcq",
    question: `What comes next: ${sequence.join(", ")}, ...?`,
    topic: "Number Sense / Counting",
    options: options,
    answer: String(answer)
  };
};

export const generateCountBackward = () => {
  const start = getRandomInt(10, 20);
  const sequence = [start, start - 1, start - 2, start - 3];
  const answer = start - 4;

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 2), label: String(answer - 2) }
  ]);

  return {
    type: "mcq",
    question: `Count backwards: ${sequence.join(", ")}, ...?`,
    topic: "Number Sense / Counting",
    options: options,
    answer: String(answer)
  };
};

export const generateSkipCounting = (step) => {
  const start = getRandomInt(1, 5) * step;
  const sequence = [start, start + step, start + 2 * step, start + 3 * step];
  const answer = start + 4 * step;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: `Skip count by ${step}s: ${sequence.join(", ")}, ...?`,
      topic: "Number Sense / Skip Counting",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + step), label: String(answer + step) },
    { value: String(answer - step), label: String(answer - step) },
    { value: String(answer + 2 * step), label: String(answer + 2 * step) }
  ]);

  return {
    type: "mcq",
    question: `Skip count by ${step}s: ${sequence.join(", ")}, ...?`,
    topic: "Number Sense / Skip Counting",
    options: options,
    answer: String(answer)
  };
};

export const generatePlaceValue = () => {
  const tens = getRandomInt(1, 9);
  const ones = getRandomInt(0, 9);
  const number = tens * 10 + ones;

  const answer = `${tens} tens and ${ones} ones`;

  const options = shuffleArray([
    { value: answer, label: answer },
    { value: `${ones} tens and ${tens} ones`, label: `${ones} tens and ${tens} ones` },
    { value: `${tens + 1} tens and ${ones} ones`, label: `${tens + 1} tens and ${ones} ones` },
    { value: `${tens} tens and ${ones + 1} ones`, label: `${tens} tens and ${ones + 1} ones` }
  ]);

  // Handle duplicate if tens === ones
  if (tens === ones) {
    options[1] = { value: `${tens} tens and ${ones + 2} ones`, label: `${tens} tens and ${ones + 2} ones` };
  }

  return {
    type: "mcq",
    question: `Break down the number ${number} into tens and ones.`,
    topic: "Number Sense / Place Value",
    options: options,
    answer: answer
  };
};

export const generateComparison = (type) => {
  const nums = [];
  while (nums.length < 4) {
    const n = getRandomInt(1, 50);
    if (!nums.includes(n)) nums.push(n);
  }

  let answer, questionText;
  if (type === 'greatest') {
    answer = Math.max(...nums);
    questionText = "Which number is the greatest?";
  } else {
    answer = Math.min(...nums);
    questionText = "Which number is the smallest?";
  }

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: `${questionText} [${nums.join(", ")}]`,
      topic: "Number Sense / Comparison",
      answer: String(answer)
    };
  }

  const options = shuffleArray(nums.map(n => ({ value: String(n), label: String(n) })));

  return {
    type: "mcq",
    question: `${questionText} [${nums.join(", ")}]`,
    topic: "Number Sense / Comparison",
    options: options,
    answer: String(answer)
  };
};

export const generateEvenOdd = () => {
  const num = getRandomInt(1, 20);
  const isEven = num % 2 === 0;
  const answer = isEven ? "Even" : "Odd";

  return {
    type: "mcq",
    question: `Is the number ${num} Even or Odd?`,
    topic: "Number Sense / Even & Odd",
    options: [
      { value: "Even", label: "Even" },
      { value: "Odd", label: "Odd" }
    ],
    answer: answer
  };
};

// --- Addition ---

export const generateAdditionObjects = () => {
  const num1 = getRandomInt(1, 5);
  const num2 = getRandomInt(1, 5);
  const answer = num1 + num2;

  // Using simple text representation for objects as emojis might not render consistently everywhere, 
  // but for a web app, emojis are usually fine.
  const object = "🍎";
  const question = `Add the apples: ${object.repeat(num1)} + ${object.repeat(num2)} = ?`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Addition / Basics",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 2), label: String(answer + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Addition / Basics",
    options: options,
    answer: String(answer)
  };
};

export const generateAdditionWordProblems = () => {
  const names = ["Raju", "Sita", "Ali", "John"];
  const items = ["balls", "apples", "pencils", "books"];

  const name = names[getRandomInt(0, names.length - 1)];
  const item = items[getRandomInt(0, items.length - 1)];
  const num1 = getRandomInt(2, 8);
  const num2 = getRandomInt(1, 5);
  const answer = num1 + num2;

  const question = `${name} has ${num1} ${item}. He gets ${num2} more. How many ${item} does he have now?`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Addition / Word Problems",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 2), label: String(answer + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Addition / Word Problems",
    options: options,
    answer: String(answer)
  };
};

// --- Subtraction ---

export const generateSubtractionObjects = () => {
  const num1 = getRandomInt(5, 9);
  const num2 = getRandomInt(1, 4);
  const answer = num1 - num2;

  const object = "🎈";
  const question = `Subtract the balloons: ${object.repeat(num1)} - ${object.repeat(num2)} = ?`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Subtraction / Basics",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 2), label: String(answer + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Subtraction / Basics",
    options: options,
    answer: String(answer)
  };
};

export const generateSubtractionWordProblems = () => {
  const names = ["Raju", "Sita", "Ali", "John"];
  const items = ["crayons", "candies", "toys", "stickers"];

  const name = names[getRandomInt(0, names.length - 1)];
  const item = items[getRandomInt(0, items.length - 1)];
  const num1 = getRandomInt(5, 10);
  const num2 = getRandomInt(1, 4);
  const answer = num1 - num2;

  const question = `${name} had ${num1} ${item}. She lost ${num2}. How many ${item} are left?`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Subtraction / Word Problems",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 2), label: String(answer + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Subtraction / Word Problems",
    options: options,
    answer: String(answer)
  };
};

// --- Geometry ---

export const generateIdentifyShapes = () => {
  const shapes = [
    { name: "Circle", objects: ["Clock", "Coin", "Wheel", "Pizza"] },
    { name: "Square", objects: ["Chessboard", "Window", "Slice of Bread", "Tile"] },
    { name: "Triangle", objects: ["Slice of Pizza", "Traffic Sign", "Nachos", "Hanger"] },
    { name: "Rectangle", objects: ["Door", "Book", "Mobile Phone", "TV Screen"] }
  ];

  const shape = shapes[getRandomInt(0, shapes.length - 1)];
  const object = shape.objects[getRandomInt(0, shape.objects.length - 1)];

  const options = shuffleArray(shapes.map(s => ({ value: s.name, label: s.name })));

  return {
    type: "mcq",
    question: `What shape does a ${object} look like?`,
    topic: "Geometry / Shapes",
    options: options,
    answer: shape.name
  };
};

export const generateSpatial = () => {
  const concepts = [
    { type: "Inside/Outside", question: "If a cat is in a box, is it inside or outside?", answer: "Inside", other: "Outside" },
    { type: "Left/Right", question: "In the word 'APPLE', is 'A' on the left or right?", answer: "Left", other: "Right" },
    { type: "Top/Bottom", question: "Is the sky above (top) or below (bottom) us?", answer: "Top", other: "Bottom" }
  ];

  const concept = concepts[getRandomInt(0, concepts.length - 1)];

  const options = shuffleArray([
    { value: concept.answer, label: concept.answer },
    { value: concept.other, label: concept.other }
  ]);

  return {
    type: "mcq",
    question: concept.question,
    topic: "Geometry / Spatial",
    options: options,
    answer: concept.answer
  };
};

// --- Measurement ---

export const generateLengthComparison = () => {
  const items = [
    { name: "Pencil", length: getRandomInt(2, 5) },
    { name: "Table", length: getRandomInt(10, 20) },
    { name: "Book", length: getRandomInt(5, 8) }
  ];

  const item = items[getRandomInt(0, items.length - 1)];
  const unit = "handspans";

  const question = `A ${item.name} is about ${item.length} ${unit} long. How long is it?`;

  const options = shuffleArray([
    { value: `${item.length} ${unit}`, label: `${item.length} ${unit}` },
    { value: `${item.length + 2} ${unit}`, label: `${item.length + 2} ${unit}` },
    { value: `${item.length - 1} ${unit}`, label: `${item.length - 1} ${unit}` },
    { value: `${item.length + 5} ${unit}`, label: `${item.length + 5} ${unit}` }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Measurement / Length",
    options: options,
    answer: `${item.length} ${unit}`
  };
};

export const generateWeightComparison = () => {
  const comparisons = [
    { heavy: "Elephant", light: "Mouse" },
    { heavy: "Car", light: "Bicycle" },
    { heavy: "Watermelon", light: "Apple" },
    { heavy: "Book", light: "Feather" }
  ];

  const comp = comparisons[getRandomInt(0, comparisons.length - 1)];
  const askHeavy = Math.random() > 0.5;

  const question = askHeavy
    ? `Which is heavier: ${comp.heavy} or ${comp.light}?`
    : `Which is lighter: ${comp.heavy} or ${comp.light}?`;

  const answer = askHeavy ? comp.heavy : comp.light;

  const options = shuffleArray([
    { value: comp.heavy, label: comp.heavy },
    { value: comp.light, label: comp.light }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Measurement / Weight",
    options: options,
    answer: answer
  };
};

export const generateCapacityComparison = () => {
  const comparisons = [
    { more: "Bucket", less: "Cup" },
    { more: "Jug", less: "Spoon" },
    { more: "Pool", less: "Bathtub" },
    { more: "Bottle", less: "Glass" }
  ];

  const comp = comparisons[getRandomInt(0, comparisons.length - 1)];
  const askMore = Math.random() > 0.5;

  const question = askMore
    ? `Which holds more water: ${comp.more} or ${comp.less}?`
    : `Which holds less water: ${comp.more} or ${comp.less}?`;

  const answer = askMore ? comp.more : comp.less;

  const options = shuffleArray([
    { value: comp.more, label: comp.more },
    { value: comp.less, label: comp.less }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Measurement / Capacity",
    options: options,
    answer: answer
  };
};

// --- Time ---

export const generateTimeBasics = () => {
  const times = [
    { question: "When do you eat breakfast?", answer: "Morning", other: "Evening" },
    { question: "When do you see stars?", answer: "Night", other: "Day" },
    { question: "When does the sun rise?", answer: "Morning", other: "Night" },
    { question: "When do you eat dinner?", answer: "Evening", other: "Morning" }
  ];

  const time = times[getRandomInt(0, times.length - 1)];

  const options = shuffleArray([
    { value: time.answer, label: time.answer },
    { value: time.other, label: time.other }
  ]);

  return {
    type: "mcq",
    question: time.question,
    topic: "Time / Basics",
    options: options,
    answer: time.answer
  };
};

// --- Money ---

export const generateMoneyCounting = () => {
  const notes = [1, 2, 5, 10, 20];
  const numNotes = getRandomInt(2, 4);
  const selectedNotes = [];
  let total = 0;

  for (let i = 0; i < numNotes; i++) {
    const note = notes[getRandomInt(0, notes.length - 1)];
    selectedNotes.push(note);
    total += note;
  }

  const question = `Count the money: ${selectedNotes.map(n => `₹${n}`).join(" + ")} = ?`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Money / Basics",
      answer: String(total)
    };
  }

  const options = shuffleArray([
    { value: String(total), label: String(total) },
    { value: String(total + 5), label: String(total + 5) },
    { value: String(total - 1), label: String(total - 1) },
    { value: String(total + 2), label: String(total + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Money / Basics",
    options: options,
    answer: String(total)
  };
};

// --- Patterns ---

export const generatePatterns = () => {
  const patterns = [
    { seq: ["A", "B", "A", "B"], next: "A", wrong: "B" },
    { seq: ["1", "2", "1", "2"], next: "1", wrong: "2" },
    { seq: ["🔴", "🔵", "🔴", "🔵"], next: "🔴", wrong: "🔵" },
    { seq: ["🔺", "🔻", "🔺", "🔻"], next: "🔺", wrong: "🔻" }
  ];

  const pattern = patterns[getRandomInt(0, patterns.length - 1)];

  const question = `Complete the pattern: ${pattern.seq.join(", ")}, ...?`;

  const options = shuffleArray([
    { value: pattern.next, label: pattern.next },
    { value: pattern.wrong, label: pattern.wrong }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Patterns / Basics",
    options: options,
    answer: pattern.next
  };
};

// --- Data Handling ---

export const generateTally = () => {
  const count = getRandomInt(1, 10);
  const tallyMark = "|";
  const question = `Count the tally marks: ${tallyMark.repeat(count)}`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Data Handling / Tally",
      answer: String(count)
    };
  }

  const options = shuffleArray([
    { value: String(count), label: String(count) },
    { value: String(count + 1), label: String(count + 1) },
    { value: String(count - 1), label: String(count - 1) },
    { value: String(count + 2), label: String(count + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Data Handling / Tally",
    options: options,
    answer: String(count)
  };
};

export const generateNumberLine = () => {
  const start = getRandomInt(0, 5);
  const jump = getRandomInt(1, 5);
  const answer = start + jump;

  const question = `Start at ${start} on the number line. Jump ${jump} steps forward. Where do you land?`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Number Sense / Number Line",
      answer: String(answer)
    };
  }

  const options = shuffleArray([
    { value: String(answer), label: String(answer) },
    { value: String(answer + 1), label: String(answer + 1) },
    { value: String(answer - 1), label: String(answer - 1) },
    { value: String(answer + 2), label: String(answer + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Number Sense / Number Line",
    options: options,
    answer: String(answer)
  };
};

export const generateDaysOfWeek = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const index = getRandomInt(0, 5); // Avoid Saturday for "tomorrow" edge case simplicity if needed, but array handles it.

  const type = Math.random() > 0.5 ? "after" : "before";
  let question, answer;

  if (type === "after") {
    question = `What day comes after ${days[index]}?`;
    answer = days[(index + 1) % 7];
  } else {
    // Handle index 0 (Sunday) -> Saturday
    const prevIndex = index === 0 ? 6 : index - 1;
    question = `What day comes before ${days[index]}?`;
    answer = days[prevIndex];
  }

  const options = shuffleArray([
    { value: answer, label: answer },
    { value: days[(index + 2) % 7], label: days[(index + 2) % 7] },
    { value: days[(index + 3) % 7], label: days[(index + 3) % 7] },
    { value: days[(index + 4) % 7], label: days[(index + 4) % 7] }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Time / Days of Week",
    options: options,
    answer: answer
  };
};

export const generatePictureGraph = () => {
  const items = ["🍎", "🍌", "🍇", "🍊"];
  const selectedItem = items[getRandomInt(0, items.length - 1)];
  const count = getRandomInt(1, 8);

  const question = `If 1 😃 = 1 fruit, how many fruits are there? \n ${"😃 ".repeat(count)}`;

  if (Math.random() > 0.5) {
    return {
      type: "userInput",
      question: question,
      topic: "Data Handling / Picture Graph",
      answer: String(count)
    };
  }

  const options = shuffleArray([
    { value: String(count), label: String(count) },
    { value: String(count + 1), label: String(count + 1) },
    { value: String(count - 1), label: String(count - 1) },
    { value: String(count + 2), label: String(count + 2) }
  ]);

  return {
    type: "mcq",
    question: question,
    topic: "Data Handling / Picture Graph",
    options: options,
    answer: String(count)
  };
};

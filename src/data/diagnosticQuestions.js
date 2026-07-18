// Real curriculum-style diagnostic questions, keyed by year-level band then subject.
export const YEAR_LEVELS = [
  { id: "year_1_2", label: "Year 1–2", desc: "Ages 5–7", emoji: "🌱", subjects: ["Mathematics", "English", "Science"] },
  { id: "year_3_4", label: "Year 3–4", desc: "Ages 7–9", emoji: "🌿", subjects: ["Mathematics", "English", "Science", "Social Studies"] },
  { id: "year_5_6", label: "Year 5–6", desc: "Ages 9–11", emoji: "🌳", subjects: ["Mathematics", "English", "Science", "Social Studies"] },
  { id: "year_7_8", label: "Year 7–8", desc: "Ages 11–13", emoji: "🏔️", subjects: ["Mathematics", "English", "Science", "Social Studies"] },
  { id: "year_9_10", label: "Year 9–10", desc: "Ages 13–15", emoji: "⛰️", subjects: ["Mathematics", "English", "Science", "Social Studies"] },
  { id: "year_11_12", label: "Year 11–12", desc: "Ages 15–18", emoji: "🎓", subjects: ["Mathematics", "English", "Science", "Social Studies"] },
];

export const SUBJECT_EMOJI = {
  Mathematics: "🔢",
  English: "📖",
  Science: "🔬",
  "Social Studies": "🌍",
};

export const DIAGNOSTIC_QUESTIONS = {
  year_1_2: {
    Mathematics: [
      { q: "What number comes after 7?", options: ["6", "8", "9", "10"], answer: 1 },
      { q: "What is 3 + 2?", options: ["4", "5", "6", "7"], answer: 1 },
      { q: "Which shape has 3 sides?", options: ["Circle", "Square", "Triangle", "Star"], answer: 2 },
    ],
    English: [
      { q: "Which letter is a vowel?", options: ["B", "A", "T", "S"], answer: 1 },
      { q: "Which word rhymes with 'hat'?", options: ["dog", "cat", "sun", "book"], answer: 1 },
      { q: "How many sounds are in 'cat' (c-a-t)?", options: ["2", "3", "4", "1"], answer: 1 },
    ],
    Science: [
      { q: "Which of these is a living thing?", options: ["Rock", "Chair", "Tree", "Cloud"], answer: 2 },
      { q: "What do plants need to grow?", options: ["Darkness", "Water", "Plastic", "Cold"], answer: 1 },
      { q: "How many legs does a spider have?", options: ["6", "8", "4", "2"], answer: 1 },
    ],
  },
  year_3_4: {
    Mathematics: [
      { q: "What is 7 × 3?", options: ["21", "24", "18", "14"], answer: 0 },
      { q: "What is 1/2 of 10?", options: ["2", "5", "8", "10"], answer: 1 },
      { q: "What is 56 − 23?", options: ["33", "43", "23", "31"], answer: 0 },
    ],
    English: [
      { q: "Which word is a noun?", options: ["quickly", "running", "elephant", "blue"], answer: 2 },
      { q: "What punctuation ends a question?", options: [".", "?", "!", ","], answer: 1 },
      { q: "The cat sat ___ the mat.", options: ["in", "on", "at", "by"], answer: 1 },
    ],
    Science: [
      { q: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: 2 },
      { q: "What gas do humans breathe in?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"], answer: 1 },
      { q: "Which part of a plant makes food?", options: ["Roots", "Leaves", "Stem", "Flower"], answer: 1 },
    ],
    "Social Studies": [
      { q: "What does a compass rose show on a map?", options: ["Distance", "Direction", "Temperature", "Time"], answer: 1 },
      { q: "Which place is a rural area?", options: ["City centre", "Countryside farm", "Suburb", "Town square"], answer: 1 },
      { q: "Who puts out fires?", options: ["Police", "Teacher", "Firefighter", "Doctor"], answer: 2 },
    ],
  },
  year_5_6: {
    Mathematics: [
      { q: "What is 3/4 + 1/4?", options: ["3/8", "1", "4/8", "1/2"], answer: 1 },
      { q: "What is 12 × 11?", options: ["121", "132", "144", "112"], answer: 1 },
      { q: "Solve: x + 7 = 15. What is x?", options: ["7", "8", "9", "22"], answer: 1 },
    ],
    English: [
      { q: "'She ran like the wind' is a…", options: ["Metaphor", "Simile", "Rhyme", "Haiku"], answer: 1 },
      { q: "Which is a complete sentence?", options: ["The big blue", "Ran fast", "The dog barked loudly", "Very happy"], answer: 2 },
      { q: "What does 'arid' mean?", options: ["Very dry", "Very hot", "Very cold", "Very wet"], answer: 0 },
    ],
    Science: [
      { q: "What process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Evaporation"], answer: 1 },
      { q: "Which body system pumps blood?", options: ["Nervous", "Circulatory", "Skeletal", "Muscular"], answer: 1 },
      { q: "What force pulls objects toward Earth?", options: ["Magnetism", "Friction", "Gravity", "Push"], answer: 2 },
    ],
    "Social Studies": [
      { q: "Which civilisation built the pyramids?", options: ["Greece", "Rome", "Egypt", "China"], answer: 2 },
      { q: "What does 'scarcity' mean?", options: ["Too much of something", "Not enough for everyone", "Trading goods", "Saving money"], answer: 1 },
      { q: "Which river was central to Ancient Egypt?", options: ["Nile", "Amazon", "Thames", "Ganges"], answer: 0 },
    ],
  },

  year_7_8: {
    Mathematics: [
      { q: "Solve: 2x + 3 = 11. What is x?", options: ["2", "3", "4", "7"], answer: 2 },
      { q: "What is 15% of 80?", options: ["12", "15", "20", "8"], answer: 0 },
      { q: "Area of a triangle with base 6 and height 4?", options: ["12", "24", "10", "20"], answer: 0 },
    ],
    English: [
      { q: "Which is a metaphor?", options: ["The sun is like gold", "The sun is a golden coin", "The sun shines brightly", "Sun and fun"], answer: 1 },
      { q: "Which word is an adverb?", options: ["slow", "slowly", "slowness", "slowed"], answer: 1 },
      { q: "What is the past tense of 'run'?", options: ["runned", "ran", "running", "runs"], answer: 1 },
    ],
    Science: [
      { q: "What is the chemical symbol for water?", options: ["O₂", "H₂O", "CO₂", "NaCl"], answer: 1 },
      { q: "Which state of matter has a definite volume but no fixed shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 1 },
      { q: "What gas do plants release during photosynthesis?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"], answer: 1 },
    ],
    "Social Studies": [
      { q: "A democracy is…", options: ["Rule by one", "Rule by the people", "Rule by the military", "Rule by the wealthy"], answer: 1 },
      { q: "Which continent is Egypt in?", options: ["Asia", "Europe", "Africa", "South America"], answer: 2 },
      { q: "An economy produces mainly…", options: ["Art", "Goods and services", "Laws", "Weather"], answer: 1 },
    ],
  },

  year_9_10: {
    Mathematics: [
      { q: "Factor: x² − 9", options: ["(x−3)(x+3)", "(x−9)(x+1)", "(x+3)²", "(x−3)²"], answer: 0 },
      { q: "What is the slope of y = 2x + 5?", options: ["2", "5", "3", "−2"], answer: 0 },
      { q: "Solve: 3(x − 2) = 9. What is x?", options: ["3", "5", "6", "1"], answer: 1 },
    ],
    English: [
      { q: "'The wind whispered through the trees' is…", options: ["Simile", "Personification", "Hyperbole", "Alliteration"], answer: 1 },
      { q: "Which sentence is passive voice?", options: ["The dog chased the ball", "The ball was chased by the dog", "The dog is chasing", "Chase the ball"], answer: 1 },
      { q: "A thesis statement belongs in the…", options: ["Conclusion", "Introduction", "Footnote", "Title"], answer: 1 },
    ],
    Science: [
      { q: "Newton's second law: F = ?", options: ["mv", "ma", "mgh", "½mv²"], answer: 1 },
      { q: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 2 },
      { q: "The 'powerhouse' of the cell is the…", options: ["Nucleus", "Ribosome", "Mitochondria", "Membrane"], answer: 2 },
    ],
    "Social Studies": [
      { q: "The Industrial Revolution began in…", options: ["France", "Britain", "USA", "Japan"], answer: 1 },
      { q: "Inflation means…", options: ["Rising prices over time", "Falling prices", "Stable prices", "No trade"], answer: 0 },
      { q: "A renewable energy source is…", options: ["Coal", "Oil", "Solar", "Natural gas"], answer: 2 },
    ],
  },

  year_11_12: {
    Mathematics: [
      { q: "The derivative of x² is…", options: ["x", "2x", "2", "x³"], answer: 1 },
      { q: "If sin(θ) = 0.5, what is θ (degrees)?", options: ["30°", "45°", "60°", "90°"], answer: 0 },
      { q: "log₂(8) = ?", options: ["2", "3", "4", "8"], answer: 1 },
    ],
    English: [
      { q: "'To be or not to be' is from which play?", options: ["Macbeth", "Hamlet", "Othello", "King Lear"], answer: 1 },
      { q: "A sonnet has how many lines?", options: ["8", "10", "12", "14"], answer: 3 },
      { q: "'A fire station burns down' is an example of…", options: ["Simile", "Irony", "Metaphor", "Rhyme"], answer: 1 },
    ],
    Science: [
      { q: "The speed of light is approximately…", options: ["300 km/s", "300,000 km/s", "30,000 km/s", "3,000,000 km/s"], answer: 1 },
      { q: "DNA stands for…", options: ["Deoxyribonucleic acid", "Dinucleic acid", "Deoxyribose", "Ribonucleic acid"], answer: 0 },
      { q: "Which subatomic particle has no charge?", options: ["Proton", "Electron", "Neutron", "Photon"], answer: 2 },
    ],
    "Social Studies": [
      { q: "Who wrote 'The Wealth of Nations'?", options: ["Karl Marx", "Adam Smith", "John Maynard Keynes", "David Ricardo"], answer: 1 },
      { q: "The Cold War was between…", options: ["USA and China", "USA and USSR", "UK and Germany", "France and Russia"], answer: 1 },
      { q: "A monopoly is a market with…", options: ["Many sellers", "One seller", "Government only", "No sellers"], answer: 1 },
    ],
  },
};

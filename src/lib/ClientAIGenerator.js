/**
 * ClientAIGenerator - In-Browser AI Dynamic Question & Content Engine
 * Integrates client-side WebLLM support with an instant local algorithmic generator
 * tailored to reading levels, special educational profiles, and subject domains.
 */

import { NFOT } from './AdaptiveEngine';

// Grade / Reading level descriptors
const LEVEL_CONFIGS = {
  'Level-1-Foundational': { maxNumber: 10, wordLength: 4, sentenceLength: 'short', vocabulary: 'simple' },
  'Level-2-Standard': { maxNumber: 50, wordLength: 6, sentenceLength: 'medium', vocabulary: 'moderate' },
  'Level-3-Advanced': { maxNumber: 100, wordLength: 9, sentenceLength: 'complex', vocabulary: 'advanced' },
};

export class ClientAIGenerator {
  constructor() {
    this.webLLMEngine = null;
    this.isLLMLoading = false;
    this.isLLMReady = false;
  }

  /**
   * Optionally initialize WebLLM engine if supported by browser WebGPU.
   */
  async initWebLLM(modelName = 'Llama-3.2-1B-Instruct-q4f16_1-MLC', progressCallback = null) {
    if (this.isLLMReady || this.isLLMLoading) return;
    this.isLLMLoading = true;
    try {
      if (typeof window !== 'undefined' && 'gpu' in navigator) {
        const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
        this.webLLMEngine = await CreateMLCEngine(modelName, {
          initProgressCallback: progressCallback,
        });
        this.isLLMReady = true;
      }
    } catch (err) {
      console.warn('WebLLM WebGPU initialization bypassed, using fast local dynamic AI generator.', err);
    } finally {
      this.isLLMLoading = false;
    }
  }

  /**
   * Generates a dynamic question tailored to subject, game type, and learner profile.
   */
  async generateQuestion({
    subject = 'Math',
    gameType = 'mathdash',
    readingLevel = 'Level-2-Standard',
    neurodivergentProfile = 'General',
  } = {}) {
    const startTime = performance.now();
    const config = LEVEL_CONFIGS[readingLevel] || LEVEL_CONFIGS['Level-2-Standard'];

    // Try WebLLM if ready
    if (this.isLLMReady && this.webLLMEngine) {
      try {
        const prompt = `Generate 1 educational multiple-choice question for subject: ${subject}, level: ${readingLevel}, profile: ${neurodivergentProfile}. Respond in JSON format with fields: "question", "options" (array of 4 strings), "correctIndex" (0-3), "hint".`;
        const response = await this.webLLMEngine.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.6,
        });
        const content = response.choices[0]?.message?.content;
        const parsed = JSON.parse(content);
        const latency = performance.now() - startTime;
        return {
          ...parsed,
          generatedBy: 'WebLLM',
          latencyMs: roundMs(latency),
          efficiency: NFOT.efficiency(latency),
        };
      } catch (e) {
        // Fall through to fast local generator
      }
    }

    // Fast local procedural AI dynamic generation (<10ms latency)
    const result = this.generateLocalQuestion(subject, gameType, config, neurodivergentProfile);
    const latency = performance.now() - startTime;
    return {
      ...result,
      generatedBy: 'LocalAI',
      latencyMs: roundMs(latency),
      efficiency: NFOT.efficiency(latency),
    };
  }

  generateLocalQuestion(subject, gameType, config, profile) {
    if (gameType === 'spelling' || subject === 'English') {
      return this.generateSpellingQuestion(config, profile);
    } else if (gameType === 'numberpop' || gameType === 'mathdash' || subject === 'Math') {
      return this.generateMathQuestion(config, profile);
    } else if (gameType === 'wordscramble') {
      return this.generateWordScrambleQuestion(config, profile);
    } else if (gameType === 'pattern' || subject === 'Logic') {
      return this.generatePatternQuestion(config, profile);
    } else if (gameType === 'oddout' || subject === 'Reasoning') {
      return this.generateOddOneOutQuestion(config, profile);
    } else {
      return this.generateMathQuestion(config, profile);
    }
  }

  generateMathQuestion(config, profile) {
    const max = config.maxNumber;
    const ops = ['+', '-'];
    if (config.maxNumber >= 50) ops.push('×');
    const op = ops[Math.floor(Math.random() * ops.length)];

    let a = Math.floor(Math.random() * (max / 2)) + 1;
    let b = Math.floor(Math.random() * (max / 2)) + 1;
    if (op === '-' && a < b) [a, b] = [b, a];

    let answer = op === '+' ? a + b : op === '-' ? a - b : a * b;
    let questionText = `What is ${a} ${op} ${b}?`;

    // Generate 3 distractors
    const optionsSet = new Set([answer]);
    while (optionsSet.size < 4) {
      let offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
      let distractor = answer + offset;
      if (distractor >= 0) optionsSet.add(distractor);
    }

    const options = Array.from(optionsSet).map(String);
    shuffleArray(options);

    return {
      question: questionText,
      options,
      correctIndex: options.indexOf(String(answer)),
      hint: profile === 'Dyscalculia' ? `Try counting up from ${a}` : `Work through step by step`,
      numA: a,
      numB: b,
      operation: op,
      correctAnswer: answer,
    };
  }

  generateSpellingQuestion(config, profile) {
    const wordBank = {
      simple: ['cat', 'dog', 'sun', 'hat', 'cup', 'pen', 'box', 'run'],
      moderate: ['planet', 'garden', 'bright', 'friend', 'school', 'animal'],
      advanced: ['courageous', 'hypothesis', 'ecosystem', 'literature', 'symmetry'],
    };
    const pool = wordBank[config.vocabulary] || wordBank.moderate;
    const targetWord = pool[Math.floor(Math.random() * pool.length)];

    // Generate misspelled versions
    const distractors = [
      targetWord + 'e',
      targetWord.replace('e', 'i').replace('a', 'e'),
      targetWord.slice(0, -1),
    ];

    const options = [targetWord, ...distractors].slice(0, 4);
    shuffleArray(options);

    return {
      question: `Which is the correct spelling for: "${targetWord}"?`,
      targetWord,
      options,
      correctIndex: options.indexOf(targetWord),
      hint: `Break down the syllables: ${targetWord.slice(0, 3)}...`,
    };
  }

  generateWordScrambleQuestion(config, profile) {
    const words = ['STAR', 'MOON', 'BOOK', 'BRAIN', 'LIGHT', 'HEART', 'PLANET', 'SMART'];
    const word = words[Math.floor(Math.random() * words.length)];
    let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    while (scrambled === word) {
      scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    }

    return {
      scrambled,
      targetWord: word,
      hint: `Starts with "${word[0]}"`,
    };
  }

  generatePatternQuestion(config, profile) {
    const step = Math.floor(Math.random() * 4) + 2;
    const start = Math.floor(Math.random() * 10) + 1;
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const answer = start + step * 4;

    const optionsSet = new Set([answer, answer + step, answer - step, answer + 1]);
    const options = Array.from(optionsSet).map(String);
    shuffleArray(options);

    return {
      question: `What comes next in the sequence: ${seq.join(', ')}, ...?`,
      sequence: seq,
      options,
      correctIndex: options.indexOf(String(answer)),
      hint: `Look at the rule: adding ${step} each time!`,
    };
  }

  generateOddOneOutQuestion(config, profile) {
    const groups = [
      { items: ['Apple', 'Banana', 'Carrot', 'Orange'], odd: 'Carrot', reason: 'Carrot is a vegetable, others are fruits' },
      { items: ['Dog', 'Cat', 'Table', 'Elephant'], odd: 'Table', reason: 'Table is furniture, others are animals' },
      { items: ['Triangle', 'Square', 'Circle', 'Cube'], odd: 'Cube', reason: 'Cube is 3D, others are 2D shapes' },
      { items: ['Red', 'Blue', 'Happy', 'Green'], odd: 'Happy', reason: 'Happy is an emotion, others are colors' },
    ];
    const group = groups[Math.floor(Math.random() * groups.length)];
    const options = [...group.items];
    shuffleArray(options);

    return {
      question: 'Which item does NOT belong in the group?',
      options,
      correctIndex: options.indexOf(group.odd),
      hint: group.reason,
    };
  }
}

function roundMs(ms) {
  return Math.round(ms * 100) / 100;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export const clientAIGenerator = new ClientAIGenerator();

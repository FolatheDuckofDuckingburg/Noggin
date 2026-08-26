import { describe, it, expect } from 'vitest';
import { ClientAIGenerator } from '../src/lib/ClientAIGenerator';

describe('ClientAIGenerator - Client AI Engine', () => {
  const generator = new ClientAIGenerator();

  it('generates dynamic math questions with options and hint', async () => {
    const question = await generator.generateQuestion({
      subject: 'Math',
      gameType: 'mathdash',
      readingLevel: 'Level-1-Foundational',
    });

    expect(question).toHaveProperty('question');
    expect(question.options).toHaveLength(4);
    expect(question.correctIndex).toBeGreaterThanOrEqual(0);
    expect(question.correctIndex).toBeLessThan(4);
    expect(question.generatedBy).toBeDefined();
    expect(question.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('generates dynamic spelling questions tailored to profile', async () => {
    const question = await generator.generateQuestion({
      subject: 'English',
      gameType: 'spelling',
      readingLevel: 'Level-2-Standard',
      neurodivergentProfile: 'Dyslexia',
    });

    expect(question).toHaveProperty('targetWord');
    expect(question.options).toHaveLength(4);
    expect(question.hint).toBeDefined();
  });

  it('generates dynamic pattern sequence questions', async () => {
    const question = await generator.generateQuestion({
      subject: 'Logic',
      gameType: 'pattern',
      readingLevel: 'Level-3-Advanced',
    });

    expect(question.sequence).toHaveLength(4);
    expect(question.options).toHaveLength(4);
  });
});

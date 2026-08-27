import { describe, it, expect, beforeEach } from 'vitest';
import { TelemetryTracker } from '../src/lib/TelemetryTracker';

describe('TelemetryTracker Real Performance Analytics', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('records performance logs and calculates real skill metrics', () => {
    TelemetryTracker.recordLog({
      category: 'game',
      gameType: 'mathdash',
      subject: 'Math',
      responseTimeMs: 800,
      isCorrect: true,
      score: 15,
    });

    const skills = TelemetryTracker.calculateRealSkills();
    expect(skills.totalSessions).toBe(1);
    expect(skills['Quantitative Logic']).toBe(100);
    expect(skills.Speed).toBeGreaterThan(80);
  });
});

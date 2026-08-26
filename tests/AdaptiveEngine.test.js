import { describe, it, expect } from 'vitest';
import { NFOT, NEURODIVERGENT_STRATEGIES } from '../src/lib/AdaptiveEngine';

describe('NFOT Adaptive Engine', () => {
  it('calculates efficiency decay based on Write-Back Gap latency', () => {
    const effFast = NFOT.efficiency(32);
    const effSlow = NFOT.efficiency(500);

    expect(effFast).toBeGreaterThan(effSlow);
    expect(effFast).toBeGreaterThan(0.9);
  });

  it('provides tailored strategies for neurodivergent conditions', () => {
    expect(NEURODIVERGENT_STRATEGIES.ADHD.pace).toBe('burst');
    expect(NEURODIVERGENT_STRATEGIES.Dyslexia.strategies).toContain('Read-aloud on');
    expect(NEURODIVERGENT_STRATEGIES.Autism.pace).toBe('predictable');
  });
});

// ── NFOT Adaptive Learning Engine ───────────────────────────────────────────
// Grounded in Neural Feedback Optimization Theory (Kassim, F. — 2026,
// "Neural Feedback Optimization Theory").
//
// The Write-Back Gap (L) is the delay between a learner's estimated cognitive
// state transition and the system's adaptive response. Efficiency decays
// quadratically with latency:
//
//        E(L) = k / (L² + c)
//
// Noggin's behavioral-proxy pipeline targets L < 100 ms (render-bound ≈32 ms)
// so adaptation reads as instantaneous — the perceptual window in which
// feedback reinforces the neural state that produced it (Temporal Contingency).
//
// This engine selects the next learning target from the Zone of Proximal
// Development: a subject the learner most needs, at a difficulty just above
// their current mastery, so the task is challenging yet reachable with
// Noggimigo's support.

export const NFOT = {
  // Render-bound latency target (ms) for an adaptive response to feel
  // phase-locked to the learner's cognitive state.
  LATENCY_TARGET_MS: 32,
  // Behavioral proxy for attention drift — inactivity threshold before a
  // re-engagement nudge fires (NFOT §III).
  DRIFT_THRESHOLD_MS: 22000,
  // E(L) = k / (L² + c) — normalized efficiency of an adaptive response.
  efficiency(latencyMs, k = 1, c = 1) {
    return k / (latencyMs * latencyMs / 1e6 + c);
  },
};

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

// Map a student's onboarding placement to a preferred difficulty ceiling.
const LEVEL_CEILING = {
  "Level-1-Foundational": "easy",
  "Level-2-Standard": "medium",
  "Level-3-Advanced": "hard",
};

// ── Neurodivergent profile strategies ──
// Real adaptive levers per condition: pacing and concrete classroom supports.
export const NEURODIVERGENT_STRATEGIES = {
  ADHD: { pace: "burst", strategies: ["Short energetic bursts", "Frequent brain breaks", "Visible timer", "Instant feedback"] },
  Dyslexia: { pace: "calm", strategies: ["Read-aloud on", "Short sentences", "Sans-serif font", "Extra time"] },
  Dyscalculia: { pace: "calm", strategies: ["Number lines", "Concrete manipulatives", "Visual quantities", "One step at a time"] },
  Autism: { pace: "predictable", strategies: ["Explicit instructions", "Low-surprise routine", "Visual schedule", "Predictable structure"] },
  "Processing Difficulties": { pace: "slow", strategies: ["Extra time", "Reduced clutter", "One thing at a time", "Repeat instructions"] },
};

// Conditions that heighten priority for a given subject.
const CONDITION_SUBJECT_AFFINITY = {
  Mathematics: "Dyscalculia",
  English: "Dyslexia",
};

export function profileStrategies(profile) {
  if (!profile?.conditions) return [];
  const out = [];
  for (const c of profile.conditions) {
    const s = NEURODIVERGENT_STRATEGIES[c];
    if (s) out.push(...s.strategies);
  }
  return [...new Set(out)];
}

export function completedIds(completions) {
  return new Set((completions || []).map((c) => c.lesson_id));
}

// Mastery for a subject = blend of coverage and quality (avg score / 100).
export function subjectMastery(completions, subject) {
  const cs = (completions || []).filter((c) => c.subject === subject);
  if (!cs.length) return { mastery: 0, lessons: 0, avgScore: 0 };
  const avgScore = cs.reduce((s, c) => s + (c.score || 0), 0) / cs.length;
  return { mastery: avgScore / 100, lessons: cs.length, avgScore };
}

/**
 * Selects the next best lesson to present, NFOT-style.
 *
 * @param {object}  opts
 * @param {Array}   opts.completions  - LessonCompletion records for the learner
 * @param {Array}   opts.allLessons   - Full lesson catalogue
 * @param {string}  opts.userLevel    - Onboarding placement level
 * @param {string}  [opts.subject]    - Optional: restrict to one subject
 * @returns {{ lesson: object|null, reason: string }}
 */
export function selectNextLesson({ completions = [], allLessons = [], userLevel, subject, learningProfile } = {}) {
  const done = completedIds(completions);
  let incomplete = allLessons.filter((l) => !done.has(l.id));
  if (subject) incomplete = incomplete.filter((l) => l.subject === subject);
  if (!incomplete.length) return { lesson: null, reason: "all-complete" };

  let ceiling = DIFFICULTY_ORDER[LEVEL_CEILING[userLevel] || "medium"];
  // Tailored delivery — ease the difficulty ceiling when onboarding profiling
  // showed slow processing or low accuracy, keeping tasks in the ZPD.
  if (learningProfile) {
    const slow = learningProfile.avg_response_ms && learningProfile.avg_response_ms > 15000;
    const lowAcc = (learningProfile.accuracy_pct ?? 100) < 60;
    if (slow || lowAcc) ceiling = Math.min(ceiling, DIFFICULTY_ORDER.easy);
  }

  let best = null;
  let bestScore = -Infinity;
  for (const l of incomplete) {
    const m = subjectMastery(completions, l.subject);
    const diff = DIFFICULTY_ORDER[l.difficulty] ?? 1;

    // Need-weight: lower subject mastery → higher priority (biggest learning gap).
    const need = 1 - m.mastery;
    // ZPD fit: target difficulty scales with current mastery, capped by ceiling.
    const targetDiff = Math.min(Math.round(m.mastery * ceiling + 1), ceiling);
    const zpdFit = 1 - Math.abs(diff - targetDiff) / 2;
    // Prefer earlier lessons within a subject for sequencing stability.
    const orderBoost = -(l.order || 0) * 0.001;

    let conditionBoost = 0;
    if (learningProfile?.conditions) {
      const aff = CONDITION_SUBJECT_AFFINITY[l.subject];
      if (aff && learningProfile.conditions.includes(aff)) conditionBoost = 0.15;
    }
    const score = need * 0.6 + zpdFit * 0.35 + orderBoost + conditionBoost;
    if (score > bestScore) { bestScore = score; best = l; }
  }

  const m = subjectMastery(completions, best.subject);
  const masteryPct = Math.round(m.mastery * 100);
  return {
    lesson: best,
    reason: `${best.subject} is at ${masteryPct}% mastery — a focused session here builds the most new neural pathways.`,
    strategies: profileStrategies(learningProfile),
  };
}

/**
 * Given a just-completed lesson, decide whether to advance difficulty
 * (fast + accurate) or consolidate (slow or low score). Returns an
 * NFOT-grounded pacing recommendation.
 */
export function pacingDecision({ score, timeTakenSecs, expectedSecs }) {
  const accurate = score >= 80;
  const fast = timeTakenSecs > 12 && timeTakenSecs < expectedSecs * 0.55;
  if (accurate && fast) return { action: "advance", reason: "Mastery shown quickly — stepping up difficulty within the ZPD." };
  if (score < 60) return { action: "consolidate", reason: "Below threshold — reinforcing with a similar-easier task." };
  return { action: "hold", reason: "On pace — continuing at this difficulty." };
}

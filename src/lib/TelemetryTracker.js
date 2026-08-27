/**
 * TelemetryTracker - Real-Time Student Performance & Skill Analytics
 * Tracks actual user actions, response latencies, and accuracy across sessions,
 * persisting real logs to localStorage and calculating live cognitive skill state.
 */

const LOGS_STORAGE_KEY = 'noggin_performance_logs';

export class TelemetryTracker {
  static getLogs() {
    try {
      const saved = localStorage.getItem(LOGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  static recordLog({ category, gameType, subject, responseTimeMs, isCorrect, score, metadata = {} }) {
    const logs = this.getLogs();
    const newLog = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      timestamp: new Date().toISOString(),
      category, // 'game', 'lesson', 'communication'
      gameType,
      subject,
      responseTimeMs: responseTimeMs || 1000,
      isCorrect: isCorrect ?? true,
      score: score || 0,
      metadata,
    };

    logs.push(newLog);
    // Keep last 100 actual performance events
    if (logs.length > 100) logs.shift();

    try {
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
    } catch {}

    return newLog;
  }

  /**
   * Calculates live, real skill levels (0-100%) based on recorded performance logs.
   */
  static calculateRealSkills() {
    const logs = this.getLogs();

    if (logs.length === 0) {
      // Default baseline when student first opens app
      return {
        Speed: 50,
        Memory: 50,
        'Quantitative Logic': 50,
        Literacy: 50,
        Empathy: 50,
        totalSessions: 0,
      };
    }

    // 1. Calculate Speed (target < 2000ms response time for 100% score)
    const speedLogs = logs.filter((l) => l.responseTimeMs);
    let speedScore = 50;
    if (speedLogs.length > 0) {
      const avgTime = speedLogs.reduce((acc, l) => acc + l.responseTimeMs, 0) / speedLogs.length;
      // 500ms -> 100%, 3000ms -> 40%
      speedScore = Math.min(100, Math.max(20, Math.round(110 - avgTime / 40)));
    }

    // 2. Calculate Memory (from Memory Match or recall logs)
    const memoryLogs = logs.filter((l) => l.gameType === 'memory' || l.subject === 'Brain Training');
    let memoryScore = 50;
    if (memoryLogs.length > 0) {
      const correctRatio = memoryLogs.filter((l) => l.isCorrect).length / memoryLogs.length;
      memoryScore = Math.min(100, Math.max(30, Math.round(correctRatio * 100)));
    }

    // 3. Calculate Quantitative Logic (from Math games)
    const mathLogs = logs.filter((l) => l.subject === 'Math' || l.gameType === 'mathdash' || l.gameType === 'numberpop');
    let mathScore = 50;
    if (mathLogs.length > 0) {
      const correctRatio = mathLogs.filter((l) => l.isCorrect).length / mathLogs.length;
      mathScore = Math.min(100, Math.max(25, Math.round(correctRatio * 100)));
    }

    // 4. Calculate Literacy (from English/Spelling/Word games)
    const literacyLogs = logs.filter((l) => l.subject === 'English' || l.gameType === 'spelling' || l.gameType === 'wordscramble');
    let literacyScore = 50;
    if (literacyLogs.length > 0) {
      const correctRatio = literacyLogs.filter((l) => l.isCorrect).length / literacyLogs.length;
      literacyScore = Math.min(100, Math.max(25, Math.round(correctRatio * 100)));
    }

    // 5. Calculate Empathy (from Communication Board and SEL interactions)
    const empathyLogs = logs.filter((l) => l.category === 'communication' || l.subject === 'Social Emotional Learning');
    let empathyScore = 50;
    if (empathyLogs.length > 0) {
      empathyScore = Math.min(100, 50 + empathyLogs.length * 10);
    }

    return {
      Speed: speedScore,
      Memory: memoryScore,
      'Quantitative Logic': mathScore,
      Literacy: literacyScore,
      Empathy: empathyScore,
      totalSessions: logs.length,
    };
  }
}

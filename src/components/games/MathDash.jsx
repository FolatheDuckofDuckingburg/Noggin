import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, XCircle, RefreshCw, Zap } from 'lucide-react';
import { clientAIGenerator } from '../../lib/ClientAIGenerator';
import { TelemetryTracker } from '../../lib/TelemetryTracker';

export default function MathDash() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const loadQuestion = async () => {
    setLoading(true);
    setSelected(null);
    const q = await clientAIGenerator.generateQuestion({ gameType: 'mathdash', subject: 'Math' });
    setData(q);
    setStartTime(Date.now());
    setLoading(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleChoice = (idx) => {
    if (selected !== null) return;
    const elapsed = Date.now() - startTime;
    setSelected(idx);
    const correct = idx === data.correctIndex;
    if (correct) setScore((s) => s + 15);

    TelemetryTracker.recordLog({
      category: 'game',
      gameType: 'mathdash',
      subject: 'Math',
      responseTimeMs: elapsed,
      isCorrect: correct,
      score: correct ? 15 : 0,
    });
  };

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-8 text-center ring-1 ring-border/50">
        <Sparkles className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-muted-foreground">Generating real-time math challenge...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-3 py-1 rounded-full flex items-center gap-1">
          <Zap className="w-3 h-3" /> Math Dash ({data.generatedBy})
        </span>
        <span className="text-sm font-extrabold text-foreground">Score: {score} XP</span>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-3xl font-extrabold text-foreground mb-2">{data.question}</h3>
        <p className="text-xs text-muted-foreground">{data.hint}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {data.options.map((opt, i) => {
          let style = "bg-muted/50 hover:bg-muted border-border text-foreground";
          if (selected !== null) {
            if (i === data.correctIndex) style = "bg-green-100 border-green-500 text-green-800 font-extrabold";
            else if (i === selected) style = "bg-red-100 border-red-500 text-red-800";
          }
          return (
            <button
              key={i}
              onClick={() => handleChoice(i)}
              disabled={selected !== null}
              className={`p-5 rounded-2xl border-2 text-2xl font-extrabold transition-all flex items-center justify-center gap-2 min-h-[64px] ${style}`}
            >
              <span>{opt}</span>
              {selected !== null && i === data.correctIndex && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              {selected !== null && i === selected && i !== data.correctIndex && <XCircle className="w-5 h-5 text-red-500" />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="text-center">
          <button
            onClick={loadQuestion}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all min-h-[50px]"
          >
            <RefreshCw className="w-4 h-4" /> Next Math Problem
          </button>
        </div>
      )}
    </div>
  );
}

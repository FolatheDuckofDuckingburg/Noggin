import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { clientAIGenerator } from '../../lib/ClientAIGenerator';
import { TelemetryTracker } from '../../lib/TelemetryTracker';

export default function SpellingBee() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const loadQuestion = async () => {
    setLoading(true);
    setSelected(null);
    setIsCorrect(null);
    const q = await clientAIGenerator.generateQuestion({ gameType: 'spelling', subject: 'English' });
    setData(q);
    setStartTime(Date.now());
    setLoading(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const handleChoice = (idx) => {
    if (selected !== null) return;
    const elapsed = Date.now() - startTime;
    setSelected(idx);
    const correct = idx === data.correctIndex;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 10);

    // Record real performance telemetry event
    TelemetryTracker.recordLog({
      category: 'game',
      gameType: 'spelling',
      subject: 'English',
      responseTimeMs: elapsed,
      isCorrect: correct,
      score: correct ? 10 : 0,
    });
  };

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-8 text-center ring-1 ring-border/50">
        <Sparkles className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-muted-foreground">AI is generating a dynamic spelling prompt...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
          AI Dynamic Content ({data.generatedBy} • {data.latencyMs}ms)
        </span>
        <span className="text-sm font-extrabold text-foreground">Score: {score} XP</span>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={() => speak(data.targetWord)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition-all text-lg min-h-[50px]"
          aria-label="Listen to word"
        >
          <Volume2 className="w-6 h-6" /> Listen to Word
        </button>
        <p className="text-sm text-muted-foreground mt-3 font-medium">{data.question}</p>
        <p className="text-xs text-amber-600 font-medium mt-1">Hint: {data.hint}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {data.options.map((opt, i) => {
          let btnStyle = "bg-muted/50 hover:bg-muted border-border text-foreground";
          if (selected !== null) {
            if (i === data.correctIndex) btnStyle = "bg-green-100 border-green-500 text-green-800 font-extrabold";
            else if (i === selected) btnStyle = "bg-red-100 border-red-500 text-red-800";
          }
          return (
            <button
              key={i}
              onClick={() => handleChoice(i)}
              disabled={selected !== null}
              className={`p-4 rounded-2xl border-2 text-lg font-bold transition-all flex items-center justify-between min-h-[60px] ${btnStyle}`}
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
            <RefreshCw className="w-4 h-4" /> Next Question
          </button>
        </div>
      )}
    </div>
  );
}

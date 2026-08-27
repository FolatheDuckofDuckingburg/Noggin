import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { clientAIGenerator } from '../../lib/ClientAIGenerator';

export default function OddOneOut() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const loadQuestion = async () => {
    setLoading(true);
    setSelected(null);
    const q = await clientAIGenerator.generateQuestion({ gameType: 'oddout', subject: 'Reasoning' });
    setData(q);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleChoice = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === data.correctIndex) setScore((s) => s + 10);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-8 text-center ring-1 ring-border/50">
        <Sparkles className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-muted-foreground">Generating odd one out puzzle...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
          🔍 Odd One Out ({data.generatedBy})
        </span>
        <span className="text-sm font-extrabold text-foreground">Score: {score} XP</span>
      </div>

      <h3 className="text-2xl font-extrabold text-foreground mb-4">{data.question}</h3>

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
              className={`p-5 rounded-2xl border-2 text-xl font-bold transition-all min-h-[64px] ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div>
          <p className="text-xs text-muted-foreground mb-4">Reason: {data.hint}</p>
          <button
            onClick={loadQuestion}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all min-h-[50px]"
          >
            <RefreshCw className="w-4 h-4" /> Next Puzzle
          </button>
        </div>
      )}
    </div>
  );
}

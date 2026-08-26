import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { clientAIGenerator } from '../../lib/ClientAIGenerator';

export default function NumberPop() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popped, setPopped] = useState(null);
  const [score, setScore] = useState(0);

  const loadQuestion = async () => {
    setLoading(true);
    setPopped(null);
    const q = await clientAIGenerator.generateQuestion({ gameType: 'numberpop', subject: 'Math' });
    setData(q);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handlePop = (idx) => {
    if (popped !== null) return;
    setPopped(idx);
    if (idx === data.correctIndex) setScore((s) => s + 10);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-8 text-center ring-1 ring-border/50">
        <Sparkles className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-muted-foreground">Preparing balloon pop challenge...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          🎈 Number Pop ({data.generatedBy})
        </span>
        <span className="text-sm font-extrabold text-foreground">Score: {score} XP</span>
      </div>

      <h3 className="text-2xl font-extrabold text-foreground mb-6">Pop the balloon with the right answer for: <br /><span className="text-primary text-3xl">{data.question}</span></h3>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
        {data.options.map((opt, i) => {
          const isPop = popped === i;
          return (
            <button
              key={i}
              onClick={() => handlePop(i)}
              disabled={popped !== null}
              className={`w-24 h-28 sm:w-28 sm:h-32 rounded-full font-extrabold text-2xl shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${
                isPop
                  ? i === data.correctIndex
                    ? 'bg-green-500 text-white ring-4 ring-green-300'
                    : 'bg-red-400 text-white'
                  : 'bg-gradient-to-t from-purple-500 to-indigo-400 text-white'
              }`}
            >
              {isPop && i === data.correctIndex ? '💥' : opt}
            </button>
          );
        })}
      </div>

      {popped !== null && (
        <button
          onClick={loadQuestion}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all min-h-[50px]"
        >
          <RefreshCw className="w-4 h-4" /> Next Balloons
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { clientAIGenerator } from '../../lib/ClientAIGenerator';

export default function WordScramble() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const loadQuestion = async () => {
    setLoading(true);
    setInput('');
    setIsCorrect(null);
    const q = await clientAIGenerator.generateQuestion({ gameType: 'wordscramble', subject: 'English' });
    setData(q);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const correct = input.trim().toUpperCase() === data.targetWord.toUpperCase();
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 10);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-8 text-center ring-1 ring-border/50">
        <Sparkles className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-muted-foreground">Scrambling words with AI...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
          🔤 Word Scramble ({data.generatedBy})
        </span>
        <span className="text-sm font-extrabold text-foreground">Score: {score} XP</span>
      </div>

      <p className="text-sm text-muted-foreground mb-2">Unscramble the letters to form the word:</p>
      <div className="text-4xl sm:text-5xl font-black tracking-widest text-primary mb-4 bg-muted/30 py-4 px-6 rounded-2xl inline-block">
        {data.scrambled}
      </div>
      <p className="text-xs text-amber-600 font-medium mb-6">Hint: {data.hint}</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type word..."
          disabled={isCorrect === true}
          className="p-3 px-4 rounded-xl border-2 border-border font-bold text-lg text-center outline-none focus:border-primary uppercase tracking-wider"
        />
        <button
          type="submit"
          disabled={isCorrect === true}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow transition-all min-h-[48px]"
        >
          Check
        </button>
      </form>

      {isCorrect !== null && (
        <div className="mb-4 font-bold text-lg flex items-center justify-center gap-2">
          {isCorrect ? (
            <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-5 h-5" /> Excellent job! Correct word is {data.targetWord}!</span>
          ) : (
            <span className="text-red-500">Not quite, try again or get next word!</span>
          )}
        </div>
      )}

      {isCorrect === true && (
        <button
          onClick={loadQuestion}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all min-h-[50px]"
        >
          <RefreshCw className="w-4 h-4" /> Next Word
        </button>
      )}
    </div>
  );
}

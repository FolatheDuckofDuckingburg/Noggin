import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const CARDS_DATA = ['🃏', '🚀', '🎨', '🧩', '🃏', '🚀', '🎨', '🧩'];

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const shuffled = [...CARDS_DATA].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleFlip = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [i1, i2] = nextFlipped;
      if (cards[i1] === cards[i2]) {
        setMatched((m) => [...m, i1, i2]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-xl mx-auto text-center">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          🃏 Memory Match
        </span>
        <span className="text-sm font-extrabold text-foreground">Moves: {moves}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6 max-w-sm mx-auto">
        {cards.map((emoji, idx) => {
          const isUp = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleFlip(idx)}
              className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl text-3xl font-extrabold transition-all duration-300 flex items-center justify-center shadow-sm ${
                isUp ? 'bg-primary text-white rotate-0' : 'bg-muted hover:bg-muted/80 text-transparent'
              }`}
            >
              {isUp ? emoji : '?'}
            </button>
          );
        })}
      </div>

      {matched.length === cards.length && cards.length > 0 && (
        <div className="mb-4">
          <p className="text-lg font-extrabold text-green-600 mb-2">🎉 Memory Match Cleared in {moves} moves!</p>
          <button
            onClick={initGame}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all min-h-[50px]"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}

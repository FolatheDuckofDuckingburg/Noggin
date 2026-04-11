import { useState } from "react";
import { Brain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MemoryMatch from "../components/games/MemoryMatch";
import SpellingBee from "../components/games/SpellingBee";
import NumberPop from "../components/games/NumberPop";
import WordScramble from "../components/games/WordScramble";

const games = [
  {
    id: "memory",
    title: "Memory Match",
    description: "Flip cards to find matching pairs. Trains focus and memory!",
    emoji: "🃏",
    color: "from-blue-400 to-blue-600",
    subject: "Brain Training",
  },
  {
    id: "spelling",
    title: "Spelling Bee",
    description: "Listen and type the correct spelling of the word.",
    emoji: "🐝",
    color: "from-amber-400 to-orange-500",
    subject: "English",
  },
  {
    id: "numberpop",
    title: "Number Pop",
    description: "Pop the balloon with the correct answer before time runs out!",
    emoji: "🎈",
    color: "from-purple-400 to-purple-600",
    subject: "Math",
  },
  {
    id: "wordscramble",
    title: "Word Scramble",
    description: "Unscramble the jumbled letters to form the correct word.",
    emoji: "🔤",
    color: "from-emerald-400 to-teal-500",
    subject: "English",
  },
];

export default function Games() {
  const [active, setActive] = useState(null);

  const activeGame = games.find((g) => g.id === active);

  return (
    <div className="min-h-screen bg-background font-nunito">
      {/* Header */}
      <div className="bg-white border-b border-border/60 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-foreground">Noggin</span>
          </Link>
          {active && (
            <button onClick={() => setActive(null)} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Games
            </button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {!active ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-foreground">Game Zone 🎮</h1>
              <p className="text-muted-foreground mt-1">Pick a game and start learning through play!</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {games.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className="text-left group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className={`h-28 bg-gradient-to-br ${g.color} flex items-center justify-center`}>
                    <span className="text-6xl drop-shadow">{g.emoji}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{g.subject}</span>
                    <h3 className="font-extrabold text-lg text-foreground mt-1">{g.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{g.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                      Play Now →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-foreground">{activeGame.emoji} {activeGame.title}</h2>
              <p className="text-muted-foreground mt-1">{activeGame.description}</p>
            </div>
            {active === "memory" && <MemoryMatch />}
            {active === "spelling" && <SpellingBee />}
            {active === "numberpop" && <NumberPop />}
            {active === "wordscramble" && <WordScramble />}
          </div>
        )}
      </div>
    </div>
  );
}

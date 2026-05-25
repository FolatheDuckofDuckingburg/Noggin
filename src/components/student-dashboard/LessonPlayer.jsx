import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2, XCircle, Star, Zap, Trophy, Loader2, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const STAGES = { READING: "reading", QUIZ: "quiz", RESULT: "result" };

// Open Trivia DB category IDs
const OTDB_CATEGORY = {
  "Mathematics":     19,
  "Science":         17,
  "Social Studies":  22,
  "English":         10,
};

// Decode HTML entities returned by OpenTDB
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Transform OpenTDB result into internal { q, options, answer } format
function transformOtdb(result) {
  const options = shuffle([result.correct_answer, ...result.incorrect_answers]).map(decodeHtml);
  const answer = options.indexOf(decodeHtml(result.correct_answer));
  return { q: decodeHtml(result.question), options, answer };
}

async function fetchOtdbQuestions(subject, difficulty = "easy") {
  const cat = OTDB_CATEGORY[subject];
  const url = `https://opentdb.com/api.php?amount=5&type=multiple${cat ? `&category=${cat}` : ""}&difficulty=${difficulty}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.response_code !== 0 || !data.results?.length) throw new Error("No questions");
  return data.results.map(transformOtdb);
}

export default function LessonPlayer({ lesson, onClose, onComplete }) {
  const [stage, setStage] = useState(STAGES.READING);
  const [questions, setQuestions] = useState(lesson.questions); // start with static fallback
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [liveQuestions, setLiveQuestions] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const q = questions[qIndex];
  const isLast = qIndex === questions.length - 1;
  const score = answers.length ? Math.round((answers.filter(Boolean).length / answers.length) * 100) : 0;
  const xpEarned = Math.round(lesson.xp * (score / 100));
  const stars = score === 100 ? 3 : score >= 66 ? 2 : 1;

  const startQuiz = async () => {
    setLoadingQuiz(true);
    try {
      const live = await fetchOtdbQuestions(lesson.subject);
      setQuestions(live);
      setLiveQuestions(true);
    } catch {
      // Fallback to static questions — no crash
      setQuestions(lesson.questions);
      setLiveQuestions(false);
    } finally {
      setLoadingQuiz(false);
      setStage(STAGES.QUIZ);
      setQIndex(0);
      setSelected(null);
      setAnswers([]);
    }
  };

  const handleAnswer = () => {
    if (selected === null) return;
    const correct = selected === q.answer;
    const next = [...answers, correct];
    setAnswers(next);
    if (isLast) {
      const finalScore = Math.round((next.filter(Boolean).length / next.length) * 100);
      const finalXp = Math.round(lesson.xp * (finalScore / 100));
      setTimeout(() => {
        setStage(STAGES.RESULT);
        onComplete({ lessonId: lesson.id, title: lesson.title, subject: lesson.subject, score: finalScore, xp: finalXp });
      }, 600);
    } else {
      setTimeout(() => { setQIndex(i => i + 1); setSelected(null); }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className={`bg-gradient-to-r ${lesson.color} px-6 py-4 flex items-center justify-between`}>
          <div>
            <p className="text-white/80 text-xs font-bold uppercase tracking-wider">{lesson.subject}</p>
            <h2 className="text-white font-extrabold text-lg">{lesson.emoji} {lesson.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {stage === STAGES.QUIZ && (
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${liveQuestions ? "bg-white/20 text-white" : "bg-white/10 text-white/60"}`}>
                {liveQuestions ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {liveQuestions ? "Live" : "Offline"}
              </div>
            )}
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {stage === STAGES.QUIZ && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-1.5">
              <span>Question {qIndex + 1} of {questions.length}</span>
              <span>{answers.filter(Boolean).length} correct</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${lesson.color} transition-all`}
                style={{ width: `${(qIndex / questions.length) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AnimatePresence mode="wait">

            {/* Reading stage */}
            {stage === STAGES.READING && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="prose prose-sm max-w-none text-foreground
                  [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-foreground [&_h2]:mt-0
                  [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground
                  [&_strong]:font-bold [&_blockquote]:bg-primary/5 [&_blockquote]:border-primary [&_blockquote]:rounded-xl [&_blockquote]:px-4 [&_blockquote]:py-3
                  [&_ol]:space-y-1 [&_ul]:space-y-1">
                  <ReactMarkdown>{lesson.content}</ReactMarkdown>
                </div>
                <Button onClick={startQuiz} disabled={loadingQuiz}
                  className={`mt-6 w-full rounded-2xl font-extrabold text-base h-12 bg-gradient-to-r ${lesson.color} border-0`}>
                  {loadingQuiz ? (
                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading Quiz…</>
                  ) : (
                    <>Start Quiz <ChevronRight className="w-5 h-5 ml-1" /></>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Quiz stage */}
            {stage === STAGES.QUIZ && q && (
              <motion.div key={`q-${qIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-5">
                <p className="text-lg font-extrabold text-foreground leading-snug">{q.q}</p>
                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isAnswered = selected !== null;
                    const isCorrect = i === q.answer;
                    return (
                      <button key={i} onClick={() => !isAnswered && setSelected(i)}
                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-bold text-sm transition-all
                          ${!isAnswered ? "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer" : "cursor-default"}
                          ${isSelected && isAnswered && isCorrect ? "border-green-500 bg-green-50 text-green-700" : ""}
                          ${isSelected && isAnswered && !isCorrect ? "border-red-400 bg-red-50 text-red-600" : ""}
                          ${!isSelected && isAnswered && isCorrect ? "border-green-400 bg-green-50/50" : ""}
                          ${isSelected && !isAnswered ? "border-primary bg-primary/5" : ""}
                        `}>
                        <span className="mr-3 font-extrabold text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {isAnswered && isCorrect && <CheckCircle2 className="inline w-4 h-4 ml-2 text-green-500" />}
                        {isSelected && isAnswered && !isCorrect && <XCircle className="inline w-4 h-4 ml-2 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
                <Button onClick={handleAnswer} disabled={selected === null}
                  className={`w-full rounded-2xl font-extrabold h-12 bg-gradient-to-r ${lesson.color} border-0`}>
                  {isLast ? "Finish Lesson" : "Next Question"} <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </motion.div>
            )}

            {/* Result stage */}
            {stage === STAGES.RESULT && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-5 py-4">
                <div className="text-6xl">{score === 100 ? "🏆" : score >= 66 ? "🌟" : "💪"}</div>
                <div>
                  <h3 className="text-2xl font-extrabold text-foreground">
                    {score === 100 ? "Perfect Score!" : score >= 66 ? "Great Job!" : "Keep Practicing!"}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">You scored {score}% on this lesson.</p>
                </div>
                <div className="flex justify-center gap-1">
                  {[1,2,3].map(s => (
                    <Star key={s} className={`w-8 h-8 ${s <= stars ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-center">
                    <p className="text-2xl font-extrabold text-amber-600 flex items-center gap-1">
                      <Zap className="w-5 h-5" /> +{xpEarned}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">XP Earned</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3 text-center">
                    <p className="text-2xl font-extrabold text-blue-600">{score}%</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Score</p>
                  </div>
                </div>
                <Button onClick={onClose}
                  className={`w-full rounded-2xl font-extrabold h-12 bg-gradient-to-r ${lesson.color} border-0`}>
                  Back to Dashboard <Trophy className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

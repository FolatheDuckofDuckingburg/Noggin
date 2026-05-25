import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock, Zap } from "lucide-react";

const MASTERY_LEVELS = [
  { min: 0,   max: 0,   label: "Not Started",  color: "bg-muted text-muted-foreground border-border/40" },
  { min: 1,   max: 49,  label: "Beginner",     color: "bg-amber-50 text-amber-700 border-amber-200" },
  { min: 50,  max: 74,  label: "Developing",   color: "bg-blue-50 text-blue-700 border-blue-200" },
  { min: 75,  max: 89,  label: "Proficient",   color: "bg-purple-50 text-purple-700 border-purple-200" },
  { min: 90,  max: 100, label: "Master",       color: "bg-green-50 text-green-700 border-green-200" },
];

function getMastery(score) {
  return MASTERY_LEVELS.find(l => score >= l.min && score <= l.max) || MASTERY_LEVELS[0];
}

const SUBJECT_TOPICS = {
  Mathematics: [
    { name: "Counting & Numbers", score: 100 },
    { name: "Addition & Subtraction", score: 95 },
    { name: "Multiplication", score: 80 },
    { name: "Division", score: 72 },
    { name: "Fractions", score: 60 },
    { name: "Decimals", score: 35 },
    { name: "Geometry", score: 0 },
    { name: "Introduction to Algebra", score: 0 },
  ],
  English: [
    { name: "Phonics & Reading", score: 100 },
    { name: "Vocabulary", score: 85 },
    { name: "Comprehension", score: 70 },
    { name: "Grammar", score: 55 },
    { name: "Writing", score: 40 },
    { name: "Context Clues", score: 30 },
    { name: "Literary Devices", score: 0 },
    { name: "Essay Writing", score: 0 },
    { name: "Literature", score: 70 },
  ],
  Science: [
    { name: "Living vs Non-living Things", score: 100 },
    { name: "Plants & Animals", score: 90 },
    { name: "Electricity", score: 65 },
    { name: "Introduction to Biology", score: 45 },
    { name: "Earth and Space Science", score: 0 },
    { name: "Weather", score: 0 },
    { name: "Introduction to Chemistry", score: 0 },
    { name: "Introduction to Physics", score: 0 },
  ],
  "Social Studies": [
    { name: "My Community", score: 100 },
    { name: "Maps & Geography", score: 75 },
    { name: "World Cultures", score: 50 },
    { name: "Data Analysis", score: 30 },
    { name: "Government", score: 0 },
    { name: "Economics", score: 0 },
    { name: "Citizenship", score: 0 },
    { name: "Global Issues", score: 0 },
  ],
};

const SUBJECT_COLORS = {
  Mathematics: { bar: "bg-blue-500", gradient: "from-blue-500 to-blue-600", ring: "ring-blue-200", emoji: "🔢" },
  English:     { bar: "bg-emerald-500", gradient: "from-emerald-500 to-teal-500", ring: "ring-emerald-200", emoji: "📖" },
  Science:     { bar: "bg-purple-500", gradient: "from-purple-500 to-violet-600", ring: "ring-purple-200", emoji: "🔬" },
  "Social Studies": { bar: "bg-amber-500", gradient: "from-amber-500 to-orange-500", ring: "ring-amber-200", emoji: "🌍" },
};

function TopicNode({ topic, index, isLast }) {
  const mastery = getMastery(topic.score);
  const unlocked = topic.score > 0;
  const completed = topic.score >= 90;

  return (
    <div className="flex items-start gap-3">
      {/* Line connector */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.07 }}
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all
            ${completed ? "bg-green-500 border-green-400" : unlocked ? "bg-white border-primary" : "bg-muted border-border/40"}`}
        >
          {completed ? <CheckCircle2 className="w-5 h-5 text-white" /> :
           unlocked   ? <Circle className="w-5 h-5 text-primary fill-primary/20" /> :
                        <Lock className="w-4 h-4 text-muted-foreground" />}
        </motion.div>
        {!isLast && <div className={`w-0.5 h-8 mt-1 ${unlocked ? "bg-primary/30" : "bg-border/40"}`} />}
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 + 0.1 }}
        className="flex-1 pb-6">
        <div className={`border rounded-xl px-4 py-3 ${mastery.color}`}>
          <div className="flex items-center justify-between mb-1.5">
            <p className={`text-sm font-bold ${unlocked ? "" : "text-muted-foreground"}`}>{topic.name}</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${mastery.color}`}>{mastery.label}</span>
          </div>
          {unlocked && (
            <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-current opacity-60"
                initial={{ width: 0 }} animate={{ width: `${topic.score}%` }} transition={{ duration: 0.6, delay: index * 0.07 }} />
            </div>
          )}
          {unlocked && (
            <p className="text-xs mt-1 opacity-70">{topic.score}% mastery</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function SubjectMasteryMap({ subject }) {
  const topics = SUBJECT_TOPICS[subject] || [];
  const colors = SUBJECT_COLORS[subject] || {};
  const avgScore = Math.round(topics.filter(t => t.score > 0).reduce((s, t) => s + t.score, 0) / (topics.filter(t => t.score > 0).length || 1));
  const masteryLevel = getMastery(avgScore);
  const completedCount = topics.filter(t => t.score >= 90).length;

  return (
    <div className="space-y-5">
      {/* Subject header */}
      <div className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-5 flex items-center justify-between`}>
        <div>
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider">Mastery Map</p>
          <h3 className="text-white font-extrabold text-xl mt-0.5">{colors.emoji} {subject}</h3>
          <p className="text-white/75 text-sm mt-1">{completedCount}/{topics.length} topics mastered</p>
        </div>
        <div className="text-center bg-white/20 rounded-2xl px-5 py-3">
          <p className="text-3xl font-extrabold text-white">{avgScore}%</p>
          <p className="text-white/70 text-xs mt-0.5">Avg Mastery</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {MASTERY_LEVELS.slice(1).map(l => (
          <span key={l.label} className={`text-xs font-bold px-3 py-1 rounded-full border ${l.color}`}>{l.label}</span>
        ))}
      </div>

      {/* Topic map */}
      <div className="bg-white border border-border/40 rounded-2xl p-5">
        <h4 className="font-extrabold text-foreground mb-4">Learning Path</h4>
        {topics.map((topic, i) => (
          <TopicNode key={topic.name} topic={topic} index={i} isLast={i === topics.length - 1} />
        ))}
      </div>
    </div>
  );
}

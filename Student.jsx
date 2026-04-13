import { useState, useEffect } from "react";
import {
  Brain, Star, Flame, Trophy, Play, Clock,
  BookOpen, Calculator, Atom, Globe,
  ChevronRight, Bell, Zap, Target, Bot, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AiTutor from "../components/dashboard/AiTutor";

// ─── Static lesson data ──────────────────────────────────────────────────────

const todayLessons = [
  { id: 1, subject: "Mathematics", title: "Adding Fractions with Unlike Denominators", duration: "12 min", xp: 30, done: true, emoji: "🔢" },
  { id: 2, subject: "English", title: "Identify the Main Idea", duration: "10 min", xp: 25, done: true, emoji: "📖" },
  { id: 3, subject: "Mathematics", title: "Subtracting Fractions Practice", duration: "8 min", xp: 20, done: false, emoji: "🔢", current: true },
  { id: 4, subject: "Science", title: "Planets of the Solar System", duration: "15 min", xp: 35, done: false, emoji: "🔬" },
  { id: 5, subject: "English", title: "Vocabulary: Context Clues", duration: "10 min", xp: 25, done: false, emoji: "📖" },
];

const defaultCourses = [
  { id: 1, name: "Mathematics", emoji: "🔢", icon: Calculator, level: "Level 4", unit: "Fractions & Decimals", progress: 72, xp: 340, totalXp: 500, color: "from-blue-500 to-blue-600", streak: 5, lessons: 18, completedLessons: 13 },
  { id: 2, name: "English",     emoji: "📖", icon: BookOpen,   level: "Level 3", unit: "Reading Comprehension", progress: 58, xp: 210, totalXp: 400, color: "from-emerald-500 to-teal-500", streak: 3, lessons: 15, completedLessons: 9 },
  { id: 3, name: "Science",     emoji: "🔬", icon: Atom,       level: "Level 2", unit: "The Solar System",      progress: 45, xp: 120, totalXp: 300, color: "from-purple-500 to-violet-600", streak: 1, lessons: 12, completedLessons: 5 },
  { id: 4, name: "Social Studies", emoji: "🌍", icon: Globe,   level: "Level 2", unit: "World Cultures",        progress: 30, xp: 80,  totalXp: 300, color: "from-amber-500 to-orange-500", streak: 0, lessons: 10, completedLessons: 3 },
];

const achievements = [
  { emoji: "🔥", label: "7-Day Streak",  unlocked: true },
  { emoji: "🏆", label: "Top Scorer",    unlocked: true },
  { emoji: "⚡", label: "Speed Run",     unlocked: true },
  { emoji: "🌟", label: "Star Pupil",    unlocked: true },
  { emoji: "🎯", label: "Perfect Quiz",  unlocked: false },
  { emoji: "🧠", label: "Brain Power",   unlocked: false },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekActivity = [true, true, true, false, true, true, false];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatPill({ icon: Icon, value, label, color }) {
  return (
    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5">
      <Icon className={`w-4 h-4 ${color}`} />
      <div>
        <p className="text-white font-extrabold text-sm leading-none">{value}</p>
        <p className="text-white/70 text-xs mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <motion.div whileHover={{ y: -2 }}
      className="bg-white border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className={`bg-gradient-to-r ${course.color} px-5 py-4 flex items-center justify-between`}>
        <div>
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider">{course.level}</p>
          <h3 className="text-white font-extrabold text-base mt-0.5">{course.name}</h3>
          <p className="text-white/80 text-xs mt-1">{course.unit}</p>
        </div>
        <span className="text-4xl drop-shadow">{course.emoji}</span>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
          <span>{course.completedLessons}/{course.lessons} lessons</span>
          <span>{course.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
            initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 0.7 }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-bold text-foreground">{course.xp} / {course.totalXp} XP</span>
          </div>
          {course.streak > 0 && (
            <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
              <Flame className="w-3.5 h-3.5" /> {course.streak}d streak
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LessonRow({ lesson, index }) {
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}
      className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
        lesson.done ? "opacity-50" : lesson.current ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
      }`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg ${
        lesson.done ? "bg-green-100" : lesson.current ? "bg-primary/10" : "bg-muted"}`}>
        {lesson.done ? "✅" : lesson.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold truncate ${lesson.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {lesson.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.duration}</span>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1"><Zap className="w-3 h-3" />+{lesson.xp} XP</span>
        </div>
      </div>
      {lesson.current ? (
        <Button size="sm" className="rounded-full gap-1.5 font-bold shrink-0 text-xs h-8 px-3">
          <Play className="w-3 h-3 fill-current" /> Continue
        </Button>
      ) : !lesson.done ? (
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
      ) : null}
    </motion.div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function init() {
      const me = await base44.auth.me();
      setUser(me);
      const records = await base44.entities.StudentProgress.filter({ created_by: me.email });
      setProgress(records);
      setLoadingData(false);
    }
    init();
  }, []);

  // Merge real progress with defaults
  const courses = defaultCourses.map(c => {
    const real = progress.find(p => p.subject === c.name);
    if (!real) return c;
    return {
      ...c,
      completedLessons: real.lessons_completed ?? c.completedLessons,
      lessons: real.total_lessons ?? c.lessons,
      xp: real.xp_earned ?? c.xp,
      streak: real.streak_days ?? c.streak,
      progress: real.total_lessons > 0
        ? Math.round((real.lessons_completed / real.total_lessons) * 100)
        : c.progress,
    };
  });

  const totalXp = courses.reduce((s, c) => s + c.xp, 0);
  const completedToday = todayLessons.filter(l => l.done).length;
  const dailyGoalPct = Math.round((completedToday / todayLessons.length) * 100);
  const displayName = user?.full_name?.split(" ")[0] || "there";
  const initials = user?.full_name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-[#f7f8fc] font-nunito">

      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-primary via-blue-500 to-blue-700 px-6 pt-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white">Noggin</span>
            </Link>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                <Bell className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => base44.auth.logout()}
                className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 text-white" />
              </button>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-sm">
                {initials}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Hey, {displayName}! 👋</h1>
            <p className="text-white/75 text-sm mt-1">You've completed {completedToday} of {todayLessons.length} lessons today.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <StatPill icon={Flame} value="7"            label="Day streak"  color="text-amber-300" />
            <StatPill icon={Star}  value={totalXp}      label="Total XP"    color="text-yellow-300" />
            <StatPill icon={Trophy} value="4"           label="Badges"      color="text-orange-300" />
            <StatPill icon={Target} value={`${dailyGoalPct}%`} label="Daily goal" color="text-green-300" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-12 space-y-6">

        {/* ── Daily Goal Card ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-border/40 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-extrabold text-foreground">Daily Goal</p>
              <p className="text-xs text-muted-foreground mt-0.5">{completedToday} of {todayLessons.length} lessons complete</p>
            </div>
            <span className="text-2xl font-extrabold text-primary">{dailyGoalPct}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
              initial={{ width: 0 }} animate={{ width: `${dailyGoalPct}%` }} transition={{ duration: 0.8 }} />
          </div>
          <div className="flex items-center justify-between mt-4">
            {weekDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${weekActivity[i] ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  {weekActivity[i] ? "✓" : d}
                </div>
                <span className="text-xs text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-border/40 rounded-2xl p-1 shadow-sm overflow-x-auto">
          {["overview", "lessons", "progress", "achievements", "ai tutor"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all
                ${activeTab === tab ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
              {tab === "ai tutor" ? "🧠 AI Tutor" : tab}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-wider">Up Next</p>
                    <p className="text-white font-extrabold text-base mt-1">Subtracting Fractions Practice</p>
                    <p className="text-white/75 text-xs mt-1">Mathematics · 8 min · +20 XP</p>
                  </div>
                  <Button className="bg-white text-orange-500 hover:bg-white/90 font-extrabold rounded-full gap-2 shrink-0 shadow">
                    <Play className="w-4 h-4 fill-current" /> Resume
                  </Button>
                </div>
                <div>
                  <h2 className="font-extrabold text-foreground mb-3">Your Courses</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {courses.map((c, i) => (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                        <CourseCard course={c} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="bg-white border border-border/40 rounded-2xl shadow-sm p-5">
                <h2 className="font-extrabold text-foreground mb-1">Today's Lessons</h2>
                <p className="text-xs text-muted-foreground mb-4">Complete all lessons to hit your daily goal!</p>
                <div className="space-y-1">
                  {todayLessons.map((lesson, i) => (
                    <LessonRow key={lesson.id} lesson={lesson} index={i} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="space-y-4">
                {loadingData ? (
                  <div className="text-center py-12 text-muted-foreground">Loading your progress...</div>
                ) : courses.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white border border-border/40 rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xl`}>{c.emoji}</div>
                        <div>
                          <p className="font-extrabold text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.level} · {c.unit}</p>
                        </div>
                      </div>
                      <span className="text-xl font-extrabold text-foreground">{c.progress}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
                      <motion.div className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                        initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 0.7, delay: i * 0.1 }} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
                      <span>{c.completedLessons} / {c.lessons} lessons done</span>
                      <span className="text-amber-600 font-bold flex items-center gap-1"><Zap className="w-3 h-3" />{c.xp} XP earned</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="bg-white border border-border/40 rounded-2xl shadow-sm p-5">
                <h2 className="font-extrabold text-foreground mb-1">Achievements</h2>
                <p className="text-xs text-muted-foreground mb-5">Earn badges by completing milestones!</p>
                <div className="grid grid-cols-3 gap-4">
                  {achievements.map((a, i) => (
                    <motion.div key={a.label} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all
                        ${a.unlocked ? "border-amber-200 bg-amber-50" : "border-border/40 bg-muted/40 opacity-50"}`}>
                      <span className="text-3xl">{a.unlocked ? a.emoji : "🔒"}</span>
                      <span className="text-xs font-bold text-foreground leading-tight">{a.label}</span>
                      {a.unlocked && <span className="text-xs text-amber-600 font-bold">Unlocked!</span>}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ai tutor" && <AiTutor />}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

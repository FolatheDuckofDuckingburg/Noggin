import { Button } from "src/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Flame, Star, CheckCircle2, Zap, BookOpen, BarChart2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
{ value: "AI-Powered", label: "Adaptive Learning" },
{ value: "100%", label: "Free for Parents, Teachers, and Students" },
{ value: "GitHub", label: "@FolatheDuckofDuckingburg" }];


const TRUST = [
"AI-powered adaptive learning",
"Real-time parent dashboards",
"Streaks & gamified rewards",
];


export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-violet-400/6 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-bold mb-7">
                <Sparkles className="w-3.5 h-3.5" />
                Free nonprofit EdTech platform · Funded by GitHub Sponsors
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl md:text-6xl lg:text-[64px] font-black text-foreground leading-[1.05] tracking-tight">
              Learning that<br />
              <span className="relative text-primary">
                Adapts to You.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 340 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9C60 3 140 1 200 5s120 2 136-3" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-7 text-xl text-muted-foreground leading-relaxed max-w-lg">
              Noggin is an AI-powered EdTech platform that diagnoses each child's exact skill level, builds a adaptive learning path, and keeps them motivated with streaks, XP, and real rewards.
            </motion.p>

            {/* Trust bullets */}
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
              {TRUST.map((t) =>
              <li key={t} className="flex items-center gap-2 text-sm text-foreground font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {t}
                </li>
              )}
            </motion.ul>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
            className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link to="/student">
                <Button size="lg" className="rounded-2xl px-8 font-extrabold gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all h-12 w-full sm:w-auto">
                  Start for Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/parent">
                <Button size="lg" variant="outline" className="rounded-2xl px-8 font-extrabold gap-2 h-12 w-full sm:w-auto border-2">
                  <BarChart2 className="w-4 h-4" /> View Parent Dashboard
                </Button>
              </Link>
            </motion.div>

          {/* ── Right: App Preview ── */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block">

            {/* Main card */}
            <div className="relative bg-white rounded-3xl border border-border/60 shadow-2xl overflow-hidden">
              {/* Fake header */}
              <div className="bg-gradient-to-r from-primary to-blue-600 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-white" />
                  <span className="text-white font-extrabold">Noggin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-300" />
                    <span className="text-white font-extrabold text-xs">5 day streak</span>
                  </div>
                  <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                    <span className="text-white font-extrabold text-xs">1,240 XP</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Today's Learning Path</p>

                {[
                { emoji: "🔢", subject: "Mathematics", lesson: "Adding Fractions", pct: 100, color: "bg-blue-500" },
                { emoji: "📖", subject: "English", lesson: "Reading: Charlotte's Web", pct: 60, color: "bg-emerald-500" },
                { emoji: "🔬", subject: "Science", lesson: "The Solar System", pct: 0, color: "bg-purple-500" }].
                map((l, i) =>
                <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl border-2 ${i === 0 ? "border-green-200 bg-green-50" : i === 1 ? "border-primary/20 bg-primary/5" : "border-border/40"}`}>
                    <div className={`w-10 h-10 rounded-xl ${l.color} flex items-center justify-center text-xl shrink-0`}>{l.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{l.subject}</p>
                      <p className="font-extrabold text-sm text-foreground truncate">{l.lesson}</p>
                      <div className="h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                        <div className={`h-full rounded-full ${l.color} transition-all`} style={{ width: `${l.pct}%` }} />
                      </div>
                    </div>
                    {i === 0 && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                    {i === 1 && <span className="text-xs font-extrabold text-primary shrink-0">60%</span>}
                    {i === 2 && <span className="text-xs text-muted-foreground shrink-0">Start →</span>}
                  </div>
                )}

                {/* Badge unlocked toast */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-xs font-extrabold text-amber-800">Badge Unlocked!</p>
                    <p className="text-xs text-amber-700">Math Wizard · +100 pts</p>
                  </div>
                  <div className="ml-auto flex">
                    {[1, 2, 3].map((s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating parent card */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -left-14 top-1/3 bg-white rounded-2xl border border-border/60 shadow-lg p-4 w-52">
              <p className="text-xs font-extrabold text-foreground mb-2 flex items-center gap-1.5"><BarChart2 className="w-3.5 h-3.5 text-violet-500" /> Parent Insight</p>
              <p className="text-xs text-muted-foreground">Alex improved <strong className="text-green-600">+18%</strong> in Mathematics this week!</p>
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full" />
              </div>
            </motion.div>

            {/* Floating AI card */}
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-10 bottom-12 bg-white rounded-2xl border border-border/60 shadow-lg p-4 w-48">
              <div className="flex items-center gap-2 mb-1.5">
                <Brain className="w-4 h-4 text-primary" />
                <p className="text-xs font-extrabold text-foreground">AI Tutor</p>
              </div>
              <p className="text-xs text-muted-foreground">"Great work! Try Lesson 4 to master multiplication."</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/40 pt-10">
          {STATS.map((s) =>
          <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground font-semibold mt-1">{s.label}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

}

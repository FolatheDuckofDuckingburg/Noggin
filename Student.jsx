import { useState } from "react";
import { Brain, Star, Flame, BookOpen, Trophy, Play, Clock, TrendingUp, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const subjects = [
  { name: "Mathematics", emoji: "🔢", progress: 72, color: "bg-blue-500", light: "bg-blue-50 text-blue-600" },
  { name: "English", emoji: "📖", progress: 58, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
  { name: "Science", emoji: "🔬", progress: 45, color: "bg-purple-500", light: "bg-purple-50 text-purple-600" },
  { name: "Social Studies", emoji: "🌍", progress: 30, color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
];

const recentActivity = [
  { title: "Math Quiz – Level 3", time: "2 hours ago", score: "90%", icon: "🏆" },
  { title: "English Reading Exercise", time: "Yesterday", score: "75%", icon: "📖" },
  { title: "Science Experiment Sim", time: "2 days ago", score: "88%", icon: "🔬" },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background font-nunito">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl">Noggin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 text-sm font-bold">
              <Flame className="w-4 h-4 text-amber-300" /> 7-day streak!
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 text-sm font-bold">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 1,240 pts
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">Good morning, Alex! 👋</h1>
          <p className="mt-1 text-white/80">You're on a roll — keep going!</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Play */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider opacity-80">Up Next</p>
            <h2 className="text-xl font-extrabold mt-1">Math Challenge – Fractions</h2>
            <p className="text-sm opacity-80 mt-1">Estimated 10 minutes · Level 4</p>
          </div>
          <Button className="bg-white text-orange-500 hover:bg-white/90 font-bold rounded-full gap-2 shrink-0">
            <Play className="w-4 h-4 fill-current" /> Play Now
          </Button>
        </motion.div>

        {/* Subject Progress */}
        <div>
          <h2 className="text-lg font-extrabold text-foreground mb-4">Your Subjects</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {subjects.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-card border border-border/60 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="font-bold text-foreground">{s.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.light}`}>{s.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${s.color}`} initial={{ width: 0 }} animate={{ width: `${s.progress}%` }} transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity + Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-extrabold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="bg-card border border-border/60 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {a.time}</p>
                  </div>
                  <span className="text-sm font-extrabold text-primary shrink-0">{a.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-foreground mb-4">Achievements</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: "🏆", label: "Top Scorer" },
                { emoji: "🔥", label: "On Fire" },
                { emoji: "⚡", label: "Speed Run" },
                { emoji: "🌟", label: "Star Pupil" },
                { emoji: "🎯", label: "Sharp Eye" },
                { emoji: "🧠", label: "Brain Power" },
              ].map((a) => (
                <div key={a.label} className="bg-card border border-border/60 rounded-xl p-3 flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl">{a.emoji}</span>
                  <span className="text-xs font-bold text-muted-foreground">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

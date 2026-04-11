import { Brain, TrendingUp, Clock, Star, MessageCircle, Calendar, ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const subjects = [
  { name: "Mathematics", emoji: "🔢", progress: 72, change: "+8%", color: "bg-blue-500", light: "bg-blue-50 text-blue-600" },
  { name: "English", emoji: "📖", progress: 58, change: "+3%", color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
  { name: "Science", emoji: "🔬", progress: 45, change: "+12%", color: "bg-purple-500", light: "bg-purple-50 text-purple-600" },
  { name: "Social Studies", emoji: "🌍", progress: 30, change: "+5%", color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
];

const weeklyActivity = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 35 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 20 },
  { day: "Sun", minutes: 0 },
];

const insights = [
  { icon: "🎉", title: "Alex is excelling in Math!", body: "Scored 90% on the last 3 quizzes. The adaptive difficulty is increasing." },
  { icon: "💡", title: "Science needs more practice", body: "Alex has been spending less time on Science. Consider encouraging 10 more minutes daily." },
  { icon: "🔥", title: "7-day learning streak!", body: "Alex has logged in every day this week. Consistency is key to neuroplasticity." },
];

const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));

export default function ParentDashboard() {
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
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-semibold">Parent View</span>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">PJ</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Child selector */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Alex's Progress</h1>
            <p className="text-muted-foreground mt-1">Age 10 · Grade 4 · ADHD profile</p>
          </div>
          <div className="flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-full text-sm font-bold">
            <Flame className="w-4 h-4 text-amber-500" /> 7-day streak
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Sessions This Week", value: "6", icon: Calendar, color: "text-blue-600 bg-blue-50" },
            { label: "Avg. Session Time", value: "28m", icon: Clock, color: "text-purple-600 bg-purple-50" },
            { label: "Overall Progress", value: "54%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
            { label: "Points Earned", value: "1,240", icon: Star, color: "text-amber-600 bg-amber-50" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-card border border-border/60 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Subject Progress */}
          <div>
            <h2 className="text-lg font-extrabold text-foreground mb-4">Subject Progress</h2>
            <div className="space-y-3">
              {subjects.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-card border border-border/60 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.emoji}</span>
                      <span className="font-bold text-sm text-foreground">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600">{s.change}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.light}`}>{s.progress}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full ${s.color}`} initial={{ width: 0 }} animate={{ width: `${s.progress}%` }} transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div>
            <h2 className="text-lg font-extrabold text-foreground mb-4">This Week's Activity</h2>
            <div className="bg-card border border-border/60 rounded-2xl p-5">
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyActivity.map((d) => (
                  <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
                      <motion.div
                        className={`w-full rounded-t-lg ${d.minutes > 0 ? "bg-primary" : "bg-muted"}`}
                        initial={{ height: 0 }}
                        animate={{ height: maxMinutes > 0 ? `${(d.minutes / maxMinutes) * 100}%` : "4px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ minHeight: d.minutes > 0 ? "8px" : "4px" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">{d.day}</span>
                    <span className="text-xs font-bold text-foreground">{d.minutes > 0 ? `${d.minutes}m` : "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h2 className="text-lg font-extrabold text-foreground mb-4">AI Insights</h2>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-card border border-border/60 rounded-xl p-4 hover:shadow-sm transition-all">
                <span className="text-2xl shrink-0">{ins.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-foreground">{ins.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{ins.body}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Teacher */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="font-bold text-foreground">Questions about Alex's progress?</p>
            <p className="text-sm text-muted-foreground mt-0.5">Ms. Rodriguez is available for a check-in.</p>
          </div>
          <Button className="gap-2 rounded-full font-bold shrink-0">
            <MessageCircle className="w-4 h-4" /> Message Teacher
          </Button>
        </div>
      </div>
    </div>
  );
}

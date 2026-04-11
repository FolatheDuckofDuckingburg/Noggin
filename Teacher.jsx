import { Brain, Users, TrendingUp, BookOpen, AlertCircle, CheckCircle2, Clock, BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const students = [
  { name: "Alex Johnson", progress: 72, status: "on-track", lastActive: "Today", subject: "Math" },
  { name: "Maya Patel", progress: 85, status: "excelling", lastActive: "Today", subject: "English" },
  { name: "Liam Torres", progress: 38, status: "needs-help", lastActive: "3 days ago", subject: "Science" },
  { name: "Zoe Kim", progress: 60, status: "on-track", lastActive: "Yesterday", subject: "Math" },
  { name: "Noah Williams", progress: 91, status: "excelling", lastActive: "Today", subject: "Social Studies" },
  { name: "Ella Brown", progress: 25, status: "needs-help", lastActive: "5 days ago", subject: "English" },
];

const statusConfig = {
  "on-track": { label: "On Track", color: "bg-blue-50 text-blue-600" },
  "excelling": { label: "Excelling", color: "bg-green-50 text-green-600" },
  "needs-help": { label: "Needs Help", color: "bg-red-50 text-red-600" },
};

const stats = [
  { label: "Total Students", value: "24", icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "Avg. Progress", value: "67%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  { label: "Need Attention", value: "4", icon: AlertCircle, color: "text-red-600 bg-red-50" },
  { label: "Sessions Today", value: "18", icon: Clock, color: "text-amber-600 bg-amber-50" },
];

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-background font-nunito">
      {/* Header */}
      <div className="bg-white border-b border-border/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-foreground">Noggin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-semibold">Ms. Rodriguez</span>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">MR</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-1">Class 4B · 24 students</p>
          </div>
          <Button className="gap-2 rounded-full font-bold">
            <Plus className="w-4 h-4" /> Add Student
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-card border border-border/60 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Students Table */}
        <div>
          <h2 className="text-lg font-extrabold text-foreground mb-4">Student Progress</h2>
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Progress</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {students.map((s, i) => (
                    <motion.tr key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            {s.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-semibold text-sm text-foreground">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{s.subject}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="text-sm font-bold text-foreground">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusConfig[s.status].color}`}>
                          {statusConfig[s.status].label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{s.lastActive}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-lg font-extrabold text-foreground mb-4">Needs Attention</h2>
          <div className="space-y-3">
            {students.filter(s => s.status === "needs-help").map((s) => (
              <div key={s.name} className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Progress stalled at {s.progress}% · Last active {s.lastActive}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full font-bold text-xs shrink-0">Send Nudge</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

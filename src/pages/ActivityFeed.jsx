import React, { useEffect, useState } from "react";
import { Activity, Zap } from "lucide-react";
import PageShell from "../components/PageShell";
import CognitiveSkillMap from "../components/CognitiveSkillMap";
import { TelemetryTracker } from "../lib/TelemetryTracker";
import { BADGE_RULES } from "../data/lessons";

const SUBJECT_EMOJI = {
  Mathematics: "🔢",
  Math: "🔢",
  English: "📖",
  Science: "🔬",
  "Social Studies": "🌍",
  History: "🏛️",
  "Social Emotional Learning": "❤️",
  "Brain Training": "🃏",
  Logic: "🔢",
  Reasoning: "🔍",
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export default function ActivityFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (typeof window !== "undefined" && window.base44) {
          const me = await window.base44.auth.me();
          const [comps, badges] = await Promise.all([
            window.base44.entities.LessonCompletion.filter({ created_by: me.email }),
            window.base44.entities.Badge.filter({ created_by: me.email }),
          ]);
          const feed = [
            ...comps.map((c) => ({ id: c.id, type: "lesson", date: c.created_date, title: c.lesson_title || c.lesson_id, subject: c.subject, score: c.score, xp: c.xp_earned })),
            ...badges.map((b) => {
              const rule = BADGE_RULES.find((r) => r.key === b.badge_key) || { emoji: "🏅", label: b.label, points: b.points_awarded };
              return { id: b.id, type: "badge", date: b.created_date, emoji: rule.emoji, label: rule.label, points: rule.points };
            }),
          ].sort((a, b) => new Date(b.date) - new Date(a.date));
          setItems(feed);
        } else {
          // Local real telemetry performance feed
          const logs = TelemetryTracker.getLogs();
          if (logs.length > 0) {
            const feed = logs.map((l) => ({
              id: l.id,
              type: "lesson",
              date: l.timestamp,
              title: `${l.gameType ? l.gameType.toUpperCase() : 'Game'} Session (${l.responseTimeMs}ms)`,
              subject: l.subject || "Math",
              score: l.isCorrect ? 100 : 0,
              xp: l.score || 10,
            })).reverse();
            setItems(feed);
          } else {
            setItems([]);
          }
        }
      } catch (err) {
        console.warn("Activity feed fallback active", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageShell title="Learning Activity & Cognitive Profile" subtitle="A real-time AI radar chart tracking skills alongside your lesson history." accent="from-amber-500 to-orange-500" icon={Activity}>
      {/* Real-Time AI Cognitive Skill Map Canvas */}
      <div className="mb-8">
        <CognitiveSkillMap />
      </div>

      <h3 className="text-xl font-extrabold text-foreground mb-4">Recent Activity History</h3>

      {loading ? (
        <p className="text-center text-sm text-muted-foreground py-10">Loading your activity…</p>
      ) : items.length === 0 ? (
        <div className="bg-white border border-border/50 rounded-2xl p-10 text-center shadow-sm">
          <span className="text-4xl">🌱</span>
          <p className="font-extrabold text-foreground mt-2">No activity recorded yet</p>
          <p className="text-sm text-muted-foreground mt-1">Play games or practice lessons to record live real-time performance telemetry!</p>
        </div>
      ) : (
        <div className="bg-white border border-border/50 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-border/30">
            {items.map((it) => (
              <div key={it.id + it.type} className="flex items-center gap-3 px-5 py-4">
                {it.type === "lesson" ? (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">{SUBJECT_EMOJI[it.subject] || "📚"}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{it.title}</p>
                      <p className="text-xs text-muted-foreground">{it.subject} · {timeAgo(it.date)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-extrabold ${it.score >= 80 ? "text-green-600" : it.score >= 60 ? "text-amber-600" : "text-red-500"}`}>{it.score}%</p>
                      <p className="text-xs text-amber-600 font-bold flex items-center gap-0.5 justify-end"><Zap className="w-3 h-3" />+{it.xp}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">{it.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">Badge earned: {it.label}</p>
                      <p className="text-xs text-muted-foreground">{timeAgo(it.date)}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full shrink-0">+{it.points} pts</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

import React, { useState, useEffect } from 'react';
import { Brain, Activity, Info, RotateCcw } from 'lucide-react';
import { TelemetryTracker } from '../lib/TelemetryTracker';

const AXIS_KEYS = ['Speed', 'Memory', 'Quantitative Logic', 'Literacy', 'Empathy'];

const SKILL_DESCRIPTIONS = {
  Speed: 'Real response velocity and processing speed calculated from your live game inputs.',
  Memory: 'Pattern recall accuracy and memory match card flipping efficiency.',
  'Quantitative Logic': 'Arithmetic accuracy and spatial logic score from Math Dash & Number Pop.',
  Literacy: 'Spelling precision and word decoding performance from Spelling Bee & Scramble.',
  Empathy: 'Social-emotional learning engagement and AAC Communication Board utilization.',
};

export default function CognitiveSkillMap({ onSkillChange = null }) {
  const [skillValues, setSkillValues] = useState(() => TelemetryTracker.calculateRealSkills());
  const [activeHover, setActiveHover] = useState(null);

  const refreshSkills = () => {
    const realSkills = TelemetryTracker.calculateRealSkills();
    setSkillValues(realSkills);
    if (onSkillChange) onSkillChange(realSkills);
  };

  useEffect(() => {
    refreshSkills();
  }, []);

  const center = 150;
  const radius = 100;
  const numAxes = AXIS_KEYS.length;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  const points = AXIS_KEYS.map((key, i) => {
    const val = skillValues[key] || 50;
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(' ');

  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0];

  const handleSliderChange = (key, newVal) => {
    const updated = { ...skillValues, [key]: Number(newVal) };
    setSkillValues(updated);
    if (onSkillChange) onSkillChange(updated);
  };

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft ring-1 ring-border/50 max-w-4xl mx-auto font-nunito">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground">Interactive AI Cognitive Skill-Map</h2>
              <span className="flex items-center gap-1 text-xs font-extrabold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Real Data ({skillValues.totalSessions || 0} Events)
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Calculated dynamically from real student gameplay/lesson performance and interactions.
            </p>
          </div>
        </div>

        <button
          onClick={refreshSkills}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-xl transition-colors"
          title="Refresh real-time telemetry analytics"
        >
          <RotateCcw className="w-3.5 h-3.5 text-primary" /> Sync Performance
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar SVG Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <svg viewBox="0 0 300 300" className="w-full max-w-[340px] h-auto drop-shadow-md">
            <defs>
              <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.15" />
              </radialGradient>
              <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Concentric grid webs */}
            {gridRings.map((r, ringIdx) => {
              const ringPoints = AXIS_KEYS.map((_, i) => {
                const { x, y } = getCoordinates(i, r * 100);
                return `${x},${y}`;
              }).join(' ');
              return (
                <polygon
                  key={ringIdx}
                  points={ringPoints}
                  fill="none"
                  stroke="currentColor"
                  className="text-border/40"
                  strokeWidth="1"
                  strokeDasharray={ringIdx === 4 ? 'none' : '3 3'}
                />
              );
            })}

            {/* Axis spokes */}
            {AXIS_KEYS.map((key, i) => {
              const { x, y } = getCoordinates(i, 100);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  className="text-border/60"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Filled radar shape */}
            <polygon points={points} fill="url(#radarFill)" stroke="url(#strokeGrad)" strokeWidth="3" />

            {/* Data nodes */}
            {AXIS_KEYS.map((key, i) => {
              const val = skillValues[key] || 50;
              const { x, y } = getCoordinates(i, val);
              const isHovered = activeHover === key;

              return (
                <g key={key} className="cursor-pointer" onMouseEnter={() => setActiveHover(key)} onMouseLeave={() => setActiveHover(null)}>
                  <circle cx={x} cy={y} r={isHovered ? 10 : 6} fill="#3b82f6" opacity="0.3" className="animate-ping" />
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 7 : 5}
                    fill="#2563eb"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* Labels */}
            {AXIS_KEYS.map((key, i) => {
              const { x, y } = getCoordinates(i, 118);
              const isHovered = activeHover === key;
              return (
                <text
                  key={key}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontWeight={isHovered ? '800' : '700'}
                  fill={isHovered ? '#1d4ed8' : '#475569'}
                  className="transition-colors cursor-pointer"
                  onMouseEnter={() => setActiveHover(key)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  {key} ({skillValues[key]}%)
                </text>
              );
            })}
          </svg>

          {/* Interactive Hover Tooltip */}
          {activeHover && (
            <div className="mt-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl max-w-xs text-center text-xs animate-fade-in border border-slate-700">
              <span className="font-extrabold text-blue-400 block mb-1">{activeHover}: {skillValues[activeHover]}%</span>
              <p className="text-slate-300 font-medium">{SKILL_DESCRIPTIONS[activeHover]}</p>
            </div>
          )}
        </div>

        {/* Skill Controls & Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-muted/40 p-4 rounded-2xl border border-border/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-primary" /> Dynamic Real Metrics
            </h3>
            <div className="space-y-3">
              {AXIS_KEYS.map((key) => {
                const val = skillValues[key];
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-foreground">{key}</span>
                      <span className="text-primary">{val}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={val}
                        onChange={(e) => handleSliderChange(key, e.target.value)}
                        className="w-full accent-primary h-1.5 bg-border rounded-lg cursor-pointer"
                        aria-label={`Adjust ${key}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Real performance telemetry updates automatically as games and lessons are played.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

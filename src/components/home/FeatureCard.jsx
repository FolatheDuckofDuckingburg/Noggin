import React from 'react';

export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
      <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.textColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
        {feature.label}
      </span>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

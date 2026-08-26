import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PageShell({ title, subtitle, icon: Icon, accent = 'from-primary to-blue-600', children }) {
  return (
    <div className="min-h-screen bg-background font-nunito p-4 sm:p-6 max-w-5xl mx-auto">
      <Link to="/student" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="bg-card rounded-3xl shadow-soft ring-1 ring-border/50 overflow-hidden mb-6">
        <div className={`h-2 bg-gradient-to-r ${accent}`} />
        <div className="p-6 sm:p-8 flex items-center gap-4">
          {Icon && (
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow-lg shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground font-medium mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const DEFAULT_SETTINGS = {
  highContrast: false,
  largeText: false,
  readAloud: false,
  reducedMotion: false,
};

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('noggin_accessibility');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('noggin_accessibility', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const toggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <AccessibilityContext.Provider value={{ settings, toggle, speak, stopSpeaking }}>
      <div className={`${settings.highContrast ? 'high-contrast' : ''} ${settings.largeText ? 'text-lg' : ''} ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    return {
      settings: DEFAULT_SETTINGS,
      toggle: () => {},
      speak: (text) => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.rate = 0.9;
          window.speechSynthesis.speak(u);
        }
      },
      stopSpeaking: () => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      },
    };
  }
  return ctx;
}

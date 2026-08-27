import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Volume2, Wifi } from 'lucide-react';
import { useAccessibility } from '../../lib/AccessibilityContext';

export default function NoggimigoTutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm Noggimigo, your AI tutor! What are we exploring or practicing today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef(null);
  const { speak } = useAccessibility();

  // Connect to local Python Noggimigo server (python/server.py & noggimigo/Noggimigo.py) if running
  useEffect(() => {
    try {
      const ws = new WebSocket('ws://localhost:8765');
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.action === 'ai_stream_chunk' || data.action === 'ai_response') {
            setIsTyping(false);
            const text = data.accumulated || data.payload?.feedback || data.chunk;
            if (text) {
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.sender === 'bot' && last.isStreaming) {
                  return [...prev.slice(0, -1), { ...last, text, isStreaming: !data.is_final }];
                } else {
                  return [...prev, { id: Date.now(), sender: 'bot', text, isStreaming: !data.is_final }];
                }
              });
            }
          }
        } catch {}
      };

      ws.onerror = () => {
        setWsConnected(false);
      };

      ws.onclose = () => {
        setWsConnected(false);
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) ws.close();
      };
    } catch {
      setWsConnected(false);
    }
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const currentInput = input.trim();
    setInput('');
    setIsTyping(true);

    // If connected to Python Noggimigo server, send websocket payload
    if (wsConnected && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          action: 'evaluate_answer',
          user_input: currentInput,
          answer: currentInput,
          latency_ms: 32.0,
          stream: true,
        })
      );
    } else {
      // Local fallback AI generator
      setTimeout(() => {
        let reply = "Great question! Let me break this down into a small, easy step. What do you think comes first?";
        const lower = currentInput.toLowerCase();
        if (lower.includes('math') || lower.includes('add') || lower.includes('equation')) {
          reply = "Math is like a fun balance scale! Keep both sides equal and do one step at a time.";
        } else if (lower.includes('spell') || lower.includes('word')) {
          reply = "Let's break the word down into sound chunks! Say each syllable slowly.";
        } else if (lower.includes('help') || lower.includes('stuck')) {
          reply = "No worries at all! Learning takes practice. Which step feels tricky?";
        }

        const botMsg = { id: Date.now() + 1, sender: 'bot', text: reply };
        setMessages((m) => [...m, botMsg]);
        setIsTyping(false);
      }, 500);
    }
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-soft ring-1 ring-border/50 max-w-3xl mx-auto flex flex-col h-[520px] font-nunito">
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-foreground text-base">Noggimigo AI Tutor</h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Ready to help
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
          <Wifi className={`w-3.5 h-3.5 ${wsConnected ? 'text-green-600' : 'text-amber-500'}`} />
          {wsConnected ? 'Python Noggimigo Connected' : 'Local AI Standalone'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs shrink-0 ${
                m.sender === 'user' ? 'bg-primary' : 'bg-teal-500'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-sm font-medium shadow-sm relative group ${
                m.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-muted/60 text-foreground rounded-tl-none border border-border/50'
              }`}
            >
              <p>{m.text}</p>
              {m.sender === 'bot' && (
                <button
                  onClick={() => speak(m.text)}
                  className="mt-2 text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-bold"
                  aria-label="Read response aloud"
                >
                  <Volume2 className="w-3 h-3" /> Read Aloud
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground p-2">
            <Sparkles className="w-4 h-4 text-teal-500 animate-spin" /> Noggimigo is thinking...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="pt-3 border-t border-border/50 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Noggimigo anything..."
          className="flex-1 p-3 px-4 rounded-xl border border-border bg-background text-sm font-medium outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center transition-all min-h-[44px]"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

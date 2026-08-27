import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Scale,
  Bot,
  Trophy,
  BarChart3,
  Atom,
  BookOpen,
  Landmark,
  Globe,
  HeartHandshake,
  Check,
  Github,
  Star,
  Sparkles
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-800 font-['Nunito',sans-serif] selection:bg-[#2d8cff]/10 selection:text-[#2d8cff]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#2d8cff] flex items-center justify-center text-white shadow-md shadow-[#2d8cff]/20">
              <Brain className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="text-2xl font-extrabold text-[#2d8cff] tracking-tight">Noggin</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-[#2d8cff] transition-colors">Features</a>
            <a href="#subjects" className="hover:text-[#2d8cff] transition-colors">Subjects</a>
            <a href="#how-it-works" className="hover:text-[#2d8cff] transition-colors">How It Works</a>
            <a href="#open-source" className="hover:text-[#2d8cff] transition-colors">Open Source</a>
          </nav>

          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/games"
              className="px-4 py-2 rounded-xl font-extrabold text-xs text-white bg-[#2d8cff] hover:bg-[#2078e5] transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-[#2d8cff] text-xs font-bold tracking-wide mb-8 shadow-xs">
            <span className="text-[#2d8cff] text-sm">✨</span>
            <span>Specially designed for neurodiverse learners</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Learning that <span className="text-[#2d8cff]">Adapts to You.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 font-semibold text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Noggin has an engaging, adaptive curriculum built for children with ADHD, autism, dyslexia, and dyscalculia. Guide them through personalized lessons with Noggimigo, their friendly AI companion.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/games"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm text-white bg-[#2d8cff] hover:bg-[#2078e5] transition-all shadow-md shadow-[#2d8cff]/25 active:scale-98"
            >
              Get Started For Free
            </Link>
            <Link
              to="/student"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-xs"
            >
              Parent Dashboard
            </Link>
          </div>

          {/* Bottom Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {['Adaptive difficulty', 'Guided feedback', 'Gems & streaks', 'Parent & teacher tools'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-[#F3F4F6] text-slate-600 font-bold text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* Trust & Rating Bar */}
      <section className="py-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600">
          <div>
            Supporting over <span className="text-[#2d8cff] font-extrabold">15,000+</span> families globally
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex text-amber-400 space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-slate-500 font-semibold">Rated 4.9/5 by educators & child psychologists</span>
          </div>
        </div>
      </section>

      {/* Subject Cards Section */}
      <section id="subjects" className="py-20 bg-[#FAFAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#2d8cff]/10 text-[#2d8cff] font-bold text-[11px] uppercase tracking-wider mb-4">
              ADAPTIVE FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Built for the way <span className="text-[#2d8cff]">your child learns</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base">
              Every feature is designed with neurodivergent learners in mind — combining science with calming, engaging interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Math */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2d8cff] mb-4">
                <span className="text-lg font-black">123</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Math</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Visual math, number sense, and dynamic problem generation with step-by-step guidance.
              </p>
            </div>

            {/* 2. Reading */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Reading</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Dyslexia-friendly fonts, phonics practice, and interactive story comprehension.
              </p>
            </div>

            {/* 3. Science */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Science</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Interactive experiments, nature exploration, and visual scientific inquiry.
              </p>
            </div>

            {/* 4. Social Studies */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Social Studies</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Communities, cultures, geography, and global connections simplified.
              </p>
            </div>

            {/* 5. Social-Emotional */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Social-Emotional</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Emotion identification, empathy scenarios, and emotional self-regulation exercises.
              </p>
            </div>

            {/* 6. History */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">History</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Visual timelines, historical figures, and interactive story-driven timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section id="features" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#2d8cff] font-bold text-[11px] uppercase tracking-wider mb-4">
                WHY NOGGIN WORKS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                Designed for sensory comfort & deep engagement
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2d8cff] shrink-0 mt-1">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm mb-1">Adaptive Difficulty Engine</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                      Questions dynamically scale up or down based on real-time performance to maintain optimal flow without frustration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm mb-1">Noggimigo AI Socratic Tutor</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                      Runs locally on device, offering encouraging explanations and hints tailored to your child's learning profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm mb-1">Interactive Cognitive Skill Map</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                      Track real growth across 5 core cognitive pillars: Speed, Memory, Quantitative Logic, Literacy, and Empathy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-center space-y-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#2d8cff] flex items-center justify-center text-white">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-slate-900">Noggimigo AI Companion</span>
                </div>
                <p className="text-slate-600 text-xs font-semibold bg-[#FAFAFC] p-3 rounded-xl">
                  "Great try! Let's count the yellow blocks together step by step! 🌟"
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs text-slate-900">Cognitive Skill Balance</span>
                  <span className="text-[10px] font-bold text-[#2d8cff]">Real-Time Telemetry</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2d8cff] h-full w-[88%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#2d8cff] font-bold text-[11px] uppercase tracking-wider mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Loved by parents & specialists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed italic">
                  "Noggin has transformed our daily routine. My son with ADHD can focus without getting overwhelmed by bright flashing lights or timers."
                </p>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs">Sarah K.</p>
                <p className="text-[11px] text-slate-400 font-semibold">Parent of 8-year-old</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed italic">
                  "The skill radar map gives me tangible insight into cognitive areas where my students need extra support, all while keeping learning non-punitive."
                </p>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs">Dr. Marcus T.</p>
                <p className="text-[11px] text-slate-400 font-semibold">Pediatric Psychologist & Father</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-wider mb-4">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Free for everyone. <span className="text-[#2d8cff]">Always.</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl mx-auto">
              Noggin will always be 100% free and open source to parents, students, teachers and psychologists worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Students</h3>
                <div className="text-4xl font-black text-[#2d8cff] mb-4">$0</div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  Unlimited access to all 6 subjects, Noggimigo AI help, and sensory accommodations.
                </p>
              </div>
              <Link
                to="/games"
                className="w-full text-center py-2.5 rounded-xl font-extrabold text-xs text-white bg-[#2d8cff] hover:bg-[#2078e5] transition-all shadow-sm"
              >
                Start Learning
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Parents</h3>
                <div className="text-4xl font-black text-[#2d8cff] mb-4">$0</div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  Parent dashboard, progress tracking, and IEP-aligned goal insights.
                </p>
              </div>
              <Link
                to="/student"
                className="w-full text-center py-2.5 rounded-xl font-extrabold text-xs text-white bg-[#2d8cff] hover:bg-[#2078e5] transition-all shadow-sm"
              >
                Parent Dashboard
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Teachers</h3>
                <div className="text-4xl font-black text-[#2d8cff] mb-4">$0</div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  Class rosters, multi-child profiles, and curriculum alignment tools.
                </p>
              </div>
              <Link
                to="/student"
                className="w-full text-center py-2.5 rounded-xl font-extrabold text-xs text-white bg-[#2d8cff] hover:bg-[#2078e5] transition-all shadow-sm"
              >
                Teacher Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Footer Banner */}
      <section id="open-source" className="py-12 bg-[#FAFAFC] border-t border-slate-100 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            Noggin is 100% free & open source
          </h2>
          <span className="inline-block px-3 py-0.5 rounded-full bg-blue-100/80 text-[#2d8cff] font-bold text-[11px] mb-3">
            Community supported
          </span>
          <div className="text-2xl font-black text-slate-900 mb-1">$0</div>
          <p className="text-slate-400 text-xs font-semibold mb-5">Forever free • Open source on GitHub</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#2d8cff] hover:bg-[#2078e5] transition-all shadow-sm"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Explore on GitHub</span>
          </a>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-[#2d8cff] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Ready to unlock your <span className="text-amber-300">child's potential?</span>
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm font-semibold max-w-lg mx-auto mb-8">
            Give your student the customized learning experience they deserve — peaceful, encouraging, and designed just for their unique mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              to="/games"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-[#2d8cff] bg-white hover:bg-blue-50 transition-all shadow-sm"
            >
              Start Learning Free
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-white border border-white/40 hover:bg-white/10 transition-all"
            >
              Star on GitHub
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] font-bold text-blue-100">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> 100% Free Forever</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> No credit card required</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Open Source</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1117] text-slate-400 py-16 text-xs font-semibold">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 text-white font-black text-lg mb-4">
                <Brain className="w-5 h-5 text-[#2d8cff]" /> <span>Noggin</span>
              </div>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                Redefining educational software for neurodiverse excellence. Built with patience, loved by parents, trusted by clinics.
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-200 mb-3 text-[11px] uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#subjects" className="hover:text-white transition-colors">Subjects</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-200 mb-3 text-[11px] uppercase tracking-wider">Research</h4>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Noggimigo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-200 mb-3 text-[11px] uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advisory Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
            <p>© 2026 | Folarera Kassim, All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  Bot,
  Trophy,
  BarChart3,
  Atom,
  BookOpen,
  Compass,
  Hourglass,
  HeartHandshake,
  Check,
  Github,
  Star,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-800 font-['Nunito',sans-serif] selection:bg-blue-100 selection:text-blue-700">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              🧠
            </div>
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Noggin</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#subjects" className="hover:text-blue-600 transition-colors">Subjects</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#open-source" className="hover:text-blue-600 transition-colors">Open Source</a>
          </nav>

          <div className="hidden sm:flex items-center space-x-3">
            {/* Empty right area or CTA if desired */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-xs font-bold tracking-wide mb-8 shadow-xs">
            <span className="text-blue-500 text-sm">✨</span>
            <span>Specially designed for neurodiverse learners</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Learning that <span className="text-blue-500">Adapts to You.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-500 leading-relaxed font-semibold mb-10">
            Noggin has an engaging, adaptive curriculum built for children with ADHD, autism, dyslexia, and dyscalculia. Guide them through personalized lessons with Noggimigo, their friendly AI companion.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/games"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/25"
            >
              Get Started For Free
            </Link>
            <Link
              to="/student"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              Parent Dashboard
            </Link>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-500">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100/80">Adaptive difficulty</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100/80">Guided feedback</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100/80">Gems & streaks</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100/80">Parent & teacher tools</span>
          </div>
        </div>

        {/* Sub-bar line */}
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
          <div>
            Supporting over <span className="font-bold text-blue-500">15,000+</span> families globally
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="flex text-amber-400 space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-slate-600">Rated 4.9/5 by educators & child psychologists</span>
          </div>
        </div>
      </section>

      {/* Adaptive Framework */}
      <section id="features" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-wider mb-4">
              ADAPTIVE FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Built for the way <span className="text-blue-500">your child learns</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl mx-auto">
              Every feature is designed with neurodivergent learners in mind — combining science with joyful experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">SELF-PACED</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">Adaptive Difficulty</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Tasks organically simplify or expand based on physical focus & interactive signals, preventing dyscalculia or ADHD burnout.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">FRIENDLY ASSISTANT</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">Guided AI Feedback</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Noggimigo provides patient, audio-optional hints that build confidence step-by-step. No timers, no penalty pressure.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">JOYFUL MILESTONES</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">Gamified Learning</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Celebrate positive momentum with streaks, badges, and gems that kids can trade for custom companions or app themes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">REAL INSIGHTS</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Generate simple progress breakdowns focused on positive cognitive shifts rather than rigid numeric testing scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Curriculum */}
      <section id="subjects" className="py-20 bg-[#FAFAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-200/70 text-slate-600 font-bold text-[11px] uppercase tracking-wider mb-4">
              INTERACTIVE CURRICULUM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              A full curriculum, <span className="text-blue-500">reimagined</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl mx-auto">
              Every subject is broken down into byte-sized modules designed with multisensory learning aids.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Subject 1 - Math */}
            <Link to="/games" className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Atom className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">48 Lessons</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-500 transition-colors">Mathematics</h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>
            </Link>

            {/* Subject 2 - English */}
            <Link to="/games" className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">32 Lessons</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-500 transition-colors">English Literacy</h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
            </Link>

            {/* Subject 3 - Science */}
            <Link to="/games" className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                  <Atom className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">40 Lessons</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-500 transition-colors">Science</h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"></div>
            </Link>

            {/* Subject 4 - Social Studies */}
            <Link to="/games" className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">28 Lessons</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-500 transition-colors">Social Studies</h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
            </Link>

            {/* Subject 5 - History */}
            <Link to="/games" className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Hourglass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">36 Lessons</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors">History</h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
            </Link>

            {/* Subject 6 - Social Emotional Learning */}
            <Link to="/games" className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">50 Lessons</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-rose-500 transition-colors">Social Emotional Learning</h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Setup */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-wider mb-4">
              SIMPLE SETUP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Getting started is <span className="text-blue-500">simple.</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl mx-auto">
              Designed to integrate easily into your existing school curriculum or IEP goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100">
              <span className="text-3xl font-black text-blue-500 mb-4 block">01</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">AI Assessment</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Spend 3 minutes solving curriculum questions and choosing your child's diagnostic learning markers (e.g. dyslexic reading preferences or dyscalculia aids).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100">
              <span className="text-3xl font-black text-blue-500 mb-4 block">02</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">Meet Noggimigo</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Your child connects with their helpful AI tutor, customize app appearance, and chooses their primary subject focus.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100">
              <span className="text-3xl font-black text-blue-500 mb-4 block">03</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">Personalized Learning</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Daily personalized lesson queues populate breakdowns focused on positive pacing and encouraging positive rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Support */}
      <section className="py-20 bg-[#FAFAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-200/70 text-slate-600 font-bold text-[11px] uppercase tracking-wider mb-4">
              PARENT SUPPORT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              A learning experience that brings relief to families
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl mx-auto">
              Real stories from families who replaced math-anxiety struggles with self-paced daily wins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6">
                  "My son used to get upset and lose focus every time we pulled out traditional school sheets. With Noggin, Noggimigo rewards his small focus spurts instead of counting the clock. It has saved our family dynamic."
                </p>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs">Bankole O.</p>
                <p className="text-[11px] text-slate-400 font-semibold">Parent of autistic child, age 13</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6">
                  "The dyslexia friendly font options and pacing toggles are a godsend. She's not trying to rush a timer anymore. She just gets to explore at her speed, gaining confidence with every milestone."
                </p>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs">Kassim A.</p>
                <p className="text-[11px] text-slate-400 font-semibold">Parent of Dyslexic child, age 11</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6">
                  "As an educator and a father of an autistic son, I am incredibly critical of gamification tactics. Noggin gets it right. The feedback loops are encouraging, structured, and completely non-punitive."
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
              Free for everyone. <span className="text-blue-500">Always.</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm sm:text-base max-w-xl mx-auto">
              Noggin will always be free and open source to the parents, students, teachers and psychologists that need it most, help use keep it that way on GitHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Students</h3>
                <div className="text-4xl font-black text-blue-500 mb-4">$0</div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  Unlimited access to all 6 subjects, Noggimigo AI help, and sensory accommodations.
                </p>
              </div>
              <Link
                to="/games"
                className="w-full text-center py-2.5 rounded-xl font-extrabold text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-sm"
              >
                Start Learning
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Parents</h3>
                <div className="text-4xl font-black text-blue-500 mb-4">$0</div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  Parent dashboard, progress tracking, and IEP-aligned goal insights.
                </p>
              </div>
              <Link
                to="/student"
                className="w-full text-center py-2.5 rounded-xl font-extrabold text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-sm"
              >
                Parent Dashboard
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-[#FAFAFC] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Teachers</h3>
                <div className="text-4xl font-black text-blue-500 mb-4">$0</div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  Class rosters, multi-child profiles, and curriculum alignment tools.
                </p>
              </div>
              <Link
                to="/student"
                className="w-full text-center py-2.5 rounded-xl font-extrabold text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-sm"
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
            Noggin is free & open source
          </h2>
          <span className="inline-block px-3 py-0.5 rounded-full bg-blue-100/80 text-blue-600 font-bold text-[11px] mb-3">
            Community supported
          </span>
          <div className="text-2xl font-black text-slate-900 mb-1">$0</div>
          <p className="text-slate-400 text-xs font-semibold mb-5">Forever free • Open source on GitHub</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-sm"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Explore on GitHub</span>
          </a>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-blue-500 text-white text-center">
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
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-blue-600 bg-white hover:bg-blue-50 transition-all shadow-sm"
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
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> 14-day free trial</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> No credit card required</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1117] text-slate-400 py-16 text-xs font-semibold">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 text-white font-black text-lg mb-4">
                🧠 <span>Noggin</span>
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

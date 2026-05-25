import { motion } from "framer-motion";
import { UserPlus, ScanFace, Gamepad2, TrendingUp } from "lucide-react";

const steps = [
{
  icon: UserPlus,
  step: "01",
  title: "Create a Profile",
  description: "Sign up and tell us about your child like their age, interests, strengths, and any diagnoses."
},
{
  icon: ScanFace,
  step: "02",
  title: "AI Assessment",
  description: "Our AI performs a gentle, game-like assessment to understand your child's unique learning style and needs."
},
{
  icon: Gamepad2,
  step: "03",
  title: "Adaptive Learning",
  description: "Noggin generates a custom curriculum with AI-powered games and activities that adaptive with your child."
},
{
  icon: TrendingUp,
  step: "04",
  title: "Track Progress",
  description: "Monitor progress with detailed insights and celebrate every milestone on your child's unique journey."
}];


export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16">
          
          <span className="text-sm font-bold text-primary uppercase tracking-widest">How It Works</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Getting started is simple
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to unlock a world of adaptive, AI-powered learning.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) =>
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative text-center">
              
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto relative z-10 border-4 border-background">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-extrabold flex items-center justify-center z-20">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

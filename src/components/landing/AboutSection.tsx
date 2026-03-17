import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Brain, Bell, Monitor } from "lucide-react";

const steps = [
  {
    icon: Eye,
    title: "Autonomous Patrol",
    desc: "AI-controlled drones patrol designated areas 24/7, covering blind spots and high-risk zones autonomously.",
  },
  {
    icon: Brain,
    title: "AI Detection",
    desc: "Trained ML models analyze video frames in real time, detecting fighting, robbery, weapons, and violent behavior.",
  },
  {
    icon: Bell,
    title: "SOS Alerts",
    desc: "Instant alerts with GPS coordinates are pushed to law enforcement dashboards when threats are detected.",
  },
  {
    icon: Monitor,
    title: "Command Dashboard",
    desc: "Police stations monitor live feeds, review alerts, track drones, and issue commands from a centralized interface.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(264_100%_50%_/_0.04)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // System Overview
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-foreground">
            How <span className="text-primary text-glow-cyan">ARGUS</span> Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm">
            ARGUS bridges the gap between traditional surveillance and
            AI-powered autonomous threat detection, providing law enforcement
            with an always-on digital eye in the sky.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-panel p-6 group hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-primary/30 mb-4 group-hover:cyan-glow transition-all duration-300">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-mono text-xs text-primary/50 mb-2">
                0{i + 1}
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

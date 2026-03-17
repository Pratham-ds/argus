import Navbar from "@/components/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import { motion } from "framer-motion";
import { Eye, Brain, Cpu, Shield, Radio, Target } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "What is ARGUS?",
    content: "ARGUS is a fully autonomous AI-powered drone surveillance system designed to assist law enforcement agencies. It combines autonomous drone navigation, real-time computer vision, and instant alert systems to create a persistent, intelligent security network over cities and remote areas.",
  },
  {
    icon: Target,
    title: "The Problem",
    content: "Traditional surveillance relies on static CCTV cameras with limited coverage and human monitoring, which is prone to fatigue and blind spots. High-risk and remote areas often lack any surveillance infrastructure, leaving communities vulnerable to criminal activity.",
  },
  {
    icon: Radio,
    title: "Autonomous Patrol",
    content: "ARGUS drones autonomously patrol designated zones using ArduPilot autopilot systems. They follow pre-defined routes or dynamically adjust patrol patterns based on threat assessments, covering vast areas without human intervention.",
  },
  {
    icon: Brain,
    title: "AI Detection Pipeline",
    content: "A trained machine learning model processes live video frames from the drone camera, identifying suspicious activities including fighting, robbery, weapon usage (guns and knives), and other violent behavior with high-confidence classification.",
  },
  {
    icon: Shield,
    title: "Alert Generation",
    content: "When a threat is detected, the system automatically generates an SOS alert containing the GPS coordinates, timestamp, threat classification, and a snapshot from the video feed. This alert is instantly pushed to all connected police monitoring stations.",
  },
  {
    icon: Cpu,
    title: "Command Dashboard",
    content: "Police stations access a centralized monitoring dashboard to view live drone feeds, track drone positions on a map, review detection events, and issue commands to drones. The dashboard provides full situational awareness in real time.",
  },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // Intelligence Brief
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 text-foreground">
            About <span className="text-primary text-glow-cyan">ARGUS</span>
          </h1>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 flex gap-5"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-primary/30">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
);

export default About;

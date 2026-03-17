import Navbar from "@/components/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import { motion } from "framer-motion";
import { Cpu, Wifi, Database, Map, Video, Brain, Radio, Server } from "lucide-react";

const techStack = [
  { icon: Brain, title: "Computer Vision", desc: "Custom-trained ML models for real-time activity recognition and weapon detection using YOLO and CNN architectures." },
  { icon: Cpu, title: "ArduPilot / MAVLink", desc: "Industry-standard autopilot firmware with MAVLink protocol for bidirectional drone telemetry and command control." },
  { icon: Video, title: "Video Streaming", desc: "Low-latency RTSP video pipeline from drone camera to backend server for real-time frame processing." },
  { icon: Wifi, title: "WebSocket Communication", desc: "Persistent WebSocket connections for instant telemetry updates, detection results, and SOS alert delivery." },
  { icon: Map, title: "Mapbox Integration", desc: "Satellite-view mapping with real-time drone tracking, patrol route visualization, and detection markers." },
  { icon: Database, title: "PostgreSQL Database", desc: "Robust relational database for storing events, alerts, telemetry logs, timestamps, and GPS coordinates." },
  { icon: Server, title: "Edge Computing", desc: "On-drone preprocessing reduces bandwidth requirements and enables detection even with intermittent connectivity." },
  { icon: Radio, title: "Encrypted Comms", desc: "End-to-end encrypted communication channels between drone, server, and dashboard for operational security." },
];

const Technology = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-secondary tracking-widest uppercase">
            // Tech Stack
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 text-foreground">
            <span className="text-primary text-glow-cyan">Technology</span>
          </h1>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {techStack.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel p-5 hover:border-primary/40 hover:cyan-glow transition-all duration-300"
            >
              <t.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display text-xs font-semibold text-foreground mb-2 tracking-wide">
                {t.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
);

export default Technology;

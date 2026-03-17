import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Plane,
  ScanEye,
  Swords,
  AlertTriangle,
  MapPin,
  LayoutDashboard,
  Cpu,
  Video,
} from "lucide-react";

const features = [
  { icon: Plane, title: "Autonomous Drone Patrolling", desc: "Self-navigating drones cover patrol routes using ArduPilot autopilot systems." },
  { icon: ScanEye, title: "Real-Time AI Crime Detection", desc: "ML models process live video feeds to identify criminal behavior instantly." },
  { icon: Swords, title: "Weapon Detection", desc: "Specialized detection for guns and knives with high-confidence alerts." },
  { icon: AlertTriangle, title: "SOS Alert System", desc: "Automated emergency alerts with GPS coordinates pushed to all stations." },
  { icon: MapPin, title: "Live GPS Tracking", desc: "Real-time drone positioning with patrol route visualization on maps." },
  { icon: LayoutDashboard, title: "Police Command Dashboard", desc: "Centralized control panel for monitoring all drone operations." },
  { icon: Cpu, title: "ArduPilot Integration", desc: "MAVLink protocol integration for full drone telemetry and control." },
  { icon: Video, title: "Real-Time Video Monitoring", desc: "Live camera feeds with AI overlay showing detection bounding boxes." },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-secondary tracking-widest uppercase">
            // Capabilities
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-foreground">
            System <span className="text-primary text-glow-cyan">Features</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-panel p-5 group hover:border-primary/40 hover:cyan-glow transition-all duration-300 cursor-default"
            >
              <feat.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-display text-xs font-semibold text-foreground mb-2 tracking-wide">
                {feat.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

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
import { CRIME_TYPES } from "@/lib/crime-types";

const features = [
  { icon: Plane, title: "Autonomous Drone Patrolling", desc: "Self-navigating drones cover patrol routes using ArduPilot autopilot systems." },
  { icon: ScanEye, title: "14-Class AI Crime Detection", desc: "ML models detect 14 crime types in real-time including fighting, robbery, weapons, arson, stalking, and more." },
  { icon: Swords, title: "Weapon Detection", desc: "Specialized detection for firearms and bladed weapons with high-confidence classification." },
  { icon: AlertTriangle, title: "SOS Alert System", desc: "Automated emergency alerts with GPS coordinates pushed to all stations." },
  { icon: MapPin, title: "Live GPS Tracking", desc: "Real-time drone positioning with patrol route visualization on maps." },
  { icon: LayoutDashboard, title: "Police Command Dashboard", desc: "Centralized control panel for monitoring all drone operations." },
  { icon: Cpu, title: "ArduPilot / MAVLink", desc: "Connect Mission Planner or MAVLink ground stations directly from the dashboard." },
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

        {/* Crime Detection Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-secondary tracking-widest uppercase">
              // AI Detection Models
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold mt-3 text-foreground">
              <span className="text-primary text-glow-cyan">14</span> Crime Types Detected
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
              Our ML pipeline processes live video frames and classifies the following criminal activities in real time.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {CRIME_TYPES.map((crime, i) => (
              <motion.div
                key={crime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                className="glass-panel p-3 text-center group hover:border-primary/40 hover:cyan-glow transition-all duration-300"
              >
                <crime.icon className={`w-5 h-5 mx-auto mb-2 ${
                  crime.severity === "critical" ? "text-destructive" :
                  crime.severity === "high" ? "text-orange-400" : "text-yellow-400"
                } group-hover:scale-110 transition-transform`} />
                <div className="font-display text-[9px] text-foreground font-semibold tracking-wide leading-tight">
                  {crime.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

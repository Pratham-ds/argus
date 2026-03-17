import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "94%", label: "Faster Response Time" },
  { value: "24/7", label: "Continuous Monitoring" },
  { value: "< 2s", label: "Threat Detection Latency" },
  { value: "300+", label: "Simultaneous Zones" },
];

const benefits = [
  "AI-powered surveillance eliminates human fatigue and blind spots",
  "Autonomous patrol of high-risk areas without risking officer safety",
  "Instant SOS alerts reduce emergency response time by up to 94%",
  "Continuous monitoring of remote and underserved areas",
  "Real-time weapon detection prevents escalation of violent incidents",
  "Centralized command reduces dependence on manual monitoring",
];

const SecurityImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(185_100%_50%_/_0.04)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-destructive tracking-widest uppercase">
            // Impact Assessment
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-foreground">
            Security <span className="text-primary text-glow-cyan">Impact</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-primary text-glow-cyan">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel p-8 max-w-3xl mx-auto"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            Operational Advantages
          </h3>
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 mt-1.5 bg-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityImpactSection;

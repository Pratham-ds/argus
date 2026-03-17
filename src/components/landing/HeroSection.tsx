import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crosshair, Radio } from "lucide-react";
import heroDrone from "@/assets/hero-drone.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(185_100%_50%_/_0.06)_0%,_transparent_70%)]" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-32 scan-line pointer-events-none"
        animate={{ y: ["-100%", "100vh"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-4"
            >
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">
                System Online • Active Monitoring
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              <span className="text-primary text-glow-cyan">ARGUS</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
                Fully Autonomous
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
                Surveillance System
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              AI-powered drone surveillance platform designed to enhance public
              safety and assist law enforcement through real-time crime detection
              and autonomous response.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/about"
                className="font-display text-sm tracking-wider uppercase px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 cyan-glow text-center"
              >
                <Crosshair className="w-4 h-4 inline mr-2" />
                Explore ARGUS
              </Link>
              <Link
                to="/dashboard"
                className="font-display text-sm tracking-wider uppercase px-8 py-3 border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 text-center"
              >
                Admin Login
              </Link>
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="relative">
              {/* Pulse rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-primary/20" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                <div className="absolute w-48 h-48 rounded-full border border-primary/30" style={{ animation: "pulse-ring 2s ease-out infinite 0.5s" }} />
                <div className="absolute w-32 h-32 rounded-full border border-primary/40" style={{ animation: "pulse-ring 2s ease-out infinite 1s" }} />
              </div>

              <img
                src={heroDrone}
                alt="ARGUS Surveillance Drone"
                className="relative z-10 w-full max-w-lg mx-auto animate-float"
              />

              {/* Radar sweep */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-72 h-72 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, hsl(185 100% 50% / 0.15) 30deg, transparent 60deg)",
                    animation: "radar-sweep 3s linear infinite",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom telemetry bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass-panel p-4 flex flex-wrap justify-center gap-8 text-xs font-mono text-muted-foreground"
        >
          <span>LAT: 28.6139° N</span>
          <span>LON: 77.2090° E</span>
          <span>ALT: 120m AGL</span>
          <span>SPD: 45 km/h</span>
          <span className="text-primary">STATUS: OPERATIONAL</span>
          <span>BATTERY: 87%</span>
          <span>SIGNAL: STRONG</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Video,
  MapPin,
  AlertTriangle,
  Battery,
  Gauge,
  Mountain,
  Radio,
  RotateCcw,
  Pause,
  ArrowDown,
  Bell,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data
const mockEvents = [
  { id: 1, type: "WEAPON_DETECTED", severity: "critical", time: "14:32:07", location: "Sector 7-G", details: "Knife detected - 92% confidence" },
  { id: 2, type: "FIGHT_DETECTED", severity: "high", time: "14:28:45", location: "Sector 3-A", details: "Physical altercation - 2 individuals" },
  { id: 3, type: "SUSPICIOUS_ACTIVITY", severity: "medium", time: "14:15:22", location: "Sector 12-B", details: "Loitering in restricted zone" },
  { id: 4, type: "WEAPON_DETECTED", severity: "critical", time: "13:58:11", location: "Sector 5-D", details: "Firearm detected - 88% confidence" },
  { id: 5, type: "ROBBERY", severity: "high", time: "13:42:33", location: "Sector 9-F", details: "Possible robbery in progress" },
  { id: 6, type: "PATROL_COMPLETE", severity: "info", time: "13:30:00", location: "Zone Alpha", details: "Patrol route completed - no threats" },
];

const Dashboard = () => {
  const [telemetry, setTelemetry] = useState({
    battery: 87,
    altitude: 120,
    speed: 45,
    signal: 94,
    lat: 28.6139,
    lon: 77.209,
    status: "PATROLLING",
  });

  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // Simulate telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        battery: Math.max(0, prev.battery - Math.random() * 0.1),
        altitude: 120 + Math.sin(Date.now() / 5000) * 5,
        speed: 45 + Math.sin(Date.now() / 3000) * 3,
        signal: 94 + Math.sin(Date.now() / 4000) * 2,
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lon: prev.lon + (Math.random() - 0.5) * 0.0001,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const severityColor = (s: string) => {
    switch (s) {
      case "critical": return "text-destructive border-destructive/40";
      case "high": return "text-orange-400 border-orange-400/40";
      case "medium": return "text-yellow-400 border-yellow-400/40";
      default: return "text-primary border-primary/40";
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="h-12 glass-panel border-t-0 border-l-0 border-r-0 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-display text-sm font-bold text-primary text-glow-cyan tracking-wider">
            ARGUS COMMAND
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            // Police Control Panel
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="text-primary flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" /> LIVE
          </span>
          <span className="text-muted-foreground">
            <Clock className="w-3 h-3 inline mr-1" />
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Telemetry */}
        <motion.div
          animate={{ width: leftOpen ? 280 : 0, opacity: leftOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 overflow-hidden border-r border-primary/10"
        >
          <div className="w-[280px] h-full p-4 space-y-4 overflow-y-auto">
            <div className="font-display text-xs text-primary tracking-widest uppercase mb-4">
              Drone Telemetry
            </div>

            {/* Status */}
            <div className="glass-panel p-3">
              <div className="font-mono text-xs text-muted-foreground mb-1">STATUS</div>
              <div className="font-display text-sm text-primary text-glow-cyan">{telemetry.status}</div>
            </div>

            {/* Battery */}
            <div className="glass-panel p-3">
              <div className="flex items-center gap-2 mb-2">
                <Battery className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">BATTERY</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-sm overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${telemetry.battery}%` }}
                />
              </div>
              <div className="font-mono text-xs text-primary mt-1">
                {telemetry.battery.toFixed(1)}%
              </div>
            </div>

            {/* Altitude */}
            <div className="glass-panel p-3">
              <div className="flex items-center gap-2 mb-1">
                <Mountain className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">ALTITUDE</span>
              </div>
              <div className="font-mono text-lg text-foreground">
                {telemetry.altitude.toFixed(1)}
                <span className="text-xs text-muted-foreground ml-1">m AGL</span>
              </div>
            </div>

            {/* Speed */}
            <div className="glass-panel p-3">
              <div className="flex items-center gap-2 mb-1">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">SPEED</span>
              </div>
              <div className="font-mono text-lg text-foreground">
                {telemetry.speed.toFixed(1)}
                <span className="text-xs text-muted-foreground ml-1">km/h</span>
              </div>
            </div>

            {/* Signal */}
            <div className="glass-panel p-3">
              <div className="flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">SIGNAL</span>
              </div>
              <div className="font-mono text-lg text-foreground">
                {telemetry.signal.toFixed(0)}%
              </div>
            </div>

            {/* GPS */}
            <div className="glass-panel p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">GPS</span>
              </div>
              <div className="font-mono text-xs text-foreground space-y-1">
                <div>LAT: {telemetry.lat.toFixed(6)}° N</div>
                <div>LON: {telemetry.lon.toFixed(6)}° E</div>
              </div>
            </div>

            {/* Commands */}
            <div className="font-display text-xs text-primary tracking-widest uppercase mt-6 mb-2">
              Drone Commands
            </div>
            <div className="space-y-2">
              <button className="w-full glass-panel p-2 font-mono text-xs text-foreground hover:border-primary/40 hover:cyan-glow transition-all flex items-center gap-2">
                <RotateCcw className="w-3 h-3 text-primary" /> Return to Launch
              </button>
              <button className="w-full glass-panel p-2 font-mono text-xs text-foreground hover:border-primary/40 transition-all flex items-center gap-2">
                <Pause className="w-3 h-3 text-primary" /> Hover / Hold
              </button>
              <button className="w-full glass-panel-alert p-2 font-mono text-xs text-destructive hover:border-destructive/60 hover:red-glow transition-all flex items-center gap-2">
                <ArrowDown className="w-3 h-3" /> Emergency Landing
              </button>
            </div>
          </div>
        </motion.div>

        {/* Toggle left */}
        <button
          onClick={() => setLeftOpen(!leftOpen)}
          className="flex-shrink-0 w-6 flex items-center justify-center bg-card/40 border-r border-primary/10 hover:bg-primary/5 transition-colors"
        >
          {leftOpen ? <ChevronLeft className="w-3 h-3 text-primary" /> : <ChevronRight className="w-3 h-3 text-primary" />}
        </button>

        {/* Center - Video Feed */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            {/* Simulated video feed */}
            <div className="absolute inset-0 bg-card grid-overlay flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <div className="font-display text-sm text-primary/50">LIVE VIDEO FEED</div>
                <div className="font-mono text-xs text-muted-foreground mt-2">
                  Camera 01 • 1080p • 30fps
                </div>
              </div>

              {/* Scan line overlay */}
              <motion.div
                className="absolute left-0 right-0 h-24 scan-line pointer-events-none"
                animate={{ y: ["-100%", "500px"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 border border-primary/30">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/20" />
                </div>
              </div>

              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

              {/* HUD overlay */}
              <div className="absolute top-4 left-12 font-mono text-xs text-primary/60">
                <div>REC ● 00:14:32</div>
                <div>CAM-01 | IR: OFF</div>
              </div>
              <div className="absolute top-4 right-12 font-mono text-xs text-primary/60 text-right">
                <div>AI MODEL: ACTIVE</div>
                <div>CONF THRESHOLD: 0.85</div>
              </div>
              <div className="absolute bottom-4 left-12 font-mono text-xs text-primary/60">
                <div>{telemetry.lat.toFixed(6)}°N, {telemetry.lon.toFixed(6)}°E</div>
                <div>ALT: {telemetry.altitude.toFixed(0)}m | SPD: {telemetry.speed.toFixed(0)}km/h</div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-48 flex-shrink-0 border-t border-primary/10 bg-card relative flex items-center justify-center">
            <MapPin className="w-8 h-8 text-primary/30 mr-3" />
            <div>
              <div className="font-display text-xs text-primary/50">MAP VIEW</div>
              <div className="font-mono text-xs text-muted-foreground">
                Drone tracking • Satellite overlay
              </div>
            </div>
            {/* Simulated drone blip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-cyan" />
              <div className="absolute inset-0 w-3 h-3 bg-primary/30 rounded-full" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
            </div>
          </div>
        </div>

        {/* Toggle right */}
        <button
          onClick={() => setRightOpen(!rightOpen)}
          className="flex-shrink-0 w-6 flex items-center justify-center bg-card/40 border-l border-primary/10 hover:bg-primary/5 transition-colors"
        >
          {rightOpen ? <ChevronRight className="w-3 h-3 text-primary" /> : <ChevronLeft className="w-3 h-3 text-primary" />}
        </button>

        {/* Right Sidebar - Event Log */}
        <motion.div
          animate={{ width: rightOpen ? 320 : 0, opacity: rightOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 overflow-hidden border-l border-primary/10"
        >
          <div className="w-[320px] h-full p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-xs text-primary tracking-widest uppercase">
                Event Log
              </div>
              <div className="flex items-center gap-1">
                <Bell className="w-3 h-3 text-destructive" />
                <span className="font-mono text-xs text-destructive">
                  {mockEvents.filter((e) => e.severity === "critical").length} CRITICAL
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {mockEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-panel p-3 border ${severityColor(event.severity)} ${
                    event.severity === "critical" ? "red-glow" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-xs font-semibold">
                      {event.type.replace(/_/g, " ")}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    {event.location}
                  </div>
                  <div className="font-mono text-xs text-foreground/80">
                    {event.details}
                  </div>
                  {event.severity === "critical" && (
                    <div className="mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-destructive animate-pulse" />
                      <span className="font-mono text-xs text-destructive font-bold">
                        SOS ALERT ACTIVE
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

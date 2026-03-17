import { motion } from "framer-motion";
import { Video, Radio } from "lucide-react";
import type { DroneData } from "@/lib/dashboard-data";

interface Props {
  drones: DroneData[];
}

const LiveFeedPanel = ({ drones }: Props) => {
  const activeDrones = drones.filter((d) => d.status !== "OFFLINE" && d.status !== "CHARGING");

  return (
    <div className="space-y-4">
      <div className="font-display text-xs text-primary tracking-widest uppercase">
        Live Camera Feeds
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeDrones.map((drone, i) => (
          <motion.div
            key={drone.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel overflow-hidden group cursor-pointer hover:border-primary/40 hover:cyan-glow transition-all duration-300"
          >
            {/* Simulated feed */}
            <div className="relative aspect-video bg-card grid-overlay flex items-center justify-center">
              <Video className="w-10 h-10 text-primary/20" />

              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-16 scan-line pointer-events-none"
                animate={{ y: ["-100%", "200px"] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "linear" }}
              />

              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-primary/40" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-primary/40" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-primary/40" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-primary/40" />

              {/* HUD */}
              <div className="absolute top-2 left-7 font-mono text-[9px] text-primary/50">
                {drone.id} • CAM
              </div>
              <div className="absolute top-2 right-7 font-mono text-[9px] text-primary/50 flex items-center gap-1">
                <Radio className="w-2 h-2 animate-pulse" /> REC
              </div>
              <div className="absolute bottom-2 left-7 font-mono text-[9px] text-primary/50">
                {drone.lat.toFixed(4)}°N, {drone.lon.toFixed(4)}°E
              </div>
              <div className="absolute bottom-2 right-7 font-mono text-[9px] text-primary/50">
                AI: ON
              </div>

              {/* Detection overlay simulation */}
              {drone.detections > 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 border border-destructive/50 flex items-center justify-center">
                  <span className="font-mono text-[8px] text-destructive absolute -top-3">DETECTED</span>
                </div>
              )}
            </div>

            {/* Info bar */}
            <div className="p-2 flex items-center justify-between">
              <div>
                <span className="font-display text-[10px] font-semibold text-foreground">{drone.id}</span>
                <span className="font-mono text-[10px] text-muted-foreground ml-2">{drone.sector}</span>
              </div>
              <span className="font-mono text-[10px] text-primary">{drone.altitude.toFixed(0)}m • {drone.speed.toFixed(0)}km/h</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map section */}
      <div className="glass-panel p-6 relative overflow-hidden" style={{ minHeight: 200 }}>
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="font-display text-xs text-primary/60 mb-2">SATELLITE MAP VIEW</div>
            <div className="font-mono text-[10px] text-muted-foreground">
              {activeDrones.length} drones tracking • patrol routes active
            </div>
            {/* Drone blips */}
            <div className="relative w-64 h-32 mx-auto mt-4">
              {activeDrones.map((d, i) => (
                <div
                  key={d.id}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-cyan" />
                  <div className="font-mono text-[8px] text-primary/60 mt-0.5">{d.id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedPanel;

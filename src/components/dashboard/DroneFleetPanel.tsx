import { motion } from "framer-motion";
import { Battery, MapPin, Gauge, Mountain, Radio, Clock, Send, RotateCcw, Pause, ArrowDown } from "lucide-react";
import type { DroneData } from "@/lib/dashboard-data";
import { statusColor } from "@/lib/dashboard-data";
import { useState } from "react";

interface Props {
  drones: DroneData[];
}

const DroneFleetPanel = ({ drones }: Props) => {
  const [selectedDrone, setSelectedDrone] = useState<string>(drones[0]?.id);
  const drone = drones.find((d) => d.id === selectedDrone)!;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Fleet list */}
      <div className="lg:col-span-1 space-y-2">
        <div className="font-display text-xs text-primary tracking-widest uppercase mb-3">Drone Fleet</div>
        {drones.map((d, i) => (
          <motion.button
            key={d.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedDrone(d.id)}
            className={`w-full glass-panel p-3 text-left transition-all duration-200 ${
              selectedDrone === d.id ? "border-primary/50 cyan-glow" : "hover:border-primary/30"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-display text-xs font-semibold text-foreground">
                {d.id} — {d.name}
              </span>
              <span className={`font-mono text-[10px] font-bold ${statusColor(d.status)}`}>
                {d.status}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Battery className="w-3 h-3" /> {d.battery.toFixed(0)}%
              </span>
              <span>{d.sector}</span>
              {d.detections > 0 && (
                <span className="text-destructive">{d.detections} alerts</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Drone detail */}
      <div className="lg:col-span-2">
        {drone && (
          <motion.div
            key={drone.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {drone.id} — <span className="text-primary">{drone.name}</span>
                </h3>
                <span className={`font-mono text-xs font-bold ${statusColor(drone.status)}`}>
                  {drone.status} • {drone.sector}
                </span>
              </div>
              {drone.status !== "OFFLINE" && drone.status !== "CHARGING" && (
                <div className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-primary animate-pulse" />
                  <span className="font-mono text-xs text-primary">LIVE</span>
                </div>
              )}
            </div>

            {/* Telemetry grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <TelemetryCard icon={Battery} label="Battery" value={`${drone.battery.toFixed(1)}%`} bar={drone.battery} />
              <TelemetryCard icon={Mountain} label="Altitude" value={`${drone.altitude.toFixed(1)} m`} />
              <TelemetryCard icon={Gauge} label="Speed" value={`${drone.speed.toFixed(1)} km/h`} />
              <TelemetryCard icon={Radio} label="Signal" value={`${drone.signal.toFixed(0)}%`} bar={drone.signal} />
            </div>

            {/* GPS + Flight info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground uppercase">GPS Position</span>
                </div>
                <div className="font-mono text-sm text-foreground space-y-1">
                  <div>LAT: {drone.lat.toFixed(6)}° N</div>
                  <div>LON: {drone.lon.toFixed(6)}° E</div>
                </div>
              </div>
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground uppercase">Flight Data</span>
                </div>
                <div className="font-mono text-sm text-foreground space-y-1">
                  <div>Time: {Math.floor(drone.flightTime / 60)}h {drone.flightTime % 60}m</div>
                  <div>Detections: {drone.detections}</div>
                </div>
              </div>
            </div>

            {/* Command buttons */}
            {drone.status !== "OFFLINE" && drone.status !== "CHARGING" && (
              <div>
                <div className="font-display text-xs text-primary tracking-widest uppercase mb-2">
                  Commands
                </div>
                <div className="flex flex-wrap gap-2">
                  <CommandBtn icon={RotateCcw} label="Return to Launch" />
                  <CommandBtn icon={Pause} label="Hover / Hold" />
                  <CommandBtn icon={Send} label="Reassign Sector" />
                  <CommandBtn icon={ArrowDown} label="Emergency Landing" danger />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

function TelemetryCard({ icon: Icon, label, value, bar }: { icon: any; label: string; value: string; bar?: number }) {
  return (
    <div className="glass-panel p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3 h-3 text-primary" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase">{label}</span>
      </div>
      <div className="font-mono text-lg text-foreground font-semibold">{value}</div>
      {bar !== undefined && (
        <div className="w-full h-1.5 bg-muted rounded-sm overflow-hidden mt-1">
          <div
            className={`h-full transition-all duration-1000 rounded-sm ${bar > 50 ? "bg-primary" : bar > 20 ? "bg-orange-400" : "bg-destructive"}`}
            style={{ width: `${bar}%` }}
          />
        </div>
      )}
    </div>
  );
}

function CommandBtn({ icon: Icon, label, danger }: { icon: any; label: string; danger?: boolean }) {
  return (
    <button
      className={`font-mono text-xs px-3 py-2 flex items-center gap-2 transition-all duration-200 ${
        danger
          ? "glass-panel-alert text-destructive hover:border-destructive/60 hover:red-glow"
          : "glass-panel text-foreground hover:border-primary/40 hover:cyan-glow"
      }`}
    >
      <Icon className="w-3 h-3" /> {label}
    </button>
  );
}

export default DroneFleetPanel;

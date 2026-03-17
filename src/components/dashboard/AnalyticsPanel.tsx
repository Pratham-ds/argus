import { motion } from "framer-motion";
import type { AlertEvent, DroneData } from "@/lib/dashboard-data";

interface Props {
  alerts: AlertEvent[];
  drones: DroneData[];
}

const AnalyticsPanel = ({ alerts, drones }: Props) => {
  const critical = alerts.filter((a) => a.severity === "critical").length;
  const high = alerts.filter((a) => a.severity === "high").length;
  const medium = alerts.filter((a) => a.severity === "medium").length;
  const low = alerts.filter((a) => a.severity === "low").length;
  const info = alerts.filter((a) => a.severity === "info").length;
  const total = alerts.length;

  const typeCounts: Record<string, number> = {};
  alerts.forEach((a) => {
    typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
  });

  const droneCounts: Record<string, number> = {};
  alerts.forEach((a) => {
    droneCounts[a.droneId] = (droneCounts[a.droneId] || 0) + 1;
  });

  const barMax = Math.max(...Object.values(typeCounts), 1);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Severity breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
        <div className="font-display text-xs text-primary tracking-widest uppercase mb-4">
          Severity Distribution
        </div>
        <div className="space-y-3">
          <SeverityBar label="Critical" count={critical} total={total} color="bg-destructive" />
          <SeverityBar label="High" count={high} total={total} color="bg-orange-400" />
          <SeverityBar label="Medium" count={medium} total={total} color="bg-yellow-400" />
          <SeverityBar label="Low" count={low} total={total} color="bg-primary/60" />
          <SeverityBar label="Info" count={info} total={total} color="bg-primary/30" />
        </div>
      </motion.div>

      {/* Detection types */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5">
        <div className="font-display text-xs text-primary tracking-widest uppercase mb-4">
          Detection Types
        </div>
        <div className="space-y-3">
          {Object.entries(typeCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([type, count]) => (
              <div key={type}>
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-[10px] text-foreground">{type.replace(/_/g, " ")}</span>
                  <span className="font-mono text-[10px] text-primary">{count}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-sm overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / barMax) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-primary rounded-sm"
                  />
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Drone performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-5">
        <div className="font-display text-xs text-primary tracking-widest uppercase mb-4">
          Drone Activity
        </div>
        <div className="space-y-3">
          {drones.map((d) => (
            <div key={d.id} className="flex items-center justify-between">
              <div>
                <span className="font-display text-xs text-foreground">{d.id}</span>
                <span className="font-mono text-[10px] text-muted-foreground ml-2">{d.name}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="text-muted-foreground">{d.flightTime}m flight</span>
                <span className="text-primary">{droneCounts[d.id] || 0} events</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-6 pt-4 border-t border-primary/10 space-y-2">
          <div className="flex justify-between font-mono text-[10px]">
            <span className="text-muted-foreground">Total flight time</span>
            <span className="text-foreground">{drones.reduce((s, d) => s + d.flightTime, 0)}m</span>
          </div>
          <div className="flex justify-between font-mono text-[10px]">
            <span className="text-muted-foreground">Avg confidence</span>
            <span className="text-foreground">{(alerts.reduce((s, a) => s + a.confidence, 0) / alerts.length).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between font-mono text-[10px]">
            <span className="text-muted-foreground">Response rate</span>
            <span className="text-primary">{((alerts.filter((a) => a.acknowledged).length / alerts.length) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function SeverityBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[10px] text-foreground">{label}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{count} ({pct.toFixed(0)}%)</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-sm overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full rounded-sm ${color}`}
        />
      </div>
    </div>
  );
}

export default AnalyticsPanel;

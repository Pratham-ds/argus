import { motion } from "framer-motion";
import { Shield, Activity, AlertTriangle, Plane, Eye, TrendingUp } from "lucide-react";
import type { DroneData, AlertEvent } from "@/lib/dashboard-data";

interface Props {
  drones: DroneData[];
  alerts: AlertEvent[];
}

const StatsOverview = ({ drones, alerts }: Props) => {
  const activeDrones = drones.filter((d) => d.status === "PATROLLING" || d.status === "HOVERING").length;
  const criticalAlerts = alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length;
  const totalDetections = drones.reduce((sum, d) => sum + d.detections, 0);
  const avgBattery = drones.filter((d) => d.status !== "OFFLINE").reduce((s, d) => s + d.battery, 0) / drones.filter((d) => d.status !== "OFFLINE").length;

  const stats = [
    { icon: Plane, label: "Active Drones", value: `${activeDrones}/${drones.length}`, sub: "in flight", accent: "text-primary" },
    { icon: AlertTriangle, label: "Unacknowledged", value: String(criticalAlerts), sub: "critical alerts", accent: "text-destructive" },
    { icon: Eye, label: "Detections Today", value: String(totalDetections), sub: "AI identifications", accent: "text-primary" },
    { icon: Activity, label: "Fleet Battery", value: `${avgBattery.toFixed(0)}%`, sub: "average charge", accent: avgBattery > 50 ? "text-primary" : "text-orange-400" },
    { icon: TrendingUp, label: "Uptime", value: "99.7%", sub: "system reliability", accent: "text-primary" },
    { icon: Shield, label: "Threat Level", value: criticalAlerts > 0 ? "ELEVATED" : "NORMAL", sub: "current assessment", accent: criticalAlerts > 0 ? "text-destructive" : "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-panel p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <s.icon className={`w-4 h-4 ${s.accent}`} />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</span>
          </div>
          <div className={`font-display text-xl font-bold ${s.accent}`}>{s.value}</div>
          <div className="font-mono text-[10px] text-muted-foreground mt-1">{s.sub}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;

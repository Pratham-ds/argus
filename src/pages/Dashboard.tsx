import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Radio,
  Clock,
  LayoutDashboard,
  Plane,
  Video,
  AlertTriangle,
  BarChart3,
  Home,
  ScanEye,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  mockDrones,
  mockAlerts,
  useTelemetrySimulation,
} from "@/lib/dashboard-data";
import type { AlertEvent } from "@/lib/dashboard-data";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DroneFleetPanel from "@/components/dashboard/DroneFleetPanel";
import LiveFeedPanel from "@/components/dashboard/LiveFeedPanel";
import AlertHistoryPanel from "@/components/dashboard/AlertHistoryPanel";
import AnalyticsPanel from "@/components/dashboard/AnalyticsPanel";
import CrimeDetectionPanel from "@/components/dashboard/CrimeDetectionPanel";
import ArduPilotPanel from "@/components/dashboard/ArduPilotPanel";

type Tab = "overview" | "fleet" | "feeds" | "alerts" | "analytics" | "detection" | "ardupilot";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "fleet", label: "Drone Fleet", icon: Plane },
  { id: "feeds", label: "Live Feeds", icon: Video },
  { id: "alerts", label: "Alert History", icon: AlertTriangle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "detection", label: "Detection", icon: ScanEye },
  { id: "ardupilot", label: "ArduPilot", icon: Cpu },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const drones = useTelemetrySimulation(mockDrones);
  const [alerts, setAlerts] = useState<AlertEvent[]>(mockAlerts);

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleAcknowledge = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="h-12 glass-panel border-t-0 border-l-0 border-r-0 flex items-center justify-between px-4 flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-display text-sm font-bold text-primary text-glow-cyan tracking-wider">
            ARGUS COMMAND
          </span>
          <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
            // Police Control Panel
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <span className="text-primary flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" /> LIVE
          </span>
          <span className="text-muted-foreground hidden sm:flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {time.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="h-10 flex-shrink-0 border-b border-primary/10 flex items-center px-4 gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-display text-[10px] tracking-widest uppercase px-4 py-2 flex items-center gap-2 transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary text-glow-cyan"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
            {tab.id === "alerts" && unackCount > 0 && (
              <span className="bg-destructive/20 text-destructive text-[9px] px-1.5 py-0.5 rounded-sm font-mono animate-pulse">
                {unackCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <StatsOverview drones={drones} alerts={alerts} />

            <div className="grid lg:grid-cols-2 gap-4">
              {/* Quick live feeds */}
              <div className="glass-panel p-4">
                <div className="font-display text-xs text-primary tracking-widest uppercase mb-3">
                  Active Feeds
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {drones
                    .filter((d) => d.status === "PATROLLING" || d.status === "HOVERING")
                    .slice(0, 4)
                    .map((d) => (
                      <div key={d.id} className="aspect-video bg-card grid-overlay rounded-sm relative flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary/20" />
                        <div className="absolute top-1 left-1 font-mono text-[8px] text-primary/50">{d.id}</div>
                        <div className="absolute bottom-1 right-1 font-mono text-[8px] text-primary/50 flex items-center gap-0.5">
                          <Radio className="w-1.5 h-1.5 animate-pulse" /> LIVE
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent alerts */}
              <div className="glass-panel p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-display text-xs text-primary tracking-widest uppercase">
                    Recent Alerts
                  </div>
                  <button
                    onClick={() => setActiveTab("alerts")}
                    className="font-mono text-[10px] text-primary hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-2">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-center justify-between p-2 rounded-sm border ${
                        !alert.acknowledged && alert.severity === "critical"
                          ? "border-destructive/30 bg-destructive/5"
                          : "border-primary/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {alert.severity === "critical" && !alert.acknowledged && (
                          <AlertTriangle className="w-3 h-3 text-destructive animate-pulse" />
                        )}
                        <div>
                          <div className="font-mono text-[10px] text-foreground">
                            {alert.type.replace(/_/g, " ")}
                          </div>
                          <div className="font-mono text-[9px] text-muted-foreground">
                            {alert.droneId} • {alert.location}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "fleet" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DroneFleetPanel drones={drones} />
          </motion.div>
        )}

        {activeTab === "feeds" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LiveFeedPanel drones={drones} />
          </motion.div>
        )}

        {activeTab === "alerts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlertHistoryPanel alerts={alerts} onAcknowledge={handleAcknowledge} />
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnalyticsPanel alerts={alerts} drones={drones} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

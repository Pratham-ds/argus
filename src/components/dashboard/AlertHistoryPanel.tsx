import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Filter, Search, Eye } from "lucide-react";
import type { AlertEvent } from "@/lib/dashboard-data";
import { severityBadgeColor } from "@/lib/dashboard-data";

interface Props {
  alerts: AlertEvent[];
  onAcknowledge: (id: number) => void;
}

const AlertHistoryPanel = ({ alerts, onAcknowledge }: Props) => {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = alerts
    .filter((a) => filter === "all" || a.severity === filter)
    .filter(
      (a) =>
        search === "" ||
        a.type.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase()) ||
        a.details.toLowerCase().includes(search.toLowerCase()) ||
        a.droneId.toLowerCase().includes(search.toLowerCase())
    );

  const filters = ["all", "critical", "high", "medium", "low", "info"];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 glass-panel px-3 py-1.5">
          <Search className="w-3 h-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none w-40"
          />
        </div>

        <div className="flex items-center gap-1">
          <Filter className="w-3 h-3 text-muted-foreground mr-1" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[10px] uppercase px-2 py-1 transition-all duration-200 ${
                filter === f
                  ? "glass-panel border-primary/40 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="ml-auto font-mono text-[10px] text-muted-foreground">
          {filtered.length} results
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/10">
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Severity</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Drone</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Time</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Confidence</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left p-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((alert, i) => (
                <motion.tr
                  key={alert.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-primary/5 hover:bg-primary/5 transition-colors cursor-pointer ${
                    !alert.acknowledged && alert.severity === "critical" ? "bg-destructive/5" : ""
                  }`}
                  onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
                >
                  <td className="p-3">
                    <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-sm ${severityBadgeColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {alert.type.replace(/_/g, " ")}
                  </td>
                  <td className="p-3 font-mono text-xs text-primary">{alert.droneId}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{alert.location}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    <div>{alert.time}</div>
                    <div className="text-[10px]">{alert.date}</div>
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">{alert.confidence}%</td>
                  <td className="p-3">
                    {alert.acknowledged ? (
                      <span className="font-mono text-[10px] text-primary flex items-center gap-1">
                        <Check className="w-3 h-3" /> ACK
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-destructive flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> PENDING
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {!alert.acknowledged && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAcknowledge(alert.id);
                          }}
                          className="font-mono text-[10px] px-2 py-1 glass-panel text-primary hover:cyan-glow transition-all"
                        >
                          ACK
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(expandedId === alert.id ? null : alert.id);
                        }}
                        className="font-mono text-[10px] px-2 py-1 glass-panel text-muted-foreground hover:text-foreground transition-all"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expanded detail */}
      {expandedId && (() => {
        const alert = alerts.find((a) => a.id === expandedId);
        if (!alert) return null;
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-panel p-4"
          >
            <div className="font-display text-xs text-primary tracking-widest uppercase mb-3">
              Alert Detail — #{alert.id}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-2">
                <Row label="Type" value={alert.type.replace(/_/g, " ")} />
                <Row label="Severity" value={alert.severity.toUpperCase()} />
                <Row label="Drone" value={alert.droneId} />
                <Row label="Location" value={alert.location} />
              </div>
              <div className="space-y-2">
                <Row label="GPS" value={`${alert.lat.toFixed(6)}°N, ${alert.lon.toFixed(6)}°E`} />
                <Row label="Time" value={`${alert.date} ${alert.time}`} />
                <Row label="Confidence" value={`${alert.confidence}%`} />
                <Row label="Details" value={alert.details} />
              </div>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}: </span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default AlertHistoryPanel;

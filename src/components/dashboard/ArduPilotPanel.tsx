import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  WifiOff,
  Settings,
  CheckCircle2,
  XCircle,
  Loader2,
  Globe,
  Radio,
  Shield,
  Cpu,
  ArrowRight,
} from "lucide-react";

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface ConnectionConfig {
  protocol: "mavlink" | "mission_planner";
  host: string;
  port: string;
  baudRate: string;
  vehicleId: string;
}

const defaultConfig: ConnectionConfig = {
  protocol: "mavlink",
  host: "127.0.0.1",
  port: "14550",
  baudRate: "57600",
  vehicleId: "1",
};

const ArduPilotPanel = () => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [config, setConfig] = useState<ConnectionConfig>(defaultConfig);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [log, setLog] = useState<string[]>([
    "[SYSTEM] ArduPilot connection module initialized",
    "[INFO] Awaiting connection configuration...",
  ]);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev.slice(-50), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleConnect = () => {
    setStatus("connecting");
    addLog(`Connecting via ${config.protocol.toUpperCase()} to ${config.host}:${config.port}...`);

    // Simulate connection
    setTimeout(() => {
      addLog("Establishing MAVLink heartbeat...");
    }, 800);

    setTimeout(() => {
      addLog("Heartbeat received — Vehicle ID: " + config.vehicleId);
      addLog("Firmware: ArduCopter v4.5.1");
      addLog("MAVLink protocol version: 2.0");
    }, 1800);

    setTimeout(() => {
      addLog("Telemetry stream active — GPS, IMU, Battery, RC channels");
      addLog("Connection established successfully ✓");
      setStatus("connected");
    }, 2800);
  };

  const handleDisconnect = () => {
    addLog("Disconnecting from ArduPilot...");
    addLog("MAVLink heartbeat stopped");
    addLog("Connection closed");
    setStatus("disconnected");
  };

  const statusColor = {
    disconnected: "text-muted-foreground",
    connecting: "text-yellow-400",
    connected: "text-primary",
    error: "text-destructive",
  };

  const statusLabel = {
    disconnected: "DISCONNECTED",
    connecting: "CONNECTING...",
    connected: "CONNECTED",
    error: "ERROR",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-primary" />
          <div>
            <div className="font-display text-xs text-primary tracking-widest uppercase">
              ArduPilot / MAVLink Interface
            </div>
            <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
              Connect to Mission Planner or MAVLink-compatible ground station
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === "connected" ? (
            <Wifi className="w-4 h-4 text-primary animate-pulse" />
          ) : status === "connecting" ? (
            <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
          ) : (
            <WifiOff className="w-4 h-4 text-muted-foreground" />
          )}
          <span className={`font-mono text-xs font-bold ${statusColor[status]}`}>
            {statusLabel[status]}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Connection config */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-4"
          >
            <div className="font-display text-xs text-primary tracking-widest uppercase mb-4">
              Connection Settings
            </div>

            {/* Protocol selector */}
            <div className="mb-4">
              <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1.5">
                Protocol
              </label>
              <div className="flex gap-2">
                {(["mavlink", "mission_planner"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setConfig({ ...config, protocol: p })}
                    disabled={status === "connected"}
                    className={`flex-1 font-mono text-xs px-3 py-2.5 transition-all duration-200 ${
                      config.protocol === p
                        ? "glass-panel border-primary/50 text-primary cyan-glow"
                        : "glass-panel text-muted-foreground hover:text-foreground"
                    } disabled:opacity-50`}
                  >
                    {p === "mavlink" ? "MAVLink UDP" : "Mission Planner"}
                  </button>
                ))}
              </div>
            </div>

            {/* Host & Port */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1.5">
                  Host / IP Address
                </label>
                <div className="glass-panel flex items-center px-3 py-2">
                  <Globe className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={config.host}
                    onChange={(e) => setConfig({ ...config, host: e.target.value })}
                    disabled={status === "connected"}
                    className="bg-transparent font-mono text-xs text-foreground outline-none w-full disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1.5">
                  Port
                </label>
                <div className="glass-panel flex items-center px-3 py-2">
                  <Radio className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={config.port}
                    onChange={(e) => setConfig({ ...config, port: e.target.value })}
                    disabled={status === "connected"}
                    className="bg-transparent font-mono text-xs text-foreground outline-none w-full disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="font-mono text-[10px] text-primary hover:underline flex items-center gap-1 mb-3"
            >
              <Settings className="w-3 h-3" />
              {showAdvanced ? "Hide" : "Show"} Advanced Settings
            </button>

            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-2 gap-3 mb-3"
              >
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1.5">
                    Baud Rate
                  </label>
                  <select
                    value={config.baudRate}
                    onChange={(e) => setConfig({ ...config, baudRate: e.target.value })}
                    disabled={status === "connected"}
                    className="w-full glass-panel px-3 py-2 font-mono text-xs text-foreground bg-transparent outline-none disabled:opacity-50"
                  >
                    {["9600", "19200", "38400", "57600", "115200", "921600"].map((b) => (
                      <option key={b} value={b} className="bg-card">{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1.5">
                    Vehicle / System ID
                  </label>
                  <input
                    type="text"
                    value={config.vehicleId}
                    onChange={(e) => setConfig({ ...config, vehicleId: e.target.value })}
                    disabled={status === "connected"}
                    className="w-full glass-panel px-3 py-2 font-mono text-xs text-foreground bg-transparent outline-none disabled:opacity-50"
                  />
                </div>
              </motion.div>
            )}

            {/* Connect / Disconnect */}
            <div className="flex gap-2">
              {status !== "connected" ? (
                <button
                  onClick={handleConnect}
                  disabled={status === "connecting"}
                  className="flex-1 font-display text-xs tracking-wider uppercase px-4 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 cyan-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "connecting" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <ArrowRight className="w-3 h-3" />
                  )}
                  {status === "connecting" ? "Connecting..." : "Connect"}
                </button>
              ) : (
                <button
                  onClick={handleDisconnect}
                  className="flex-1 font-display text-xs tracking-wider uppercase px-4 py-2.5 glass-panel-alert text-destructive hover:border-destructive/60 hover:red-glow transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-3 h-3" /> Disconnect
                </button>
              )}
            </div>
          </motion.div>

          {/* Connection Info (when connected) */}
          {status === "connected" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-4"
            >
              <div className="font-display text-xs text-primary tracking-widest uppercase mb-3">
                Active Session
              </div>
              <div className="space-y-2 font-mono text-xs">
                <InfoRow label="Protocol" value={config.protocol === "mavlink" ? "MAVLink 2.0 (UDP)" : "Mission Planner TCP"} />
                <InfoRow label="Endpoint" value={`${config.host}:${config.port}`} />
                <InfoRow label="Baud Rate" value={config.baudRate} />
                <InfoRow label="Vehicle ID" value={config.vehicleId} />
                <InfoRow label="Firmware" value="ArduCopter v4.5.1" />
                <InfoRow label="Frame" value="Hexacopter" />
                <div className="pt-2 border-t border-primary/10 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[10px]">Heartbeat active — Telemetry streaming</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Connection Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-4 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-xs text-primary tracking-widest uppercase">
              Connection Log
            </div>
            <button
              onClick={() => setLog([])}
              className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 min-h-[300px] max-h-[500px] overflow-y-auto bg-card/40 rounded-sm p-3 font-mono text-[10px] leading-relaxed space-y-0.5">
            {log.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.includes("✓") || line.includes("successfully")
                    ? "text-primary"
                    : line.includes("ERROR") || line.includes("error")
                    ? "text-destructive"
                    : line.includes("[SYSTEM]")
                    ? "text-secondary"
                    : "text-muted-foreground"
                }`}
              >
                {line}
              </div>
            ))}
            <div className="animate-pulse text-primary">█</div>
          </div>

          {/* Quick guide */}
          <div className="mt-3 pt-3 border-t border-primary/10">
            <div className="font-mono text-[10px] text-muted-foreground space-y-1">
              <div className="text-foreground font-semibold mb-1">Quick Setup:</div>
              <div className="flex items-start gap-2">
                <Shield className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">MAVLink:</strong> Set host to your GCS IP, default port 14550 for UDP</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Mission Planner:</strong> Enable TCP server in MP settings, use port 5760</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                <span><strong className="text-foreground">SITL:</strong> Use 127.0.0.1:14550 for ArduPilot software-in-the-loop testing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default ArduPilotPanel;

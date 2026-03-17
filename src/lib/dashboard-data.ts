import { useState, useEffect } from "react";

export interface DroneData {
  id: string;
  name: string;
  status: "PATROLLING" | "HOVERING" | "RETURNING" | "OFFLINE" | "CHARGING";
  battery: number;
  altitude: number;
  speed: number;
  signal: number;
  lat: number;
  lon: number;
  sector: string;
  flightTime: number; // minutes
  detections: number;
}

export interface AlertEvent {
  id: number;
  droneId: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  time: string;
  date: string;
  location: string;
  lat: number;
  lon: number;
  details: string;
  confidence: number;
  acknowledged: boolean;
  snapshot?: string;
}

export const mockDrones: DroneData[] = [
  { id: "ARG-01", name: "Alpha", status: "PATROLLING", battery: 87, altitude: 120, speed: 45, signal: 94, lat: 28.6139, lon: 77.209, sector: "Sector 7-G", flightTime: 142, detections: 3 },
  { id: "ARG-02", name: "Bravo", status: "PATROLLING", battery: 72, altitude: 95, speed: 38, signal: 91, lat: 28.6295, lon: 77.2182, sector: "Sector 3-A", flightTime: 98, detections: 1 },
  { id: "ARG-03", name: "Charlie", status: "HOVERING", battery: 54, altitude: 80, speed: 0, signal: 88, lat: 28.6043, lon: 77.2317, sector: "Sector 12-B", flightTime: 203, detections: 5 },
  { id: "ARG-04", name: "Delta", status: "RETURNING", battery: 23, altitude: 60, speed: 52, signal: 76, lat: 28.6199, lon: 77.1956, sector: "Sector 5-D", flightTime: 267, detections: 2 },
  { id: "ARG-05", name: "Echo", status: "CHARGING", battery: 15, altitude: 0, speed: 0, signal: 100, lat: 28.6129, lon: 77.2295, sector: "Base", flightTime: 0, detections: 0 },
  { id: "ARG-06", name: "Foxtrot", status: "OFFLINE", battery: 0, altitude: 0, speed: 0, signal: 0, lat: 28.6350, lon: 77.2100, sector: "Maintenance", flightTime: 0, detections: 0 },
];

export const mockAlerts: AlertEvent[] = [
  { id: 1, droneId: "ARG-01", type: "WEAPON_DETECTED", severity: "critical", time: "14:32:07", date: "2026-03-17", location: "Sector 7-G", lat: 28.6141, lon: 77.2093, details: "Knife detected near market entrance", confidence: 92, acknowledged: false },
  { id: 2, droneId: "ARG-02", type: "FIGHT_DETECTED", severity: "high", time: "14:28:45", date: "2026-03-17", location: "Sector 3-A", lat: 28.6298, lon: 77.2185, details: "Physical altercation between 2 individuals", confidence: 87, acknowledged: false },
  { id: 3, droneId: "ARG-03", type: "SUSPICIOUS_ACTIVITY", severity: "medium", time: "14:15:22", date: "2026-03-17", location: "Sector 12-B", lat: 28.6045, lon: 77.2320, details: "Loitering in restricted zone, 3 individuals", confidence: 74, acknowledged: true },
  { id: 4, droneId: "ARG-01", type: "WEAPON_DETECTED", severity: "critical", time: "13:58:11", date: "2026-03-17", location: "Sector 5-D", lat: 28.6201, lon: 77.1958, details: "Firearm detected near alley", confidence: 88, acknowledged: true },
  { id: 5, droneId: "ARG-03", type: "ROBBERY", severity: "high", time: "13:42:33", date: "2026-03-17", location: "Sector 9-F", lat: 28.6100, lon: 77.2250, details: "Possible robbery in progress at convenience store", confidence: 81, acknowledged: true },
  { id: 6, droneId: "ARG-02", type: "PATROL_COMPLETE", severity: "info", time: "13:30:00", date: "2026-03-17", location: "Zone Alpha", lat: 28.6290, lon: 77.2180, details: "Patrol route completed - no threats detected", confidence: 100, acknowledged: true },
  { id: 7, droneId: "ARG-04", type: "FIGHT_DETECTED", severity: "high", time: "12:15:44", date: "2026-03-17", location: "Sector 5-D", lat: 28.6200, lon: 77.1960, details: "Group altercation, 4+ individuals", confidence: 90, acknowledged: true },
  { id: 8, droneId: "ARG-01", type: "SUSPICIOUS_ACTIVITY", severity: "low", time: "11:02:18", date: "2026-03-17", location: "Sector 7-G", lat: 28.6138, lon: 77.2088, details: "Unattended package near bench", confidence: 65, acknowledged: true },
  { id: 9, droneId: "ARG-03", type: "WEAPON_DETECTED", severity: "critical", time: "10:30:55", date: "2026-03-16", location: "Sector 12-B", lat: 28.6040, lon: 77.2315, details: "Concealed handgun detected", confidence: 91, acknowledged: true },
  { id: 10, droneId: "ARG-02", type: "VIOLENT_BEHAVIOR", severity: "high", time: "09:45:12", date: "2026-03-16", location: "Sector 3-A", lat: 28.6293, lon: 77.2179, details: "Aggressive behavior near school zone", confidence: 83, acknowledged: true },
];

export function useTelemetrySimulation(drones: DroneData[]) {
  const [data, setData] = useState(drones);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((d) => {
          if (d.status === "OFFLINE" || d.status === "CHARGING") return d;
          return {
            ...d,
            battery: Math.max(0, d.battery - Math.random() * 0.05),
            altitude: d.status === "RETURNING" ? Math.max(0, d.altitude - 0.3) : d.altitude + Math.sin(Date.now() / 5000) * 0.5,
            speed: d.status === "HOVERING" ? 0 : d.speed + Math.sin(Date.now() / 3000) * 0.3,
            signal: Math.min(100, Math.max(0, d.signal + (Math.random() - 0.5) * 0.5)),
            lat: d.lat + (Math.random() - 0.5) * 0.00005,
            lon: d.lon + (Math.random() - 0.5) * 0.00005,
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return data;
}

export const severityColor = (s: string) => {
  switch (s) {
    case "critical": return "text-destructive border-destructive/40";
    case "high": return "text-orange-400 border-orange-400/40";
    case "medium": return "text-yellow-400 border-yellow-400/40";
    case "low": return "text-primary/70 border-primary/30";
    default: return "text-primary border-primary/40";
  }
};

export const severityBadgeColor = (s: string) => {
  switch (s) {
    case "critical": return "bg-destructive/20 text-destructive";
    case "high": return "bg-orange-400/20 text-orange-400";
    case "medium": return "bg-yellow-400/20 text-yellow-400";
    case "low": return "bg-primary/10 text-primary/70";
    default: return "bg-primary/10 text-primary";
  }
};

export const statusColor = (s: string) => {
  switch (s) {
    case "PATROLLING": return "text-primary";
    case "HOVERING": return "text-yellow-400";
    case "RETURNING": return "text-orange-400";
    case "CHARGING": return "text-secondary";
    case "OFFLINE": return "text-muted-foreground";
    default: return "text-foreground";
  }
};

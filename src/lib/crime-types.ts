import {
  Swords,
  ShieldAlert,
  Flame,
  Car,
  Users,
  Package,
  Eye,
  Bomb,
  Crosshair,
  AlertTriangle,
  UserX,
  HandMetal,
  Skull,
  Ban,
} from "lucide-react";

export interface CrimeType {
  id: string;
  label: string;
  description: string;
  icon: any;
  severity: "critical" | "high" | "medium";
}

export const CRIME_TYPES: CrimeType[] = [
  { id: "WEAPON_GUN", label: "Gun Detection", description: "Identifies firearms including handguns, rifles, and concealed weapons using object detection models.", icon: Crosshair, severity: "critical" },
  { id: "WEAPON_KNIFE", label: "Knife Detection", description: "Detects bladed weapons including knives, machetes, and sharp objects in real-time video frames.", icon: Swords, severity: "critical" },
  { id: "FIGHTING", label: "Fighting", description: "Recognizes physical altercations between two or more individuals through pose estimation and motion analysis.", icon: HandMetal, severity: "high" },
  { id: "ROBBERY", label: "Robbery", description: "Identifies robbery patterns including snatching, forced entry, and threatening behavior towards victims.", icon: ShieldAlert, severity: "critical" },
  { id: "ARSON", label: "Arson", description: "Detects fire-related threats including deliberate ignition attempts and suspicious fire sources.", icon: Flame, severity: "critical" },
  { id: "VEHICLE_THEFT", label: "Vehicle Theft", description: "Monitors unauthorized vehicle access, break-ins, and suspicious tampering with parked vehicles.", icon: Car, severity: "high" },
  { id: "MOB_VIOLENCE", label: "Mob Violence", description: "Identifies large group aggression, riots, and coordinated violent crowd behavior patterns.", icon: Users, severity: "critical" },
  { id: "SUSPICIOUS_PACKAGE", label: "Suspicious Package", description: "Flags unattended bags, parcels, or objects left in public areas for extended durations.", icon: Package, severity: "high" },
  { id: "STALKING", label: "Stalking / Following", description: "Detects repeated pursuit patterns where an individual persistently follows another person.", icon: Eye, severity: "medium" },
  { id: "EXPLOSION", label: "Explosion Detection", description: "Identifies sudden blast events, shockwaves, and explosive detonation signatures in video.", icon: Bomb, severity: "critical" },
  { id: "VANDALISM", label: "Vandalism", description: "Recognizes property destruction including graffiti, smashing, and deliberate damage to infrastructure.", icon: AlertTriangle, severity: "medium" },
  { id: "TRESPASSING", label: "Trespassing", description: "Monitors restricted zone breaches and unauthorized entry into secured perimeters.", icon: Ban, severity: "medium" },
  { id: "ASSAULT", label: "Assault", description: "Detects physical attacks on individuals including punching, kicking, and bodily harm attempts.", icon: Skull, severity: "high" },
  { id: "KIDNAPPING", label: "Kidnapping / Abduction", description: "Identifies forced movement of individuals, struggling victims, and forced vehicle entry patterns.", icon: UserX, severity: "critical" },
];

export const CRIME_TYPE_MAP = Object.fromEntries(CRIME_TYPES.map((c) => [c.id, c]));
